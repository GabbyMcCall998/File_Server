const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        const token = authHeader.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            return res.status(401).json({ error: 'User not found or token invalid' });
        }

        // Check for admin token if role is admin
        if (user.role === 'admin' && token !== user.adminToken) {
            return res.status(401).json({ error: 'Admin token required' });
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

module.exports = authMiddleware;
