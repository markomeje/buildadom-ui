/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },

      backgroundImage: {
        'home-banner': "url('/assets/banner.png')",
      },
      colors: {
        bd: {
          black: '#020202',
          blue: '#0156FF',
          lightBlue: '#F5F7FF',
        },
      },
    },
  },
  plugins: [],
}
