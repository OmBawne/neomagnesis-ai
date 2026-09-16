'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Subtle cursor-reactive warm ambient glow.
 * Nearly imperceptible — felt not seen.
 * Hidden on touch devices and when prefers-reduced-motion is set.
 */
export function CursorLight() {
  const lightRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -500, y: -500 })
  const current = useRef({ x: -500, y: -500 })
  const rafRef = useRef<number | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Disable on touch / reduced-motion devices
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setVisible(true)

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      const lag = 0.08
      current.current.x += (pos.current.x - current.current.x) * lag
      current.current.y += (pos.current.y - current.current.y) * lag

      if (lightRef.current) {
        lightRef.current.style.transform =
          `translate(${current.current.x - 200}px, ${current.current.y - 200}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={lightRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[1] will-change-transform"
      style={{
        width: 400,
        height: 400,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(184,115,51,0.04) 0%, rgba(184,115,51,0.015) 40%, transparent 70%)',
      }}
    />
  )
}
