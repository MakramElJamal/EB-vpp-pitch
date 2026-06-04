import { motion } from 'framer-motion'

const ADVANTAGES = [
  {
    n: '01',
    title: 'Built for Jordan — not adapted for it',
    desc: 'Our software is built around the exact peak pricing hours and rates that apply in Jordan. Any international competitor entering this market would need to rebuild from scratch.',
    color: '#0B7070',
  },
  {
    n: '02',
    title: 'No upfront cost removes every barrier',
    desc: "JOD 30/month never reaches a procurement committee. And since we take 10% of savings only, if we don't deliver value, we don't earn extra. Customers have nothing to lose.",
    color: '#B45309',
  },
  {
    n: '03',
    title: 'Non-invasive — customer stays in control',
    desc: 'We connect through existing meters. Physical off-switch stays with the customer at all times. The single answer that removes every operations concern.',
    color: '#60A5FA',
  },
  {
    n: '04',
    title: 'Relationships that cannot be bought',
    desc: 'Industrial decisions in Jordan happen through trusted introductions — at the plant, in person. We have those relationships. No foreign entrant can replicate this with a budget.',
    color: '#A78BFA',
  },
  {
    n: '05',
    title: 'Our data gets smarter with every new site',
    desc: 'Every site we add improves our forecasting for every other site. A new competitor starts with none of that. The accuracy gap widens permanently.',
    color: '#15803D',
  },
]

export default function MoatViz({ activeStep }) {
  const visible = Math.min(activeStep + 2, ADVANTAGES.length)

  return (
    <div className="w-full h-full flex flex-col justify-center px-6 py-6 overflow-y-auto">
      <p className="chapter-label mb-4">Why this is hard to copy</p>
      <div className="space-y-2.5">
        {ADVANTAGES.slice(0, visible).map((adv, i) => (
          <motion.div
            key={adv.n}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="border border-border rounded-xl p-4 bg-surface shadow-sm flex gap-3"
            style={{ borderLeftWidth: '3px', borderLeftColor: adv.color }}
          >
            <span className="font-mono text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: adv.color }}>
              {adv.n}
            </span>
            <div>
              <p className="text-primary text-sm font-semibold mb-0.5">{adv.title}</p>
              <p className="text-muted text-xs leading-relaxed">{adv.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
