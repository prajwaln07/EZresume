import React from 'react'
import FormSection from './components/FormSection'
import ResumePreview from './components/ResumePreview'
import { ResumeInfoContext } from '../../../src/context/ResumeInfoContext';
import { useEffect,useState } from 'react';
import dummy from './components/data';
import { useLocation } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { setLightTheme } from '../../redux/actions/themeAction';


const IndexOne = () => {
let dispatch =useDispatch();
  const location = useLocation();

  useEffect(() => {
    // If you're on the "/resume/maker" route, set to light mode
    if (location.pathname === '/resume/maker') {
      dispatch(setLightTheme());
    } 
  }, [location.pathname]);


const [resumeInfo,setResumeInfo]=useState(null);

useEffect(()=>{
    setResumeInfo(dummy)
},[])

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>

    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10 mb-20'>

        <FormSection></FormSection>
        <ResumePreview></ResumePreview>


    </div>
    </ResumeInfoContext.Provider>
  )
}

export default IndexOne