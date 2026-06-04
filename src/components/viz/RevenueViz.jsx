import { motion } from 'framer-motion'

const PHASES = [
  { phase: 'Now', years: 'Years 1–3', title: 'Help businesses save on peak electricity', desc: "Subscription + 10% of savings — executable today, no new law needed", color: '#0D9488' },
  { phase: 'Next', years: 'Years 3–5', title: 'Get paid by the grid operator too', desc: "As Jordan formalises grid flexibility rules, we aggregate our portfolio and earn from NEPCO — not just individual customers", color: '#E8A838' },
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
              <span className="stat-number text-4xl text-gold font-bold">JOD 30</span>
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
              { label: 'Savings from avoiding peak prices', val: 'JOD 400–1,200 / mo', color: '#E8A838', icon: '⬇' },
              { label: 'Our 10% performance fee', val: 'JOD 40–120 / mo', color: '#0D9488', icon: '→' },
              { label: 'Plus our flat subscription', val: '+ JOD 30 / mo', color: '#0D9488', icon: '+' },
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
            <p className="stat-number text-2xl text-primary font-bold">JOD 70–150</p>
            <p className="text-muted text-xs mt-1">at current site sizes — grows with portfolio</p>
          </motion.div>
        </motion.div>
      )}

      {/* NEPCO scenarios — step 2 */}
      {activeStep === 2 && (
        <motion.div key="scenarios" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <p className="chapter-label mb-2">Two paths — both viable</p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="border border-accent/30 rounded-xl p-4 bg-accent/5 space-y-2">
            <p className="font-mono text-xs text-accent font-bold">Without NEPCO</p>
            <p className="text-primary text-sm font-medium">Customer savings only — profitable from site 1</p>
            <p className="text-muted text-xs leading-relaxed">
              1–3 pilot sites in Year 1. Each delivers a verified saving, each generates a referral.
              The subscription model covers costs; the 10% fee builds with the portfolio.
              We do not need grid services to be a viable business.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="border border-gold/30 rounded-xl p-4 bg-gold/5 space-y-2">
            <p className="font-mono text-xs text-gold font-bold">With NEPCO — the upside case</p>
            <p className="text-primary text-sm font-medium">Grid services revenue multiplies the model</p>
            <p className="text-muted text-xs leading-relaxed">
              Every MW of aggregated battery capacity earns from grid flexibility services.
              50 sites ~ 1 MW ~ an additional JOD 30–80K per year on top of customer revenue.
              This is the phase that turns a profitable small business into a platform.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="space-y-3 pt-1">
            <p className="chapter-label mb-1">Three-phase revenue model</p>
            {PHASES.map((p, i) => (
              <div key={i} className="border rounded-lg p-3 flex gap-3"
                style={{ borderColor: p.color + '30', background: p.color + '06' }}>
                <span className="font-mono text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: p.color }}>{p.phase}</span>
                <div>
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
