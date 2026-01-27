const pool = require("../utils/pool");

class CountryModel {
  static async findAll() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM countries");
    conn.release();
    return rows;
  }
}

module.exports = CountryModel;
