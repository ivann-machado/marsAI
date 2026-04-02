import { Worker, type Job } from 'bullmq';
import { redis, prisma, NODE_ENV } from '#config';
import { checkVideoStatus, uploadVideo, getFile, sendEmail } from '#services';
import { renderView } from '#utils';

/** Shape of data stored in every yt_status_check job */
interface YtStatusCheckJobData {
	type: 'yt_status_check';
	/** Internal DB video ID */
	videoId: number;
	/** YouTube video ID returned after upload */
	youtubeId: string;
	/** Uploader email to notify on success */
	email: string;
	/** Video title used in the notification email */
	title: string;
}

/** Shape of data stored in every yt_upload job */
interface YtUploadJobData {
	type: 'yt_upload';
	videoId: number;
	filename: string;
	email: string;
	title: string;
	description?: string;
	tags?: string[];
}

type VideoJobData = YtStatusCheckJobData | YtUploadJobData;

/**
 * Process a single queue job.
 * Throwing causes BullMQ to retry the job according to the queue's backoff config.
 * @param {Job<VideoJobData>} job - The BullMQ job containing video processing data
 * @returns {Promise<{ success: boolean; youtubeId: string; email: string }>} Result of the job processing
 */
const processJob = async (job: Job<VideoJobData>): Promise<{ success: boolean; youtubeId: string; email: string }> => {
	const { type } = job.data;

	if (type === 'yt_status_check') {
		const { videoId, youtubeId, email, title } = job.data as YtStatusCheckJobData;

		if (NODE_ENV !== 'production') {
			console.log(`[worker] yt_status_check — DB video #${videoId}, YT id ${youtubeId}`);
		}

		const status = await checkVideoStatus(youtubeId);

		if (status.uploadStatus !== 'processed') {
			throw new Error(
				`Video ${youtubeId} not ready yet (uploadStatus: ${status.uploadStatus}, processing: ${status.processingStatus ?? 'N/A'})`,
			);
		}

		await prisma.videos.update({
			where: { id: Number(videoId) },
			data: { status: 'verified' },
		});
		const html = await renderView('emails/videoUploaded.html', { title });
		await sendEmail(email, 'Your Mars AI video is live! 🎬', html);

		if (NODE_ENV !== 'production') {
			console.log(`[worker] yt_status_check done — notified ${email}`);
		}

		return { success: true, youtubeId, email };
	}

	if (type === 'yt_upload') {
		const uploadData = job.data as YtUploadJobData;
		const { videoId, filename, email, title, description, tags } = uploadData;

		if (NODE_ENV !== 'production') {
			console.log(`[worker] yt_upload — DB video #${videoId}, S3 file ${filename}`);
		}

		const s3File = await getFile(filename);

		const uploadResult = await uploadVideo({
			videoStream: s3File.Body as any,
			metadata: { title, description, tags, categoryId: '1' }
		});

		const youtubeId = uploadResult?.videoId;
		if (!youtubeId) {
			throw new Error("Failed to get YouTube ID from uploadResult");
		}

		await prisma.videos.update({
			where: { id: Number(videoId) },
			data: { url: youtubeId },
		});
		const { default: videoQueue } = await import('../queues/video.queue.ts');
		await videoQueue.add(
			'yt_status_check',
			{
				type: 'yt_status_check',
				videoId,
				youtubeId,
				email,
				title,
			},
			{ delay: 10 * 60 * 1000 },
		);

		if (NODE_ENV !== 'production') {
			console.log(`[worker] yt_upload done — enqueued status check for ${youtubeId}`);
		}

		return { success: true, youtubeId, email };
	}

	throw new Error(`Unknown job type: ${(job.data as any).type}`);
};

/**
 * Start the video queue worker.
 * Call once at server startup; the returned worker can be closed on graceful shutdown.
 * @returns {Worker<VideoJobData>} The BullMQ worker instance
 */
export const startVideoWorker = (): Worker<VideoJobData> => {
	const worker = new Worker<VideoJobData>('videoQueue', processJob, {
		connection: redis,
		concurrency: 3,
	});

	worker
		.on('completed', (job) => {
			if (NODE_ENV !== 'production') {
				console.log(`[worker] Job ${job.id} (${job.data.type}) completed`);
			}
		})
		.on('active', (job) => {
			if (NODE_ENV !== 'production') {
				console.log(`[worker] Job ${job.id} (${job.data.type}) is now active in background...`);
			}
		})
		.on('progress', (job, progress) => {
			if (NODE_ENV !== 'production') {
				console.log(`[worker] Job ${job.id} (${job.data.type}) progress: ${progress}`);
			}
		})
		.on('stalled', (jobId) => {
			if (NODE_ENV !== 'production') {
				console.warn(`[worker] Job ${jobId} stalled and has been moved back to waiting.`);
			}
		})
		.on('failed', (job, err) => {
			console.error(`[worker] Job ${job?.id} (${job?.data?.type}) failed:`, err.message);
		})
		.on('error', (err) => {
			console.error('[worker] Worker error:', err);
		});

	if (NODE_ENV !== 'production') {
		console.log('[worker] Video worker starting...');
		import('../queues/video.queue.ts').then(({ default: videoQueue }) => {
			videoQueue.getJobCounts().then((counts) => {
				console.log(`[worker] Queue status: ${counts.waiting} waiting, ${counts.active} active, ${counts.delayed} delayed, ${counts.failed} failed.`);
			}).catch(err => console.error("Could not fetch queue counts:", err.message));
		});
	}

	return worker;
};