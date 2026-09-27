export function Footer() {
  return (
    <footer className="mt-10 border-t border-[var(--line)] py-8">
      <div className="flex flex-col items-center justify-between gap-4 text-[0.8rem] text-[var(--ink-dim)] sm:flex-row">
        <p className="meta">
          <span className="prompt">&gt;_</span> Prawal Khadka
          <span className="dash" /> {new Date().getFullYear()}
        </p>

        <p className="text-center">
         blah blah
        </p>

        <a href="#home" className="text-link">
          back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}
