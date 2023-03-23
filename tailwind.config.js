/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },

      colors: {
        bd: {
         black: "#020202",
         blue: "#0156FF"
        }
      }
    },
  },
  plugins: [],
};
