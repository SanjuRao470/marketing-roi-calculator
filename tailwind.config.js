/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bmm: {
          navy: '#0B1F3A',
          'navy-light': '#132847',
          blue: '#046BD2',
          'blue-dark': '#0142F5',
          'blue-soft': '#E8F2FC',
          mint: '#03E78B',
          'mint-soft': '#E6FBF2',
          slate: '#475569',
          border: '#E2E8F0',
          muted: '#64748B',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['Outfit', '"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(11, 31, 58, 0.08)',
        'card-lg': '0 12px 40px rgba(11, 31, 58, 0.12)',
      },
    },
  },
  plugins: [],
}
