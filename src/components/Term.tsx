import type { ReactNode } from 'react'

/* the zsh-style prompt that opens every command line of the terminal screens;
   with no children it ends in a blinking block cursor */
export function Prompt({ children }: { children?: ReactNode }) {
  return (
    <p className="t-line">
      [<span className="t-user">prawal@arch</span> <span className="t-path">~</span>]${' '}
      {children ?? <span className="t-cursor" aria-hidden="true" />}
    </p>
  )
}
