import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SceneBackground from './components/SceneBackground'
import Home from './pages/Home'
import Projects from './pages/Projects'
const Skills = lazy(() => import('./pages/Skills'))
import Credentials from './pages/Credentials'
import About from './pages/About'
import Kiro from './pages/Kiro'

function Page({ children }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}>{children}</motion.div>
}

export default function App() {
  const location = useLocation()
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark')
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('portfolio-theme', theme) }, [theme])
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])

  return (
    <div className="portfolio-root min-h-screen text-primary">
      <div className="ambient"/><div className="grid-layer"/><div className="noise"/>
      <Suspense fallback={null}><SceneBackground /></Suspense>
      <Navbar theme={theme} setTheme={setTheme} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/projects" element={<Page><Projects /></Page>} />
          <Route path="/skills" element={<Page><Suspense fallback={<main className="page-wrap">Loading skills…</main>}><Skills /></Suspense></Page>} />
          <Route path="/credentials" element={<Page><Credentials /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/kiro" element={<Page><Kiro /></Page>} />
          <Route path="*" element={<Page><Home /></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
