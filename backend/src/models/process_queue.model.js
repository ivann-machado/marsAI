import { pool } from "../config/db.js";

/**
 * Insert a new process queue item.
 * @param {Object} data - Process queue data (video_id, status, filename, type)
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>} raw MariaDB result
 */
export const insertProcessQueue = async ({ video_id, status = 'pending', filename, type }, conn = null) => {
	const query = "INSERT INTO process_queue (video_id, status, filename, type) VALUES (?, ?, ?, ?)";
	const db = conn || pool;
	return db.query(query, [video_id, status, filename, type]);
};

/**
 * Select a process queue item by ID.
 * @param {number} id
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>}
 */
export const selectProcessQueueById = async (id, conn = null) => {
	const query = "SELECT * FROM process_queue WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};

/**
 * Select all process queue items.
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>}
 */
export const selectAllProcessQueues = async (conn = null) => {
	const query = "SELECT * FROM process_queue ORDER BY created_at ASC";
	const db = conn || pool;
	return db.query(query);
};

/**
 * Select all pending process queue items.
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>}
 */
export const selectPendingProcessQueues = async (conn = null) => {
	const query = "SELECT * FROM process_queue WHERE status = 'pending' ORDER BY created_at ASC";
	const db = conn || pool;
	return db.query(query);
};

/**
 * Update a process queue item by ID.
 * @param {number} id
 * @param {Object} data - Process queue data
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>}
 */
export const updateProcessQueue = async (id, { video_id, status, filename, type }, conn = null) => {
	const query = "UPDATE process_queue SET video_id = ?, status = ?, filename = ?, type = ? WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [video_id, status, filename, type, id]);
};

/**
 * Update only the status of a process queue item.
 * @param {number} id
 * @param {string} status - Enum ('pending','done','failed','timeout')
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>}
 */
export const updateProcessQueueStatus = async (id, status, conn = null) => {
	const query = "UPDATE process_queue SET status = ? WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [status, id]);
};

/**
 * Delete a process queue item by ID.
 * @param {number} id
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>}
 */
export const deleteProcessQueue = async (id, conn = null) => {
	const query = "DELETE FROM process_queue WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};
