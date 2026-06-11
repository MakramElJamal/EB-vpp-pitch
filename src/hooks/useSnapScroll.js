import { useEffect } from 'react'

// Presentation-style paging: one wheel gesture (or arrow key) moves exactly
// one slide. Slides are every scrollama step ([data-step]) plus any block
// marked [data-snap]. Targets are recomputed on each gesture so lazy-loaded
// sections and resizes are always accounted for.

const SELECTOR = '[data-step], [data-snap]'
const GESTURE_GAP = 150 // ms of wheel silence that starts a new gesture
const MIN_DELTA = 8

export default function useSnapScroll() {
  useEffect(() => {
    let lastWheel = 0
    let consumed = false
    let animating = false
    let animTimer = null

    const slideTops = () => {
      const vh = window.innerHeight
      return Array.from(document.querySelectorAll(SELECTOR))
        .map((el) => {
          const r = el.getBoundingClientRect()
          const top = r.top + window.scrollY
          // Tall slides align to top; short ones get centered in the viewport
          return r.height >= vh * 0.95 ? top : top - (vh - r.height) / 2
        })
        .map((t) => Math.max(0, Math.round(t)))
        .sort((a, b) => a - b)
    }

    const go = (dir) => {
      const tops = slideTops()
      if (!tops.length) return
      const y = window.scrollY
      const next = dir > 0
        ? tops.find((t) => t > y + 10)
        : [...tops].reverse().find((t) => t < y - 10)
      if (next === undefined) return
      animating = true
      window.scrollTo({ top: next, behavior: 'smooth' })
      clearTimeout(animTimer)
      animTimer = setTimeout(() => { animating = false }, 700)
    }

    const onWheel = (e) => {
      if (e.ctrlKey) return // let pinch-zoom through
      e.preventDefault()
      const now = performance.now()
      if (now - lastWheel > GESTURE_GAP) consumed = false
      lastWheel = now
      if (consumed) return
      if (Math.abs(e.deltaY) < MIN_DELTA) return
      consumed = true // one slide per gesture — inertia tail gets swallowed
      if (!animating) go(e.deltaY > 0 ? 1 : -1)
    }

    const onKey = (e) => {
      if (e.target instanceof HTMLElement && /input|textarea|select/i.test(e.target.tagName)) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault()
        if (!animating) go(1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault()
        if (!animating) go(-1)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      clearTimeout(animTimer)
    }
  }, [])
}
