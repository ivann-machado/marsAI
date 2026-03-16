import { google } from 'googleapis';
import { SETTINGS } from './settings.js';

/**
 * Get YouTube credentials from environment variables or settings object
 * Priority: process.env > SETTINGS
 */
const getYouTubeCredentials = () => {
	// Try to get from environment first
	if (process.env.YOUTUBE_CLIENT_ID && process.env.YOUTUBE_CLIENT_SECRET && process.env.YOUTUBE_REFRESH_TOKEN) {
		return {
			clientId: process.env.YOUTUBE_CLIENT_ID,
			clientSecret: process.env.YOUTUBE_CLIENT_SECRET,
			refreshToken: process.env.YOUTUBE_REFRESH_TOKEN
		};
	}

	// Try to get from SETTINGS object
	if (SETTINGS.youtube_client_id?.value && SETTINGS.youtube_client_secret?.value && SETTINGS.youtube_refresh_token?.value) {
		return {
			clientId: SETTINGS.youtube_client_id.value,
			clientSecret: SETTINGS.youtube_client_secret.value,
			refreshToken: SETTINGS.youtube_refresh_token?.value
		};
	}

	throw new Error('YouTube credentials not found in environment or settings');
};

/**
 * Get the YouTube API client
 */
export default () => {
	const { clientId, clientSecret, refreshToken } = getYouTubeCredentials();

	const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
	oauth2Client.setCredentials({ refresh_token: refreshToken });

	return google.youtube({
		version: 'v3',
		auth: oauth2Client
	});
};

/**
 * Export for testing purposes
 */
export const _getYouTubeCredentials = getYouTubeCredentials;