import { getConnection } from "../config/db.js";
import {
	createJury,
	findJuryById,
	findAllJury,
	updateJuryById,
	deleteJuryById,
} from "../models/jury.model.js";

/**
 * Create a new jury member.
 *
 * HTTP: POST /api/jury
 *
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 *
 * @returns {Promise<void>}
 */
export const create = async (req, res) => {
	let conn;
	try {
		const { edition_id, name, bio, photo, profession } = req.body;

		if (!edition_id || !name) {
			return res.status(400).json({
				message: "edition_id and name are required",
			});
		}

		conn = await getConnection();
		await conn.beginTransaction();

		const juryId = await createJury(
			{ edition_id, name, bio, photo, profession },
			conn
		);

		await conn.commit();

		res.status(201).json({
			message: "Jury member created",
			id: Number(juryId),
		});
	} catch (error) {
		if (conn) await conn.rollback();
		console.error("Create Jury Error:", error);
		res.status(500).json({ message: "Server error" });
	} finally {
		if (conn) conn.release();
	}
};

/**
 * Retrieve all jury members.
 *
 * HTTP: GET /api/jury
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 *
 * @returns {Promise<void>}
 */
export const getAll = async (req, res) => {
	let conn;
	try {
		conn = await getConnection();
		await conn.beginTransaction();

		const juries = await findAllJury(conn);

		await conn.commit();

		res.status(200).json(juries);
	} catch (error) {
		if (conn) await conn.rollback();
		console.error("Get All Jury Error:", error);
		res.status(500).json({ message: "Server error" });
	} finally {
		if (conn) conn.release();
	}
};

/**
 * Retrieve a single jury member by ID.
 *
 * HTTP: GET /api/jury/:id
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 *
 * @returns {Promise<void>}
 */
export const getById = async (req, res) => {
	let conn;
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: "Jury id is required",
			});
		}

		conn = await getConnection();
		await conn.beginTransaction();

		const jury = await findJuryById(id, conn);

		if (!jury) {
			await conn.commit();
			return res.status(404).json({
				message: "Jury not found",
			});
		}

		await conn.commit();

		res.status(200).json(jury);
	} catch (error) {
		if (conn) await conn.rollback();
		console.error("Get Jury By Id Error:", error);
		res.status(500).json({ message: "Server error" });
	} finally {
		if (conn) conn.release();
	}
};

/**
 * Update a jury member by ID.
 *
 * HTTP: PUT /api/jury/:id
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 *
 * @returns {Promise<void>}
 */
export const update = async (req, res) => {
	let conn;
	try {
		const { id } = req.params;
		const { edition_id, name, bio, photo, profession } = req.body;

		if (!id) {
			return res.status(400).json({
				message: "Jury id is required",
			});
		}

		conn = await getConnection();
		await conn.beginTransaction();

		const existingjury = await findJuryById(id, conn);

		if (!existingjury) {
			await conn.commit();
			return res.status(404).json({
				message: "Jury not found",
			});
		}

		const affectedRows = await updateJuryById(
			id,
			{ edition_id, name, bio, photo, profession },
			conn
		);

		await conn.commit();

		res.status(200).json({
			message: "Jury updated",
			affectedRows,
		});
	} catch (error) {
		if (conn) await conn.rollback();
		console.error("Update Jury Error:", error);
		res.status(500).json({ message: "Server error" });
	} finally {
		if (conn) conn.release();
	}
};

/**
 * Delete a jury member by ID.
 *
 * HTTP: DELETE /api/jury/:id
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 *
 * @returns {Promise<void>}
 */
export const remove = async (req, res) => {
	let conn;
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: "Jury id is required",
			});
		}

		conn = await getConnection();
		await conn.beginTransaction();

		const existingjury = await findJuryById(id, conn);

		if (!existingjury) {
			await conn.commit();
			return res.status(404).json({
				message: "Jury not found",
			});
		}

		const affectedRows = await deleteJuryById(id, conn);

		await conn.commit();

		res.status(200).json({
			message: "Jury deleted",
			affectedRows,
		});
	} catch (error) {
		if (conn) await conn.rollback();
		console.error("Delete Jury Error:", error);
		res.status(500).json({ message: "Server error" });
	} finally {
		if (conn) conn.release();
	}
};
