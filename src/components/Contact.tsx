import { contactNotes, socials } from '../data'
import { DiscordIcon, GithubIcon } from './BrandIcons'

const brandIcon = {
  github: GithubIcon,
  discord: DiscordIcon,
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="panel scroll-mt-8">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="label">
            <span className="prompt">04.</span> Contact
          </p>

          <h2 id="contact-heading" className="display mt-6 text-[clamp(2.1rem,4.4vw,3.4rem)]">
            Let&#39;s Connect
          </h2>

          <div className="prose-dim mt-6 max-w-[42rem] space-y-4 text-[0.95rem]">
            <p>
              I&#39;m not currently available for work or professional projects. I
              haven&#39;t advanced my coding skills enough on my own yet, and most of the
              websites I&#39;ve built so far have been made with the help of AI as part of
              my learning process.
            </p>
            <p>
              I&#39;ll update this section once I&#39;ve advanced my coding skills and
              feel ready to take on real projects.
            </p>
          </div>

          {/* two contact rows, no email, no form */}
          <ul className="mt-10 border-t border-[var(--line)]">
            {socials.map((social) => {
              const Brand = brandIcon[social.brand]
              return (
                <li key={social.label} className="border-b border-[var(--line)]">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-6 py-6 transition-colors duration-200 hover:bg-[var(--surface-raised)]"
                    aria-label={`Open ${social.label} — ${social.handle} (new tab)`}
                  >
                    <span className="flex items-center gap-4 sm:gap-5">
                      <span
                        className={
                          social.brand === 'github'
                            ? 'text-[var(--github)]'
                            : 'text-[var(--discord)]'
                        }
                      >
                        <Brand size={24} />
                      </span>
                      <span className="flex flex-col gap-1.5">
                        <span className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--signal)]">
                          {social.label}
                        </span>
                        <span className="text-[clamp(0.9rem,1.6vw,1.15rem)] text-[var(--ink)] transition-colors duration-200 group-hover:text-[var(--amber)]">
                          {social.handle}
                        </span>
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[var(--signal-dim)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--amber)]"
                    >
                      →
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/* terminal note column */}
        <div className="flex flex-col">
          <div className="flex flex-1 gap-8">
            <div className="vline hidden lg:block" aria-hidden="true" />
            <div className="w-full max-w-[22rem]">
              <p className="label">
                <span className="prompt">//</span> For now, let&#39;s connect
              </p>
              <ul className="mt-6 space-y-2 text-[0.88rem] text-[var(--ink-soft)]">
                {contactNotes.map((note) => (
                  <li key={note}>
                    <span className="prompt" aria-hidden="true">
                      {note.slice(0, 1)}
                    </span>
                    {note.slice(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 border-t border-[var(--line)] pt-6 text-[0.85rem] leading-[1.9] text-[var(--ink-dim)]">
            <span className="text-[var(--ink-soft)]">
              <span className="prompt" aria-hidden="true">
                &gt;_
              </span>{' '}
              Not available for work right now.
            </span>
            <br />
            I&#39;ll update this when I&#39;m ready.
          </p>
        </div>
      </div>
    </section>
  )
}
