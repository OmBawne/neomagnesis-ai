'use client'

/**
 * CopperLights — Scene lighting setup for warm copper reflections.
 * Key light: warm directional from upper-right
 * Fill: cool ambient
 * Rim: subtle point light for edge definition
 */
export function CopperLights() {
  return (
    <>
      {/* Ambient base — cool neutral */}
      <ambientLight intensity={0.25} color="#F1EFE8" />

      {/* Key light — warm copper directional from upper right */}
      <directionalLight
        position={[4, 5, 3]}
        color="#D4883B"
        intensity={1.4}
        castShadow={false}
      />

      {/* Fill light — cool from lower left */}
      <directionalLight
        position={[-3, -2, -4]}
        color="#9AA19E"
        intensity={0.35}
        castShadow={false}
      />

      {/* Rim/edge highlight — warm point for copper catch */}
      <pointLight
        position={[-2.5, -1.5, -3.5]}
        color="#C98344"
        intensity={0.6}
        decay={1.5}
        distance={8}
      />
    </>
  )
}