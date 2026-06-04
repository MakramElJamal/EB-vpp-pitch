import { create } from 'zustand'

const useScrollStore = create((set) => ({
  currentChapter: 0,
  currentStep: 0,
  scrollProgress: 0,
  setChapter: (n) => set({ currentChapter: n }),
  setStep: (n) => set({ currentStep: n }),
  setScrollProgress: (p) => set({ scrollProgress: p }),
}))

export default useScrollStore
