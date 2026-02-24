import { jest } from '@jest/globals';

const mockInsertReview = jest.fn();
const mockSelectReviewById = jest.fn();
const mockSelectAllReviews = jest.fn();
const mockUpdateReview = jest.fn();
const mockDeleteReview = jest.fn();

jest.unstable_mockModule('../../src/models/review.model.js', () => ({
	insertReview: mockInsertReview,
	selectReviewById: mockSelectReviewById,
	selectAllReviews: mockSelectAllReviews,
	updateReview: mockUpdateReview,
	deleteReview: mockDeleteReview,
}));

jest.unstable_mockModule('../../src/config/db.js', () => {
	const mockConn = {
		beginTransaction: jest.fn(),
		commit: jest.fn(),
		rollback: jest.fn(),
		release: jest.fn(),
	};
	return {
		getConnection: jest.fn().mockResolvedValue(mockConn),
		pool: { query: jest.fn() }
	};
});

const { createReview, getAllReviews, getReviewById, setReview, removeReview } = await import('../../src/controllers/review.controller.js');
const reviewModel = await import('../../src/models/review.model.js');

describe('Review Controller', () => {
	let mockReq, mockRes;

	beforeEach(() => {
		jest.clearAllMocks();
		mockReq = {
			body: {},
			params: {}
		};
		mockRes = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};
	});

	describe('createReview', () => {
		it('should return 400 if admin_id or video_id are missing', async () => {
			mockReq.body = { admin_id: 1 }; // missing video_id
			await createReview(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(mockRes.json).toHaveBeenCalledWith({ message: "admin_id and video_id are required" });
		});

		it('should create review and return 201', async () => {
			mockReq.body = { admin_id: 1, video_id: 2 };
			reviewModel.insertReview.mockResolvedValueOnce({ insertId: 10 });

			await createReview(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(201);
			expect(mockRes.json).toHaveBeenCalledWith({ message: "Review created", id: 10 });
		});
	});

	describe('getAllReviews', () => {
		it('should return 200 with all reviews', async () => {
			const mockReviews = [{ id: 1, admin_id: 1 }];
			reviewModel.selectAllReviews.mockResolvedValueOnce(mockReviews);

			await getAllReviews(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith(mockReviews);
		});
	});

	describe('getReviewById', () => {
		it('should return 400 if id is missing', async () => {
			await getReviewById(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(mockRes.json).toHaveBeenCalledWith({ message: "Review id is required" });
		});

		it('should return 404 if review not found', async () => {
			mockReq.params = { id: 999 };
			reviewModel.selectReviewById.mockResolvedValueOnce(null); // or empty array if array returned

			await getReviewById(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(404);
			expect(mockRes.json).toHaveBeenCalledWith({ message: "Review not found" });
		});

		it('should return 200 with review data', async () => {
			mockReq.params = { id: 1 };
			const mockReview = { id: 1, admin_id: 1 };
			reviewModel.selectReviewById.mockResolvedValueOnce(mockReview);

			await getReviewById(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith(mockReview);
		});
	});

	describe('setReview', () => {
		it('should return 400 if id is missing', async () => {
			mockReq.body = { note: 5, grade: 'A', status: 'done' };
			await setReview(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(mockRes.json).toHaveBeenCalledWith({ message: "Review id is required" });
		});

		it('should return 200 with affectedRows', async () => {
			mockReq.params = { id: 1 };
			mockReq.body = { note: 5, grade: 'A', status: 'done' };
			reviewModel.updateReview.mockResolvedValueOnce({ affectedRows: 1 });

			await setReview(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({ message: "Review updated", affectedRows: 1 });
		});
	});

	describe('removeReview', () => {
		it('should return 400 if id is missing', async () => {
			await removeReview(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(mockRes.json).toHaveBeenCalledWith({ message: "Review id is required" });
		});

		it('should return 200 and delete review', async () => {
			mockReq.params = { id: 1 };
			reviewModel.deleteReview.mockResolvedValueOnce({ affectedRows: 1 });

			await removeReview(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({ message: "Review deleted", affectedRows: { affectedRows: 1 } });
		});
	});
});
