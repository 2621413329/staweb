/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#243447',
        mist: '#6d7e8e',
        sky: '#5ea9ff',
        foam: '#f4f8fc',
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', '"WenQuanYi Micro Hei"', 'sans-serif'],
        display: ['Fraunces', 'Songti SC', 'Noto Serif SC', 'STSong', 'serif'],
      },
    },
  },
  plugins: [],
}
