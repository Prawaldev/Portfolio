import type { ReactNode } from 'react'

/* the lucide suits, as stroke paths on the 24-unit grid — drawn inline so the
   medallion and the corner pips share one crisp stroke setup */
const SUITS: Record<string, ReactNode> = {
  folder: (
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  ),
  heart: (
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </>
  ),
}

/* one corner: a sharp L-bracket with crop-mark ticks, the suit sitting in the
   pocket like a playing-card index */
function Corner({ suit }: { suit: ReactNode }) {
  return (
    <>
      <g className="art-bracket">
        <path d="M12 24 V12 H24" />
        <path d="M12 28 V24 M28 12 H24" />
      </g>
      <g className="art-pip" transform="translate(13.25 13.25) scale(0.42)">
        {suit}
      </g>
    </>
  )
}

/* the royal face of a deck card: engraved frame, four pip pockets, a crown
   over a diamond medallion, jewelled rays and a rule for the label */
export function CardArt({ icon }: { icon: string }) {
  const suit = SUITS[icon] ?? SUITS.info
  return (
    <svg className="cardart" viewBox="0 0 100 120" aria-hidden="true" focusable="false">
      <rect className="art-line" x="6" y="6" width="88" height="108" />
      <rect className="art-hair" x="8.75" y="8.75" width="82.5" height="102.5" />
      {/* four corner pockets, mirrored into place (rotation would leave the
          tall viewBox) */}
      {[
        '',
        'translate(100 0) scale(-1 1)',
        'translate(0 120) scale(1 -1)',
        'translate(100 120) scale(-1 -1)',
      ].map((t) => (
        <g key={t} transform={t || undefined}>
          <Corner suit={suit} />
        </g>
      ))}
      <path
        className="art-fill"
        d="M42.5 31.5 V24 L46.2 26.6 L50 21.6 L53.8 26.6 L57.5 24 V31.5 Z"
      />
      <path className="art-line" d="M50 34 L74 58 L50 82 L26 58 Z" />
      <path className="art-hair" d="M50 40 L68 58 L50 76 L32 58 Z" />
      <g className="art-suit" transform="translate(39.8 47.8) scale(0.85)">
        {suit}
      </g>
      <path className="art-hair" d="M26 58 H19 M74 58 H81" />
      <path
        className="art-fill"
        d="M15 55.6 l2.4 2.4 -2.4 2.4 -2.4 -2.4 Z M85 55.6 l2.4 2.4 -2.4 2.4 -2.4 -2.4 Z"
      />
      <path className="art-hair" d="M32 102 H45.5 M54.5 102 H68" />
      <path className="art-fill" d="M50 98.8 l3.2 3.2 -3.2 3.2 -3.2 -3.2 Z" />
    </svg>
  )
}
