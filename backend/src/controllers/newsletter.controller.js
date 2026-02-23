import {
	insertNewsletter,
	selectAllNewsletters,
	deleteNewsletterByEmail,
} from "../models/newsletter.model.js";
import { sendEmail } from "../services/brevo.service.js";


/**
 * Send newsletter to all subscribers
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>}
 */
export const sendNewsletter = async (req, res) => {
	try {
		const { subject, htmlContent } = req.body;

		if (!subject || !htmlContent) {
			return res.status(400).json({
				message: "subject and htmlContent are required",
			});
		}

		const subscribed = await selectAllNewsletters();

		if (!subscribed || subscribed.length === 0) {
			return res.status(404).json({
				message: "No subscribers found",
			});
		}

		const emails = subscribed.map((sub) => sub.email);

		await sendEmail(emails, subject, htmlContent);

		res.status(200).json({
			message: "Newsletter sent successfully",
			total: emails.length,
		});
	} catch (error) {
		console.error("Send Newsletter Error:", error);

		res.status(500).json({
			message: "Server error",
		});
	}
};


/**
 * Subscribe an email address to the newsletter.
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>}
 */

/**
 * @openapi
 * /newsletter/subscribe:
 *   post:
 *     summary: Subscribe to the newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subscription successful
 *       400:
 *         description: Email is required
 *       409:
 *         description: Email already subscribed
 *       500:
 *         description: Server error
 */
export const createNewsletter = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			return res.status(400).json({
				message: "Invalid email format",
			});
		}

		await insertNewsletter(email);
		// email de bienvenue
		await sendEmail(
			[email],
			"Welcome to MarsAI Newsletter",
			"<h2>Welcome to MarsAI</h2><p>Thank you for subscribing.</p>"
		);
		return res.status(201).json({ message: "Subscription successful" });


	} catch (error) {
		if (error.errno === 1062 || error.code === 'ER_DUP_ENTRY') {
			return res.status(409).json({ message: "Email already subscribed" });
		}
		console.error("Create Newsletter Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};


/**
 * Retrieve all newsletter subscriptions.
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>}
 */
/**
 * @openapi
 * /newsletter:
 *   get:
 *     summary: Retrieve all newsletter subscriptions
 *     tags: [Newsletter]
 *     responses:
 *       200:
 *         description: List of subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
export const getAllNewsletters = async (req, res) => {
	try {
		const newsletters = await selectAllNewsletters();
		res.status(200).json(newsletters);
	} catch (error) {
		console.error("Get All Newsletters Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};


/**
 * Delete a newsletter subscription by email.
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>}
 */
/**
 * @openapi
 * /newsletter/{email}:
 *   delete:
 *     summary: Delete a newsletter subscription
 *     tags: [Newsletter]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription deleted
 *       400:
 *         description: Email is required
 *       500:
 *         description: Server error
 */
export const removeNewsletter = async (req, res) => {
	try {
		const { email } = req.params;

		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		await deleteNewsletterByEmail(email);

		/**
		* We won't notify the user if the email is not found
		*/
		// const result = await deleteNewsletterByEmail(email);
		// if (result.affectedRows === 0) {
		// 	return res.status(404).json({ message: "Subscription not found" });
		// }
		res.status(200).json({ message: "Subscription deleted successfully" });
	} catch (error) {
		console.error("Remove Newsletter Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
