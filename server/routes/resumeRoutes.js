const express = require('express');
const { createResume, getResumeById, getAllResumes, updateResume, deleteResume } = require('../controllers/resumeController');
const {verifyToken,checkToken} = require('../middleware/auth');  // Middleware to protect routes

const router = express.Router();

// Route to create a new resume (protected)
router.post('/', checkToken,createResume);

// Route to get all resumes for the logged-in user (protected)
router.get('/', verifyToken,getAllResumes);

// Route to get a specific resume by ID (protected)
router.get('/:id',verifyToken, getResumeById);

// Route to update a specific resume by ID (protected)
router.put('/:id',verifyToken, updateResume);

// Route to delete a specific resume by ID (protected)
router.delete('/:id', verifyToken,deleteResume);

module.exports = router;
