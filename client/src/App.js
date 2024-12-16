import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from './componemts/navbar/Navbar';
import {Router,Routes,Route} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TemplatePage from './componemts/pages/TemplatePage';

// import {HomePage} from './componemts/pages/HomePage';
// import {Template} from './componemts/Template.jsx';
import HomePage from './componemts/pages/HomePage';
import ResumeBuilder from './componemts/Resumebuilder';


function App() {

  const isDarkmode = useSelector((state) => state.theme.isDarkmode); // Redux state


  useEffect(() => {
    if (isDarkmode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkmode]);

  return (
    <div className={`${isDarkmode ? 'bg-gray-900' : 'bg-white'} transition-colors App`}>
 
<Navbar></Navbar>
<div className={`h-0.5  ${isDarkmode ? 'bg-gray-950' : 'bg-gray-100'} `}  ></div>
<Routes>

<Route path='/' element ={<HomePage></HomePage>}></Route>

<Route path='/resume' element ={<ResumeBuilder></ResumeBuilder>}></Route>


<Route path='/templates' element={<TemplatePage></TemplatePage>} ></Route>

<Route path='/pricing'> displaying pricing</Route>

<Route path='/support'> displaying support</Route>

<Route path='/login'> displaying login</Route>

<Route path='/signup'> displaying signup</Route>


</Routes>



    </div>
  );
}

export default App;
