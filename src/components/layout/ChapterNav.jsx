import useScrollStore from '../../store/scrollStore'

const CHAPTERS = [
  { id: 'hero',       label: 'Opening' },
  { id: 'problem',    label: 'The Problem' },
  { id: 'solution',   label: 'The Solution' },
  { id: 'traction',   label: 'Traction' },
  { id: 'bizmodel',   label: 'Business Model' },
  { id: 'moat',       label: 'Why Us' },
  { id: 'ask',        label: 'The Ask' },
  { id: 'close',      label: 'Why Now' },
]

export default function ChapterNav() {
  const { currentChapter } = useScrollStore()

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 hidden lg:flex">
      {CHAPTERS.map((ch, i) => (
        <a
          key={ch.id}
          href={`#${ch.id}`}
          aria-label={`Go to ${ch.label}`}
          className="group flex items-center gap-2 justify-end"
        >
          <span className={`
            text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-right
            ${currentChapter === i ? 'text-accent opacity-100' : 'text-muted'}
          `}>
            {ch.label}
          </span>
          <span className={`
            block rounded-full transition-all duration-300
            ${currentChapter === i
              ? 'w-2.5 h-2.5 bg-accent shadow-[0_0_8px_rgba(11,112,112,0.5)]'
              : 'w-1.5 h-1.5 bg-border group-hover:bg-muted'
            }
          `} />
        </a>
      ))}
    </nav>
  )
}
