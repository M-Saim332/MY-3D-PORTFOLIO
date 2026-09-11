import { motion } from 'framer-motion'

export default function PageIntro({ eyebrow, title, copy, side }) {
  return (
    <motion.header initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div><p className="eyebrow">{eyebrow}</p><h1 className="display-title">{title}</h1>{copy && <p className="mt-5 max-w-2xl text-lg text-muted">{copy}</p>}</div>
      {side && <span className="font-mono text-[11px] uppercase tracking-[.18em] text-muted">{side}</span>}
    </motion.header>
  )
}
