const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const protect = async (req, res, next) => {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // Extract the token from the "Bearer" scheme
    }

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token; // Extract the token from cookies
    }

    // console.log("token *********************************----->>" ,token);

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
   

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
        //  console.log("token <<----->>" ,decoded);
        // Find the user associated with the token
        req.user = await User.findById(decoded.userId).select('-password'); // Exclude the password field

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

module.exports = { protect };
