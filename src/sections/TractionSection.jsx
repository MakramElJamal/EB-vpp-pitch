import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollama } from '../hooks/useScrollama'
import ScrollStep from '../components/layout/ScrollStep'
import useScrollStore from '../store/scrollStore'
import TractionViz from '../components/viz/TractionViz'

const STEPS = [
  {
    headline: 'This is not a hypothesis. The commercial conditions are already live.',
    body: '82,780 distributed PV systems across Jordan. A 25% Time-of-Use tariff differential that opened in July 2024. Zero direct VPP competitors operating commercially in all of MENA. The arbitrage window exists right now. Today.',
  },
  {
    headline: 'The regulatory stars have aligned — actual policy, not hope',
    body: 'July 2024: EMRC activates mandatory ToU for medium and large industry. November 2024: Law 13/2012 amended — private-sector BESS stations now legally permitted. January 2025: ToU extended to hotels, hospitals, water pumping, banking. A USTDA-funded VPP feasibility study with Kawar Energy commissioned by the government — a pre-procurement signal, not a pilot test.',
  },
  {
    headline: 'The market is being legislated into existence',
    body: 'BESS adoption in Jordan is not a bet we\'re making. It\'s being mandated from above by national energy policy. The MEMR National Strategy targets 50% renewables by 2030. Storage is structurally required to get there. Our SOM is conservative — every year of delay widens the opportunity.',
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
              <TractionViz activeStep={activeStep} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scrolling text */}
        <div ref={stepsRef} className="lg:col-start-1 lg:row-start-1">
          <div className="min-h-[35vh] flex flex-col justify-end pb-12 px-8 lg:px-12">
            <p className="chapter-label mb-3">Chapter 03</p>
            <h2 className="display-heading text-3xl lg:text-4xl text-primary">Traction & Evidence</h2>
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
