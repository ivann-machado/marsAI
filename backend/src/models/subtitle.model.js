import prisma from "../config/prisma.js";

/**
 * Insert a new subtitle.
 * @param {Object} data - Subtitle data (video_id, language, filename)
 * @returns {Promise<Object>} raw result compatibility
 */
export const insertSubtitle = async ({ video_id, language, filename }) => {
	const sub = await prisma.subtitles.create({
		data: {
			video_id: Number(video_id),
			language,
			filename,
		},
	});
	return { insertId: sub.id };
};

/**
 * Select a subtitle by ID.
 * @param {number} id
 * @returns {Promise<Object[]>}
 */
export const selectSubtitleById = async (id) => {
	const sub = await prisma.subtitles.findUnique({
		where: { id: Number(id) },
	});
	return sub ? [sub] : [];
};

/**
 * Select all subtitles for a specific video.
 * @param {number} video_id
 * @returns {Promise<Object[]>}
 */
export const selectSubtitlesByVideoId = async (video_id) => {
	return prisma.subtitles.findMany({
		where: { video_id: Number(video_id) },
	});
};

/**
 * Select all subtitles.
 * @returns {Promise<Object[]>}
 */
export const selectAllSubtitles = async () => {
	return prisma.subtitles.findMany();
};

/**
 * Update a subtitle by ID.
 * @param {number} id
 * @param {Object} data - Subtitle data
 * @returns {Promise<Object>}
 */
export const updateSubtitle = async (id, { video_id, language, filename }) => {
	await prisma.subtitles.update({
		where: { id: Number(id) },
		data: {
			video_id: Number(video_id),
			language,
			filename,
		},
	});
	return { affectedRows: 1 };
};

/**
 * Delete a subtitle by ID.
 * @param {number} id
 * @returns {Promise<Object>}
 */
export const deleteSubtitle = async (id) => {
	await prisma.subtitles.delete({
		where: { id: Number(id) },
	});
	return { affectedRows: 1 };
};
