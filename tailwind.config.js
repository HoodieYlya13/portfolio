/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  isOpen: "class",
  homeOpen: "class",
  edOpen: "class",
  expOpen: "class",
  contOpen: "class",
  ac0: "class",
  ac1: "class",
  ac2: "class",
  ac3: "class",
  ac4: "class",
  ac5: "class",
  ac6: "class",
  ac7: "class",
  ac8: "class",
  ac9: "class",
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
      },
      boxShadow: {
        'lg-light': '0 10px 15px -3px rgb(255 255 255 / 0.1), 0 4px 6px -4px rgb(255 255 255 / 0.1)',
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