import {
	insertNewsletter,
	selectAllNewsletters,
	deleteNewsletterByEmail,
} from "../models/newsletter.model.js";

/**
 * Subscribe an email address to the newsletter.
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>}
 */
export const createNewsletter = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		const result = await insertNewsletter(email);
		return res.status(201).json({
			message: "Subscription successful",
			id: result.insertId.toString(),
		});
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
export const removeNewsletter = async (req, res) => {
	try {
		const { email } = req.params;

		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		const result = await deleteNewsletterByEmail(email);

		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Subscription not found" });
		}

		res.status(200).json({ message: "Subscription deleted" });
	} catch (error) {
		console.error("Remove Newsletter Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
