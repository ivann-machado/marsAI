export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
export const JWT_SECRET = process.env.JWT_SECRET;
export const DEV_MODE = process.env.DEV_MODE === 'true';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
export const CONTACT_MAIL = process.env.CONTACT_MAIL || 'no-reply@marsai.com';

if (!JWT_SECRET) throw new Error('JWT_SECRET is required');