import { renderView } from "../utils/view.util.js";
import { sendEmail } from "../services/brevo.service.js";
import { CONTACT_MAIL } from "../config/index.js";


/**
 * Contact the company.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */

/**
 * @openapi
 * /contact:
 *   post:
 *     summary: Contact the company
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Server error
 */
export const contact = async (req, res) => {
	try {
		const { name, email, message } = req.body;

		if (!name || !email || !message) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const htmlContent = await renderView('emails/contact.html', { name, email, message });
		await sendEmail(CONTACT_MAIL, "Contact", htmlContent);

		return res.status(200).json({ message: "Message sent successfully" });
	} catch (error) {
		console.error("Contact Error:", error);
		return res.status(500).json({ message: "Server error" });
	}
};
