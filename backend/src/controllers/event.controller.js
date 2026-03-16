import prisma from "../config/prisma.config.js";
import { paginate } from "../utils/paginate.util.js";
import { deleteFile, getFileUrl } from "../services/s3.service.js";

/**
 * Create a new event.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const createEvent = async (req, res, next) => {
	try {
		const {
			type,
			name,
			url,
			logo,
			info,
			place,
			duration,
			cover_image,
			date,
		} = req.body;

		if (!type || !name || !url || (!logo && !req.file) || !date) {
			return res
				.status(400)
				.json({ message: "Type, name, url, logo and date are required" });
		}

		const event = await prisma.events.create({
			data: {
				type,
				name,
				url,
				logo: logo || (req.file ? req.file.location : ""),
				info: info || "",
				place: place || "",
				duration: duration ? Number(duration) : 0,
				cover_image: cover_image || "",
				date: new Date(date),
			},
		});

		res.status(201).json({
			message: "Event created successfully",
			id: event.id.toString(),
		});
		next();
	} catch (error) {
		console.error("Create Event Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Get all events.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllEvents = async (req, res) => {
	try {
		const { page, limit } = req.query;

		const result = await paginate(prisma.events, {
			page,
			limit,
			orderBy: { date: "desc" },
		});

		result.data = result.data.map(event => ({
			...event,
			logo: getFileUrl(event.logo),
			cover_image: getFileUrl(event.cover_image)
		}));

		res.status(200).json(result);
	} catch (error) {
		console.error("Get All Events Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Get an event by ID.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEventById = async (req, res) => {
	try {
		const event = await prisma.events.findUnique({
			where: { id: Number(req.params.id) },
		});

		if (!event) {
			return res.status(404).json({ message: "Event not found" });
		}

		res.status(200).json({
			...event,
			logo: getFileUrl(event.logo),
			cover_image: getFileUrl(event.cover_image)
		});
	} catch (error) {
		console.error("Get Event By ID Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Update an event by ID.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const setEvent = async (req, res, next) => {
	try {
		const {
			type,
			name,
			url,
			logo,
			info,
			place,
			duration,
			cover_image,
			date,
			oldLogo,
			oldCover_image
		} = req.body;

		await prisma.events.update({
			where: { id: Number(req.params.id) },
			data: {
				type,
				name,
				url,
				logo,
				info,
				place,
				duration: duration ? Number(duration) : undefined,
				cover_image,
				date: date ? new Date(date) : undefined,
			},
		});

		if (oldLogo && logo && oldLogo !== logo) {
			deleteFile(oldLogo).catch(err => console.error("Failed to delete old event logo:", err));
		}
		if (oldCover_image && cover_image && oldCover_image !== cover_image) {
			deleteFile(oldCover_image).catch(err => console.error("Failed to delete old event cover:", err));
		}

		res.status(200).json({ message: "Event updated successfully" });
		next();
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "Event not found" });
		}
		console.error("Set Event Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Delete an event by ID.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const removeEvent = async (req, res, next) => {
	try {
		await prisma.events.delete({
			where: { id: Number(req.params.id) },
		});

		res.status(200).json({ message: "Event deleted successfully" });
		next();
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "Event not found" });
		}
		console.error("Remove Event Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
