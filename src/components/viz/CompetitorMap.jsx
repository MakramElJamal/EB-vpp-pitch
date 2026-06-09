import { motion } from 'framer-motion'

const W = 500, H = 370
const ML = 22, MR = 18, MT = 38, MB = 52
const IW = W - ML - MR   // 460
const IH = H - MT - MB   // 280

const toX = (tx) => ML + (tx + 6.2) / 12.4 * IW
const toY = (ty) => MT + (1 - (ty + 5.2) / 10.4) * IH

const CX = toX(0)   // ~22 + 230 = 252
const CY = toY(0)   // ~38 + 140 = 178

const DOTS = [
  // International operators — gray
  { tx: -4.5, ty:  4.0, fill: '#94A3B8', stroke: '#64748B', r: 5.5, lines: ['Voltus'],            lx: 0,   ly: -12, anchor: 'middle' },
  { tx: -3.2, ty:  3.6, fill: '#94A3B8', stroke: '#64748B', r: 5.5, lines: ['CPower'],            lx: 8,   ly: -9,  anchor: 'start' },
  { tx: -4.0, ty:  2.8, fill: '#94A3B8', stroke: '#64748B', r: 5.5, lines: ['Next','Kraftwerke'], lx: -9,  ly: 0,   anchor: 'end' },
  { tx: -3.0, ty: -2.2, fill: '#94A3B8', stroke: '#64748B', r: 5.5, lines: ['Tesla Autobidder'],  lx: 0,   ly: 14,  anchor: 'middle' },
  { tx: -1.5, ty: -3.8, fill: '#94A3B8', stroke: '#64748B', r: 5.5, lines: ['Sonnen'],            lx: 0,   ly: 14,  anchor: 'middle' },
  // Regional precedent — orange
  { tx:  1.5, ty: -0.8, fill: '#FB923C', stroke: '#EA580C', r: 6,   lines: ['Blue Whale','Energy'], lx: 9, ly: -4,  anchor: 'start' },
  // Jordanian actor — amber
  { tx:  1.0, ty: -2.8, fill: '#FBBF24', stroke: '#D97706', r: 7,   lines: ['Kawar Energy'],       lx: 10, ly: 0,   anchor: 'start' },
  // Our venture — navy blue, prominent
  { tx:  4.2, ty:  3.2, fill: '#1E40AF', stroke: '#1E3A8A', r: 12,  lines: ['Our Venture','(VPP Jordan)'], lx: -15, ly: -17, anchor: 'end', bold: true },
]

function Label({ dot }) {
  const bx = toX(dot.tx)
  const by = toY(dot.ty)
  const lcolor = dot.bold ? '#1E40AF' : '#64748B'
  const fs = dot.bold ? 9 : 7.5
  return (
    <text fontFamily="DM Mono, monospace" fontSize={fs} fontWeight={dot.bold ? 'bold' : 'normal'} fill={lcolor}>
      {dot.lines.map((line, i) => (
        <tspan key={i} x={bx + dot.lx} y={by + dot.ly + i * 10} textAnchor={dot.anchor}>
          {line}
        </tspan>
      ))}
    </text>
  )
}

