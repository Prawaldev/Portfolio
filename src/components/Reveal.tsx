import { useEffect, useRef, useState, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** delay in ms, so a row of panels can fade in one after another */
  delay?: number
}

/**
 * Fades a panel in the first time it scrolls into view.
 *
 * The animation is a bonus, never a requirement: anything already on screen
 * (or any browser without IntersectionObserver) is shown straight away, so the
 * content can never end up stuck at opacity 0.
 */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isIn, setIsIn] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reveal = () => setIsIn(true)

    // already on screen → no need to wait for an observer
    if (node.getBoundingClientRect().top < window.innerHeight) {
      reveal()
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      reveal()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.08 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${isIn ? 'is-in' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
