import { Redis } from 'ioredis';

if (!process.env.REDIS_URL) {
	throw new Error('REDIS_URL environment variable is missing');
}

const redis = new Redis(process.env.REDIS_URL as string);

redis.on('connect', () => {
	console.log('Redis connected');
});

redis.on('error', (err: Error) => {
	console.error('Redis error:', err);
});

export default redis;