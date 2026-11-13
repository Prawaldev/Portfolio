import { favourites } from '../data'

export function Favourites() {
  return (
    <>
      {favourites.map((group) => (
        <article key={group.id} className="card">
          <h2>{group.label}</h2>
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
        </article>
      ))}
    </>
  )
}
