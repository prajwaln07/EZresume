const express = require('express');
const { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    updateUserProfile, 
    deleteUserAccount ,
    logoutUser,
    getUserCount,
    contactUs
} = require('../controllers/userController');
const { protect } = require('../middleware/auth/protect');



const router = express.Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get user profile (protected route)...
router.get('/profile', protect, getUserProfile);

// Update user profile (protected route)
router.put('/profile', protect, updateUserProfile);

// Delete user account (protected route).
router.delete('/account', protect, deleteUserAccount);

router.get('/count',getUserCount);


router.post('/logout',logoutUser);

router.post('/contactUs',contactUs);








module.exports = router;
