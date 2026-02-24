const mockQuery = jest.fn();

export const pool = {
	query: mockQuery,
};

export const getConnection = jest.fn().mockResolvedValue({
	query: mockQuery,
	beginTransaction: jest.fn(),
	commit: jest.fn(),
	rollback: jest.fn(),
	release: jest.fn(),
});
