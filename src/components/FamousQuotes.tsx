import { famousQuotes } from '../data'

/** Quotes on a terminal background, closed by a short note. */
export function FamousQuotes() {
  return (
    <section aria-labelledby="quotes-heading" className="panel flex flex-col">
      <p className="label">
        <span className="prompt">05.</span> Famous Quotes
      </p>
      <h2 id="quotes-heading" className="sr-only">
        Famous Quotes
      </h2>

      <div className="mt-8 flex-1 rounded-[var(--radius)] bg-[var(--void)] p-5 sm:p-7">
        <div className="grid gap-x-12 gap-y-9 lg:grid-cols-2">
          {famousQuotes.map((quote) => (
            <figure key={quote.text}>
              <blockquote className="text-[clamp(0.85rem,1.35vw,1rem)] leading-[2.1] text-[var(--ink-soft)]">
                <span className="prompt" aria-hidden="true">
                  &gt;{' '}
                </span>
                &quot;{quote.text}&quot;
              </blockquote>
              <figcaption className="meta mt-3 text-[0.8rem]">
                <span className="dash" /> {quote.author}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-10 border-t border-[var(--line)] pt-6 text-[clamp(0.85rem,1.35vw,1rem)] leading-[2.1] text-[var(--ink-dim)]">
          <span className="prompt" aria-hidden="true">
            &gt;{' '}
          </span>
          So yeah... it&#39;s not perfect,
          <br />
          but it&#39;s mine. And it&#39;s just the beginning.
        </p>

        <p className="mt-6">
          <span className="caret-ink" aria-hidden="true" />
        </p>
      </div>
    </section>
  )
}
