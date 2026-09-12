import { useEffect, useRef } from 'react'

export default function SceneBackground() {
  const canvas = useRef(null)
  const cursor = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    const el = canvas.current
    const ctx = el.getContext('2d')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let frame = 0
    let last = 0
    let previousDraw = 0
    let nextShootingStar = performance.now() + 15000 + Math.random() * 5000
    let shootingStar = null
    let mouseActive = false
    let mouse = { x: -1000, y: -1000 }
    let ring = { x: -1000, y: -1000 }
    const dots = Array.from({ length: 86 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      r: index % 17 === 0 ? 1.35 : Math.random() * .75 + .45,
      vx: (Math.random() * .0000045) + .0000015,
      vy: (Math.random() - .5) * .0000015,
      phase: Math.random() * Math.PI * 2,
    }))
    const galaxy = Array.from({ length: 138 }, (_, index) => {
      const progress = (index + Math.random()) / 138
      return {
        progress,
        angle: (index % 3) * Math.PI * 2 / 3 + progress * 10 + (Math.random() - .5) * .38,
        size: Math.random() * .75 + .45,
        alpha: Math.random() * .2 + .11,
        speed: .00012 + (1 - progress) * .00009,
      }
    })

    function resize() {
      width = innerWidth
      height = innerHeight
      const dpr = Math.min(devicePixelRatio, 1.5)
      el.width = width * dpr
      el.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function move(event) {
      if (event.pointerType === 'touch') return
      mouseActive = true
      mouse = { x: event.clientX, y: event.clientY }
      if (ring.x < 0) ring = { ...mouse }
      document.documentElement.classList.add('custom-cursor-active')
      cursor.current?.classList.add('shown')
      dot.current?.classList.add('shown')
      cursor.current?.classList.toggle('over-link', Boolean(event.target.closest('a,button,label,input,textarea,select')))
      if (dot.current) dot.current.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0)`
    }

    function leave() {
      mouseActive = false
      mouse = { x: -1000, y: -1000 }
      cursor.current?.classList.remove('shown')
      dot.current?.classList.remove('shown')
    }

    function draw(time) {
      frame = requestAnimationFrame(draw)
      if (mouseActive) {
        const ease = reduced ? 1 : .18
        ring.x += (mouse.x - ring.x) * ease
        ring.y += (mouse.y - ring.y) * ease
        if (cursor.current) cursor.current.style.transform = `translate3d(${ring.x}px,${ring.y}px,0)`
      }
      if (document.documentElement.dataset.theme === 'matrix') {
        ctx.clearRect(0, 0, width, height)
        return
      }
      if (document.hidden || time - last < 33) return
      last = time
      const elapsed = Math.min(50, previousDraw ? time - previousDraw : 33)
      previousDraw = time
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#29cbe5'
      dots.forEach((point, index) => {
        point.x = (point.x + point.vx * elapsed) % 1
        point.y = (point.y + point.vy * elapsed + 1) % 1
        const x = point.x * width
        const y = point.y * height
        const twinkle = .18 + (Math.sin(time * .0011 + point.phase) + 1) * .09
        ctx.globalAlpha = twinkle
        ctx.beginPath()
        ctx.arc(x, y, point.r, 0, Math.PI * 2)
        ctx.fill()
        if (index % 17 === 0) {
          ctx.strokeStyle = '#8eeeff'
          ctx.globalAlpha = twinkle * .7
          ctx.lineWidth = .65
          ctx.beginPath()
          ctx.moveTo(x - 4, y)
          ctx.lineTo(x + 4, y)
          ctx.moveTo(x, y - 4)
          ctx.lineTo(x, y + 4)
          ctx.stroke()
        }
        const distance = Math.hypot(x - mouse.x, y - mouse.y)
        if (distance < 140 && !reduced) {
          ctx.strokeStyle = '#24cde9'
          ctx.globalAlpha = (1 - distance / 140) * .28
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      })
      const galaxyX = width > 900 ? width * .51 : width * .5
      const galaxyY = height * .5
      const galaxyRadius = Math.min(width > 900 ? 230 : 150, width * .28)
      const glow = ctx.createRadialGradient(galaxyX, galaxyY, 0, galaxyX, galaxyY, galaxyRadius * .42)
        glow.addColorStop(0, 'rgba(0,217,255,.14)')
        glow.addColorStop(1, 'rgba(0,217,255,0)')
      ctx.globalAlpha = 1
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(galaxyX, galaxyY, galaxyRadius * .42, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#3ddcf2'
      galaxy.forEach((star, index) => {
        const radius = 8 + Math.pow(star.progress, .72) * galaxyRadius
        const rotation = time * star.speed
        const x = galaxyX + Math.cos(star.angle + rotation) * radius
        const y = galaxyY + Math.sin(star.angle + rotation) * radius * .66
        ctx.globalAlpha = star.alpha * (1 - star.progress * .32)
        ctx.beginPath()
        ctx.arc(x, y, index % 19 === 0 ? star.size * 1.7 : star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      if (time >= nextShootingStar && !shootingStar) {
        shootingStar = { started: time, y: height * (.12 + Math.random() * .34), length: 150 + Math.random() * 90 }
      }
      if (shootingStar) {
        const progress = (time - shootingStar.started) / 1450
        if (progress >= 1) {
          shootingStar = null
          nextShootingStar = time + 15000 + Math.random() * 5000
        } else {
          const x = -shootingStar.length + progress * (width + shootingStar.length * 2)
          const y = shootingStar.y + progress * height * .24
          const tailX = x - shootingStar.length
          const tailY = y - shootingStar.length * .24
          const trail = ctx.createLinearGradient(tailX, tailY, x, y)
          trail.addColorStop(0, 'rgba(0,217,255,0)')
          trail.addColorStop(.72, 'rgba(90,230,255,.18)')
          trail.addColorStop(1, 'rgba(220,252,255,.95)')
          ctx.globalAlpha = Math.sin(progress * Math.PI)
          ctx.strokeStyle = trail
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(tailX, tailY)
          ctx.lineTo(x, y)
          ctx.stroke()
          ctx.fillStyle = '#e8fdff'
          ctx.beginPath()
          ctx.arc(x, y, 1.8, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    resize()
    frame = requestAnimationFrame(draw)
    addEventListener('resize', resize)
    addEventListener('pointermove', move)
    document.addEventListener('mouseleave', leave)

    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('resize', resize)
      removeEventListener('pointermove', move)
      document.removeEventListener('mouseleave', leave)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  return <><canvas ref={canvas} className="particle-background" aria-hidden="true"/><div ref={cursor} className="cursor-orbit" aria-hidden="true"/><div ref={dot} className="cursor-dot" aria-hidden="true"/></>
}
