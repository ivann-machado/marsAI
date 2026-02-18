import { pool } from "../config/db.js";

/**
 * Insert a new subtitle.
 * @param {Object} data - Subtitle data (video_id, language, filename)
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>} raw MariaDB result
 */
export const insertSubtitle = async ({ video_id, language, filename }, conn = null) => {
	const query = "INSERT INTO subtitles (video_id, language, filename) VALUES (?, ?, ?)";
	const db = conn || pool;
	return db.query(query, [video_id, language, filename]);
};

/**
 * Select a subtitle by ID.
 * @param {number} id
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>}
 */
export const selectSubtitleById = async (id, conn = null) => {
	const query = "SELECT * FROM subtitles WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};

/**
 * Select all subtitles for a specific video.
 * @param {number} video_id
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>}
 */
export const selectSubtitlesByVideoId = async (video_id, conn = null) => {
	const query = "SELECT * FROM subtitles WHERE video_id = ?";
	const db = conn || pool;
	return db.query(query, [video_id]);
};

/**
 * Select all subtitles.
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>}
 */
export const selectAllSubtitles = async (conn = null) => {
	const query = "SELECT * FROM subtitles";
	const db = conn || pool;
	return db.query(query);
};

/**
 * Update a subtitle by ID.
 * @param {number} id
 * @param {Object} data - Subtitle data
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>}
 */
export const updateSubtitle = async (id, { video_id, language, filename }, conn = null) => {
	const query = "UPDATE subtitles SET video_id = ?, language = ?, filename = ? WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [video_id, language, filename, id]);
};

/**
 * Delete a subtitle by ID.
 * @param {number} id
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>}
 */
export const deleteSubtitle = async (id, conn = null) => {
	const query = "DELETE FROM subtitles WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};
