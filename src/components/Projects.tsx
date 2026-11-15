import { Fragment } from 'react'
import { projects } from '../data'
import { Prompt } from './Term'

/* the pacman transcript dresses every project as an installed package: the
   names come from the titles, the versions and sizes are set dressing */
const VERSIONS = ['1.0.0-1', '1.1.0-2', '0.9.2-1', '1.0.0-1', '1.2.0-1', '0.8.0-3']
const SIZES = ['1.90 MiB', '2.40 MiB', '0.80 MiB', '1.60 MiB', '2.10 MiB', '0.95 MiB']
const BAR = '[######################]'

function pkg(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-')
}

export function Projects() {
  const installed = SIZES.slice(0, projects.length).reduce((sum, s) => sum + parseFloat(s), 0)

  return (
    <>
      <Prompt>
        <span className="t-cmd">sudo pacman -S prawaldev-projects</span>
      </Prompt>
      <p className="t-line">
        [sudo] password for prawal: <span className="t-muted">••••••••</span>
      </p>
      <p className="t-line">resolving dependencies...</p>
      <p className="t-line">looking for conflicting packages...</p>
      <p className="t-line t-blank"> </p>
      <p className="t-line">
        {'Packages ('}
        {projects.length}
        {') '}
        {projects.map((project, i) => (
          <Fragment key={project.title}>
            {i > 0 ? ' ' : ''}
            <span className="t-strong">{pkg(project.title)}</span>
            {'-' + VERSIONS[i % VERSIONS.length]}
          </Fragment>
        ))}
      </p>
      <p className="t-line t-blank"> </p>
      <p className="t-line">{'Total Download Size:    2.34 MiB'}</p>
      <p className="t-line">{'Total Installed Size:   ' + installed.toFixed(2) + ' MiB'}</p>
      <p className="t-line t-blank"> </p>
      <p className="t-line">
        <span className="t-impl">::</span> Proceed with installation? [Y/n]{' '}
        <span className="t-strong">y</span>
      </p>
      {projects.map((project, i) => (
        <p className="t-line t-inst" key={project.title}>
          <span>
            ({i + 1}/{projects.length}) installing{' '}
            <span className="t-strong">{pkg(project.title)}</span>
          </span>
          <span>
            <span className="t-bar">{BAR}</span> 100%
          </span>
        </p>
      ))}
      <p className="t-line">
        <span className="t-impl">::</span> Running post-transaction hooks...
      </p>
      <p className="t-line">(1/1) Arming ConditionNeedsUpdate...</p>
      <p className="t-line t-blank"> </p>

      {projects.map((project, i) => (
        <Fragment key={project.title}>
          <Prompt>
            <span className="t-cmd">pacman -Qi {pkg(project.title)}</span>
          </Prompt>
          <div className="t-info">
            <p className="ti">
              <span className="tk">Name</span>
              <span className="tcolon">:</span>
              <span>{pkg(project.title)}</span>
            </p>
            <p className="ti">
              <span className="tk">Description</span>
              <span className="tcolon">:</span>
              <span>{project.description}</span>
            </p>
            {project.site && (
              <p className="ti">
                <span className="tk">URL</span>
                <span className="tcolon">:</span>
                <span>
                  <a href={project.site}>{project.site}</a>
                </span>
              </p>
            )}
            <p className="ti">
              <span className="tk">Sources</span>
              <span className="tcolon">:</span>
              <span>
                <a href={project.repo}>{project.repo}</a>
              </span>
            </p>
            {project.apk && (
              <>
                <p className="ti">
                  <span className="tk">Binary</span>
                  <span className="tcolon">:</span>
                  <span>
                    <a href={project.apk}>get the APK</a>
                  </span>
                </p>
                <p className="ti">
                  <span className="tk">Depends On</span>
                  <span className="tcolon">:</span>
                  <span className="t-strong">pokedex</span>
                </p>
              </>
            )}
            <p className="ti">
              <span className="tk">Installed Size</span>
              <span className="tcolon">:</span>
              <span>{SIZES[i % SIZES.length]}</span>
            </p>
          </div>
        </Fragment>
      ))}

      <Prompt />
    </>
  )
}
