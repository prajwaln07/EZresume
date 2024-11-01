// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Middleware for authenticating tokens
exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token; // Extract the token from cookies
    }
    if (!token) return res.status(403).send("Access Denied: No Token Provided");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send("Invalid Token");
    }
};

// Middleware for role-based access control
exports.checkRole = (roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user._id);
            if (roles.includes(user.role)) {
                next();
            } else {
                res.status(403).send("Access Denied: Insufficient Permissions");
            }
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    };
};
