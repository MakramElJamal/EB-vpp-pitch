import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import useScrollStore from '../store/scrollStore'

// ── Scenario A financials ──────────────────────────────────────
const FIXED        = 1300   // JOD/month, bootstrapped (no salaries)
const REV_SITE     = 117    // JOD/site/month, blended ARR
const VAR_SITE     = 30     // JOD/site/month, variable cost
const BE_SITES     = 15     // break-even site count

// ── Break-even chart geometry ──────────────────────────────────
const VW = 580, VH = 260
const ML = 52, MR = 16, MT = 18, MB = 48
const IW = VW - ML - MR, IH = VH - MT - MB
const MAX_S = 80, MAX_J = 10000

const px = s  => ML + (s / MAX_S) * IW
const py = j  => MT + IH - (j / MAX_J) * IH

const revPath  = `M ${px(0)} ${py(0)} L ${px(MAX_S)} ${py(REV_SITE * MAX_S)}`
const costPath = `M ${px(0)} ${py(FIXED)} L ${px(MAX_S)} ${py(FIXED + VAR_SITE * MAX_S)}`
const beX = px(BE_SITES)
const beY = py(REV_SITE * BE_SITES)

const Y_TICKS = [0, 2000, 4000, 6000, 8000, 10000]
const X_TICKS = [0, 20, 40, 60, 80]

// ── Milestone timeline ─────────────────────────────────────────
const MILESTONES = [
  { period: 'Month 1–4',  icon: '🤝', label: 'Prospect qualification',    sub: 'Convert warm introductions into structured conversations. Qualify 8–12 sites.' },
  { period: 'Month 4–7',  icon: '📡', label: 'First pilot deployed',       sub: 'Controller installed. Telemetry live. Shadow-mode optimization running.' },
  { period: 'Month 11',   icon: '✅', label: 'First paying customer',      sub: 'Pilot converts. Verified savings report. Shared-savings contract signed.' },
  { period: 'Year 2',     icon: '⚡', label: 'Break-even: 15 sites',       sub: 'Monthly revenue covers all costs. Platform self-sustaining. No salaries needed.' },
]

// ── Per-site unit economics ─────────────────────────────────────
const UNIT = [
  { label: 'Revenue',    value: 'JOD 117',  sub: 'per site per month (blended)', color: '#0B7070' },
  { label: 'Cost',       value: 'JOD 30',   sub: 'cellular + cloud + hardware',  color: '#B45309' },
  { label: 'Margin',     value: '74%',      sub: 'gross — stable at every scale', color: '#15803D' },
]

