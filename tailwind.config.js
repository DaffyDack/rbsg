/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  plugins: [require("tw-elements/plugin.cjs")],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("tw-elements/plugin.cjs")],
  
}
