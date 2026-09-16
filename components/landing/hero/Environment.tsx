'use client'

/**
 * Environment — scene background and fog.
 * Uses a pure black background to match the page background.
 */
export function Environment() {
  return (
    <>
      <color attach="background" args={['#080909']} />
      <fogExp2 attach="fog" color="#080909" density={0.04} />
    </>
  )
}
