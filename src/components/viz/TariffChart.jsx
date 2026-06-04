import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'

const hours = Array.from({ length: 24 }, (_, i) => i)
const isPeak = (h) => h >= 17 && h <= 22

const rateData = hours.map((h) => ({
  hour: h,
  rate: isPeak(h) ? 0.125 : 0.100,
  peak: isPeak(h),
}))

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
    const margin = { top: 20, right: 20, bottom: 50, left: 55 }
    const iw = w - margin.left - margin.right
    const ih = h - margin.top - margin.bottom

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleBand().domain(hours.map(String)).range([0, iw]).padding(0.15)
    const y = d3.scaleLinear().domain([0, 0.16]).range([ih, 0])

    // Grid lines
    g.selectAll('.grid-line')
      .data(y.ticks(4))
      .join('line')
      .attr('class', 'grid-line')
      .attr('x1', 0).attr('x2', iw)
      .attr('y1', d => y(d)).attr('y2', d => y(d))
      .attr('stroke', '#1A2040').attr('stroke-width', 1)

    // Bars
    g.selectAll('.bar')
      .data(rateData)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', d => x(String(d.hour)))
      .attr('y', ih)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', d => d.peak ? '#E8A838' : '#0D9488')
      .attr('rx', 2)
      .transition().duration(800).delay((_, i) => i * 30)
      .attr('y', d => y(d.rate))
      .attr('height', d => ih - y(d.rate))

    // Peak zone label
    const peakHours = rateData.filter(d => d.peak)
    const peakStart = x(String(peakHours[0].hour))
    const peakEnd = x(String(peakHours[peakHours.length - 1].hour)) + x.bandwidth()

    g.append('rect')
      .attr('x', peakStart)
      .attr('y', -8)
      .attr('width', peakEnd - peakStart)
      .attr('height', 6)
      .attr('fill', '#E8A838')
      .attr('rx', 2)
      .attr('opacity', 0.6)

    g.append('text')
      .attr('x', (peakStart + peakEnd) / 2)
      .attr('y', -12)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-family', 'DM Mono, monospace')
      .attr('fill', '#E8A838')
      .text('PEAK 17:00–23:00 (+25%)')

    // X axis — show every 3 hours
    const xAxis = d3.axisBottom(x)
      .tickValues(hours.filter(h => h % 3 === 0).map(String))
      .tickFormat(h => `${h}:00`)
    g.append('g')
      .attr('transform', `translate(0,${ih})`)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', '#7A84A8')
      .attr('font-size', '10px')
      .attr('font-family', 'DM Mono, monospace')
    g.select('.domain').attr('stroke', '#1A2040')
    g.selectAll('.tick line').attr('stroke', '#1A2040')

    // Y axis
    const yAxis = d3.axisLeft(y).ticks(4).tickFormat(d => `${(d * 100).toFixed(0)} fils`)
    g.append('g')
      .call(yAxis)
      .selectAll('text')
      .attr('fill', '#7A84A8')
      .attr('font-size', '10px')
      .attr('font-family', 'DM Mono, monospace')
    g.select('.domain').attr('stroke', '#1A2040')
    g.selectAll('.tick line').attr('stroke', '#1A2040')

    // Savings annotation (step 1)
    if (activeStep === 1) {
      g.append('text')
        .attr('x', iw * 0.5)
        .attr('y', y(0.14))
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-family', 'DM Mono, monospace')
        .attr('fill', '#EF4444')
        .attr('opacity', 0)
        .text('15–20% savings unrealised')
        .transition().duration(600)
        .attr('opacity', 1)
    }
  }, [dims, activeStep])

  return (
    <div ref={containerRef} className="w-full h-full p-6">
      <p className="chapter-label mb-3">EMRC Time-of-Use Tariff — Jordan</p>
      <svg
        ref={svgRef}
        className="w-full"
        style={{ height: 'calc(100% - 40px)' }}
        role="img"
        aria-label="Bar chart showing Jordan's ToU electricity tariffs — peak hours 17:00–23:00 are 25% more expensive"
      />
    </div>
  )
}
