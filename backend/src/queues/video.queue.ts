import { Queue } from 'bullmq';
import redis from '../config/redis.config.ts';

/**
 * BullMQ queue for video processing jobs.
 * Supported job types: yt_status_check
 */
const videoQueue = new Queue('videoQueue', {
	connection: redis,
	defaultJobOptions: {
		attempts: 5,
		backoff: {
			type: 'exponential',
			delay: 60_000,
		},
		removeOnComplete: { count: 100 },
		removeOnFail: { count: 200 },
	},
});

export default videoQueue;