import { lazy, Suspense, useEffect } from 'react'
import { useIsMobile } from './hooks/useIsMobile'
import ChapterNav from './components/layout/ChapterNav'
import useScrollStore from './store/scrollStore'

const Hero             = lazy(() => import('./sections/Hero'))
const MoneySection     = lazy(() => import('./sections/MoneySection'))
const ProblemSection   = lazy(() => import('./sections/ProblemSection'))
const SolutionSection  = lazy(() => import('./sections/SolutionSection'))
const TractionSection  = lazy(() => import('./sections/TractionSection'))
const BusinessModelSection = lazy(() => import('./sections/BusinessModelSection'))
const MoatSection      = lazy(() => import('./sections/MoatSection'))
const AskSection       = lazy(() => import('./sections/AskSection'))
const CloseSection     = lazy(() => import('./sections/CloseSection'))
const MobileApp        = lazy(() => import('./sections/MobileApp'))

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center text-muted font-mono text-sm">
    Loading...
  </div>
)

function DesktopApp() {
  const { setScrollProgress } = useScrollStore()

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [setScrollProgress])

  return (
    <div className="bg-bg text-primary min-h-screen">
      <ChapterNav />
      <Suspense fallback={<Loader />}>
        <Hero />
        <MoneySection />
        <ProblemSection />
        <SolutionSection />
        <TractionSection />
        <BusinessModelSection />
        <MoatSection />
        <AskSection />
        <CloseSection />
      </Suspense>
    </div>
  )
}

export default function App() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Suspense fallback={<Loader />}>
        <MobileApp />
      </Suspense>
    )
  }

  return <DesktopApp />
}
