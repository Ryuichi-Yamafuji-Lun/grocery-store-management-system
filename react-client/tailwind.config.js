/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Color schema for the website
        'background-main': '#FFFFFF',
        'background-second': '#F8F7F5',
        'line-color': '#000000',
        'light-green': '#31C48D',
        'dark-green': '#00674b',
        'return-color': '#C6C6C6',
      },

      fontFamily: {
        ariel: ['Arial', 'sans'],
      },

    },
  },
  plugins: [],
}
