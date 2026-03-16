import prisma from "../config/prisma.js";
import { paginate } from "../utils/paginate.util.js";
import { deleteFile, getFileUrl } from "../services/s3.service.js";

/**
 * Create a new jury member.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const createJury = async (req, res, next) => {
	try {
		const { edition_id, name, bio, profession } = req.body;

		if (!edition_id || !name || !req.file) {
			return res.status(400).json({
				message: "edition_id, name and photo are required",
			});
		}

		const finalPhoto = req.file ? req.file.location : null;

		const jury = await prisma.jury.create({
			data: {
				edition_id: Number(edition_id),
				name,
				bio: bio || "",
				photo: finalPhoto,
				profession: profession || "",
			},
		});

		res.status(201).json({
			message: "Jury member created",
			id: jury.id.toString(),
		});
		next();
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
		const { page, limit } = req.query;

		const result = await paginate(prisma.jury, {
			page,
			limit,
			orderBy: { id: "desc" },
		});

		result.data = result.data.map(jury => ({
			...jury,
			photo: getFileUrl(jury.photo)
		}));

		res.status(200).json(result);
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

		const jury = await prisma.jury.findUnique({
			where: { id: Number(id) },
		});

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
 * @param {import("express").NextFunction} next
 */
export const setJury = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { edition_id, name, bio, photo, profession, oldPhoto } = req.body;

		if (!id) {
			return res.status(400).json({
				message: "Jury id is required",
			});
		}

		await prisma.jury.update({
			where: { id: Number(id) },
			data: {
				edition_id: edition_id ? Number(edition_id) : undefined,
				name,
				bio,
				photo,
				profession,
			},
		});

		if (oldPhoto && photo && oldPhoto !== photo) {
			deleteFile(oldPhoto).catch(err => console.error("Failed to delete old jury photo:", err));
		}

		res.status(200).json({
			message: "Jury updated",
		});
		next();
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({
				message: "Jury not found",
			});
		}
		console.error("Set Jury Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Remove a jury member by ID.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const removeJury = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: "Jury id is required",
			});
		}

		await prisma.jury.delete({
			where: { id: Number(id) },
		});

		res.status(200).json({
			message: "Jury deleted",
		});
		next();
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({
				message: "Jury not found",
			});
		}
		console.error("Remove Jury Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
