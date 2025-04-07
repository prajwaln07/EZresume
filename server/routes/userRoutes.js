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



const router = express.Router();

// User registration
router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/count',getUserCount);


router.post('/logout',logoutUser);

router.post('/contactUs',contactUs);








module.exports = router;
