import { jest } from '@jest/globals';

// 1. Define the mock FIRST
jest.unstable_mockModule('../../src/config/db.js', () => ({
	pool: {
		query: jest.fn()
	}
}));

// 2. Use top-level await to import your modules AFTER the mock
const { pool } = await import('../../src/config/db.js');
const reviewModel = await import('../../src/models/review.model.js');

describe('Review Model', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('insertReview', () => {
		it('should insert a review correctly using default pool', async () => {
			const mockReview = { admin_id: 1, video_id: 2 };
			const mockResult = { insertId: 10, affectedRows: 1 };

			pool.query.mockResolvedValueOnce(mockResult);

			const result = await reviewModel.insertReview(mockReview);

			expect(result).toEqual(mockResult);
			expect(pool.query).toHaveBeenCalledWith(
				'INSERT INTO reviews (admin_id, video_id) VALUES (?, ?)',
				[mockReview.admin_id, mockReview.video_id]
			);
		});

		it('should insert a review correctly using connection transaction', async () => {
			const mockReview = { admin_id: 1, video_id: 2 };
			const mockConn = { query: jest.fn().mockResolvedValueOnce({ insertId: 11 }) };

			const result = await reviewModel.insertReview(mockReview, mockConn);

			expect(result).toEqual({ insertId: 11 });
			expect(mockConn.query).toHaveBeenCalledWith(
				'INSERT INTO reviews (admin_id, video_id) VALUES (?, ?)',
				[mockReview.admin_id, mockReview.video_id]
			);
			expect(pool.query).not.toHaveBeenCalled();
		});
	});

	describe('selectReviewById', () => {
		it('should fetch a review by ID', async () => {
			const mockReview = [{ id: 1, note: 5 }];
			pool.query.mockResolvedValueOnce(mockReview);

			const result = await reviewModel.selectReviewById(1);

			expect(result).toEqual(mockReview);
			expect(pool.query).toHaveBeenCalledWith('SELECT * FROM reviews WHERE id = ?', [1]);
		});
	});

	describe('selectAllReviews', () => {
		it('should fetch all reviews with joins', async () => {
			const mockReviews = [
				{ id: 1, note: 5, admin_login: 'admin1', video_title: 'video1' }
			];
			pool.query.mockResolvedValueOnce(mockReviews);

			const result = await reviewModel.selectAllReviews();

			expect(result).toEqual(mockReviews);
			expect(pool.query).toHaveBeenCalledWith(
				'SELECT r.*, a.login as admin_login, v.title as video_title FROM reviews r JOIN admins a ON r.admin_id = a.id JOIN videos v ON r.video_id = v.id'
			);
		});
	});

	describe('updateReview', () => {
		it('should update specific fields of a review and return affectedRows', async () => {
			pool.query.mockResolvedValueOnce({ affectedRows: 1 });

			const updateData = { note: 4, grade: 'B', status: 'archived' };
			const result = await reviewModel.updateReview(1, updateData);

			expect(result.affectedRows).toBe(1);
			expect(pool.query).toHaveBeenCalledWith(
				'UPDATE reviews SET note = ?, grade = ?, status = ? WHERE id = ?',
				[4, 'B', 'archived', 1]
			);
		});
	});

	describe('deleteReview', () => {
		it('should delete a review by ID', async () => {
			const mockResult = { affectedRows: 1 };
			pool.query.mockResolvedValueOnce(mockResult);

			const result = await reviewModel.deleteReview(1);
			console.log(result);

			expect(result.affectedRows).toBe(1);
			expect(pool.query).toHaveBeenCalledWith('DELETE FROM reviews WHERE id = ?', [1]);
		});
	});
});
