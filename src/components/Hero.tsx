import { Navbar } from './Navbar'
import { HeroIcon } from './HeroIcon'
import { GithubIcon } from './BrandIcons'
import { profile } from '../data'

const GITHUB_URL = 'https://github.com/Prawaldev'

export function Hero() {
  return (
    <section id="home" className="panel scroll-mt-8 relative">
      <Navbar />

      {/* text column — the name is the widest thing here, so it gets the room */}
      <div className="mt-12 max-w-[42rem] lg:mt-16">
        <p className="meta text-[0.85rem] uppercase tracking-[0.22em]">Hi, I&#39;m</p>

        <h1 className="display mt-5 whitespace-nowrap text-[clamp(2.4rem,6.5vw,5.1rem)] lg:text-[clamp(2.4rem,5.8vw,5.1rem)]">
          {profile.name}
          <span className="caret" aria-hidden="true" />
        </h1>

        <p className="mt-5 text-[clamp(0.95rem,1.5vw,1.15rem)] text-[var(--ink-soft)]">
          BCA Student <span className="text-[var(--signal-dim)]">|</span> Aspiring Developer
        </p>

        <p className="prose-dim mt-7 max-w-[32rem] text-[0.95rem] sm:text-[1rem]">
          {profile.tagline.before} <span className="dash" /> {profile.tagline.after}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#projects" className="btn btn-accent">
            <span aria-hidden="true">↗</span> View Projects
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="btn"
            aria-label="Open Prawal Khadka on GitHub (new tab)"
          >
            <GithubIcon size={16} /> GitHub
          </a>
        </div>

        <p className="meta mt-12 text-[0.82rem]">
          <span className="prompt" aria-hidden="true">
            //
          </span>{' '}
          {profile.heroNote}
        </p>
      </div>

      {/* the icon sits under the text on small screens, in the corner on desktop */}
      <HeroIcon className="mx-auto mt-14 max-w-[19rem] lg:absolute lg:bottom-4 lg:right-4 lg:mx-0 lg:mt-0 lg:w-[12.5rem] xl:bottom-5 xl:right-5 xl:w-[17.5rem]" />
    </section>
  )
}
