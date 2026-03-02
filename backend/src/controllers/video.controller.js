import prisma from "../config/prisma.js";
import { paginate } from "../utils/paginate.js";
import { deleteFile, getFileUrl } from "../services/bucket.service.js";
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

		result.data = result.data.map(video => ({
			...video,
			filename: getFileUrl(video.filename),
			cover_image: getFileUrl(video.cover_image),
			subtitles: video.subtitles.map(sub => ({
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
			subtitles: video.subtitles.map(sub => ({
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

		const video = await prisma.videos.create({
			data: {
				edition_id: body.edition_id ? Number(body.edition_id) : undefined,
				url: body.url ?? "",
				filename: body.filename,
				email: body.email,
				cover_image: body.cover_image,
				verified: false,
				title: body.title,
				description: body.description,
				country_id: body.country_id ? Number(body.country_id) : undefined,
				producer: body.producer,
				producer_image: body.producer_image,
				linkedin_link: body.linkedin_link,
				youtube_link: body.youtube_link ?? "",
				scenario_ai: body.scenario_ai,
				video_gen_ai: body.video_gen_ai,
				sound_ai: body.sound_ai,
				postprod_ai: body.postprod_ai,
				tags: body.tags,
			},
		});

		const videoId = video.id;
		const videoBuffer = req.file?.buffer;

		res.status(201).json({
			message: "Video created",
			id: videoId,
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
