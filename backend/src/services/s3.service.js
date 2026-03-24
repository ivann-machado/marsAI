import {
	PutObjectCommand,
	GetObjectCommand,
	DeleteObjectCommand,
	ListObjectsV2Command,
	HeadObjectCommand
} from '@aws-sdk/client-s3';
import bucket from '../config/s3.config.js';
import { NODE_ENV } from '../config/index.ts';

/**
 * Build the full object key by prepending the configured folder prefix
 * @param {string} filename
 * @returns {string}
 */
const buildKey = (filename) => {
	const { folder } = bucket;
	const prefix = folder ? `${folder}/` : '';
	return `${prefix}${filename}`;
};

/**
 * Upload a file to the S3 bucket
 * @param {string} filename - Name / path of the object in the bucket
 * @param {Buffer|ReadableStream|string} body - File content
 * @param {string} acl - ACL of the object : public-read or private.
 * @param {string} [contentType='application/octet-stream'] - MIME type
 * @returns {Promise<object>} - S3 response
 */
export const uploadFile = async (filename, body, acl, contentType = 'application/octet-stream') => {
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
			ACL: acl,
			ContentType: contentType
		});

		const response = await client.send(command);

		if (NODE_ENV !== 'production') {
			console.log(`File uploaded successfully: ${key}`);
		}

		return response;
	} catch (error) {
		console.error('Error uploading file to S3:', error);
		throw new Error(`File upload failed: ${error.message}`);
	}
};

/**
 * Download / get a file from the S3 bucket
 * @param {string} filename - Name / path of the object in the bucket
 * @returns {Promise<import('@aws-sdk/client-s3').GetObjectCommandOutput>}
 */
export const getFile = async (filename) => {
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
	} catch (error) {
		console.error('Error getting file from S3:', error);
		throw new Error(`File retrieval failed: ${error.message}`);
	}
};

/**
 * Delete a file from the S3 bucket
 * @param {string} filename - Name / path of the object in the bucket
 * @returns {Promise<object>} - S3 response
 */
export const deleteFile = async (filename) => {
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
	} catch (error) {
		console.error('Error deleting file from S3:', error);
		throw new Error(`File deletion failed: ${error.message}`);
	}
};

/**
 * List files in the S3 bucket (optionally filtered by prefix)
 * @param {string} [prefix=''] - Prefix to filter objects (appended after the configured folder)
 * @param {number} [maxKeys=1000] - Maximum number of keys to return
 * @returns {Promise<import('@aws-sdk/client-s3').ListObjectsV2CommandOutput>}
 */
export const listFiles = async (prefix = '', maxKeys = 1000) => {
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
	} catch (error) {
		console.error('Error listing files from S3:', error);
		throw new Error(`File listing failed: ${error.message}`);
	}
};

/**
 * Check if a file exists in the S3 bucket
 * @param {string} filename - Name / path of the object in the bucket
 * @returns {Promise<boolean>}
 */
export const fileExists = async (filename) => {
	try {
		const { client, bucketName } = bucket;
		const key = buildKey(filename);

		const command = new HeadObjectCommand({
			Bucket: bucketName,
			Key: key
		});

		await client.send(command);
		return true;
	} catch (error) {
		if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
			return false;
		}
		throw new Error(`File existence check failed: ${error.message}`);
	}
};

/**
 * Build the public URL for an object in the bucket
 * @param {string} filename - Name / path of the object in the bucket
 * @returns {string} - Public URL
 */
export const getFileUrl = (filename) => {
	const { endpoint, bucketName } = bucket;
	const key = buildKey(filename);
	return `${endpoint}/${bucketName}/${key}`;
};

/**
 * Get the filename from a file URL
 * @param {string} fileUrl - Public URL of the object in the bucket
 * @returns {string} - Filename
 */
export const getFilename = (fileUrl) => {
	const { endpoint, bucketName, folder } = bucket;
	const prefix = folder ? `${folder}/` : '';
	return fileUrl.replace(`${endpoint}/${bucketName}/${prefix}`, '');
};