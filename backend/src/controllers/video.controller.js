import { VideoModel } from "../models/video.model.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the video
 *         edition_id:
 *           type: integer
 *           nullable: true
 *         url:
 *           type: string
 *         filename:
 *           type: string
 *         email:
 *           type: string
 *         cover_image:
 *           type: string
 *         verified:
 *           type: boolean
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: [unverified, verified, selected, grand_prix_1, grand_prix_2, grand_prix_3]
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
 * Controller for videos (Express handlers).
 * Each method accepts `req` and `res` from Express.
 */
export const VideoController = {
	/**
	 * Return all videos.
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 */
	/**
	 * @openapi
	 * /videos:
	 *   get:
	 *     summary: Return all videos
	 *     tags: [Videos]
	 *     responses:
	 *       200:
	 *         description: List of videos
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Video'
	 *       500:
	 *         description: Failed to fetch videos
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
	/**
	 * @openapi
	 * /videos/{id}:
	 *   get:
	 *     summary: Return a single video by id
	 *     tags: [Videos]
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Video found
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Video'
	 *       404:
	 *         description: Video not found
	 *       500:
	 *         description: Error fetching video
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
	/**
	 * @openapi
	 * /videos:
	 *   post:
	 *     summary: Create a new video
	 *     tags: [Videos]
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Video'
	 *     responses:
	 *       201:
	 *         description: Video created
	 *       500:
	 *         description: Failed to create video
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
	/**
	 * @openapi
	 * /videos/{id}:
	 *   put:
	 *     summary: Update a video partially by id
	 *     tags: [Videos]
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Video'
	 *     responses:
	 *       200:
	 *         description: Video updated
	 *       500:
	 *         description: Failed to update video
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
	/**
	 * @openapi
	 * /videos/{id}:
	 *   delete:
	 *     summary: Remove a video by id
	 *     tags: [Videos]
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Video deleted
	 *       500:
	 *         description: Failed to delete video
	 */
	async remove(req, res) {
		await VideoModel.remove(req.params.id);
		res.json({ message: "Video deleted" });
	},
};
