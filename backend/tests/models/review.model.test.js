import { jest } from '@jest/globals';

// 1. Define the mock FIRST
jest.unstable_mockModule('../../src/config/prisma.js', () => ({
	default: {
		reviews: {
			create: jest.fn(),
			findUnique: jest.fn(),
			findFirst: jest.fn(),
			findMany: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		}
	}
}));

// 2. Use top-level await to import your modules AFTER the mock
const prisma = (await import('../../src/config/prisma.js')).default;
const reviewModel = await import('../../src/models/review.model.js');

describe('Review Model', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('insertReview', () => {
		it('should insert a review correctly', async () => {
			const mockReviewInput = { admin_id: 1, video_id: 2 };
			const mockCreatedReview = { id: 10, ...mockReviewInput, status: 'assigned', note: '' };

			prisma.reviews.create.mockResolvedValueOnce(mockCreatedReview);

			const result = await reviewModel.insertReview(mockReviewInput);

			expect(result).toEqual({ insertId: 10 });
			expect(prisma.reviews.create).toHaveBeenCalledWith({
				data: {
					admin_id: 1,
					video_id: 2,
					status: "assigned",
					note: "",
				}
			});
		});
	});

	describe('selectReviewById', () => {
		it('should fetch a review by ID', async () => {
			const mockReview = { id: 1, note: 'good' };
			prisma.reviews.findUnique.mockResolvedValueOnce(mockReview);

			const result = await reviewModel.selectReviewById(1);

			expect(result).toEqual(mockReview);
			expect(prisma.reviews.findUnique).toHaveBeenCalledWith({
				where: { id: 1 },
				include: {
					admins: { select: { login: true } },
					videos: { select: { title: true } },
				}
			});
		});
	});

	describe('selectAllReviews', () => {
		it('should fetch all reviews with relations', async () => {
			const mockPrismaReviews = [
				{ id: 1, note: 'ok', admins: { login: 'admin1' }, videos: { title: 'video1' } }
			];
			prisma.reviews.findMany.mockResolvedValueOnce(mockPrismaReviews);

			const result = await reviewModel.selectAllReviews();

			expect(result).toEqual([
				{ id: 1, note: 'ok', admins: { login: 'admin1' }, videos: { title: 'video1' }, admin_login: 'admin1', video_title: 'video1' }
			]);
			expect(prisma.reviews.findMany).toHaveBeenCalled();
		});
	});

	describe('updateReview', () => {
		it('should update specific fields of a review and return affectedRows', async () => {
			prisma.reviews.update.mockResolvedValueOnce({ id: 1 });

			const updateData = { note: 'updated', grade: 4, status: 'done' };
			const result = await reviewModel.updateReview(1, updateData);

			expect(result.affectedRows).toBe(1);
			expect(prisma.reviews.update).toHaveBeenCalledWith({
				where: { id: 1 },
				data: { note: 'updated', grade: 4, status: 'done' }
			});
		});
	});

	describe('deleteReview', () => {
		it('should delete a review by ID', async () => {
			prisma.reviews.delete.mockResolvedValueOnce({ id: 1 });

			const result = await reviewModel.deleteReview(1);

			expect(result).toBe(1);
			expect(prisma.reviews.delete).toHaveBeenCalledWith({
				where: { id: 1 }
			});
		});
	});
});
