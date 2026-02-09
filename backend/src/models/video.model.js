import { pool } from "../config/db.js";

export const VideoModel = {
  getAll() {
    return pool.query("SELECT * FROM videos");
  },

  getById(id) {
    return pool.query("SELECT * FROM videos WHERE id = ?", [id]);
  },

  async create(video) {
    // Champs obligatoires
    const requiredFields = ["edition_id", "url", "filename", "email", "cover_image", "verified", "title"];
    for (const field of requiredFields) {
      if (video[field] === undefined || video[field] === null) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    const sql = `
      INSERT INTO videos (
        edition_id, url, filename, email, cover_image, verified,
        title, description, status, country_id,
        producer, producer_image, linkedin_link, youtube_link,
        scenario_ai, video_gen_ai, sound_ai, postprod_ai, tags
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      video.edition_id,
      video.url,
      video.filename,
      video.email,
      video.cover_image || "default_cover.jpg",
      video.verified ?? 0,
      video.title,
      video.description || "",
      video.status || "draft",
      video.country_id || null,
      video.producer || "",
      video.producer_image || "",
      video.linkedin_link || "",
      video.youtube_link || "",
      video.scenario_ai || "",
      video.video_gen_ai || "",
      video.sound_ai || "",
      video.postprod_ai || "",
      video.tags || ""
    ];

    try {
      const result = await pool.query(sql, values);
      return result.insertId; // retourne l'ID de la vidéo insérée
    } catch (err) {
      console.error("Error inserting video:", err);
      throw err;
    }
  },

  update(id, video) {
    return pool.query(
      `UPDATE videos SET title=?, description=?, status=?, verified=?, tags=? WHERE id=?`,
      [
        video.title,
        video.description || "",
        video.status || "draft",
        video.verified ?? 0,
        video.tags || "",
        id,
      ]
    );
  },

  remove(id) {
    return pool.query("DELETE FROM videos WHERE id=?", [id]);
  },
};
