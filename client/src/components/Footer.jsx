import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const isDarkmode = useSelector((state) => state.theme.isDarkmode);

  return (
    <footer
      className={`py-6 px-4 ${
        isDarkmode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">

        <div className="mb-4 md:mb-0">

          <p className="text-sm">
            © {new Date().getFullYear()} EZResume. All rights reserved.
          </p>
          
        </div>

        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/in/prajwalnimbalkar/"
            className="hover:text-teal-500"
            aria-label="Facebook"
          >
            Facebook
          </a>
          <a
            href="https://www.linkedin.com/in/prajwalnimbalkar/"
            className="hover:text-teal-500"
            aria-label="Twitter"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/prajwalnimbalkar/"
            className="hover:text-teal-500"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
