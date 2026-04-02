import prisma from "../config/prisma.config.ts";

/**
 * Global pagination utility for Prisma models.
 *
 * Runs `findMany` and `count` inside a `$transaction` for consistency.
 *
 * @param {object}  model               - Prisma model delegate (e.g. `prisma.videos`).
 * @param {object}  options
 * @param {number}  [options.page=1]    - Current page (1-indexed).
 * @param {number}  [options.limit=10]  - Items per page.
 * @param {object}  [options.where]     - Prisma `where` filter.
 * @param {object}  [options.include]   - Prisma `include` (eager loading).
 * @param {object}  [options.orderBy]   - Prisma `orderBy` clause.
 * @param {object}  [options.select]    - Prisma `select` clause.
 * @returns {Promise<{ data: any[], meta: { totalCount: number, totalPages: number, currentPage: number, limit: number } }>}
 */
export const paginate = async (model, { page = 1, limit = 10, ...prismaArgs } = {}) => {
	const prismaQuery = { ...prismaArgs };
	page = Math.max(1, Number(page) || 1);
	//if limit = 0 return all
	if (limit !== 0) {
		limit = Math.max(1, Number(limit) || 10);
		const skip = (page - 1) * limit;
		prismaQuery.skip = skip;
		prismaQuery.take = limit;
	}

	const [data, totalCount] = await prisma.$transaction([
		model.findMany(prismaQuery),
		model.count({ where: prismaQuery.where }),
	]);

	return {
		data,
		meta: {
			totalCount,
			totalPages: Math.ceil(totalCount / (limit !== 0 ? limit : totalCount)),
			currentPage: page,
			limit,
		},
	};
};