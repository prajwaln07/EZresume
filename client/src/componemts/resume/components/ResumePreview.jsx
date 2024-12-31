import React, { useContext, useRef, useState } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import { useSelector } from 'react-redux';
import html2pdf from 'html2pdf.js';
import axios from 'axios';

import ModernResumeTemplate from '../components/preview/resumeContent/ModernResumeTemplate';
import ClassicTemplate from './preview/resumeContent/ClassicTemplate';
import ResumeContent from '../components/preview/resumeContent/ResumeContentOne';
import MicrosoftTemplate from './preview/resumeContent/MicrosoftTemplate';
import NextGenTemplate from './preview/resumeContent/NextGenTemplate';
import SimpleTemplate from './preview/resumeContent/SimpleTemplate';
import BoldResumeTemplate from './preview/resumeContent/BoldResumeTemplate';
import PrimeProfileTemplate from './preview/resumeContent/PrimeProfileTemplate';

const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const resumeRef = useRef();
  const [loading, setLoading] = useState(false);

  const selectedTemplate = useSelector((state) => state.template.selectedTemplate);

  const downloadResume = async () => {
    setLoading(true);
    const element = resumeRef.current;
  
    // Clean styles to prevent extra padding/margin
    element.style.padding = '0';
    element.style.margin = '0';
    element.style.boxSizing = 'border-box';
    element.style.overflow = 'hidden'; // Prevent content overflow
  
    const options = {
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2, // Adjust for better quality
        useCORS: true,
        logging: true, // Debugging option to see rendering details
        width: element.offsetWidth, // Ensure the width of the canvas matches the element
        height: element.offsetHeight, // Set height based on content size
      },
      jsPDF: {
        unit: 'in',
        format: [8.5, 11], // Standard letter size
        orientation: 'portrait',
        compress: true,
        putOnlyUsedFonts: true,
      },
    };
  
    try {
      // Generate and download the PDF
      await html2pdf().from(element).set(options).save();
      const response = await axios.post('https://ezresume.onrender.com/api/v1/downloads/track');
      if (!response.data.success) {
        console.error('Error tracking download.');
      }
    } catch (error) {
      console.error('Error while generating PDF or tracking download:', error);
    } finally {
      setLoading(false);
    }
  
    // Restore original styles after download
    element.style.padding = '';
    element.style.margin = '';
    element.style.boxSizing = '';
    element.style.overflow = '';
  };
  

  const templates = {
    ModernLayout: ModernResumeTemplate,
    ClassicLayout: ClassicTemplate,
    ElegantLayout: ResumeContent,
    ProfessionalLayout: MicrosoftTemplate,
    NextGenLayout: NextGenTemplate,
    SimpleLayout: SimpleTemplate,
    BoldLayout: BoldResumeTemplate,
    PrimeLayout: PrimeProfileTemplate,
  };

  const TemplateComponent = templates[selectedTemplate] || PrimeProfileTemplate;

  return (
    <div>
      <TemplateComponent resumeInfo={resumeInfo} resumeRef={resumeRef} />
      
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={downloadResume}
          disabled={loading}
          className={`bg-blue-500 text-white p-4 rounded shadow-md hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Download Resume as PDF"
        >
          {loading ? 'Downloading...' : 'Download Resume (PDF)'}
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;
