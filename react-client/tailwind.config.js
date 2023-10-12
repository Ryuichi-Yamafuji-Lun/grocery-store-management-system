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
        'line-color': '#000000',
        'light-green': '#9BE931',
        'dark-green': '#00754B',
      },

      fontFamily: {
        ariel: ['Arial', 'sans'],
      },

    },
  },
  plugins: [],
}
