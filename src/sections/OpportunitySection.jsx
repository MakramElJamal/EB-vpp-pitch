import { motion } from 'framer-motion'

const HOURS = Array.from({ length: 24 }, (_, h) => {
  if (h >= 17 && h <= 22) return { bg: '#B45309' }
  if ((h >= 14 && h <= 16) || h === 23 || h <= 4) return { bg: 'rgba(217,119,6,0.38)' }
  return { bg: 'rgba(11,112,112,0.22)' }
})

const timelineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.038, delayChildren: 0.1 } },
}

const hourBox = {
  hidden: { scaleY: 0, opacity: 0 },
  show:   { scaleY: 1, opacity: 1, transition: { duration: 0.16, ease: 'easeOut' } },
}

export default function OpportunitySection() {
  return (
    <section className="w-full py-24 px-8 md:px-16 lg:px-24 bg-bg">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-14">

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="chapter-label mb-4">Chapter 01 — The Problem</p>
          <h2 className="display-heading leading-tight text-primary"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
            The opportunity hiding in plain sight
          </h2>
        </motion.div>

        {/* Animated 24h timeline */}
        <div className="w-full">
          <motion.div
            variants={timelineContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="flex gap-px rounded-xl overflow-hidden"
            style={{ height: 72 }}
          >
            {HOURS.map((h, i) => (
              <motion.div
                key={i}
                variants={hourBox}
                style={{ flex: 1, background: h.bg, transformOrigin: 'bottom' }}
              />
            ))}
          </motion.div>

          {/* Time labels — fade in after bars finish */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.15, duration: 0.4 }}
            className="flex justify-between mt-2 px-0.5"
          >
            <span className="font-mono text-muted" style={{ fontSize: '0.72rem' }}>00:00</span>
            <span className="font-mono font-bold" style={{ fontSize: '0.72rem', color: '#B45309' }}>17:00 →</span>
            <span className="font-mono font-bold" style={{ fontSize: '0.72rem', color: '#B45309' }}>← 23:00</span>
            <span className="font-mono text-muted" style={{ fontSize: '0.72rem' }}>24:00</span>
          </motion.div>
        </div>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-semibold text-primary"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.45rem)' }}
        >
          The batteries are sleeping during the exact hours that matter.
        </motion.p>

        {/* OPTIMAL vs REALITY — side by side */}
        <div className="w-full grid grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-7 border-2 bg-surface"
            style={{ borderColor: '#0B7070' }}
          >
            <p className="font-mono text-xs font-bold mb-4" style={{ color: '#0B7070' }}>
              OPTIMAL — what should happen
            </p>
            <div className="h-3 rounded-full mb-5" style={{ background: '#0B7070' }} />
            <div className="flex justify-between items-end gap-4">
              <div>
                <p className="stat-number font-bold" style={{ fontSize: '2.8rem', color: '#0B7070', lineHeight: 1 }}>100%</p>
                <p className="font-mono text-xs text-muted mt-1">charged at 17:00</p>
              </div>
              <p className="text-muted text-sm text-right leading-snug max-w-[150px]">
                Charge cheap → fully ready at peak open → run site through the window
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-7 border-2 bg-surface"
            style={{ borderColor: '#B45309' }}
          >
            <p className="font-mono text-xs font-bold mb-4" style={{ color: '#B45309' }}>
              REALITY — what actually happens
            </p>
            <div className="h-3 rounded-full mb-5"
              style={{ background: 'linear-gradient(90deg, #B45309 28%, #E5E1DA 28%)' }} />
            <div className="flex justify-between items-end gap-4">
              <div>
                <p className="stat-number font-bold" style={{ fontSize: '2.8rem', color: '#B45309', lineHeight: 1 }}>~28%</p>
                <p className="font-mono text-xs text-muted mt-1">charged at 17:00</p>
              </div>
              <p className="text-muted text-sm text-right leading-snug max-w-[150px]">
                Random charge level → no plan → peak window wasted
              </p>
            </div>
          </motion.div>
        </div>

        {/* Big stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-4"
        >
          <p className="display-heading"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 6.5rem)', color: '#B45309', lineHeight: 1 }}>
            496,680
          </p>
          <p className="font-semibold text-primary mt-4"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)' }}>
            battery-hours wasted across Jordan <em>every single day</em>
          </p>
          <p className="font-mono text-sm mt-2" style={{ color: '#B45309' }}>
            82,780 sites × 6 hours
          </p>
        </motion.div>

      </div>
    </section>
  )
}
