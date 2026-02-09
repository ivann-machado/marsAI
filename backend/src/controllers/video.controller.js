import { VideoModel } from "../models/video.model.js";

export const VideoController = {
  async getAll(req, res) {
    try {
      const videos = await VideoModel.getAll();
      res.json(videos);
    } catch (err) {
      console.error("Error fetching videos:", err);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  },

  async getById(req, res) {
    try {
      const rows = await VideoModel.getById(req.params.id);
      if (rows.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Video not found" });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error("Error fetching video:", err);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    } 
  },


  async create(req, res) {
    try {
      // Validate edition_id exists
      const edition = await EditionModel.getById(req.body.edition_id);
      if (!edition) {
        return res.status(400).json({
          status: "error",
          message: `Edition with id ${req.body.edition_id} does not exist`,
        });
      }

      const videoId = await VideoModel.create(req.body);
      res
        .status(201)
        .json({ status: "success", videoId, message: "Video created" });
    } catch (err) {
      console.error("Error creating video:", err);
      res
        .status(500)
        .json({
          status: "error",
          message: err.message || "Internal Server Error",
        });
    }
  },

  async update(req, res) {
    try {
      await VideoModel.update(req.params.id, req.body);
      res.json({ status: "success", message: "Video updated" });
    } catch (err) {
      console.error("Error updating video:", err);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  },

  async remove(req, res) {
    try {
      await VideoModel.remove(req.params.id);
      res.json({ status: "success", message: "Video deleted" });
    } catch (err) {
      console.error("Error deleting video:", err);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  },
};
