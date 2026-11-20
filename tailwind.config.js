/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          '"WenQuanYi Micro Hei"',
          'system-ui',
          'sans-serif',
        ],
        serif: [
          '"Noto Serif SC"',
          '"Songti SC"',
          '"Source Han Serif SC"',
          'Palatino',
          'serif',
        ],
        display: ['"Segoe UI"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
