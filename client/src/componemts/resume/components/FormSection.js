import React, {useState } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { Link} from 'react-router-dom';

import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import PersonalDetail from './forms/PersonalDetail';

const FormSection = () => {

  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);  // Set initial state to false

  
  let nextClickHandler=()=>{
    setActiveFormIndex(activeFormIndex + 1);
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
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              <ArrowLeft />
            </button>
          )}

          {activeFormIndex < 5 && (

            <button 
              disabled={!enableNext}
              className="flex gap-2 cursor-pointer" 
              size="sm"
              onClick={() => nextClickHandler()
                 }>
              Next
              
              <ArrowRight />
            </button>

          )}
        </div>
        
      </div>

      {activeFormIndex === 1 ? (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summery enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ? (
        <Experience />
      ) : activeFormIndex === 4 ? (
        <Education />
      ) : activeFormIndex === 5 ? (
        <Skills />
      ) : null}

    </div>
  );
};

export default FormSection;
