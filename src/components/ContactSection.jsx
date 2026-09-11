import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Plus } from 'lucide-react'
import { usePortfolioContent } from '../content/ContentContext'

const faqs = [
  ['What do you usually build?', 'Full-stack products, AI-enabled tools, analytics experiences, and useful automations.'],
  ['What technologies do you use?', 'Python, JavaScript, TypeScript, React, Node.js, FastAPI, PostgreSQL, TensorFlow, Three.js, and modern deployment tools.'],
  ['Can we collaborate?', 'Yes. Share the problem, goals, and timeline and I’ll get back to you.'],
  ['Are you open to opportunities?', 'I’m open to thoughtful projects and roles where software, AI, and product craft intersect.'],
]

export default function ContactSection() {
  const { profile } = usePortfolioContent()
  const [open,setOpen]=useState(0)
  const [sent,setSent]=useState(false)
  const submit=(event)=>{event.preventDefault();const form=new FormData(event.currentTarget);setSent(true);window.location.href=`mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${form.get('name')}`)}&body=${encodeURIComponent(`${form.get('message')}\n\nReply to: ${form.get('email')}`)}`}
  return <section className="section-wrap" id="contact"><div className="section-heading"><div><p className="eyebrow">Skills · Workflow · Identity</p><h2>Reach Out</h2></div><span className="font-mono text-[10px] tracking-widest text-muted">OPEN TO GOOD IDEAS</span></div><div className="workflow-strip">{['IDEA','PLAN','AI HELP','CODE','REVIEW','TEST','LEARN'].map((step,index)=><span key={step}>{step}{index<6&&<ArrowRight size={11}/>}</span>)}</div><div className="mt-5 grid gap-4 md:grid-cols-2"><form onSubmit={submit} className="content-card p-7"><h3 className="mb-6 text-2xl font-semibold">Send a Message</h3><label className="form-field"><span>Name</span><input name="name" required placeholder="Your name"/></label><label className="form-field"><span>Email</span><input name="email" type="email" required placeholder="you@mail.com"/></label><label className="form-field"><span>Message</span><textarea name="message" required placeholder="Tell me about your idea..."/></label><button className="button button-primary" type="submit">Send message <ArrowRight size={15}/></button>{sent&&<p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-green"><Check size={13}/> EMAIL DRAFT OPENED</p>}</form><div className="content-card p-7"><h3 className="mb-6 text-2xl font-semibold">FAQ</h3>{faqs.map(([q,a],index)=><div key={q} className="border-t border-line"><button onClick={()=>setOpen(open===index?-1:index)} className="flex w-full items-center justify-between gap-4 py-5 text-left"><span>{q}</span><Plus size={15} className={`shrink-0 text-accent transition ${open===index?'rotate-45':''}`}/></button><motion.div initial={false} animate={{height:open===index?'auto':0,opacity:open===index?1:0}} className="overflow-hidden text-sm text-muted"><p className="pb-5">{a}</p></motion.div></div>)}</div></div></section>
}
