import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { AtomSpinner } from 'react-epic-spinners'


import {setLoading} from '../redux/actions/loadingSetter';
import {unsetLoading} from '../redux/actions/loadingSetter';



const Feedback = () => {
  let dispatch =useDispatch();

  const [feedbacks, setFeedbacks] = useState([]);
  const loading =useSelector((state)=>state.loader.loading);

  const fetchFeedbacks = async () => {
    try {
dispatch(setLoading());
      const response = await axios.get("http://localhost:5000/feedback/"); // API call
      let allFeedback = response.data;
      setFeedbacks(allFeedback);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      dispatch(unsetLoading());
    }
  };

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

  if (loading) return (
        <div className="flex justify-center align-center items-center">
<AtomSpinner color="red"/>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        User Feedback
      </h2>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex space-x-4">
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
  );
};

export default Feedback;
