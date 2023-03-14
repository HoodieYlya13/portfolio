/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  isOpen: "class",
  homeOpen: "class",
  edOpen: "class",
  expOpen: "class",
  contOpen: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',

 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        burtons: "burtons",
      }
    },
    screens: {
      'xs': '520px',
      'sm': '640px',
      'md': '850px',
      'mdl': '915px',
      'sl' : '1035px',
      'lg': '1425px',
      'xl': '1745px'
  },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}