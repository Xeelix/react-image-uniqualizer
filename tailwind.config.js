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
      'primary': '#02AFFF',
      'primary-dark': '#0a9ee3',
      'secondary': '#F0F9FF',
      'background': '#EAF3F8',
    },
    extend: {},
  },
  plugins: [],
};
