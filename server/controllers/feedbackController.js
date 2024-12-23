// server/controllers/feedbackController.js
const Feedback = require('../models/feedback');
const mongoose=require('mongoose');

// Submit feedback on a template
exports.submitFeedback = async (req, res) => {
    try {

        let { templateId, comments, rating } = req.body;
        let userId = new mongoose.Types.ObjectId(req.user.userId); // Assuming user ID is set in re.user by the auth middleware


        

        if (!comments || rating === undefined) {
            return res.status(400).send("Comments and rating are required.");
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
        let { templateId } = req.params;
        templateId = new mongoose.Types.ObjectId(templateId);
        const feedback = await Feedback.find({ templateId }).select('userId').populate({
            path:"userId",
            select :"email username"
        }).select('comments rating');

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
        const feedback = await Feedback.find()
        .populate({
            path: "userId",
            select: "username"
        })
        .select("comments rating")
        .sort({ rating: -1 });

        res.json(feedback);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching feedback");
    }
};

