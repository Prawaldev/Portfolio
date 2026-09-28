import { useState } from 'react'
import { favourites } from '../data'

/** Four boxes in one panel. Opening one closes the other. */
export function Favourites() {
  const [open, setOpen] = useState<string | null>(favourites[0].id)
  const active = favourites.find((group) => group.id === open)

  return (
    <section aria-labelledby="favourites-heading" className="panel flex flex-col">
      <p className="label">
        <span className="prompt">06.</span> Favourites
      </p>
      <h2 id="favourites-heading" className="sr-only">
        Favourites
      </h2>

      <div className="mt-6 border border-[var(--line)] bg-[var(--void)]">
        <div className="grid grid-cols-2 border-b border-[var(--line)] sm:grid-cols-4">
          {favourites.map((group, i) => {
            const isOpen = group.id === open

            return (
              <button
                key={group.id}
                type="button"
                id={`favourites-tab-${group.id}`}
                aria-expanded={isOpen}
                aria-controls={`favourites-panel-${group.id}`}
                onClick={() => setOpen(isOpen ? null : group.id)}
                className={`flex items-center justify-between gap-2 border-b border-[var(--line)] px-4 py-4 text-left transition-colors duration-200 sm:border-b-0 sm:border-r sm:last:border-r-0 ${
                  isOpen
                    ? 'bg-[var(--surface)] text-[var(--signal)]'
                    : 'text-[var(--ink-dim)] hover:bg-[var(--surface)] hover:text-[var(--ink-soft)]'
                }`}
              >
                <span className="text-[0.85rem] font-bold tracking-[0.03em]">
                  <span className="prompt">0{i + 1}.</span> {group.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-[0.85rem] leading-none ${
                    isOpen ? 'text-[var(--signal)]' : 'text-[var(--ink-dim)]'
                  }`}
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            )
          })}
        </div>

        {active && (
          <div
            id={`favourites-panel-${active.id}`}
            role="region"
            aria-labelledby={`favourites-tab-${active.id}`}
          >
            <ul className="grid grid-cols-2 gap-px bg-[var(--line)] sm:grid-cols-3 lg:grid-cols-5">
              {active.items.map((item) => (
                <li key={item.title} className="bg-[var(--surface)] p-3">
                  <img
                    src={item.image}
                    alt={`${item.title} poster`}
                    width={500}
                    height={707}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[5/7] w-full border border-[var(--line)] object-cover"
                  />
                  <p className="mt-3 text-[0.78rem] leading-[1.6] text-[var(--ink-soft)]">
                    {item.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="meta mt-4">
        <span className="dash" /> {active ? `${active.items.length} titles` : 'Pick a box'}
      </p>
    </section>
  )
}
