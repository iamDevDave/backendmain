import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to check if the user is authenticated
export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer token
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); // Attach user to request
        if (!req.user) return res.status(401).json({ message: 'User not found' });

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', error });
    }
};

// Middleware to check if the user has a specific role
export const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }
        next();
    };
};
