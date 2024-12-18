import React, { useEffect, useState } from 'react'
// import PersonalDetail from './forms/PersonalDetail'
// import { Button } from '../../../../src/componemts/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import PersonalDetail from './forms/PersonalDetail';
import MyResume from './preview/MyResume';
// import PersonalDetail from './forms/PersonalDetail';
// import ThemeColor from './ThemeColor';

const FormSection = () => {

      
  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const [enableNext,setEnableNext]=useState(true);
  const {resumeId}=useParams();

useEffect(()=>{
console.log("activeFormIndex --->",activeFormIndex);
},[activeFormIndex])

  return (
    <div>
    {/* <PersonalDetail></PersonalDetail> */}

    <div className='flex justify-between items-center'>
          <div className='flex gap-5'>
            <Link to={"/"}>
          <button><Home/></button>
          </Link>
          
         
          </div>
          <div className='flex gap-2'>
            {activeFormIndex>1
            &&<button size="sm"   className='cursor-pointer'
            onClick={()=>setActiveFormIndex(activeFormIndex-1)}> <ArrowLeft/> </button> }

           { activeFormIndex <5 && <button 
            disabled={!enableNext}
            className="flex gap-2 cursor-pointer" size="sm"
            onClick={()=>setActiveFormIndex(activeFormIndex+1)}
            > Next 
            <ArrowRight/> </button>}
            
          </div>
        </div>

        {/* <PersonalDetail enabledNext={(v)=>setEnableNext(v)} ></PersonalDetail> */}

        {activeFormIndex==1?  
        <PersonalDetail enabledNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==2?
              <Summery  enabledNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==3?
          <Experience />  
          :activeFormIndex==4?
          <Education/>
          :activeFormIndex==5?
          <Skills/>
          :activeFormIndex==6?
          <MyResume />
        :null
          }
        

    </div>
  )
}

export default FormSection