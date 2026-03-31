import prisma from "../config/prisma.config.ts";
import { paginate } from "../utils/paginate.util.js";

export const getHighlights = async (req, res) => {
	try {
		const { page, limit } = req.query;

		const result = await paginate(prisma.highlights, {
			page,
			limit,
			where: { is_active: true },
			orderBy: { created_at: "desc" },
		});

		res.status(200).json(result);
	} catch (error) {
		console.error("Get Highlights Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getHighlightById = async (req, res) => {
	try {
		const { id } = req.params;

		const highlight = await prisma.highlights.findUnique({
			where: { id: Number(id) },
		});

		if (!highlight) {
			return res.status(404).json({ message: "Temps fort non trouvé" });
		}

		res.status(200).json(highlight);
	} catch (error) {
		console.error("Get Highlight By ID Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const createHighlight = async (req, res) => {
	try {
		const { video_id, title, description, link_url, image_url, video_url } =
			req.body;

		const highlight = await prisma.highlights.create({
			data: {
				video_id: video_id ? Number(video_id) : null,
				title,
				description,
				link_url,
				image_url,
				video_url,
				is_active: true,
			},
		});

		res.status(201).json(highlight);
	} catch (error) {
		console.error("Create Highlight Error:", error);
		res.status(500).json({
			message: "Erreur lors de la création du temps fort",
		});
	}
};

export const setHighlight = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			video_id,
			title,
			description,
			link_url,
			image_url,
			video_url,
			is_active,
		} = req.body;

		const highlight = await prisma.highlights.update({
			where: { id: Number(id) },
			data: {
				video_id:
					video_id !== undefined
						? video_id
							? Number(video_id)
							: null
						: undefined,
				title,
				description,
				link_url,
				image_url,
				video_url,
				is_active,
			},
		});

		res.status(200).json(highlight);
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "Temps fort non trouvé" });
		}
		console.error("Set Highlight Error:", error);
		res.status(500).json({
			message: "Erreur lors de la mise à jour du temps fort",
		});
	}
};

export const removeHighlight = async (req, res) => {
	try {
		const { id } = req.params;

		await prisma.highlights.delete({
			where: { id: Number(id) },
		});

		res.status(204).send();
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "Temps fort non trouvé" });
		}
		console.error("Remove Highlight Error:", error);
		res.status(500).json({
			message: "Erreur lors de la suppression du temps fort",
		});
	}
};
