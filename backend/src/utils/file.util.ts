import sharp from 'sharp';
import path from 'node:path';
import crypto from 'node:crypto';
import fs from 'node:fs';
import { NODE_ENV } from '#config';

export interface WebpOptions {
	quality?: number;
	lossless?: boolean;
	width?: number | null;
	height?: number | null;
}

/**
 * Convert an image file (or buffer) to WebP format natively
 * @param input Source image (Buffer or filepath string)
 * @param options sharp webp conversion options
 * @returns The converted WebP buffer
 */
export const convertToWebp = async (
	input: Buffer | string,
	{ quality = 80, lossless = false, width = null, height = null }: WebpOptions = {}
): Promise<Buffer | false> => {
	try {
		const metadata = await sharp(input).metadata();
		if (metadata.format === 'webp' || metadata.format === 'svg') {
			if (NODE_ENV !== 'production') {
				console.log(`Image is already ${metadata.format}, skipping conversion`);
			}
			return false;
		}

		let pipeline = sharp(input);

		if (width || height) {
			pipeline = pipeline.resize(width, height, { fit: 'inside', withoutEnlargement: true });
		}

		const outputBuffer = await pipeline
			.webp({ quality, lossless })
			.toBuffer();

		if (NODE_ENV !== 'production') {
			console.log(`Image converted to WebP successfully`);
		}

		return outputBuffer;
	} catch (error: any) {
		console.error('Error converting image to WebP:', error);
		throw new Error(`WebP conversion failed: ${error.message}`);
	}
};

/**
 * Replace the file extension with .webp
 */
export const toWebpFilename = (filename: string): string => {
	const lastDot = filename.lastIndexOf('.');
	if (lastDot === -1) return `${filename}.webp`;
	return `${filename.substring(0, lastDot)}.webp`;
};

/**
 * Build a SHA1-based filename natively by streaming or generating from buffer.
 */
export const generateFilename = async (originalname: string, input: string | Buffer): Promise<string> => {
	const ext = path.extname(originalname);

	if (Buffer.isBuffer(input)) {
		const hash = crypto.createHash('sha1').update(input).digest('hex');
		return `${hash}${ext}`;
	}

	return new Promise((resolve, reject) => {
		const hash = crypto.createHash('sha1');
		const stream = fs.createReadStream(input);

		stream
			.on('data', (chunk) => hash.update(chunk))
			.on('end', () => resolve(`${hash.digest('hex')}${ext}`))
			.on('error', reject);
	});
};

export interface Mp4Metadata {
	duration: number | null;
	width: number | null;
	height: number | null;
	aspectRatio: string | null;
}

/**
 * Extract video metadata directly using async file I/O instead of pulling 300MB into RAM.
 * We seek to chunk headers and read them asynchronously. This behaves like a non-blocking worker thread.
 */
export const getMp4Metadata = async (filePath: string): Promise<Mp4Metadata | null> => {
	let fd: fs.promises.FileHandle | null = null;
	try {
		fd = await fs.promises.open(filePath, 'r');
		const stat = await fd.stat();

		const result: Mp4Metadata = { duration: null, width: null, height: null, aspectRatio: null };
		let offset = 0;

		while (offset < stat.size - 8) {
			const headBuffer = Buffer.alloc(8);
			const { bytesRead } = await fd.read(headBuffer, 0, 8, offset);
			if (bytesRead < 8) break;

			const size = headBuffer.readUInt32BE(0);
			const type = headBuffer.toString('ascii', 4, 8);

			if (size < 8) break;

			if (type === 'moov') {
				offset += 8;
				continue;
			}

			if (type === 'mvhd') {
				const mvhdBuffer = Buffer.alloc(size - 8);
				await fd.read(mvhdBuffer, 0, size - 8, offset + 8);

				const version = mvhdBuffer.readUInt8(0);
				let timeScale, duration;

				if (version === 1) {
					// 64-bit values
					timeScale = mvhdBuffer.readUInt32BE(20);
					const high = mvhdBuffer.readUInt32BE(24);
					const low = mvhdBuffer.readUInt32BE(28);
					duration = high * 0x100000000 + low;
				} else {
					// 32-bit values
					timeScale = mvhdBuffer.readUInt32BE(12);
					duration = mvhdBuffer.readUInt32BE(16);
				}

				if (timeScale > 0) {
					result.duration = duration / timeScale;
				}
			}

			if (type === 'trak') {
				let trakOffset = offset + 8;
				while (trakOffset < offset + size) {
					const trakHead = Buffer.alloc(8);
					const { bytesRead: tbRead } = await fd.read(trakHead, 0, 8, trakOffset);
					if (tbRead < 8) break;

					const trakSize = trakHead.readUInt32BE(0);
					const trakType = trakHead.toString('ascii', 4, 8);

					if (trakType === 'tkhd') {
						const tkhdBuffer = Buffer.alloc(trakSize - 8);
						await fd.read(tkhdBuffer, 0, trakSize - 8, trakOffset + 8);
						const version = tkhdBuffer.readUInt8(0);

						const base = version === 1 ? 88 : 76;
						if (tkhdBuffer.length >= base + 8) {
							const width = tkhdBuffer.readUInt32BE(base) >> 16;
							const height = tkhdBuffer.readUInt32BE(base + 4) >> 16;
							if (width > 0 && height > 0) {
								result.width = width;
								result.height = height;
								const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
								const divisor = gcd(width, height);
								result.aspectRatio = `${width / divisor}:${height / divisor}`;
							}
						}
					}
					trakOffset += trakSize;
				}
			}

			offset += size;
		}

		return result;
	} catch (error) {
		console.error("Error parsing MP4 duration dynamically:", error);
		return null;
	} finally {
		if (fd) await fd.close();
	}
};