import React, { useState } from "react";
import axios from "axios";
import apiConfig from "../api/apiConfig";


const FeedbackForm = ({ templateId, onFeedbackSubmitted }) => {
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comments || rating === 0) {
      setError("Comments and rating are required.");
      return;
    }

    setError(""); // Clear any previous errors

    try {


      const response = await axios.post(
        apiConfig.feedback.create,
        { templateId, comments, rating },
        { withCredentials: true }
      );

      
      setSuccessMessage("Feedback submitted successfully!");
      setComments("");
      setRating(0);
      onFeedbackSubmitted?.(response.data); // Notify parent component if needed
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl transform transition-all hover:scale-105"
      >
        <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-6 text-center">
          Submit Your Feedback
        </h2>

        {/* Comments */}
        <div className="mb-6">
          <label className="block text-gray-600 dark:text-gray-300 font-medium mb-2">
            Your Comments
          </label>
          <textarea
            className="w-full p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600 resize-none transition"
            rows="4"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Write your feedback here..."
          ></textarea>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-gray-600 dark:text-gray-300 font-medium mb-2">
            Rating
          </label>
          <select
            className="w-full p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="0">Select a rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4 text-center">{successMessage}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg hover:opacity-90 focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 transition-all text-lg font-semibold"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
