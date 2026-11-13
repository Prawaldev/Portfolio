import { useState } from 'react'
import { profile } from './data'
import { Projects } from './components/Projects'
import { Favourites } from './components/Favourites'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

const TABS = [
  { id: 'projects', label: 'Projects', View: Projects },
  { id: 'favourites', label: 'Favourites', View: Favourites },
  { id: 'contact', label: 'Contact', View: Contact },
] as const

type TabId = (typeof TABS)[number]['id']

export default function App() {
  const [tab, setTab] = useState<TabId>('projects')
  const Active = TABS.find((t) => t.id === tab)?.View ?? Projects

  return (
    <>
      <h1 id="hello">Hello!</h1>

      <header className="profile">
        <div className="mask-ring">
          <div className="cookie-spin">
            <div className="cookie-shape">
              <img
                className="cookie-avatar"
                src="/icon-512.png"
                alt="Prawal's avatar — ink drawing of a long-haired swordsman, eyes covered by a blur"
                width={512}
                height={512}
                loading="eager"
              />
            </div>
          </div>
        </div>
        <h1 className="name">{profile.name}</h1>
        <p className="pronouns">{profile.pronouns}</p>
      </header>

      <p className="welcome">{profile.welcome}</p>

      <nav className="buttons" aria-label="Sections">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className="styledbutton"
            aria-pressed={tab === t.id}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="contents" id="contents">
        <Active />
      </main>

      <Footer />
    </>
  )
}
