import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

/**
 * Build a MariaDB connection URL from individual env vars.
 * Format: mysql://USER:PASSWORD@HOST/DATABASE
 */
const databaseUrl =
	process.env.DATABASE_URL ||
	`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;


/**
 * Create a MariaDB adapter for Prisma.
 * @see https://www.prisma.io/docs/orm/data-layer/databases/mariadb
 */
const adapter = new PrismaMariaDb({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
});

/**
 * Shared PrismaClient singleton.
 * Import this instance in controllers/services instead of creating new clients.
 * @type {PrismaClient}
 */
const prisma = new PrismaClient({ adapter });

export default prisma;
