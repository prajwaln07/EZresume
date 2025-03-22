import React, { useState, useRef, useEffect } from 'react'
import Glitter from '../components/Glitter';
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const isDarkmode = useSelector((state) => state.theme.isDarkmode);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  // Handle mouse move for smooth 3D effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (0-1)
    const xFactor = (e.clientX - centerX) / (rect.width / 2);
    const yFactor = (e.clientY - centerY) / (rect.height / 2);
    
    // Limit rotation to avoid extreme angles (max 5 degrees)
    const maxRotation = 5;
    setRotation({
      x: -yFactor * maxRotation, // Reverse Y for natural tilt
      y: xFactor * maxRotation
    });
  };

  // Add pointer events to document to capture mouse movements outside element
  useEffect(() => {
    if (isHovering) {
      document.addEventListener('pointermove', handleMouseMove);
      document.addEventListener('pointerleave', handleMouseLeave);
    }
    
    return () => {
      document.removeEventListener('pointermove', handleMouseMove);
      document.removeEventListener('pointerleave', handleMouseLeave);
    };
  }, [isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Smoothly reset rotation
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className={`relative flex justify-center h-5/6 overflow-hidden ${isDarkmode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background circles */}
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full ${isDarkmode ? 'bg-indigo-900/10' : 'bg-indigo-200/30'}`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full ${isDarkmode ? 'bg-purple-900/10' : 'bg-purple-200/30'}`}></div>
        
        {/* Background diagonal lines */}
        <div className={`absolute top-0 left-0 w-full h-full opacity-5 ${isDarkmode ? 'border-gray-400' : 'border-gray-700'}`}
             style={{ 
               backgroundImage: `repeating-linear-gradient(45deg, currentColor, currentColor 1px, transparent 1px, transparent 10px)`,
               backgroundSize: '30px 30px'
             }}>
        </div>
      </div>

      {/* Main content */}
      <div className="flex justify-center items-center z-10 w-full max-w-7xl px-4">
        {/* Left div of image with JS-controlled 3D effect */}
        <div className="w-5/12 h-full flex justify-center items-center">
          <div 
            ref={containerRef}
            className="relative h-96 w-96 rounded-sm hidden md:block perspective-1000"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="transform-gpu h-full w-full transition-transform duration-300 ease-out"
              style={{ 
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovering ? 1.02 : 1})`,
              }}
            >
              {/* Shadow element that moves with rotation */}
              <div 
                className={`absolute -inset-1 ${isDarkmode ? 'bg-indigo-600' : 'bg-indigo-500'} opacity-15 rounded-lg blur transform-gpu transition-transform duration-300 ease-out`}
                style={{ 
                  transform: `translateX(${isHovering ? rotation.y/2 : 0}px) translateY(${isHovering ? rotation.x/2 : 0}px)` 
                }}
              ></div>
              
              <img
                className="rounded-md h-full w-full object-cover shadow-md will-change-transform"
                src="https://res.cloudinary.com/dkynwi65w/image/upload/v1734270622/freepik__candid-image-photography-natural-textures-highly-r__1868_volh1c.jpg"
                alt="Resume preview"
              />
              
              {/* Shine effect */}
              <div 
                className={`absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white to-transparent transition-opacity duration-300 ease-in-out`}
                style={{
                  opacity: isHovering ? 0.1 : 0,
                  transform: `translateX(${isHovering ? '0%' : '-100%'})`,
                  transition: 'opacity 300ms ease-out, transform 600ms ease-out'
                }}
              ></div>
            </div>
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
            
            <button className={`mt-4 px-6 py-3 rounded-md ${isDarkmode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white font-medium transition-colors duration-200 transform hover:scale-105`}>
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection