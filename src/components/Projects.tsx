import { projects } from '../data'

export function Projects() {
  return (
    <>
      {projects.map((project) => (
        <article key={project.title} className="card">
          <h2>
            {project.site ? <a href={project.site}>{project.title}</a> : project.title}
          </h2>
          <p>{project.description}</p>
          <small>
            Check it on <a href={project.repo}>GitHub</a>!
            {project.apk && (
              <>
                {' '}
                Or <a href={project.apk}>get the APK</a>.
              </>
            )}
          </small>
        </article>
      ))}
    </>
  )
}
