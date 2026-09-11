import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Code2, Github, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroScene from '../components/HeroScene'
import ProjectCard from '../components/ProjectCard'
import ContactSection from '../components/ContactSection'
import { usePortfolioContent } from '../content/ContentContext'

const roles = ['DEVELOPER', 'BUILDER', 'ML EXPLORER', 'STUDENT']

export default function Home() {
  const { profile, projects } = usePortfolioContent()
  const [role, setRole] = useState(0)
  const locationParts = String(profile.location || '').split(',').map(part => part.trim()).filter(Boolean)
  const locationCountry = locationParts.length > 1 ? locationParts.at(-1) : ''
  const locationRegion = locationParts.length > 1 ? `${locationParts.slice(0, -1).join(', ')},` : profile.location
  useEffect(() => { const timer = setInterval(() => setRole((value) => (value + 1) % roles.length), 3000); return () => clearInterval(timer) }, [])
  return (
    <>
      <section className="mx-auto grid min-h-screen max-w-[1180px] items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[1.12fr_.88fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <div className="mb-8 inline-flex rounded-full border border-line bg-surface p-1 font-mono text-[10px] font-semibold tracking-widest"><span className="rounded-full bg-primary px-3 py-1.5 text-bg">NEW</span><span className="px-3 py-1.5 text-muted">2026</span></div>
          <p className="eyebrow">{profile.headline}</p>
          <h1 className="hero-title">{profile.firstName}<span>{profile.lastName}.</span></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">{profile.intro}</p>
          <div className="mt-6 h-16 overflow-hidden"><motion.div key={role} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="role-title">{roles[role]}</motion.div></div>
          <div className="mt-3 flex gap-1.5">{roles.map((item, index) => <button key={item} onClick={() => setRole(index)} aria-label={item} className={`h-[3px] rounded-full transition-all ${role === index ? 'w-8 bg-accent' : 'w-5 bg-line'}`} />)}</div>
          <div className="mt-9 flex flex-wrap gap-3"><Link to="/projects" className="button button-primary">Explore work <ArrowDownRight size={16} /></Link><a href="#about-home" className="button">About me</a></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }} className="relative"><div className="corner-frame"><HeroScene profile={profile} /></div><div className="float-badge -left-4 top-16">NEXT.JS · PYTHON</div><div className="float-badge -right-3 top-8 text-green">▲ 0 → 1 BUILDER</div><div className="float-badge -right-5 bottom-20">⚙ THREE.JS · AI</div><div className="mt-5 flex justify-center gap-2"><a className="social-button" href={`mailto:${profile.email}`} aria-label="Email"><Mail size={15} /></a><a className="social-button" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={15} /></a><a className="social-button" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={15} /></a><a className="social-button" href={profile.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode"><Code2 size={15} /></a></div></motion.div>
      </section>

      <section className="section-wrap"><div className="section-heading"><div><p className="eyebrow">Featured work</p><h2>Projects</h2></div><Link to="/projects" className="quiet-link">View all <ArrowUpRight size={14} /></Link></div><div className="grid gap-4 md:grid-cols-3">{projects.slice(0, 3).map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div></section>

      <section id="about-home" className="section-wrap"><div className="section-heading"><div><p className="eyebrow">Who I am</p><h2>About Me</h2></div><Link to="/about" className="quiet-link">View persona <ArrowUpRight size={14} /></Link></div><div className="grid gap-4 lg:grid-cols-[.9fr_1.1fr]"><motion.article whileHover={{ y: -5 }} className="location-card"><p className="font-mono text-[10px] tracking-[.16em] text-muted">LOCATION · HOVER TO EXPLORE</p><div className="map-orbits" /><h3><span>{locationRegion}</span>{locationCountry && <span>{locationCountry}</span>}</h3><p className="font-mono text-[11px] leading-6 text-muted">{profile.timezone}</p></motion.article><div className="grid gap-4"><article className="content-card p-8"><p className="eyebrow">/ About</p><p className="text-xl leading-8 md:text-2xl">{profile.about}</p><p className="mt-5 font-serif italic text-accent">“{profile.quote}”</p></article><article className="content-card p-8"><div className="flex items-start justify-between"><div><p className="eyebrow">Learning trajectory</p><h3 className="text-3xl font-semibold tracking-tight">Always improving</h3></div><span className="font-mono text-[10px] text-muted">2024 — NOW</span></div><div className="mt-8 flex h-24 items-end gap-2 border-b border-line">{[32,48,61,79,94].map((height, index) => <motion.i key={height} initial={{ height: 0 }} whileInView={{ height: `${height}%` }} transition={{ duration: .8, delay: index * .08 }} viewport={{ once: true }} className="flex-1 rounded-t bg-gradient-to-t from-accent/10 to-accent" />)}</div></article></div></div><div className="mt-4 grid gap-4 md:grid-cols-3">{[['GROWTH','Curiosity turns unfamiliar systems into useful understanding.'],['FOCUS','Deep work on efficiency and precision in every layer.'],['CRAFT','Care and discipline in every interaction and line of code.']].map(([title,copy]) => <article key={title} className="trait"><b>{title}</b><p>{copy}</p></article>)}</div></section>

      <section className="section-wrap"><div className="section-heading"><div><p className="eyebrow">Education & work</p><h2>Experience</h2></div><span className="font-mono text-[10px] tracking-widest text-muted">THE PATH SO FAR</span></div><div className="timeline"><article><time>2024 — PRESENT</time><div><h3>Builder & ML Developer</h3><p>Designing and shipping AI-powered products across finance, fitness, and analytics.</p></div><div className="tag-list"><span>AI/ML</span><span>FULL-STACK</span><span>DATA</span></div></article><article><time>ONGOING</time><div><h3>Learning in public</h3><p>Exploring deep learning, data systems, deployment workflows, and the craft of human software.</p></div><div className="tag-list"><span>SYSTEMS</span><span>RESEARCH</span></div></article></div></section>

      <ContactSection />
    </>
  )
}
