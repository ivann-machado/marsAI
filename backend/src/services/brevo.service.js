import * as Brevo from '@getbrevo/brevo';
import { getBrevoClient } from '../config/brevo.js';
import { DEV_MODE } from '../config/index.js';

/**
 * Helper to configure the base SMTP email object
 * @param {string|string[]} to
 * @param {object} config
 * @param {object | null} [senderOverride]
 * @returns {Brevo.SendSmtpEmail}
 */
const configureBaseEmail = (to, config, senderOverride = null) => {
	const sendSmtpEmail = new Brevo.SendSmtpEmail();

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
 * @param {string|string[]} to - Recipient email(s)
 * @param {string} subject - Email subject
 * @param {string} htmlContent - HTML content of the email
 * @param {string} [textContent] - Plain text content (optional, stripped from HTML if not provided)
 * @param {object | null} [senderOverride] - Optional sender override {name, email}
 * @returns {Promise<object>} - API response
 */
export const sendEmail = async (to, subject, htmlContent, textContent = '', senderOverride = null) => {
	try {
		if (DEV_MODE) {
			console.log(`Preparing to send email to: ${to}`);
		}

		const { api, config } = getBrevoClient();
		const sendSmtpEmail = configureBaseEmail(to, config, senderOverride);

		sendSmtpEmail.subject = subject;
		sendSmtpEmail.htmlContent = htmlContent;
		sendSmtpEmail.textContent = textContent || htmlContent.replace(/<[^>]*>/g, '');

		const response = await api.sendTransacEmail(sendSmtpEmail);

		const messageId = response.messageId || response.body?.messageId;
		if (DEV_MODE) {
			console.log(`Email sent successfully! Message ID: ${messageId}`);
		}
		return response;

	} catch (error) {
		console.error('Error sending email via Brevo:', error);
		if (error.response && error.response.body) {
			console.error('Brevo API Error Details:', error.response.body);
		}
		throw new Error(`Email sending failed: ${error.message}`);
	}
};

/**
 * Send a template-based email (if you use Brevo templates)
 * @param {string|string[]} to - Recipient email(s)
 * @param {number} templateId - Brevo Template ID
 * @param {object} params - Dynamic parameters for the template
 * @returns {Promise<object>}
 */
export const sendTemplateEmail = async (to, templateId, params = {}) => {
	try {
		if (DEV_MODE) {
			console.log(`Preparing to send template email (${templateId}) to: ${to}`);
		}

		const { api, config } = getBrevoClient();
		const sendSmtpEmail = configureBaseEmail(to, config);

		sendSmtpEmail.templateId = templateId;
		sendSmtpEmail.params = params;

		const response = await api.sendTransacEmail(sendSmtpEmail);

		const messageId = response.body?.messageId || response.messageId;
		if (DEV_MODE) {
			console.log(`Template email sent successfully! Message ID: ${messageId}`);
		}
		return response;

	} catch (error) {
		console.error('Error sending template email via Brevo:', error);
		if (error.response && error.response.body) {
			console.error('Brevo API Error Details:', error.response.body);
		}
		throw new Error(`Template email sending failed: ${error.message}`);
	}
};
