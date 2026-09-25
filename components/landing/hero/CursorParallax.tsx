'use client'

import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

/**
 * CursorParallax — Mouse-reactive camera offset controller.
 * Reads normalized cursor position, applies lerped rotation to a group wrapping LivingCore.
 * Max ±12deg X, ±15deg Y. Respects reduced motion.
 */

interface CursorParallaxProps {
  children: React.ReactNode
  maxRotationX?: number // degrees
  maxRotationY?: number // degrees
  lerpFactor?: number
}

export function CursorParallax({
  children,
  maxRotationX = 8,
  maxRotationY = 12,
  lerpFactor = 0.04,
}: CursorParallaxProps) {
  const groupRef = useRef<THREE.Group>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    if (reducedMotion) return

    const handleMove = (e: MouseEvent) => {
      // Normalize to -1..1
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('mousemove', handleMove, { passive: true })

    const animate = () => {
      if (!groupRef.current) return

      // Lerp toward target
      current.current.x += (target.current.x - current.current.x) * lerpFactor
      current.current.y += (target.current.y - current.current.y) * lerpFactor

      // Apply rotation (invert Y for natural feel)
      const rotX = THREE.MathUtils.degToRad(-current.current.y * maxRotationX)
      const rotY = THREE.MathUtils.degToRad(current.current.x * maxRotationY)

      groupRef.current.rotation.x = rotX
      groupRef.current.rotation.y = rotY

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [maxRotationX, maxRotationY, lerpFactor, reducedMotion])

  if (!mounted || reducedMotion) {
    return <group ref={groupRef}>{children}</group>
  }

  return <group ref={groupRef}>{children}</group>
}