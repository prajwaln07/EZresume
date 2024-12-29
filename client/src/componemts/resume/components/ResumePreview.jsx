import React, { useContext, useRef } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import ResumeContent from '../components/preview/resumeContent/ResumeContentOne';
import ModernResumeTemplate from '../components/preview/resumeContent/ModernResumeTemplate';
import ClassicTemplate from './preview/resumeContent/ClassicTemplate';
import MicrosoftTemplate from './preview/resumeContent/MicrosoftTemplate';
import NextGenTemplate from './preview/resumeContent/NextGenTemplate';
import SimpleTemplate from './preview/resumeContent/SimpleTemplate';

import html2pdf from 'html2pdf.js';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const resumeRef = useRef();
  
  // State to track the selected template
  let selectedTemplate= useSelector((state)=>state.template.selectedTemplate);  // default is 'classic'

  // Function to download the resume as PDF
  const downloadResume = async () => {
    const element = resumeRef.current;

    const options = {
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    // Generate and download the PDF
    html2pdf().from(element).set(options).save();

    // Track the download via API
    try {
      const response = await axios.post('https://ezresume.onrender.com/api/v1/downloads/track');

      if (!response.success) {
        console.log('Error tracking download.');
      }
    } catch (error) {
      console.error('Error while tracking download:', error);
    }
  };

 
  // Function to render the selected template
  const renderTemplate = () => {
    switch (selectedTemplate) { //ClassicLayout
      case 'ModernLayout':
        return <ModernResumeTemplate resumeInfo={resumeInfo} resumeRef={resumeRef} />;
      case 'ClassicLayout':
        return <ClassicTemplate resumeInfo={resumeInfo} resumeRef={resumeRef} />;
      case 'ElegantLayout':
        return <ResumeContent resumeInfo={resumeInfo} resumeRef={resumeRef} />;
      
      case 'ProfessionalLayout':
        return <MicrosoftTemplate resumeInfo={resumeInfo} resumeRef={resumeRef}></MicrosoftTemplate>;

        case 'NextGenLayout':
        return <NextGenTemplate resumeInfo={resumeInfo} resumeRef={resumeRef}></NextGenTemplate>;

        case 'SimpleLayout':
        return <SimpleTemplate resumeInfo={resumeInfo} resumeRef={resumeRef}></SimpleTemplate>;


      default:
        return <SimpleTemplate resumeInfo={resumeInfo} resumeRef={resumeRef} />;
    }
  };

  return (
    <div>


      {renderTemplate()}

      {/* Download Button */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={downloadResume}
          className="bg-blue-500 text-white p-4 rounded shadow-md hover:bg-blue-600"
        >
          Download Resume (PDF)
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;
