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
  safelist: [
    'border-blue-700',
    'bg-blue-400',
    'hover:bg-blue-300',
    'border-emerald-700',
    'bg-emerald-400',
    'hover:bg-emerald-300',
    'border-red-700',
    'bg-red-400',
    'hover:bg-red-300',
    'border-yellow-700',
    'bg-yellow-400',
    'hover:bg-yellow-300',
    'border-orange-700',
    'bg-orange-400',
    'hover:bg-orange-300',
  ],
  plugins: [],
}

