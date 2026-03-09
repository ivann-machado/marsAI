import sharp from 'sharp';
import path from 'path';
import crypto from 'crypto';
import { DEV_MODE } from '../config/index.js';

/**
 * Convert an image buffer to WebP format
 * @param {Buffer} inputBuffer - The source image buffer (JPEG, PNG, TIFF, GIF, AVIF…)
 * @param {object} [options] - sharp webp options
 * @param {number} [options.quality=80] - WebP quality (1-100)
 * @param {boolean} [options.lossless=false] - Use lossless compression
 * @param {number|null} [options.width=null] - Resize width (preserves aspect ratio if height is null)
 * @param {number|null} [options.height=null] - Resize height (preserves aspect ratio if width is null)
 * @returns {Promise<Buffer>} - The converted WebP buffer
 */
export const convertToWebp = async (inputBuffer, { quality = 80, lossless = false, width = null, height = null } = {}) => {
	try {
		const metadata = await sharp(inputBuffer).metadata();
		if (metadata.format === 'webp' || metadata.format === 'svg') {
			if (DEV_MODE) {
				console.log(`Image is already ${metadata.format}, skipping conversion`);
			}
			return false;
		}

		let pipeline = sharp(inputBuffer);

		if (width || height) {
			pipeline = pipeline.resize(width, height, { fit: 'inside', withoutEnlargement: true });
		}

		const outputBuffer = await pipeline
			.webp({ quality, lossless })
			.toBuffer();

		if (DEV_MODE) {
			console.log(`Image converted to WebP: ${inputBuffer.length} → ${outputBuffer.length} bytes`);
		}

		return outputBuffer;
	} catch (error) {
		console.error('Error converting image to WebP:', error);
		throw new Error(`WebP conversion failed: ${error.message}`);
	}
};

/**
 * Replace the file extension with .webp
 * @param {string} filename - Original filename (e.g. "photo.png")
 * @returns {string} - Filename with .webp extension (e.g. "photo.webp")
 */
export const toWebpFilename = (filename) => {
	const lastDot = filename.lastIndexOf('.');
	if (lastDot === -1) return `${filename}.webp`;
	return `${filename.substring(0, lastDot)}.webp`;
};

/**
 * Build a SHA1-based filename
 * @param {object} file - Multer file object
 * @param {Buffer} buffer - File content buffer
 * @returns {string}
 */
export const generateFilename = (file, buffer) => {
	const ext = path.extname(file.originalname);
	const hash = crypto.createHash('sha1').update(buffer).digest('hex');
	return `${hash}${ext}`;
};

/**
 * Extract video duration directly from MP4 buffer (mvhd atom)
 * @param {Buffer} buffer - MP4 file buffer
 * @returns {number|null} Duration in seconds, or null if not found
 */
export const getMp4Duration = (buffer) => {
	try {
		if (!buffer || buffer.length < 100) return null;

		let offset = 0;
		while (offset < buffer.length - 8) {
			const size = buffer.readUInt32BE(offset);
			const type = buffer.toString('ascii', offset + 4, offset + 8);

			if (size < 8) break;

			if (type === 'moov') {
				offset += 8;
				continue;
			}

			if (type === 'mvhd') {
				const version = buffer.readUInt8(offset + 8);
				let timeScale, duration;

				if (version === 1) {
					// 64-bit values
					timeScale = buffer.readUInt32BE(offset + 28);
					const high = buffer.readUInt32BE(offset + 32);
					const low = buffer.readUInt32BE(offset + 36);
					duration = high * 0x100000000 + low;
				} else {
					// 32-bit values
					timeScale = buffer.readUInt32BE(offset + 20);
					duration = buffer.readUInt32BE(offset + 24);
				}

				if (timeScale > 0) {
					return duration / timeScale;
				}
				return null;
			}


			offset += size;
		}
		return null;
	} catch (error) {
		console.error("Error parsing MP4 duration:", error);
		return null;
	}
};
