import React from 'react'
import Glitter from '../componemts/Glitter';  // Assuming this is a custom component
import { useSelector } from 'react-redux';  // To access Redux state


const HeroSection = () => {

      const isDarkmode = useSelector((state) => state.theme.isDarkmode);  // Get dark mode state
    

  return (
<div className="flex justify-center h-5/6">
        {/* Left div of image */}
        <div className="w-5/12 h-full flex justify-center items-center">
          <div className="h-96 w-96 rounded-sm hidden md:block">
            <img
              className="rounded-md"
              src="https://res.cloudinary.com/dkynwi65w/image/upload/v1734270622/freepik__candid-image-photography-natural-textures-highly-r__1868_volh1c.jpg"
              alt="Image"
            />
          </div>
        </div>

        {/* Right div with text */}
        <div className="flex justify-center items-center">
          <div className="w-7/12 h-full flex items-center flex-col justify-center space-y-4">
            <Glitter> Create Stunning Resumes in Minutes </Glitter>
            <p className={`text-lg ${isDarkmode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
              Build your professional profile with ease using customizable templates and powerful tools.
              Start your journey to a standout resume today!
            </p>
          </div>
        </div>
      </div>

  )
}

export default HeroSection