module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'blackpink-900': '#210414',
        'blackpink-800': '#33061F',
        'blackpink-500': '#D91882',
        'blackpink-300': '#F21B91',
        'blackpink-100': '#FF1C99',

      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
