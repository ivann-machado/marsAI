import {
	PutObjectCommand,
	GetObjectCommand,
	DeleteObjectCommand,
	ListObjectsV2Command,
	HeadObjectCommand,
	type GetObjectCommandOutput,
	type ListObjectsV2CommandOutput
} from '@aws-sdk/client-s3';
import { bucket, NODE_ENV } from '#config';
import type { Readable } from 'node:stream';

/**
 * Build the full object key by prepending the configured folder prefix
 */
const buildKey = (filename: string): string => {
	const { folder } = bucket;
	const prefix = folder ? `${folder}/` : '';
	return `${prefix}${filename}`;
};

/**
 * Upload a file to the S3 bucket
 */
export const uploadFile = async (
	filename: string,
	body: Buffer | Readable | string,
	acl: string,
	contentType: string = 'application/octet-stream'
): Promise<any> => {
	try {
		const { client, bucketName } = bucket;
		const key = buildKey(filename);

		if (NODE_ENV !== 'production') {
			console.log(`Uploading file to bucket: ${bucketName}, key: ${key}`);
		}
		const command = new PutObjectCommand({
			Bucket: bucketName,
			Key: key,
			Body: body,
			ACL: acl as any,
			ContentType: contentType
		});

		const response = await client.send(command);

		if (NODE_ENV !== 'production') {
			console.log(`File uploaded successfully: ${key}`);
		}

		return response;
	} catch (error: any) {
		console.error('Error uploading file to S3:', error);
		throw new Error(`File upload failed: ${error.message}`);
	}
};

/**
 * Download / get a file from the S3 bucket
 */
export const getFile = async (filename: string): Promise<GetObjectCommandOutput> => {
	try {
		const { client, bucketName } = bucket;
		const key = buildKey(filename);

		if (NODE_ENV !== 'production') {
			console.log(`Getting file from bucket: ${bucketName}, key: ${key}`);
		}

		const command = new GetObjectCommand({
			Bucket: bucketName,
			Key: key
		});

		return await client.send(command);
	} catch (error: any) {
		console.error('Error getting file from S3:', error);
		throw new Error(`File retrieval failed: ${error.message}`);
	}
};

/**
 * Delete a file from the S3 bucket
 */
export const deleteFile = async (filename: string): Promise<any> => {
	try {
		const { client, bucketName } = bucket;
		const key = buildKey(filename);

		if (NODE_ENV !== 'production') {
			console.log(`Deleting file from bucket: ${bucketName}, key: ${key}`);
		}

		const command = new DeleteObjectCommand({
			Bucket: bucketName,
			Key: key
		});

		const response = await client.send(command);

		if (NODE_ENV !== 'production') {
			console.log(`File deleted successfully: ${key}`);
		}

		return response;
	} catch (error: any) {
		console.error('Error deleting file from S3:', error);
		throw new Error(`File deletion failed: ${error.message}`);
	}
};

/**
 * List files in the S3 bucket (optionally filtered by prefix)
 */
export const listFiles = async (prefix = '', maxKeys = 1000): Promise<ListObjectsV2CommandOutput> => {
	try {
		const { client, bucketName, folder } = bucket;
		const folderPrefix = folder ? `${folder}/` : '';
		const fullPrefix = `${folderPrefix}${prefix}`;

		if (NODE_ENV !== 'production') {
			console.log(`Listing files in bucket: ${bucketName}, prefix: ${fullPrefix}`);
		}

		const command = new ListObjectsV2Command({
			Bucket: bucketName,
			Prefix: fullPrefix,
			MaxKeys: maxKeys
		});

		return await client.send(command);
	} catch (error: any) {
		console.error('Error listing files from S3:', error);
		throw new Error(`File listing failed: ${error.message}`);
	}
};

/**
 * Check if a file exists in the S3 bucket
 */
export const fileExists = async (filename: string): Promise<boolean> => {
	try {
		const { client, bucketName } = bucket;
		const key = buildKey(filename);

		const command = new HeadObjectCommand({
			Bucket: bucketName,
			Key: key
		});

		await client.send(command);
		return true;
	} catch (error: any) {
		if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
			return false;
		}
		throw new Error(`File existence check failed: ${error.message}`);
	}
};

/**
 * Build the public URL for an object in the bucket
 */
export const getFileUrl = (filename: string): string => {
	const { endpoint, bucketName } = bucket;
	const key = buildKey(filename);
	return `${endpoint}/${bucketName}/${key}`;
};

/**
 * Get the filename from a file URL
 */
export const getFilename = (fileUrl: string): string => {
	const { endpoint, bucketName, folder } = bucket;
	const prefix = folder ? `${folder}/` : '';
	return fileUrl.replace(`${endpoint}/${bucketName}/${prefix}`, '');
};