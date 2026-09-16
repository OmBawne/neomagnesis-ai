'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from './Environment'
import { CopperLights } from './CopperLights'
import { LivingCore } from './LivingCore'
import { ParticleField } from './ParticleField'
import { CursorParallax } from './CursorParallax'

/**
 * HeroCanvas — Three.js canvas entry point.
 * Loaded via next/dynamic({ ssr: false }) from Hero.tsx.
 */
export function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.5], fov: 38 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: 4, // THREE.ACESFilmicToneMapping
        toneMappingExposure: 1.1,
      }}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <Environment />
      <CopperLights />
      <CursorParallax maxRotationX={8} maxRotationY={12} lerpFactor={0.04}>
        <LivingCore />
        <ParticleField />
      </CursorParallax>
    </Canvas>
  )
}
