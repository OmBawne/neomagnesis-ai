'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * ParticleField — 8 ambient particles drifting in slow Lissajous arcs.
 * Each particle follows a unique path, barely visible, felt not seen.
 */

interface ParticleData {
  id: number
  basePos: THREE.Vector3
  freqX: number
  freqY: number
  freqZ: number
  phaseX: number
  phaseY: number
  phaseZ: number
  amplitude: number
  color: string
  size: number
}

function generateParticles(): ParticleData[] {
  const colors = [
    '#B87333', // copper
    '#9AA19E', // mist
    '#626A66', // muted
    '#5BA87E', // forest
  ]

  const particles: ParticleData[] = []
  for (let i = 0; i < 8; i++) {
    // Distribute in a loose sphere around the core
    const theta = Math.acos(2 * Math.random() - 1)
    const phi = 2 * Math.PI * Math.random()
    const r = 1.6 + Math.random() * 0.8

    particles.push({
      id: i,
      basePos: new THREE.Vector3(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(theta)
      ),
      freqX: 0.08 + Math.random() * 0.06,
      freqY: 0.07 + Math.random() * 0.05,
      freqZ: 0.05 + Math.random() * 0.04,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      phaseZ: Math.random() * Math.PI * 2,
      amplitude: 0.25 + Math.random() * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 0.01 + Math.random() * 0.008,
    })
  }
  return particles
}

const PARTICLES = generateParticles()

function Particle({ data }: { data: ParticleData }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()

    // Lissajous motion
    meshRef.current.position.x = data.basePos.x + Math.sin(t * data.freqX + data.phaseX) * data.amplitude
    meshRef.current.position.y = data.basePos.y + Math.sin(t * data.freqY + data.phaseY) * data.amplitude
    meshRef.current.position.z = data.basePos.z + Math.sin(t * data.freqZ + data.phaseZ) * data.amplitude

    // Subtle pulse
    const pulse = 1 + Math.sin(t * 0.4 + data.phaseX) * 0.15
    meshRef.current.scale.setScalar(pulse)
  })

  return (
    <mesh ref={meshRef} geometry={new THREE.SphereGeometry(data.size, 6, 6)}>
      <meshBasicMaterial
        color={data.color}
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </mesh>
  )
}

export function ParticleField() {
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  if (prefersReduced) return null

  return (
    <group>
      {PARTICLES.map((p) => (
        <Particle key={p.id} data={p} />
      ))}
    </group>
  )
}