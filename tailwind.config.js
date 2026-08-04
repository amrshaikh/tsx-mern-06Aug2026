/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Cinzel', 'serif'],
      },
      colors: {
        'sw-yellow': '#ffe81f',
        'sw-dark': '#050a15',
      }
    },
  },
  plugins: [],
}
