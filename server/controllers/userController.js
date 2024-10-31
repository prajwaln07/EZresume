const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// User Registration Function
const registerUser = async (req, res) => {
  // Validate input
  await body('username').isString().isLength({ min: 3 }).trim().escape().run(req);
  await body('email').isEmail().normalizeEmail().run(req);
  await body('password').isLength({ min: 6 }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Optionally return the user data (without password)
    const { password: _, ...userData } = user.toObject();

    res.status(201).json({ message: 'User registered successfully.', user: userData });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};

// User Login Function
const loginUser = async (req, res) => {
  // Validate input
  await body('email').isEmail().normalizeEmail().run(req);
  await body('password').isLength({ min: 6 }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Make token expiry configurable
    });

    // Optionally return the user data (without password)
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({ message: 'Login successful.', token, user: userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};

const getUserProfile = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const updateUserProfile = async (req, res) => {
    const { username, email, profileImage } = req.body;

    try {
        // Find the user by ID and update the fields
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { username, email, profileImage },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const deleteUserAccount = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,

};
