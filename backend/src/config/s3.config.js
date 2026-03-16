import { S3Client } from '@aws-sdk/client-s3';

/**
 * Get Scaleway S3 configuration from environment variables
 * @returns {{ accessKey: string, secretKey: string, endpoint: string, bucketName: string, region: string, folder: string }}
 */
export const getBucketConfig = () => {
	const config = {
		accessKey: process.env.SCALEWAY_ACCESS_KEY,
		secretKey: process.env.SCALEWAY_SECRET_KEY,
		endpoint: process.env.SCALEWAY_ENDPOINT,
		bucketName: process.env.SCALEWAY_BUCKET_NAME,
		region: process.env.SCALEWAY_REGION,
		folder: process.env.SCALEWAY_FOLDER || ''
	};

	if (!config.accessKey || !config.secretKey) {
		throw new Error('Scaleway S3 credentials not found in environment');
	}

	if (!config.endpoint || !config.bucketName || !config.region) {
		throw new Error('Scaleway S3 configuration incomplete (endpoint, bucket name, or region missing)');
	}

	return config;
};

/**
 * Get authenticated Scaleway S3 client
 * @returns {{ client: S3Client, config: object }}
 */
export const getBucketClient = () => {
	const config = getBucketConfig();

	const client = new S3Client({
		region: config.region,
		endpoint: config.endpoint,
		credentials: {
			accessKeyId: config.accessKey,
			secretAccessKey: config.secretKey
		},
		forcePathStyle: true
	});

	return {
		client,
		endpoint: config.endpoint,
		folder: config.folder,
		bucketName: config.bucketName
	};
};
