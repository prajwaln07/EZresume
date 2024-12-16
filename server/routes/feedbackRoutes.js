// server/routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Submit feedback
router.post('/',verifyToken,feedbackController.submitFeedback);

// Get feedback for a specific template
router.get('/:templateId',checkRole(['admin']), feedbackController.getFeedbackByTemplateId);

// Get all feedback (Admin only)
router.get('/', feedbackController.getAllFeedback);

module.exports = router;
