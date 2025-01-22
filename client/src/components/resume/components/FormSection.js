import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import PersonalDetail from './forms/PersonalDetail';
import Project from './forms/Project';

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);

  const progressPercentages = [0, 10, 25, 50, 75, 90, 100]; // Define logical percentages for each section
  const sectionTitles = [
    "Personal Details",
    "Summary",
    "Education",
    "Experience",
    "Projects",
    "Skills",
  ];

  const ClickHandler = (value) => {
    if (value === 1) setActiveFormIndex(activeFormIndex - 1);
    else setActiveFormIndex(activeFormIndex + 1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-5">
          <Link to={"/"}>
            <button className="text-gray-700 hover:text-blue-600">
              <Home />
            </button>
          </Link>
        </div>

        <div className="flex-1 mx-4">
          {/* Professional Progress Bar */}
          <div className="relative w-full h-3 bg-gray-300 rounded-full shadow-sm">
            <div
              className="absolute top-0 left-0 h-3 bg-blue-700 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercentages[activeFormIndex]}%` }}
            ></div>
            {/* Markers */}
            <div className="absolute inset-0 flex justify-between items-center px-1">
              {progressPercentages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index + 1 <= activeFormIndex
                      ? "bg-blue-700"
                      : "bg-gray-400"
                  }`}
                ></div>
              ))}
            </div>
          </div>
          {/* Section Title */}
          <div className="text-center text-sm font-semibold mt-2 text-gray-800">
            {sectionTitles[activeFormIndex - 1]}
          </div>
        </div>

        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <button
              size="sm"
              className="cursor-pointer text-gray-700 hover:text-blue-600"
              onClick={() => ClickHandler(1)}
            >
              <ArrowLeft />
            </button>
          )}

          {activeFormIndex < 6 && (
            <button
              disabled={!enableNext}
              className="flex gap-2 cursor-pointer text-gray-700 hover:text-blue-600"
              size="sm"
              onClick={() => ClickHandler(0)}
            >
              Next
              <ArrowRight />
            </button>
          )}
        </div>
      </div>

      {/* Forms Rendering */}
      {activeFormIndex === 1 ? (
        <PersonalDetail />
      ) : activeFormIndex === 2 ? (
        <Summery />
      ) : activeFormIndex === 3 ? (
        <Education />
      ) : activeFormIndex === 4 ? (
        <Experience />
      ) : activeFormIndex === 5 ? (
        <Project />
      ) : activeFormIndex === 6 ? (
        <Skills />
      ) : null}
    </div>
  );
};

export default FormSection;
