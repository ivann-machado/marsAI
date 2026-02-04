import { VideoModel } from '../models/video.model.js';

export const VideoController = {

  async getAll(req, res) {
    const [videos] = await VideoModel.getAll();
    res.json(videos);
  },

  async getById(req, res) {
    const [rows] = await VideoModel.getById(req.params.id);
    res.json(rows[0]);
  },

  async create(req, res) {
    await VideoModel.create(req.body);  
    res.status(201).json({ message: 'Video created' });
  },

  async update(req, res) {
    await VideoModel.update(req.params.id, req.body);
    res.json({ message: 'Video updated' });
  },

  async remove(req, res) {
    await VideoModel.remove(req.params.id);
    res.json({ message: 'Video deleted' });
  }
};
