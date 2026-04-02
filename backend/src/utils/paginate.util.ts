import { prisma } from "#config";

export interface PaginationOptions {
	page?: number | string;
	limit?: number | string;
	where?: any;
	include?: any;
	orderBy?: any;
	select?: any;
	[key: string]: any;
}

export interface PaginatedResult<T> {
	data: T[];
	meta: {
		totalCount: number;
		totalPages: number;
		currentPage: number;
		limit: number;
	};
}

/**
 * Global pagination utility for Prisma models.
 *
 * Runs `findMany` and `count` inside a `$transaction` for consistency.
 *
 * @param model - Prisma model delegate (e.g. `prisma.videos`).
 * @param options - Pagination options.
 * @returns Paginated result.
 */
export const paginate = async <T>(
	model: any,
	{ page = 1, limit = 10, ...prismaArgs }: PaginationOptions = {}
): Promise<PaginatedResult<T>> => {
	const prismaQuery: any = { ...prismaArgs };
	const pageNum = Math.max(1, Number(page) || 1);
	let limitNum = Number(limit);

	if (limitNum !== 0) {
		limitNum = Math.max(1, limitNum || 10);
		const skip = (pageNum - 1) * limitNum;
		prismaQuery.skip = skip;
		prismaQuery.take = limitNum;
	}

	const [data, totalCount] = await (prisma as any).$transaction([
		model.findMany(prismaQuery),
		model.count({ where: prismaQuery.where }),
	]);

	const finalLimit = limitNum !== 0 ? limitNum : totalCount;

	return {
		data,
		meta: {
			totalCount,
			totalPages: totalCount === 0 ? 0 : Math.ceil(totalCount / finalLimit),
			currentPage: pageNum,
			limit: limitNum,
		},
	};
};