import { useEffect, useRef } from 'react'

/* anticlockwise turn, degrees per second at rest (22s for a full circle) */
const SPIN = 16
/* how far the cursor can lean the icon, in degrees */
const MAX_LEAN = 7
/* motion blur: copies trailing the sharp one, each a little further back
   along the turn and fainter, so the smear grows with the speed and needs
   no filter to render */
const GHOSTS = [
  { lag: 0, opacity: 1 },
  { lag: 1.5, opacity: 0.34 },
  { lag: 3.1, opacity: 0.16 },
  { lag: 5, opacity: 0.075 },
]

/** The site icon, turning anticlockwise in the same box the hologram used. */
export function HeroIcon({ className = '' }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const spinner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = box.current
    const disc = spinner.current
    if (!host || !disc) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let angle = 0
    let lean = 0
    let wantX = 0
    let last = performance.now()
    let raf = 0

    /* never start blind: if the first observer callback lands before layout
       settles, the icon must not sit still */
    const rect = host.getBoundingClientRect()
    let onScreen = rect.bottom > 0 && rect.top < window.innerHeight

    const paint = () => {
      /* css rotate() grows clockwise, so the falling angle is the anticlockwise turn */
      disc.style.transform = `rotateX(${lean.toFixed(2)}deg) rotate(${angle.toFixed(2)}deg)`
    }

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      /* the turn falls anticlockwise; the cursor can speed it up on the right
         and slow it on the left, and the icon leans towards the pointer */
      angle -= SPIN * (1 + wantX * 0.5) * dt
      lean += (wantX * MAX_LEAN * 0.55 - lean) * Math.min(dt * 6, 1)
      paint()

      raf = window.requestAnimationFrame(frame)
    }

    const start = () => {
      if (raf) return
      last = performance.now()
      raf = window.requestAnimationFrame(frame)
    }

    const stop = () => {
      window.cancelAnimationFrame(raf)
      raf = 0
    }

    const syncMotion = () => {
      stop()
      if (onScreen && !document.hidden) {
        start()
      } else {
        paint()
      }
    }

    const onPointer = (e: PointerEvent) => {
      wantX = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth) * 2 - 1))
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else syncMotion()
    }

    const onReduce = () => syncMotion()

    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    reduce.addEventListener('change', onReduce)

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        syncMotion()
      },
      { rootMargin: '160px' },
    )
    observer.observe(host)

    syncMotion()

    return () => {
      observer.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      reduce.removeEventListener('change', onReduce)
      stop()
    }
  }, [])

  return (
    <div ref={box} className={className} aria-hidden="true">
      <div className="relative aspect-square w-full">
        <div ref={spinner} className="absolute inset-0 [transform-style:preserve-3d] will-change-transform">
          {GHOSTS.map((ghost) => (
            <img
              key={ghost.lag}
              src="/icon-512.png"
              alt=""
              width={512}
              height={512}
              decoding="async"
              style={{ transform: `rotate(${ghost.lag}deg)`, opacity: ghost.opacity }}
              className="absolute inset-0 h-full w-full object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
