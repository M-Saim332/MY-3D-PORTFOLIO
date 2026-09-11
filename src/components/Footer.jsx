import { useEffect, useMemo, useState } from 'react'
import { Activity, Clock3, Globe2, Images, Laptop, Monitor, RefreshCw, Wifi, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePortfolioContent } from '../content/ContentContext'

const panels = {
  visitors: { title: 'Live Analytics', subtitle: 'Portfolio · real-time', icon: Activity },
  gallery: { title: 'Project Gallery', subtitle: 'Selected work', icon: Images },
  monitor: { title: 'System Monitor', subtitle: 'Portfolio status', icon: Monitor },
}

export default function Footer() {
  const { projects, profile } = usePortfolioContent()
  const [panel, setPanel] = useState(null)
  const [checkedAt, setCheckedAt] = useState(new Date())
  const device = useMemo(() => {
    if (typeof navigator === 'undefined') return 'Browser'
    if (/Android/i.test(navigator.userAgent)) return 'Android'
    if (/iPhone|iPad/i.test(navigator.userAgent)) return 'iOS'
    if (/Win/i.test(navigator.platform)) return 'Windows'
    if (/Mac/i.test(navigator.platform)) return 'macOS'
    if (/Linux/i.test(navigator.platform)) return 'Linux'
    return 'Browser'
  }, [])

  useEffect(() => {
    const close = (event) => event.key === 'Escape' && setPanel(null)
    addEventListener('keydown', close)
    document.body.classList.toggle('utility-panel-open', Boolean(panel))
    return () => {
      removeEventListener('keydown', close)
      document.body.classList.remove('utility-panel-open')
    }
  }, [panel])

  const toggle = (name) => setPanel((current) => current === name ? null : name)
  const current = panel ? panels[panel] : null
  const PanelIcon = current?.icon

  return (
    <>
      <footer className="utility-footer">
        <div className="utility-footer-inner">
          <span className="footer-signature"><i className="status-dot" />© 2026 {profile.name}</span>
          <div className="utility-dock" aria-label="Portfolio utilities">
            <button className={panel === 'visitors' ? 'active' : ''} onClick={() => toggle('visitors')}><Activity size={17}/>Visitors</button>
            <button className={panel === 'gallery' ? 'active' : ''} onClick={() => toggle('gallery')}><Images size={17}/>Gallery</button>
            <button className={panel === 'monitor' ? 'active' : ''} onClick={() => toggle('monitor')}><Monitor size={17}/>Monitor</button>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {panel && (
          <>
            <motion.button className="utility-backdrop" aria-label="Close utility panel" onClick={() => setPanel(null)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} />
            <motion.aside className="utility-panel" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:28,stiffness:260}} aria-label={current.title}>
              <header className="utility-panel-header">
                <span className="utility-panel-icon"><PanelIcon size={21}/></span>
                <div><h2>{current.title}</h2><p>{current.subtitle}</p></div>
                <span className="live-pill"><i/>LIVE</span>
                <button onClick={() => setCheckedAt(new Date())} aria-label="Refresh"><RefreshCw size={15}/></button>
                <button onClick={() => setPanel(null)} aria-label="Close"><X size={18}/></button>
              </header>

              <div className="utility-panel-body">
                {panel === 'visitors' && <VisitorsPanel />}
                {panel === 'gallery' && <GalleryPanel />}
                {panel === 'monitor' && <MonitorPanel device={device} checkedAt={checkedAt} />}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function VisitorsPanel() {
  return <>
    <div className="analytics-cards">
      <article><span>THIS MONTH</span><strong>—</strong><p>page views</p></article>
      <article><span>ALL TIME</span><strong>—</strong><p>total views</p></article>
    </div>
    <div className="panel-section-title"><Globe2 size={15}/>AUDIENCE · COUNTRIES</div>
    <div className="empty-analytics"><Activity size={27}/><h3>Analytics activates on Vercel</h3><p>Real visitor totals and countries will appear after the deployed site is connected to Vercel Analytics.</p></div>
    <div className="panel-section-title"><Laptop size={15}/>DEVICES · OS</div>
    <div className="device-grid"><span>Windows</span><span>macOS</span><span>Android</span><span>Linux</span><span>iOS</span><span>Other</span></div>
  </>
}

function GalleryPanel() {
  return <div className="drawer-gallery">{projects.map((project) => <article key={project.id} style={{'--gallery-color':project.color}}><span>{project.id} · {project.category}</span><h3>{project.title}</h3><p>{project.description}</p></article>)}</div>
}

function MonitorPanel({ device, checkedAt }) {
  return <>
    <div className="monitor-hero"><Wifi size={30}/><div><strong>{navigator.onLine ? 'All systems online' : 'You are offline'}</strong><p>Checked from this browser</p></div></div>
    <div className="status-list">
      <article><span>Portfolio frontend</span><b className="online">ONLINE</b></article>
      <article><span>Content dashboard</span><b>PLANNED</b></article>
      <article><span>Vercel analytics</span><b>AFTER DEPLOY</b></article>
    </div>
    <div className="panel-section-title"><Laptop size={15}/>CURRENT SESSION</div>
    <div className="session-grid"><article><span>DEVICE</span><strong>{device}</strong></article><article><span>CONNECTION</span><strong>{navigator.onLine ? 'Online' : 'Offline'}</strong></article><article><span>LOCAL TIME</span><strong>{checkedAt.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</strong></article><article><span>TIMEZONE</span><strong>{Intl.DateTimeFormat().resolvedOptions().timeZone}</strong></article></div>
    <p className="monitor-note"><Clock3 size={14}/>This panel reports the current browser honestly. Global uptime data can be connected after deployment.</p>
  </>
}
