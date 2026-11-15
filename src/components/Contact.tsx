import { Fragment, useEffect, useRef, useState } from 'react'
import { socials } from '../data'
import { Prompt } from './Term'

/* Discord has no profile links, so the handle copies itself instead. */
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
      {copied ? `${handle} — copied` : handle}
    </button>
  )
}

/* the contact details, read out of a config file */
export function Contact() {
  return (
    <>
      <Prompt>
        <span className="t-cmd">cat</span>{' '}
        <span className="t-path">~/.config/prawal/contact.conf</span>
      </Prompt>
      <p className="t-line t-blank"> </p>

      {socials.map((social) => (
        <Fragment key={social.label}>
          <p className="t-line">
            <span className="t-dir">[{social.label.toLowerCase()}]</span>
          </p>
          <p className="t-line">
            {'handle = '}
            {social.href ? (
              <span className="t-strong">
                <a href={social.href}>{social.handle}</a>
              </span>
            ) : (
              <DiscordHandle handle={social.handle} />
            )}
          </p>
          <p className="t-line">
            {'url    = '}
            {social.href ? (
              <a href={social.href}>{social.href}</a>
            ) : (
              '(none — click the handle above to copy)'
            )}
          </p>
          <p className="t-line t-blank"> </p>
        </Fragment>
      ))}

      <Prompt />
    </>
  )
}
