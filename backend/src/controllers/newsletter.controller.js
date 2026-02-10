import {
	createNewsletter,
	findNewsletterByEmail,
	findAllNewsletters,
	deleteNewsletterByEmail,
} from "../models/newsletter.model.js";

/**
 * Subscribe an email address to the newsletter.
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>}
 */
export const subscribeNewsletter = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		const existing = await findNewsletterByEmail(email);
		if (existing) {
			return res
				.status(409)
				.json({ message: "Email already subscribed" });
		}

		await createNewsletter(email);
		return res.status(201).json({ message: "Subscription successful" });
	} catch (error) {
		console.error("Newsletter Subscribe Error:", error);
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
export const getAllNewsletters = async (req, res) => {
	try {
		const newsletters = await findAllNewsletters();
		res.status(200).json(newsletters);
	} catch (error) {
		console.error("Get Newsletters Error:", error);
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
export const deleteNewsletter = async (req, res) => {
	try {
		const { email } = req.params;

		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		await deleteNewsletterByEmail(email);
		res.status(200).json({ message: "Subscription deleted" });
	} catch (error) {
		console.error("Delete Newsletter Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
