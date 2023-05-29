/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: '#FF6000', // colors.orange,
      secondary: '#FFA559', //colors.emerald
      customlight: '#FFE6C7',
      customdark: '#454545',
      black: colors.black,
      red: colors.red,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      orange: colors.orange
    },
    extend: {
      fontFamily: {
        'sans': ['Trebuchet', ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
  },
  plugins: [],
}

