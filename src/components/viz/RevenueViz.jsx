import { motion } from 'framer-motion'
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'

const MILESTONES = [
  { label: 'Year 1', sites: 3, rev: 3600, revLabel: '~JOD 3–4K', note: 'Proof of concept phase' },
  { label: 'Year 2–3', sites: 20, rev: 24000, revLabel: '~JOD 24K', note: 'Early traction, word-of-mouth' },
  { label: 'Year 5', sites: 90, rev: 108000, revLabel: '~JOD 108K', note: 'Phase 1 mature portfolio' },
]

const PHASES = [
  { phase: 'Now', years: 'Years 1–3', title: 'Help businesses save on peak electricity', desc: 'Executable today — no new law needed, no hardware sales, just software subscriptions', color: '#0D9488' },
  { phase: 'Next', years: 'Years 3–5', title: 'Get paid by the grid operator too', desc: "As Jordan formalises grid flexibility rules, we aggregate our portfolio and earn from the national grid — not just individual customers", color: '#E8A838' },
  { phase: 'Later', years: 'Year 5+', title: 'Trade energy on open markets', desc: 'The platform participates in balancing markets directly — the model proven in Germany and Australia', color: '#60A5FA' },
]

export default function RevenueViz({ activeStep }) {
  const maxRev = 156000

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 py-8">
      {activeStep === 0 && (
        <motion.div key="pricing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <p className="chapter-label mb-2">Pricing — simple, aligned, low-risk</p>
          <div className="border border-border rounded-xl p-6 bg-surface space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="stat-number text-4xl text-gold font-bold">JOD 30</span>
              <span className="text-muted text-sm">/ site / month</span>
            </div>
            <p className="text-muted text-xs">A rounding error on a large electricity bill — never a procurement conversation</p>
            <div className="border-t border-border pt-4">
              <div className="flex items-baseline gap-2">
                <span className="stat-number text-2xl text-accent font-bold">+10%</span>
                <span className="text-muted text-sm">of whatever we save them</span>
              </div>
              <p className="text-muted text-xs mt-1">We earn more only when the customer saves more — interests fully aligned</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border border-success/30 rounded-lg bg-success/5">
            <span className="text-2xl font-mono font-bold text-success">74%</span>
            <div>
              <p className="text-sm text-primary font-medium">Gross margin — at every scale</p>
              <p className="text-xs text-muted">Software costs don't grow with the number of sites</p>
            </div>
          </div>
        </motion.div>
      )}

      {activeStep === 1 && (
        <motion.div key="milestones" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <p className="chapter-label mb-2">Revenue trajectory — Phase 1 only</p>
          <p className="text-muted text-xs mb-4 leading-relaxed">These are intentionally conservative — proving the model matters more than hitting a number in year one.</p>
          {MILESTONES.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="space-y-1"
            >
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-primary font-medium">{m.label}</span>
                <span className="font-mono text-sm text-muted">{m.revLabel}</span>
              </div>
              <div className="h-1.5 bg-surface rounded-full overflow-hidden border border-border">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: '#1A5C58' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(m.rev / maxRev) * 100}%` }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <p className="text-xs text-muted">{m.sites} sites · {m.note}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeStep === 2 && (
        <motion.div key="phases" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <p className="chapter-label mb-2">Three-phase revenue model</p>
          {PHASES.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="border rounded-lg p-4"
              style={{ borderColor: p.color + '40', background: p.color + '08' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold" style={{ color: p.color }}>{p.phase}</span>
                <span className="text-muted text-xs">{p.years}</span>
              </div>
              <p className="text-primary text-sm font-medium">{p.title}</p>
              <p className="text-muted text-xs mt-0.5 leading-snug">{p.desc}</p>
            </motion.div>
          ))}
          <p className="text-muted text-xs italic text-center pt-2">
            "Start with one customer saving money. Build from there."
          </p>
        </motion.div>
      )}
    </div>
  )
}
