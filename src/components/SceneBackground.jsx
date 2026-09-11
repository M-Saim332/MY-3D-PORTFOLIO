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
    let mouseActive = false
    let mouse = { x: -1000, y: -1000 }
    let ring = { x: -1000, y: -1000 }
    const dots = Array.from({ length: 55 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() + .4 }))

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
      if (document.hidden || time - last < 33) return
      last = time
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#29cbe5'
      dots.forEach((point, index) => {
        const x = point.x * width
        const y = point.y * height + (reduced ? 0 : Math.sin(time * .0002 + index) * 9)
        ctx.globalAlpha = .25
        ctx.beginPath()
        ctx.arc(x, y, point.r, 0, Math.PI * 2)
        ctx.fill()
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
