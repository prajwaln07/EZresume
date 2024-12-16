import React from 'react';
import { useSelector } from 'react-redux';

const ResumeStep = ({ direction, numberCnt, imageLink, title, desc }) => {
  const isDarkmode = useSelector((state) => state.theme.isDarkmode); // Get dark mode state

  return (
    <div
      className={`flex flex-col ${direction ? "lg:flex-row-reverse" : "lg:flex-row"} items-center p-8 ${
        isDarkmode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Left Section */}
      <div className="flex flex-col items-center text-left lg:w-1/2 p-6">
        <div className="flex items-center mb-4">
          <div className="text-white bg-teal-500 rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold">
            {numberCnt}
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className={`text-gray-700 ${isDarkmode ? "text-gray-50" : "text-gray-700"}`}>
  {desc}
</p>

      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 flex justify-center p-6 w-96 h-96 mr-10">
        <img
          src={imageLink}
          alt="Resume Step Illustration"
          className="rounded-md shadow-lg"
        />
      </div>
    </div>
  );
};

export default ResumeStep;
