let dotenv = require("dotenv").config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "ma_db",
  connectionLimit: 10, // important en prod
});

console.log(dotenv);

module.exports = pool;
