'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/lib/theme'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  baseOpacity: number
  color: string
  angle: number
  speed: number
}

// ─── Ink Wash color palettes ──────────────────────────────────────────────────
const DARK_COLORS = [
  'rgba(143, 150, 147,',  // ink-gray
  'rgba(216, 214, 207,',  // ink-muted
  'rgba(143, 150, 147,',  // ink-gray (weighted)
  'rgba(241, 239, 232,',  // ink-ivory (rare)
]

const LIGHT_COLORS = [
  'rgba(143, 150, 147,',  // ink-gray
  'rgba(24, 27, 26,',     // ink-graphite
  'rgba(17, 19, 18,',     // ink-charcoal
]

// ─── Flow field helper ────────────────────────────────────────────────────────
function flowAngle(x: number, y: number, t: number): number {
  const scale = 0.0012
  const sx = x * scale
  const sy = y * scale
  return (
    Math.sin(sx + t * 0.1) * Math.cos(sy * 0.7 + t * 0.08) * Math.PI * 2 +
    Math.sin(sx * 1.2 - sy * 0.8 + t * 0.06) * 0.5
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export function BackgroundElements() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animId = 0
    let t = 0
    let particles: Particle[] = []

    function resize() {
      canvas!.width  = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()

    // Dramatically reduced particle counts
    function countForDevice(): number {
      const w = window.innerWidth
      if (w < 480)  return 25
      if (w < 768)  return 35
      if (w < 1280) return 55
      return 80
    }

    function makeParticles() {
      const isLight = themeRef.current === 'light'
      const palette = isLight ? LIGHT_COLORS : DARK_COLORS
      const count   = countForDevice()
      particles = []

      for (let i = 0; i < count; i++) {
        const color = palette[Math.floor(Math.random() * palette.length)]
        particles.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: 0,
          vy: 0,
          size: Math.random() * 1.2 + 0.4,
          opacity: 0,
          baseOpacity: (Math.random() * 0.15 + 0.03),
          color,
          angle: Math.random() * Math.PI * 2,
          speed: (Math.random() * 0.15 + 0.08),
        })
      }
    }

    makeParticles()

    // Mouse interaction (very subtle)
    const mouse = { x: -9999, y: -9999 }
    const REPEL_RADIUS = 180
    const REPEL_STRENGTH = 1.5

    function onMouseMove(e: MouseEvent) { mouse.x = e.clientX; mouse.y = e.clientY }
    function onMouseLeave() { mouse.x = -9999; mouse.y = -9999 }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)

    let resizeTimer: ReturnType<typeof setTimeout>
    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => { resize(); makeParticles() }, 200)
    }
    window.addEventListener('resize', onResize)

    function draw() {
      const w = canvas!.width
      const h = canvas!.height
      ctx!.clearRect(0, 0, w, h)
      t += 0.012

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        const angle = flowAngle(p.x, p.y, t)
        const targetVX = Math.cos(angle) * p.speed
        const targetVY = Math.sin(angle) * p.speed

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        let repelX = 0
        let repelY = 0
        if (dist < REPEL_RADIUS && dist > 0.1) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
          repelX = (dx / dist) * force
          repelY = (dy / dist) * force
        }

        p.vx += (targetVX + repelX - p.vx) * 0.04
        p.vy += (targetVY + repelY - p.vy) * 0.04
        p.x += p.vx
        p.y += p.vy

        if (p.x < -10) { p.x = w + 5; p.y = Math.random() * h }
        if (p.x > w + 10) { p.x = -5; p.y = Math.random() * h }
        if (p.y < -10) { p.y = h + 5; p.x = Math.random() * w }
        if (p.y > h + 10) { p.y = -5; p.x = Math.random() * w }

        p.opacity += (p.baseOpacity - p.opacity) * 0.03
        if (p.opacity < 0.002) continue

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `${p.color}${p.opacity.toFixed(3)})`
        ctx!.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <>
      {/* ── Subtle noise texture ──────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -2,
          pointerEvents: 'none',
          opacity: 0.018,
          mixBlendMode: 'screen',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
        }}
      />

      {/* ── Particle canvas ───────────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </>
  )
}
