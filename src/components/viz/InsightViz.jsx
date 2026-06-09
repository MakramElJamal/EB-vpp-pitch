import { motion } from 'framer-motion'

const HOUR_COLORS = Array.from({ length: 24 }, (_, h) => {
  if (h >= 17 && h <= 22) return '#B45309'
  if ((h >= 14 && h <= 16) || h === 23 || h <= 4) return '#D97706'
  return '#0B7070'
})

export default function InsightViz() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 py-6 gap-7">
      <div>
        <p className="gold-label mb-2">The daily pattern — 82,780 sites, same story</p>
        <p className="text-primary text-base font-medium leading-snug">
          Every day at 17:00, a 6-hour window opens.<br />
          Every battery should be ready for it.
        </p>
      </div>

      {/* 24-hour bar */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex gap-px rounded-md overflow-hidden" style={{ height: 28 }}>
          {HOUR_COLORS.map((c, h) => (
            <div key={h} className="flex-1 relative group" style={{ background: c + '55' }}>
              {/* Highlight peak */}
              {h >= 17 && h <= 22 && (
                <div className="absolute inset-0" style={{ background: c }} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-muted" style={{ fontSize: '0.65rem' }}>00:00</span>
          <span className="font-mono" style={{ fontSize: '0.65rem', color: '#B45309' }}>17:00 →</span>
          <span className="font-mono" style={{ fontSize: '0.65rem', color: '#B45309' }}>← 23:00</span>
          <span className="font-mono text-muted" style={{ fontSize: '0.65rem' }}>24:00</span>
        </div>
      </motion.div>

      {/* What should happen vs reality */}
      <div className="space-y-3">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="border rounded-xl p-4 bg-surface shadow-sm"
          style={{ borderColor: '#0B707030', borderLeftWidth: 3, borderLeftColor: '#0B7070' }}>
          <p className="font-mono text-xs font-bold mb-1" style={{ color: '#0B7070' }}>OPTIMAL — what should happen</p>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="h-2.5 rounded-full flex-1" style={{ background: 'linear-gradient(90deg, #0B7070 60%, #B4530940 60%)' }} />
              </div>
              <p className="text-muted text-xs">Charge during cheap hours → full at 17:00 → run site through peak</p>
            </div>
            <div className="flex-shrink-0 text-center">
              <p className="stat-number text-lg font-bold" style={{ color: '#0B7070' }}>100%</p>
              <p className="font-mono text-xs text-muted">at 17:00</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
          className="border rounded-xl p-4 bg-surface shadow-sm"
          style={{ borderColor: '#B4530930', borderLeftWidth: 3, borderLeftColor: '#B45309' }}>
          <p className="font-mono text-xs font-bold mb-1" style={{ color: '#B45309' }}>REALITY — what actually happens</p>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="h-2.5 rounded-full flex-1" style={{ background: 'linear-gradient(90deg, #B45309 28%, #B4530920 28%)' }} />
              </div>
              <p className="text-muted text-xs">Battery at random charge level → no plan → peak window wasted</p>
            </div>
            <div className="flex-shrink-0 text-center">
              <p className="stat-number text-lg font-bold" style={{ color: '#B45309' }}>~28%</p>
              <p className="font-mono text-xs text-muted">at 17:00</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom stat */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
        className="rounded-xl p-4 text-center"
        style={{ background: '#B4530910', border: '1px solid #B4530930' }}>
        <p className="stat-number text-2xl font-bold" style={{ color: '#B45309' }}>496,680</p>
        <p className="text-muted text-sm mt-1">battery-hours wasted across Jordan <em>every single day</em></p>
        <p className="font-mono text-xs mt-1" style={{ color: '#B45309' }}>82,780 sites × 6 hours</p>
      </motion.div>
    </div>
  )
}
