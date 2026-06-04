import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter'

function FadeUp({ delay = 0, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

function MSection({ id, children, accent = false }) {
  return (
    <section id={id}
      className={`px-5 py-16 flex flex-col justify-center gap-6 border-b border-border ${accent ? 'bg-surface' : 'bg-bg'}`}
      style={{ minHeight: '100svh' }}>
      {children}
    </section>
  )
}

function MStat({ value, unit, label, color, animate }) {
  const count = useAnimatedCounter(value, 1400, animate)
  return (
    <div className="text-center space-y-1">
      <p className="stat-number font-bold" style={{ fontSize: '3.5rem', color }}>
        {count.toLocaleString()}{unit}
      </p>
      <p className="text-muted text-sm">{label}</p>
    </div>
  )
}

function MStatWrapper({ value, unit, label, color }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref}>
      <MStat value={value} unit={unit} label={label} color={color} animate={inView} />
    </div>
  )
}

export default function MobileApp() {
  return (
    <div className="bg-bg text-primary font-sans">

      {/* Hero */}
      <MSection id="m-hero">
        <FadeUp>
          <p className="chapter-label">VPP Jordan · 2026</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="display-heading text-4xl leading-tight">
            Jordan has 82,780 rooftop solar systems.
          </h1>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="text-gold text-2xl font-medium leading-snug">
            Most of them are wasting money right now.
          </p>
        </FadeUp>
        <FadeUp delay={0.4}>
          <p className="text-muted text-base leading-relaxed">
            Not because the hardware is broken. Because no software is telling it what to do.
          </p>
        </FadeUp>
      </MSection>

      {/* Problem */}
      <MSection id="m-problem" accent>
        <FadeUp><p className="chapter-label">The Problem</p></FadeUp>
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-2 gap-6">
            <MStatWrapper value={25} unit="%" label="Peak price premium (17:00–23:00)" color="#E8A838" />
            <MStatWrapper value={15} unit="%" label="savings unrealised monthly" color="#EF4444" />
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="border-l-2 border-accent pl-4">
            <p className="text-muted text-sm leading-relaxed">
              The plant manager bought the BESS. Told his CFO it would pay back in 4 years. It isn't.
              Manual dispatch misses the peak window every evening.
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="grid grid-cols-2 gap-6 pt-2">
            <MStatWrapper value={26.9} unit="%" label="NEPCO renewables — target 50% by 2030" color="#0D9488" />
            <MStatWrapper value={82780} unit="" label="PV systems invisible to grid control" color="#A78BFA" />
          </div>
        </FadeUp>
        <FadeUp delay={0.4}>
          <p className="serif-body text-xl text-primary italic">
            "The asset base already exists. The problem is purely software."
          </p>
        </FadeUp>
      </MSection>

      {/* Solution */}
      <MSection id="m-solution">
        <FadeUp><p className="chapter-label">The Solution</p></FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-primary text-base leading-relaxed">
            Software that tells Jordan's existing rooftop batteries when to charge cheap and release during expensive peak hours —
            turning idle hardware into a verified monthly saving on the electricity bill.
          </p>
        </FadeUp>
        {[
          { label: 'What the customer already owns', desc: 'Solar panels + battery + inverter — no new hardware needed', color: '#E8A838' },
          { label: 'How we connect', desc: 'Through government-installed smart meters already on site — customer keeps full override', color: '#60A5FA' },
          { label: 'The smart scheduling layer', desc: 'Our software plans the battery schedule overnight, automatically, every day', color: '#0D9488' },
          { label: 'What the customer sees', desc: 'A simple dashboard and a monthly report showing exactly how much they saved', color: '#22C55E' },
        ].map((layer, i) => (
          <FadeUp key={i} delay={0.1 + i * 0.1}>
            <div className="border rounded-lg p-3.5 flex gap-3"
              style={{ borderColor: layer.color + '40', background: layer.color + '08' }}>
              <div className="w-1 flex-shrink-0 rounded-full" style={{ background: layer.color }} />
              <div>
                <p className="text-xs font-mono font-bold mb-0.5" style={{ color: layer.color }}>{layer.label}</p>
                <p className="text-muted text-sm">{layer.desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </MSection>

      {/* Traction */}
      <MSection id="m-traction" accent>
        <FadeUp><p className="chapter-label">Traction & Evidence</p></FadeUp>
        <FadeUp delay={0.1}>
          <div className="space-y-4">
            <MStatWrapper value={82780} unit="" label="distributed PV systems in Jordan" color="#0D9488" />
            <MStatWrapper value={0} unit="" label="VPP competitors in MENA today" color="#22C55E" />
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="space-y-2">
            {[
              ['Jul 2024', 'Peak pricing rules made mandatory for industry'],
              ['Nov 2024', 'Law amended — private battery storage now legal'],
              ['Jan 2025', 'Peak pricing extended to hotels, hospitals, banks'],
              ['2024', 'US government funds Jordan VPP feasibility study'],
            ].map(([date, ev], i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="font-mono text-xs text-gold flex-shrink-0 w-16 pt-0.5">{date}</span>
                <p className="text-muted text-sm">{ev}</p>
              </div>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="text-primary text-sm font-medium">
            "The market is being legislated into existence."
          </p>
        </FadeUp>
      </MSection>

      {/* Business Model */}
      <MSection id="m-biz">
        <FadeUp><p className="chapter-label">Business Model</p></FadeUp>
        <FadeUp delay={0.1}>
          <div className="border border-border rounded-xl p-5 bg-surface space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="stat-number text-3xl text-gold font-bold">JOD 30</span>
              <span className="text-muted text-sm">/ site / month</span>
            </div>
            <p className="text-muted text-xs">A rounding error on a large electricity bill</p>
            <div className="border-t border-border pt-3">
              <span className="stat-number text-xl text-accent font-bold">+10%</span>
              <span className="text-muted text-sm ml-2">of whatever we save them</span>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.15}>
          <div className="flex items-center gap-3">
            <span className="stat-number text-3xl text-success font-bold">74%</span>
            <div>
              <p className="text-sm text-primary font-medium">Gross margin — at every scale</p>
              <p className="text-xs text-muted">Software costs don't grow with more sites</p>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="space-y-2">
            {[
              ['Year 1', '3 pilot sites', '~JOD 3–4K'],
              ['Year 2–3', '20 sites', '~JOD 24K'],
              ['Year 5', '80–100 sites', '~JOD 108K'],
            ].map(([yr, sites, rev], i) => (
              <div key={i} className="flex justify-between text-sm border-b border-border pb-1.5">
                <span className="text-muted">{yr} · {sites}</span>
                <span className="font-mono text-muted">{rev}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </MSection>

      {/* Ask */}
      <MSection id="m-ask" accent>
        <FadeUp><p className="chapter-label">The Ask</p></FadeUp>
        <FadeUp delay={0.1}>
          <div className="text-center">
            <p className="text-muted text-sm mb-1">We are raising</p>
            <p className="stat-number font-bold text-gold" style={{ fontSize: '4rem' }}>JOD 105K</p>
            <p className="text-muted text-xs mt-1">≈ USD 148,000 · pre-seed</p>
          </div>
        </FadeUp>
        <FadeUp delay={0.15}>
          <div className="grid grid-cols-2 gap-2">
            {[
              ['Month 4', 'First pilot signed'],
              ['Month 6', 'First saving verified'],
              ['Month 12', '3 paying customers'],
              ['Year 1', 'EMRC dialogue started'],
            ].map(([m, l], i) => (
              <div key={i} className="border border-border rounded-lg p-3 bg-bg">
                <p className="font-mono text-xs text-accent mb-0.5">{m}</p>
                <p className="text-sm text-primary">{l}</p>
              </div>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="grid grid-cols-3 gap-3 text-center border border-border rounded-xl p-4 bg-bg">
            <div>
              <p className="stat-number text-xl text-danger font-bold">0.69</p>
              <p className="text-muted text-xs">Year 1 LTV:CAC</p>
            </div>
            <div>
              <p className="stat-number text-xl text-success font-bold">&gt;3.0</p>
              <p className="text-muted text-xs">Year 5 LTV:CAC</p>
            </div>
            <div>
              <p className="stat-number text-xl text-accent font-bold">8mo</p>
              <p className="text-muted text-xs">HW payback</p>
            </div>
          </div>
        </FadeUp>
      </MSection>

      {/* Close */}
      <MSection id="m-close">
        <FadeUp>
          <div className="space-y-3">
            {[
              ['Why Now', '#0D9488', 'ToU arbitrage opened Jul 2024 — first time ever in Jordan. No MENA competitor today.'],
              ['Why Jordan', '#E8A838', '90% energy import dependency. 1 GW PV installed. Government-commissioned VPP study.'],
              ['Why Us', '#A78BFA', 'Power systems depth. Cultural capital inside Jordanian industry. Data moat that compounds.'],
            ].map(([h, c, txt], i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="border rounded-lg p-4" style={{ borderColor: c + '40', background: c + '08' }}>
                  <p className="font-mono text-xs font-bold mb-1" style={{ color: c }}>{h}</p>
                  <p className="text-muted text-sm leading-relaxed">{txt}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.35}>
          <div className="text-center pt-6 space-y-4">
            <p className="serif-body text-2xl text-primary leading-relaxed">
              "Jordan's batteries are charged."
            </p>
            <p className="serif-body text-xl text-gold leading-relaxed">
              "They just need someone to tell them when to fire."
            </p>
            <p className="font-mono text-xs text-muted tracking-widest mt-4">VPP JORDAN · 2026</p>
          </div>
        </FadeUp>
      </MSection>
    </div>
  )
}
