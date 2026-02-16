import { pool } from "../config/db.js";

export const createJury = async (
	{ edition_id, name, bio, photo, profession },
	conn = null,
) => {
	const sql =
		"INSERT INTO jury (edition_id, name, bio, photo, profession) VALUES (?, ?, ?, ?, ?)";
	const db = conn || pool;
	const result = await db.query(sql, [
		edition_id,
		name,
		bio,
		photo,
		profession,
	]);
	return result.insertId;
};

export const findJuryById = async (id, conn = null) => {
	const sql = "SELECT * FROM jury WHERE id = ?";
	const db = conn || pool;
	const rows = await db.query(sql, [id]);
	return rows[0];
};

export const findAllJury = async (conn = null) => {
	const sql = "SELECT * FROM jury ORDER BY id DESC";
	const db = conn || pool;
	const rows = await db.query(sql);
	return rows;
};

export const updateJuryById = async (
	id,
	{ edition_id, name, bio, photo, profession },
	conn = null,
) => {
	const sql =
		"UPDATE jury SET edition_id = ?, name = ?, bio = ?, photo = ?, profession = ? WHERE id = ?";
	const db = conn || pool;
	const result = await db.query(sql, [edition_id, name, bio, photo, profession, id]);
	return result.affectedRows;
};

export const deleteJuryById = async (id, conn = null) => {
	const sql = "DELETE FROM jury WHERE id = ?";
	const db = conn || pool;
	const result = await db.query(sql, [id]);
	return result.affectedRows;
};