import { useEffect } from 'react'
import { motion } from 'framer-motion'
import useScrollStore from '../store/scrollStore'

const COLUMNS = [
  {
    heading: 'Why Now',
    color:   '#0D9488',
    bg:      'rgba(13,148,136,0.06)',
    border:  'rgba(13,148,136,0.2)',
    points: [
      { icon: '📋', text: 'Four policy moves in eighteen months — peak pricing live, storage legalised, sector expanded, feasibility study funded' },
      { icon: '🌍', text: 'No MENA competitor operates commercially today — the window is open right now' },
      { icon: '📈', text: 'Every year without a software layer is a year of compounding missed savings across 82,780 sites' },
    ],
  },
  {
    heading: 'Why Jordan',
    color:   '#B45309',
    bg:      'rgba(180,83,9,0.05)',
    border:  'rgba(180,83,9,0.18)',
    points: [
      { icon: '⚡', text: '90% energy import dependency — reducing peak grid load is a national priority, not a niche concern' },
      { icon: '🏛️', text: 'The government has already funded a feasibility study for exactly what we are building' },
      { icon: '🌏', text: 'First market proof here travels across the region — MENA has the same hardware, the same problem' },
    ],
  },
  {
    heading: 'Why Us',
    color:   '#7C3AED',
    bg:      'rgba(124,58,237,0.05)',
    border:  'rgba(124,58,237,0.18)',
    points: [
      { icon: '🔧', text: "Built for Jordan's specific tariff structure — every international competitor would need a complete rebuild" },
      { icon: '🤝', text: 'Industrial relationships inside Jordan that cannot be replicated with a budget or a demo call' },
      { icon: '🧠', text: 'Every site we add makes the model smarter for every other site — a data advantage that compounds' },
    ],
  },
]

export default function CloseSection() {
  const { setChapter } = useScrollStore()
  useEffect(() => { setChapter(7) }, [setChapter])

  return (
    <section id="close" className="min-h-screen flex flex-col bg-bg">

      {/* Three columns */}
      <div className="flex-1 grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
        {COLUMNS.map((col, ci) => (
          <motion.div
            key={ci}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.18, duration: 0.65 }}
            className="flex flex-col px-10 py-16 lg:py-24 gap-10"
          >
            {/* Heading */}
            <div>
              <div className="w-10 h-1.5 rounded-full mb-5" style={{ background: col.color }} />
              <h2
                className="display-heading leading-none"
                style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)', color: col.color }}
              >
                {col.heading}
              </h2>
            </div>

            {/* Points */}
            <ul className="space-y-4 flex-1">
              {col.points.map((pt, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ci * 0.18 + j * 0.1 + 0.25 }}
                  className="flex items-start gap-4 rounded-xl p-4"
                  style={{ background: col.bg, border: `1px solid ${col.border}` }}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{pt.icon}</span>
                  <p className="text-primary leading-relaxed"
                    style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}>
                    {pt.text}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Final closing line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="border-t border-border bg-gradient-to-b from-bg to-surface flex flex-col items-center justify-center px-8 py-24 text-center gap-8"
      >
        <p className="serif-body text-3xl md:text-4xl xl:text-5xl text-primary leading-relaxed max-w-3xl">
          "Jordan's batteries are charged."
        </p>
        <p className="serif-body text-2xl md:text-3xl xl:text-4xl text-gold leading-relaxed max-w-3xl">
          "They just need someone to tell them when to fire."
        </p>

        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent" />
          <p className="font-mono text-xs text-muted tracking-widest uppercase">VPP Jordan · 2026</p>
        </div>
      </motion.div>
    </section>
  )
}
