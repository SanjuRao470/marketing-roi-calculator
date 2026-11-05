/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bmm: {
          navy: '#0A1628',
          'navy-mid': '#0F2744',
          blue: '#1A73E8',
          'blue-hover': '#1558B0',
          'blue-soft': '#E8F1FD',
          ink: '#111827',
          muted: '#6B7280',
          line: '#E5E7EB',
          canvas: '#F3F4F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        shell: '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(15, 39, 68, 0.08)',
        hero: '0 20px 50px rgba(10, 22, 40, 0.35)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
