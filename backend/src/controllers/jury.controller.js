import { getConnection } from "../config/db.js";
import {
	createJury,
	findJuryById,
	findAllJury,
	updateJuryById,
	deleteJuryById,
} from "../models/jury.model.js";

export const createJuryController = async (req, res) => {
	let conn;
	try {
		const { edition_id, name, bio, photo, profession } = req.body;

		if (!edition_id || !name) {
			return res
				.status(400)
				.json({ message: "edition_id, name are required" });
		}

		conn = await getConnection();
		await conn.beginTransaction();

		const juryId = await createJury(
			{ edition_id, name, bio, photo, profession },
			conn,
		);
		await conn.commit();
		res.status(201).json({
			message: "Jury membres created",
			id: Number(juryId),
		});
	} catch (error) {
		if (conn) await conn.rollback();
		console.error("Create jury error", error);
		res.status(500).json({ message: "Server error" });
	} finally {
		if (conn) conn.release();
	}
};

export const getAll = async (req, res) => {
	let conn;

	try {
		conn = await getConnection();
		await conn.commit();

		const juries = await findAllJury(conn);

		await conn.commit();
		res.status(200).json(juries);
	} catch (error) {
		if (conn) await conn.rollback();
		console.error("Get All Jury Error", error);
		res.status(500).json({ message: "Server error" });
	} finally {
		if (conn) conn.release();
	}
};

export const getBIyd = async (req, res) => {
	let conn;
	try {
		const { id } = req.params;
		if (!id) return res.status(400).json({ message: "Jury are required" });

		conn = await getConnection();
		await conn.commit();

		const jury = await findJuryById(id, conn);
		await conn.commit();

		if (!jury) return res.status(404).json({ message: "Jury not found" });

		res.status(200).json(!jury);
	} catch (error) {
		if (conn) await conn.rollback();
		console.error("Get Jury By Id Error:", error);
		res.status(500).json({ message: "Server error" });
	} finally {
		if (conn) conn.release();
	}
};

export const update = async (req, res) => {
	let conn;
	try {
		const { id } = req.params;
		const { edition_id, name, bio, photo, profession } = req.body;

		if (id) return res.status(400).json({ message: "Jury id is required" });

		conn = await getConnection();
		await conn.commit();

		const existingjury = await findJuryById(id, conn);
		if (!existingjury) {
			await conn.commit();
			res.status(404).json({ message: "Jury not found" });
		}
		const affectedRows = await updateJuryById(id, {
			edition_id,
			name,
			bio,
			photo,
			profession,
		});
		await conn.commit();
		res.status(200).json({ message: "jury updated", affectedRows });
	} catch (error) {
		if (conn) await conn.rollback();
		console.error("Update Jury Error:", error);
		res.status(500).json({ message: "Server error" });
	} finally {
		if (conn) conn.release();
	}
};

export const remove = async (req, res) => {
	let conn;
	try {
		const { id } = req.params;
		if (!id)
			return res.status(400).json({ message: "Jury id is required" });

		conn = await getConnection();
		await conn.commit();

		const existingjury = await findJuryById(id, conn);
		if (!existingjury) {
			await conn.commit();
			res.status(404).json({ message: "Jury not found" });
		}

		const affectedRows = deleteJuryById(id, conn);
		await conn.commit();
		res.status(200).json({ message: "Jury deleted:", affectedRows });
	} catch (error) {
		if (conn) conn.rollback();
		console.error("Delete Jury Error", error);
		res.status(500).json({ message: "Server error" });
	} finally {
		if (conn) conn.release();
	}
};