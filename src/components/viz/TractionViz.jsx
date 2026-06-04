import { motion } from 'framer-motion'
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'
import PolicyRoadmap from './PolicyRoadmap'

const STATS = [
  { value: 82780, unit: '', label: 'battery sites already installed\nwaiting for coordination', color: '#0B7070' },
  { value: 25,    unit: '%', label: 'peak pricing premium\nexploitable right now', color: '#B45309' },
  { value: 0,     unit: '', label: 'VPP competitors\noperating in MENA today', color: '#22C55E' },
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
    <div className="w-full h-full flex flex-col justify-center">
      {activeStep === 0 && (
        <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="px-8 py-8 space-y-8">
          <p className="chapter-label">Every condition for this to work is already met</p>
          <div className="grid grid-cols-1 gap-8">
            {STATS.map((s, i) => <AnimStat key={i} {...s} animate />)}
          </div>
        </motion.div>
      )}

      {activeStep === 1 && (
        <motion.div key="roadmap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="w-full h-full">
          <PolicyRoadmap />
        </motion.div>
      )}

      {activeStep === 2 && (
        <motion.div key="mandate" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="px-8 py-8 space-y-6">
          <p className="gold-label">The first-mover window is narrow</p>
          <div className="border-l-2 border-gold pl-6">
            <p className="serif-body text-xl xl:text-2xl text-primary leading-relaxed">
              "Storage adoption is not a bet we are making. It is being mandated from above."
            </p>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            No MENA competitor operates commercially today. The regulations are live. The hardware is installed. The first software layer to connect them wins a market that cannot exist without it.
          </p>
        </motion.div>
      )}
    </div>
  )
}
