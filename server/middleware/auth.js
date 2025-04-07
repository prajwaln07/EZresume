// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');


// Middleware for authenticating tokens
exports.verifyToken = (req, res, next) => {

    let token;
     token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
  
    if (!token) 
    return res.status(403).send(" Access Denied: No Token Provided ");
   
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send("Invalid Token");
    }
};

exports.checkToken = (req, res, next) => {
   
    let token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (req.cookies && req.cookies.token) {
    
        token = req.cookies.token; // Extract the token from cookies
    }
  
    if (!token){ 
        req.user=null;
        return  next();
    }
   
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send("Invalid Token");
    }
};


exports.checkRole = (roles) => {
    return  (req, res, next) => {
        try {

            const currentUser =req.user;
            if (roles.includes(currentUser.role)) {
                next();
            } else {
                res.status(403).send("Access Denied:: Insufficient Permissions");
            }
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    };
};

