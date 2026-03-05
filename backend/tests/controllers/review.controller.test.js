import { jest } from '@jest/globals';

jest.unstable_mockModule('../../src/config/prisma.js', () => ({
	default: {
		reviews: {
			create: jest.fn(),
			findUnique: jest.fn(),
			findFirst: jest.fn(),
			findMany: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
			count: jest.fn(),
		}
	}
}));

jest.unstable_mockModule('../../src/utils/paginate.js', () => ({
	paginate: jest.fn()
}));

const prisma = (await import('../../src/config/prisma.js')).default;
const { paginate } = await import('../../src/utils/paginate.js');
const { createReview, getAllReviews, getReviewById, setReview, removeReview } = await import('../../src/controllers/review.controller.js');

describe('Review Controller', () => {
	let mockReq, mockRes;

	beforeEach(() => {
		jest.clearAllMocks();
		mockReq = {
			body: {},
			params: {},
			query: {}
		};
		mockRes = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};
	});

	describe('createReview', () => {
		it('should return 400 if admin_id or video_id are missing', async () => {
			mockReq.body = { admin_id: 1 };
			await createReview(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(mockRes.json).toHaveBeenCalledWith({ message: "admin_id and video_id are required" });
		});

		it('should create review and return 201', async () => {
			mockReq.body = { admin_id: 1, video_id: 2 };
			prisma.reviews.create.mockResolvedValueOnce({ id: 10 });

			await createReview(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(201);
			expect(mockRes.json).toHaveBeenCalledWith({ message: "Review created", id: "10" });
		});
	});

	describe('getAllReviews', () => {
		it('should return single review if admin_id and video_id are provided', async () => {
			mockReq.query = { admin_id: '1', video_id: '2' };
			const mockReview = { id: 10, admins: { login: 'admin1' }, videos: { title: 'video1' } };
			prisma.reviews.findFirst.mockResolvedValueOnce(mockReview);

			await getAllReviews(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				...mockReview,
				admin_login: 'admin1',
				video_title: 'video1'
			});
		});

		it('should return paginated result', async () => {
			const mockPaginated = { data: [{ id: 1, admins: { login: 'a' }, videos: { title: 'v' } }], total: 1 };
			paginate.mockResolvedValueOnce(mockPaginated);

			await getAllReviews(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				...mockPaginated,
				data: [{
					id: 1,
					admins: { login: 'a' },
					videos: { title: 'v' },
					admin_login: 'a',
					video_title: 'v'
				}]
			});
		});
	});

	describe('getReviewById', () => {
		it('should return 404 if review not found', async () => {
			mockReq.params = { id: 999 };
			prisma.reviews.findUnique.mockResolvedValueOnce(null);

			await getReviewById(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(404);
		});

		it('should return 200 with review data', async () => {
			mockReq.params = { id: 1 };
			const mockReview = { id: 1, admins: { login: 'admin1' }, videos: { title: 'video1' } };
			prisma.reviews.findUnique.mockResolvedValueOnce(mockReview);

			await getReviewById(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				...mockReview,
				admin_login: 'admin1',
				video_title: 'video1'
			});
		});
	});

	describe('setReview', () => {
		it('should return 200 if update is successful', async () => {
			mockReq.params = { id: 1 };
			mockReq.body = { note: 'test' };
			prisma.reviews.update.mockResolvedValueOnce({ id: 1 });

			await setReview(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({ message: "Review updated", affectedRows: 1 });
		});
	});

	describe('removeReview', () => {
		it('should return 200 if deletion is successful', async () => {
			mockReq.params = { id: 1 };
			prisma.reviews.delete.mockResolvedValueOnce({ id: 1 });

			await removeReview(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({ message: "Review deleted", affectedRows: 1 });
		});
	});
});
