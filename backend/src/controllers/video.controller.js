import {
	selectAllVideos,
	selectVideoById,
	insertVideo,
	updateVideoUrl,
	updateVideoStatus,
	deleteVideo,
} from "../models/video.model.js";
import { insertProcessQueue } from "../models/process_queue.model.js";
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

/**
 * Return all videos.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllVideos = async (req, res) => {
	try {
		const videos = await selectAllVideos();
		const videosWithUrls = videos.map(video => {
			return {
				...video,
				filename: getFileUrl(video.filename),
				cover_image: getFileUrl(video.cover_image),
				subtitles: getFileUrl(video.subtitles)
			};
		});
		res.status(200).json(videosWithUrls);
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
		res.status(200).json({
			...video,
			filename: getFileUrl(video.filename),
			cover_image: getFileUrl(video.cover_image),
			subtitles: getFileUrl(video.subtitles)
		});
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
	const body = req.body;
	try {
		if (!body.filename || body.filename === 'undefined') {
			return res.status(400).json({ message: "Video file is required" });
		}

		const result = await insertVideo(body);

		const videoId = result.insertId.toString();
		const videoBuffer = req.file?.buffer;
		res.status(201).json({
			message: "Video created",
			id: videoId,
		});

		if (videoBuffer) {
			uploadVideo({
				videoBuffer,
				metadata: body,
				callback: (result) => {
					try {
						const youtubeId = result.videoId;
						updateVideoUrl(videoId, youtubeId);
						insertProcessQueue({
							video_id: videoId,
							filename: body.filename,
							type: 'yt_status_check'
						});
					} catch (error) {
						console.error("Error in callback:", error);
					}
				}
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
		const result = await updateVideoStatus(req.params.id, req.body);
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
