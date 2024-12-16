/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class', // Enable dark mode via class
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 4s linear infinite',  // Adjust the 4s to make it slower or faster
      },
    },
  },
  plugins: [],
};


