import PageIntro from '../components/PageIntro'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data'

export default function Projects() {
  return <main className="page-wrap"><PageIntro eyebrow="Portfolio" title="Selected Works" copy="Products and experiments across AI, analytics, full-stack systems, and data storytelling." side={`${String(projects.length).padStart(2,'0')} PROJECTS`} /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{projects.map((project,index)=><ProjectCard key={project.id} project={project} index={index}/>)}</div></main>
}
