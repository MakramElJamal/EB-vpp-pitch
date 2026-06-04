import { useEffect } from 'react'
import { motion } from 'framer-motion'
import useScrollStore from '../store/scrollStore'

const COLUMNS = [
  {
    heading: 'Why Now',
    color: '#0D9488',
    points: [
      'ToU arbitrage window opened July 2024 — first time commercially exploitable in Jordan\'s history',
      'Law amended, private storage legal, USTDA study commissioned — regulatory stars aligned',
      'No MENA competitor operates commercially today — the first-mover window is narrow and closing',
    ],
  },
  {
    heading: 'Why Jordan',
    color: '#E8A838',
    points: [
      '90% energy import dependency — maximum national urgency to solve storage utilisation',
      '1 GW of rooftop PV already installed and waiting to be optimised',
      'Government-commissioned VPP study = a pre-procurement greenlight, not a pilot test',
    ],
  },
  {
    heading: 'Why Us',
    color: '#A78BFA',
    points: [
      'Power systems and dispatch optimisation depth — rare in this region',
      'Cultural and relationship capital inside Jordanian industry — not replicable with a budget',
      'Portfolio data compounds into a moat that capital alone cannot close',
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
        {COLUMNS.map((col, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.7 }}
            className="flex flex-col justify-center px-10 py-16 lg:py-24 gap-8"
          >
            <p className="chapter-label" style={{ color: col.color }}>{col.heading}</p>
            <ul className="space-y-5">
              {col.points.map((pt, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span
                    className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: col.color, minWidth: '0.25rem', minHeight: '0.25rem' }}
                  />
                  <p className="text-muted text-sm leading-relaxed">{pt}</p>
                </li>
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
        className="border-t border-border bg-gradient-to-b from-surface to-bg flex flex-col items-center justify-center px-8 py-24 text-center gap-8"
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
