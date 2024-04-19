/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecf6fc',
          100: '#c4e2f6',
          200: '#a7d4f2',
          300: '#7fc1ec',
          400: '#66b5e9',
          500: '#40a2e3',
          600: '#3a93cf',
          700: '#2d73a1',
          800: '#23597d',
          900: '#1b445f',
        },
      },
    },
  },
  plugins: [],
};
