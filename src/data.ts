import animeWikiShot from './assets/anime-wiki.webp'
import directoryShot from './assets/directory.webp'
import portfolioShot from './assets/portfolio-preview.svg'

export const profile = {
  name: 'Prawal Khadka',
  role: 'BCA Student | Aspiring Developer',
  /* the em dash in the tagline is drawn as a hairline, so it is split out */
  tagline: {
    before: 'Exploring the digital world, one project at a time. Learning, building, improving',
    after: 'with the help of AI.',
  },
  heroNote: 'Currently learning. Building for experience.',
}

export const sectionIds = ['home', 'about', 'projects', 'contact'] as const

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const facts = [
  { icon: '◇', text: 'BCA Student (1st Semester)' },
  { icon: '▣', text: 'Always Learning' },
  { icon: '</>', text: 'Anime, Tech, Linux, Android' },
]

export interface Project {
  title: string
  description: string
  tags: string[]
  preview: string
  live: string
  repo: string
}

export const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description: 'My personal portfolio with a clean, minimalist design and interactive elements.',
    tags: ['HTML', 'CSS', 'JS', 'AI'],
    preview: portfolioShot,
    live: 'https://prawal.is-a.dev',
    repo: 'https://github.com/Prawaldev/Portfolio',
  },
  {
    title: 'Anime Wiki',
    description: 'An anime information website with search and details using Jikan API + Wikipedia.',
    tags: ['React', 'TypeScript', 'Vite'],
    preview: animeWikiShot,
    live: 'https://Prawaldev.github.io/anime-wiki',
    repo: 'https://github.com/Prawaldev/anime-wiki',
  },
  {
    title: 'Pirated Lib',
    description: 'A large directory-style website with 11k+ entries (learning project).',
    tags: ['React', 'TypeScript', 'API'],
    preview: directoryShot,
    live: 'https://prawaldev.github.io/Pirated-Lib/',
    repo: 'https://github.com/Prawaldev/Pirated-Lib',
  },
]

export const socials = [
  {
    label: 'GitHub',
    handle: 'github.com/Prawaldev',
    href: 'https://github.com/Prawaldev',
    brand: 'github' as const,
  },
  {
    label: 'Discord',
    handle: '6bpr',
    href: 'https://discord.com/users/6bpr',
    brand: 'discord' as const,
  },
]

export const contactNotes = [
  '> Check my GitHub',
  '> Add me on Discord',
  '> Casual chatting',
]

export interface Quote {
  text: string
  author: string
}

export const famousQuotes: Quote[] = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: "It always seems impossible until it's done.", author: 'Nelson Mandela' },
  { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
  {
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
  },
  {
    text: 'The journey of a thousand miles begins with a single step.',
    author: 'Lao Tzu',
  },
  { text: 'I have no special talent. I am only passionately curious.', author: 'Albert Einstein' },
]

/* ---------------------------------------------------------------- favourites
   one folder per box in src/assets/, so dropping a new poster in a folder is
   enough to get it on the site. titles come from the file names. */

const animePosters = import.meta.glob<string>(
  './assets/My fav anime/*.webp',
  { eager: true, import: 'default' },
)
const mangaPosters = import.meta.glob<string>(
  './assets/My fav Manga/*.webp',
  { eager: true, import: 'default' },
)
const animeMoviePosters = import.meta.glob<string>(
  './assets/My fav anime movie/*.webp',
  { eager: true, import: 'default' },
)
const movieSeriesPosters = import.meta.glob<string>(
  './assets/My fav series and movies/*.webp',
  { eager: true, import: 'default' },
)

/* file names that were typed as shorthand, or that cannot hold a colon
   because a colon in a file name is rejected over HTTP */
const TITLE_FIXES: Record<string, string> = {
  aot: 'Attack on Titan',
  codegeass: 'Code Geass',
  vinland: 'Vinland Saga',
  'fullmetal alchemist brotherhood': 'Fullmetal Alchemist: Brotherhood',
  'steins gate': 'Steins;Gate',
}

const SMALL_WORDS = new Set([
  'a', 'an', 'and', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with',
])

function fileTitle(path: string) {
  const file = (path.split('/').pop() ?? '').replace(/\.webp$/i, '')
  const raw = file.replace(/[.\s]+$/, '').trim()
  /* a whole name typed with hyphens or underscores stands in for spaces, but a
     hyphen inside a name that already has spaces is part of the title */
  const name = (raw.includes(' ') ? raw : raw.replace(/[-_]/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()

  const fixed = TITLE_FIXES[name.toLowerCase()]
  if (fixed) return fixed

  return name
    .split(' ')
    .map((word, i) => {
      if (word.length === 1) return word.toLowerCase() === 'i' ? 'I' : word
      if (/[A-Z]/.test(word)) return word
      if (i > 0 && SMALL_WORDS.has(word.toLowerCase())) return word.toLowerCase()
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export interface Favourite {
  id: string
  label: string
  items: { title: string; image: string }[]
}

function posters(posters: Record<string, string>): Favourite['items'] {
  return Object.entries(posters)
    .map(([path, image]) => ({ title: fileTitle(path), image }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export const favourites: Favourite[] = [
  { id: 'anime', label: 'My fav Anime', items: posters(animePosters) },
  { id: 'manga', label: 'My fav Manga', items: posters(mangaPosters) },
  { id: 'anime-movie', label: 'My fav Anime Movie', items: posters(animeMoviePosters) },
  {
    id: 'movie-series',
    label: 'My fav series and movies',
    items: posters(movieSeriesPosters),
  },
]
