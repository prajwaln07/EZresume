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


const SuggestionsSymbol = ({ suggestions, readabilityScore, missingKeywords }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  return (
    <>
      <div
        className="fixed top-24 right-[45%] bg-red-500 text-white rounded-full h-12 w-12 flex items-center justify-center cursor-pointer z-50 shadow-lg transition-transform hover:scale-105"
        onClick={() => setShowSuggestions(!showSuggestions)}
        title="View Suggestions"
      >
        !
      </div>
      {showSuggestions && (
        <div className="fixed top-40 right-[43%] bg-white shadow-lg border rounded-md p-4 z-50 max-w-xs transition-all ease-in-out duration-300 transform scale-105">
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-bold mb-2 text-lg">Suggestions & Feedback</h4>
            <button
              onClick={() => setShowSuggestions(false)}
              className="text-red-500 hover:text-red-700"
              title="Close"
            >
              ✖
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto px-2 py-2">
            {suggestions.length > 0 ? (
              suggestions.map((item, index) => (
                <div key={index} className="mb-3 p-2 rounded-lg hover:bg-gray-100">
                  <p>
                    <span className="font-bold text-red-500">{item.word}:</span>{' '}
                    {item.suggestions.join(', ')}
                  </p>
                  <p className="text-sm text-gray-500">{item.message}</p>
                </div>
              ))
            ) : (
              <p>No suggestions found!</p>
            )}
            {missingKeywords.length > 0 && (
              <div className="mt-3 p-2 rounded-lg bg-yellow-100">
                <p className="font-semibold">Keyword Optimization:</p>
                <p>Consider adding these keywords: {missingKeywords.join(', ')}</p>
              </div>
            )}
            {readabilityScore && (
              <div className="mt-3 p-2 rounded-lg bg-blue-100">
                <p className="font-semibold">Readability Score:</p>
                <p>Flesch-Kincaid Score: {readabilityScore}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const IndexOne = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [resumeInfo, setResumeInfo] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [readabilityScore, setReadabilityScore] = useState(null);
  const [missingKeywords, setMissingKeywords] = useState([]);
  useEffect(() => {
    // If you're on the "/resume/maker" route, set to light mode
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
          setReadabilityScore(response.data.readabilityScore);
          setMissingKeywords(response.data.missingKeywords || []);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      };

      fetchSuggestions();
    }
  }, [resumeInfo]);

  useEffect(() => {
    // Initially set resumeInfo to dummy data or from other sources
    setResumeInfo(dummy);
  }, []);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10 mb-20 relative">
        <FormSection />
        <ResumePreview />
        <SuggestionsSymbol
          suggestions={suggestions}
          readabilityScore={readabilityScore}
          missingKeywords={missingKeywords}
        />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default IndexOne;