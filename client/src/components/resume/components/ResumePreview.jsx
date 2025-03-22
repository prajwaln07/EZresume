import React, { useContext, useRef, useState, useEffect } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import { useSelector } from 'react-redux';
import html2pdf from 'html2pdf.js';
import axios from 'axios';
import apiConfig from '../../../api/apiConfig';

import ModernResumeTemplate from './preview/resumeContent/ModernResumeTemplate';
import ClassicTemplate from './preview/resumeContent/ClassicTemplate';
import ResumeContent from '../components/preview/resumeContent/ResumeContentOne';
import MicrosoftTemplate from './preview/resumeContent/MicrosoftTemplate';
import NextGenTemplate from './preview/resumeContent/NextGenTemplate';
import SimpleTemplate from './preview/resumeContent/SimpleTemplate';
import BoldResumeTemplate from './preview/resumeContent/BoldResumeTemplate';
import PrimeProfileTemplate from './preview/resumeContent/PrimeProfileTemplate';
import GradTemplate from './preview/resumeContent/Customizable/ProfessionalResume';
import ArtisticTemplate from './preview/resumeContent/Customizable/ArtisticTemplate';

const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const resumeRef = useRef();
  const [loading, setLoading] = useState(false);
  const [retryAfter, setRetryAfter] = useState(null); // Time (in seconds) before retry is allowed
  const [retryTimer, setRetryTimer] = useState(null); // Timer countdown for retry
  const templateId = useSelector((state) => state.template.selectedTemplateID);

  const selectedTemplate = useSelector((state) => state.template.selectedTemplate);

  // Countdown effect for retryAfter
  useEffect(() => {
    if (retryAfter > 0) {
      setRetryTimer(retryAfter);
      const interval = setInterval(() => {
        setRetryTimer((prev) => {
          if (prev > 1) return prev - 1;
          clearInterval(interval);
          setRetryAfter(null); // Enable button after countdown
          return null;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [retryAfter]);

  const downloadResume = async () => {
    if (retryAfter) return; // Prevent clicking when retry is active
    setLoading(true);
    setRetryAfter(null); // Reset retry message
    const element = resumeRef.current;

    element.style.width = '8.5in'; // Match PDF size
    element.style.boxSizing = 'border-box';
    element.style.overflow = 'hidden';

    const options = {
      filename: 'EZresume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 4, 
        useCORS: true,
        logging: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
      },
      jsPDF: {
        unit: 'in',
        format: [8.5, 11], 
        orientation: 'portrait',
      },
    };

    try {
      // Generate PDF
      await html2pdf().from(element).set(options).save();

      // Track download
      const response = await axios.post(
        apiConfig.downloads.track,
        { templateId },
        { withCredentials: true }
      );

      if (!response.data.success) {
        console.error('Error tracking download.');
      }
    } catch (error) {
      if (error.response?.status === 429) {
        const retrySeconds = parseInt(error.response.headers["retry-after"], 10) || 60; // Default to 60 sec
        setRetryAfter(retrySeconds);
      } else {
        console.error('Error while generating PDF or tracking download:', error);
      }
    } finally {
      element.style.width = ''; // Reset styles
      element.style.boxSizing = '';
      setLoading(false);
    }
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
    CustomLayout: GradTemplate,
    ArtisticLayout: ArtisticTemplate,
  };

  const TemplateComponent = templates[selectedTemplate] || ArtisticTemplate;

  return (
    <div>
      <TemplateComponent resumeInfo={resumeInfo} resumeRef={resumeRef} />

      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <button
          onClick={downloadResume}
          disabled={loading || retryAfter !== null} // Disable when retry is active
          className={`bg-blue-500 text-white p-4 rounded shadow-md hover:bg-blue-600 ${
            loading || retryAfter !== null ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Download Resume as PDF"
        >
          {loading ? 'Downloading...' : 'Download Resume (PDF)'}
        </button>

        {retryAfter && (
          <p className="text-red-500 mt-2">
            Too many requests! Try again in {retryTimer} seconds.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
