import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../redux/actions/loadingSetter";
import { unsetLoading } from "../redux/actions/loadingSetter";
import { useNavigate } from "react-router-dom";




const Feedback = () => {
  let dispatch = useDispatch();
  let navigate =useNavigate();

  const [feedbacks, setFeedbacks] = useState([]);
  const loading = useSelector((state) => state.loader.loading);
  const isAuthenticated =useSelector((state)=>state.user.isAuthenticated);

  const fetchFeedbacks = async () => {
    try {
      dispatch(setLoading());
      
      const response = await axios.get(
        "https://ezresume.onrender.com/api/v1/feedback/"
      ); // API call .....
      let allFeedback = response.data;
      setFeedbacks(allFeedback);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      dispatch(unsetLoading());
    }
  };

  const feedbackClickHandler=()=>{
    navigate("/feedback");
  }

  useEffect(() => {
    fetchFeedbacks();
  }, []);

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

  if (loading)
    return (
      <div className="flex justify-center items-center">
         <div className="flex flex-wrap justify-center items-start gap-4 p-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 dark:bg-gray-700 flex justify-center flex-col items-center rounded-lg shadow-md p-4 w-72 animate-pulse"
            >
              <div className="bg-gray-400 dark:bg-gray-600 rounded-md  w-5/12 h-3 mb-4"></div>
              <div className="bg-gray-400 dark:bg-gray-600 h-20 w-3/4 mb-2 mx-auto rounded"></div>
              <div className="bg-gray-400 dark:bg-gray-600 h-6 w-6/12 mb-2 mx-auto rounded"></div>


            </div>
          ))}
      </div>
      </div>
    );
    
  return (
<div className="bg-gray-50 dark:bg-gray-800 overflow-x-hidden flex flex-col justify-center items-center p-5">
  <div className="bg-gray-50 dark:bg-gray-800 p-6 overflow-x-hidden w-full max-w-6xl">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
      User Feedback
    </h2>
    {/* Scrollable Feedback Section */}
    <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700 p-4">
      {feedbacks.map((feedback) => (
        <div
          key={feedback.userId._id}
          className="bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-md rounded-lg p-4 w-72 flex-shrink-0"
        >
          <div className="mb-2">{renderStars(feedback.rating)}</div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {feedback.comments}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            - {feedback.userId.username}
          </p>
        </div>
      ))}
    </div>
  </div>

  {isAuthenticated && (
    <button
      className="px-6 rounded-full w-fit py-2 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white
        shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 
        focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 
        transition duration-200 animate-bounce-slow drop-shadow-2xl mt-4"
      onClick={feedbackClickHandler}
    >
      Add Feedback
    </button>
  )}
</div>


  );
};

export default Feedback;
