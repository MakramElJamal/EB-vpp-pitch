import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollama } from '../hooks/useScrollama'
import ScrollStep from '../components/layout/ScrollStep'
import useScrollStore from '../store/scrollStore'
import MoatViz from '../components/viz/MoatViz'

const STEPS = [
  {
    headline: 'Tariff-native and override-protected',
    body: 'Our dispatch engine is calibrated to Jordan\'s specific ToU bands, fils-per-kWh structure, and Bylaw 58 export rules. Every international competitor would need a full rebuild. Meanwhile, a physical override switch ensures the production uptime objection is resolved before it\'s raised.',
  },
  {
    headline: 'Zero upfront cost removes the procurement barrier',
    body: "Jordan's CFOs treat unproven capital commitments with extreme caution. A JOD 30 monthly subscription that generates a first verified saving in Month 6 never reaches procurement committee. The 10% performance fee removes all remaining risk: if we don't save them money, we don't charge extra.",
  },
  {
    headline: 'Cultural capital that no foreign entrant can buy',
    body: 'Industrial sales in Jordan are closed at the plant, through trusted introductions, over coffee. The decision-maker is a plant manager, an engineering director, or an operations VP — not a procurement portal. We are insiders with existing relationships inside Jordanian industry.',
  },
  {
    headline: 'Portfolio data compounds into a permanent moat',
    body: 'Every additional site we connect improves the forecasting model for every other site in the portfolio. Load patterns, solar yield curves, grid frequency correlations — accuracy compounds with scale. A new entrant starts with none of it. That gap widens permanently, and capital alone cannot close it.',
  },
  {
    headline: "NEPCO can't block us — and we don't need them to succeed",
    body: "Our core business is 100% behind the meter: a customer optimising their own battery against their own electricity bill. No regulator has a mechanism to block that. Grid services are the upside, not the plan.",
  },
]

export default function MoatSection() {
  const [activeStep, setActiveStep] = useState(0)
  const stepsRef = useRef(null)
  const { setChapter, setStep } = useScrollStore()

  useEffect(() => { setChapter(5) }, [setChapter])

  useScrollama({
    containerRef: stepsRef,
    onStepEnter: ({ index }) => {
      setActiveStep(index)
      setStep(index)
    },
    offset: 0.55,
  })

  return (
    <section id="moat" className="chapter">
      <div className="chapter-inner">

        {/* Sticky viz */}
        <div className="order-first lg:order-last sticky-viz bg-surface border-l border-border overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              className="w-full h-full"
            >
              <MoatViz activeStep={activeStep} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scrolling text */}
        <div ref={stepsRef} className="lg:col-start-1 lg:row-start-1">
          <div className="min-h-[35vh] flex flex-col justify-end pb-12 px-8 lg:px-12">
            <p className="chapter-label mb-3">Chapter 05</p>
            <h2 className="display-heading text-3xl lg:text-4xl text-primary">Why Us / Moat</h2>
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
