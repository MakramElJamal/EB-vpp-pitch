import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollama } from '../hooks/useScrollama'
import ScrollStep from '../components/layout/ScrollStep'
import useScrollStore from '../store/scrollStore'
import RevenueViz from '../components/viz/RevenueViz'

const STEPS = [
  {
    headline: "JOD 30 a month. We only earn more when you save more.",
    body: "A flat JOD 30 per site per month — never a budget conversation. On top of that, we take 10% of whatever we save the customer. If the saving doesn't materialise, the fee doesn't either. No risk for the customer. No misaligned incentives for us.",
  },
  {
    headline: "The 10% adds up fast once you see what a site actually saves",
    body: "A typical large commercial site in Jordan saves JOD 400–1,200 per month by avoiding peak prices. Our 10% of that, plus the flat subscription, gives us JOD 70–150 per site per month. That is the unit economics. We need 1–3 sites in Year 1 to prove it, then the referrals do the rest.",
  },
  {
    headline: "With or without NEPCO, this business works",
    body: "On customer savings alone — profitable, defensible, growing from word of mouth. If NEPCO comes on board with grid services: each MW of aggregated batteries earns from the national grid too, and the revenue per site multiplies. We plan for the first path. The second is the upside.",
  },
]

export default function BusinessModelSection() {
  const [activeStep, setActiveStep] = useState(0)
  const stepsRef = useRef(null)
  const { setChapter, setStep } = useScrollStore()

  useEffect(() => { setChapter(4) }, [setChapter])

  useScrollama({
    containerRef: stepsRef,
    onStepEnter: ({ index }) => {
      setActiveStep(index)
      setStep(index)
    },
    offset: 0.55,
  })

  return (
    <section id="bizmodel" className="chapter">
      <div className="chapter-inner">

        {/* Sticky viz */}
        <div className="order-first lg:order-last sticky-viz bg-surface border-l border-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              className="w-full h-full"
            >
              <RevenueViz activeStep={activeStep} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scrolling text */}
        <div ref={stepsRef} className="lg:col-start-1 lg:row-start-1">
          <div className="min-h-[35vh] flex flex-col justify-end pb-12 px-8 lg:px-12">
            <p className="chapter-label mb-3">Chapter 04</p>
            <h2 className="display-heading text-3xl lg:text-4xl text-primary">Business Model</h2>
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
