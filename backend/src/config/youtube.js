import { google } from 'googleapis';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SETTINGS } from './settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get YouTube credentials from environment variables or settings object
 * Priority: process.env > SETTINGS
 */
export const getYouTubeCredentials = () => {
	// Try to get from environment first
	if (process.env.YOUTUBE_CLIENT_ID && process.env.YOUTUBE_CLIENT_SECRET) {
		return {
			clientId: process.env.YOUTUBE_CLIENT_ID,
			clientSecret: process.env.YOUTUBE_CLIENT_SECRET,
			redirectUri: process.env.YOUTUBE_REDIRECT_URI || 'http://localhost',
			refreshToken: process.env.YOUTUBE_REFRESH_TOKEN
		};
	}

	// Try to get from SETTINGS object
	if (SETTINGS.youtube_client_id?.value && SETTINGS.youtube_client_secret?.value) {
		return {
			clientId: SETTINGS.youtube_client_id.value,
			clientSecret: SETTINGS.youtube_client_secret.value,
			redirectUri: SETTINGS.youtube_redirect_uri?.value || 'http://localhost',
			refreshToken: SETTINGS.youtube_refresh_token?.value
		};
	}

	// Fallback: try to read from client_secret.json
	try {
		const clientSecretPath = path.join(__dirname, '../../client_secret.json');
		if (fs.existsSync(clientSecretPath)) {
			const clientSecretContent = JSON.parse(fs.readFileSync(clientSecretPath, 'utf8'));
			const webCredentials = clientSecretContent.web;

			return {
				clientId: webCredentials.client_id,
				clientSecret: webCredentials.client_secret,
				redirectUri: webCredentials.redirect_uris?.[0] || 'http://localhost',
				refreshToken: process.env.YOUTUBE_REFRESH_TOKEN || SETTINGS.youtube_refresh_token?.value
			};
		}
	} catch (error) {
		console.error('Error reading client_secret.json:', error);
	}

	throw new Error('YouTube credentials not found in environment, settings, or client_secret.json');
};

/**
 * Create and return an authenticated OAuth2 client
 */
export const getOAuth2Client = () => {
	const credentials = getYouTubeCredentials();

	const oauth2Client = new google.auth.OAuth2(
		credentials.clientId,
		credentials.clientSecret,
		credentials.redirectUri
	);

	if (credentials.refreshToken) {
		oauth2Client.setCredentials({
			refresh_token: credentials.refreshToken
		});
	}

	return oauth2Client;
};

/**
 * Get the YouTube API client
 */
export const getYouTubeClient = () => {
	const auth = getOAuth2Client();
	return google.youtube({
		version: 'v3',
		auth
	});
};
