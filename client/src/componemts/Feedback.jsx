import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AtomSpinner } from "react-epic-spinners";

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
        <AtomSpinner color="red" />
      </div>
    );
    
  return (
    <div className="bg-gray-50 dark:bg-gray-800   overflow-x-hidden flex flex-col justify-center align-center items-center p-5">
      <div className="bg-gray-50 dark:bg-gray-800   p-6 overflow-x-hidden ">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          User Feedback
        </h2>
        <div className=" ml-[1650px]  overflow-x-scroll  no-scrollbar p-6 flex justify-center items-center align-middle">
          <div className=" overflow-x-auto flex justify-start space-x-4  p-2">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.userId._id}
                className="bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-md rounded-lg p-4 min-w-[300px] flex-shrink-0"
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
      </div>

{ isAuthenticated && 
      <button
  className="px-6 rounded-full w-fit py-2 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white
    shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 
    focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 
    transition duration-200 animate-bounce-slow   drop-shadow-2xl"
    
    onClick={feedbackClickHandler}

>
  Add Feedback
</button>}


    </div>
  );
};

export default Feedback;
