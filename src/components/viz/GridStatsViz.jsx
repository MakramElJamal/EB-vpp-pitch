import { motion } from 'framer-motion'
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'

function Stat({ value, unit, label, color = 'accent', delay = 0, animate = true }) {
  const count = useAnimatedCounter(value, 1400, animate)
  const colorClass = color === 'gold' ? 'text-gold' : color === 'danger' ? 'text-danger' : 'text-accent'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="flex flex-col gap-1"
    >
      <span className={`stat-number text-4xl xl:text-5xl font-bold ${colorClass}`}>
        {count.toLocaleString()}{unit}
      </span>
      <span className="text-muted text-sm leading-snug">{label}</span>
    </motion.div>
  )
}

export default function GridStatsViz({ activeStep }) {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-10 px-10">
      {activeStep === 0 && (
        <motion.div
          key="plant"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
        >
          <p className="chapter-label">The Plant Manager's Reality</p>
          <Stat value={34} unit="%" label="Peak electricity premium (17:00–23:00 daily)" color="gold" animate />
          <Stat value={20} unit="–25%" label="of available monthly savings left unrealised" color="danger" delay={0.2} animate />
          <div className="mt-4 p-4 border border-border rounded-lg bg-surface">
            <p className="text-sm text-muted leading-relaxed">
              <span className="text-primary font-medium">The CFO already approved the battery.</span>{' '}
              He was told it would pay back in 4 years. It isn't. Without scheduling software, the battery misses the peak window every evening.
            </p>
          </div>
        </motion.div>
      )}

      {activeStep === 1 && (
        <motion.div
          key="grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
        >
          <p className="chapter-label">NEPCO's Grid Problem</p>
          <Stat value={26.9} unit="%" label="Current renewable share — target is 50% by 2030" color="accent" animate />
          <Stat value={2209460} unit="" label="Smart meters installed — 91.3% of all commercial & residential meters" color="danger" delay={0.2} animate />
          <Stat value={82780} unit="" label="Rooftop PV systems installed — invisible to grid control" color="gold" delay={0.4} animate />
        </motion.div>
      )}

      {activeStep === 2 && (
        <motion.div
          key="insight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <p className="gold-label">The Non-Obvious Insight</p>
          <div className="border-l-2 border-accent pl-6">
            <p className="serif-body text-2xl xl:text-3xl text-primary leading-relaxed">
              "The asset base already exists."
            </p>
          </div>
          <p className="text-muted leading-relaxed">
            Jordan doesn't need more batteries.{' '}
            <span className="text-primary">It needs someone to coordinate the ones already there.</span>
          </p>
          <p className="text-muted leading-relaxed text-sm">
            1 GW of rooftop solar, thousands of BESS units — all idle during the peak window that costs
            commercial sites 34% more per kWh. The problem is <em>purely software</em>.
          </p>
        </motion.div>
      )}
    </div>
  )
}
