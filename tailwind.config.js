/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans SC"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif SC"', 'Songti SC', 'serif'],
      },
    },
  },
  plugins: [],
}
