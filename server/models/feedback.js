const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user giving feedback
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template' }, // Reference to the template being reviewed (if applicable)
  comments: { type: String, required: true, maxLength: 500 }, // Textual feedback from the user
  rating: { type: Number, required: true, min: 1, max: 5 }, // Numerical rating, typically on a 1–5 scale
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the feedback was submitted.
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
