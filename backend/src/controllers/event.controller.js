import { getConnection } from "../config/db.js";

import {
	createEvent,
	findEventById,
	findAllEvents,
	updateEventById,
	deleteEventById,
} from "../models/event.model.js";

export const create = async (req, res) => {

	let conn;

	try {

		const { type, name, url, logo, date } = req.body;

		if (!type || !name || !logo || !date) {
			return res.status(400).json({
				message: "type, name, logo and date are required",
			});
		}

		conn = await getConnection();

		await conn.beginTransaction();

		const eventId = await createEvent(
			{ type, name, url, logo, date },
			conn
		);

		await conn.commit();

		res.status(201).json({
			message: "Event created",
			id: Number(eventId),
		});

	} catch (error) {

		if (conn) await conn.rollback();

		console.error("Create Event Error:", error);

		res.status(500).json({
			message: "Server error",
		});

	} finally {

		if (conn) conn.release();

	}
};


export const getAll = async (req, res) => {
	let conn;
	try {
		conn = await getConnection();
		await conn.beginTransaction();

		const events = await findAllEvents(conn);

		await conn.commit();

		res.status(200).json(events);
	} catch (error) {
		console.error("Get Events Error:", error);
		res.status(500).json({ message: "Server error" });
	} finally {
		if (conn) conn.release();
	}
};


export const getById = async (req, res) => {
    let conn;
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({message: "Even id is required"});

        }

        conn = await getConnection();
        await conn.beginTransaction();

        const event =  await findEventById (id, conn);

        if (!event) {
            await conn.commit();
            res.status(404).json({message: "Page not found"});
        }

        await conn.commit();
		res.status(200).json(event);
        
    } catch (error) {
        
    }
}


export const update = async (req, res) => {

	let conn;

	try {

		const { id } = req.params;

		const { type, name, url, logo, date } = req.body;

		if (!id) {
			return res.status(400).json({
				message: "Event id is required",
			});
		}

		conn = await getConnection();

		await conn.beginTransaction();

		const existingEvent = await findEventById(id, conn);

		if (!existingEvent) {

			await conn.commit();

			return res.status(404).json({
				message: "Event not found",
			});
		}

		const affectedRows = await updateEventById(
			id,
			{ type, name, url, logo, date },
			conn
		);

		await conn.commit();

		res.status(200).json({
			message: "Event updated",
			affectedRows,
		});

	} catch (error) {

		if (conn) await conn.rollback();

		console.error("Update Event Error:", error);

		res.status(500).json({
			message: "Server error",
		});

	} finally {

		if (conn) conn.release();

	}
};


export const remove = async (req, res) => {

	let conn;

	try {

		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: "Event id is required",
			});
		}

		conn = await getConnection();

		await conn.beginTransaction();

		const existingEvent = await findEventById(id, conn);

		if (!existingEvent) {

			await conn.commit();

			return res.status(404).json({
				message: "Event not found",
			});
		}

		const affectedRows = await deleteEventById(id, conn);

		await conn.commit();

		res.status(200).json({
			message: "Event deleted",
			affectedRows,
		});

	} catch (error) {

		if (conn) await conn.rollback();

		console.error("Delete Event Error:", error);

		res.status(500).json({
			message: "Server error",
		});

	} finally {

		if (conn) conn.release();

	}
};