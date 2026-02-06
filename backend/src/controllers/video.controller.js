import { VideoModel } from "../models/video.model.js";

/**
 * Controller for videos (Express handlers).
 * Each method accepts `req` and `res` from Express.
 */
export const VideoController = {
	/**
	 * Return all videos.
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 */
	async getAll(req, res) {
		try {
			const [videos] = await VideoModel.getAll();
			res.json(videos);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "failed to fetch videos" });
		}
	},

	/**
	 * Return a single video by id.
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 */
	async getById(req, res) {
		try {
			const [rows] = await VideoModel.getById(req.params.id);
			if (!rows[0]) {
				return res.status(404).json({ message: "Video not found" });
			}
			res.json(rows[0]);
		} catch (err) {
			res.status(500).json({ message: "Error fetching video" });
		}
	},

	/**
	 * Create a new video.
	 * Expects a body matching the `Video` typedef.
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 */
	async create(req, res) {
		await VideoModel.create(req.body);
		res.status(201).json({ message: "Video created" });
	},

	/**
	 * Update a video partially by id.
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 */
	async update(req, res) {
		await VideoModel.update(req.params.id, req.body);
		res.json({ message: "Video updated" });
	},

	/**
	 * Remove a video by id.
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 */
	async remove(req, res) {
		await VideoModel.remove(req.params.id);
		res.json({ message: "Video deleted" });
	},
};
