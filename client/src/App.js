import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from './componemts/navbar/Navbar';
import {Router,Routes,Route} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TemplatePage from './componemts/pages/TemplatePage';

import HomePage from './componemts/pages/HomePage';
import TemplateDetail from './componemts/TemplateDetail';
import UnderConstruction from './componemts/pages/UnderContructionPage';
import PremiumRequired from './componemts/pages/BuyPremiumPage';
import SignupForm from './componemts/SignupForm';
import LoginForm from './componemts/LoginForm';
// import ResumeMainBuilder from './componemts/resume/ResumeMainBuilder';
import IndexOne from './componemts/resume/IndexOne';
import SupportPage from './componemts/Support';
import FeedbackForm from './componemts/FeedbackForm';

function App() {

  const isDarkmode = useSelector((state) => state.theme.isDarkmode); // Redux state..


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
    <div className={`${isDarkmode ? 'bg-gray-900' : 'bg-white'} transition-colors  select-none`}>
 
<Navbar></Navbar>
<div className={`h-0.5  ${isDarkmode ? 'bg-gray-950' : 'bg-gray-100'} `}  ></div>
<Routes>

<Route path='/' element ={<HomePage></HomePage>}></Route>

<Route path='/templates' element={<TemplatePage></TemplatePage>} ></Route>
{/* <Route path="templates/edit/:templateId"  element ={<TemplateDetail></TemplateDetail>} /> */}

<Route path='*' element={<UnderConstruction></UnderConstruction>}></Route>

{/* <Route path='/pricing'> displaying pricing</Route> */}

<Route path='/support' element = {<SupportPage></SupportPage>}> </Route>

<Route path='/login' element={<LoginForm></LoginForm>}> </Route>

<Route path='/signup' element={<SignupForm></SignupForm>} > </Route>

<Route path='/resume/maker' element={<IndexOne></IndexOne>} > </Route>

<Route path='/feedback' element={<FeedbackForm></FeedbackForm>} > </Route>


 
</Routes>



    </div>
  );
}

export default App;
