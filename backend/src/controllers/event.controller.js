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
export const create = async (req, res) => {
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

		const eventId = await insertEvent({
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
			id: eventId.toString(),
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
export const getAll = async (req, res) => {
	try {
		const events = await selectAllEvents();
		res.status(200).json(events);
	} catch (error) {
		console.error("Get Events Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Get an event by ID.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getById = async (req, res) => {
	try {
		const event = await selectEventById(req.params.id);
		if (!event) {
			return res.status(404).json({ message: "Event not found" });
		}
		res.status(200).json(event);
	} catch (error) {
		console.error("Get Event Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Update an event by ID.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const update = async (req, res) => {
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

		const affectedRows = await updateEvent(req.params.id, {
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

		if (affectedRows === 0) {
			return res.status(404).json({ message: "Event not found" });
		}

		res.status(200).json({ message: "Event updated successfully" });
	} catch (error) {
		console.error("Update Event Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Delete an event by ID.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const remove = async (req, res) => {
	try {
		const affectedRows = await deleteEvent(req.params.id);

		if (affectedRows === 0) {
			return res.status(404).json({ message: "Event not found" });
		}

		res.status(200).json({ message: "Event deleted successfully" });
	} catch (error) {
		console.error("Delete Event Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
