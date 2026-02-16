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
/**
 * @openapi
 * /newsletter:
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
export const subscribeNewsletter = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		await createNewsletter(email);
		return res.status(201).json({ message: "Subscription successful" });
	} catch (error) {
		if (error.errno === 1062 || error.code === 'ER_DUP_ENTRY') {
			return res.status(409).json({ message: "Email already subscribed" });
		}
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
