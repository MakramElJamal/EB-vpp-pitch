import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollama } from '../hooks/useScrollama'
import ScrollStep from '../components/layout/ScrollStep'
import useScrollStore from '../store/scrollStore'
import TractionViz from '../components/viz/TractionViz'

const STEPS = [
  {
    headline: 'Every condition for this business to exist has already been met.',
    body: "The batteries are installed. Peak pricing is live. No competitor operates commercially anywhere in the Middle East. We are not waiting for the market to form — it already has. The only thing missing is the software layer sitting in the middle of it.",
  },
  {
    headline: 'Four policy moves in eighteen months — each one a green light',
    body: 'Peak pricing made mandatory. Private storage legalised. The sector extended to hotels and hospitals. An EU-funded national energy strategy (JESS 2025–2035) commissioned. Each of these happened between July 2024 and 2025. This is a policy runway, not a regulatory bet.',
  },
  {
    headline: 'The first-mover window is real and it is closing',
    body: "No competitor operates commercially in MENA today. Jordan's storage mandate is building fast. The team that establishes the first verified saving, the first customer relationship, and the first regulatory dialogue wins ground that cannot be bought back.",
  },
]

export default function TractionSection() {
  const [activeStep, setActiveStep] = useState(0)
  const stepsRef = useRef(null)
  const { setChapter, setStep } = useScrollStore()

  useEffect(() => { setChapter(3) }, [setChapter])

  useScrollama({
    containerRef: stepsRef,
    onStepEnter: ({ index }) => {
      setActiveStep(index)
      setStep(index)
    },
    offset: 0.55,
  })

  return (
    <section id="traction" className="chapter">
      <div className="chapter-inner">

        {/* Sticky viz */}
        <div className="order-first lg:order-last sticky-viz">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              className="w-full h-full"
            >
              <TractionViz activeStep={activeStep} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scrolling text */}
        <div ref={stepsRef} className="lg:col-start-1 lg:row-start-1">
          <div data-snap className="min-h-[35vh] flex flex-col justify-end pb-12 px-8 lg:px-12">
            <p className="chapter-label mb-3">Chapter 03</p>
            <h2 className="display-heading text-4xl lg:text-5xl text-primary">Traction & Evidence</h2>
          </div>

          {STEPS.map((step, i) => (
            <ScrollStep key={i} isActive={activeStep === i} className="px-8 lg:px-12 py-16">
              <div className="space-y-4 max-w-lg">
                <p className="font-mono text-xs text-gold">
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
