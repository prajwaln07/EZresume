import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/actions/themeAction';
import axios from "axios";
import { userLogout } from '../../redux/actions/userDetail';
import {toast } from 'react-toastify';
import apiConfig from '../../api/apiConfig';



const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isModalOpen, setIsModalOpen] = useState(false); // For logout modal
  const isDarkmode = useSelector((state) => state.theme.isDarkmode); // Redux state
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const username = useSelector((state) => state.user.username);
  const role = useSelector(state => state.user.role); // Get the user's role from Redux


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const themeChangeHandler = () => {
    dispatch(toggleTheme());
  };

  // Detect the current route
  const location = useLocation();

  // Update body class when the theme changes
  useEffect(() => {
    if (isDarkmode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkmode]);

  const Clickhandler =()=>{


  if (role === 'admin') {
    navigate('admin/dashboard'); 
  } else {
    navigate('/'); 
  }
  }
  
  

  const handleLogout = async () => {
    // Perform logout logic, like clearing auth tokens, Redux state, etc.

    try {

      await axios.post(apiConfig.users.logout);
      
      toast.info('User Logout Successful!', {
        position: "bottom-right",
        autoClose: 4000, // Slightly faster auto-close for logout
        hideProgressBar: true, // Remove progress bar for cleaner appearance
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark", // Set a dark theme to signify logout
      });
      dispatch(userLogout());
    } catch (err) {
      console.log("Got error while logging out.", err.message);
    }
    setIsModalOpen(false); // Close the modal

    navigate('/'); // Redirect to the home page or login page
  };

  return (
    <nav className={`${isDarkmode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="h-10 w-10">
          <Link to="/">
            <img
              className="rounded-full"
              src="https://res.cloudinary.com/dkynwi65w/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734259184/ezresumelogo_rdkib3.jpg"
              alt="EZresume Logo"
            />
          </Link>
        </div>

        <div className={`text-3xl font-semibold ${isDarkmode ? 'text-white' : 'text-gray-900'}`}>
          <Link to="/">EZResume</Link>
        </div>

        {/* Center Menu Items */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/templates"
            className={`text-lg hover:text-blue-500 ${isDarkmode ? 'text-white' : 'text-gray-900'}`}
          >
            Templates
          </Link>


          <Link
            to="/contactUs"
            className={`text-lg hover:text-blue-500 ${isDarkmode ? 'text-white' : 'text-gray-900'}`}
          >
            Contact
          </Link>



          <Link
            to="/support"
            className={`text-lg hover:text-blue-500 ${isDarkmode ? 'text-white' : 'text-gray-900'}`}
          >
            Support
          </Link>
          
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex space-x-4 items-center">
          {/* Dark Mode Toggle */}
          {location.pathname !== '/resume/maker' && (
            <div className="h-10 w-10 cursor-pointer" onClick={themeChangeHandler}>
              <img
                className="rounded-full animate-spin-slow"
                src={
                  isDarkmode
                    ? 'https://res.cloudinary.com/dkynwi65w/image/upload/v1734262749/newMoon_tvbjoq.jpg'
                    : 'https://res.cloudinary.com/dkynwi65w/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1734259647/sun_png0yi.jpg'
                }
                alt={isDarkmode ? 'Moon Icon' : 'Sun Icon'}
              />
            </div>
          )}

          {!isAuthenticated ? (
            <div>
              <Link
                to="/login"
                className={`text-lg hover:text-blue-500 ${isDarkmode ? 'text-white' : 'text-gray-900'}`}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className={`px-3 mx-6 py-2 rounded-lg transition ${isDarkmode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div>
              <span
                onClick={Clickhandler}
                className={` cursor-pointer text-lg my-6 hover:text-blue-500 ${isDarkmode ? 'text-white' : 'text-gray-900'}`}
              >
                {username}
              </span>

              <button
                onClick={() => setIsModalOpen(true)}
                className={`px-3 mx-6 py-2 rounded-lg transition ${isDarkmode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Menu */}
        <button
          className={`md:hidden flex items-center px-3 py-2 border rounded ${isDarkmode ? 'border-gray-600 text-white' : 'border-gray-400 text-gray-900'} hover:text-white hover:border-white`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu (Conditional Rendering) */}
      {isOpen && (
        <div className={`md:hidden transition-transform transform ${isDarkmode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
          <div className="space-y-4 px-6 py-4">
            <Link
              to="/templates"
              className="block text-lg hover:text-blue-500"
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              Templates
            </Link>
            <Link
              to="/pricing"
              className="block text-lg hover:text-blue-500"
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              Pricing
            </Link>
            <Link
              to="/support"
              className="block text-lg hover:text-blue-500"
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              Support
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="block text-lg hover:text-blue-500"
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  {username}
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-lg hover:text-blue-500"
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-left px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsModalOpen(false)} // Close modal on background click
        >
          <div
            className={`p-6 rounded-lg shadow-md transition-transform transform ${
              isDarkmode
                ? 'bg-gray-800 text-white border border-gray-600'
                : 'bg-white text-gray-900 border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex space-x-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
