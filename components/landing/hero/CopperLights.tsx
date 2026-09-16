'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * CopperLights — warm directional key light + cool fill + ambient.
 * Creates the warm copper reflection on the LivingCore object.
 */
export function CopperLights() {
  const keyRef = useRef<THREE.DirectionalLight>(null)

  useFrame(({ clock }) => {
    if (keyRef.current) {
      const t = clock.getElapsedTime()
      // Very subtle key light drift for a living quality
      keyRef.current.position.x = 3 + Math.sin(t * 0.2) * 0.3
      keyRef.current.position.z = 2 + Math.cos(t * 0.15) * 0.2
    }
  })

  return (
    <>
      {/* Warm ambient fill */}
      <ambientLight color="#F1EFE8" intensity={0.25} />

      {/* Warm copper key light — primary */}
      <directionalLight
        ref={keyRef}
        position={[3, 4, 2]}
        color="#C98344"
        intensity={1.4}
        castShadow={false}
      />

      {/* Cool rim fill */}
      <pointLight
        position={[-2.5, -1, -3]}
        color="#9AA19E"
        intensity={0.5}
        decay={2}
      />

      {/* Subtle under-light for depth */}
      <pointLight
        position={[0, -3, 1]}
        color="#B87333"
        intensity={0.2}
        decay={3}
      />
    </>
  )
}
