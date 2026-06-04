import { motion } from 'framer-motion'
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'

const MILESTONES = [
  { label: 'End Year 1', sites: 3, rev: 4200, revLabel: 'JOD 4,200' },
  { label: 'Mid Year 2', sites: 20, rev: 28000, revLabel: 'JOD 28,000' },
  { label: 'Year 5 SOM', sites: 90, rev: 156000, revLabel: 'JOD 156K' },
]

const PHASES = [
  { phase: 'Phase 1', years: 'Years 1–3+', title: 'C&I ToU optimisation', desc: 'Executable today under current law', color: '#0D9488' },
  { phase: 'Phase 2', years: 'Years 3–5', title: 'Formal demand response', desc: 'USD 2.5–5M/yr at 50 MW — unlocked when EMRC issues aggregator framework', color: '#E8A838' },
  { phase: 'Phase 3', years: 'Year 5+', title: 'Ancillary services & balancing', desc: 'The Next Kraftwerke model — pricing into open markets', color: '#60A5FA' },
]

export default function RevenueViz({ activeStep }) {
  const maxRev = 156000

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 py-8">
      {activeStep === 0 && (
        <motion.div key="pricing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <p className="chapter-label mb-2">Pricing — zero friction, aligned incentives</p>
          <div className="border border-border rounded-xl p-6 bg-surface space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="stat-number text-4xl text-gold font-bold">JOD 35</span>
              <span className="text-muted text-sm">/ site / month</span>
            </div>
            <p className="text-muted text-xs">= 0.2% of a typical industrial bill — never a budget conversation</p>
            <div className="border-t border-border pt-4">
              <div className="flex items-baseline gap-2">
                <span className="stat-number text-2xl text-accent font-bold">+10%</span>
                <span className="text-muted text-sm">of verified savings</span>
              </div>
              <p className="text-muted text-xs mt-1">Performance fee — we earn only when they save</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border border-success/30 rounded-lg bg-success/5">
            <span className="text-2xl font-mono font-bold text-success">74%</span>
            <div>
              <p className="text-sm text-primary font-medium">Gross margin</p>
              <p className="text-xs text-muted">Software economics, not hardware economics</p>
            </div>
          </div>
        </motion.div>
      )}

      {activeStep === 1 && (
        <motion.div key="milestones" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <p className="chapter-label mb-2">Revenue milestones — Phase 1</p>
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
                <span className="font-mono text-sm text-gold">{m.revLabel}</span>
              </div>
              <div className="h-2 bg-surface rounded-full overflow-hidden border border-border">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: '#0D9488' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(m.rev / maxRev) * 100}%` }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <p className="text-xs text-muted">{m.sites} sites</p>
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
            "Phase 1 builds the asset. Phase 2 monetises it. Phase 3 prices it into a market."
          </p>
        </motion.div>
      )}
    </div>
  )
}
