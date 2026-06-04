import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollama } from '../hooks/useScrollama'
import ScrollStep from '../components/layout/ScrollStep'
import useScrollStore from '../store/scrollStore'
import RevenueViz from '../components/viz/RevenueViz'

const STEPS = [
  {
    headline: "JOD 30 a month — and we only charge more when you save more",
    body: "The subscription is JOD 30 per site per month, invoiced quarterly. For a commercial site with a large electricity bill, that is a rounding error — never a procurement conversation. On top of that, we take 10% of whatever we save them. If we don't save them anything, we don't charge extra. Simple, aligned, zero risk for the customer.",
  },
  {
    headline: "The growth path is gradual — built on proof, not promises",
    body: "We start with a handful of pilot sites, verify the savings, and let the results do the selling. The numbers at this stage are modest by design. We are building trust and a track record, not chasing revenue. Gross margins hold at around 74% whether we have 3 sites or 300 — because this is a software business.",
  },
  {
    headline: 'Three ways this business grows over time',
    body: "Right now: we help commercial sites save money on their peak electricity bills — no law changes needed. In a few years, as Jordan formalises its grid flexibility rules, we can aggregate those same batteries and get paid by the grid operator too. Longer term, the platform participates in energy markets directly. Each phase builds on the last.",
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
