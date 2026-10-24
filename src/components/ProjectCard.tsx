import type { Project } from '../data'
import { ExternalLinkIcon, GithubIcon } from './BrandIcons'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[var(--radius)] bg-[var(--surface-raised)]">
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
          width={project.title === 'Pokedex APK' ? 512 : 1200}
          height={project.title === 'Pokedex APK' ? 512 : 750}
          loading="lazy"
          decoding="async"
          className={
            project.title === 'Pokedex APK'
              ? 'aspect-[16/10] w-full h-full object-contain bg-[var(--surface)] p-4'
              : 'aspect-[16/10] w-full object-cover object-top'
          }
        />
        <span className="absolute left-0 top-0 bg-[var(--void)] px-2 py-1 text-[0.72rem] tracking-[0.1em] text-[var(--signal)]">
          0{index + 1}
        </span>
      </a>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.05rem] font-bold tracking-[0.01em]">{project.title}</h3>

        <p className="mt-3 text-[0.85rem] leading-[1.8] text-[var(--ink-dim)]">
          {project.description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="grid h-8 w-8 place-items-center rounded-[var(--radius)] text-[var(--signal)]"
            title="View project"
            aria-label={`Open ${project.title} live site (new tab)`}
          >
            <ExternalLinkIcon size={15} />
          </a>
          {project.apk && (
            <a
              href={project.apk}
              target="_blank"
              rel="noreferrer"
              className="btn btn-accent !px-3 !py-1.5 !text-[0.75rem]"
              title="Download APK"
              aria-label={`Download ${project.title} APK (new tab)`}
            >
              <span aria-hidden="true">↓</span> Download APK
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="grid h-8 w-8 place-items-center rounded-[var(--radius)] text-[var(--github)]"
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
