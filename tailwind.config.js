/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"WenQuanYi Micro Hei"', '"PingFang SC"', '"Noto Sans SC"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        serif: ['"Iowan Old Style"', 'Palatino', '"Songti SC"', '"Noto Serif SC"', '"WenQuanYi Micro Hei"', 'serif'],
        display: ['"WenQuanYi Micro Hei"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
