import { renderView } from "../utils/view.util.js";
import { sendEmail } from "../services/brevo.service.js";


/**
 * Contact the company.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export const contact = async (req, res) => {
	try {
		const { name, email, message } = req.body;

		if (!name || !email || !message) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const htmlContent = await renderView('emails/contact.html', { name, email, message });
		await sendEmail(email, "Contact", htmlContent);

		return res.status(200).json({ message: "Message sent successfully" });
	} catch (error) {
		console.error("Contact Error:", error);
		return res.status(500).json({ message: "Server error" });
	}
};
