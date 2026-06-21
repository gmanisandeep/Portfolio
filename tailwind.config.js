/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          red: '#e13833',
          gold: '#ffd500',
        },
        bg: {
          dark: '#080808',
          about: '#0c120e',
        },
        fg: '#f4f3ef',
      },
      fontFamily: {
        display: ['"Londrina Solid"', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        body: ['Karla', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
