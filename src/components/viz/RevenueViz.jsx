import { motion } from 'framer-motion'


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

      {/* Grid operator as client — step 2 */}
      {activeStep === 2 && (
        <motion.div key="gridop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 px-2">
          <p className="chapter-label">From software vendor to national infrastructure</p>

          {/* Two client cards */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              className="rounded-2xl p-5 space-y-3 border border-accent/20"
              style={{ background: '#0B707008' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: '#0B707018' }}>🏭</div>
              <div>
                <p className="font-mono text-xs font-bold text-accent mb-0.5">TODAY</p>
                <p className="text-primary text-sm font-semibold">Commercial clients</p>
                <p className="stat-number text-xl font-bold text-accent mt-1">JOD 75–155</p>
                <p className="text-muted text-xs mt-0.5">per site per month</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="rounded-2xl p-5 space-y-3 border"
              style={{ borderColor: '#B4530930', background: '#B4530908' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: '#B4530918' }}>⚡</div>
              <div>
                <p className="font-mono text-xs font-bold mb-0.5" style={{ color: '#B45309' }}>NEXT</p>
                <p className="text-primary text-sm font-semibold">Grid operator as a client</p>
                <p className="text-muted text-xs mt-1 leading-snug">
                  Legislators and grid operators need visibility into the batteries we already manage. We're the only platform that has it.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Arrow connector */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-xs text-muted">proven internationally</span>
            <div className="flex-1 h-px bg-border" />
          </motion.div>

          {/* Precedent flags */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="rounded-xl border border-border p-4 bg-surface">
            <p className="text-muted text-xs mb-3 leading-relaxed">
              Every VPP company that scaled globally did the same thing — private software,
              government partnership:
            </p>
            <div className="flex gap-3 flex-wrap">
              {[['🇩🇪', 'Germany'], ['🇸🇬', 'Singapore'], ['🇺🇸', 'USA']].map(([flag, country]) => (
                <div key={country} className="flex items-center gap-1.5 border border-border rounded-lg px-3 py-2 bg-bg">
                  <span className="text-lg">{flag}</span>
                  <span className="text-primary text-xs font-semibold">{country}</span>
                </div>
              ))}
            </div>
            <p className="font-mono text-xs mt-3" style={{ color: '#0B7070' }}>
              Jordan is next. We are building its version.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
