import { facts } from '../data'

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="panel flex scroll-mt-8 flex-col">
      <p className="label">
        <span className="prompt">02.</span> About Me
      </p>

      <h2
        id="about-heading"
        className="display mt-6 text-[clamp(1.9rem,3.4vw,2.7rem)]"
      >
        I&#39;m Prawal Khadka
      </h2>

      <p className="prose-dim mt-6 text-[0.95rem]">
        I&#39;m a BCA student, currently learning web development and exploring new
        technologies. I don&#39;t have professional experience yet, but I&#39;m building
        websites using AI to learn, get hands-on practice, and improve over time.
      </p>

      <ul className="mt-8 space-y-3">
        {facts.map((fact) => (
          <li key={fact.text} className="flex items-baseline gap-3 text-[0.9rem] text-[var(--ink-soft)]">
            <span className="prompt w-5 shrink-0 text-center" aria-hidden="true">
              {fact.icon}
            </span>
            <span>{fact.text}</span>
          </li>
        ))}
      </ul>

      <a
        href="https://github.com/Prawaldev"
        target="_blank"
        rel="noreferrer"
        className="btn mt-9 self-start"
        aria-label="Read more about Prawal on GitHub (new tab)"
      >
        More About Me <span aria-hidden="true">→</span>
      </a>

      {/* thin divider + short personal statement */}
      <div className="mt-auto flex flex-1 gap-6 pt-12">
        <div className="vline hidden sm:block" aria-hidden="true" />
        <blockquote className="max-w-[15rem] text-[0.9rem] leading-[1.9] text-[var(--ink-soft)]">
          <p>&quot;Not a professional yet, but I&#39;m putting in the effort.</p>
          <p className="mt-4">This is just the beginning.&quot;</p>
          <footer className="meta mt-5">
            <span className="dash" /> Prawal
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
