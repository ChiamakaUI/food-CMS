/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:  {
        white: '#ffffff',
        'black-overlay': 'rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        'gentium': ['Gentium Book Plus', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
