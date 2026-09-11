import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, BarChart3, Crosshair } from 'lucide-react'

export default function ProjectCard({ project, index = 0 }) {
  const [mode, setMode] = useState('scope')
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.06 }}
      className="project-card group"
    >
      <div className="project-cover" style={{ '--project-color': project.color }}>
        {project.image ? (
          <img
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            src={project.image}
            alt={`${project.title} preview`}
          />
        ) : (
          <div className="mock-window">
            <div className="mock-sidebar" />
            <div className="mock-content">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
        <div className="absolute inset-x-4 top-3.5 flex justify-between font-mono text-[9px] tracking-widest text-muted">
          <span>{project.id}</span>
          {project.liveUrl || project.sourceUrl ? (
            <a
              href={project.liveUrl || project.sourceUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title}`}
              className="hover:text-accent transition-colors"
            >
              <ArrowUpRight size={13} />
            </a>
          ) : (
            <ArrowUpRight size={13} />
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="mb-1.5 font-mono text-[9px] tracking-[0.16em] text-accent">
          {project.category}
        </p>
        <h3 className="text-lg font-semibold tracking-tight text-primary">
          {project.title}
        </h3>
        <p className="mt-2 text-xs leading-5 text-muted line-clamp-3">
          {project.description}
        </p>

        <div className="mt-auto pt-4 border-t border-line/50">
          <div className="flex gap-1.5">
            <button
              onClick={() => setMode('scope')}
              className={`mini-pill ${mode === 'scope' ? 'selected' : ''}`}
            >
              <Crosshair size={10} /> Scope
            </button>
            <button
              onClick={() => setMode('tech')}
              className={`mini-pill ${mode === 'tech' ? 'selected' : ''}`}
            >
              <BarChart3 size={10} /> Tech
            </button>
          </div>
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 min-h-[18px] font-mono text-[10px] text-accent truncate"
          >
            {mode === 'tech' ? project.stack.join(' · ') : project.category}
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}
