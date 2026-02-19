import { getConnection } from "../config/db.js";
import {
  insertReview,
  selectReviewById,
  selectAllReviews,
  updateReviewById,
  deleteReviewById,
} from "../models/review.model.js";

/**
 * Create a new review
 */
export const createReview = async (req, res) => {
  let conn;
  try {
    const { admin_id, video_id, note, grade, status } = req.body;

    if (!admin_id || !video_id || !note || !grade) {
      return res.status(400).json({ message: "admin_id, video_id, note and grade are required" });
    }

    conn = await getConnection();
    await conn.beginTransaction();

    const reviewId = await insertReview({ admin_id, video_id, note, grade, status }, conn);

    await conn.commit();
    res.status(201).json({ message: "Review created", id: reviewId });
  } catch (error) {
    if (conn) await conn.rollback();
    console.error("Create Review Error:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (conn) conn.release();
  }
};

/**
 * Get all reviews
 */
export const getAllReviews = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const reviews = await selectAllReviews(conn);
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get All Reviews Error:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (conn) conn.release();
  }
};

/**
 * Get review by ID
 */
export const getReviewById = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Review id is required" });

    conn = await getConnection();
    const review = await selectReviewById(id, conn);

    if (!review) return res.status(404).json({ message: "Review not found" });

    res.status(200).json(review);
  } catch (error) {
    console.error("Get Review By Id Error:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (conn) conn.release();
  }
};

/**
 * Update review by ID
 */
export const updateReview = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { note, grade, status } = req.body;

    if (!id) return res.status(400).json({ message: "Review id is required" });

    conn = await getConnection();
    await conn.beginTransaction();

    const affectedRows = await updateReviewById(id, { note, grade, status }, conn);

    await conn.commit();
    res.status(200).json({ message: "Review updated", affectedRows });
  } catch (error) {
    if (conn) await conn.rollback();
    console.error("Update Review Error:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (conn) conn.release();
  }
};

/**
 * Delete review by ID
 */
export const removeReview = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Review id is required" });

    conn = await getConnection();
    await conn.beginTransaction();

    const affectedRows = await deleteReviewById(id, conn);

    await conn.commit();
    res.status(200).json({ message: "Review deleted", affectedRows });
  } catch (error) {
    if (conn) await conn.rollback();
    console.error("Delete Review Error:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (conn) conn.release();
  }
};
