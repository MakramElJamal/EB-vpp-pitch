export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#F8F6F2',   // warm cream
        surface: '#FFFFFF',   // white cards
        border:  '#E5E1DA',   // warm light border
        primary: '#1C1917',   // near-black
        muted:   '#78716C',   // warm gray
        accent:  '#0B7070',   // deep teal (readable on light)
        gold:    '#B45309',   // dark amber (readable on light)
        danger:  '#B91C1C',
        success: '#15803D',
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
