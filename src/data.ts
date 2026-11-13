export const profile = {
  name: 'Prawal Khadka',
  pronouns: 'he/him',
  welcome: "Welcome to my page! I'm Prawaldev, a passionate web developer and anime enthusiast. I love creating interactive web applications and exploring the world of anime and manga.",
}

/* ------------------------------------------------------------------ projects */

export interface Project {
  title: string
  description: string
  /** live site — the card title links here when there is one */
  site?: string
  repo: string
  apk?: string
}

export const projects: Project[] = [
  {
    title: 'Pokedex',
    description: 'A little place to explore Pokémon. Browse Pokémon, search by name or Pokédex number, and open individual pages to learn more about each one.',
    site: 'https://prawaldev.github.io/Pokedex/',
    repo: 'https://github.com/Prawaldev/Pokedex',
  },
  {
    title: 'Anime Wiki',
    description: ' An intuitive anime wiki experience that makes discovering and accessing structured information fast, simple, and distraction-free.',
    site: 'https://prawaldev.github.io/anime-wiki',
    repo: 'https://github.com/Prawaldev/anime-wiki',
  },
  {
    title: 'CAFS',
    description: 'A curated index of anime, manga, reading, gaming and tool resources on the internet.',
    site: 'https://prawaldev.github.io/CAFS/',
    repo: 'https://github.com/Prawaldev/CAFS',
  },
  {
    title: 'Pokedex APK',
    description: 'Android build of the Pokedex application, packaged as an APK.',
    repo: 'https://github.com/Prawaldev/Pokedex',
    apk: 'https://github.com/Prawaldev/Pokedex/releases/latest',
    site: 'https://github.com/Prawaldev/Pokedex/releases/latest'
  },
]

/* ------------------------------------------------------------------- contact */

export interface Social {
  label: string
  handle: string
  /** where the card links to — null for Discord, which has no profile links */
  href: string | null
  brand: 'github' | 'discord'
}

export const socials: Social[] = [
  {
    label: 'GitHub',
    handle: 'Prawaldev',
    href: 'https://github.com/Prawaldev',
    brand: 'github',
  },
  {
    label: 'Discord',
    handle: '6bpr',
    href: null,
    brand: 'discord',
  },
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

function posters(folder: Record<string, string>): Favourite['items'] {
  return Object.entries(folder)
    .map(([path, image]) => ({ title: fileTitle(path), image }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export const favourites: Favourite[] = [
  { id: 'anime', label: 'Anime', items: posters(animePosters) },
  { id: 'manga', label: 'Manga', items: posters(mangaPosters) },
  { id: 'anime-movie', label: 'Anime Movies', items: posters(animeMoviePosters) },
  { id: 'movie-series', label: 'Series & Movies', items: posters(movieSeriesPosters) },
]
