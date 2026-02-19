import { pool } from "../config/db.js";

/**
 * Insert a new prized video record.
 * @param {Object} data - Prized video data (video_id, prix)
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>} raw MariaDB result
 */
export const insertPrizedVideo = async ({ video_id, prix }, conn = null) => {
	const query = "INSERT INTO prized_videos (video_id, prix) VALUES (?, ?)";
	const db = conn || pool;
	return db.query(query, [video_id, prix]);
};

/**
 * Select a prized video by video ID.
 * @param {number} video_id
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>}
 */
export const selectPrizedVideoByVideoId = async (video_id, conn = null) => {
	const query = "SELECT * FROM prized_videos WHERE video_id = ?";
	const db = conn || pool;
	return db.query(query, [video_id]);
};

/**
 * Select all prized videos.
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>}
 */
export const selectAllPrizedVideos = async (conn = null) => {
	const query = "SELECT pv.*, v.title FROM prized_videos pv JOIN videos v ON pv.video_id = v.id";
	const db = conn || pool;
	return db.query(query);
};

/**
 * Update a prized video record by video ID.
 * @param {number} video_id
 * @param {Object} data - Prized video data
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>}
 */
export const updatePrizedVideo = async (video_id, { prix }, conn = null) => {
	const query = "UPDATE prized_videos SET prix = ? WHERE video_id = ?";
	const db = conn || pool;
	return db.query(query, [prix, video_id]);
};

/**
 * Delete a prized video record by video ID.
 * @param {number} video_id
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>}
 */
export const deletePrizedVideo = async (video_id, conn = null) => {
	const query = "DELETE FROM prized_videos WHERE video_id = ?";
	const db = conn || pool;
	return db.query(query, [video_id]);
};
