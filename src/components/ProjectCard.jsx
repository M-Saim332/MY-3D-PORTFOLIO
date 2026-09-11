import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, BarChart3, Crosshair } from 'lucide-react'

export default function ProjectCard({ project, index = 0 }) {
  const [mode, setMode] = useState('scope')
  return (
    <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ delay: index * .08 }} className="project-card group">
      <div className="project-cover" style={{ '--project-color': project.color }}>
        <div className="mock-window"><div className="mock-sidebar" /><div className="mock-content"><span /><span /><span /><span /></div></div>
        <div className="absolute inset-x-5 top-5 flex justify-between font-mono text-[10px] tracking-widest text-muted"><span>{project.id}</span><ArrowUpRight size={14} /></div>
      </div>
      <div className="flex flex-1 flex-col p-6"><p className="mb-3 font-mono text-[10px] tracking-[.16em] text-accent">{project.category}</p><h2 className="text-2xl font-semibold tracking-tight">{project.title}</h2><p className="mt-3 text-sm leading-6 text-muted">{project.description}</p><div className="mt-auto pt-6"><div className="flex gap-2"><button onClick={() => setMode('scope')} className={`mini-pill ${mode === 'scope' ? 'selected' : ''}`}><Crosshair size={11} /> Scope</button><button onClick={() => setMode('tech')} className={`mini-pill ${mode === 'tech' ? 'selected' : ''}`}><BarChart3 size={11} /> Tech</button></div><motion.div key={mode} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 min-h-6 font-mono text-[11px] text-accent">{mode === 'tech' ? project.stack.join(' · ') : project.category}</motion.div></div></div>
    </motion.article>
  )
}
