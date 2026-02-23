import {
	selectAllVideos,
	selectVideoById,
	insertVideo,
	updateVideo,
	deleteVideo,
} from "../models/video.model.js";
import { deleteFile } from "../services/bucket.service.js";

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

/**
 * Return all videos.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllVideos = async (req, res) => {
	try {
		const videos = await selectAllVideos();
		res.json(videos);
	} catch (err) {
		console.error(err);
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
		const rows = await selectVideoById(req.params.id);
		const video = rows[0];
		if (!video) {
			return res.status(404).json({ message: "Video not found" });
		}
		res.json(video);
	} catch (err) {
		console.error("Get Video By ID Error:", err);
		res.status(500).json({ message: "Error fetching video" });
	}
};

/**
 * Create a new video.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createVideo = async (req, res) => {
	try {
		if (req.files) {
			const videoFile = req.files.find(f => f.fieldname === 'video' || f.mimetype.startsWith('video/'));
			const coverFile = req.files.find(f => f.fieldname === 'cover_image' || (f.mimetype.startsWith('image/') && f.fieldname !== 'video'));
			const subtitleFile = req.files.find(f => f.fieldname === 'subtitles' || f.mimetype === 'application/x-subrip' || f.mimetype === 'text/srt');

			if (videoFile) req.body.filename = videoFile.location;
			if (coverFile) req.body.cover_image = coverFile.location;
			if (subtitleFile) req.body.subtitles = subtitleFile.location;
		}

		if (!req.body.filename) {
			return res.status(400).json({ message: "Video file is required" });
		}

		const result = await insertVideo(req.body);
		res.status(201).json({
			message: "Video created",
			id: result.insertId.toString(),
		});
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
		if (req.files) {
			const videoFile = req.files.find(f => f.fieldname === 'video' || f.mimetype.startsWith('video/'));
			const coverFile = req.files.find(f => f.fieldname === 'cover_image' || (f.mimetype.startsWith('image/') && f.fieldname !== 'video'));
			const subtitleFile = req.files.find(f => f.fieldname === 'subtitles' || f.mimetype === 'application/x-subrip' || f.mimetype === 'text/srt');

			if (videoFile) req.body.filename = videoFile.location;
			if (coverFile) req.body.cover_image = coverFile.location;
			if (subtitleFile) req.body.subtitles = subtitleFile.location;
		}

		const result = await updateVideo(req.params.id, req.body);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Video not found" });
		}
		res.json({ message: "Video updated" });
	} catch (err) {
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
		const result = await deleteVideo(req.params.id);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Video not found" });
		}
		res.json({ message: "Video deleted" });
	} catch (err) {
		console.error("Remove Video Error:", err);
		res.status(500).json({ message: "Error deleting video" });
	}
};
