import prisma from "../config/prisma.js";

/**
 * Insert a new prized video record.
 * @param {Object} data - Prized video data (video_id, prix)
 * @returns {Promise<Object>} raw result compatibility
 */
export const insertPrizedVideo = async ({ video_id, prix }) => {
	const pv = await prisma.prized_videos.create({
		data: {
			video_id: Number(video_id),
			prix
		},
	});
	return { insertId: pv.video_id };
};

/**
 * Select a prized video by video ID.
 * @param {number} video_id
 * @returns {Promise<Object[]>}
 */
export const selectPrizedVideoByVideoId = async (video_id) => {
	const pv = await prisma.prized_videos.findUnique({
		where: { video_id: Number(video_id) },
	});
	return pv ? [pv] : [];
};

/**
 * Select all prized videos.
 * @returns {Promise<Object[]>}
 */
export const selectAllPrizedVideos = async () => {
	const pvs = await prisma.prized_videos.findMany({
		include: { videos: { select: { title: true } } },
	});
	return pvs.map(pv => ({
		...pv,
		title: pv.videos?.title,
		videos: undefined,
	}));
};

/**
 * Update a prized video record by video ID.
 * @param {number} video_id
 * @param {Object} data - Prized video data
 * @returns {Promise<Object>}
 */
export const updatePrizedVideo = async (video_id, { prix }) => {
	await prisma.prized_videos.update({
		where: { video_id: Number(video_id) },
		data: { prix },
	});
	return { affectedRows: 1 };
};

/**
 * Delete a prized video record by video ID.
 * @param {number} video_id
 * @returns {Promise<Object>}
 */
export const deletePrizedVideo = async (video_id) => {
	await prisma.prized_videos.delete({
		where: { video_id: Number(video_id) },
	});
	return { affectedRows: 1 };
};
