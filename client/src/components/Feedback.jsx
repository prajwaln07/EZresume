import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "../redux/actions/loadingSetter";
import { useNavigate } from "react-router-dom";
import apiConfig from "../api/apiConfig";

const Feedback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const [feedbacks, setFeedbacks] = useState([]);
  const loading = useSelector((state) => state.loader.loading);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [page, setPage] = useState(1);
  const [totalPages,setTotalPages]=useState(10);
  const limit = 4;

  const fetchFeedbacks = async (pageNo) => {
    try {
      dispatch(setLoading());
      const response = await axios.get(apiConfig.feedback.getAll(pageNo, limit));
      setFeedbacks(response.data.feedback);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      dispatch(unsetLoading());
    }
  };

  useEffect(() => {
    fetchFeedbacks(page);
  }, [page]);


  const feedbackClickHandler = () => {
    navigate("/feedback");
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 flex flex-col justify-center items-center p-5">
      <div className="bg-gray-50 dark:bg-gray-800 p-6 w-full max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          User Feedback
        </h2>
        <div ref={carouselRef} className="flex overflow-x-auto space-x-4 scrollbar-hide p-4">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 dark:bg-gray-700 flex flex-col items-center rounded-lg shadow-md p-4 w-72 animate-pulse"
                  >
                    <div className="bg-gray-400 dark:bg-gray-600 rounded-md w-5/12 h-3 mb-4"></div>
                    <div className="bg-gray-400 dark:bg-gray-600 h-20 w-3/4 mb-2 mx-auto rounded"></div>
                    <div className="bg-gray-400 dark:bg-gray-600 h-6 w-6/12 mb-2 mx-auto rounded"></div>
                  </div>
                ))
            : feedbacks.map((feedback, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-md rounded-lg p-4 w-72 flex-shrink-0"
                >
                  <div className="mb-2">{renderStars(feedback.rating)}</div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{feedback.comments}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    - {feedback.userId?.username || "Anonymous"}
                  </p>
                </div>
              ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 mx-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-md"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 mx-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-md"
          >
            Next
          </button>
        </div>
      </div>

      {isAuthenticated && (
        <button
          className="px-6 mt-6 rounded-full w-fit py-2 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 transition duration-200 animate-bounce-slow drop-shadow-2xl"
          onClick={feedbackClickHandler}
        >
          Add Feedback
        </button>
      )}
    </div>
  );
};

export default Feedback;
