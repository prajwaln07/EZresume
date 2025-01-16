import React, { useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import {Routes,Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import TemplatePage from './components/pages/TemplatePage';
import HomePage from './components/pages/HomePage';
import UnderConstruction from './components/pages/UnderContructionPage';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import IndexOne from './components/resume/IndexOne';

import FeedbackForm from './components/FeedbackForm';
import ContactUs from './components/ContactUs';
import AdminDashboard from './components/pages/admin/AdminDashboard'


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


<Route path='*' element={<UnderConstruction></UnderConstruction>}></Route>

<Route path='/login' element={<LoginForm></LoginForm>}> </Route>

<Route path='/signup' element={<SignupForm></SignupForm>} > </Route>

<Route path='/contactUs' element={<ContactUs></ContactUs>} > </Route>


<Route path='/resume/maker' element={<IndexOne></IndexOne>} > </Route>

<Route path='/feedback' element={<FeedbackForm></FeedbackForm>} > </Route>

<Route
  path='/admin/dashboard'
  element={useSelector(state => state.user.role) === 'admin' ? <AdminDashboard /> : <HomePage/>}
/>




 
</Routes>



    </div>
  );
}

export default App;
