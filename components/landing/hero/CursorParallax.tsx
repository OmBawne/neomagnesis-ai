'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface CursorParallaxProps {
  children: React.ReactNode
  maxRotationX?: number // degrees
  maxRotationY?: number // degrees
  lerpFactor?: number
}

/**
 * CursorParallax — wraps children in a group that subtly rotates
 * in response to cursor position. Heavy lerp for smooth, premium feel.
 */
export function CursorParallax({
  children,
  maxRotationX = 8,
  maxRotationY = 12,
  lerpFactor = 0.04,
}: CursorParallaxProps) {
  const groupRef = useRef<THREE.Group>(null)
  const target = useRef({ x: 0, y: 0 })
  const { size } = useThree()

  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  useEffect(() => {
    if (prefersReduced) return

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1..1 range
      const nx = (e.clientX / size.width) * 2 - 1
      const ny = -((e.clientY / size.height) * 2 - 1)

      target.current.x = ny * (maxRotationX * Math.PI / 180)
      target.current.y = nx * (maxRotationY * Math.PI / 180)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [size, maxRotationX, maxRotationY, prefersReduced])

  useFrame(() => {
    if (prefersReduced || !groupRef.current) return
    groupRef.current.rotation.x +=
      (target.current.x - groupRef.current.rotation.x) * lerpFactor
    groupRef.current.rotation.y +=
      (target.current.y - groupRef.current.rotation.y) * lerpFactor
  })

  return <group ref={groupRef}>{children}</group>
}
