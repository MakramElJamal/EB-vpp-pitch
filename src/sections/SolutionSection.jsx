import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScrollama } from '../hooks/useScrollama'
import ScrollStep from '../components/layout/ScrollStep'
import useScrollStore from '../store/scrollStore'
import SolutionDiagram from '../components/viz/SolutionDiagram'

const STEPS = [
  {
    headline: 'Software that finally makes the battery do its job',
    body: "Every commercial site in Jordan with rooftop solar and a battery already has the hardware. What's missing is a brain — software that watches the electricity price, predicts tomorrow's sun and load, and automatically decides when to charge cheap and release during the expensive evening hours. That's us.",
  },
  {
    headline: 'We plug into what is already there',
    body: "Jordan's commercial and industrial sites already have government-mandated smart meters installed on-site. We connect through those — no new hardware to purchase, no installation crews, no disruption to operations. We always give the customer a physical override: their site, their rules, their call.",
  },
  {
    headline: 'The scheduling brain that runs overnight, invisibly',
    body: "Each evening our platform calculates the next day's optimal battery schedule — factoring in tomorrow's weather forecast, historical load patterns, and the exact tariff bands that kick in at 5pm. The battery just follows the plan. The CFO sees the verified saving on a monthly report.",
  },
  {
    headline: 'Pure software. Zero new cost to the customer.',
    body: "We are not selling hardware. We are not a utility. We are the missing software layer that makes existing equipment do what it was always supposed to do — reliably, automatically, every single day. The customer keeps everything they already own. We just make it smarter.",
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
