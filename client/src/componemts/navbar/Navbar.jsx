import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/actions/themeAction';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const isDarkmode = useSelector((state) => state.theme.isDarkmode); // Redux state
  const dispatch = useDispatch();

  const themeChangeHandler = () => {
    dispatch(toggleTheme());
  };

  // Update body class when the theme changes
  useEffect(() => {
    if (isDarkmode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkmode]);

  return (
    <nav className={`${isDarkmode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="h-10 w-10">
          <Link to="/">
          <img
            className="rounded-full"
            src="https://res.cloudinary.com/dkynwi65w/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734259184/ezresumelogo_rdkib3.jpg"
            alt="EZ Resume Logo"
          />
          </Link>
        </div>
        <div className={`text-3xl font-semibold ${isDarkmode ? 'text-white' : 'text-gray-900'}`}>
<Link to="/">          EZResume
</Link>
        </div>

        {/* Center Menu Items */}
        <div className="hidden md:flex space-x-8">
          <Link to="/templates" className={`text-lg hover:text-blue-500 ${isDarkmode ? 'text-white' : 'text-gray-900'}`}>
            Templates
          </Link>
          <Link to="/pricing" className={`text-lg hover:text-blue-500 ${isDarkmode ? 'text-white' : 'text-gray-900'}`}>
            Pricing
          </Link>
          <Link to="/support" className={`text-lg hover:text-blue-500 ${isDarkmode ? 'text-white' : 'text-gray-900'}`}>
            Support
          </Link>
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex space-x-4 items-center">
          {/* Dark Mode Toggle */}
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

          <Link to="/login" className={`text-lg hover:text-blue-500 ${isDarkmode ? 'text-white' : 'text-gray-900'}`}>
            Login
          </Link>
          <Link
            to="/signup"
            className={`px-6 py-2 rounded-lg transition ${isDarkmode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger Menu */}
        <button
          className={`md:hidden flex items-center px-3 py-2 border rounded ${
            isDarkmode ? 'border-gray-600 text-white' : 'border-gray-400 text-gray-900'
          } hover:text-white hover:border-white`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden px-4 py-3 space-y-4 ${isDarkmode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <a href="#templates" className={`block hover:text-blue-500 ${isDarkmode ? 'text-white' : 'text-gray-900'}`}>
            Templates
          </a>
          <a href="#pricing" className={`block hover:text-blue-500 ${isDarkmode ? 'text-white' : 'text-gray-900'}`}>
            Pricing
          </a>
          <a href="#support" className={`block hover:text-blue-500 ${isDarkmode ? 'text-white' : 'text-gray-900'}`}>
            Support
          </a>
          <div className="border-t border-gray-600 my-2"></div>
          <a href="#login" className={`block hover:text-blue-500 ${isDarkmode ? 'text-white' : 'text-gray-900'}`}>
            Login
          </a>
          <a
            href="#signup"
            className={`block px-4 py-2 rounded-lg text-center transition ${
              isDarkmode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Sign Up
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
