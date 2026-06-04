export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#050810',
        surface: '#0C1022',
        border:  '#1A2040',
        primary: '#F0F2FF',
        muted:   '#7A84A8',
        accent:  '#0D9488',
        gold:    '#E8A838',
        danger:  '#EF4444',
        success: '#22C55E',
      },
      fontFamily: {
        display: ['Clash Display', 'Space Grotesk', 'system-ui', 'sans-serif'],
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
        serif:   ['Instrument Serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
