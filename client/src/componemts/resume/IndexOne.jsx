import React from 'react'
import FormSection from './components/FormSection'
import ResumePreview from './components/ResumePreview'
import { ResumeInfoContext } from '../../../src/context/ResumeInfoContext';
import { useEffect,useState } from 'react';
import dummy from './components/data';


const IndexOne = () => {

const [resumeInfo,setResumeInfo]=useState(null);

useEffect(()=>{
    setResumeInfo(dummy)
},[])

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>

    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>

        <FormSection></FormSection>
        <ResumePreview></ResumePreview>


    </div>
    </ResumeInfoContext.Provider>
  )
}

export default IndexOne