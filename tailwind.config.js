/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bmm: {
          navy: '#0A1628',
          'navy-deep': '#0F172A',
          blue: '#046BD2',
          'blue-figma': '#2563EB',
          'blue-bright': '#2B63F1',
          'blue-hover': '#035AA8',
          'blue-soft': '#E8F2FC',
          ink: '#111827',
          muted: '#6B7280',
          'muted-light': '#9CA3AF',
          line: '#E5E7EB',
          canvas: '#F3F4F6',
          'bar-mid': '#60A5FA',
          'bar-light': '#93C5FD',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'hero': ['2.625rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        shell: '0 1px 2px rgba(0,0,0,0.04), 0 12px 32px rgba(15, 23, 42, 0.08)',
        hero: '0 24px 48px rgba(15, 23, 42, 0.28)',
        card: '0 1px 2px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        '4xl': '1.75rem',
      },
      maxWidth: {
        shell: '44rem',
        landing: '72rem',
      },
    },
  },
  plugins: [],
}
