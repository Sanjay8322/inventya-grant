/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#00B7F5',
          cyanDark: '#009DDF',
          orange: '#E4661D',
          dark: '#111827',
          darker: '#0A0F1A',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        inter: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
