import { getConnection } from "../config/db.js";

import {
	insertSponsor,
	selectSponsorById,
	selectAllSponsors,
	updateSponsorById,
	deleteSponsorById,
} from "../models/sponsor.model.js";

/**
 * Create a new sponsor
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const createSponsor = async (req, res) => {
	try {
		const { edition_id, type, name, url, logo } = req.body;

		if (!edition_id || !name) {
			return res.status(400).json({
				message: "edition_id and name are required",
			});
		}

		const result = await insertSponsor({ edition_id, type, name, url, logo });
		res.status(201).json({
			message: "Sponsor created",
			id: result.insertId,
		});
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
		const sponsors = await selectAllSponsors();

		res.status(200).json(sponsors);
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

		const result = await selectSponsorById(id);

		if (!result.length) {
			return res.status(404).json({
				message: "Sponsor not found",
			});
		}

		res.status(200).json(result[0]);
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
 */
export const updateSponsor = async (req, res) => {
	try {
		const { id } = req.params;

		const { edition_id, type, name, url, logo } = req.body;

		if (!id) {
			return res.status(400).json({
				message: "Sponsor id is required",
			});
		}

		const result = await selectSponsorById(id);

		if (!result.length) {
			return res.status(404).json({
				message: "Sponsor not found",
			});
		}

		const result = await updateSponsorById(
			id,
			{ edition_id, type, name, url, logo },
		);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				message: "Sponsor not found",
			});
		}
		res.status(200).json({ message: "Sponsor updated" });
	} catch (error) {
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
 */
export const removeSponsor = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: "Sponsor id is required",
			});
		}

		const existingSponsor = await selectSponsorById(id);

		if (!existingSponsor) {
			return res.status(404).json({
				message: "Sponsor not found",
			});
		}

		const result = await deleteSponsorById(id);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				message: "Sponsor not found",
			});
		}
		res.status(200).json({ message: "Sponsor deleted" });
	} catch (error) {
		console.error("Delete Sponsor Error:", error);

		res.status(500).json({
			message: "Server error",
		});
	}
};
