import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter'

const INPUTS = [
  { value: '82,780', label: 'commercial sites', sub: 'with solar + battery installed' },
  { value: '×  5h', label: 'peak hours daily', sub: 'when electricity costs 25% more' },
  { value: '×  25%', label: 'price premium', sub: 'from 5pm to 11pm every day' },
]

function BigCounter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const count = useAnimatedCounter(43000000, 2000, inView)

  return (
    <div ref={ref} className="text-center">
      <p className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: '#4DD9C0' }}>
        Lost every month across Jordan
      </p>
      <div className="flex items-baseline justify-center gap-3">
        <span className="font-mono font-bold" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#4DD9C0' }}>
          JOD
        </span>
        <span className="display-heading" style={{ fontSize: 'clamp(4rem,12vw,9rem)', color: '#FFFFFF', lineHeight: 1 }}>
          {count >= 1000000
            ? `${(count / 1000000).toFixed(count >= 10000000 ? 0 : 1)}M`
            : count.toLocaleString()}
        </span>
      </div>
      <p className="text-lg mt-4 max-w-xl mx-auto" style={{ color: '#A8C8C8' }}>
        because commercial and industrial sites are running their batteries
        on autopilot — missing 5 expensive hours every single day
      </p>
    </div>
  )
}

export default function MoneySection() {
  return (
    <section className="dark-section w-full py-24 px-8 md:px-16 lg:px-24 flex flex-col items-center gap-16">

      <BigCounter />

      {/* Equation breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-4xl"
      >
        <p className="font-mono text-xs tracking-widest uppercase text-center mb-8" style={{ color: '#4DD9C0' }}>
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

        {/* Equals line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-4 rounded-xl px-8 py-4"
            style={{ background: 'rgba(11,112,112,0.3)', border: '1px solid rgba(77,217,192,0.3)' }}>
            <span className="font-mono text-sm" style={{ color: '#4DD9C0' }}>= </span>
            <span className="stat-number font-bold text-2xl" style={{ color: '#FFFFFF' }}>JOD 43,000,000</span>
            <span className="text-sm" style={{ color: '#A8C8C8' }}>wasted every month</span>
          </div>
          <p className="mt-6 text-sm max-w-lg mx-auto" style={{ color: '#7AA8A8' }}>
            The hardware is already there. The money is already on the table.
            The only missing piece is the software layer that captures it.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
