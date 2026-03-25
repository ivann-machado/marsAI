import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";


const config = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	connectionLimit: 3,
};

if (!config.host || !config.user || !config.database || !config.password) {
	throw new Error('Database configuration incomplete');
}

/**
 * Create a MariaDB adapter for Prisma.
 * @see https://www.prisma.io/docs/orm/data-layer/databases/mariadb
 */
const adapter = new PrismaMariaDb(config);

/**
 * Shared PrismaClient singleton.
 * Import this instance in controllers/services instead of creating new clients.
 * @type {PrismaClient}
 */
export default new PrismaClient({ adapter });