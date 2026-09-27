import { ProjectCard } from './ProjectCard'
import { projects } from '../data'

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="panel scroll-mt-8">
      <p className="label">
        <span className="prompt">03.</span> My Projects
      </p>

      <h2 id="projects-heading" className="display mt-6 text-[clamp(2.1rem,4.4vw,3.4rem)]">
        Projects
      </h2>

      <p className="prose-dim mt-5 max-w-[38rem] text-[0.95rem]">
        Some of the websites I&#39;ve built so far using AI to help me learn and gain
        experience.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
