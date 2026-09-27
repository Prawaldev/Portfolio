import { useTheme } from '../hooks/useTheme'
import { navLinks, sectionIds } from '../data'
import { useActiveSection } from '../hooks/useActiveSection'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const active = useActiveSection(sectionIds)

  return (
    <header className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-[var(--line)] pb-5">
      <nav aria-label="Main">
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[0.82rem]">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={
                    isActive
                      ? 'text-[var(--amber)] transition-colors duration-200'
                      : 'text-[var(--ink-dim)] transition-colors duration-200 hover:text-[var(--ink)]'
                  }
                >
                  {isActive ? '>' : null}
                  {isActive ? ' ' : null}
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* theme switch */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        className="ml-auto grid h-9 w-9 place-items-center border border-[var(--line)] bg-transparent text-[var(--ink-dim)] transition-colors duration-200 hover:border-[var(--amber)] hover:text-[var(--amber)]"
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  )
}

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.4 14.6A8.6 8.6 0 0 1 9.4 3.6a8.6 8.6 0 1 0 11 11Z" />
    </svg>
  )
}
