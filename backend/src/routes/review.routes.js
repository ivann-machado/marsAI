import express from 'express';
import {
	createReview,
	getAllReviews,
	getReviewById,
	setReview,
	removeReview
} from '../controllers/review.controller.js';

const router = express.Router();


router.post('/', createReview);
router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.put('/:id', setReview);
router.delete('/:id', removeReview);

export default router;