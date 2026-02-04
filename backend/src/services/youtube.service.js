import fs from 'fs';
import { getYouTubeClient, getOAuth2Client } from '../config/youtube.js';

/**
 * Upload a video to YouTube
 * @param {string} filePath - Path to the video file
 * @param {object} metadata - Video metadata (title, description, tags, etc.)
 * @returns {Promise<{videoId: string, title: string}>}
 */
export const uploadVideo = async (filePath, metadata = {}, privacyStatus = 'private') => {
	try {
		console.log('Starting YouTube video upload...');

		if (!fs.existsSync(filePath)) {
			throw new Error(`Video file not found: ${filePath}`);
		}

		const youtube = getYouTubeClient();

		const {
			title = metadata.title,
			description = '',
			tags = [],
			privacyStatus = privacyStatus,
			categoryId = '1'
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
			body: fs.createReadStream(filePath)
		};

		console.log(`Uploading video: ${title}`);

		const response = await youtube.videos.insert({
			part: ['snippet', 'status'],
			requestBody,
			media: mediaBody
		});

		const videoId = response.data.id;
		console.log(`Video uploaded successfully! Video ID: ${videoId}`);
		console.log(`View at: https://www.youtube.com/watch?v=${videoId}`);

		return {
			videoId,
			title: response.data.snippet.title,
			uploadTime: new Date().toISOString()
		};
	} catch (error) {
		console.error('Error uploading video to YouTube:', error.message);
		throw new Error(`YouTube upload failed: ${error.message}`);
	}
};

/**
 * Check the processing status of a YouTube video
 * @param {string} videoId - The YouTube video ID
 * @returns {Promise<{videoId: string, status: string, details: object}>}
 */
export const checkVideoStatus = async (videoId) => {
	try {
		console.log(`Checking status for video: ${videoId}`);

		const youtube = getYouTubeClient();

		const response = await youtube.videos.list({
			part: ['status', 'processingDetails', 'snippet'],
			id: [videoId]
		});

		if (!response.data.items || response.data.items.length === 0) {
			throw new Error(`Video not found: ${videoId}`);
		}

		const video = response.data.items[0];
		const processingDetails = video.processingDetails || {};

		const statusInfo = {
			videoId,
			uploadStatus: video.status.uploadStatus,
			privacyStatus: video.status.privacyStatus,
			processingStatus: processingDetails.processingStatus,
			processingProgress: processingDetails.processingProgress,
			title: video.snippet.title,
			publishedAt: video.snippet.publishedAt
		};

		console.log(`Video Status: ${statusInfo.uploadStatus}`);
		console.log(`Processing: ${statusInfo.processingStatus || 'N/A'}`);

		return statusInfo;
	} catch (error) {
		console.error('Error checking video status:', error.message);
		throw new Error(`Status check failed: ${error.message}`);
	}
};

/**
 * Schedule a status check after a delay
 * @param {string} videoId - The YouTube video ID
 * @param {function} callback - Callback function to execute after status check
 * @param {number} delayMinutes - Delay in minutes before checking (default: 10)
 * @returns {NodeJS.Timeout} The timeout reference
 */
export const scheduleStatusCheck = (videoId, callback, delayMinutes = 10) => {
	const delayMs = delayMinutes * 60 * 1000;

	console.log(`Status check scheduled for video ${videoId} in ${delayMinutes} minutes`);

	const timeout = setTimeout(async () => {
		try {
			console.log(`\n Executing scheduled status check for video: ${videoId}`);
			const status = await checkVideoStatus(videoId);

			console.log('\n Status Check Results:');
			console.log(`Video ID: ${status.videoId}`);
			console.log(`Title: ${status.title}`);
			console.log(`Upload Status: ${status.uploadStatus}`);
			console.log(`Processing Status: ${status.processingStatus || 'N/A'}`);
			console.log(`Privacy Status: ${status.privacyStatus}`);
			callback(status);
		} catch (error) {
			console.error(`Scheduled status check failed for video ${videoId}:`, error.message);
		}
	}, delayMs);

	return timeout;
};

/**
 * Upload video and schedule automatic status check
 * This is a convenience function that combines upload + scheduled check
 * @param {string} filePath - Path to the video file
 * @param {function} callback - Callback function to execute after status check
 * @param {object} metadata - Video metadata
 * @param {number} checkDelayMinutes - Delay before status check (default: 10)
 * @returns {Promise<{videoId: string, title: string, timeoutRef: NodeJS.Timeout}>}
 */
export const uploadAndScheduleCheck = async (filePath, callback, metadata = {}, checkDelayMinutes = 10) => {
	try {
		const uploadResult = await uploadVideo(filePath, metadata);
		const timeoutRef = scheduleStatusCheck(uploadResult.videoId, callback, checkDelayMinutes);

		return {
			...uploadResult,
			checkScheduledFor: new Date(Date.now() + checkDelayMinutes * 60 * 1000).toISOString(),
			timeoutRef
		};
	} catch (error) {
		console.error('Error in uploadAndScheduleCheck:', error.message);
		throw error;
	}
};