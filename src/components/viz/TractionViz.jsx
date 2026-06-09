import { motion } from 'framer-motion'
import PolicyRoadmap from './PolicyRoadmap'
import CompetitorMap from './CompetitorMap'

export default function TractionViz({ activeStep }) {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      {activeStep === 0 && (
        <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="w-full h-full flex flex-col px-6 pt-6 pb-4 gap-3">

          {/* Compact 0-competitor banner */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <p className="stat-number font-bold leading-none" style={{ fontSize: '3.8rem', color: '#22C55E' }}>0</p>
            <div>
              <p className="text-primary text-sm font-semibold">VPP competitors in MENA today</p>
              <p className="text-muted text-xs">No commercial operator. No reference customer.</p>
            </div>
          </div>

          {/* Positioning map */}
          <div className="flex-1 min-h-0">
            <CompetitorMap />
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
