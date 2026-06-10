import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'

const hours = Array.from({ length: 24 }, (_, i) => i)

const getRate = (h) => {
  if (h >= 17 && h <= 22) return { rate: 0.079, tier: 'peak' }
  if ((h >= 14 && h <= 16) || h === 23 || h <= 4) return { rate: 0.069, tier: 'partial' }
  return { rate: 0.059, tier: 'offpeak' }
}

const rateData = hours.map((h) => ({ hour: h, ...getRate(h) }))
const flatData = hours.map((h) => ({ hour: h, rate: 0.062, tier: 'flat' }))

const COLORS = { peak: '#B45309', partial: '#D97706', offpeak: '#0B7070', flat: '#94A3B8' }

export default function TariffChart({ variant = 'real', showSavings = false }) {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const [dims, setDims] = useState({ w: 500, h: 340 })
  const isFlat = variant === 'flat'
  const data = isFlat ? flatData : rateData

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) setDims({ w: width, h: height })
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!svgRef.current || dims.w < 10) return
    const { w, h } = dims
    const margin = { top: 34, right: 20, bottom: 50, left: 62 }
    const iw = w - margin.left - margin.right
    const ih = h - margin.top - margin.bottom

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleBand().domain(hours.map(String)).range([0, iw]).padding(0.12)
    const y = d3.scaleLinear().domain([0, 0.095]).range([ih, 0])

    // Grid lines
    g.selectAll('.grid-line')
      .data(y.ticks(4))
      .join('line')
      .attr('x1', 0).attr('x2', iw)
      .attr('y1', d => y(d)).attr('y2', d => y(d))
      .attr('stroke', '#E5E1DA').attr('stroke-width', 1)

    // Bars
    g.selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('x', d => x(String(d.hour)))
      .attr('y', ih)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', d => COLORS[d.tier])
      .attr('rx', 2)
      .transition().duration(800).delay((_, i) => i * 28)
      .attr('y', d => y(d.rate))
      .attr('height', d => ih - y(d.rate))

    if (isFlat) {
      // Label: "CFO's assumption"
      g.append('text')
        .attr('x', iw / 2).attr('y', -16)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-family', 'DM Mono, monospace')
        .attr('fill', '#64748B')
        .text('The assumption: same price all day, every day')

      // Dashed ghost line showing where peak actually is
      const peakStart = x('17')
      const peakEnd = x('22') + x.bandwidth()
      g.append('rect')
        .attr('x', peakStart).attr('y', y(0.079))
        .attr('width', peakEnd - peakStart).attr('height', ih - y(0.079))
        .attr('fill', '#B4530912')
        .attr('stroke', '#B45309').attr('stroke-width', 0.8)
        .attr('stroke-dasharray', '3 3')

      g.append('text')
        .attr('x', (peakStart + peakEnd) / 2).attr('y', y(0.079) - 6)
        .attr('text-anchor', 'middle')
        .attr('font-size', '8.5px')
        .attr('font-family', 'DM Mono, monospace')
        .attr('fill', '#B45309').attr('opacity', 0.75)
        .text('actual peak (hidden)')
    } else {
      // Peak zone bracket
      const peakHours = rateData.filter(d => d.tier === 'peak')
      const peakStart = x(String(peakHours[0].hour))
      const peakEnd = x(String(peakHours[peakHours.length - 1].hour)) + x.bandwidth()

      g.append('rect')
        .attr('x', peakStart).attr('y', -12)
        .attr('width', peakEnd - peakStart).attr('height', 5)
        .attr('fill', '#B45309').attr('rx', 2).attr('opacity', 0.7)

      g.append('text')
        .attr('x', (peakStart + peakEnd) / 2).attr('y', -16)
        .attr('text-anchor', 'middle')
        .attr('font-size', '9px')
        .attr('font-family', 'DM Mono, monospace')
        .attr('fill', '#B45309')
        .text('PEAK 17:00–23:00 (+34%)')

      if (showSavings) {
        // Diagonal-stripe hatch pattern — the missed savings delta
        const defs = svg.append('defs')
        const pat = defs.append('pattern')
          .attr('id', 'missed-hatch').attr('patternUnits', 'userSpaceOnUse')
          .attr('width', 7).attr('height', 7)
          .attr('patternTransform', 'rotate(45)')
        pat.append('line')
          .attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 7)
          .attr('stroke', '#EF4444').attr('stroke-width', 2.5).attr('opacity', 0.55)

        // Overlay the hatch over the full peak bars (shows wasted opportunity)
        g.append('rect')
          .attr('x', peakStart).attr('y', y(0.079))
          .attr('width', peakEnd - peakStart)
          .attr('height', ih - y(0.079))
          .attr('fill', 'url(#missed-hatch)')
          .attr('opacity', 0)
          .transition().delay(800).duration(600)
          .attr('opacity', 0.45)

        // Red highlight band: just the delta (79 fils minus 59 fils = 20 fils gap)
        g.append('rect')
          .attr('x', peakStart).attr('y', y(0.079))
          .attr('width', peakEnd - peakStart)
          .attr('height', y(0.059) - y(0.079))
          .attr('fill', '#EF4444').attr('opacity', 0)
          .transition().delay(900).duration(500)
          .attr('opacity', 0.12)

        // Bracket: 59→79 fils gap
        const midX = (peakStart + peakEnd) / 2
        g.append('line')
          .attr('x1', peakEnd + 6).attr('x2', peakEnd + 6)
          .attr('y1', y(0.079)).attr('y2', y(0.059))
          .attr('stroke', '#EF4444').attr('stroke-width', 1.5).attr('opacity', 0)
          .transition().delay(1000).duration(400).attr('opacity', 0.8)
        g.append('line')
          .attr('x1', peakEnd + 3).attr('x2', peakEnd + 9).attr('y1', y(0.079)).attr('y2', y(0.079))
          .attr('stroke', '#EF4444').attr('stroke-width', 1.5).attr('opacity', 0)
          .transition().delay(1000).duration(400).attr('opacity', 0.8)
        g.append('line')
          .attr('x1', peakEnd + 3).attr('x2', peakEnd + 9).attr('y1', y(0.059)).attr('y2', y(0.059))
          .attr('stroke', '#EF4444').attr('stroke-width', 1.5).attr('opacity', 0)
          .transition().delay(1000).duration(400).attr('opacity', 0.8)

        // Large prominent label
        const lblY = y(0.069)
        // background pill
        g.append('rect')
          .attr('x', iw * 0.08).attr('y', lblY - 18)
          .attr('width', iw * 0.54).attr('height', 24)
          .attr('rx', 5).attr('fill', '#FEF2F2').attr('stroke', '#EF4444')
          .attr('stroke-width', 1.2).attr('opacity', 0)
          .transition().delay(1100).duration(500).attr('opacity', 1)

        g.append('text')
          .attr('x', iw * 0.08 + (iw * 0.54) / 2).attr('y', lblY - 2)
          .attr('text-anchor', 'middle')
          .attr('font-size', '13px').attr('font-weight', 'bold')
          .attr('font-family', 'DM Mono, monospace')
          .attr('fill', '#DC2626').attr('opacity', 0)
          .text('20–25% savings unrealised every month')
          .transition().delay(1100).duration(500).attr('opacity', 1)
      }
    }

    // X axis
    const xAxis = d3.axisBottom(x)
      .tickValues(hours.filter(h => h % 3 === 0).map(String))
      .tickFormat(h => `${h}:00`)
    g.append('g').attr('transform', `translate(0,${ih})`).call(xAxis)
      .selectAll('text').attr('fill', '#78716C').attr('font-size', '9px').attr('font-family', 'DM Mono, monospace')
    g.select('.domain').attr('stroke', '#E5E1DA')
    g.selectAll('.tick line').attr('stroke', '#E5E1DA')

    // Y axis
    const yAxis = d3.axisLeft(y).ticks(4).tickFormat(d => `${(d * 1000).toFixed(0)} fils`)
    g.append('g').call(yAxis)
      .selectAll('text').attr('fill', '#78716C').attr('font-size', '9px').attr('font-family', 'DM Mono, monospace')
    g.select('.domain').attr('stroke', '#E5E1DA')
    g.selectAll('.tick line').attr('stroke', '#E5E1DA')
  }, [dims, variant, showSavings, data, isFlat])

  return (
    <div ref={containerRef} className="w-full h-full p-6">
      <p className="chapter-label mb-2">
        {isFlat ? "Jordan's electricity price — as the CFO modelled it" : 'EMRC Time-of-Use Tariff — Jordan (medium industry)'}
      </p>
      {!isFlat && (
        <div className="flex gap-4 mb-2 flex-wrap">
          {[['#B45309', 'Peak — 79 fils/kWh'], ['#D97706', 'Partial — 69 fils/kWh'], ['#0B7070', 'Off-peak — 59 fils/kWh']].map(([c, l]) => (
            <div key={l} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: c }} />
              <span className="font-mono" style={{ fontSize: '0.7rem', color: c }}>{l}</span>
            </div>
          ))}
        </div>
      )}
      {isFlat && (
        <p className="text-muted font-mono mb-2" style={{ fontSize: '0.7rem' }}>
          Flat rate · 62 fils/kWh · the same at 2am and at 7pm
        </p>
      )}
      <svg
        ref={svgRef}
        className="w-full"
        style={{ height: 'calc(100% - 80px)' }}
        role="img"
        aria-label={isFlat ? "Flat electricity price assumption" : "Jordan's 3-tier ToU tariff — peak hours 17:00–23:00 are 34% more expensive"}
      />
    </div>
  )
}
