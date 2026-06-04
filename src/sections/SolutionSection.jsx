import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScrollama } from '../hooks/useScrollama'
import ScrollStep from '../components/layout/ScrollStep'
import useScrollStore from '../store/scrollStore'
import SolutionDiagram from '../components/viz/SolutionDiagram'

const STEPS = [
  {
    headline: 'One sentence',
    body: 'A cloud platform that connects distributed rooftop batteries across Jordanian commercial and industrial sites and automatically optimises their charge/discharge schedule against the live EMRC Time-of-Use tariff — turning idle hardware into verified monthly savings for the customer and a dispatchable flexibility resource for the grid.',
  },
  {
    headline: 'The Edge Layer: no trust required',
    body: 'A Teltonika RUT956 IoT controller (JOD 700/site) sits between the inverter and our cloud. It reads real-time state-of-charge, sends dispatch commands on a sub-minute loop, and provides a physical override switch. The customer is always in control.',
  },
  {
    headline: 'The Platform Layer: the intelligence that doesn\'t exist today',
    body: 'Our cloud dispatch engine forecasts next-day solar generation and site load, then calculates the optimal charge/discharge schedule against EMRC\'s tariff bands. Every decision is logged, verified against the actual bill, and reported to the CFO automatically each month.',
  },
  {
    headline: 'We are not selling hardware. We are not a utility.',
    body: 'We are the software layer that makes existing hardware perform as originally promised. No CAPEX. No installation risk. No operational disruption. Just the performance the customer\'s BESS was always capable of — finally delivered.',
  },
]

export default function SolutionSection() {
  const [activeStep, setActiveStep] = useState(0)
  const stepsRef = useRef(null)
  const { setChapter, setStep } = useScrollStore()

  useEffect(() => { setChapter(2) }, [setChapter])

  useScrollama({
    containerRef: stepsRef,
    onStepEnter: ({ index }) => {
      setActiveStep(index)
      setStep(index)
    },
    offset: 0.55,
  })

  const visibleLayers = [1, 2, 3, 4][activeStep] ?? 1

  return (
    <section id="solution" className="chapter">
      <div className="chapter-inner">

        {/* Sticky diagram panel */}
        <div className="order-first lg:order-last sticky-viz bg-surface border-l border-border overflow-y-auto">
          <motion.div
            className="w-full h-full flex items-center justify-center"
            key={`layers-${visibleLayers}`}
          >
            <SolutionDiagram visibleLayers={visibleLayers} />
          </motion.div>
        </div>

        {/* Scrolling text */}
        <div ref={stepsRef} className="lg:col-start-1 lg:row-start-1">
          <div className="min-h-[35vh] flex flex-col justify-end pb-12 px-8 lg:px-12">
            <p className="chapter-label mb-3">Chapter 02</p>
            <h2 className="display-heading text-3xl lg:text-4xl text-primary">The Solution</h2>
          </div>

          {STEPS.map((step, i) => (
            <ScrollStep key={i} isActive={activeStep === i} className="px-8 lg:px-12 py-16">
              <div className="space-y-4 max-w-lg">
                <p className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, '0')} / {STEPS.length}
                </p>
                <h3 className="text-xl font-semibold text-primary leading-snug">{step.headline}</h3>
                <p className="text-muted leading-relaxed">{step.body}</p>
              </div>
            </ScrollStep>
          ))}

          <div className="min-h-[25vh]" />
        </div>
      </div>
    </section>
  )
}
