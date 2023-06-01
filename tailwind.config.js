/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    colors: {
      'light': '#f3f3f3',
      'dark': '#212121',
      'CornflowerBlue': '#6495ED',
    },
    fontFamily: {
      sans: ['Odibee Sans', 'cursive'],
    },
  },
  plugins: [],
}