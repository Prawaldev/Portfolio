import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { FamousQuotes } from './components/FamousQuotes'
import { Favourites } from './components/Favourites'
import { Footer } from './components/Footer'
import { Reveal } from './components/Reveal'

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-6 sm:py-8">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-[var(--amber)] focus:bg-[var(--surface)] focus:px-4 focus:py-2 focus:text-[0.8rem]"
      >
        Skip to content
      </a>

      <main className="shell grid gap-4 lg:grid-cols-12 lg:gap-5">
        <Reveal className="lg:col-span-7">
          <Hero />
        </Reveal>

        <Reveal className="lg:col-span-5" delay={70}>
          <About />
        </Reveal>

        <Reveal className="lg:col-span-12">
          <Projects />
        </Reveal>

        <Reveal className="lg:col-span-12">
          <Contact />
        </Reveal>

        <Reveal className="lg:col-span-12">
          <FamousQuotes />
        </Reveal>

        <Reveal className="lg:col-span-12">
          <Favourites />
        </Reveal>
      </main>

      <div className="shell">
        <Footer />
      </div>
    </div>
  )
}
