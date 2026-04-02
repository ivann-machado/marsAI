import multer from 'multer';
import os from 'node:os';
import fs from 'node:fs';
import { convertToWebp, toWebpFilename, generateFilename } from '#utils';
import { uploadFile } from '#services';
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

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
const fileFilter = (_req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
	if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
		callback(null, true);
	} else {
		callback(new Error(`Unsupported file type: ${file.mimetype}`));
	}
};

interface ProcessOptions {
	acl?: string;
	quality?: number;
	maxFiles?: number;
	maxSize?: number;
	schema?: z.ZodTypeAny;
}

/**
 * Helper to process a single Multer disk file (Stream -> WebP optimization -> SHA1 naming -> S3 Upload)
 * @private
 */
const handleProcessedFileUpload = async (file: Express.Multer.File, { acl, quality }: { acl: string, quality: number }) => {
	const isImage = file.mimetype.startsWith('image/');
	let uploadTarget: string | Buffer;
	let wasConverted = false;
	let contentType = file.mimetype;

	if (isImage) {
		const convertedBuffer = await convertToWebp(file.path, { quality });
		if (convertedBuffer) {
			wasConverted = true;
			uploadTarget = convertedBuffer;
			contentType = 'image/webp';
		} else {
			uploadTarget = file.path;
		}
	} else {
		uploadTarget = file.path;
	}

	const filename = await generateFilename(file.originalname, uploadTarget);
	const finalName = (isImage && wasConverted) ? toWebpFilename(filename) : filename;

	const bodyToUpload = typeof uploadTarget === 'string' ? fs.createReadStream(uploadTarget) : uploadTarget;

	await uploadFile(finalName, bodyToUpload, acl, contentType);

	await fs.promises.unlink(file.path).catch(err => console.error("Could not remove tmp file", err));

	(file as any).mimetype = contentType;
	(file as any).location = finalName;

	return file;
};

/**
 * Receive any files via Disk Streams, enforce type limits, optimize images, and stream upload to S3.
 * Prevents MASSIVE Node RAM spikes on 300MB video uploads by completely skipping `multer.memoryStorage()`!
 */
export const processAndUpload = (options: ProcessOptions = {}) => {
	const {
		acl = 'public-read',
		quality = 80,
		maxFiles = 4,
		maxSize = LIMITS.GLOBAL_SUM,
		schema = null
	} = options;

	const receive = multer({
		storage: multer.diskStorage({ destination: os.tmpdir() }),
		fileFilter: fileFilter,
		limits: {
			fileSize: maxSize,
			files: maxFiles
		}
	}).any();

	const process = async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (schema) {
				const filesForZod: Record<string, any> = {};
				if (req.files) {
					if (Array.isArray(req.files)) {
						req.files.forEach(file => filesForZod[file.fieldname] = file);
					}
				}
				const payload = Object.assign({}, req.body || {}, filesForZod);
				const validatedData = await schema.parseAsync(payload);
				req.body = Object.assign({}, req.body || {}, validatedData);
			}

			if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
				return next();
			}

			const filesArr = Array.isArray(req.files) ? req.files : [];

			const processingTasks = filesArr.map(file =>
				handleProcessedFileUpload(file, { acl, quality })
			);

			await Promise.all(processingTasks);

			filesArr.forEach(file => {
				if (file.fieldname === 'video') {
					req.body.filename = (file as any).location;
				} else {
					req.body[file.fieldname] = (file as any).location;
				}
			});
			req.file = filesArr[0];

			next();
		} catch (error: any) {
			if (req.files && Array.isArray(req.files)) {
				for (const f of req.files) {
					await fs.promises.unlink(f.path).catch(() => { });
				}
			}

			if (error.name === 'ZodError') {
				return res.status(400).json({
					message: "Validation failed",
					errors: error.flatten().fieldErrors
				});
			}
			console.error("Upload Processing Error:", error);
			res.status(500).json({ message: "An error occurred during file upload." });
		}
	};

	// Multer error handling wrapper
	const wrappedReceive = (req: Request, res: Response, next: NextFunction) => {
		receive(req, res, function (err: any) {
			if (err instanceof multer.MulterError) {
				return res.status(400).json({ message: `File upload error: ${err.message}` });
			} else if (err) {
				if (err.message && err.message.includes('Unsupported file type')) {
					return res.status(400).json({ message: err.message });
				}
				return res.status(400).json({ message: err.message });
			}
			next();
		});
	};

	return [wrappedReceive, process];
};
