import { motion } from 'framer-motion'

function DisconnectedField() {
  const dots = Array.from({ length: 55 }, (_, i) => ({
    cx: 4 + ((i * 13337 + i * i * 7) % 92),
    cy: 8 + ((i * 7919 + i * 31) % 84),
    r:  1.2 + (i % 4) * 0.5,
    dur: 1.4 + (i % 6) * 0.35,
    del: (i % 13) * 0.25,
  }))

  return (
    <svg viewBox="0 0 100 100" className="w-full" style={{ height: 200 }}
      role="img" aria-label="Disconnected battery sites across Jordan">
      {/* Faint connection attempts — broken dashes */}
      {dots.slice(0, 18).map((d, i) => {
        const t = dots[(i + 9) % 28]
        return (
          <line key={`l${i}`}
            x1={`${d.cx}%`} y1={`${d.cy}%`}
            x2={`${t.cx}%`}  y2={`${t.cy}%`}
            stroke="#0B7070" strokeWidth="0.25"
            strokeDasharray="1.5 5" opacity="0.18"
          />
        )
      })}

      {/* Dots — each pulsing independently (no sync = no coordination) */}
      {dots.map((d, i) => (
        <circle key={i} cx={`${d.cx}%`} cy={`${d.cy}%`} r={d.r} fill="#0B7070">
          <animate attributeName="opacity"
            values="0.1;0.75;0.1"
            dur={`${d.dur}s`} begin={`${d.del}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Central "missing link" ring */}
      <circle cx="50%" cy="50%" r="9" fill="none" stroke="#B45309"
        strokeWidth="0.6" strokeDasharray="2.5 3" opacity="0.5">
        <animate attributeName="opacity" values="0.25;0.7;0.25" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        fontSize="4.5" fill="#B45309" fontFamily="DM Mono" opacity="0.65">
        missing
      </text>
    </svg>
  )
}

export default function InsightViz() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 py-6 gap-5">
      <p className="gold-label">What is sitting idle right now</p>

      <DisconnectedField />

      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { val: '82,780', sub: 'sites installed', color: '#0B7070' },
          { val: '1 GW', sub: 'solar capacity', color: '#0B7070' },
          { val: 'ZERO', sub: 'coordination layer', color: '#EF4444' },
        ].map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="border border-border rounded-lg p-3 bg-surface"
          >
            <p className="stat-number font-bold text-lg leading-none" style={{ color: s.color }}>{s.val}</p>
            <p className="text-muted text-xs mt-1">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="border border-gold/20 rounded-lg p-4 bg-gold/5">
        <p className="text-gold text-sm font-medium">The hardware is charged and ready.</p>
        <p className="text-muted text-xs mt-1 leading-relaxed">
          No software exists to tell it when to fire. That is the entire gap — and it is ours to fill.
        </p>
      </motion.div>
    </div>
  )
}
