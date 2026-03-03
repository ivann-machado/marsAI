import prisma from "../config/prisma.js";

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
 * @returns {Promise<any[]>}
 */
export const selectAllVideos = async () => {
	return prisma.videos.findMany();
};

/**
 * Get one video by ID.
 * @param {number|string} id
 * @returns {Promise<any[]>}
 */
export const selectVideoById = async (id) => {
	const video = await prisma.videos.findUnique({
		where: { id: Number(id) },
	});
	return video ? [video] : [];
};

/**
 * Create a new video.
 * @param {Video} video
 * @returns {Promise<any>}
 */
export const insertVideo = async (video) => {
	const newVideo = await prisma.videos.create({
		data: {
			edition_id: video.edition_id ? Number(video.edition_id) : null,
			url: video.url || "",
			filename: video.filename,
			email: video.email,
			cover_image: video.cover_image,
			verified: Boolean(video.verified),
			title: video.title,
			description: video.description,
			country_id: video.country_id ? Number(video.country_id) : null,
			producer: video.producer,
			producer_image: video.producer_image,
			linkedin_link: video.linkedin_link,
			youtube_link: video.youtube_link || "",
			scenario_ai: video.scenario_ai,
			video_gen_ai: video.video_gen_ai,
			sound_ai: video.sound_ai,
			postprod_ai: video.postprod_ai,
			tags: video.tags,
		},
	});
	return { insertId: newVideo.id };
};

/**
 * Update a video.
 * @param {number|string} id
 * @param {Partial<Video>} video
 * @returns {Promise<any>}
 */
export const updateVideo = async (id, video) => {
	await prisma.videos.update({
		where: { id: Number(id) },
		data: {
			title: video.title,
			description: video.description,
			status: video.status,
			verified: video.verified !== undefined ? Boolean(video.verified) : undefined,
			tags: video.tags,
			youtube_link: video.youtube_link,
		},
	});
	return { affectedRows: 1 };
};

/**
 * Update a video url.
 * @param {number|string} id
 * @param {string} url
 * @returns {Promise<any>}
 */
export const updateVideoUrl = async (id, url) => {
	await prisma.videos.update({
		where: { id: Number(id) },
		data: { url },
	});
	return { affectedRows: 1 };
};

/**
 * Update a video status.
 * @param {number|string} id
 * @param {string} status
 * @returns {Promise<any>}
 */
export const updateVideoStatus = async (id, status) => {
	await prisma.videos.update({
		where: { id: Number(id) },
		data: { status },
	});
	return { affectedRows: 1 };
};

/**
 * Delete a video by ID.
 * @param {number|string} id
 * @returns {Promise<any>}
 */
export const deleteVideo = async (id) => {
	await prisma.videos.delete({
		where: { id: Number(id) },
	});
	return { affectedRows: 1 };
};
