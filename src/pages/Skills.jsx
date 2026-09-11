import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageIntro from '../components/PageIntro'
import SkillGlobe from '../components/SkillGlobe'
import { skillGroups } from '../data'

export default function Skills() {
  const [active, setActive] = useState('languages')
  const group = skillGroups[active]
  return <main className="page-wrap"><PageIntro eyebrow="Forge" title="Technical Expertise" copy="A living constellation of the tools, concepts, and systems I use to turn ideas into working products." side="DRAG TO ROTATE" /><div className="grid items-center gap-6 lg:grid-cols-[1.15fr_.85fr]"><SkillGlobe skills={group.skills}/><div className="content-card p-6 md:p-8"><div className="mb-8 flex flex-wrap gap-2">{Object.entries(skillGroups).map(([key,item])=><button key={key} onClick={()=>setActive(key)} className={`tab-pill ${active===key?'active':''}`}>{item.label}</button>)}</div><AnimatePresence mode="wait"><motion.div key={active} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><p className="eyebrow">{group.skills.length} skills</p><h2 className="text-3xl font-semibold tracking-tight">{group.title}</h2><p className="mt-3 text-muted">{group.description}</p><div className="mt-6 flex flex-wrap gap-2">{group.skills.map(skill=><span key={skill} className="skill-chip">{skill}</span>)}</div></motion.div></AnimatePresence></div></div></main>
}
