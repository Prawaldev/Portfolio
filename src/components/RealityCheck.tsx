import { realityCheckLines } from '../data'

/** Honest note about where the projects come from. */
export function RealityCheck() {
  return (
    <section aria-labelledby="reality-heading" className="panel flex flex-col">
      <p className="text-[0.95rem] font-bold tracking-[0.04em] text-[var(--ink)]">
        <span className="prompt">&gt;_</span> Reality Check
      </p>
      <h2 id="reality-heading" className="sr-only">
        Reality Check
      </h2>

      <div className="mt-8 flex-1 border border-[var(--line)] bg-[var(--void)] p-5 sm:p-7">
        <div className="text-[clamp(0.85rem,1.35vw,1rem)] leading-[2.1] text-[var(--ink-soft)]">
          {realityCheckLines.map((line) => (
            <p key={line} className="whitespace-pre-line">
              <span className="prompt" aria-hidden="true">
                &gt;{' '}
              </span>
              {line}
            </p>
          ))}

          <p className="mt-6 text-[var(--ink-dim)]">
            So yeah... it&#39;s not perfect,
            <br />
            but it&#39;s mine. And it&#39;s just the beginning.
          </p>
        </div>

        <p className="mt-6">
          <span className="caret-ink" aria-hidden="true" />
        </p>
      </div>
    </section>
  )
}
