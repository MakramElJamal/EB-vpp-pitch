import { motion } from 'framer-motion'

const PHASES = [
  { phase: 'Now', years: 'Years 1–3', title: 'Help businesses save on peak electricity', desc: "Subscription + 10% of savings — executable today, no new law needed", color: '#0B7070' },
  { phase: 'Next', years: 'Years 3–5', title: 'Get paid by the grid operator too', desc: "As Jordan formalises grid flexibility rules, we aggregate our portfolio and earn from NEPCO — not just individual customers", color: '#B45309' },
  { phase: 'Later', years: 'Year 5+', title: 'Trade energy on open markets', desc: 'The platform participates in balancing markets directly — proven in Germany and Australia', color: '#60A5FA' },
]

export default function RevenueViz({ activeStep }) {
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 py-8">

      {/* Pricing card — step 0 */}
      {activeStep === 0 && (
        <motion.div key="pricing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <p className="chapter-label mb-2">Pricing — simple, aligned, low-risk</p>
          <div className="border border-border rounded-xl p-6 bg-surface space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="stat-number text-4xl text-gold font-bold">JOD 35</span>
              <span className="text-muted text-sm">/ site / month</span>
            </div>
            <p className="text-muted text-xs">A rounding error on a large electricity bill — never a procurement conversation</p>
            <div className="border-t border-border pt-4">
              <div className="flex items-baseline gap-2">
                <span className="stat-number text-2xl text-accent font-bold">+10%</span>
                <span className="text-muted text-sm">of whatever we save them</span>
              </div>
              <p className="text-muted text-xs mt-1">We earn more only when the customer saves more</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border border-success/30 rounded-lg bg-success/5">
            <span className="text-2xl font-mono font-bold text-success">74%</span>
            <div>
              <p className="text-sm text-primary font-medium">Gross margin — at every scale</p>
              <p className="text-xs text-muted">Software costs don't grow with more sites</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Customer savings breakdown — step 1 */}
      {activeStep === 1 && (
        <motion.div key="savings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <p className="chapter-label mb-2">What a site actually saves — and our share</p>

          {/* Flow diagram */}
          <div className="space-y-2">
            {[
              { label: 'Typical large C&I monthly electricity bill', val: 'JOD 5,000–15,000', color: '#7A84A8', icon: '🏭' },
              { label: 'Savings from avoiding peak prices', val: 'JOD 400–1,200 / mo', color: '#B45309', icon: '⬇' },
              { label: 'Our 10% performance fee', val: 'JOD 40–120 / mo', color: '#0B7070', icon: '→' },
              { label: 'Plus our flat subscription', val: '+ JOD 35 / mo', color: '#0B7070', icon: '+' },
            ].map((row, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                className="flex items-center gap-3 border border-border rounded-lg p-3 bg-surface"
                style={{ borderColor: row.color + '30' }}
              >
                <span className="text-lg w-7 text-center flex-shrink-0">{row.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-muted text-xs leading-snug">{row.label}</p>
                </div>
                <span className="font-mono text-xs font-bold flex-shrink-0" style={{ color: row.color }}>
                  {row.val}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="border border-accent/30 rounded-xl p-4 bg-accent/5 text-center">
            <p className="font-mono text-xs text-accent mb-1">Total per site per month</p>
            <p className="stat-number text-2xl text-primary font-bold">JOD 75–155</p>
            <p className="text-muted text-xs mt-1">at current site sizes — grows with portfolio</p>
          </motion.div>
        </motion.div>
      )}

      {/* NEPCO as client — step 2 */}
      {activeStep === 2 && (
        <motion.div key="nepco" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <p className="chapter-label mb-2">NEPCO is our next client</p>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="border border-border rounded-xl p-4 bg-surface space-y-2 shadow-sm">
            <p className="font-mono text-xs text-accent font-bold">Today — Commercial customers</p>
            <p className="text-primary text-sm font-medium">JOD 70–150 per site per month</p>
            <p className="text-muted text-xs leading-relaxed">
              1–3 pilot sites in Year 1. Each delivers a verified saving. Word of mouth grows the portfolio. Profitable from the start.
            </p>
          </motion.div>

          <div className="flex items-center gap-2 px-1">
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-xs text-muted">as the portfolio grows</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="border rounded-xl p-4 space-y-2"
            style={{ borderColor: '#B4530930', background: '#B4530908' }}>
            <p className="font-mono text-xs font-bold" style={{ color: '#B45309' }}>Next — NEPCO as a client</p>
            <p className="text-primary text-sm font-medium">Jordan's grid operator needs what we're building</p>
            <p className="text-muted text-xs leading-relaxed">
              NEPCO can't see or manage the thousands of batteries behind commercial meters — but they need to.
              As our portfolio grows, we become the only platform with that visibility.
              They become a client. That is a completely different revenue category.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="space-y-2 pt-1">
            <p className="chapter-label mb-2">Three phases of growth</p>
            {PHASES.map((p, i) => (
              <div key={i} className="border rounded-lg p-3 flex gap-3 bg-surface shadow-sm"
                style={{ borderColor: p.color + '30', borderLeftWidth: '3px', borderLeftColor: p.color }}>
                <div>
                  <div className="flex gap-2 items-baseline mb-0.5">
                    <span className="font-mono text-xs font-bold" style={{ color: p.color }}>{p.phase}</span>
                    <span className="text-muted text-xs">{p.years}</span>
                  </div>
                  <p className="text-primary text-xs font-semibold">{p.title}</p>
                  <p className="text-muted text-xs mt-0.5 leading-snug">{p.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
