/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#2C3333',
        'dark-green': '#2E4F4F',
        'brand': '#0E8388',
        'light': '#CBE4DE',
      }
    },
  },
  plugins: [],
}