import React from 'react';
import { useSelector } from 'react-redux';
import { features } from './dummyDataOptionmodal';

const OptionModal = () => {
  const isDarkmode = useSelector((state) => state.theme.isDarkmode);

  return (
    <div className={`${isDarkmode ? 'bg-gray-900' : 'bg-white'} py-12 px-6`}>
      <div className="text-center mb-12">
        <h2 className={`${isDarkmode ? 'text-gray-400' : 'text-gray-500'} text-xl font-semibold`}>
          Design Your Dream Template
        </h2>
        <h1 className={`${isDarkmode ? 'text-white' : 'text-gray-800'} text-3xl font-bold mt-2`}>
          Unleash Your Creativity with Templates
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`${isDarkmode ? 'bg-gray-800' : 'bg-white'} flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md`}
          >
            <div className={`${isDarkmode ? 'text-yellow-500' : 'text-gray-900'} text-3xl mb-4`}>
              {feature.icon}
            </div>
            <h3 className={`${isDarkmode ? 'text-white' : 'text-gray-700'} text-lg font-semibold`}>
              {feature.title}
            </h3>
            <p className={`${isDarkmode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
              {feature.description}
            </p>
            <a
              href="#"
              className={`${isDarkmode ? 'text-blue-400' : 'text-blue-600'} font-medium mt-4 hover:underline`}
            >
              {feature.link}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OptionModal;
