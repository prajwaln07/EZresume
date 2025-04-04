import React, { useState } from 'react';

const SuggestionsSymbol = ({ suggestions = [], missingKeywords = [] }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <>
      {/* Button to show/hide suggestions */}
      <div
        className="fixed top-24 right-[45%] bg-red-500 text-white rounded-full h-12 w-12 flex items-center justify-center cursor-pointer z-50 shadow-lg transition-transform hover:scale-105"
        onClick={() => setShowSuggestions(!showSuggestions)}
        title="View Suggestions"
      >
        !
      </div>

      {/* Suggestions box */}
      {showSuggestions && (
        <div className="fixed top-40 right-[43%] bg-white shadow-lg border rounded-md p-4 z-50 max-w-xs transition-all ease-in-out duration-300 transform scale-105">
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-bold mb-2 text-lg">Suggestions & Feedback</h4>
            {/* Close button */}
            <button
              onClick={() => setShowSuggestions(false)}
              className="text-red-500 hover:text-red-700"
              title="Close"
            >
              ✖
            </button>
          </div>
          
          {/* Suggestions list */}
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
              <p className="text-sm text-gray-500">No suggestions available.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SuggestionsSymbol;
