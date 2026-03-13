import prisma from "../config/prisma.js";
import { paginate } from "../utils/paginate.util.js";
import { getFileUrl } from "../services/bucket.service.js";
import { uploadVideo } from "../services/youtube.service.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       properties:
 *         filename:
 *           type: string
 *         email:
 *           type: string
 *         cover_image:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         country_id:
 *           type: integer
 *           nullable: true
 *         producer:
 *           type: string
 *         producer_image:
 *           type: string
 *         linkedin_link:
 *           type: string
 *         youtube_link:
 *           type: string
 *         scenario_ai:
 *           type: string
 *         video_gen_ai:
 *           type: string
 *         sound_ai:
 *           type: string
 *         postprod_ai:
 *           type: string
 *         tags:
 *           type: string
 */

/** Shared include object for eager-loading video relations. */
const videoIncludes = {
	editions: true,
	countries: true,
	subtitles: true,
};

/**
 * Return all videos (paginated).
 * Query params: ?page=1&limit=10
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllVideos = async (req, res) => {
	try {
		const { page, limit } = req.query;

		const result = await paginate(prisma.videos, {
			page,
			limit,
			include: videoIncludes,
			orderBy: { id: "desc" },
		});

		result.data = result.data.map((video) => ({
			...video,
			filename: getFileUrl(video.filename),
			cover_image: getFileUrl(video.cover_image),
			subtitles: video.subtitles.map((sub) => ({
				...sub,
				filename: getFileUrl(sub.filename),
			})),
		}));

		res.status(200).json(result);
	} catch (err) {
		console.error("Get All Videos Error:", err);
		res.status(500).json({ message: "failed to fetch videos" });
	}
};

/**
 * Return a single video by id.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getVideoById = async (req, res) => {
	try {
		const video = await prisma.videos.findUnique({
			where: { id: Number(req.params.id) },
			include: videoIncludes,
		});

		if (!video) {
			return res.status(404).json({ message: "Video not found" });
		}

		res.status(200).json({
			...video,
			filename: getFileUrl(video.filename),
			producer_image: getFileUrl(video.producer_image),
			cover_image: getFileUrl(video.cover_image),
			subtitles: video.subtitles.map((sub) => ({
				...sub,
				filename: getFileUrl(sub.filename),
			})),
		});
	} catch (err) {
		console.error("Get Video By ID Error:", err);
		res.status(500).json({ message: "Error fetching video" });
	}
};

/**
 * Create a new video.
 * Uses a Prisma transaction to atomically create the video record.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createVideo = async (req, res) => {
	const body = req.body;
	try {
		if (!body.filename || body.filename === "undefined") {
			return res.status(400).json({ message: "Video file is required" });
		}

		if (!body.country_id) {
			return res.status(400).json({ message: "country_id is required" });
		}

		if (!body.edition_id) {
			return res.status(400).json({ message: "edition_id is required" });
		}

		// Use a transaction: create video + auto-create review if admin_id is provided
		const adminId = body.admin_id ? Number(body.admin_id) : null;

		const video = await prisma.videos.create({
			data: {
				edition_id: Number(body.edition_id),
				url: body.url ?? "",
				filename: body.filename,
				email: body.email,
				cover_image: body.cover_image ?? "",
				verified: false,
				title: body.title,
				description: body.description,
				country_id: Number(body.country_id),
				producer: body.producer ?? "",
				producer_image: body.producer_image ?? "",
				linkedin_link: body.linkedin_link ?? "",
				youtube_link: body.youtube_link ?? "",
				scenario_ai: body.scenario_ai ?? "",
				video_gen_ai: body.video_gen_ai ?? "",
				sound_ai: body.sound_ai ?? "",
				postprod_ai: body.postprod_ai ?? "",
				tags: body.tags ?? "",
			},
		});

		const videoId = video.id;

		// Auto-create a review to link this video to an admin (the "bridge")
		let review = null;
		if (adminId) {
			review = await prisma.reviews.create({
				data: {
					admin_id: adminId,
					video_id: videoId,
					status: "assigned",
					note: "",
				},
			});
		}

		const videoBuffer = req.file?.buffer;

		res.status(201).json({
			message: "Video created",
			id: videoId,
			review_id: review?.id ?? null,
		});

		if (videoBuffer) {
			uploadVideo({
				videoBuffer,
				metadata: body,
				callback: async (result) => {
					try {
						const youtubeId = result.videoId;
						await prisma.$transaction([
							prisma.videos.update({
								where: { id: videoId },
								data: { url: youtubeId },
							}),
							prisma.process_queue.create({
								data: {
									video_id: videoId,
									filename: body.filename,
									type: "yt_status_check",
									status: "pending",
								},
							}),
						]);
					} catch (error) {
						console.error("Error in YouTube callback:", error);
					}
				},
			});
		}
	} catch (err) {
		console.error("Create Video Error:", err);
		res.status(500).json({ message: "Error creating video" });
	}
};

/**
 * Update a video partially by id.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const setVideo = async (req, res) => {
	try {
		await prisma.videos.update({
			where: { id: Number(req.params.id) },
			data: req.body,
		});
		res.json({ message: "Video updated" });
	} catch (err) {
		if (err.code === "P2025") {
			return res.status(404).json({ message: "Video not found" });
		}
		console.error("Set Video Error:", err);
		res.status(500).json({ message: "Error updating video" });
	}
};

/**
 * Return videos assigned to the authenticated admin (via reviews).
 * The admin is identified by req.user.id from the JWT token.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAssignedVideos = async (req, res) => {
	try {
		const adminId = req.user.id;
		const { page, limit } = req.query;

		const result = await paginate(prisma.videos, {
			page,
			limit,
			where: {
				reviews: {
					some: {
						admin_id: Number(adminId),
						status: "assigned",
					},
				},
			},
			include: {
				...videoIncludes,
				reviews: {
					where: { admin_id: Number(adminId), status: "assigned" },
					select: {
						id: true,
						note: true,
						grade: true,
						status: true,
					},
				},
			},
			orderBy: { id: "desc" },
		});

		result.data = result.data.map((video) => ({
			...video,
			filename: getFileUrl(video.filename),
			cover_image: getFileUrl(video.cover_image),
			subtitles: video.subtitles.map((sub) => ({
				...sub,
				filename: getFileUrl(sub.filename),
			})),
		}));

		res.status(200).json(result);
	} catch (err) {
		console.error("Get Assigned Videos Error:", err);
		res.status(500).json({ message: "Failed to fetch assigned videos" });
	}
};

/**
 * Return videos NOT assigned to the current admin (the rest).
 * Excludes videos that have a review with status "assigned" for this admin.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getUnassignedVideos = async (req, res) => {
	try {
		const adminId = req.user.id;
		const { page, limit } = req.query;

		const result = await paginate(prisma.videos, {
			page,
			limit,
			where: {
				NOT: {
					reviews: {
						some: {
							admin_id: Number(adminId),
							status: "assigned",
						},
					},
				},
			},
			include: videoIncludes,
			orderBy: { id: "desc" },
		});

		result.data = result.data.map((video) => ({
			...video,
			filename: getFileUrl(video.filename),
			cover_image: getFileUrl(video.cover_image),
			subtitles: video.subtitles.map((sub) => ({
				...sub,
				filename: getFileUrl(sub.filename),
			})),
		}));

		res.status(200).json(result);
	} catch (err) {
		console.error("Get Unassigned Videos Error:", err);
		res.status(500).json({ message: "Failed to fetch unassigned videos" });
	}
};

/**
 * Remove a video by id.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const removeVideo = async (req, res) => {
	try {
		await prisma.videos.delete({
			where: { id: Number(req.params.id) },
		});
		res.json({ message: "Video deleted" });
	} catch (err) {
		if (err.code === "P2025") {
			return res.status(404).json({ message: "Video not found" });
		}
		console.error("Remove Video Error:", err);
		res.status(500).json({ message: "Error deleting video" });
	}
};
