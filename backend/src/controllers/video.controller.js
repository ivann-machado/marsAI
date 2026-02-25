import {
	selectAllVideos,
	selectVideoById,
	insertVideo,
	updateVideo,
	deleteVideo,
} from "../models/video.model.js";
import { insertProcessQueue, updateProcessQueueStatus } from "../models/process_queue.model.js";
import { deleteFile, getFileUrl } from "../services/bucket.service.js";
import { uploadAndScheduleCheck } from "../services/youtube.service.js";

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
	try {
		if (!req.body.filename) {
			return res.status(400).json({ message: "Video file is required" });
		}

		const result = await insertVideo(req.body);
		//upload into youtube
		const videoId = result.insertId.toString()
		const processQueueId = await insertProcessQueue({
			video_id: videoId,
			filename: req.body.filename,
			type: 'youtube'
		});
		const videoBuffer = req.files.filename[0].buffer;
		const uploadResult = await uploadAndScheduleCheck(videoBuffer, (status, videoId) => {
			if (status === 'done') {
				updateVideo(videoId, { youtube_id: videoId });
			}
			updateProcessQueueStatus(processQueueId, status);
		});
		res.status(201).json({
			message: "Video created",
			id: videoId,
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
