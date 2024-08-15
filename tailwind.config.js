const colors = require('tailwindcss/colors')


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      ...colors,
      'primary': '#00AEEF',
      'secondary': '#F0F9FF',
    },
    extend: {},
  },
  plugins: [],
};
