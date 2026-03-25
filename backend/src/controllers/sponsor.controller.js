import prisma from "../config/prisma.config.ts";
import { paginate } from "../utils/paginate.util.js";
import { deleteFile, getFileUrl } from "../services/s3.service.js";

/**
 * Create a new sponsor
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const createSponsor = async (req, res, next) => {
	try {
		const { edition_id, type, name, url, logo } = req.body;

		if (!edition_id || !name || (!logo && !req.file)) {
			return res.status(400).json({
				message: "edition_id, name and logo are required",
			});
		}

		const sponsor = await prisma.sponsors.create({
			data: {
				edition_id: Number(edition_id),
				type: type || "other",
				name,
				url: url || "",
				logo: logo || (req.file ? req.file.location : ""),
			},
		});

		res.status(201).json({
			message: "Sponsor created",
			id: sponsor.id.toString(),
		});
		next();
	} catch (error) {
		console.error("Create Sponsor Error:", error);
		res.status(500).json({
			message: "Server error",
		});
	}
};

/**
 * Get all sponsors
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const getAllSponsors = async (req, res) => {
	try {
		const { page, limit } = req.query;

		const result = await paginate(prisma.sponsors, {
			page,
			limit,
			orderBy: { id: "desc" },
		});

		result.data = result.data.map(sponsor => ({
			...sponsor,
			logo: getFileUrl(sponsor.logo)
		}));

		res.status(200).json(result);
	} catch (error) {
		console.error("Get Sponsors Error:", error);
		res.status(500).json({
			message: "Server error",
		});
	}
};

/**
 * Get sponsor by id
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const getSponsorById = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: "Sponsor id is required",
			});
		}

		const sponsor = await prisma.sponsors.findUnique({
			where: { id: Number(id) },
		});

		if (!sponsor) {
			return res.status(404).json({
				message: "Sponsor not found",
			});
		}

		res.status(200).json({
			...sponsor,
			logo: getFileUrl(sponsor.logo)
		});
	} catch (error) {
		console.error("Get Sponsor By Id Error:", error);
		res.status(500).json({
			message: "Server error",
		});
	}
};

/**
 * Update sponsor
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const updateSponsor = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { edition_id, type, name, url, logo, oldLogo } = req.body;

		if (!id) {
			return res.status(400).json({
				message: "Sponsor id is required",
			});
		}

		await prisma.sponsors.update({
			where: { id: Number(id) },
			data: {
				edition_id: edition_id ? Number(edition_id) : undefined,
				type,
				name,
				url,
				logo,
			},
		});

		if (oldLogo && logo && oldLogo !== logo) {
			deleteFile(oldLogo).catch(err => console.error("Failed to delete old sponsor logo:", err));
		}

		res.status(200).json({ message: "Sponsor updated" });
		next();
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({
				message: "Sponsor not found",
			});
		}
		console.error("Update Sponsor Error:", error);
		res.status(500).json({
			message: "Server error",
		});
	}
};

/**
 * Delete sponsor
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
*/
export const removeSponsor = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: "Sponsor id is required",
			});
		}

		await prisma.sponsors.delete({
			where: { id: Number(id) },
		});

		res.status(200).json({ message: "Sponsor deleted" });
		next();
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({
				message: "Sponsor not found",
			});
		}
		console.error("Delete Sponsor Error:", error);
		res.status(500).json({
			message: "Server error",
		});
	}
};
