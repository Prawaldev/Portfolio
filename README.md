# Prawal's Portfolio

An interactive 3D multiverse portfolio built with **React**, **TypeScript**, **Tailwind CSS**, and **Three.js**. The page is a cosmic galaxy floating in pure black space — the universe itself is the navigation.

## How it works

- The galaxy auto-rotates and drifts; drag to explore, scroll/pinch to zoom.
- Four nodes float inside the universe: the **galaxy core** (about), and planets for **projects**, **GitHub**, and **Discord**.
- Hover a node to reveal its label; click to open a single minimal info panel with the relevant content.
- Everything except the 3D scene lives inside that panel — no hero section, no navbar, no page sections.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Three.js / React Three Fiber / drei
- Framer Motion

## Typography

- *Brass Mono Code* (self-hosted in `public/fonts/`, SIL OFL licensed) for the whole site.

## Scripts

- `npm run dev` — dev server
- `npm run lint`
- `npm run build`

## Structure

- `src/config.ts` — node layout and the cosmic palette
- `src/data.ts` — bio, projects, social links
- `src/components/Scene3D.tsx` — the galaxy, particles, and interactive nodes
- `src/components/InfoPanel.tsx` — per-node info panels
- `src/components/Universe.tsx` — scene wrapper and hint text