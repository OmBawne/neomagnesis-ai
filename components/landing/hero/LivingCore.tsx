'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * LivingCore — the custom sculptural centerpiece.
 *
 * Three intertwined orbital ribbons inspired by the Nucleus Loop mark —
 * three arc paths orbiting a shared center of negative space.
 * Each ribbon is a tube following a parametric arc in 3D.
 */

function createOrbitalPath(
  phase: number,
  tiltX: number,
  tiltZ: number,
  radius: number,
  segments: number
): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = []
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 1.6 + phase
    const x = Math.cos(t) * radius
    const y = Math.sin(t) * radius * 0.85
    const z = Math.sin(t * 0.5) * 0.3
    const pt = new THREE.Vector3(x, y, z)
    // Apply tilt rotations
    pt.applyEuler(new THREE.Euler(tiltX, 0, tiltZ))
    points.push(pt)
  }
  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5)
}

interface OrbitalRibbonProps {
  phase: number
  tiltX: number
  tiltZ: number
  radius: number
  tubeRadius: number
  color: string
  roughness: number
  metalness: number
  opacity?: number
}

function OrbitalRibbon({
  phase,
  tiltX,
  tiltZ,
  radius,
  tubeRadius,
  color,
  roughness,
  metalness,
  opacity = 1,
}: OrbitalRibbonProps) {
  const curve = useMemo(
    () => createOrbitalPath(phase, tiltX, tiltZ, radius, 80),
    [phase, tiltX, tiltZ, radius]
  )

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 80, tubeRadius, 8, false)
  }, [curve, tubeRadius])

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  )
}

export function LivingCore() {
  const groupRef = useRef<THREE.Group>(null)
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  useFrame(({ clock }) => {
    if (prefersReduced || !groupRef.current) return
    const t = clock.getElapsedTime()

    // Slow continuous rotation
    groupRef.current.rotation.y = t * 0.09
    groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.06

    // Breathing scale oscillation
    const breath = 1 + Math.sin(t * (Math.PI / 2)) * 0.025
    groupRef.current.scale.setScalar(breath)
  })

  return (
    <group ref={groupRef}>
      {/* Arc 1 — upper orbital, slightly tilted forward */}
      <OrbitalRibbon
        phase={0}
        tiltX={0.3}
        tiltZ={0.1}
        radius={1.2}
        tubeRadius={0.072}
        color="#1A1C1B"
        roughness={0.82}
        metalness={0.18}
      />

      {/* Arc 2 — lower orbital, tilted opposite */}
      <OrbitalRibbon
        phase={Math.PI * 0.67}
        tiltX={-0.3}
        tiltZ={-0.15}
        radius={1.2}
        tubeRadius={0.068}
        color="#161918"
        roughness={0.88}
        metalness={0.12}
        opacity={0.95}
      />

      {/* Arc 3 — diagonal connector, the copper-accent ribbon */}
      <OrbitalRibbon
        phase={Math.PI * 1.33}
        tiltX={0.1}
        tiltZ={0.45}
        radius={1.15}
        tubeRadius={0.06}
        color="#2A1F14"
        roughness={0.75}
        metalness={0.25}
        opacity={0.9}
      />

      {/* Negative-space center sphere — matte obsidian core */}
      <mesh>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial
          color="#080909"
          roughness={1}
          metalness={0}
        />
      </mesh>
    </group>
  )
}
