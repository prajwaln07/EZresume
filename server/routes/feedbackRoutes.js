const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Get overall average rating
router.get('/average', feedbackController.getOverallAverageRating);

// Submit feedback
router.post('/', verifyToken, feedbackController.submitFeedback);

// Get all feedback (Admin only)
router.get('/', feedbackController.getAllFeedback);

// Get feedback for a specific template
router.get('/:templateId', verifyToken, checkRole(['admin']), feedbackController.getFeedbackByTemplateId);

module.exports = router;
