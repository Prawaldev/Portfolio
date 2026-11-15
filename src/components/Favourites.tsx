import { Fragment } from 'react'
import { favourites } from '../data'
import { Prompt } from './Term'

/* the directory names under ~/prawal-favourites, derived from the labels */
function dirName(label: string) {
  return label.toLowerCase().replace(/ & /g, '-and-').replace(/\s+/g, '-')
}

/* the posters listed with kitty's icat, shown straight in the terminal */
export function Favourites() {
  return (
    <>
      <Prompt>
        <span className="t-cmd">ls</span> <span className="t-path">~/prawal-favourites/</span>
      </Prompt>
      <p className="t-line">
        {favourites.map((group, i) => (
          <Fragment key={group.id}>
            {i > 0 ? '  ' : ''}
            <span className="t-dir">{dirName(group.label)}/</span>
          </Fragment>
        ))}
      </p>
      <p className="t-line t-blank"> </p>

      {favourites.map((group) => (
        <Fragment key={group.id}>
          <Prompt>
            <span className="t-cmd">icat</span>{' '}
            <span className="t-path">~/prawal-favourites/{dirName(group.label)}/</span>
            <span className="t-cmd">*.webp</span>
          </Prompt>
          <ul className="posters" role="list">
            {group.items.map((item) => (
              <li key={item.title} className="poster">
                <img
                  src={item.image}
                  alt={`${item.title} poster`}
                  loading="lazy"
                  decoding="async"
                />
                <p>{item.title}</p>
              </li>
            ))}
          </ul>
          <p className="t-line t-blank"> </p>
        </Fragment>
      ))}

      <Prompt />
    </>
  )
}
