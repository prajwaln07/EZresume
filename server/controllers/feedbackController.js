// server/controllers/feedbackController.js
const Feedback = require('../models/feedback');
const mongoose = require('mongoose');

// Submit feedback on a template
exports.submitFeedback = async (req, res) => {
    try {
        let { templateId, comments, rating } = req.body;
        let userId = new mongoose.Types.ObjectId(req.user.userId); // as we are coming to this controller through our middleware of authecation so we have req.user.userId

        if (!comments || !rating) {
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

        const feedback = await Feedback.findById({ templateId })
            .populate({
                path: "userId",
                select: "email username",
            })
            .select("comments rating");

            if (!feedback.length) 
            return res.status(404).send("No feedback found for this template");

            res.json(feedback);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching feedback");
    }
};

exports.getAllFeedback = async (req, res) => {
    try {
        const { page = 1, limit = 4 } = req.query;
        const skip = (page - 1) * limit;

        // Fetch total count of feedback for pagination
        const totalFeedback = await Feedback.countDocuments();

        // Fetch feedback data with pagination and populate user details
        const feedback = await Feedback.find()
            .populate({
                path: "userId",
                select: "username",
            })
            .select("comments rating")
            .sort({ rating: -1, _id: 1  })
            .skip(skip)
            .limit(parseInt(limit));

        const totalPages = Math.ceil(totalFeedback / limit);

        res.json({
            feedback,
            totalPages,
            currentPage: parseInt(page),
        });
    } catch (err) {
        console.error("Error fetching feedback:", err.message);
        res.status(500).json({ error: "Error fetching feedback" });
    }
};


exports.getOverallAverageRating = async (req, res) => {
    try {
        const result = await Feedback.aggregate([
            { 
                $group:{ 
                    _id: null,
                    averageRating: { $avg: "$rating" }
                 } 
            },
        ]);

        if (!result.length) {
            return res.status(404).send("No feedback found");
        }

        res.json({ averageRating: result[0].averageRating.toFixed(2) });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error calculating overall average rating");
    }
};
