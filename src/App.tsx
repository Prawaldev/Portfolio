import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { profile } from './data'
import { ThemeSwitch } from './components/ThemeSwitch'
import { CardArt } from './components/CardArt'
import { Projects } from './components/Projects'
import { Favourites } from './components/Favourites'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

const TABS = [
  { id: 'projects', label: 'Projects', View: Projects, look: 'navy', icon: 'folder', tilt: -9, dir: '~/prawaldev-projects' },
  { id: 'favourites', label: 'Favourites', View: Favourites, look: 'green', icon: 'heart', tilt: 0, dir: '~/prawal-favourites' },
  { id: 'contact', label: 'Contact', View: Contact, look: 'cocoa', icon: 'info', tilt: 9, dir: '~/.config/prawal' },
] as const

type TabId = (typeof TABS)[number]['id']

export default function App() {
  const [active, setActive] = useState<TabId | null>(null)
  const [closing, setClosing] = useState(false)
  /** where the picked card sat — the terminal grows out of that spot */
  const [origin, setOrigin] = useState({ x: '0px', y: '0px', r: '0deg' })

  const activeTab = TABS.find((t) => t.id === active)

  /* the open screen takes over scrolling */
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  /* escape folds the terminal back into the hand */
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setClosing(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  /** remember where the picked card sat, then deal the terminal out of it */
  function open(id: TabId, el: HTMLButtonElement) {
    const r = el.getBoundingClientRect()
    setOrigin({
      x: `${r.left + r.width / 2 - window.innerWidth / 2}px`,
      y: `${r.top + r.height / 2 - window.innerHeight / 2}px`,
      r: `${el.dataset.tilt ?? 0}deg`,
    })
    setActive(id)
  }

  return (
    <>
      <ThemeSwitch />

      <h1 id="hello">Hello!</h1>

      <header className="profile">
        <img
          className="avatar"
          src="/icon-512.png"
          alt="Prawal's avatar — ink drawing of a long-haired swordsman, eyes covered by a blur"
          width={512}
          height={512}
          loading="eager"
        />
        <h1 className="name">{profile.name}</h1>
        <p className="pronouns">{profile.pronouns}</p>
      </header>

      <p className="welcome">{profile.welcome}</p>

      <nav className="deck" aria-label="Sections">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`deckcard deckcard-${t.look}`}
            data-tilt={t.tilt}
            onClick={(e) => open(t.id, e.currentTarget)}
          >
            <CardArt icon={t.icon} />
            <span className="deckcard-label">{t.label}</span>
          </button>
        ))}
      </nav>

      {active && activeTab && (
        <main
          className={closing ? 'screen screen-closing' : 'screen'}
          style={
            {
              '--from-x': origin.x,
              '--from-y': origin.y,
              '--from-r': origin.r,
            } as CSSProperties
          }
          aria-label={activeTab.label}
          onAnimationEnd={() => {
            if (closing) {
              setActive(null)
              setClosing(false)
            }
          }}
        >
          <div className="term">
            <div className="term-body">
              <div className="term-inner">
                <activeTab.View />
              </div>
            </div>
            <div className="term-tabbar">
              <span className="term-tab">
                <span className="term-tab-title">{`prawal@arch: ${activeTab.dir}`}</span>
                <button
                  type="button"
                  className="term-tab-close"
                  aria-label="Close"
                  onClick={() => setClosing(true)}
                >
                  <span className="icon icon-x" aria-hidden="true" />
                </button>
              </span>
              <span className="term-hint">esc to quit</span>
            </div>
          </div>
        </main>
      )}

      <Footer />
    </>
  )
}
