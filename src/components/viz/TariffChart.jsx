import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'

const hours = Array.from({ length: 24 }, (_, i) => i)

const getRate = (h) => {
  if (h >= 17 && h <= 22) return { rate: 0.079, tier: 'peak' }
  if ((h >= 14 && h <= 16) || h === 23 || h <= 4) return { rate: 0.069, tier: 'partial' }
  return { rate: 0.059, tier: 'offpeak' }
}

const rateData = hours.map((h) => ({ hour: h, ...getRate(h) }))
const COLORS = { peak: '#B45309', partial: '#D97706', offpeak: '#0B7070' }

export default function TariffChart({ activeStep }) {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const [dims, setDims] = useState({ w: 500, h: 340 })

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
    const margin = { top: 28, right: 20, bottom: 50, left: 62 }
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
      .data(rateData)
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

    // Peak zone bracket & label
    const peakHours = rateData.filter(d => d.tier === 'peak')
    const peakStart = x(String(peakHours[0].hour))
    const peakEnd = x(String(peakHours[peakHours.length - 1].hour)) + x.bandwidth()

    g.append('rect')
      .attr('x', peakStart).attr('y', -10)
      .attr('width', peakEnd - peakStart).attr('height', 5)
      .attr('fill', '#B45309').attr('rx', 2).attr('opacity', 0.7)

    g.append('text')
      .attr('x', (peakStart + peakEnd) / 2).attr('y', -14)
      .attr('text-anchor', 'middle')
      .attr('font-size', '9px')
      .attr('font-family', 'DM Mono, monospace')
      .attr('fill', '#B45309')
      .text('PEAK 17:00–23:00 (+34%)')

    // X axis
    const xAxis = d3.axisBottom(x)
      .tickValues(hours.filter(h => h % 3 === 0).map(String))
      .tickFormat(h => `${h}:00`)
    g.append('g').attr('transform', `translate(0,${ih})`).call(xAxis)
      .selectAll('text').attr('fill', '#78716C').attr('font-size', '9px').attr('font-family', 'DM Mono, monospace')
    g.select('.domain').attr('stroke', '#E5E1DA')
    g.selectAll('.tick line').attr('stroke', '#E5E1DA')

    // Y axis — fills in JOD, label in fils
    const yAxis = d3.axisLeft(y).ticks(4).tickFormat(d => `${(d * 1000).toFixed(0)} fils`)
    g.append('g').call(yAxis)
      .selectAll('text').attr('fill', '#78716C').attr('font-size', '9px').attr('font-family', 'DM Mono, monospace')
    g.select('.domain').attr('stroke', '#E5E1DA')
    g.selectAll('.tick line').attr('stroke', '#E5E1DA')

    // Savings annotation (step 1)
    if (activeStep === 1) {
      g.append('text')
        .attr('x', iw * 0.5).attr('y', y(0.089))
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-family', 'DM Mono, monospace')
        .attr('fill', '#EF4444').attr('opacity', 0)
        .text('20–25% savings unrealised')
        .transition().duration(600).attr('opacity', 1)
    }
  }, [dims, activeStep])

  return (
    <div ref={containerRef} className="w-full h-full p-6">
      <p className="chapter-label mb-2">EMRC Time-of-Use Tariff — Jordan (medium industry)</p>
      <div className="flex gap-4 mb-2 flex-wrap">
        {[['#B45309', 'Peak — 79 fils/kWh'], ['#D97706', 'Partial — 69 fils/kWh'], ['#0B7070', 'Off-peak — 59 fils/kWh']].map(([c, l]) => (
          <div key={l} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: c }} />
            <span className="font-mono" style={{ fontSize: '0.7rem', color: c }}>{l}</span>
          </div>
        ))}
      </div>
      <svg
        ref={svgRef}
        className="w-full"
        style={{ height: 'calc(100% - 80px)' }}
        role="img"
        aria-label="Bar chart showing Jordan's ToU electricity tariffs — peak hours 17:00–23:00 are 34% more expensive than off-peak"
      />
    </div>
  )
}
