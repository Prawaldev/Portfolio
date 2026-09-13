import animeWikiShot from './assets/anime-wiki.png';
import piratedShot from './assets/pirated.png';

export type NodeId = 'about' | 'projects' | 'github' | 'discord' | 'games';

export interface NodeDef {
  id: NodeId;
  title: string;
  color: string;
  accent: string;
  icon: string;
}

export const profile = {
  name: 'Prawaldev',
  role: 'web developer',
  bio: "This is where I keep the things I build and experiment with. I mostly work with React and TypeScript, and I'm always picking up new technologies as I go.",
  technologies: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Git', 'Linux'],
};

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
}

export const projects: Project[] = [
  {
    title: 'anime-wiki',
    description:
      'A Wikipedia-style anime character encyclopedia built from scratch with a clean, searchable interface.',
    tech: ['TS', 'React', 'Vite'],
    github: 'https://github.com/Prawaldev/anime-wiki',
    live: 'https://prawaldev.github.io/anime-wiki/',
    image: animeWikiShot,
  },
  {
    title: 'pirated-lib',
    description:
      'Curated index of sites and apps for Japanese media — anime, manga, and novels.',
    tech: ['TS', 'React', 'Vite'],
    github: 'https://github.com/Prawaldev/pirated-lib',
    live: 'https://prawaldev.github.io/Pirated-Lib/',
    image: piratedShot,
  },
];

export const socials = [
  { label: 'GitHub', url: 'https://github.com/Prawaldev', handle: 'Prawaldev' },
  { label: 'Discord', url: 'https://discord.com/users/6bpr', handle: '6bpr' },
];

export const nodes: NodeDef[] = [
  { id: 'about', title: 'About me', color: '#a78bfa', accent: '#8b5cf6', icon: '/icon-512.png' },
  { id: 'projects', title: 'Projects', color: '#22d3ee', accent: '#06b6d4', icon: '/logos/project.svg' },
  { id: 'github', title: 'GitHub', color: '#c4b5fd', accent: '#a78bfa', icon: '/logos/github.svg' },
  { id: 'discord', title: 'Discord', color: '#5865f2', accent: '#4752c4', icon: '/logos/discord.svg' },
  { id: 'games', title: 'Games', color: '#fb7185', accent: '#f43f5e', icon: '/logos/game.svg' },
];

export interface Game {
  name: string;
  url: string;
  image: string;
}

export const favoriteGames: Game[] = [
  { name: 'Minecraft', url: 'https://www.minecraft.net', image: '/minecraft.webp' },
  { name: 'Elden Ring', url: 'https://en.bandainamcoent.eu/elden-ring/elden-ring', image: '/elden%20ring.webp' },
  { name: 'CS2', url: 'https://www.counter-strike.net/cs2', image: '/cs2.webp' },
  { name: 'Subway Surfers', url: 'https://www.subwaysurfers.com', image: '/subway%20surfers.webp' },
];