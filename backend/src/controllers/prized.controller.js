import prisma from "../config/prisma.config.js";
import { paginate } from "../utils/paginate.util.js";

const prizedIncludes = {
	videos: {
		select: {
			title: true,
			description: true,
			producer: true,
		},
	},
};

const mapPrizedVideo = (prizedVideo) => ({
	id: prizedVideo.video_id,
	video_id: prizedVideo.video_id,
	prix: prizedVideo.prix,
	title: prizedVideo.videos?.title,
	description: prizedVideo.videos?.description,
	producer: prizedVideo.videos?.producer,
});

export const createPrizedVideo = async (req, res, next) => {
	try {
		const { video_id, prix } = req.body;

		if (!video_id || !prix) {
			return res.status(400).json({
				message: "video_id and prix are required",
			});
		}

		const prizedVideo = await prisma.prized_videos.create({
			data: {
				video_id: Number(video_id),
				prix,
			},
			include: prizedIncludes,
		});

		res.status(201).json(mapPrizedVideo(prizedVideo));
		next();
	} catch (error) {
		if (error.code === "P2002") {
			return res.status(409).json({
				message: "A prize already exists for this video",
			});
		}

		if (error.code === "P2003") {
			return res.status(400).json({
				message: "Invalid video_id",
			});
		}

		console.error("Create Prized Video Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getAllPrizedVideos = async (req, res) => {
	try {
		const { page, limit } = req.query;

		const result = await paginate(prisma.prized_videos, {
			page,
			limit,
			where: {
				prix: {
					not: "",
				},
			},
			include: prizedIncludes,
			orderBy: { video_id: "desc" },
		});

		result.data = result.data.map(mapPrizedVideo);

		res.status(200).json(result);
	} catch (error) {
		console.error("Get All Prized Videos Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getPrizedVideoByVideoId = async (req, res) => {
	try {
		const { video_id } = req.params;

		const prizedVideo = await prisma.prized_videos.findUnique({
			where: { video_id: Number(video_id) },
			include: prizedIncludes,
		});

		if (!prizedVideo) {
			return res
				.status(404)
				.json({ message: "Prize not found for this video" });
		}

		res.status(200).json(mapPrizedVideo(prizedVideo));
	} catch (error) {
		console.error("Get Prized Video By Video ID Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const removePrizedVideo = async (req, res, next) => {
	try {
		const { video_id } = req.params;

		await prisma.prized_videos.delete({
			where: { video_id: Number(video_id) },
		});

		res.status(200).json({ message: "Prize deleted", affectedRows: 1 });
		next();
	} catch (error) {
		if (error.code === "P2025") {
			return res
				.status(404)
				.json({ message: "Prize not found for this video" });
		}

		console.error("Delete Prized Video Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
