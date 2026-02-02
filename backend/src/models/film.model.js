const db = require('../config/db');

class Film {

  static async findPaginated(page = 1) {
    let limit, offset;

    if (page === 1) { limit = 20; offset = 0; }
    else if (page === 2) { limit = 15; offset = 20; }
    else if (page === 3) { limit = 15; offset = 35; }
    else return [];

    const conn = await db.getConnection();
    try {
      const rows = await conn.query(
        'SELECT * FROM films ORDER BY id DESC LIMIT ? OFFSET ?',
        [limit, offset]
      );
      return rows;
    } finally {
      conn.release();
    }
  }

  static async create(data) {
    const { title, description, category } = data;
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        'INSERT INTO films (title, description, category) VALUES (?, ?, ?)',
        [title, description, category]
      );
      return result.insertId;
    } finally {
      conn.release();
    }
  }

  static async findById(id) {
    const conn = await db.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM films WHERE id=?', [id]);
      return rows[0];
    } finally {
      conn.release();
    }
  }

  static async update(id, data) {
    const { title, description, category } = data;
    const conn = await db.getConnection();
    try {
      await conn.query(
        'UPDATE films SET title=?, description=?, category=? WHERE id=?',
        [title, description, category, id]
      );
    } finally {
      conn.release();
    }
  }

  static async delete(id) {
    const conn = await db.getConnection();
    try {
      await conn.query('DELETE FROM films WHERE id=?', [id]);
    } finally {
      conn.release();
    }
  }
}

module.exports = Film;
