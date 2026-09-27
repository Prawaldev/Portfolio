# Prawal Khadka — Portfolio

A dark, terminal-inspired personal portfolio built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It reads like a carefully arranged developer dashboard: hairline-bordered panels, large monospace type, and a single muted yellow accent.

No 3D library, no animation library, no UI kit — just React, TypeScript and CSS.

## Design rules

- The page is pure black (`#000000`); panels sit on top of it at `#0A0D12`, inset blocks at `#04060A`, with 1px `#1B2027` borders and off-white text.
- Muted yellow (`#E0BE52`) is used sparingly: the blinking caret, the prompt characters, and the active nav link.
- Bright cyan (`#6FD3E8`) carries the *small* type — labels, tags, meta text, badges — so it never has to compete with the background to be seen.
- Sharp rectangles, 2px corner radius, lots of empty space.
- No gradients, glassmorphism, glow, neon, or space/galaxy imagery.
- Motion is limited to a blinking caret, border/hover transitions, a single fade-in per panel, and the turning icon in the hero.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS

## Typography

*Brass Mono Code* (self-hosted in `public/fonts/`, SIL OFL 1.1) is the only typeface, and it is the whole personality of the site. The font ships just 170 glyphs, so the copy stays inside ASCII plus `·`, `…`, `→` and `↑`. Em dashes are drawn as hairlines with the `.dash` class and the blinking block is CSS, not a character.

## Colour and small text

The page background is pure black, so small text gets its own loud colour instead of a lighter background: every tier below 0.9rem is cyan, and each one is checked against the panel it sits on (measured, both themes).

| Token | Used for | Contrast on panel (dark / light) |
| --- | --- | --- |
| `--ink` `#E9EBEE` | headings, buttons | 16.3:1 / 18.1:1 |
| `--ink-soft` `#BCC2CC` | body copy | 10.9:1 / 10.1:1 |
| `--ink-dim` `#9BA5B3` | nav links, secondary copy | 7.8:1 / 8.2:1 |
| `--signal` `#6FD3E8` | every small tier: `.label`, `.tag`, `.meta` | 11.3:1 / 6.0:1 |
| `--amber` `#E0BE52` | interactive accents only | 10.8:1 / 5.8:1 |

`--signal-dim` is the quiet sibling used for borders and separators. The light theme mirrors the scale (`#0B6A82` cyan, `#7A5F0C` amber). Labels, tags and other sub-0.8rem text were also nudged up in size; the smallest tier is now 0.72rem.

## The hero icon

`HeroIcon` is the site icon — the same `icon-512.png` the PWA manifest uses — turning anticlockwise in the corner of the hero. It replaced a wireframe Earth, which replaced a shaded 3D cube before that.

| | old cube | Earth hologram | icon |
| --- | --- | --- | --- |
| SVG elements | 42 | 36 | 0 |
| filled shapes per frame | up to 18 | 0 | 0 |
| `filter: blur()` layers | 5 | 0 | 0 |
| style writes per frame | ~10 | ~20 | 1 |

- It turns anticlockwise at 16°/s (22s for a full circle), and the **cursor nudges it**: pointer right speeds the turn up by half (24°/s), left eases it off (8°/s), and the icon leans towards the pointer by up to 4°.
- Motion blur is three ghost copies of the icon trailing the sharp one at a 1.5°/3.1°/5° angular lag, drawn fainter (0.34, 0.16, 0.075). Because the lag is angular, the smear grows with the turn. No filter passes, which is what made the cube expensive.
- The blur costs one style write per frame, not one per copy: the parent carries the turn, the copies hold a fixed offset, so the compositor does the rest.
- The loop pauses when the icon scrolls out of view or the tab is hidden, and `prefers-reduced-motion` pins it to one still frame.

## Favourites

One panel, four boxes — anime, manga, anime movies, series and movies. Only one is open at a time: clicking a box opens it and closes whichever was open, clicking it again closes it. The active box is the only one with `aria-expanded="true"`, and the grid below is its `aria-controls` region.

The posters are not listed in the code. Each box globs its own folder in `src/assets/`, so dropping a new `.webp` into `src/assets/My fav anime/` is enough to get it on the site — no import to add, no array to extend. Titles are taken from the file name, and only the three shorthand ones (`aot`, `codegeass`, `vinland`) are renamed, in `TITLE_FIXES` in `data.ts`. Vite emits every poster as its own file, so a box only downloads its own images when it opens.

## Sections

| Panel | Anchor |
| --- | --- |
| Hero (navbar, name, buttons, turning icon) | `#home` |
| About | `#about` |
| Projects | `#projects` |
| Contact (GitHub + Discord only, no email) | `#contact` |
| `>_ Reality Check` terminal panel | — |
| Favourites (four boxes: anime, manga, anime movies, series and movies) | — |

## Accessibility

- Semantic landmarks (`header`, `main`, `section`, `footer`), one `h1`, labelled sections, skip link.
- Visible amber focus ring, `prefers-reduced-motion` support, and every text tier above 4.5:1 in both themes.
- The sun button in the navbar toggles a light theme, remembered in `localStorage` under `pk-theme`.
- The entrance animation is progressive enhancement: content is never left hidden.
- The header icon is decorative and carries an empty `alt`, so the link's `aria-label` stays the accessible name.
- Icon-only links (project source, view project) keep their names in `aria-label` and a `title` tooltip.

## Scripts

- `npm run dev` — dev server
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run preview`

## Structure

```
src/
  App.tsx                     panel grid + skip link
  data.ts                     all copy, projects, links
  index.css                   fonts, theme tokens, .panel/.btn/.label/.tag/.caret
  hooks/useTheme.ts           light / dark toggle
  hooks/useActiveSection.ts   highlights the nav link for the section in view
  components/
    Navbar.tsx                anchor links, theme button
    Hero.tsx                  name, role, buttons
    HeroIcon.tsx              icon-512 turning anticlockwise, ghost-copy motion blur
    BrandIcons.tsx            GitHub / Discord marks + external-link icon
    About.tsx  Projects.tsx  ProjectCard.tsx  Contact.tsx
    RealityCheck.tsx          terminal panel on an inset background
    Favourites.tsx            four boxes, one open at a time (posters from src/assets)
    Reveal.tsx                fade-in on scroll (never hides content)
    Footer.tsx
```

## Content

Copy, project links, and the GitHub/Discord handles live in `src/data.ts`. There is deliberately **no email address and no contact form** — the site only offers GitHub (`Prawaldev`) and Discord (`6bpr`).

Brand marks are inline SVG in `BrandIcons.tsx`, coloured with tokens — `--github` (white on dark, `#181717` on light) and `--discord` (blurple `#5865F2`) — so they follow the theme instead of being baked into a file.
