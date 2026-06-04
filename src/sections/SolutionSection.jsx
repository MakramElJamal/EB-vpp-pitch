import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScrollama } from '../hooks/useScrollama'
import ScrollStep from '../components/layout/ScrollStep'
import useScrollStore from '../store/scrollStore'
import SolutionDiagram from '../components/viz/SolutionDiagram'

const STEPS = [
  {
    headline: 'Step 1 — 5pm. Electricity gets 25% more expensive. Your battery should handle that.',
    body: "Every day at 5pm, Jordan's electricity grid switches to peak pricing — 25% more expensive until 11pm. Every business with a solar panel and a battery should be fully charged by then, ready to power the building without touching the expensive grid. Most aren't. Because nobody set up the software to make it happen automatically.",
  },
  {
    headline: 'Step 2 — We connect in a day, using what is already installed.',
    body: "There is no new hardware to buy. Jordan's commercial sites already have smart meters installed. We connect through those, set up our scheduling software remotely, and hand the customer a physical off-switch. Their site, their rules — we just add the intelligence on top.",
  },
  {
    headline: 'Step 3 — Every night, our software plans tomorrow.',
    body: "Our platform looks at tomorrow's weather forecast and your site's usual electricity patterns. It builds a simple plan: charge the battery during cheap daytime hours, stop drawing from the grid when the expensive window opens at 5pm. The battery follows the plan automatically. Nobody has to do anything.",
  },
  {
    headline: 'Step 4 — A saving appears on the bill. We take 10% of it.',
    body: "At the end of each month we compare what the customer paid against what they would have paid without us. The difference is the verified saving. We charge JOD 30/month plus 10% of that saving. The rest stays in the customer's pocket — and they have a report that shows exactly why.",
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
