import { motion } from 'framer-motion'

const MILESTONES = [
  {
    date: 'Jul 2024',
    title: 'Peak pricing goes mandatory',
    desc: 'EMRC activates Time-of-Use tariffs for all medium & large industry — the commercial trigger is live',
    done: true,
    hot: true,
    icon: '⚡',
  },
  {
    date: 'Nov 2024',
    title: 'Private batteries become legal',
    desc: 'Law amended — commercial battery storage stations now legally permitted to operate',
    done: true,
    hot: true,
    icon: '🔋',
  },
  {
    date: 'Jan 2025',
    title: 'Hotels, hospitals, banks added',
    desc: 'Peak pricing rules extended to the broader commercial sector — market doubles overnight',
    done: true,
    hot: false,
    icon: '🏨',
  },
  {
    date: '2024',
    title: 'US government backs the concept',
    desc: 'USTDA funds a VPP feasibility study with Kawar Energy — a pre-procurement signal from government',
    done: true,
    hot: false,
    icon: '🇺🇸',
  },
  {
    date: '→ 2030',
    title: '50% renewables — the finish line',
    desc: 'National strategy target: storage is structurally required to get there',
    done: false,
    hot: false,
    icon: '🎯',
  },
]

const nodeStyle = (m) => {
  if (!m.done) return {
    background: '#FEF9F0',
    border: '1.5px dashed #B45309',
  }
  if (m.hot) return {
    background: '#E8F5F5',
    border: '1.5px solid #0B7070',
    boxShadow: '0 0 10px rgba(11,112,112,0.18)',
  }
  return {
    background: '#F4F6F4',
    border: '1.5px solid #C8D4C8',
  }
}

const cardStyle = (m) => {
  if (!m.done) return {
    borderColor: 'rgba(180,83,9,0.2)',
    background: '#FFFCF7',
  }
  if (m.hot) return {
    borderColor: 'rgba(11,112,112,0.25)',
    background: '#F0FAFA',
  }
  return {
    borderColor: '#E5E1DA',
    background: '#FFFFFF',
  }
}

const dateColor = (m) => {
  if (!m.done) return '#B45309'
  if (m.hot) return '#0B7070'
  return '#78716C'
}

export default function PolicyRoadmap() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-6 py-6 overflow-y-auto">
      <p className="chapter-label mb-5">Jordan's energy policy — already locked in</p>

      <div className="relative">
        {/* Track line */}
        <div className="absolute left-[18px] top-5 bottom-5 w-px"
          style={{ background: 'linear-gradient(to bottom, #0B7070 65%, #B45309)' }} />

        <div className="space-y-2.5">
          {MILESTONES.map((m, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-3"
            >
              {/* Node */}
              <div className="flex-shrink-0 relative z-10 mt-0.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                  style={nodeStyle(m)}>
                  {m.icon}
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 border rounded-xl p-3 min-w-0 shadow-sm"
                style={cardStyle(m)}>
                <div className="flex items-baseline gap-2 flex-wrap mb-0.5">
                  <span className="font-mono text-xs font-bold flex-shrink-0"
                    style={{ color: dateColor(m) }}>
                    {m.date}
                  </span>
                  <span className="text-primary text-xs font-semibold leading-snug">{m.title}</span>
                </div>
                <p className="text-muted text-xs leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
