# Prawal Khadka — Portfolio

A dark, terminal-inspired personal portfolio built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It reads like a carefully arranged developer dashboard: soft-edged panels on pure black, large monospace type, and a single Material 3 Expressive accent.

No 3D library, no animation library, no UI kit — just React, TypeScript and CSS.

## Design rules

- The page is pure black (`#000000`); the boxes on it are dim black (`#0A0A0A`, inset blocks `#050505`) and carry **no outline** — the fill is what separates them. Off-white text.
- Expressive purple (`#F7B3EF`) is used sparingly: the blinking caret, the prompt characters, and the active nav link.
- The same purple (`#F7B3EF`) carries the *small* type and the small icons — labels, tags, meta text, glyphs, the theme toggle — so it never has to compete with the background to be seen.
- 8px corners (`--radius`), no hairlines around boxes, lots of empty space.
- No gradients, glassmorphism, glow, neon, or space/galaxy imagery.
- Motion is limited to a blinking caret, border/hover transitions, a single fade-in per panel, and the turning icon in the hero.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS

## Typography

*Brass Mono Code* (self-hosted in `public/fonts/`, SIL OFL 1.1) is the only typeface, and it is the whole personality of the site. The font ships just 170 glyphs, so the copy stays inside ASCII plus `·`, `…`, `→` and `↑`. Em dashes are drawn as hairlines with the `.dash` class and the blinking block is CSS, not a character.

## Colour and small text

The page is pure black and the boxes are dim black, so the layout reads by **fill, not by outline** — panels carry no border at all. The purple accent (`#F7B3EF` dark, `#683366` light) is the single loud colour, and it carries both the *small* type and the small icons. The palette itself is Material 3 Expressive: the tonal palettes come from Google's `SchemeExpressive` algorithm, re-toned so every text tier keeps its old contrast. Every tier below 0.9rem is purple, and each one is checked against the panel it sits on (measured, both themes).

| Token | Dark / light | Contrast on panel (dark / light) |
| --- | --- | --- |
| `--ink` | `#F8F4E1` / `#0F0F05` | 17.9:1 / 18.5:1 |
| `--ink-soft` | `#D9D5C3` / `#3F3E31` | 13.4:1 / 10.4:1 |
| `--ink-dim` | `#CBC7AD` / `#494733` | 11.6:1 / 9.1:1 |
| `--signal` | `#F7B3EF` / `#683366` | 11.6:1 / 9.0:1 |
| `--amber` | `#F7B3EF` / `#683366` | 11.6:1 / 9.0:1 |
| `--signal-dim` | `#C98EC6` / `#7A4D77` | 7.7:1 / 6.4:1 |

`--signal-dim` is the quiet sibling, used for the pipe and arrow glyphs and the meta tier. A headless pass over all 135 rendered text nodes finds **zero** below WCAG AA in either theme (worst case 6.4:1). `--line` (`#262626`) survives only as hairlines and dividers — section rules, list rows, grid cells — never as a box outline. Buttons and tags keep their outlines so they still read as controls.

Token *names* are legacy — `--amber` and `--signal` now both hold the expressive purple, so read the roles, not the hues in the names. Every colour on the site flows through the variables in `src/index.css`; the `colors` block in `tailwind.config.js` just mirrors the dark scale for one-off utilities. `--radius` (8px) softens every box in one place.

## The hero icon

`HeroIcon` is the site icon — the same `icon-512.png` the PWA manifest uses — turning anticlockwise in the corner of the hero. It replaced a wireframe Earth, which replaced a shaded 3D cube before that.

| | old cube | Earth hologram | icon |
| --- | --- | --- | --- |
| SVG elements | 42 | 36 | 0 |
| filled shapes per frame | up to 18 | 0 | 0 |
| `filter: blur()` layers | 5 | 0 | 0 |
| style writes per frame | ~10 | ~20 | 1 |

- It turns anticlockwise at 16°/s (22s for a full circle), and the **cursor nudges it**: pointer right speeds the turn up by half (24°/s), left eases it off (8°/s), and the icon leans towards the pointer by up to 4°.
- The outline morphs circle → expressive squircle (superellipse n=3.2) on an under-damped spring (stiffness 110, damping 11). It sails ~15% past the target, the target swaps at the top of the swing, and it goes straight back — a leg takes 0.7s, there is no cycle to wait out and no hold in the turn. The path table carries an overshoot past the circle at both ends so the swing is always drawn.
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
| `>_ Famous Quotes` terminal panel | — |
| Favourites (four boxes: anime, manga, anime movies, series and movies) | — |

## Accessibility

- Semantic landmarks (`header`, `main`, `section`, `footer`), one `h1`, labelled sections, skip link.
- Visible accent focus ring, `prefers-reduced-motion` support, and every text tier above 4.5:1 in both themes.
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
  index.css                   fonts, theme tokens, .panel/.btn/.label/.caret
  hooks/useTheme.ts           light / dark toggle
  hooks/useActiveSection.ts   highlights the nav link for the section in view
  components/
    Navbar.tsx                anchor links, theme button
    Hero.tsx                  name, role, buttons
    HeroIcon.tsx              icon-512 turning anticlockwise, ghost-copy motion blur,
                              outline springing between circle <-> Material 3 expressive squircle
    BrandIcons.tsx            GitHub / Discord marks + external-link icon
    About.tsx  Projects.tsx  ProjectCard.tsx  Contact.tsx
    FamousQuotes.tsx           quotes on an inset terminal background
    Favourites.tsx            four boxes, one open at a time (posters from src/assets)
    Reveal.tsx                fade-in on scroll (never hides content)
    Footer.tsx
```

## Content

Copy, project links, and the GitHub/Discord handles live in `src/data.ts`. There is deliberately **no email address and no contact form** — the site only offers GitHub (`Prawaldev`) and Discord (`6bpr`).

Brand marks are inline SVG in `BrandIcons.tsx`, coloured with tokens — `--github` (white on dark, `#181717` on light) and `--discord` (blurple `#5865F2`) — so they follow the theme instead of being baked into a file.
