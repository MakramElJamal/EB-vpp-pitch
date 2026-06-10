import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollama } from '../hooks/useScrollama'
import ScrollStep from '../components/layout/ScrollStep'
import useScrollStore from '../store/scrollStore'
import TariffChart from '../components/viz/TariffChart'
import GridStatsViz from '../components/viz/GridStatsViz'

const STEPS = [
  {
    headline: "Thousands of batteries were installed on a calculation that no longer holds.",
    body: "Store solar energy. Use it instead of buying from the grid. Pocket the difference. The logic was simple — and it was right. Every rooftop installation in Jordan was built around it. Then, in July 2024, Jordan switched to time-of-use pricing. Nobody updated the math. The battery works perfectly. The calculation doesn't.",
  },
  {
    headline: "Jordan switched to peak pricing in July 2024 — electricity now costs 34% more from 5pm to 11pm.",
    body: "Between 5pm and 11pm, electricity now costs 34% more than during the rest of the day. Every battery should be fully charged right before that window opens — then run the site through it without touching the expensive grid. Most batteries don't do this. The CFO's 4-year payback is quietly slipping.",
  },
  {
    headline: "20–25% of available savings missed every single month",
    body: "No alert. No report. No recourse. The battery just sits at whatever charge level it was left at. The peak window opens at 5pm, the battery does nothing useful, and the electricity bill arrives the same size it always did. The hardware is fine. The management software doesn't exist.",
  },
  {
    headline: "The grid operator has the same problem, scaled to a country",
    body: "NEPCO must reach 50% renewable energy by 2030 — it currently sits at 26.9%. Thousands of batteries sit behind customer meters, completely invisible to grid control. Every battery that runs on autopilot is a resource the national grid cannot use, in a country that imports 90% of its energy.",
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
      case 0: return <TariffChart variant="flat" />
      case 1: return <TariffChart variant="real" />
      case 2: return <TariffChart variant="real" showSavings />
      case 3: return <GridStatsViz activeStep={1} />
      default: return <TariffChart variant="flat" />
    }
  }

  return (
    <section id="problem" className="chapter">
      <div className="chapter-inner">

        {/* Sticky viz panel */}
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
              {renderViz()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scrolling text column */}
        <div ref={stepsRef} className="lg:col-start-1 lg:row-start-1">
          <div className="min-h-[35vh] flex flex-col justify-end pb-12 px-8 lg:px-12">
            <p className="chapter-label mb-3">Chapter 01</p>
            <h2 className="display-heading text-4xl lg:text-5xl text-primary">The Problem</h2>
          </div>

          {STEPS.map((step, i) => (
            <ScrollStep key={i} isActive={activeStep === i} className="px-8 lg:px-12 py-16">
              {i === 3 ? (
                /* ── NEPCO step: visual layout ── */
                <div className="space-y-5 max-w-lg">
                  <p className="font-mono text-xs text-accent">04 / {STEPS.length}</p>
                  <h3 className="text-xl font-semibold text-primary leading-snug">
                    Jordan needs to double its renewable share by 2030 — and battery deployment and management is the only path to close that gap.
                  </h3>

                  {/* Import dependency */}
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ border: '1px solid #FCA5A540', background: '#FEF2F210' }}>
                    <span className="text-2xl flex-shrink-0">⚡</span>
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#B91C1C' }}>90% of Jordan's electricity is imported</p>
                      <p className="text-xs text-muted">Grid stability is a national security concern</p>
                    </div>
                  </div>

                  {/* Renewable gap progress bar */}
                  <div className="rounded-xl border border-border bg-surface px-4 py-4 space-y-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted">Renewable energy share</span>
                      <span className="font-semibold" style={{ color: '#B91C1C' }}>23 percentage points short</span>
                    </div>
                    <div className="relative h-4 rounded-full" style={{ background: '#F1F0ED' }}>
                      {/* Current share */}
                      <div className="absolute left-0 top-0 h-full rounded-l-full"
                        style={{ width: '26.9%', background: '#0B7070' }} />
                      {/* Gap to target — highlighted */}
                      <div className="absolute top-0 h-full"
                        style={{ left: '26.9%', width: '23.1%', background: '#FEE2E2' }} />
                      {/* Target marker */}
                      <div className="absolute top-0 h-full w-0.5 rounded"
                        style={{ left: '50%', background: '#B91C1C' }} />
                    </div>
                    <div className="flex justify-between text-xs font-mono font-bold">
                      <span style={{ color: '#0B7070' }}>26.9% today</span>
                      <span style={{ color: '#B91C1C' }}>50% by 2030</span>
                    </div>
                  </div>

                  {/* Hidden battery resource */}
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                    <span className="text-2xl flex-shrink-0">🔋</span>
                    <div>
                      <p className="text-sm font-semibold text-primary">82,780 batteries across Jordan</p>
                      <p className="text-xs text-muted">Zero are visible to NEPCO's grid management system</p>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-primary">
                    The hardware problem is solved. The software problem isn't.
                  </p>
                </div>
              ) : (
                /* ── Generic step layout ── */
                <div className="space-y-4 max-w-lg">
                  <p className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, '0')} / {STEPS.length}
                  </p>
                  <h3 className="text-xl font-semibold text-primary leading-snug">{step.headline}</h3>
                  <p className="text-muted leading-relaxed">{step.body}</p>
                </div>
              )}
            </ScrollStep>
          ))}

          <div className="min-h-[25vh]" />
        </div>
      </div>
    </section>
  )
}
