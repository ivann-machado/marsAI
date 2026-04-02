import { prisma } from "#config";
import { paginate } from "#utils";
import { sendEmail } from "#services";

/**
 * Send newsletter to all subscribers
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const sendNewsletter = async (req, res) => {
	try {
		const { subject, htmlContent } = req.body;

		if (!subject || !htmlContent) {
			return res.status(400).json({
				message: "subject and htmlContent are required",
			});
		}

		const subscribers = await prisma.newsletters.findMany();

		if (!subscribers || subscribers.length === 0) {
			return res.status(404).json({
				message: "No subscribers found",
			});
		}

		const emails = subscribers.map((sub) => sub.email);

		await sendEmail(emails, subject, htmlContent);

		res.status(200).json({
			message: "Newsletter sent successfully",
			total: emails.length,
		});
	} catch (error) {
		console.error("Send Newsletter Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Subscribe to the newsletter
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createNewsletter = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ message: "Invalid email format" });
		}

		await prisma.newsletters.create({
			data: { email },
		});

		// welcome email
		await sendEmail(
			[email],
			"Welcome to MarsAI Newsletter",
			"<h2>Welcome to MarsAI</h2><p>Thank you for subscribing.</p>"
		);

		return res.status(201).json({ message: "Subscription successful" });
	} catch (error) {
		if (error.code === "P2002") {
			return res.status(409).json({ message: "Email already subscribed" });
		}
		console.error("Create Newsletter Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Get all newsletter subscriptions.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllNewsletters = async (req, res) => {
	try {
		const { page, limit } = req.query;

		const result = await paginate(prisma.newsletters, {
			page,
			limit,
			orderBy: { created_at: "desc" },
		});

		res.status(200).json(result);
	} catch (error) {
		console.error("Get All Newsletters Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Remove a newsletter subscription by email.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const removeNewsletter = async (req, res) => {
	try {
		const { email } = req.params;

		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		// Prisma delete requires unique input, so we use delete if we can find by email
		// or deleteMany if email is not a unique field in schema but we treat it as such.
		// Assuming email is unique in schema.prisma as it was in the SQL.
		await prisma.newsletters.delete({
			where: { email },
		});

		res.status(200).json({ message: "Subscription deleted successfully" });
	} catch (error) {
		if (error.code === "P2025") {
			// Like original code, we don't necessarily error 404 if not found
			// but Prisma delete will throw P2025. Original commented out 404 logic.
			return res.status(200).json({ message: "Subscription deleted successfully" });
		}
		console.error("Remove Newsletter Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
