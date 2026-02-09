import mariadb from "mariadb";

/**
 * MariaDB connection pool.
 * Uses environment variables: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME.
 * @type {import('mariadb').Pool}
 */
const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	connectionLimit: 5,
});

/**
 * Test a connection from the pool.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
	let conn;
	try {
		conn = await pool.getConnection();
		console.log("Connected to the database");
	} catch (err) {
		console.error("Error connecting to the database: ", err);
	} finally {
		if (conn) conn.release();
	}
};

/**
 * Get a connection from the pool for transaction use.
 * @returns {Promise<import('mariadb').PoolConnection>}
 */
const getConnection = async () => {
	return await pool.getConnection();
};

export { pool, getConnection };
export default connectDB;
