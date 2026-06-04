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

export default function PolicyRoadmap() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-6 py-8 overflow-y-auto">
      <p className="chapter-label mb-6">Jordan's energy policy — already locked in</p>

      <div className="relative">
        {/* Track line */}
        <div className="absolute left-[18px] top-4 bottom-4 w-px"
          style={{ background: 'linear-gradient(to bottom, #0D9488 60%, #E8A838)' }} />

        <div className="space-y-3">
          {MILESTONES.map((m, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-3"
            >
              {/* Node */}
              <div className="flex-shrink-0 relative z-10 mt-0.5">
                {m.done ? (
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                    style={{
                      background: m.hot ? '#0D948820' : '#12121A',
                      border: `1.5px solid ${m.hot ? '#0D9488' : '#1E2D2C'}`,
                      boxShadow: m.hot ? '0 0 10px #0D948840' : 'none',
                    }}>
                    {m.icon}
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                    style={{ border: '1.5px dashed #E8A838', background: '#050810' }}>
                    {m.icon}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 border border-border rounded-xl p-3 bg-surface min-w-0"
                style={{
                  borderColor: m.done ? (m.hot ? '#0D948830' : '#1A2040') : '#E8A83830',
                  background: m.done ? (m.hot ? '#0D948808' : '#0C1022') : '#E8A83806',
                }}>
                <div className="flex items-baseline gap-2 flex-wrap mb-0.5">
                  <span className="font-mono text-xs font-bold flex-shrink-0"
                    style={{ color: m.done ? (m.hot ? '#0D9488' : '#7A84A8') : '#E8A838' }}>
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
