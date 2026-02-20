import {
	insertNewsletter,
	selectAllNewsletters,
	deleteNewsletterByEmail,
	selectNewsletterByEmail,
} from "../models/newsletter.model.js";

import { sendEmail } from "../services/brevo.service.js";


/**
 * Send newsletter to all subscribers
 */
export const sendNewsletter = async (req, res) => {
	try {
		const { subject, htmlContent } = req.body;

		if (!subject || !htmlContent) {
			return res.status(400).json({
				message: "subject and htmlContent are required",
			});
		}

		const rows = await selectAllNewsletters();

		if (!rows || rows.length === 0) {
			return res.status(404).json({
				message: "No subscribers found",
			});
		}

		const emails = rows.map((sub) => sub.email);

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
 * Subscribe email
 */
export const createNewsletter = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({
				message: "Email is required",
			});
		}

		// validation format email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			return res.status(400).json({
				message: "Invalid email format",
			});
		}

		// check duplicate
		const existing = await selectNewsletterByEmail(email);

		if (existing.length > 0) {
			return res.status(409).json({
				message: "Email already subscribed",
			});
		}

		await insertNewsletter(email);

		// email de bienvenue
		await sendEmail(
			[email],
			"Welcome to MarsAI Newsletter",
			"<h2>Welcome to MarsAI</h2><p>Thank you for subscribing.</p>"
		);

		res.status(201).json({
			message: "Subscription successful",
		});
	} catch (error) {
		console.error("Create Newsletter Error:", error);

		res.status(500).json({
			message: "Server error",
		});
	}
};



/**
 * Get all subscribers
 */
export const getAllNewsletters = async (req, res) => {
	try {
		const rows = await selectAllNewsletters();

		res.status(200).json({
			total: rows.length,
			data: rows,
		});
	} catch (error) {
		console.error("Get All Newsletters Error:", error);

		res.status(500).json({
			message: "Server error",
		});
	}
};



/**
 * Remove subscriber
 */
export const removeNewsletter = async (req, res) => {
	try {
		const { email } = req.params;

		if (!email) {
			return res.status(400).json({
				message: "Email is required",
			});
		}

		await deleteNewsletterByEmail(email);

		res.status(200).json({
			message: "Subscription deleted successfully",
		});
	} catch (error) {
		console.error("Remove Newsletter Error:", error);

		res.status(500).json({
			message: "Server error",
		});
	}
};
