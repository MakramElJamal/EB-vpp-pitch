import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

// Two-phase counter: races to 93% of target, then crawls dramatically to the end
function useDramaticCounter(target, enabled) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!enabled) { setValue(target); return }
    setValue(0)

    const TOTAL    = 3800     // ms — total animation
    const SPLIT    = 0.72     // first 72% of time covers 93% of value
    const fastEnd  = Math.round(target * 0.93)
    const start    = performance.now()

    const tick = (now) => {
      const elapsed = Math.min(now - start, TOTAL)
      const rel     = elapsed / TOTAL

      let current
      if (rel <= SPLIT) {
        // Phase 1 — fast, quadratic ease-out
        const t = rel / SPLIT
        current = Math.round(fastEnd * (1 - Math.pow(1 - t, 2)))
      } else {
        // Phase 2 — dramatic crawl, quintic ease-out
        const t = (rel - SPLIT) / (1 - SPLIT)
        current = Math.round(fastEnd + (target - fastEnd) * (1 - Math.pow(1 - t, 5)))
      }

      setValue(Math.min(current, target))
      if (elapsed < TOTAL) rafRef.current = requestAnimationFrame(tick)
      else setValue(target)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, enabled])

  return value
}

const INPUTS = [
  { value: '82,780', label: 'solar installations', sub: 'residential, commercial & industrial across Jordan' },
  { value: '×  5h',  label: 'peak hours daily',   sub: '5pm–11pm when grid prices spike' },
  { value: '×  25%', label: 'avg. wasted premium', sub: 'conservative — actual tariff gap is 34%' },
]

export default function MoneySection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const count  = useDramaticCounter(43000000, inView)

  return (
    <section className="dark-section w-full py-28 px-8 md:px-16 lg:px-24 flex flex-col items-center gap-20">

      {/* ── Hero hook ── */}
      <div ref={ref} data-snap className="text-center">

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm tracking-[0.22em] uppercase mb-8"
          style={{ color: '#4DD9C0' }}
        >
          lost every month, across jordan
        </motion.p>

        {/* Currency label */}
        <p className="font-mono font-bold mb-1"
          style={{ fontSize: 'clamp(1.3rem,2.8vw,2rem)', color: '#4DD9C0', letterSpacing: '0.05em' }}>
          JOD
        </p>

        {/* Big number — full digits, no M abbreviation */}
        <p className="display-heading"
          style={{
            fontSize:            'clamp(3.5rem, 10vw, 8rem)',
            color:               '#FFFFFF',
            lineHeight:          1,
            letterSpacing:       '-0.02em',
            fontVariantNumeric:  'tabular-nums',
            fontFamily:          "'DM Mono', monospace",
          }}>
          {count.toLocaleString()}
        </p>

        {/* "lost." — the hook word */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="display-heading mt-4"
          style={{ fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', color: '#E8C87E', lineHeight: 1.1 }}>
          wasted.
        </motion.p>

        {/* Sub description */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
          className="mt-7 max-w-2xl mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(1rem,1.6vw,1.2rem)', color: '#A8C8C8' }}>
          because solar installations across Jordan are running their batteries
          on autopilot — missing 5 expensive hours every single day
        </motion.p>
      </div>

      {/* ── Equation breakdown ── */}
      <motion.div
        data-snap
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-4xl"
      >
        <p className="font-mono text-xs tracking-widest uppercase text-center mb-8"
          style={{ color: '#4DD9C0' }}>
          How we calculated this
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {INPUTS.map((inp, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="rounded-xl p-5 text-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <p className="stat-number font-bold mb-1" style={{ fontSize: '1.75rem', color: '#FFFFFF' }}>
                {inp.value}
              </p>
              <p className="font-semibold text-sm mb-1" style={{ color: '#E8D8B8' }}>{inp.label}</p>
              <p className="text-xs" style={{ color: '#7AA8A8' }}>{inp.sub}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm" style={{ color: '#4AA8A8' }}>
          The hardware is already there. The money is already on the table.
          The only missing piece is the software that captures it.
        </p>
      </motion.div>
    </section>
  )
}
