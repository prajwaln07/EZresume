import React from 'react';
import { useSelector } from 'react-redux';  // To access Redux state
import OptionModal from '../OptionModal';
import HeroSection from '../HeroSection';
import ResumeStep from '../ResumeStep';
import FAQPage from '../FAQ';
import Footer from '../Footer';
import Feedback from '../Feedback';

const HomePage = () => {
  const isDarkmode = useSelector((state) => state.theme.isDarkmode);  // Get dark mode state

  return (
    <div className={`text-center h-screen ${isDarkmode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
     
<HeroSection></HeroSection>

<OptionModal className ="mx-10"></OptionModal>

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
<ResumeStep direction={false}  title ={"Pick a Template"} desc ={"Choose from a variety of professionally designed templates to kickstart your resume."} numberCnt={1}  imageLink={"https://res.cloudinary.com/dkynwi65w/image/upload/v1734285813/tempLateSelection_gbewij.jpg"}></ResumeStep>

<ResumeStep direction={true} numberCnt={2}   title ={"Edit Template"} desc ={"Customize your selected template with your personal details and career information."}  imageLink={"https://res.cloudinary.com/dkynwi65w/image/upload/v1734285820/templateEditing_rawaxw.jpg"}></ResumeStep>


<ResumeStep direction={false} numberCnt={3}   title ={"Build a Resume"} desc ={"Fill in your work experience, education, and skills to craft a standout resume."}  imageLink ={"https://res.cloudinary.com/dkynwi65w/image/upload/v1734285807/resumeCreating_bsjyyu.jpg"} ></ResumeStep>


<ResumeStep direction={true} numberCnt={4}   title ={"Download Resume"} desc ={"Download your completed resume in a PDF format, ready for job applications."}  imageLink={"https://res.cloudinary.com/dkynwi65w/image/upload/v1734285800/dowload_ywsvq9.jpg"}></ResumeStep>

<Feedback></Feedback>

<FAQPage></FAQPage>

<Footer></Footer>

    </div>
  );
};

export default HomePage;
 