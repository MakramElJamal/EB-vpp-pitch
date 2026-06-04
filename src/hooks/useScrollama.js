import { useEffect } from 'react'
import scrollama from 'scrollama'

export function useScrollama({ containerRef, onStepEnter, onStepExit, offset = 0.55 }) {
  useEffect(() => {
    if (!containerRef?.current) return
    const steps = containerRef.current.querySelectorAll('[data-step]')
    if (steps.length === 0) return

    const scroller = scrollama()
    scroller
      .setup({ step: steps, offset, debug: false })
      .onStepEnter(({ element, index, direction }) => onStepEnter?.({ element, index, direction }))
      .onStepExit(({ element, index, direction }) => onStepExit?.({ element, index, direction }))

    const handleResize = () => scroller.resize()
    window.addEventListener('resize', handleResize)
    return () => {
      scroller.destroy()
      window.removeEventListener('resize', handleResize)
    }
  }, [containerRef, onStepEnter, onStepExit, offset])
}
