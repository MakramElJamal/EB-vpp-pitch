import { motion } from 'framer-motion'

const ADVANTAGES = [
  {
    n: '01',
    title: 'Tariff-native by default',
    desc: 'Our dispatch engine is calibrated to Jordan\'s specific ToU bands (17:00–23:00), fils-per-kWh structure, and Bylaw 58 export rules. Every international competitor would need a complete rebuild.',
    color: '#0D9488',
  },
  {
    n: '02',
    title: 'Zero upfront cost',
    desc: '10% performance fee on verified savings only. Removes the procurement-cycle friction that kills industrial pilots in Jordan, where CFOs treat unproven capital commitments with extreme caution.',
    color: '#E8A838',
  },
  {
    n: '03',
    title: 'Non-invasive, override-protected',
    desc: 'Physical off-switch always with the customer. The single argument that reliably addresses the production-uptime objection from risk-averse energy managers.',
    color: '#60A5FA',
  },
  {
    n: '04',
    title: 'Cultural & relationship capital',
    desc: 'Industrial sales in Jordan are closed at the plant, through trusted introductions, not a demo call. We are insiders. No foreign entrant can buy this.',
    color: '#A78BFA',
  },
  {
    n: '05',
    title: 'Portfolio data compounds',
    desc: 'Every additional site improves the forecasting model for every other site. Accuracy advantage grows with the portfolio. A new entrant inherits that disadvantage permanently.',
    color: '#22C55E',
  },
]

export default function MoatViz({ activeStep }) {
  const visible = Math.min(activeStep + 2, ADVANTAGES.length)

  return (
    <div className="w-full h-full flex flex-col justify-center px-6 py-8 overflow-y-auto">
      <p className="chapter-label mb-6">Structural advantages a foreign entrant cannot replicate</p>
      <div className="space-y-3">
        {ADVANTAGES.slice(0, visible).map((adv, i) => (
          <motion.div
            key={adv.n}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="border rounded-lg p-4"
            style={{ borderColor: adv.color + '30', background: adv.color + '06' }}
          >
            <div className="flex items-start gap-3">
              <span
                className="font-mono text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ color: adv.color }}
              >
                {adv.n}
              </span>
              <div>
                <p className="text-primary text-sm font-semibold mb-0.5">{adv.title}</p>
                <p className="text-muted text-xs leading-relaxed">{adv.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
