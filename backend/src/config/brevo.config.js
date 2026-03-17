import { BrevoClient } from '@getbrevo/brevo';
import { NODE_ENV } from './index.js';

const config = {
	apiKey: process.env.BREVO_API_KEY,
	senderEmail: process.env.BREVO_SENDER_EMAIL || 'no-reply@marsai.com',
	senderName: process.env.BREVO_SENDER_NAME || 'MarsAI',
	sandbox: NODE_ENV !== 'production' && NODE_ENV !== 'test'
};

if (!config.apiKey) {
	throw new Error('BREVO_API_KEY is required');
}

const client = new BrevoClient({
	apiKey: config.apiKey
});


/**
 * Get Authenticated Brevo API Client
*/
export default {
	api: client.transactionalEmails,
	config
};