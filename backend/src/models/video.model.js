import { pool } from "../config/db.js";

/**
 * Video object type.
 * @typedef {Object} Video
 * @property {number} [edition_id]
 * @property {string} url
 * @property {string} filename
 * @property {string} email
 * @property {string} cover_image
 * @property {boolean} verified
 * @property {string} title
 * @property {string} description
 * @property {'unverified'|'verified'|'selected'|'grand_prix_1'|'grand_prix_2'|'grand_prix_3'} status
 * @property {number} [country_id]
 * @property {string} producer
 * @property {string} producer_image
 * @property {string} linkedin_link
 * @property {string} youtube_link
 * @property {string} scenario_ai
 * @property {string} video_gen_ai
 * @property {string} sound_ai
 * @property {string} postprod_ai
 * @property {string} tags
 */

/**
 * Data access layer for videos table.
 */
export const VideoModel = {
  /**
   * Get all videos.
   * @returns {Promise<any>}
   */
  getAll() {
    return pool.query("SELECT * FROM videos");
  },

  /**
   * Get one video by ID.
   * @param {number|string} id
   * @returns {Promise<any>}
   */
  getById(id) {
    return pool.query("SELECT * FROM videos WHERE id = ?", [id]);
  },

  /**
   * Create a new video.
   * @param {Video} video
   * @returns {Promise<any>}
   */
  create(video) {
    const sql = `
      INSERT INTO videos (
        edition_id,
        url,
        filename,
        email,
        cover_image,
        verified,
        title,
        description,
        status,
        country_id,
        producer,
        producer_image,
        linkedin_link,
        youtube_link,
        scenario_ai,
        video_gen_ai,
        sound_ai,
        postprod_ai,
        tags
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      video.edition_id ?? null,
      video.url,
      video.filename,
      video.email,
      video.cover_image,
      video.verified,
      video.title,
      video.description,
      video.status,
      video.country_id ?? null,
      video.producer,
      video.producer_image,
      video.linkedin_link,
      video.youtube_link,
      video.scenario_ai,
      video.video_gen_ai,
      video.sound_ai,
      video.postprod_ai,
      video.tags,
    ];

    return pool.query(sql, values);
  },

  /**
   * Update a video.
   * @param {number|string} id
   * @param {Partial<Video>} video
   * @returns {Promise<any>}
   */
  update(id, video) {
    const sql = `
      UPDATE videos SET
        title = ?,
        description = ?,
        status = ?,
        verified = ?,
        tags = ?
      WHERE id = ?
    `;

    const values = [
      video.title,
      video.description,
      video.status,
      video.verified,
      video.tags,
      id,
    ];

    return pool.query(sql, values);
  },

  /**
   * Delete a video by ID.
   * @param {number|string} id
   * @returns {Promise<any>}
   */
  remove(id) {
    return pool.query("DELETE FROM videos WHERE id = ?", [id]);
  },
};
