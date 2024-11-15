/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'news-dark': '#1a1a1a',
        'news-light': '#f5f5f5',
      }
    },
  },
  plugins: [],
} 