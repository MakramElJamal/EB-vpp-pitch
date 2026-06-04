import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollama } from '../hooks/useScrollama'
import ScrollStep from '../components/layout/ScrollStep'
import useScrollStore from '../store/scrollStore'
import RevenueViz from '../components/viz/RevenueViz'

const STEPS = [
  {
    headline: "JOD 35 per site per month — a rounding error on the CFO's bill",
    body: 'At JOD 35/site/month (invoiced quarterly), the subscription is 0.2% of a typical industrial electricity bill. It is never a budget conversation. It never goes to procurement committee. The CFO signs it on the basis of the first month\'s report.',
  },
  {
    headline: 'Revenue milestones are conservative — Phase 1 alone is viable',
    body: '3 sites by end of Year 1. 20 by mid Year 2. 80–100 by Year 5 at our SOM. Annual revenue scales from JOD 4,200 to JOD 112–200K on Phase 1 alone. Gross margin: 74% at every point on the curve. Software economics, not hardware economics.',
  },
  {
    headline: 'Three phases, three revenue layers — Phase 1 builds the asset',
    body: 'Phase 1 (Years 1–3+): C&I ToU optimisation — executable under current law. Phase 2 (Years 3–5): Formal demand response against NEPCO — USD 2.5–5M/yr at 50 MW. Phase 3 (Year 5+): Ancillary services and balancing markets — the Next Kraftwerke model. Phase 1 pays. Phase 2 scales. Phase 3 prices into a market.',
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
