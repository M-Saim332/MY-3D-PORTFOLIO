import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageIntro from '../components/PageIntro'
import SkillGlobe, { getSkillColor, SKILL_META } from '../components/SkillGlobe'
import { skillGroups } from '../data'

export default function Skills() {
  const [active, setActive] = useState('languages')
  const group = skillGroups[active]

  return (
    <main className="page-wrap">
      <PageIntro
        eyebrow="Forge"
        title="Technical Expertise"
        copy="A living constellation of the tools, concepts, and systems I use to turn ideas into working products."
        side="DRAG TO ROTATE"
      />
      <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <SkillGlobe skills={group.skills} />

        <div className="content-card p-6 md:p-8">
          {/* Tab pills */}
          <div className="mb-8 flex flex-wrap gap-2">
            {Object.entries(skillGroups).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`tab-pill ${active === key ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <p className="eyebrow">{group.skills.length} skills</p>
              <h2 className="text-3xl font-semibold tracking-tight">{group.title}</h2>
              <p className="mt-3 text-muted">{group.description}</p>

              {/* Colourful skill chips with brand icons */}
              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill, idx) => {
                  const color = getSkillColor(skill, idx)
                  const Icon  = SKILL_META[skill]?.Icon ?? null
                  return (
                    <span
                      key={skill}
                      className="skill-chip"
                      style={{
                        color,
                        border:     `1px solid ${color}55`,
                        background: `${color}18`,
                        boxShadow:  `0 0 10px ${color}22`,
                      }}
                    >
                      {Icon && (
                        <Icon
                          style={{
                            display:       'inline',
                            verticalAlign: 'middle',
                            marginRight:   5,
                            fontSize:      13,
                            flexShrink:    0,
                          }}
                        />
                      )}
                      {skill}
                    </span>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
