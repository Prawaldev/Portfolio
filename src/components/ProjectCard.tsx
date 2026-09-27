import type { Project } from '../data'
import { ExternalLinkIcon, GithubIcon } from './BrandIcons'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="group flex flex-col border border-[var(--line)] bg-[var(--surface-raised)] transition-[transform,border-color] duration-300 ease-terminal hover:-translate-y-1 hover:border-[var(--line-bright)]">
      {/* website preview */}
      <a
        href={project.live}
        target="_blank"
        rel="noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="relative block overflow-hidden border-b border-[var(--line)]"
      >
        <img
          src={project.preview}
          alt=""
          width={1200}
          height={750}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top opacity-85 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span className="absolute left-0 top-0 border-b border-r border-[var(--signal-dim)] bg-[var(--void)] px-2 py-1 text-[0.72rem] tracking-[0.1em] text-[var(--signal)]">
          0{index + 1}
        </span>
      </a>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.05rem] font-bold tracking-[0.01em]">{project.title}</h3>

        <p className="mt-3 text-[0.85rem] leading-[1.8] text-[var(--ink-dim)]">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="grid h-8 w-8 place-items-center border border-[var(--line)] text-[var(--signal)] transition-colors duration-200 hover:border-[var(--signal)] hover:text-[var(--ink)]"
            title="View project"
            aria-label={`Open ${project.title} live site (new tab)`}
          >
            <ExternalLinkIcon size={15} />
          </a>
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="grid h-8 w-8 place-items-center border border-[var(--line)] text-[var(--github)] transition-colors duration-200 hover:border-[var(--signal)] hover:text-[var(--ink)]"
            title="View source"
            aria-label={`View ${project.title} source code on GitHub (new tab)`}
          >
            <GithubIcon size={17} />
          </a>
        </div>
      </div>
    </article>
  )
}
