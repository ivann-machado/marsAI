import {
	insertEvent,
	selectEventById,
	selectAllEvents,
	updateEvent,
	deleteEvent,
} from "../models/event.model.js";

/**
 * Create a new event.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createEvent = async (req, res) => {
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

		if (!type || !name || !url || !logo || !date) {
			return res
				.status(400)
				.json({ message: "Type, name, url, logo and date are required" });
		}

		const result = await insertEvent({
			type,
			name,
			url,
			logo,
			info,
			place,
			duration,
			cover_image,
			date,
		});

		res.status(201).json({
			message: "Event created successfully",
			id: result.insertId.toString(),
		});
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
		const events = await selectAllEvents();
		res.status(200).json(events);
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
		const rows = await selectEventById(req.params.id);
		const event = rows[0];
		if (!event) {
			return res.status(404).json({ message: "Event not found" });
		}
		res.status(200).json(event);
	} catch (error) {
		console.error("Get Event By ID Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Update an event by ID.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const setEvent = async (req, res) => {
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

		const result = await updateEvent(req.params.id, {
			type,
			name,
			url,
			logo,
			info,
			place,
			duration,
			cover_image,
			date,
		});

		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Event not found" });
		}

		res.status(200).json({ message: "Event updated successfully" });
	} catch (error) {
		console.error("Set Event Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Delete an event by ID.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const removeEvent = async (req, res) => {
	try {
		const result = await deleteEvent(req.params.id);

		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Event not found" });
		}

		res.status(200).json({ message: "Event deleted successfully" });
	} catch (error) {
		console.error("Remove Event Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
