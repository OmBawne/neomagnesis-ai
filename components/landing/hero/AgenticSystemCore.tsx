'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * AgenticSystemCore — Original interactive 3D centerpiece.
 * Represents:
 * - Autonomous agents (faceted orbital processing nodes)
 * - Local computation (inner core boundary)
 * - Interconnected systems (smooth data pulse transit)
 * - The Nucleus Loop harmony (120-degree tripartite geometry)
 */

interface RibbonProps {
  rotationZ: number
  tiltX: number
  tiltY: number
  color: string
  roughness: number
  metalness: number
  radius: number
}

function createParametricRibbon(radius: number, segments = 160): THREE.TubeGeometry {
  const points: THREE.Vector3[] = []
  for (let i = 0; i <= segments; i++) {
    const u = (i / segments) * Math.PI * 2
    // Sophisticated non-spherical knot curve echoing the Nucleus Loop
    const r = radius * (1 + 0.22 * Math.sin(3 * u))
    const x = r * Math.cos(u)
    const y = r * Math.sin(u) * 0.88
    const z = 0.45 * radius * Math.sin(2 * u) * Math.cos(u)
    points.push(new THREE.Vector3(x, y, z))
  }
  const curve = new THREE.CatmullRomCurve3(points, true, 'centripetal')
  return new THREE.TubeGeometry(curve, 160, 0.055, 12, true)
}

function SystemRibbon({ rotationZ, tiltX, tiltY, color, roughness, metalness, radius }: RibbonProps) {
  const geom = useMemo(() => createParametricRibbon(radius), [radius])

  return (
    <group rotation={[tiltX, tiltY, rotationZ]}>
      <mesh geometry={geom}>
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          envMapIntensity={0.8}
        />
      </mesh>
    </group>
  )
}

/** Faceted Agent Computational Nodes */
function AgentNodes({ radius }: { radius: number }) {
  const nodesRef = useRef<THREE.Group>(null)

  // 6 discrete agent computing nodes along orbits
  const nodeOffsets = useMemo(() => [
    { u: 0.15, size: 0.075, color: '#C87D55' },
    { u: 0.45, size: 0.065, color: '#F1EFE8' },
    { u: 0.82, size: 0.07, color: '#C87D55' },
    { u: 1.25, size: 0.06, color: '#9AA19E' },
    { u: 1.68, size: 0.075, color: '#5BA87E' },
    { u: 2.15, size: 0.065, color: '#C87D55' },
  ], [])

  useFrame(({ clock }) => {
    if (!nodesRef.current) return
    const t = clock.getElapsedTime()
    nodesRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh
      mesh.rotation.x = t * (0.4 + i * 0.1)
      mesh.rotation.y = t * (0.5 - i * 0.08)
      // Subtle heartbeat pulse
      const pulse = 1 + Math.sin(t * 2.5 + i) * 0.12
      mesh.scale.setScalar(pulse)
    })
  })

  return (
    <group ref={nodesRef}>
      {nodeOffsets.map((node, i) => {
        const angle = (node.u * Math.PI * 2) / 2.5
        const r = radius * (1 + 0.2 * Math.sin(3 * angle))
        const x = r * Math.cos(angle)
        const y = r * Math.sin(angle) * 0.88
        const z = 0.4 * radius * Math.sin(2 * angle)

        return (
          <mesh key={i} position={[x, y, z]}>
            <octahedronGeometry args={[node.size, 0]} />
            <meshStandardMaterial
              color={node.color}
              metalness={0.7}
              roughness={0.25}
              emissive={node.color}
              emissiveIntensity={0.2}
            />
          </mesh>
        )
      })}
    </group>
  )
}

/** Traveling Data Photons between Autonomous Agents */
function DataPulses({ radius }: { radius: number }) {
  const count = 18
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const meshRef = useRef<THREE.InstancedMesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime() * 0.35

    for (let i = 0; i < count; i++) {
      const progress = (t + (i / count)) % 1
      const u = progress * Math.PI * 2
      const r = radius * (1 + 0.22 * Math.sin(3 * u))
      const x = r * Math.cos(u)
      const y = r * Math.sin(u) * 0.88
      const z = 0.45 * radius * Math.sin(2 * u) * Math.cos(u)

      dummy.position.set(x, y, z)
      const s = 0.022 * (1 + Math.sin(u * 4) * 0.4)
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#C87D55" transparent opacity={0.8} />
    </instancedMesh>
  )
}

/** Inner Local Kernel Core Ring */
function LocalKernelRing() {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const t = clock.getElapsedTime()
    ringRef.current.rotation.z = -t * 0.04
    ringRef.current.rotation.x = Math.sin(t * 0.05) * 0.1
  })

  return (
    <mesh ref={ringRef} rotation={[0.4, 0.2, 0]}>
      <torusGeometry args={[0.55, 0.015, 16, 80]} />
      <meshStandardMaterial
        color="#2A2D2C"
        roughness={0.7}
        metalness={0.4}
        wireframe={true}
      />
    </mesh>
  )
}

export function AgenticSystemCore() {
  const mainGroup = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!mainGroup.current) return
    const t = clock.getElapsedTime()

    // Smooth, deliberate dignified planetary rotation
    mainGroup.current.rotation.y = t * 0.055
    mainGroup.current.rotation.x = Math.sin(t * 0.02) * 0.06
    mainGroup.current.rotation.z = Math.cos(t * 0.018) * 0.04

    // Subtle breathing cycle (6 second period)
    const breath = 1 + Math.sin(t * (Math.PI / 3)) * 0.012
    mainGroup.current.scale.setScalar(breath)
  })

  return (
    <group ref={mainGroup} scale={1.25}>
      {/* 3 Interleaved Parametric Orbital Ribbons */}
      {/* Ribbon 1: Matte Charcoal Titanium */}
      <SystemRibbon
        rotationZ={0}
        tiltX={0.25}
        tiltY={0.1}
        radius={1.3}
        color="#1E2221"
        roughness={0.8}
        metalness={0.2}
      />

      {/* Ribbon 2: Dark Obsidian Slate */}
      <SystemRibbon
        rotationZ={Math.PI * 0.67}
        tiltX={-0.3}
        tiltY={-0.18}
        radius={1.28}
        color="#161819"
        roughness={0.85}
        metalness={0.15}
      />

      {/* Ribbon 3: Warm Copper Accent (The Spark of Sovereign Intelligence) */}
      <SystemRibbon
        rotationZ={Math.PI * 1.33}
        tiltX={0.15}
        tiltY={0.45}
        radius={1.24}
        color="#3E2412"
        roughness={0.48}
        metalness={0.52}
      />

      {/* Computational Agent Nodes */}
      <AgentNodes radius={1.28} />

      {/* Inter-Agent Data Transmission Stream */}
      <DataPulses radius={1.28} />

      {/* Sovereign Local Kernel Lattice */}
      <LocalKernelRing />
    </group>
  )
}
