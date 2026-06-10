interface ProjectProps {
  title: string;
  description: string;
  tech: string;
  github: string;
  live: string;
  image: string;
}

import AnimeWiki from "../assets/anime-wiki.png";
import PiratedLib from "../assets/pirated.png";
import RecipeFinder from "../assets/recipe.png";

const ProjectCard = ({ title, description, tech, github, live, image }: ProjectProps) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-colors">
      <img src={image} alt={title} className="w-full h-40 object-cover bg-gray-100" />
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-3">{tech}</p>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex space-x-3 text-xs">
          <a href={github} target="_blank" className="text-blue-600 hover:text-black">GitHub</a>
          <a href={live} target="_blank" className="text-blue-600 hover:text-black">Demo</a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    { 
      title: "anime-wiki", 
      description: "A Wikipedia-style anime character encyclopedia built with React + Vite + TypeScript.",
      tech: "TS · React · Vite",
      github: "https://github.com/Prawaldev/anime-wiki",
      live: "https://prawaldev.github.io/anime-wiki/",
      image: AnimeWiki
    },
    { 
      title: "Pirated Lib", 
      description: "Curated index of sites and apps for Japanese media — anime, manga, novels.",
      tech: "HTML · CSS · JS",
      github: "https://github.com/Prawaldev/pirated-lib",
      live: "https://prawaldev.github.io/Pirated-Lib/",
      image: PiratedLib
    },
    { 
      title: "Recipe Finder", 
      description: "Responsive recipe website — browse meals, view detailed recipes, explore cooking ideas.",
      tech: "HTML · CSS · JS",
      github: "https://github.com/Prawaldev/6bpr-recipe",
      live: "https://prawaldev.github.io/prawal-recipe/",
      image: RecipeFinder
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Featured Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
