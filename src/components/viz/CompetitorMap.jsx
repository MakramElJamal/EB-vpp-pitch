import { motion } from 'framer-motion'

const W = 520, H = 430
const ML = 22, MR = 18, MT = 50, MB = 90
const IW = W - ML - MR   // 480
const IH = H - MT - MB   // 290

const toX = tx => ML + (tx + 6.2) / 12.4 * IW
const toY = ty => MT + (1 - (ty + 5.2) / 10.4) * IH

const CX = toX(0)   // 262
const CY = toY(0)   // 195

const DOTS = [
  // gray — international operators
  { tx:-4.5, ty: 4.0, fill:'#94A3B8', stroke:'#64748B', r:5.5, name:['Voltus'],                   lx:  0, ly:-13, anchor:'middle' },
  { tx:-3.2, ty: 3.6, fill:'#94A3B8', stroke:'#64748B', r:5.5, name:['CPower'],                   lx:  8, ly:-11, anchor:'start'  },
  { tx:-4.0, ty: 2.8, fill:'#94A3B8', stroke:'#64748B', r:5.5, name:['Next','Kraftwerke'],         lx: -9, ly: -5, anchor:'end'    },
  { tx:-3.0, ty:-2.2, fill:'#94A3B8', stroke:'#64748B', r:5.5, name:['Tesla Autobidder'],          lx:  0, ly: 15, anchor:'middle' },
  { tx:-1.5, ty:-3.8, fill:'#94A3B8', stroke:'#64748B', r:5.5, name:['Sonnen'],                   lx:  0, ly: 14, anchor:'middle' },
  // orange — regional precedent
  { tx: 1.5, ty:-0.8, fill:'#FB923C', stroke:'#EA580C', r:6,   name:['Blue Whale','Energy'],       lx: 10, ly: -5, anchor:'start'  },
  // amber — jordanian actor
  { tx: 1.0, ty:-2.8, fill:'#FBBF24', stroke:'#D97706', r:7,   name:['Kawar Energy'],             lx: 10, ly:  0, anchor:'start'  },
  // blue — our venture
  { tx: 4.2, ty: 3.2, fill:'#1E40AF', stroke:'#1E3A8A', r:12,  name:['Our Venture','(VPP Jordan)'], lx:-14, ly:-18, anchor:'end', bold:true },
]

const LEGEND = [
  { fill:'#94A3B8', stroke:'#64748B', r:5,   label:'International operator' },
  { fill:'#FB923C', stroke:'#EA580C', r:5.5, label:'Regional precedent'     },
  { fill:'#FBBF24', stroke:'#D97706', r:6,   label:'Jordanian actor'         },
  { fill:'#1E40AF', stroke:'#1E3A8A', r:8,   label:'Our venture'            },
]

export default function CompetitorMap() {
  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%" height="100%"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      role="img"
      aria-label="Competitive positioning map — VPP Jordan is alone in the asset-light, behind-the-meter quadrant"
    >
      {/* Our quadrant shading — top-right */}
      <rect x={CX} y={MT} width={ML + IW - CX} height={CY - MT}
        fill="#DBEAFE" opacity={0.55} rx={3} />

      {/* Subtle grid (skip axis lines) */}
      {[-4, -2, 2, 4].map(v => (
        <g key={v}>
          <line x1={toX(v)} y1={MT} x2={toX(v)} y2={MT + IH} stroke="#E5E1DA" strokeWidth={0.7} />
          <line x1={ML}    y1={toY(v)} x2={ML + IW} y2={toY(v)} stroke="#E5E1DA" strokeWidth={0.7} />
        </g>
      ))}

      {/* X axis */}
      <line x1={ML} y1={CY} x2={ML + IW + 6} y2={CY} stroke="#B8AFA6" strokeWidth={1.3} />
      <polygon points={`${ML+IW+6},${CY} ${ML+IW},${CY-4} ${ML+IW},${CY+4}`} fill="#B8AFA6" />

      {/* Y axis */}
      <line x1={CX} y1={MT + IH} x2={CX} y2={MT - 6} stroke="#B8AFA6" strokeWidth={1.3} />
      <polygon points={`${CX},${MT-6} ${CX-4},${MT} ${CX+4},${MT}`} fill="#B8AFA6" />

      {/* ── Axis endpoint labels — kept at chart edges, never in data area ── */}

      {/* Top of Y: Asset-Light */}
      <text x={CX} y={MT - 14} textAnchor="middle"
        fontSize={7} fill="#78716C" fontStyle="italic" fontFamily="DM Sans,sans-serif">
        Asset-Light / Software Platform
      </text>

      {/* Bottom of Y: Hardware-Led */}
      <text x={CX} y={MT + IH + 13} textAnchor="middle"
        fontSize={7} fill="#78716C" fontStyle="italic" fontFamily="DM Sans,sans-serif">
        Hardware-Led
      </text>

      {/* Left of X: Wholesale / Balancing — anchored to left edge */}
      <text textAnchor="start" fontSize={7} fill="#78716C" fontStyle="italic" fontFamily="DM Sans,sans-serif">
        <tspan x={ML + 4} y={CY + 13}>Wholesale /</tspan>
        <tspan x={ML + 4} y={CY + 22}>Balancing Markets</tspan>
      </text>

      {/* Right of X: Behind-the-Meter — anchored to right edge so it never encroaches left */}
      <text textAnchor="end" fontSize={7} fill="#78716C" fontStyle="italic" fontFamily="DM Sans,sans-serif">
        <tspan x={ML + IW - 4} y={CY + 13}>Behind-the-Meter /</tspan>
        <tspan x={ML + IW - 4} y={CY + 22}>Live Regulation</tspan>
      </text>

      {/* "First-mover white space" — in the empty zone of the shaded quadrant */}
      <text textAnchor="middle" fontSize={8} fill="#1E40AF" fontStyle="italic"
        opacity={0.55} fontFamily="DM Sans,sans-serif">
        <tspan x={(CX + ML + IW) / 2 - 15} y={155}>First-mover</tspan>
        <tspan x={(CX + ML + IW) / 2 - 15} y={166}>white space</tspan>
      </text>

      {/* Dots — animate in one by one */}
      {DOTS.map((dot, i) => (
        <motion.circle
          key={i}
          cx={toX(dot.tx)} cy={toY(dot.ty)} r={dot.r}
          fill={dot.fill} stroke={dot.stroke} strokeWidth={1}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.09, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* Dot labels */}
      {DOTS.map((dot, i) => {
        const bx = toX(dot.tx)
        const by = toY(dot.ty)
        return (
          <text key={`l${i}`}
            fontFamily="DM Mono,monospace"
            fontSize={dot.bold ? 8.5 : 7.5}
            fontWeight={dot.bold ? 'bold' : 'normal'}
            fill={dot.bold ? '#1E40AF' : '#4B5563'}
          >
            {dot.name.map((line, j) => (
              <tspan key={j} x={bx + dot.lx} y={by + dot.ly + j * 10} textAnchor={dot.anchor}>
                {line}
              </tspan>
            ))}
          </text>
        )
      })}

      {/* Legend — bottom-right */}
      {LEGEND.map((item, i) => (
        <g key={i} transform={`translate(${ML + IW - 148}, ${MT + IH + 22 + i * 16})`}>
          <circle cx={0} cy={0} r={item.r} fill={item.fill} stroke={item.stroke} strokeWidth={0.8} />
          <text x={13} y={4} fontSize={7.5} fill="#6B7280" fontFamily="DM Mono,monospace">
            {item.label}
          </text>
        </g>
      ))}
    </motion.svg>
  )
}
