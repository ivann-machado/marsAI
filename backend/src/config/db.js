import mariadb from 'mariadb';

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	connectionLimit: 5
});

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

export { pool };
export default connectDB;