import prisma from "../config/prisma.config.ts";

/**
 * Insert a new process queue item.
 * @param {Object} data - Process queue data (video_id, status, filename, type)
 * @returns {Promise<Object>} raw result compatibility
 */
export const insertProcessQueue = async ({ video_id, status = 'pending', filename, type }) => {
	const pq = await prisma.process_queue.create({
		data: {
			video_id: Number(video_id),
			status,
			filename,
			type,
		},
	});
	return { insertId: pq.id };
};

/**
 * Select a process queue item by ID.
 * @param {number} id
 * @returns {Promise<Object[]>}
 */
export const selectProcessQueueById = async (id) => {
	const pq = await prisma.process_queue.findUnique({
		where: { id: Number(id) },
	});
	return pq ? [pq] : [];
};

/**
 * Select all process queue items.
 * @returns {Promise<Object[]>}
 */
export const selectAllProcessQueues = async () => {
	return prisma.process_queue.findMany({
		orderBy: { created_at: "asc" },
	});
};

/**
 * Select all pending process queue items.
 * @returns {Promise<Object[]>}
 */
export const selectPendingProcessQueues = async () => {
	return prisma.process_queue.findMany({
		where: { status: "pending" },
		orderBy: { created_at: "asc" },
	});
};

/**
 * Update a process queue item by ID.
 * @param {number} id
 * @param {Object} data - Process queue data
 * @returns {Promise<Object>}
 */
export const updateProcessQueue = async (id, { video_id, status, filename, type }) => {
	await prisma.process_queue.update({
		where: { id: Number(id) },
		data: {
			video_id: Number(video_id),
			status,
			filename,
			type,
		},
	});
	return { affectedRows: 1 };
};

/**
 * Update only the status of a process queue item.
 * @param {number} id
 * @param {string} status - Enum ('pending','done','failed','timeout')
 * @returns {Promise<Object>}
 */
export const updateProcessQueueStatus = async (id, status) => {
	await prisma.process_queue.update({
		where: { id: Number(id) },
		data: { status },
	});
	return { affectedRows: 1 };
};

/**
 * Delete a process queue item by ID.
 * @param {number} id
 * @returns {Promise<Object>}
 */
export const deleteProcessQueue = async (id) => {
	await prisma.process_queue.delete({
		where: { id: Number(id) },
	});
	return { affectedRows: 1 };
};
