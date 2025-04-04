import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import FormSection from './components/FormSection';
import ResumePreview from './components/ResumePreview';
import { ResumeInfoContext } from '../../../src/context/ResumeInfoContext';
import dummy from './components/data'; // You can replace this with dynamic data later
import { setLightTheme } from '../../redux/actions/themeAction';
import apiConfig from '../../api/apiConfig'; 
import SuggestionsSymbol from '../SuggestionsSymbol';



const IndexOne = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [resumeInfo, setResumeInfo] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);


  useEffect(() => {
    setResumeInfo(dummy);
  }, []);


  useEffect(() => {
    // in dark mode this page looks so cringe so i have allowed only light mode here...
    if (location.pathname === '/resume/maker') {
      dispatch(setLightTheme());
    }
  }, [location.pathname]);
  

  useEffect(() => {
    // Update resumeInfo and fetch suggestions when it changes
    if (resumeInfo) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.post(
            apiConfig.resumes.suggestion, // Use the API configuration for the endpoint
            { text: resumeInfo }, // Send the updated resume info
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
      
          const fetchedSuggestions = response.data.errors.filter(
            (item) => item.suggestions && item.suggestions.length > 1
          );
      
          setSuggestions(fetchedSuggestions);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      };

      fetchSuggestions();
    }
  }, [resumeInfo]);


  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10 mb-20 relative">
        <FormSection />
        <ResumePreview />

        {(suggestions.length > 0 || missingKeywords.length > 0) && (
          <SuggestionsSymbol
            suggestions={suggestions}
            missingKeywords={missingKeywords}
          />
        )}

      </div>
    </ResumeInfoContext.Provider>
  );
};

export default IndexOne;