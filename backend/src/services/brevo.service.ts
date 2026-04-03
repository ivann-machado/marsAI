import { BrevoClient, NODE_ENV } from '#config';

interface SenderOverride {
	name?: string;
	email?: string;
}

/**
 * Helper to configure the base SMTP email object
 */
const configureBaseEmail = (to: string | string[], config: any, senderOverride: SenderOverride | null = null) => {
	const sendSmtpEmail: any = {};

	sendSmtpEmail.sender = {
		name: senderOverride?.name || config.senderName,
		email: senderOverride?.email || config.senderEmail
	};

	if (Array.isArray(to)) {
		sendSmtpEmail.to = to.map(email => ({ email }));
	} else {
		sendSmtpEmail.to = [{ email: to }];
	}

	if (config.sandbox) {
		console.log('Sandbox mode enabled');
		sendSmtpEmail.headers = { 'X-Sib-Sandbox': 'drop' };
	}

	return sendSmtpEmail;
};

/**
 * Send a transactional email using Brevo
 */
export const sendEmail = async (
	to: string | string[],
	subject: string,
	htmlContent: string,
	textContent: string = '',
	senderOverride: SenderOverride | null = null
): Promise<any> => {
	try {
		if (NODE_ENV !== 'production') {
			console.log(`Preparing to send email to: ${to}`);
		}

		const sendSmtpEmail = configureBaseEmail(to, BrevoClient.config, senderOverride);

		sendSmtpEmail.subject = subject;
		sendSmtpEmail.htmlContent = htmlContent;
		sendSmtpEmail.textContent = textContent || htmlContent.replace(/<[^>]*>/g, '');

		const response = await BrevoClient.api.sendTransacEmail(sendSmtpEmail);

		const messageId = response.messageId || (response as any).body?.messageId;
		if (NODE_ENV !== 'production') {
			console.log(`Email sent successfully! Message ID: ${messageId}`);
		}
		return response;

	} catch (error: any) {
		console.error('Error sending email via Brevo:', error);
		if (error.response && error.response.body) {
			console.error('Brevo API Error Details:', error.response.body);
		}
		throw new Error(`Email sending failed: ${error.message}`);
	}
};

/**
 * Send a template-based email (if you use Brevo templates)
 */
export const sendTemplateEmail = async (
	to: string | string[],
	templateId: number,
	params: Record<string, any> = {}
): Promise<any> => {
	try {
		if (NODE_ENV !== 'production') {
			console.log(`Preparing to send template email (${templateId}) to: ${to}`);
		}

		const sendSmtpEmail = configureBaseEmail(to, BrevoClient.config);

		sendSmtpEmail.templateId = templateId;
		sendSmtpEmail.params = params;

		const response = await BrevoClient.api.sendTransacEmail(sendSmtpEmail);

		const messageId = (response as any).body?.messageId || response.messageId;
		if (NODE_ENV !== 'production') {
			console.log(`Template email sent successfully! Message ID: ${messageId}`);
		}
		return response;

	} catch (error: any) {
		console.error('Error sending template email via Brevo:', error);
		if (error.response && error.response.body) {
			console.error('Brevo API Error Details:', error.response.body);
		}
		throw new Error(`Template email sending failed: ${error.message}`);
	}
};
