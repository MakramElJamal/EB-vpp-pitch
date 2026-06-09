import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useScrollStore from '../store/scrollStore'

export default function Hero() {
  const { setChapter } = useScrollStore()
  const [showSub, setShowSub] = useState(false)

  useEffect(() => {
    setChapter(0)
    const t = setTimeout(() => setShowSub(true), 1600)
    return () => clearTimeout(t)
  }, [setChapter])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center bg-bg overflow-hidden">

      {/* Subtle teal gradient wash */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(11,112,112,0.06) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-16 lg:px-24 pt-24 pb-20">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="chapter-label mb-8"
        >
          VPP Jordan · Investor Pitch · 2026
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display-heading text-5xl md:text-7xl xl:text-8xl text-primary leading-[1.05] mb-6"
        >
          Jordan has{' '}
          <span style={{ color: '#0B7070' }}>82,780</span>{' '}
          decentralized solar systems.
        </motion.h1>

        {/* Sub-headline */}
        <AnimatePresence>
          {showSub && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <p className="text-2xl md:text-3xl font-medium" style={{ color: '#B45309' }}>
                Most of them are wasting money right now.
              </p>
              <p className="text-muted text-lg max-w-2xl leading-relaxed">
                Not because the hardware is broken.
                Because no software is managing it.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll hint */}
        {showSub && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex items-center gap-3"
          >
            <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent"
              style={{ animation: 'scrollBounce 2s ease-in-out infinite' }} />
            <span className="text-muted text-sm font-mono tracking-widest uppercase">Scroll</span>
          </motion.div>
        )}
      </div>

      {/* Bottom stat */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-8 right-8 text-right border border-border rounded-xl px-5 py-3 bg-surface shadow-sm"
      >
        <p className="stat-number text-2xl font-bold text-accent">82,780</p>
        <p className="text-muted text-xs mt-0.5">distributed solar sites</p>
      </motion.div>
    </section>
  )
}
