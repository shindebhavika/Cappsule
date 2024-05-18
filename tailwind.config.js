/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-text': 'rgba(42, 82, 122, 1)',
        'black-text': 'rgba(0, 0, 0, 1)',
      },
      fontFamily: {
        'Inter': ['Inter', 'sans-serif'],
        'Outfit': ['Outfit', 'sans-serif'],
        'Poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

// tailwind.config.js