// ── Sub-component: animated chart ─────────────────────────────
function BreakEvenChart() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  const lineAnim = (delay) => ({
    initial:  { pathLength: 0, opacity: 0 },
    animate:  inView ? { pathLength: 1, opacity: 1 } : {},
    transition: { delay, duration: 1.4, ease: 'easeInOut' },
  })

  return (
    <div ref={ref} className="w-full">
      <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" overflow="visible">

        {/* Chart background */}
        <rect x={ML} y={MT} width={IW} height={IH}
          fill="#FAFAF8" stroke="#E5E1DA" strokeWidth={0.8} rx={3} />

        {/* Y grid lines */}
        {Y_TICKS.filter(v => v > 0).map(v => (
          <line key={v} x1={ML} y1={py(v)} x2={ML + IW} y2={py(v)}
            stroke="#E5E1DA" strokeWidth={0.7} strokeDasharray="3,3" />
        ))}

        {/* Profit zone shading */}
        <motion.polygon
          points={`${beX},${beY} ${px(MAX_S)},${py(REV_SITE*MAX_S)} ${px(MAX_S)},${py(FIXED+VAR_SITE*MAX_S)}`}
          fill="#0B7070" opacity={0}
          animate={inView ? { opacity: 0.07 } : {}}
          transition={{ delay: 2.1, duration: 0.7 }}
        />

        {/* Fixed-cost reference (dashed) */}
        <motion.line
          x1={ML} y1={py(FIXED)} x2={ML + IW} y2={py(FIXED)}
          stroke="#B45309" strokeWidth={1} strokeDasharray="5,4" opacity={0}
          animate={inView ? { opacity: 0.4 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        />

        {/* Revenue line — teal */}
        <motion.path d={revPath} fill="none" stroke="#0B7070" strokeWidth={2.8} strokeLinecap="round"
          {...lineAnim(0.4)} />

        {/* Total cost line — amber */}
        <motion.path d={costPath} fill="none" stroke="#B45309" strokeWidth={2.8} strokeLinecap="round"
          {...lineAnim(0.7)} />

        {/* Break-even vertical marker */}
        <motion.line
          x1={beX} y1={MT} x2={beX} y2={MT + IH}
          stroke="#78716C" strokeWidth={1} strokeDasharray="4,3"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ delay: 1.9, duration: 0.4 }}
        />

        {/* Break-even dot */}
        <motion.circle cx={beX} cy={beY} r={7}
          fill="#FFFFFF" stroke="#0B7070" strokeWidth={2.5}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 2.0, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Break-even label */}
        <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2.1 }}>
          <text x={beX + 10} y={beY - 8} fontSize={9.5} fill="#0B7070"
            fontFamily="DM Mono,monospace" fontWeight="bold">Break-even</text>
          <text x={beX + 10} y={beY + 5} fontSize={9} fill="#0B7070"
            fontFamily="DM Mono,monospace">15 sites · Year 2</text>
        </motion.g>

        {/* Profit zone label */}
        <motion.text x={px(55)} y={py(5500)} fontSize={9} fill="#0B7070"
          fontFamily="DM Mono,monospace" fontStyle="italic"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 0.55 } : {}}
          transition={{ delay: 2.4 }}>
          profit zone →
        </motion.text>

        {/* Axes */}
        <line x1={ML} y1={MT} x2={ML} y2={MT + IH + 6} stroke="#B8AFA6" strokeWidth={1.3} />
        <line x1={ML} y1={MT + IH} x2={ML + IW + 6} y2={MT + IH} stroke="#B8AFA6" strokeWidth={1.3} />

        {/* Y-axis labels */}
        {Y_TICKS.map(v => (
          <text key={v} x={ML - 7} y={py(v) + 3.5} textAnchor="end"
            fontSize={8.5} fill="#78716C" fontFamily="DM Mono,monospace">
            {v === 0 ? '0' : `${v / 1000}K`}
          </text>
        ))}

        {/* X-axis labels */}
        {X_TICKS.map(v => (
          <text key={v} x={px(v)} y={MT + IH + 15} textAnchor="middle"
            fontSize={8.5} fill="#78716C" fontFamily="DM Mono,monospace">
            {v}
          </text>
        ))}

        {/* Axis titles */}
        <text x={ML + IW / 2} y={VH - 4} textAnchor="middle"
          fontSize={9} fill="#78716C" fontFamily="DM Sans,sans-serif">
          enrolled paying sites
        </text>
        <text transform={`translate(${ML - 40}, ${MT + IH / 2}) rotate(-90)`}
          textAnchor="middle" fontSize={9} fill="#78716C" fontFamily="DM Sans,sans-serif">
          JOD / month
        </text>

        {/* Legend */}
        <g transform={`translate(${ML + IW - 140}, ${MT + 12})`}>
          <line x1={0} y1={0} x2={18} y2={0} stroke="#0B7070" strokeWidth={2.5} />
          <text x={23} y={4} fontSize={8.5} fill="#0B7070" fontFamily="DM Mono,monospace">Revenue</text>
          <line x1={0} y1={15} x2={18} y2={15} stroke="#B45309" strokeWidth={2.5} />
          <text x={23} y={19} fontSize={8.5} fill="#B45309" fontFamily="DM Mono,monospace">Total cost</text>
          <line x1={0} y1={30} x2={18} y2={30} stroke="#B45309" strokeWidth={1}
            strokeDasharray="5,4" opacity={0.5} />
          <text x={23} y={34} fontSize={8.5} fill="#78716C" fontFamily="DM Mono,monospace">Fixed cost</text>
        </g>
      </svg>
    </div>
  )
}

