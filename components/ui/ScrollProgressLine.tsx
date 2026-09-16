'use client'

import { useEffect, useState } from 'react'

/**
 * 1px copper scroll progress line fixed to top of viewport.
 * Tracks document scroll depth in real time.
 */
export function ScrollProgressLine() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      role="progressbar"
      aria-hidden="true"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 z-[100] h-px pointer-events-none"
      style={{
        width: `${progress}%`,
        background: 'var(--color-accent)',
        opacity: 0.75,
        transition: 'none',
      }}
    />
  )
}
