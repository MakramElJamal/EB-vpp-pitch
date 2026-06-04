import { motion } from 'framer-motion'

const STEPS = [
  {
    n: '01',
    label: 'What the customer already owns',
    desc: 'Solar panels + battery + inverter — already installed, already paid for. We activate it.',
    color: '#B45309',
    icon: '⚡',
  },
  {
    n: '02',
    label: 'Smart meters (already on site)',
    desc: "Government-mandated meters already installed. We connect through these — no new hardware, no installation team.",
    color: '#0B7070',
    icon: '📡',
  },
  {
    n: '03',
    label: 'Our scheduling software',
    desc: 'Plans each day\'s battery schedule overnight. Charges cheap. Releases at 5pm. Runs automatically.',
    color: '#0B7070',
    icon: '🧠',
  },
  {
    n: '04',
    label: 'Monthly savings report',
    desc: 'The CFO sees exactly how much was saved, verified against the real bill. We take 10% of that.',
    color: '#15803D',
    icon: '📋',
  },
]

export default function SolutionDiagram({ visibleLayers = 4 }) {
  return (
    <div className="w-full max-w-xl mx-auto px-6 py-8 space-y-3">
      <p className="chapter-label mb-5">How it works — four steps</p>

      {STEPS.slice(0, visibleLayers).map((step, i) => (
        <motion.div
          key={step.n}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-4 items-start border border-border rounded-xl p-4 bg-surface shadow-sm"
          style={{ borderLeftWidth: '3px', borderLeftColor: step.color }}
        >
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <span className="text-xl">{step.icon}</span>
            <span className="font-mono text-xs font-bold" style={{ color: step.color }}>{step.n}</span>
          </div>
          <div>
            <p className="text-primary text-sm font-semibold mb-0.5">{step.label}</p>
            <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
          </div>
        </motion.div>
      ))}

      {visibleLayers >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-3 p-4 rounded-xl text-center"
          style={{ background: '#0B707010', border: '1px solid #0B707030' }}
        >
          <p className="text-sm font-medium" style={{ color: '#0B7070' }}>
            "Zero new hardware. Zero upfront cost. The customer just pays when they save."
          </p>
        </motion.div>
      )}
    </div>
  )
}
