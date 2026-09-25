'use client'

/**
 * Environment — Scene environment and fog.
 * Minimal, clean setup matching the Ink Wash Dark background.
 */
export function Environment() {
  return (
    <>
      <fog
        attach="fog"
        args={['#080909', 0.045]}
      />
      <color attach="background" args={['#080909']} />
    </>
  )
}