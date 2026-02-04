import { pool } from '../config/db.js';

export const VideoModel = {
  getAll() {
    return pool.query('SELECT * FROM videos');
  },

  getById(id) {
    return pool.query('SELECT * FROM videos WHERE id = ?', [id]);
  },

  create(video) {
    const sql = `
      INSERT INTO videos (
        edition_id, url, filename, email, cover_image, verified,
        title, description, status, country_id,
        producer, producer_image, linkedin_link, youtube_link,
        scenario_ai, video_gen_ai, sound_ai, postprod_ai, tags
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return pool.query(sql, Object.values(video));
  },

  update(id, video) {
    return pool.query(
      `UPDATE videos SET title=?, description=?, status=?, verified=?, tags=? WHERE id=?`,
      [video.title, video.description, video.status, video.verified, video.tags, id]
    );
  },

  remove(id) {
    return pool.query('DELETE FROM videos WHERE id=?', [id]);
  }
};
