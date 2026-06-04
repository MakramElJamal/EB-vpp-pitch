import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import useScrollStore from '../store/scrollStore'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter'

const MILESTONES = [
  { month: 'Month 4',  label: 'First signed pilot' },
  { month: 'Month 6',  label: 'First verified bill saving delivered to customer' },
  { month: 'Month 12', label: '3 paying customers under shared-savings contracts' },
  { month: 'Year 1',   label: 'One substantive EMRC regulatory dialogue initiated' },
]

const GATES = [
  'First 3 customers each see ≥8% verified bill reduction',
  'Channel-partner agreement signed with Philadelphia Solar, Kawar Energy, or Sungrow/Huawei distributor',
  'EMRC produces an acknowledgement — public or private — that Phase 2 aggregator framework is on the roadmap',
]

function BigNumber({ target, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const count = useAnimatedCounter(target, 1600, inView)
  return (
    <span ref={ref} className="stat-number font-bold text-gold" style={{ fontSize: 'clamp(3rem,8vw,7rem)' }}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function AskSection() {
  const { setChapter } = useScrollStore()
  useEffect(() => { setChapter(6) }, [setChapter])

  return (
    <section id="ask" className="min-h-screen bg-gradient-to-b from-bg to-surface flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20">

      <div className="max-w-4xl mx-auto w-full space-y-16">

        {/* Raise amount */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-2"
        >
          <p className="chapter-label">Chapter 06 — The Ask</p>
          <p className="text-muted text-sm mt-4 mb-2">We are raising</p>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-2xl text-gold">JOD</span>
            <BigNumber target={105000} />
          </div>
          <p className="text-muted">approximately USD 148,000 — pre-seed</p>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-4"
        >
          <p className="gold-label mb-4">What this buys</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border rounded-lg p-4 bg-surface flex gap-3"
              >
                <span className="font-mono text-xs text-accent flex-shrink-0 mt-0.5 w-16">{m.month}</span>
                <span className="text-sm text-primary">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Two scenarios */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          <div className="border border-border rounded-xl p-5 bg-surface space-y-2">
            <p className="font-mono text-xs text-muted">Scenario A · JOD 16K</p>
            <p className="text-primary font-semibold">Bootstrapped</p>
            <p className="text-muted text-sm leading-relaxed">Three pilots, one paid conversion, no founder salaries. Survives one year. Proves the model.</p>
          </div>
          <div className="border border-accent/30 rounded-xl p-5 bg-accent/5 space-y-2">
            <p className="font-mono text-xs text-accent">Scenario B · JOD 103K</p>
            <p className="text-primary font-semibold">Funded</p>
            <p className="text-muted text-sm leading-relaxed">Full-time team, 8 pilot deployments, funded regulatory engagement, channel-partner outreach. Reaches break-even at ~70 sites (~Year 4–5).</p>
          </div>
        </motion.div>

        {/* Gates for round 2 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="space-y-3"
        >
          <p className="gold-label mb-4">Three things that must be true for the second round to be fundable</p>
          {GATES.map((g, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="font-mono text-xs text-gold flex-shrink-0 mt-0.5">{i + 1}.</span>
              <p className="text-muted text-sm leading-relaxed">{g}</p>
            </div>
          ))}
        </motion.div>

        {/* Unit economics */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="border border-border rounded-xl p-6 bg-surface"
        >
          <p className="chapter-label mb-4">Unit economics — honest</p>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="stat-number text-2xl text-danger font-bold">0.69</p>
              <p className="text-muted text-xs mt-1">Year 1 LTV:CAC</p>
              <p className="text-muted text-xs">Below 3:1 benchmark — stated openly</p>
            </div>
            <div>
              <p className="stat-number text-2xl text-success font-bold">&gt;3.0</p>
              <p className="text-muted text-xs mt-1">Year 5 LTV:CAC</p>
              <p className="text-muted text-xs">As CAC falls via channel partners</p>
            </div>
            <div>
              <p className="stat-number text-2xl text-accent font-bold">8 mo</p>
              <p className="text-muted text-xs mt-1">Hardware payback</p>
              <p className="text-muted text-xs">Per site on blended portfolio</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
