import { getConnection } from "../config/db.js";
import {
	insertJury,
	selectJuryById,
	selectAllJuries,
	updateJury,
	deleteJury,
} from "../models/jury.model.js";
import { deleteFile, getFileUrl } from "../services/bucket.service.js";

/**
 * Create a new jury member.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const createJury = async (req, res) => {
	let conn;
	try {
		const { edition_id, name, bio, profession } = req.body;

		if (!edition_id || !name || !req.file) {
			return res.status(400).json({
				message: "edition_id, name and photo are required",
			});
		}

		const finalPhoto = req.file ? req.file.location : null;

		const result = await insertJury(
			{ edition_id, name, bio, photo: finalPhoto, profession },
			conn
		);

		res.status(201).json({
			message: "Jury member created",
			id: result.insertId.toString(),
		});
	} catch (error) {
		console.error("Create Jury Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Retrieve all jury members.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const getAllJuries = async (req, res) => {
	try {
		const juries = await selectAllJuries();
		const juriesWithUrls = juries.map(jury => {
			return {
				...jury,
				photo: getFileUrl(jury.photo)
			};
		});
		res.status(200).json(juriesWithUrls);
	} catch (error) {
		console.error("Get All Juries Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Retrieve a single jury member by ID.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const getJuryById = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: "Jury id is required",
			});
		}

		const result = await selectJuryById(id);
		const jury = result[0];

		if (!jury) {
			return res.status(404).json({
				message: "Jury not found",
			});
		}

		res.status(200).json({
			...jury,
			photo: getFileUrl(jury.photo)
		});
	} catch (error) {
		console.error("Get Jury By Id Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Update a jury member by ID.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const setJury = async (req, res) => {
	try {
		const { id } = req.params;
		const { edition_id, name, bio, photo, profession, oldPhoto } = req.body;

		if (!id) {
			return res.status(400).json({
				message: "Jury id is required",
			});
		}

		const result = await updateJury(
			id,
			{ edition_id, name, bio, photo, profession },
		);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				message: "Jury not found",
			});
		}

		if (oldPhoto && photo && oldPhoto !== photo) {
			deleteFile(oldPhoto).catch(err => console.error("Failed to delete old jury photo:", err));
		}

		res.status(200).json({
			message: "Jury updated",
		});
	} catch (error) {
		console.error("Set Jury Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Remove a jury member by ID.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const removeJury = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: "Jury id is required",
			});
		}

		const result = await deleteJury(id);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				message: "Jury not found",
			});
		}

		res.status(200).json({
			message: "Jury deleted",
		});
	} catch (error) {
		console.error("Remove Jury Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
