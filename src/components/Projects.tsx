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
        {projects.slice(0, 2).map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
        {projects[3] && <ProjectCard key={projects[3].title} project={projects[3]} index={3} />}
        {projects[2] && (
          <div className="md:col-span-2 lg:col-span-3 flex justify-center">
            <div className="w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.833rem)]">
              <ProjectCard key={projects[2].title} project={projects[2]} index={2} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
