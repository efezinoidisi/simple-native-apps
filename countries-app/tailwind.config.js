/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{tsx,ts}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        gray: {
          25: '#FCFCFD',
          100: '#F2F4F7',
          200: '#EAECF0',
          300: '#D0D5DD',
          400: '#98A2B3',
          500: '#667085',
          900: '#1C1917',
        },
        dark: '#000F24',
      },
      boxShadow: {
        dm: '0px 1px 2px rgba(16, 24, 40, 0.05)',
      },
    },
  },
  plugins: [],
};
