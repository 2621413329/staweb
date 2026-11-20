/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: '#FBF6F0',
        cream: '#FFFBF7',
        ink: '#2C3E50',
        mist: '#7B8A9A',
        peach: '#E8A87C',
        peachdeep: '#C8895A',
        sky: '#5EA9FF',
        ocean: '#B8DCFF',
        foam: '#F5F9FF',
      },
      boxShadow: {
        card: '0 24px 60px rgba(94, 169, 255, 0.16)',
        soft: '0 12px 32px rgba(44, 62, 80, 0.06)',
      },
      fontFamily: {
        sans: [
          '"WenQuanYi Micro Hei"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Noto Sans SC"',
          '"Microsoft YaHei"',
          'system-ui',
          'sans-serif',
        ],
        display: [
          '"Iowan Old Style"',
          'Palatino',
          '"Palatino Linotype"',
          '"Songti SC"',
          '"WenQuanYi Micro Hei"',
          'serif',
        ],
      },
    },
  },
  plugins: [],
}