export default function CompetitorMap() {
  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%" height="100%"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      role="img"
      aria-label="Competitive positioning map showing VPP Jordan in the unoccupied asset-light / behind-the-meter quadrant"
    >
      {/* Our quadrant shading — top-right */}
      <rect
        x={CX} y={MT}
        width={ML + IW - CX} height={CY - MT}
        fill="#DBEAFE" opacity={0.55} rx={4}
      />

      {/* Subtle grid */}
      {[-4, -2, 0, 2, 4].map(v => (
        <line key={`gx${v}`} x1={toX(v)} y1={MT} x2={toX(v)} y2={MT + IH}
          stroke="#E5E1DA" strokeWidth={0.7} />
      ))}
      {[-4, -2, 0, 2, 4].map(v => (
        <line key={`gy${v}`} x1={ML} y1={toY(v)} x2={ML + IW} y2={toY(v)}
          stroke="#E5E1DA" strokeWidth={0.7} />
      ))}

      {/* X axis */}
      <line x1={ML} y1={CY} x2={ML + IW + 4} y2={CY} stroke="#B8AFA6" strokeWidth={1.2} />
      <polygon points={`${ML+IW+4},${CY} ${ML+IW-3},${CY-3} ${ML+IW-3},${CY+3}`} fill="#B8AFA6" />

      {/* Y axis */}
      <line x1={CX} y1={MT + IH + 4} x2={CX} y2={MT - 4} stroke="#B8AFA6" strokeWidth={1.2} />
      <polygon points={`${CX},${MT-4} ${CX-3},${MT+3} ${CX+3},${MT+3}`} fill="#B8AFA6" />

      {/* X axis quadrant labels */}
      <text x={(ML + CX) / 2} y={CY + 14} textAnchor="middle" fontSize={7.5} fill="#78716C" fontStyle="italic" fontFamily="DM Sans, sans-serif">
        Wholesale / Balancing Markets
      </text>
      <text x={(CX + ML + IW) / 2} y={CY + 14} textAnchor="middle" fontSize={7.5} fill="#78716C" fontStyle="italic" fontFamily="DM Sans, sans-serif">
        Behind-the-Meter / Live Regulation
      </text>

      {/* Y axis quadrant labels — inside quadrants, right of axis */}
      <text x={CX + 6} y={MT + 14} textAnchor="start" fontSize={7} fill="#78716C" fontStyle="italic" fontFamily="DM Sans, sans-serif">
        Asset-Light / Software Platform
      </text>
      <text x={CX + 6} y={MT + IH - 5} textAnchor="start" fontSize={7} fill="#78716C" fontStyle="italic" fontFamily="DM Sans, sans-serif">
        Hardware-Led
      </text>

      {/* "First-mover white space" annotation inside our quadrant */}
      <text x={(CX + ML + IW) / 2 - 10} y={CY - 28} textAnchor="middle" fontSize={7.5} fill="#1E40AF" fontStyle="italic" fontFamily="DM Sans, sans-serif" opacity={0.65}>
        First-mover
      </text>
      <text x={(CX + ML + IW) / 2 - 10} y={CY - 18} textAnchor="middle" fontSize={7.5} fill="#1E40AF" fontStyle="italic" fontFamily="DM Sans, sans-serif" opacity={0.65}>
        white space
      </text>

      {/* Dots */}
      {DOTS.map((dot, i) => (
        <motion.circle
          key={i}
          cx={toX(dot.tx)} cy={toY(dot.ty)} r={dot.r}
          fill={dot.fill} stroke={dot.stroke} strokeWidth={1}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* Labels */}
      {DOTS.map((dot, i) => <Label key={`l${i}`} dot={dot} />)}

      {/* Legend — bottom right */}
      {[
        { fill: '#94A3B8', stroke: '#64748B', r: 5,  label: 'International operator' },
        { fill: '#FB923C', stroke: '#EA580C', r: 5.5, label: 'Regional precedent' },
        { fill: '#FBBF24', stroke: '#D97706', r: 6,  label: 'Jordanian actor' },
        { fill: '#1E40AF', stroke: '#1E3A8A', r: 8,  label: 'Our venture' },
      ].map((item, i) => (
        <g key={i} transform={`translate(${W - 145}, ${MT + IH + 8 + i * 14})`}>
          <circle cx={0} cy={0} r={item.r} fill={item.fill} stroke={item.stroke} strokeWidth={0.8} />
          <text x={12} y={4} fontSize={7.5} fill="#78716C" fontFamily="DM Mono, monospace">{item.label}</text>
        </g>
      ))}
    </motion.svg>
  )
}
