import { motion } from 'framer-motion'
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'

const STATS = [
  { value: 82780, unit: '', label: 'distributed PV systems\nin Jordan', color: '#0D9488' },
  { value: 25, unit: '%', label: 'ToU tariff differential\nexploitable right now', color: '#E8A838' },
  { value: 0, unit: '', label: 'direct VPP competitors\nin all of MENA', color: '#22C55E' },
]

const TIMELINE = [
  { date: 'Jul 2024', event: 'EMRC activates mandatory ToU tariffs for medium & large industry', hot: true },
  { date: 'Nov 2024', event: 'Law 13/2012 amended — private-sector BESS stations legally permitted', hot: true },
  { date: 'Jan 2025', event: 'ToU extended to hotels, hospitals, water pumping, banking sectors', hot: false },
  { date: '2024', event: 'USTDA-funded VPP feasibility study with Kawar Energy — government pre-procurement signal', hot: false },
  { date: '→ 2030', event: 'MEMR National Strategy: 50% renewables — storage structurally required', hot: false },
]

function AnimStat({ value, unit, label, color, animate }) {
  const count = useAnimatedCounter(value, 1400, animate)
  return (
    <div className="flex flex-col gap-2 text-center">
      <span className="stat-number font-bold" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', color }}>
        {count.toLocaleString()}{unit}
      </span>
      <span className="text-muted text-sm leading-snug whitespace-pre-line">{label}</span>
    </div>
  )
}

export default function TractionViz({ activeStep }) {
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 py-8">
      {activeStep === 0 && (
        <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <p className="chapter-label mb-6">The numbers that make this executable today</p>
          <div className="grid grid-cols-1 gap-8">
            {STATS.map((s, i) => (
              <AnimStat key={i} {...s} animate />
            ))}
          </div>
        </motion.div>
      )}

      {activeStep === 1 && (
        <motion.div key="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <p className="chapter-label mb-4">Regulatory Evidence — not hope, actual policy</p>
          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-3 items-start"
            >
              <span
                className="font-mono text-xs pt-0.5 flex-shrink-0 w-14"
                style={{ color: item.hot ? '#E8A838' : '#7A84A8' }}
              >
                {item.date}
              </span>
              <div className="flex items-start gap-2 flex-1">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: item.hot ? '#E8A838' : '#1A2040' }}
                />
                <p className="text-sm text-muted leading-snug">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeStep === 2 && (
        <motion.div key="mandate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <p className="gold-label">The Investor's Key Insight</p>
          <div className="border-l-2 border-gold pl-6">
            <p className="serif-body text-xl xl:text-2xl text-primary leading-relaxed">
              "BESS adoption is not a bet we're making. It's being mandated from above by national energy policy."
            </p>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Our SOM is conservative — the market is being legislated into existence. Every year that passes without a software layer is a year of compounding underperformance for Jordan's grid.
          </p>
        </motion.div>
      )}
    </div>
  )
}
