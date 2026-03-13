import * as Brevo from '@getbrevo/brevo';

if (!process.env.BREVO_API_KEY) {
	throw new Error('BREVO_API_KEY is required');
}

const config = {
	apiKey: process.env.BREVO_API_KEY,
	senderEmail: process.env.BREVO_SENDER_EMAIL || 'no-reply@marsai.com',
	senderName: process.env.BREVO_SENDER_NAME || 'MarsAI',
	sandbox: process.env.DEV_MODE === 'true'
};

const client = new Brevo.BrevoClient({
	apiKey: config.apiKey
});


/**
 * Get Authenticated Brevo API Client
*/
export const BrevoClient = {
	api: client.transactionalEmails,
	config
};