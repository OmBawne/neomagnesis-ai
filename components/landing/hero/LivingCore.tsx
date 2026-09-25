'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * LivingCore — The custom sculptural centerpiece.
 *
 * Three intertwined orbital ribbons inspired by the Nucleus Loop mark.
 * Three arc paths orbit a shared negative-space center.
 *
 * Materials: matte obsidian (Arcs 1 & 2) + warm copper-tinted ribbon (Arc 3).
 * The copper key light in CopperLights makes Arc 3 catch warm reflections.
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
    const z = Math.sin(t * 0.5) * 0.35
    const pt = new THREE.Vector3(x, y, z)
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
  envMapIntensity?: number
}

function OrbitalRibbon({
  phase, tiltX, tiltZ, radius, tubeRadius,
  color, roughness, metalness, opacity = 1, envMapIntensity = 0.6,
}: OrbitalRibbonProps) {
  const curve = useMemo(
    () => createOrbitalPath(phase, tiltX, tiltZ, radius, 180),
    [phase, tiltX, tiltZ, radius]
  )

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 180, tubeRadius, 12, false)
  }, [curve, tubeRadius])

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        transparent={opacity < 1}
        opacity={opacity}
        envMapIntensity={envMapIntensity}
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

    // Slow, dignified rotation — never rushed
    groupRef.current.rotation.y = t * 0.065
    groupRef.current.rotation.x = Math.sin(t * 0.028) * 0.04

    // Breathing — subtle scale oscillation (4.5s period)
    const breath = 1 + Math.sin(t * (Math.PI / 4.5)) * 0.015
    groupRef.current.scale.setScalar(breath)
  })

  return (
    <group ref={groupRef}>
      {/*
       * Arc 1 — upper orbital.
       * Matte obsidian: lifted enough to read against the dark canvas.
       * Warm light from CopperLights catches the surface.
       */}
      <OrbitalRibbon
        phase={0}
        tiltX={0.35}
        tiltZ={0.08}
        radius={1.25}
        tubeRadius={0.095}
        color="#252C2A"
        roughness={0.82}
        metalness={0.18}
        envMapIntensity={0.85}
      />

      {/*
       * Arc 2 — counter-orbital.
       * Slightly darker, opposite tilt for asymmetric depth.
       */}
      <OrbitalRibbon
        phase={Math.PI * 0.67}
        tiltX={-0.35}
        tiltZ={-0.15}
        radius={1.25}
        tubeRadius={0.088}
        color="#1E2421"
        roughness={0.88}
        metalness={0.12}
        opacity={0.95}
        envMapIntensity={0.65}
      />

      {/*
       * Arc 3 — diagonal copper connector.
       * This is the accent ribbon — warm copper base material + copper key light
       * creates the ember-like reflection that makes the object feel alive.
       */}
      <OrbitalRibbon
        phase={Math.PI * 1.33}
        tiltX={0.12}
        tiltZ={0.52}
        radius={1.18}
        tubeRadius={0.08}
        color="#4A2E12"
        roughness={0.58}
        metalness={0.42}
        opacity={0.94}
        envMapIntensity={1.2}
      />

      {/*
       * Negative-space center sphere.
       * Matte obsidian — same color as background so it reads as emptiness.
       * Slightly larger than the ribbon intersection to feel intentional.
       */}
      <mesh>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color="#060708"
          roughness={1}
          metalness={0}
        />
      </mesh>
    </group>
  )
}