import React, {useState } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { Link} from 'react-router-dom';

import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import PersonalDetail from './forms/PersonalDetail';
import Project from './forms/Project';

const FormSection = () => {

  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);  // Set initial state to false

  
  let ClickHandler=(value)=>{
    if(value === 1)
     setActiveFormIndex(activeFormIndex -1);
    else
     setActiveFormIndex(activeFormIndex +1);

  }

  return (
    <div>
      <div className='flex justify-between items-center'>

        <div className='flex gap-5'>
          <Link to={"/"}>
            <button><Home /></button>
          </Link>
        </div>

        <div className='flex gap-2'>
          
          {activeFormIndex > 1 && (
            <button 
              size="sm" 
              className='cursor-pointer' 
              onClick={() => ClickHandler(1)}>
              <ArrowLeft />
            </button>
          )}

          {activeFormIndex < 6 && (

            <button 
              disabled={!enableNext}
              className="flex gap-2 cursor-pointer" 
              size="sm"
              onClick={ ()=> ClickHandler(0)
                 }>
              Next
              
              <ArrowRight />
            </button>

          )}
        </div>
        
      </div>

      {activeFormIndex === 1 ? (
        <PersonalDetail/>
      ) : activeFormIndex === 2 ? (
        <Summery/>
      ) : activeFormIndex === 3 ? (
        <Education />
      ) :activeFormIndex ===  4 ?(
        <Experience/>
      ) : activeFormIndex === 5 ? (
        <Project />
      ) : activeFormIndex === 6 ? (
        <Skills />
      ) : null}

    </div>
  );
};

export default FormSection;
