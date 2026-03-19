import prisma from "../config/prisma.config.js";
import { paginate } from "../utils/paginate.util.js";

/**
 * Get all admins (paginated).
 * @route GET /api/admins
 */
export const getAllAdmins = async (req, res) => {
	try {
		const { page, limit } = req.query;

		const result = await paginate(prisma.admins, {
			page,
			limit,
			select: {
				id: true,
				login: true,
				role: true,
			},
			orderBy: { id: "desc" },
		});

		res.status(200).json(result);
	} catch (error) {
		console.error("Get All Admins Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Get a single admin by ID.
 * @route GET /api/admins/:id
 */
export const getAdminById = async (req, res) => {
	try {
		const admin = await prisma.admins.findUnique({
			where: { id: Number(req.params.id) },
			select: {
				id: true,
				login: true,
				role: true,
			},
		});

		if (!admin) {
			return res.status(404).json({ message: "Admin not found" });
		}

		res.status(200).json(admin);
	} catch (error) {
		console.error("Get Admin By Id Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Update admin role.
 * @route PUT /api/admins/:id
 */
export const setAdmin = async (req, res) => {
	try {
		const { role } = req.body;

		if (role && !["admin", "super_admin"].includes(role)) {
			return res.status(400).json({
				message: "Invalid role. Must be 'admin' or 'super_admin'",
			});
		}

		await prisma.admins.update({
			where: { id: Number(req.params.id) },
			data: { role },
		});

		res.status(200).json({ message: "Admin updated" });
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "Admin not found" });
		}
		console.error("Update Admin Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Delete an admin by ID.
 * @route DELETE /api/admins/:id
 */
export const removeAdmin = async (req, res) => {
	try {
		await prisma.admins.delete({
			where: { id: Number(req.params.id) },
		});

		res.status(200).json({ message: "Admin deleted" });
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "Admin not found" });
		}
		console.error("Delete Admin Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Get dashboard overview with site statistics.
 * @route GET /api/admins/dashboard/overview
 */
export const getOverview = async (req, res) => {
	try {
		// Fetch all statistics in parallel
		const [
			totalVideos,
			videoStats,
			totalEditions,
			totalEvents,
			totalSponsors,
			totalJury,
			totalReservations,
			totalNewsletter,
			prizedVideos,
			youtubeVideos,
		] = await Promise.all([
			prisma.videos.count(),
			prisma.videos.groupBy({
				by: ["status"],
				_count: true,
			}),
			prisma.editions.count(),
			prisma.events.count(),
			prisma.sponsors.count(),
			prisma.jury.count(),
			prisma.reservations.count(),
			prisma.newsletters.count(),
			prisma.prized_videos.count(),
			prisma.videos.findMany({
				where: {
					youtube_link: {
						not: "",
					},
				},
				select: {
					id: true,
					title: true,
					youtube_link: true,
				},
			}),
		]);

		// Build video status breakdown
		const videoStatusMap = {
			unverified: 0,
			verified: 0,
			selected: 0,
			denied: 0,
		};

		videoStats.forEach((stat) => {
			videoStatusMap[stat.status] = stat._count;
		});

		res.status(200).json({
			festival: {
				name: "MarsAI",
				editions: totalEditions,
				currentYear: new Date().getFullYear(),
			},
			videos: {
				total: totalVideos,
				unverified: videoStatusMap.unverified,
				verified: videoStatusMap.verified,
				selected: videoStatusMap.selected,
				denied: videoStatusMap.denied,
				youtube: youtubeVideos.length,
				prized: prizedVideos,
			},
			events: totalEvents,
			jury: totalJury,
			sponsors: totalSponsors,
			reservations: totalReservations,
			newsletter: totalNewsletter,
			youtubeChannels: youtubeVideos,
		});
	} catch (error) {
		console.error("Get Overview Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
