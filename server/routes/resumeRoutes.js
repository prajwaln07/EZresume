const express = require('express');
const { createResume, getResumeById, getAllResumes, updateResume, deleteResume,getSuggestions  } = require('../controllers/resumeController');
const {verifyToken,checkToken} = require('../middleware/auth');  // Middleware to protect routes

const router = express.Router();

// Route to create a new resume (protected)
router.post('/', createResume);

// Route to get all resumes for the logged-in user (protected)
router.get('/',getAllResumes);

router.post('/suggestion',getSuggestions);
// Route to get a specific resume by ID (protected)
router.get('/:id', getResumeById);

// Route to update a specific resume by ID (protected)
router.put('/:id', updateResume);

// Route to delete a specific resume by ID (protected)
router.delete('/:id',deleteResume);

module.exports = router;
