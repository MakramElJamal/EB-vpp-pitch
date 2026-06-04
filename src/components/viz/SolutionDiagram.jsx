import { motion } from 'framer-motion'

const LAYERS = [
  {
    id: 'asset',
    label: 'Asset Layer',
    sublabel: "Customer's existing PV + BESS + inverter",
    why: "We don't sell hardware — zero CAPEX friction",
    color: '#E8A838',
    icon: '⚡',
    icons: ['☀️', '🔋', '🔌'],
  },
  {
    id: 'edge',
    label: 'Edge Layer',
    sublabel: 'IoT controller · JOD 700/site · Teltonika RUT956',
    why: 'On-site telemetry + dispatch commands · physical override always with customer',
    color: '#60A5FA',
    icon: '📡',
    icons: ['📡', '🖥️', '🔒'],
  },
  {
    id: 'platform',
    label: 'Platform Layer',
    sublabel: 'Cloud dispatch engine — forecasts load & solar',
    why: 'The intelligence layer that doesn\'t exist today',
    color: '#0D9488',
    icon: '☁️',
    icons: ['☁️', '⚙️', '📊'],
  },
  {
    id: 'customer',
    label: 'Customer Layer',
    sublabel: 'Web dashboard + automated monthly JOD savings report',
    why: 'Makes the value undeniable and defensible to the CFO',
    color: '#22C55E',
    icon: '📈',
    icons: ['📱', '📋', '✅'],
  },
]

export default function SolutionDiagram({ visibleLayers = 4 }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-10 space-y-3">
      {LAYERS.slice(0, visibleLayers).map((layer, i) => (
        <motion.div
          key={layer.id}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="border rounded-xl p-5 flex gap-4 items-start"
          style={{
            borderColor: layer.color + '40',
            background: `linear-gradient(135deg, ${layer.color}08, transparent)`,
          }}
        >
          <div
            className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
            style={{ background: layer.color + '20' }}
          >
            {layer.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-mono uppercase tracking-widest"
                style={{ color: layer.color }}
              >
                {layer.label}
              </span>
            </div>
            <p className="text-primary text-sm font-medium mb-1">{layer.sublabel}</p>
            <p className="text-muted text-xs leading-relaxed">{layer.why}</p>
          </div>
        </motion.div>
      ))}

      {visibleLayers >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-4 p-4 border border-accent/20 rounded-lg bg-accent/5 text-center"
        >
          <p className="text-accent text-sm font-medium">
            "We are the software layer that makes existing hardware perform as originally promised."
          </p>
        </motion.div>
      )}
    </div>
  )
}