export default function AskSection() {
  const { setChapter } = useScrollStore()
  useEffect(() => { setChapter(6) }, [setChapter])

  return (
    <section id="ask" className="min-h-screen bg-bg py-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p className="chapter-label mb-4">Chapter 06 — The Ask</p>
          <h2 className="display-heading text-4xl lg:text-5xl text-primary leading-tight">
            We break even at 15 sites.<br />
            <span style={{ color: '#0B7070' }}>That's Year 2.</span>
          </h2>
          <p className="text-muted mt-4 max-w-2xl leading-relaxed" style={{ fontSize: 'clamp(1rem,1.5vw,1.15rem)' }}>
            Bootstrapped. No founder salaries in Year 1. JOD 16,000 covers everything we need
            to run three pilots, land a first paying customer, and prove the model before asking for anything larger.
          </p>
        </motion.div>

        {/* KPI strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { label: 'Year 1 total budget',  value: 'JOD 16K',  sub: 'bootstrapped, no salaries',            color: '#0B7070' },
            { label: 'Sites to break-even',  value: '15',        sub: 'at blended JOD 117/site/month',       color: '#B45309' },
            { label: 'Gross margin',          value: '74%',       sub: 'stable from site 3 to site 80+',      color: '#15803D' },
          ].map((kpi, i) => (
            <div key={i} className="rounded-2xl border border-border bg-surface p-6 text-center">
              <p className="stat-number font-bold mb-1" style={{ fontSize: '2.4rem', color: kpi.color }}>
                {kpi.value}
              </p>
              <p className="text-xs font-semibold text-primary mb-0.5">{kpi.label}</p>
              <p className="text-xs text-muted">{kpi.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Break-even chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-border bg-surface p-6"
        >
          <p className="gold-label mb-1">Break-even analysis — Scenario A (bootstrapped)</p>
          <p className="text-muted text-sm mb-5">
            Revenue rises at JOD 117/site. Total cost rises at JOD 30/site from a JOD 1,300 fixed base.
            Lines cross at <strong className="text-primary">15 sites</strong>.
          </p>
          <BreakEvenChart />
        </motion.div>

        {/* Milestone timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="gold-label mb-6">What Year 1 actually buys</p>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-8 left-8 right-8 h-px bg-border hidden lg:block" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {MILESTONES.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3 }}
                  className="relative rounded-xl border border-border bg-surface p-5"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                    style={{ background: '#F1F0ED' }}>
                    {m.icon}
                  </div>
                  <p className="font-mono text-xs text-accent mb-1">{m.period}</p>
                  <p className="text-sm font-semibold text-primary mb-1 leading-snug">{m.label}</p>
                  <p className="text-xs text-muted leading-relaxed">{m.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Per-site unit economics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}
          className="rounded-2xl border border-border bg-surface p-6"
        >
          <p className="gold-label mb-5">One site — the unit economics</p>
          <div className="grid grid-cols-3 gap-4">
            {UNIT.map((u, i) => (
              <div key={i} className="text-center">
                <p className="stat-number font-bold mb-1"
                  style={{ fontSize: '2rem', color: u.color }}>{u.value}</p>
                <p className="text-sm font-semibold text-primary">{u.label}</p>
                <p className="text-xs text-muted mt-0.5">{u.sub}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-border text-center">
            <p className="text-sm text-primary font-semibold">
              Hardware payback per site: <span style={{ color: '#0B7070' }}>8 months</span>
            </p>
            <p className="text-xs text-muted mt-1">
              JOD 700 deployed cost ÷ JOD 87 monthly contribution = 8 months.
              The hardware is never the constraint.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
