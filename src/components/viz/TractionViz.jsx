import { motion } from 'framer-motion'
import PolicyRoadmap from './PolicyRoadmap'

export default function TractionViz({ activeStep }) {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      {activeStep === 0 && (
        <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="px-8 py-8 space-y-7">

          {/* Hero number */}
          <div className="text-center">
            <p className="chapter-label mb-3">VPP competitors operating in MENA today</p>
            <p className="stat-number font-bold leading-none" style={{ fontSize: 'clamp(5rem,11vw,7.5rem)', color: '#22C55E' }}>
              0
            </p>
            <p className="text-muted text-sm mt-3 max-w-xs mx-auto leading-relaxed">
              No commercial operator. No reference customer. No established relationship.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-xs text-muted">why we fill it first</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Competitive advantages */}
          <div className="space-y-2.5">
            {[
              { icon: '🎯', label: 'Built for Jordan\'s exact rules', note: 'Any international competitor entering MENA would rebuild their entire software stack to match EMRC tariffs. We already did.' },
              { icon: '✅', label: 'Legal to operate today — no approval needed', note: 'Behind-the-meter optimisation is fully permitted. We don\'t need a regulatory relationship to get the first customer.' },
              { icon: '🏆', label: 'First verified saving is permanent capital', note: 'Industrial buyers in Jordan trust one thing: a peer who says it worked. That reference can\'t be bought back.' },
            ].map((adv, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
                className="flex gap-3 items-start border border-border rounded-xl p-3.5 bg-surface shadow-sm"
              >
                <span className="text-base flex-shrink-0 mt-0.5">{adv.icon}</span>
                <div>
                  <p className="text-primary text-sm font-semibold leading-snug mb-0.5">{adv.label}</p>
                  <p className="text-muted text-xs leading-relaxed">{adv.note}</p>
                </div>
              </motion.div>
            ))}
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
