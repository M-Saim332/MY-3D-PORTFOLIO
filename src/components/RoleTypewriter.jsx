/**
 * RoleTypewriter.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Cycling role typewriter/text component for the hero section using framer-motion.
 */

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const defaultRoles = ['DEVELOPER', 'PROGRAMMER', 'CREATOR', 'ML EXPLORER']

export default function RoleTypewriter({ roles = defaultRoles, interval = 2500 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % roles.length)
    }, interval)
    return () => clearInterval(timer)
  }, [roles.length, interval])

  return (
    <div className="role-typewriter-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={roles[index]}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="role-typewriter-text"
        >
          {roles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
