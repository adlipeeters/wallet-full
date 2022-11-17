/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    },
    colors: {
      transparent: 'transparent',
      bodyBg: '#F3F4FA',
      mainBg: '#fff',
      mainColor: '#8624DB',
      txtColor: '#4E4D4F',
      purple: {
        main: '#8624DB',
        hover: '#6e15bd'
      },
      orange: '#FF9066',
      white: '#fff',
      black: '#000',
      green: '#4CAF50',
      red: '#DB190C',
    }
  },
  plugins: [
    // require("daisyui")
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}