// server/controllers/feedbackController.js
const Feedback = require('../models/Feedback');

// Submit feedback on a template
exports.submitFeedback = async (req, res) => {
    try {
        const { templateId, comments, rating } = req.body;
        const userId = req.user.id; // Assuming user ID is set in req.user by the auth middleware

        if (!templateId || !comments || rating === undefined) {
            return res.status(400).send("Template ID, comments, and rating are required.");
        }

        const feedback = new Feedback({ userId, templateId, comments, rating });
        await feedback.save();
        res.status(201).json(feedback);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error submitting feedback");
    }
};

// Get feedback for a specific template
exports.getFeedbackByTemplateId = async (req, res) => {
    try {
        const { templateId } = req.params;
        const feedback = await Feedback.find({ templateId }).populate('userId', 'email'); // Populate user ID for user email

        if (!feedback.length) return res.status(404).send("No feedback found for this template");

        res.json(feedback);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching feedback");
    }
};

// Get all feedback (Admin only)
exports.getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find().populate('userId', 'email').populate('templateId', 'name');
        res.json(feedback);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching feedback");
    }
};
