import React from 'react';
import Glitter from '../components/Glitter';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
  const isDarkmode = useSelector((state) => state.theme.isDarkmode);

  return (
    <div className={`relative flex justify-center h-5/6 overflow-hidden ${isDarkmode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background circles */}
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full ${isDarkmode ? 'bg-indigo-900/10' : 'bg-indigo-200/30'}`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full ${isDarkmode ? 'bg-purple-900/10' : 'bg-purple-200/30'}`}></div>

        {/* Background diagonal lines */}
        <div
          className={`absolute top-0 left-0 w-full h-full opacity-5 ${isDarkmode ? 'border-gray-400' : 'border-gray-700'}`}
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, currentColor, currentColor 1px, transparent 1px, transparent 10px)`,
            backgroundSize: '30px 30px',
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="flex justify-center items-center z-10 w-full max-w-7xl px-4">
        {/* Left div of image */}
        <div className="w-5/12 h-full flex justify-center items-center">
          <div className="relative h-96 w-96 rounded-sm hidden md:block">
            <img
              className="rounded-md h-full w-full object-cover shadow-md"
              src="https://res.cloudinary.com/dkynwi65w/image/upload/v1734270622/freepik__candid-image-photography-natural-textures-highly-r__1868_volh1c.jpg"
              alt="Resume preview"
            />
          </div>
        </div>

        {/* Right div with text */}
        <div className="flex justify-center items-center">
          <div className="w-7/12 h-full flex items-center flex-col justify-center space-y-6">
            <h1 className={`text-3xl md:text-4xl font-bold text-center ${isDarkmode ? 'text-white' : 'text-gray-800'}`}>
              <Glitter>Create Stunning Resumes in Minutes</Glitter>
            </h1>

            <p className={`text-lg ${isDarkmode ? 'text-gray-300' : 'text-gray-700'} font-medium text-center max-w-xl`}>
              Build your professional profile with ease using customizable templates and powerful tools.
              Start your journey to a standout resume today!
            </p>

            <NavLink
              to="/templates"
              className={`mt-4 px-6 py-3 rounded-md ${isDarkmode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white font-medium transition-colors duration-200 transform hover:scale-105`}
            >
              Get Started Free
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
