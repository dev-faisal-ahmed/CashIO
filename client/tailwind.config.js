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
        error: {
          50: '#fff2f2',
          100: '#ffd8d8',
          200: '#ffc5c5',
          300: '#ffaaaa',
          400: '#ff9999',
          500: '#ff8080',
          600: '#e87474',
          700: '#b55b5b',
          800: '#8c4646',
          900: '#6b3636',
        },
        bg: {
          dark: '#161a30',
        },
        card: {
          bg: { dark: '#1B445F' },
        },
      },
    },
  },
  plugins: [],
};
