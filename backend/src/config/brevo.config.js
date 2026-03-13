import * as Brevo from '@getbrevo/brevo';


/**
 * Get Brevo Configuration from environment variables
 */
export const getBrevoConfig = () => {
	const config = {
		apiKey: process.env.BREVO_API_KEY,
		senderEmail: process.env.BREVO_SENDER_EMAIL || 'no-reply@marsai.com',
		senderName: process.env.BREVO_SENDER_NAME || 'MarsAI',
		sandbox: process.env.DEV_MODE === 'true'
	};

	if (!config.apiKey) {
		throw new Error('Brevo API key not found in environment');
	}

	return config;
};

/**
 * Get Authenticated Brevo API Client
 */
export const getBrevoClient = () => {
	const config = getBrevoConfig();

	const client = new Brevo.BrevoClient({
		apiKey: config.apiKey
	});

	return {
		api: client.transactionalEmails,
		config
	};
};
