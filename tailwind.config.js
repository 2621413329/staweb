/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#3D3229',
        clay: '#8C7B6B',
        sand: '#FFF6EE',
        peach: '#FFE7D1',
        card: '#FFFBF7',
        line: '#EADFD3',
        accent: '#C4845A',
      },
      fontFamily: {
        sans: [
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Noto Sans CJK SC"',
          '"Noto Sans SC"',
          '"WenQuanYi Micro Hei"',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
