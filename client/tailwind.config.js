/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode via class

  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Path to your files using Tailwind
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 4s linear infinite',  
      },
    }, // Customize the default theme here
  },
  plugins: [], 
};
