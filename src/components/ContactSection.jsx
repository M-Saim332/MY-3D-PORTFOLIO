import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { usePortfolioContent } from '../content/ContentContext'
import ContactForm from './ContactForm'
import WorkflowStep from './WorkflowStep'

const WORKFLOW_STEPS = [
  { step: 'IDEA', label: 'Concept', iconKey: 'IDEA', accent: '#00d9ff' },
  { step: 'PLAN', label: 'Architecture', iconKey: 'PLAN', accent: '#8b5cf6' },
  { step: 'AI', label: 'AI Assistance', iconKey: 'AI', accent: '#32ff73' },
  { step: 'CODE', label: 'Development', iconKey: 'CODE', accent: '#ffad66' },
  { step: 'REVIEW', label: 'Security', iconKey: 'REVIEW', accent: '#ff2d55' },
  { step: 'TEST', label: 'Testing', iconKey: 'TEST', accent: '#75ffc7' },
  { step: 'SHIP', label: 'Deploy', iconKey: 'SHIP', accent: '#00d9ff' },
]

const faqs = [
  ['What do you usually build?', 'Full-stack products, AI-enabled tools, analytics experiences, and useful automations.'],
  ['What technologies do you use?', 'Python, JavaScript, TypeScript, React, Node.js, FastAPI, PostgreSQL, TensorFlow, Three.js, and modern deployment tools.'],
  ['Can we collaborate?', 'Yes. Share the problem, goals, and timeline and I’ll get back to you.'],
  ['Are you open to opportunities?', 'I’m open to thoughtful projects and roles where software, AI, and product craft intersect.'],
]

export default function ContactSection() {
  const { profile } = usePortfolioContent()
  const [open, setOpen] = useState(0)

  return (
    <section className="section-wrap" id="contact">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Skills · Workflow · Identity</p>
          <h2>Reach Out</h2>
        </div>
        <span className="font-mono text-[10px] tracking-widest text-muted">OPEN TO GOOD IDEAS</span>
      </div>

      {/* Workflow steps horizontal row */}
      <div className="content-card mb-8 overflow-x-auto p-5">
        <div className="flex min-w-[640px] items-center justify-between">
          {WORKFLOW_STEPS.map((step, idx) => (
            <WorkflowStep
              key={step.step}
              {...step}
              isLast={idx === WORKFLOW_STEPS.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Contact form + FAQ grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <ContactForm email={profile.email} />

        <div className="content-card p-6 sm:p-7">
          <h3 className="mb-5 text-xl font-semibold tracking-tight text-primary">
            Frequently Asked Questions
          </h3>
          {faqs.map(([q, a], index) => (
            <div key={q} className="border-t border-line">
              <button
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium text-sm text-primary transition-colors hover:text-accent"
              >
                <span>{q}</span>
                <Plus
                  size={15}
                  className={`shrink-0 text-accent transition-transform duration-200 ${
                    open === index ? 'rotate-45' : ''
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === index ? 'auto' : 0, opacity: open === index ? 1 : 0 }}
                className="overflow-hidden text-xs leading-5 text-muted"
              >
                <p className="pb-4">{a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

