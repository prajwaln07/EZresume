import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { features } from './dummyDataOptionmodal';

const FeatureCards = () => {
  const isDarkmode = useSelector((state) => state.theme.isDarkmode);

  return (
    <div className={`py-16 ${isDarkmode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold ${isDarkmode ? 'text-white' : 'text-gray-900'} sm:text-4xl`}>
            Powerful Resume Features
          </h2>
          <p className={`mt-4 text-lg ${isDarkmode ? 'text-gray-400' : 'text-gray-600'}`}>
            Everything you need to create a standout professional resume
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group relative overflow-hidden rounded-2xl p-6 ${
                isDarkmode 
                  ? 'bg-gray-800 hover:bg-gray-800/80' 
                  : 'bg-white hover:bg-gray-50'
              } shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
            >
              {/* Decorative element - top right corner gradient */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-50 blur-xl bg-gradient-to-br from-indigo-500 to-purple-500 transition-opacity duration-300 group-hover:opacity-70"></div>
              
              {/* Icon with animated background */}
              <div className="relative mb-5">
                <div className="absolute inset-0 rounded-full bg-indigo-500/10 transform scale-[1.8] transition-transform duration-300 group-hover:scale-[2.2]"></div>
                <div className={`relative z-10 flex items-center justify-center w-14 h-14 text-2xl rounded-full ${
                  isDarkmode ? 'bg-indigo-900/50' : 'bg-indigo-100'
                } ${
                  isDarkmode ? 'text-indigo-300' : 'text-indigo-600'
                } transition-colors duration-300 group-hover:text-indigo-500`}>
                  {feature.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className={`text-xl font-bold mb-2 ${isDarkmode ? 'text-white' : 'text-gray-900'} group-hover:text-indigo-500 transition-colors duration-300`}>
                {feature.title}
              </h3>
              <p className={`mb-4 ${isDarkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                {feature.description}
              </p>
              
              {/* Link with underline animation */}
              <Link 
                to={feature.to}
                className={`group-hover:text-indigo-500 inline-flex items-center text-sm font-medium ${
                  isDarkmode ? 'text-indigo-400' : 'text-indigo-600'
                } transition-colors duration-300`}
              >
                {feature.link}
                <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="block absolute bottom-0 left-0 w-full h-0.5 -mb-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-indigo-500"></span>
              </Link>
              
              {/* Subtle corner accent */}
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
                <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-indigo-500 transform translate-x-2 translate-y-2 rounded-tr-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards; 