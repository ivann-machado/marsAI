import { getConnection } from "../config/db.js";

import {
	createSponsor,
	findSponsorById,
	findAllSponsors,
	updateSponsorById,
	deleteSponsorById,
} from "../models/sponsor.model.js";

/**
 * Create a new sponsor
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const create = async (req, res) => {
	let conn;

	try {
		const { edition_id, type, name, url, logo } = req.body;

		if (!edition_id || !name) {
			return res.status(400).json({
				message: "edition_id and name are required",
			});
		}

		conn = await getConnection();

		await conn.beginTransaction();

		const sponsorId = await createSponsor(
			{ edition_id, type, name, url, logo },
			conn,
		);

		await conn.commit();

		res.status(201).json({
			message: "Sponsor created",
			id: Number(sponsorId),
		});
	} catch (error) {
		if (conn) await conn.rollback();

		console.error("Create Sponsor Error:", error);

		res.status(500).json({
			message: "Server error",
		});
	} finally {
		if (conn) conn.release();
	}
};

/**
 * Get all sponsors
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const getAll = async (req, res) => {
	let conn;

	try {
		conn = await getConnection();

		await conn.beginTransaction();

		const sponsors = await findAllSponsors(conn);

		await conn.commit();

		res.status(200).json(sponsors);
	} catch (error) {
		if (conn) await conn.rollback();

		console.error("Get Sponsors Error:", error);

		res.status(500).json({
			message: "Server error",
		});
	} finally {
		if (conn) conn.release();
	}
};

/**
 * Get sponsor by id
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const getById = async (req, res) => {
	let conn;

	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: "Sponsor id is required",
			});
		}

		conn = await getConnection();

		await conn.beginTransaction();

		const sponsor = await findSponsorById(id, conn);

		if (!sponsor) {
			await conn.commit();

			return res.status(404).json({
				message: "Sponsor not found",
			});
		}

		await conn.commit();

		res.status(200).json(sponsor);
	} catch (error) {
		if (conn) await conn.rollback();

		console.error("Get Sponsor Error:", error);

		res.status(500).json({
			message: "Server error",
		});
	} finally {
		if (conn) conn.release();
	}
};

/**
 * Update sponsor
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const update = async (req, res) => {
	let conn;

	try {
		const { id } = req.params;

		const { edition_id, type, name, url, logo } = req.body;

		if (!id) {
			return res.status(400).json({
				message: "Sponsor id is required",
			});
		}

		conn = await getConnection();

		await conn.beginTransaction();

		const existingSponsor = await findSponsorById(id, conn);

		if (!existingSponsor) {
			await conn.commit();

			return res.status(404).json({
				message: "Sponsor not found",
			});
		}

		const affectedRows = await updateSponsorById(
			id,
			{ edition_id, type, name, url, logo },
			conn,
		);

		await conn.commit();

		res.status(200).json({
			message: "Sponsor updated",
			affectedRows,
		});
	} catch (error) {
		if (conn) await conn.rollback();

		console.error("Update Sponsor Error:", error);

		res.status(500).json({
			message: "Server error",
		});
	} finally {
		if (conn) conn.release();
	}
};

/**
 * Delete sponsor
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const remove = async (req, res) => {
	let conn;

	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: "Sponsor id is required",
			});
		}

		conn = await getConnection();

		await conn.beginTransaction();

		const existingSponsor = await findSponsorById(id, conn);

		if (!existingSponsor) {
			await conn.commit();

			return res.status(404).json({
				message: "Sponsor not found",
			});
		}

		const affectedRows = await deleteSponsorById(id, conn);

		await conn.commit();

		res.status(200).json({
			message: "Sponsor deleted",
			affectedRows,
		});
	} catch (error) {
		if (conn) await conn.rollback();

		console.error("Delete Sponsor Error:", error);

		res.status(500).json({
			message: "Server error",
		});
	} finally {
		if (conn) conn.release();
	}
};
