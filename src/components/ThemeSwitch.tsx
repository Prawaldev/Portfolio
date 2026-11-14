import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'amoled'

/** the three looks, their marks from /icons, and the colour each one puts in
 *  the browser chrome */
const THEMES: { id: Theme; label: string; icon: string }[] = [
  { id: 'light', label: 'Light theme', icon: 'sun' },
  { id: 'dark', label: 'Dark theme', icon: 'moon' },
  { id: 'amoled', label: 'AMOLED theme', icon: 'moonStars' },
]

const CHROME: Record<Theme, string> = {
  light: '#f7f4ee',
  dark: '#121110',
  amoled: '#000000',
}

/** the inline script in index.html sets data-theme before first paint; read
 *  it back so React and the page agree */
function currentTheme(): Theme {
  const applied = document.documentElement.dataset.theme
  return THEMES.some((t) => t.id === applied) ? (applied as Theme) : 'amoled'
}

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* private mode — the choice just does not persist */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', CHROME[theme])
  }, [theme])

  return (
    <div className="themes" role="group" aria-label="Colour theme">
      {THEMES.map(({ id, label, icon }) => (
        <button
          key={id}
          type="button"
          className="themebutton"
          aria-label={label}
          title={label}
          aria-pressed={theme === id}
          onClick={() => setTheme(id)}
        >
          <span className={`icon icon-${icon}`} aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}
