import multer from 'multer';
import { getBucketClient } from '../config/bucket.js';
import { convertToWebp, toWebpFilename, generateFilename, getMp4Duration } from '../utils/file.util.js';
import { uploadFile, getFileUrl } from '../services/bucket.service.js';

// Configuration Limits
const LIMITS = {
	IMAGE: 5 * 1024 * 1024,      // 5 Mo
	SUBTITLE: 2 * 1024 * 1024,   // 2 Mo
	VIDEO: 300 * 1024 * 1024,    // 300 Mo
	GLOBAL_SUM: 307 * 1024 * 1024,// 307 Mo total
	VIDEO_DURATION_SEC: 90       // 1.5 Minutes
};

/**
 * Allowed MIME types for uploads
 */
const ALLOWED_MIME_TYPES = [
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/gif',
	'image/avif',
	'image/svg+xml',
	'video/mp4',
	'application/x-subrip',
	'text/srt'
];

/**
 * File filter: allow images, video (MP4) and subtitles (SRT/VTT)
 */
const fileFilter = (_req, file, callback) => {
	if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
		callback(null, true);
	} else {
		callback(new Error(`Unsupported file type: ${file.mimetype}`), false);
	}
};



/**
 * Helper to process a single Multer file (Buffer -> WebP optimization -> SHA1 naming -> S3 Upload)
 * @private
 */
const handleProcessedFileUpload = async (file, { acl, quality }) => {
	const isImage = file.mimetype.startsWith('image/');
	let outputBuffer, wasConverted, contentType;

	if (isImage) {
		const convertedBuffer = await convertToWebp(file.buffer, { quality });
		wasConverted = !!convertedBuffer;
		outputBuffer = wasConverted ? convertedBuffer : file.buffer;
		contentType = wasConverted ? 'image/webp' : file.mimetype;
	} else {
		outputBuffer = file.buffer;
		wasConverted = false;
		contentType = file.mimetype;
	}

	const filename = generateFilename(file, outputBuffer);
	const finalName = (isImage && wasConverted) ? toWebpFilename(filename) : filename;

	await uploadFile(finalName, outputBuffer, acl, contentType);

	file.buffer = outputBuffer;
	file.mimetype = contentType;
	file.size = outputBuffer.length;
	file.location = finalName;

	return file;
};

/**
 * Receive any files in memory, enforce type limits, optimize images, and upload to S3.
 * @param {object} [options]
 * @param {string} [options.acl='public-read'] - S3 ACL
 * @param {number} [options.quality=80] - WebP image quality
 * @returns {Array} Express middleware array
 */
export const processAndUpload = (options = {}) => {
	const {
		acl = 'public-read',
		quality = 80
	} = options;

	const receive = multer({
		storage: multer.memoryStorage(),
		fileFilter: fileFilter,
		limits: {
			fileSize: LIMITS.GLOBAL_SUM,
			files: 3
		}
	}).any();

	const process = async (req, res, next) => {
		try {
			if (!req.files || req.files.length === 0) return next();

			for (const file of req.files) {
				if (file.mimetype.startsWith('image/') && file.size > LIMITS.IMAGE) {
					return res.status(400).json({ message: `Image file too large. Maximum size is ${LIMITS.IMAGE / (1024 * 1024)}Mo.` });
				}
				if ((file.mimetype === 'text/srt' || file.mimetype === 'application/x-subrip') && file.size > LIMITS.SUBTITLE) {
					return res.status(400).json({ message: `Subtitle file too large. Maximum size is ${LIMITS.SUBTITLE / (1024 * 1024)}Mo.` });
				}
				if (file.mimetype.startsWith('video/')) {
					if (file.size > LIMITS.VIDEO) {
						return res.status(400).json({ message: `Video file too large. Maximum size is ${LIMITS.VIDEO / (1024 * 1024)}Mo.` });
					}

					const duration = getMp4Duration(file.buffer);
					if (duration !== null && duration > LIMITS.VIDEO_DURATION_SEC) {
						return res.status(400).json({ message: `Video duration exceeds maximum allowed time (${LIMITS.VIDEO_DURATION_SEC} seconds).` });
					}
				}
			}

			const processingTasks = req.files.map(file =>
				handleProcessedFileUpload(file, { acl, quality })
			);

			await Promise.all(processingTasks);
			req.files.forEach(file => {
				if (file.fieldname === 'video') {
					req.body.filename = file.location;
				} else {
					req.body[file.fieldname] = file.location;
				}
			});
			req.file = req.files[0];

			next();
		} catch (error) {
			console.error("Upload Processing Error:", error);
			res.status(500).json({ message: "An error occurred during file upload." });
		}
	};

	// Multer error handling wrapper
	const wrappedReceive = (req, res, next) => {
		receive(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				return res.status(400).json({ message: `File upload error: ${err.message}` });
			} else if (err) {
				if (err.message.includes('Unsupported file type')) {
					return res.status(400).json({ message: err.message });
				}
				return res.status(400).json({ message: err.message });
			}
			next();
		});
	};

	return [wrappedReceive, process];
};
