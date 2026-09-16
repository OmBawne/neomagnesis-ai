'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleConfig {
  speed: number
  radius: number
  phaseA: number
  phaseB: number
  freqA: number
  freqB: number
  size: number
  opacity: number
}

/** 8 ambient particles following unique Lissajous paths */
const PARTICLE_CONFIGS: ParticleConfig[] = [
  { speed: 0.06, radius: 1.8, phaseA: 0,    phaseB: 0,    freqA: 1.3, freqB: 1.0, size: 0.018, opacity: 0.55 },
  { speed: 0.05, radius: 2.1, phaseA: 1.2,  phaseB: 0.8,  freqA: 1.0, freqB: 1.4, size: 0.014, opacity: 0.45 },
  { speed: 0.07, radius: 1.6, phaseA: 2.4,  phaseB: 1.6,  freqA: 1.5, freqB: 0.9, size: 0.016, opacity: 0.5  },
  { speed: 0.04, radius: 2.3, phaseA: 3.7,  phaseB: 2.1,  freqA: 0.8, freqB: 1.2, size: 0.012, opacity: 0.4  },
  { speed: 0.08, radius: 1.5, phaseA: 0.6,  phaseB: 3.0,  freqA: 1.2, freqB: 1.6, size: 0.015, opacity: 0.5  },
  { speed: 0.05, radius: 2.0, phaseA: 1.8,  phaseB: 0.4,  freqA: 0.9, freqB: 1.1, size: 0.013, opacity: 0.35 },
  { speed: 0.06, radius: 1.9, phaseA: 4.2,  phaseB: 1.2,  freqA: 1.4, freqB: 0.7, size: 0.017, opacity: 0.48 },
  { speed: 0.04, radius: 2.4, phaseA: 2.8,  phaseB: 2.5,  freqA: 0.7, freqB: 1.3, size: 0.011, opacity: 0.38 },
]

function Particle({ config, index }: { config: ParticleConfig; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  useFrame(({ clock }) => {
    if (prefersReduced || !meshRef.current) return
    const t = clock.getElapsedTime() * config.speed

    meshRef.current.position.x =
      Math.sin(t * config.freqA + config.phaseA) * config.radius
    meshRef.current.position.y =
      Math.sin(t * config.freqB + config.phaseB) * config.radius * 0.6
    meshRef.current.position.z =
      Math.cos(t * config.freqA * 0.8 + config.phaseA * 0.5) * config.radius * 0.5
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[config.size, 6, 6]} />
      <meshBasicMaterial
        color={index % 3 === 0 ? '#B87333' : '#9AA19E'}
        transparent
        opacity={config.opacity}
      />
    </mesh>
  )
}

export function ParticleField() {
  return (
    <group>
      {PARTICLE_CONFIGS.map((cfg, i) => (
        <Particle key={i} config={cfg} index={i} />
      ))}
    </group>
  )
}
