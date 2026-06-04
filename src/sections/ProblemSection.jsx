import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollama } from '../hooks/useScrollama'
import ScrollStep from '../components/layout/ScrollStep'
import useScrollStore from '../store/scrollStore'
import TariffChart from '../components/viz/TariffChart'
import GridStatsViz from '../components/viz/GridStatsViz'

const STEPS = [
  {
    headline: "ToU tariffs activated — the CFO's BESS isn't performing",
    body: "In July 2024, Jordan's EMRC mandated Time-of-Use pricing for all medium and large industry. Peak electricity (17:00–23:00) costs 25% more. A typical 1 MWh BESS should charge cheap during the day and discharge during the expensive evening peak. It doesn't. Manual dispatch is error-prone. Inverter-native controls aren't tariff-aware. No forecasting exists.",
  },
  {
    headline: "15–20% of available savings unrealised every month",
    body: "The plant manager already bought the hardware. He told his CFO it would pay back in 4 years. It isn't. Every month that the battery fails to dispatch at peak, that payback period extends — quietly, with no alert, no report, and no recourse.",
  },
  {
    headline: "NEPCO: 26.9% renewable — target is 50% by 2030",
    body: "NEPCO must reach 50% renewable energy by 2030. It currently sits at 26.9%. Renewable curtailment is already at 10% of annual peak demand. Jordan has no VPP licensing framework, no open communication standard, and only 12,500 smart meters deployed. Thousands of batteries sit behind customer meters — completely invisible and uncontrollable to the grid operator.",
  },
  {
    headline: "The non-obvious insight: the asset base already exists",
    body: "Jordan doesn't need more batteries. It needs someone to coordinate the ones already there. 82,780 rooftop systems. 1 GW of installed solar. Thousands of BESS units. All idle during the exact window that matters. The problem is purely software.",
  },
]

export default function ProblemSection() {
  const [activeStep, setActiveStep] = useState(0)
  const stepsRef = useRef(null)
  const { setChapter, setStep } = useScrollStore()

  useEffect(() => { setChapter(1) }, [setChapter])

  useScrollama({
    containerRef: stepsRef,
    onStepEnter: ({ index }) => {
      setActiveStep(index)
      setStep(index)
    },
    offset: 0.55,
  })

  const renderViz = () => {
    switch (activeStep) {
      case 0: return <TariffChart activeStep={0} />
      case 1: return <TariffChart activeStep={1} />
      case 2: return <GridStatsViz activeStep={1} />
      case 3: return <GridStatsViz activeStep={2} />
      default: return <TariffChart activeStep={0} />
    }
  }

  return (
    <section id="problem" className="chapter">
      <div className="chapter-inner">

        {/* Sticky viz panel */}
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
              {renderViz()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scrolling text column */}
        <div ref={stepsRef} className="lg:col-start-1 lg:row-start-1">
          <div className="min-h-[35vh] flex flex-col justify-end pb-12 px-8 lg:px-12">
            <p className="chapter-label mb-3">Chapter 01</p>
            <h2 className="display-heading text-3xl lg:text-4xl text-primary">The Problem</h2>
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
