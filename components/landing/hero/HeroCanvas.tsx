'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from './Environment'
import { CopperLights } from './CopperLights'
import { AgenticSystemCore } from './AgenticSystemCore'
import { ParticleField } from './ParticleField'
import { CursorParallax } from './CursorParallax'

/** Graceful 2D/CSS Vector Fallback for low-power or non-WebGL devices */
function GracefulFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none opacity-40">
      <div className="relative w-72 h-72">
        <div className="absolute inset-0 rounded-full border border-[#C87D55]/30 animate-[spin_25s_linear_infinite]" />
        <div className="absolute inset-6 rounded-full border border-white/10 animate-[spin_35s_linear_infinite_reverse]" />
        <div className="absolute inset-16 rounded-full border border-[#C87D55]/20 animate-[spin_18s_linear_infinite]" />
      </div>
    </div>
  )
}

export function HeroCanvas() {
  const [hasWebGL, setHasWebGL] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setHasWebGL(false)
    } catch {
      setHasWebGL(false)
    }
  }, [])

  if (!mounted) return null
  if (!hasWebGL) return <GracefulFallback />

  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 5.2], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMappingExposure: 1.15,
        }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <Environment />
        <CopperLights />
        <CursorParallax maxRotationX={7} maxRotationY={10} lerpFactor={0.035}>
          <AgenticSystemCore />
          <ParticleField />
        </CursorParallax>
      </Canvas>
    </div>
  )
}

export default HeroCanvas