/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        main: "#4353b2",
        hover: "#1f3b8b",
        dark: "#0c1739",
        popup: "rgba(0,0,0,.4)",
        danger: "#dc3545",
        succuss: "#28a745",
        tablerow: "#e9ecf5"
      },
      backgroundColor: ['even'],
      boxShadow: {
        '3xl': '2px 10px 40px -3px rgba(67,83,178,.3)'
      },
      backgroundImage: {
        'gradient-radial': 'linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)',
        'background-textmove': 'linear-gradient(90deg, #000, #fff, #000)',
        'hero-pattern': "url('/src/assets/networkbg.png')",
      },
      keyframes: {
        wiggle: {
          '0%': { left: '150px' },
          '100%': { left: '-1400px' },
        }
      }
  },
  plugins: [],
}
}
