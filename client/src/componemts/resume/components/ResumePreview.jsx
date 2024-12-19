import React, { useContext, useRef } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';
import html2pdf from 'html2pdf.js';
import axios from 'axios';

const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const resumeRef = useRef();

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
     let response =await axios.post('https://ezresume.onrender.com/api/v1/downloads/track');

if(!response.success){
console.log("got some problem in trackign no of downloads");
}

    } 
    catch (error) {
      console.error('Error while tracking download:', error);
    }
  };

  return (
    <div>
      <div ref={resumeRef} className='shadow-lg h-full p-14 border-t-[20px] border-red-400'>
        {/* Personal Detail */}
        <PersonalDetailPreview resumeInfo={resumeInfo} />
        {/* Summery */}
        <SummeryPreview resumeInfo={resumeInfo} />
        {/* Professional Experience */}
        {resumeInfo?.experience?.length > 0 && <ExperiencePreview resumeInfo={resumeInfo} />}
        {/* Educational */}
        {resumeInfo?.education?.length > 0 && <EducationalPreview resumeInfo={resumeInfo} />}
        {/* Skills */}
        {resumeInfo?.skills?.length > 0 && <SkillsPreview resumeInfo={resumeInfo} />}
      </div>

      {/* Fixed Button at the Bottom of the Screen */}
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
