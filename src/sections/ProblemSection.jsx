import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollama } from '../hooks/useScrollama'
import ScrollStep from '../components/layout/ScrollStep'
import useScrollStore from '../store/scrollStore'
import TariffChart from '../components/viz/TariffChart'
import GridStatsViz from '../components/viz/GridStatsViz'
import InsightViz from '../components/viz/InsightViz'

const STEPS = [
  {
    headline: "The CFO approved the battery. His payback calculation is wrong.",
    body: "In July 2024, Jordan mandated peak pricing for all medium and large industry — electricity costs 25% more between 5pm and 11pm. Every BESS installed should be charging cheap all day and releasing during that expensive window. It isn't. No software is doing the scheduling. The CFO's 4-year payback is quietly slipping.",
  },
  {
    headline: "15–20% of available savings missed every single month",
    body: "No alert. No report. No recourse. The battery just sits at whatever charge level it was left at. The peak window opens at 5pm, the battery does nothing useful, and the electricity bill arrives the same size it always did. The hardware is fine. The management software doesn't exist.",
  },
  {
    headline: "The grid operator has the same problem, scaled to a country",
    body: "NEPCO must reach 50% renewable energy by 2030 — it currently sits at 26.9%. Thousands of batteries sit behind customer meters, completely invisible to grid control. Every battery that runs on autopilot is a resource the national grid cannot use, in a country that imports 90% of its energy.",
  },
  {
    headline: "The opportunity hiding in plain sight",
    body: "Every factory, hotel, and hospital that installed solar in the last five years has a battery. Those batteries are sleeping during the exact hours that matter. This is not a hardware problem. It never was.",
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
      case 3: return <InsightViz />
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
