import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react'
import PageIntro from '../components/PageIntro'
import { usePortfolioContent } from '../content/ContentContext'

export default function Credentials() {
  const { credentials } = usePortfolioContent()
  const [index,setIndex]=useState(0)

  if (!credentials.length) {
    return <main className="page-wrap"><PageIntro eyebrow="Achievements" title="My Credentials" copy="Published certificates and learning records will appear here." side="00 CREDENTIALS" /><div className="content-card p-8 text-center text-muted">No credentials published yet.</div></main>
  }

  const item=credentials[index] || credentials[0]
  const change=(amount)=>setIndex((index+amount+credentials.length)%credentials.length)
  return <main className="page-wrap"><PageIntro eyebrow="Achievements" title="My Credentials" copy="A focused view of the learning behind the work." side={`${item.number} / ${String(credentials.length).padStart(2,'0')}`} /><div className="credential-layout"><AnimatePresence mode="wait"><motion.div key={index} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} className="contents">{item.image ? <article className="certificate-card !p-0"><img className="h-full w-full object-contain" src={item.image} alt={`${item.title} certificate`}/></article> : <article className="certificate-card"><p>PROFESSIONAL DEVELOPMENT</p><div><span>CERTIFICATE OF</span><h2>{item.title}</h2></div><div className="certificate-seal">MS</div><p>{item.issuer} · {item.year}</p></article>}<article className="credential-copy"><div className="flex flex-wrap gap-2">{item.tags.map(tag=><span className="mini-pill" key={tag}>{tag}</span>)}</div><h2>{item.title}</h2><p className="font-mono text-xs text-accent">{item.issuer} — {item.year}</p><p className="mt-6 text-muted">{item.description}</p><div className="mt-7 flex items-center gap-2 font-mono text-[11px] text-muted"><ShieldCheck size={15} className="text-green"/> VERIFIED LEARNING RECORD</div>{item.verifyUrl&&<a className="button mt-6" href={item.verifyUrl} target="_blank" rel="noreferrer">Verify credential</a>}</article></motion.div></AnimatePresence></div><div className="mt-6 flex items-center justify-between"><div className="flex gap-2">{credentials.map((_,i)=><button key={i} onClick={()=>setIndex(i)} className={`h-1 rounded-full ${i===index?'w-10 bg-accent':'w-5 bg-line'}`} aria-label={`Credential ${i+1}`}/>)}</div><div className="flex gap-2"><button onClick={()=>change(-1)} className="nav-control size-11"><ArrowLeft size={16}/></button><button onClick={()=>change(1)} className="nav-control size-11"><ArrowRight size={16}/></button></div></div></main>
}
