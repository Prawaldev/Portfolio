import { useEffect, useId, useRef } from 'react'

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

/* -------------------------------------------------------------- shape morph
   the png is a disc painted edge to edge, so the outline has to come from a
   clip. both shapes are sampled at the same angles and written out as the
   same number of cubic segments, so the turn between them is nothing but
   numbers lerped from one outline to the other. */

type Pt = [number, number]

const SIZE = 512
const MID = SIZE / 2
/* the circle state sits a hair outside the artwork, so at rest the edge you
   see is the artwork's own, and the expressive state tucks just inside it:
   a squircle is always wider than its circle at the corners, and there is no
   artwork out there to fill them */
const CIRCLE_R = 258
const EXPRESSIVE_R = 222
/* superellipse power: 2 is a circle, 3.2 is the fuller, softer square that
   Material 3 Expressive leans on */
const EXPRESSIVE_N = 3.2
/* how far past the target the spring is allowed to go, so the settle has
   something to come back from */
const OVERSHOOT = 1.18
const POINTS = 20
const STEPS = 120
/* ms for one circle -> expressive -> circle pass */
const CYCLE = 18000

/** Points of a superellipse, one every POINTS/NTH of the turn. */
function outline(r: number, n: number): Pt[] {
  return Array.from({ length: POINTS }, (_, i) => {
    const t = (i / POINTS) * Math.PI * 2
    const c = Math.abs(Math.cos(t))
    const s = Math.abs(Math.sin(t))
    const k = (c ** n + s ** n) ** (-1 / n)
    return [MID + r * k * Math.cos(t), MID + r * k * Math.sin(t)]
  })
}

const round = (v: number) => Math.round(v * 10) / 10

/** Closed catmull-rom spline, written as the cubics a path takes. */
function pathOf(points: Pt[]): string {
  const n = points.length
  const at = (i: number) => points[((i % n) + n) % n]
  const head = at(0)
  let d = `M${round(head[0])} ${round(head[1])}`

  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1)
    const p1 = at(i)
    const p2 = at(i + 1)
    const p3 = at(i + 2)
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]

    d += `C${round(c1[0])} ${round(c1[1])} ${round(c2[0])} ${round(c2[1])} ${round(
      p2[0],
    )} ${round(p2[1])}`
  }

  return `${d}Z`
}

const CIRCLE = outline(CIRCLE_R, 2)
const EXPRESSIVE = outline(EXPRESSIVE_R, EXPRESSIVE_N)

/* every frame of the turn, built once: the loop only picks a path */
const PATHS = Array.from({ length: STEPS + 1 }, (_, i) => {
  const t = (i / STEPS) * OVERSHOOT
  return pathOf(CIRCLE.map((p, k) => [p[0] + (EXPRESSIVE[k][0] - p[0]) * t, p[1] + (EXPRESSIVE[k][1] - p[1]) * t]))
})

/* the expressive timing: a quick rise that overshoots, a beat to settle onto
   the shape, a hold, then a slower, softer way back to the circle */
const KEYS: [number, number][] = [
  [0, 0],
  [0.28, 0],
  [0.42, OVERSHOOT],
  [0.52, 1],
  [0.68, 1],
  [0.86, 0],
  [1, 0],
]
const EASES = ['linear', 'out', 'inout', 'linear', 'inout', 'linear']

function ease(kind: string, x: number) {
  if (kind === 'out') return 1 - (1 - x) ** 3
  if (kind === 'inout') return x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2
  return x
}

/** How far along the morph this moment is, 0 = circle, 1 = expressive. */
function shapeAt(clock: number) {
  const u = ((((clock % CYCLE) + CYCLE) % CYCLE) / CYCLE)
  let i = KEYS.findIndex((key, k) => k > 0 && key[0] >= u)
  if (i < 0) i = KEYS.length - 1

  const [ua, ta] = KEYS[i - 1]
  const [ub, tb] = KEYS[i]
  const raw = ub === ua ? 0 : (u - ua) / (ub - ua)

  return ta + (tb - ta) * ease(EASES[i - 1], raw)
}

/** The site icon, turning anticlockwise in the same box the hologram used,
    its outline morphing between a circle and an expressive squircle. */
export function HeroIcon({ className = '' }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const spinner = useRef<HTMLDivElement>(null)
  const shape = useRef<SVGPathElement>(null)
  const clipId = `hero-shape-${useId().replace(/[^a-z0-9]/gi, '')}`

  useEffect(() => {
    const host = box.current
    const disc = spinner.current
    const outlinePath = shape.current
    if (!host || !disc || !outlinePath) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let angle = 0
    let lean = 0
    let wantX = 0
    let clock = 0
    let last = performance.now()
    let raf = 0

    /* never start blind: if the first observer callback lands before layout
       settles, the icon must not sit still */
    const rect = host.getBoundingClientRect()
    let onScreen = rect.bottom > 0 && rect.top < window.innerHeight

    const paint = () => {
      /* css rotate() grows clockwise, so the falling angle is the anticlockwise turn */
      disc.style.transform = `rotateX(${lean.toFixed(2)}deg) rotate(${angle.toFixed(2)}deg)`

      const step = Math.max(0, Math.min(STEPS, Math.round((shapeAt(clock) / OVERSHOOT) * STEPS)))
      outlinePath.setAttribute('d', PATHS[step])
    }

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      clock += dt * 1000

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
      /* reduced motion means the turn does not run, so the outline has to be
         back at rest too — otherwise the icon freezes half morphed */
      if (reduce.matches) clock = 0
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
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full">
            <defs>
              <clipPath id={clipId}>
                <path ref={shape} d={PATHS[0]} />
              </clipPath>
            </defs>

            <g clipPath={`url(#${clipId})`}>
              {GHOSTS.map((ghost) => (
                <image
                  key={ghost.lag}
                  href="/icon-512.png"
                  width={SIZE}
                  height={SIZE}
                  opacity={ghost.opacity}
                  transform={`rotate(${ghost.lag} ${MID} ${MID})`}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
