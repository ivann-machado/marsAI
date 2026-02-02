import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';

export const verifyToken = (req, res, next) => {
	const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

	if (!token) {
		return res.status(403).json({ message: 'No token provided' });
	}

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		req.user = decoded;
		next();
	});
};

export const requireSuperAdmin = (req, res, next) => {
	if (req.user && (req.user.role === 'super admin')) {
		next();
	} else {
		res.status(403).json({ message: 'Require Super Admin Role' });
	}
};
