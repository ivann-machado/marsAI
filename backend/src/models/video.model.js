import { pool } from "../config/db.js";

/**
 * Video object type.
 * @typedef {Object} Video
 * @property {number} [edition_id]
 * @property {string} url
 * @property {string} filename
 * @property {string} email
 * @property {string} cover_image
 * @property {boolean} verified
 * @property {string} title
 * @property {string} description
 * @property {'unverified'|'verified'|'selected'|'grand_prix_1'|'grand_prix_2'|'grand_prix_3'} status
 * @property {number} [country_id]
 * @property {string} producer
 * @property {string} producer_image
 * @property {string} linkedin_link
 * @property {string} youtube_link
 * @property {string} scenario_ai
 * @property {string} video_gen_ai
 * @property {string} sound_ai
 * @property {string} postprod_ai
 * @property {string} tags
 */

/**
 * Get all videos.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any[]>}
 */
export const selectAllVideos = async (conn = null) => {
	const query = "SELECT * FROM videos";
	const db = conn || pool;
	return db.query(query);
};

/**
 * Get one video by ID.
 * @param {number|string} id
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>}
 */
export const selectVideoById = async (id, conn = null) => {
	const query = "SELECT * FROM videos WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};

/**
 * Create a new video.
 * @param {Video} video
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>}
 */
export const insertVideo = async (video, conn = null) => {
	const query = `
		INSERT INTO videos (
			edition_id,
			url,
			filename,
			email,
			cover_image,
			verified,
			title,
			description,
			status,
			country_id,
			producer,
			producer_image,
			linkedin_link,
			youtube_link,
			scenario_ai,
			video_gen_ai,
			sound_ai,
			postprod_ai,
			tags
		)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`;

	const values = [
		video.edition_id ?? null,
		video.url,
		video.filename,
		video.email,
		video.cover_image,
		video.verified,
		video.title,
		video.description,
		video.status,
		video.country_id ?? null,
		video.producer,
		video.producer_image,
		video.linkedin_link,
		video.youtube_link,
		video.scenario_ai,
		video.video_gen_ai,
		video.sound_ai,
		video.postprod_ai,
		video.tags,
	];

	const db = conn || pool;
	return db.query(query, values);
};

/**
 * Update a video.
 * @param {number|string} id
 * @param {Partial<Video>} video
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>}
 */
export const updateVideo = async (id, video, conn = null) => {
	const query = `
		UPDATE videos SET
			title = ?,
			description = ?,
			status = ?,
			verified = ?,
			tags = ?,
			youtube_link = ?
		WHERE id = ?
	`;

	const values = [
		video.title,
		video.description,
		video.status,
		video.verified,
		video.tags,
		video.youtube_link,
		id,
	];

	const db = conn || pool;
	return db.query(query, values);
};

/**
 * Delete a video by ID.
 * @param {number|string} id
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>}
 */
export const deleteVideo = async (id, conn = null) => {
	const query = "DELETE FROM videos WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};
