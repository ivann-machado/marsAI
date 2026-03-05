import { jest } from "@jest/globals";

// Mock prisma client
const mockPrisma = {
	reviews: {
		create: jest.fn(),
		findFirst: jest.fn(),
		findMany: jest.fn(),
		findUnique: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
		count: jest.fn(),
	},
	$transaction: jest.fn(),
};

jest.unstable_mockModule("../../src/config/prisma.js", () => ({
	default: mockPrisma,
}));

jest.unstable_mockModule("../../src/utils/paginate.js", () => ({
	paginate: jest.fn(),
}));

const { createReview, getAllReviews, getReviewById, setReview, removeReview } =
	await import("../../src/controllers/review.controller.js");
const { paginate } = await import("../../src/utils/paginate.js");

describe("Review Controller", () => {
	let mockReq, mockRes;

	beforeEach(() => {
		jest.clearAllMocks();
		mockReq = {
			body: {},
			params: {},
			query: {},
		};
		mockRes = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
	});

	// ─── createReview ────────────────────────────────────────────────

	describe("createReview", () => {
		it("should return 400 if admin_id is missing", async () => {
			mockReq.body = { video_id: 2 };
			await createReview(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: "admin_id and video_id are required",
			});
		});

		it("should return 400 if video_id is missing", async () => {
			mockReq.body = { admin_id: 1 };
			await createReview(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(400);
		});

		it("should create review and return 201 with full data", async () => {
			mockReq.body = { admin_id: 1, video_id: 2 };

			const createdReview = {
				id: 10,
				admin_id: 1,
				video_id: 2,
				status: "assigned",
				note: "",
				grade: 0,
				admins: { login: "admin1" },
				videos: { title: "Test Video" },
			};
			mockPrisma.reviews.create.mockResolvedValueOnce(createdReview);

			await createReview(mockReq, mockRes);

			expect(mockPrisma.reviews.create).toHaveBeenCalledWith({
				data: {
					admin_id: 1,
					video_id: 2,
					status: "assigned",
					note: "",
				},
				include: {
					admins: { select: { login: true } },
					videos: { select: { title: true } },
				},
			});
			expect(mockRes.status).toHaveBeenCalledWith(201);
			expect(mockRes.json).toHaveBeenCalledWith(
				expect.objectContaining({
					id: 10,
					admin_login: "admin1",
					video_title: "Test Video",
				}),
			);
		});

		it("should return 500 on prisma error", async () => {
			mockReq.body = { admin_id: 1, video_id: 2 };
			mockPrisma.reviews.create.mockRejectedValueOnce(
				new Error("DB error"),
			);

			await createReview(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: "Server error",
			});
		});
	});

	// ─── getAllReviews ────────────────────────────────────────────────

	describe("getAllReviews", () => {
		it("should return single review when admin_id and video_id provided", async () => {
			mockReq.query = { admin_id: "1", video_id: "2" };

			const mockReview = {
				id: 5,
				admin_id: 1,
				video_id: 2,
				admins: { login: "admin1" },
				videos: { title: "Video A" },
			};
			mockPrisma.reviews.findFirst.mockResolvedValueOnce(mockReview);

			await getAllReviews(mockReq, mockRes);

			expect(mockPrisma.reviews.findFirst).toHaveBeenCalledWith({
				where: { admin_id: 1, video_id: 2 },
				include: {
					admins: { select: { login: true } },
					videos: { select: { title: true } },
				},
			});
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith(
				expect.objectContaining({
					id: 5,
					admin_login: "admin1",
					video_title: "Video A",
				}),
			);
		});

		it("should return null when admin_id+video_id but no review found", async () => {
			mockReq.query = { admin_id: "1", video_id: "999" };
			mockPrisma.reviews.findFirst.mockResolvedValueOnce(null);

			await getAllReviews(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith(null);
		});

		it("should return paginated reviews when no admin_id+video_id", async () => {
			mockReq.query = { page: "1", limit: "10" };

			const paginatedResult = {
				data: [
					{
						id: 1,
						admins: { login: "admin1" },
						videos: { title: "Vid1" },
					},
				],
				meta: {
					totalCount: 1,
					totalPages: 1,
					currentPage: 1,
					limit: 10,
				},
			};
			paginate.mockResolvedValueOnce(paginatedResult);

			await getAllReviews(mockReq, mockRes);

			expect(paginate).toHaveBeenCalled();
			expect(mockRes.status).toHaveBeenCalledWith(200);
		});
	});

	// ─── getReviewById ───────────────────────────────────────────────

	describe("getReviewById", () => {
		it("should return 400 if id is missing", async () => {
			mockReq.params = {};
			await getReviewById(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: "Review id is required",
			});
		});

		it("should return 404 if review not found", async () => {
			mockReq.params = { id: "999" };
			mockPrisma.reviews.findUnique.mockResolvedValueOnce(null);

			await getReviewById(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(404);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: "Review not found",
			});
		});

		it("should return 200 with review data", async () => {
			mockReq.params = { id: "1" };
			const mockReview = {
				id: 1,
				admin_id: 1,
				video_id: 2,
				admins: { login: "admin1" },
				videos: { title: "Video A" },
			};
			mockPrisma.reviews.findUnique.mockResolvedValueOnce(mockReview);

			await getReviewById(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith(
				expect.objectContaining({
					id: 1,
					admin_login: "admin1",
					video_title: "Video A",
				}),
			);
		});
	});

	// ─── setReview ───────────────────────────────────────────────────

	describe("setReview", () => {
		it("should return 400 if id is missing", async () => {
			mockReq.params = {};
			mockReq.body = { note: "good", grade: 4, status: "done" };
			await setReview(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: "Review id is required",
			});
		});

		it("should return 200 on success", async () => {
			mockReq.params = { id: "1" };
			mockReq.body = { note: "excellent", grade: 5, status: "done" };
			mockPrisma.reviews.update.mockResolvedValueOnce({ id: 1 });

			await setReview(mockReq, mockRes);

			expect(mockPrisma.reviews.update).toHaveBeenCalledWith({
				where: { id: 1 },
				data: { note: "excellent", grade: 5, status: "done" },
			});
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: "Review updated",
				affectedRows: 1,
			});
		});

		it("should return 404 if review not found (P2025)", async () => {
			mockReq.params = { id: "999" };
			mockReq.body = { note: "test" };
			const error = new Error("Not found");
			error.code = "P2025";
			mockPrisma.reviews.update.mockRejectedValueOnce(error);

			await setReview(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(404);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: "Review not found",
			});
		});
	});

	// ─── removeReview ────────────────────────────────────────────────

	describe("removeReview", () => {
		it("should return 400 if id is missing", async () => {
			mockReq.params = {};
			await removeReview(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: "Review id is required",
			});
		});

		it("should return 200 on successful delete", async () => {
			mockReq.params = { id: "1" };
			mockPrisma.reviews.delete.mockResolvedValueOnce({ id: 1 });

			await removeReview(mockReq, mockRes);

			expect(mockPrisma.reviews.delete).toHaveBeenCalledWith({
				where: { id: 1 },
			});
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: "Review deleted",
				affectedRows: 1,
			});
		});

		it("should return 404 if review not found (P2025)", async () => {
			mockReq.params = { id: "999" };
			const error = new Error("Not found");
			error.code = "P2025";
			mockPrisma.reviews.delete.mockRejectedValueOnce(error);

			await removeReview(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(404);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: "Review not found",
			});
		});
	});
});
