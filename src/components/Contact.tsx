import { useEffect, useRef, useState } from 'react'
import { socials } from '../data'

/* GitHub mark, stroked by /icons/github.svg and coloured through the mask */
function GithubIcon() {
  return <span className="icon icon-github" aria-hidden="true" />
}

/* Discord mark, official blurple */
function DiscordIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="#5865f2" aria-hidden="true">
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 .857.857 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.291.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  )
}

const icons = {
  github: GithubIcon,
  discord: DiscordIcon,
}

/** Discord has no profile links, so the handle copies itself instead. */
function DiscordHandle({ handle }: { handle: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = () => {
    navigator.clipboard.writeText(handle).then(() => {
      setCopied(true)
      timer.current = window.setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <button type="button" className="copy-handle" onClick={copy}>
      {copied ? 'Copied!' : handle}
    </button>
  )
}

export function Contact() {
  return (
    <>
      {socials.map((social) => {
        const Icon = icons[social.brand]
        return (
          <article key={social.label} className="card">
            <div className="contact-icon">
              <Icon />
            </div>
            <h2>{social.label}</h2>
            <p>
              {social.href ? (
                <a href={social.href}>{social.handle}</a>
              ) : (
                <DiscordHandle handle={social.handle} />
              )}
            </p>
            <small>{social.href ? 'Check it out!' : 'Click the handle to copy it.'}</small>
          </article>
        )
      })}
    </>
  )
}
