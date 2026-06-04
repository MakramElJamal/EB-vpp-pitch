import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useScrollStore from '../store/scrollStore'

const BEATS = [
  { text: 'Jordan has 82,780 rooftop solar systems.', delay: 0 },
  { text: 'Most of them are wasting money right now.', delay: 0.8 },
]

function ParticleField() {
  const pts = Array.from({ length: 28 }, (_, i) => ({
    cx: 5 + (i * 31337) % 90,
    cy: 5 + (i * 17231) % 90,
    r: 0.8 + (i * 7919) % 2.5,
    dur: 3 + (i % 5),
  }))
  return (
    <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      {pts.map((p, i) => (
        <circle key={i} cx={`${p.cx}%`} cy={`${p.cy}%`} r={p.r} fill="#0D9488">
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur={`${p.dur}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {pts.slice(0, 12).map((p, i) => (
        <line key={`l${i}`}
          x1={`${p.cx}%`} y1={`${p.cy}%`}
          x2={`${pts[(i + 3) % pts.length].cx}%`}
          y2={`${pts[(i + 3) % pts.length].cy}%`}
          stroke="#0D9488" strokeWidth="0.15" opacity="0.3"
        />
      ))}
    </svg>
  )
}

export default function Hero() {
  const { setChapter } = useScrollStore()
  const [showSubline, setShowSubline] = useState(false)

  useEffect(() => {
    setChapter(0)
    const t = setTimeout(() => setShowSubline(true), 2000)
    return () => clearTimeout(t)
  }, [setChapter])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg">

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050810] via-[#071220] to-[#050810]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(13,148,136,0.07),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(232,168,56,0.04),transparent_50%)]" />
      <ParticleField />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-8 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          {BEATS.map((b, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: b.delay + 0.3, duration: 0.8 }}
              className={`display-heading leading-tight ${
                i === 0
                  ? 'text-3xl md:text-5xl xl:text-6xl text-primary'
                  : 'text-2xl md:text-4xl xl:text-5xl text-gold'
              }`}
            >
              {b.text}
            </motion.p>
          ))}
        </motion.div>

        <AnimatePresence>
          {showSubline && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-3"
            >
              <p className="text-muted text-lg md:text-xl">Not because the hardware is broken.</p>
              <p className="text-primary text-lg md:text-xl font-medium">
                Because no software is telling it what to do.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {showSubline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="pt-6 flex flex-col items-center gap-2"
          >
            <span className="text-muted text-sm font-mono tracking-widest uppercase">Scroll to continue</span>
            <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent" style={{ animation: 'scrollBounce 2s ease-in-out infinite' }} />
          </motion.div>
        )}
      </div>

      {/* Bottom label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-8 right-8 flex justify-between items-end"
      >
        <div>
          <p className="chapter-label">VPP Jordan</p>
          <p className="text-muted text-xs mt-1">Virtual Power Plant · Investor Pitch · 2026</p>
        </div>
        <div className="text-right">
          <p className="stat-number text-3xl text-accent font-bold">82,780</p>
          <p className="text-muted text-xs">distributed PV systems</p>
        </div>
      </motion.div>
    </section>
  )
}
