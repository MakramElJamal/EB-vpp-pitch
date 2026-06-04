import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollama } from '../hooks/useScrollama'
import ScrollStep from '../components/layout/ScrollStep'
import useScrollStore from '../store/scrollStore'
import RevenueViz from '../components/viz/RevenueViz'

const STEPS = [
  {
    headline: "JOD 30 a month. We only earn more when you save more.",
    body: "A flat JOD 30 per site per month — never a budget conversation. On top of that, we take 10% of whatever we save the customer on their electricity bill. If the saving doesn't materialise, the extra fee doesn't either. No risk for the customer. Fully aligned incentives for us.",
  },
  {
    headline: "A typical site saves JOD 400–1,200 a month. We earn JOD 70–150 of that.",
    body: "Commercial sites in Jordan spend JOD 5,000–15,000 per month on electricity. Avoiding peak prices saves them JOD 400–1,200 of that. Our 10% of those savings, plus the subscription, gives us JOD 70–150 per site per month — growing with the size of the site. We need 1–3 sites in Year 1 to prove it, then word of mouth does the rest.",
  },
  {
    headline: "NEPCO is our next client — not a risk.",
    body: "Jordan's national grid operator (NEPCO) needs to see and manage the thousands of batteries behind commercial meters. Right now, they can't. As our portfolio grows, we become the only platform that can show them those assets and coordinate them. That turns us from a software service for businesses into infrastructure for Jordan's energy grid — and a new revenue layer from a very different type of client.",
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
