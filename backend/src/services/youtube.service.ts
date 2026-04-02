import { Readable } from 'node:stream';
import { getYouTubeClient, NODE_ENV } from '#config';

export interface YoutubeUploadMetadata {
	title?: string;
	description?: string;
	tags?: string[];
	privacyStatus?: 'private' | 'public' | 'unlisted';
	categoryId?: string;
}

export interface YoutubeUploadResult {
	videoId: string;
	title: string;
	uploadTime: string;
}

export interface YoutubeUploadParams {
	videoBuffer?: Buffer;
	videoStream?: Readable;
	metadata?: YoutubeUploadMetadata;
	privacy?: 'private' | 'public' | 'unlisted';
	callback?: (result: YoutubeUploadResult) => void;
}

/**
 * Upload a video to YouTube
 * @param args - Upload arguments
 * @returns Upload result
 */
export const uploadVideo = async ({
	videoBuffer,
	videoStream,
	metadata = {},
	privacy = 'unlisted',
	callback
}: YoutubeUploadParams): Promise<YoutubeUploadResult> => {
	try {
		if (NODE_ENV !== 'production') {
			console.log('Starting YouTube video upload...');
		}
		if (!videoBuffer && !videoStream) {
			throw new Error(`Video buffer or stream is required`);
		}

		const youtube = getYouTubeClient();

		const {
			title = metadata.title || 'Untitled Video',
			description = metadata.description || '',
			tags = metadata.tags || [],
			privacyStatus = (metadata.privacyStatus || privacy) as 'private' | 'public' | 'unlisted',
			categoryId = metadata.categoryId || '1'
		} = metadata;

		const requestBody = {
			snippet: {
				title,
				description,
				tags,
				categoryId
			},
			status: {
				privacyStatus
			}
		};

		const mediaBody = {
			body: videoStream || Readable.from(videoBuffer!)
		};

		if (NODE_ENV !== 'production') {
			console.log(`Uploading video: ${title}`);
		}

		const response = await youtube.videos.insert({
			part: ['snippet', 'status'],
			requestBody,
			media: mediaBody
		});

		const videoId = response.data.id!;
		if (NODE_ENV !== 'production') {
			console.log(`Video uploaded successfully! Video ID: ${videoId}`);
			console.log(`View at: https://www.youtube.com/watch?v=${videoId}`);
		}

		const result: YoutubeUploadResult = {
			videoId,
			title: response.data.snippet?.title || title,
			uploadTime: new Date().toISOString()
		};

		if (callback) {
			callback(result);
		}

		return result;
	} catch (error: any) {
		console.error('Error uploading video to YouTube:', error.message);
		throw error;
	}
};

export interface YoutubeVideoStatus {
	videoId: string;
	uploadStatus: string;
	privacyStatus: string;
	processingStatus?: string;
	processingProgress?: any;
	title: string;
	publishedAt: string;
}

/**
 * Check the processing status of a YouTube video
 * @param videoId - The YouTube video ID
 * @returns Status information
 */
export const checkVideoStatus = async (videoId: string): Promise<YoutubeVideoStatus> => {
	try {
		if (NODE_ENV !== 'production') {
			console.log(`Checking status for video: ${videoId}`);
		}

		const youtube = getYouTubeClient();

		const response = await youtube.videos.list({
			part: ['status', 'processingDetails', 'snippet'],
			id: [videoId]
		});

		if (!response.data.items || response.data.items.length === 0) {
			throw new Error(`Video not found: ${videoId}`);
		}

		const video = response.data.items[0];
		const status = video.status!;
		const snippet = video.snippet!;
		const processingDetails = video.processingDetails || {};

		const statusInfo: YoutubeVideoStatus = {
			videoId,
			uploadStatus: status.uploadStatus || 'unknown',
			privacyStatus: status.privacyStatus || 'private',
			processingStatus: processingDetails.processingStatus || undefined,
			processingProgress: processingDetails.processingProgress || undefined,
			title: snippet.title || 'Untitled',
			publishedAt: snippet.publishedAt || new Date().toISOString()
		};

		if (NODE_ENV !== 'production') {
			console.log(`Video Status: ${statusInfo.uploadStatus}`);
			console.log(`Processing: ${statusInfo.processingStatus || 'N/A'}`);
		}

		return statusInfo;
	} catch (error: any) {
		console.error('Error checking video status:', error.message);
		throw new Error(`Status check failed: ${error.message}`);
	}
};

/**
 * Schedule a status check after a delay
 * @param videoId - The YouTube video ID
 * @param callback - Callback function to execute after status check
 * @param delayMinutes - Delay in minutes before checking (default: 10)
 * @returns The timeout reference
 */
export const scheduleStatusCheck = (
	videoId: string,
	callback: (status: YoutubeVideoStatus) => void,
	delayMinutes = 10
): NodeJS.Timeout => {
	const delayMs = delayMinutes * 60 * 1000;

	if (NODE_ENV !== 'production') {
		console.log(`Status check scheduled for video ${videoId} in ${delayMinutes} minutes`);
	}

	const timeout = setTimeout(async () => {
		try {
			if (NODE_ENV !== 'production') {
				console.log(`\n Executing scheduled status check for video: ${videoId}`);
			}
			const status = await checkVideoStatus(videoId);

			if (NODE_ENV !== 'production') {
				console.log('\n Status Check Results:');
				console.log(`Video ID: ${status.videoId}`);
				console.log(`Title: ${status.title}`);
				console.log(`Upload Status: ${status.uploadStatus}`);
				console.log(`Processing Status: ${status.processingStatus || 'N/A'}`);
				console.log(`Privacy Status: ${status.privacyStatus}`);
			}
			callback(status);
		} catch (error: any) {
			console.error(`Scheduled status check failed for video ${videoId}:`, error.message);
		}
	}, delayMs);

	return timeout;
};

export interface YoutubeUploadAndScheduleResult extends YoutubeUploadResult {
	checkScheduledFor: string;
	timeoutRef: NodeJS.Timeout;
}

/**
 * Upload video and schedule automatic status check
 * @param videoBuffer - Buffer of the video file
 * @param callback - Callback function to execute after status check
 * @param metadata - Video metadata
 * @param checkDelayMinutes - Delay before status check (default: 10)
 * @returns Combined result
 */
export const uploadAndScheduleCheck = async (
	videoBuffer: Buffer,
	callback: (status: YoutubeVideoStatus) => void,
	metadata: YoutubeUploadMetadata = {},
	checkDelayMinutes = 10
): Promise<YoutubeUploadAndScheduleResult> => {
	try {
		const uploadResult = await uploadVideo({ videoBuffer, metadata });
		const timeoutRef = scheduleStatusCheck(uploadResult.videoId, callback, checkDelayMinutes);

		return {
			...uploadResult,
			checkScheduledFor: new Date(Date.now() + checkDelayMinutes * 60 * 1000).toISOString(),
			timeoutRef
		};
	} catch (error: any) {
		console.error('Error in uploadAndScheduleCheck:', error.message);
		throw error;
	}
};