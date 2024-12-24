import React from 'react';
import { useSelector } from 'react-redux';  // To access Redux state
import OptionModal from '../OptionModal';
import HeroSection from '../HeroSection';
import FAQPage from '../FAQ';
import Footer from '../Footer';
import Feedback from '../Feedback';
import ResumeSteps from '../ResumeSteps';


const HomePage = () => {
  const isDarkmode = useSelector((state) => state.theme.isDarkmode);  // Get dark mode state

  return (
    <div className={`text-center h-screen ${isDarkmode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
     
<HeroSection></HeroSection>

<OptionModal ></OptionModal>

<div
      className={`text-center py-12 px-6 ${
        isDarkmode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <h1 className="text-4xl font-bold mb-4">
        Craft Your Perfect Resume in 4 Simple Steps
      </h1>
      <p className="text-lg">
        Follow these intuitive steps to design, edit, and finalize a standout
        resume effortlessly. Your dream job starts here!
      </p>
    </div>

<ResumeSteps></ResumeSteps>

<Feedback></Feedback>

<FAQPage></FAQPage>

<Footer></Footer>

    </div>
  );
};

export default HomePage;
 