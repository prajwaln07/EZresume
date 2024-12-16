/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode via class

  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Path to your files using Tailwind
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 4s linear infinite',  // Adjust the 4s to make it slower or faster
      },
    }, // Customize the default theme here
  },
  plugins: [], // Add plugins like typography or forms if needed
};
