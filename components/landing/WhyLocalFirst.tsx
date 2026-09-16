'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface DiagramProps {
  isRevealed: boolean
}

// Privacy Diagram — data stays local, no cloud node
function PrivacyDiagram({ isRevealed }: DiagramProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Your Device (center) */}
      <rect x="70" y="50" width="60" height="40" rx="6"
        fill="#181B1A" stroke="#B87333" strokeWidth="1.5"
        strokeDasharray="200" strokeDashoffset={isRevealed ? 0 : 200}
        style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(0.16,1,0.3,1)' }} />
      <text x="100" y="66" textAnchor="middle" fill="#F1EFE8" fontSize="8" fontFamily="monospace">Your</text>
      <text x="100" y="79" textAnchor="middle" fill="#F1EFE8" fontSize="8" fontFamily="monospace">Device</text>

      {/* Local data arcs */}
      <circle cx="30" cy="50" r="14" fill="#111312" stroke="#2A2D2C" strokeWidth="1.2"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 0.3s' }} />
      <text x="30" y="54" textAnchor="middle" fill="#9AA19E" fontSize="6.5" fontFamily="monospace">Files</text>

      <circle cx="30" cy="90" r="14" fill="#111312" stroke="#2A2D2C" strokeWidth="1.2"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 0.4s' }} />
      <text x="30" y="94" textAnchor="middle" fill="#9AA19E" fontSize="6.5" fontFamily="monospace">Models</text>

      <circle cx="170" cy="70" r="14" fill="#111312" stroke="#2A2D2C" strokeWidth="1.2"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 0.35s' }} />
      <text x="170" y="74" textAnchor="middle" fill="#9AA19E" fontSize="6.5" fontFamily="monospace">APIs</text>

      {/* Connection lines (local = copper) */}
      <line x1="44" y1="53" x2="70" y2="62" stroke="#B87333" strokeWidth="1.2" strokeLinecap="round"
        strokeDasharray="60" strokeDashoffset={isRevealed ? 0 : 60}
        style={{ transition: 'stroke-dashoffset 0.5s ease 0.5s' }} />
      <line x1="44" y1="87" x2="70" y2="78" stroke="#B87333" strokeWidth="1.2" strokeLinecap="round"
        strokeDasharray="60" strokeDashoffset={isRevealed ? 0 : 60}
        style={{ transition: 'stroke-dashoffset 0.5s ease 0.55s' }} />
      <line x1="130" y1="70" x2="156" y2="70" stroke="#B87333" strokeWidth="1.2" strokeLinecap="round"
        strokeDasharray="60" strokeDashoffset={isRevealed ? 0 : 60}
        style={{ transition: 'stroke-dashoffset 0.5s ease 0.6s' }} />

      {/* Cloud (crossed out) */}
      <ellipse cx="100" cy="18" rx="22" ry="12" fill="none" stroke="#626A66" strokeWidth="1" strokeDasharray="4 3" />
      <text x="100" y="21" textAnchor="middle" fill="#626A66" fontSize="6.5" fontFamily="monospace">Cloud</text>
      {/* X mark */}
      <line x1="85" y1="8" x2="115" y2="28" stroke="#A84B4B" strokeWidth="1.5" strokeLinecap="round"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.3s ease 0.7s' }} />
      <line x1="115" y1="8" x2="85" y2="28" stroke="#A84B4B" strokeWidth="1.5" strokeLinecap="round"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.3s ease 0.7s' }} />

      {/* Label */}
      <text x="100" y="132" textAnchor="middle" fill="#626A66" fontSize="7" fontFamily="monospace" letterSpacing="1">ZERO CLOUD DEPENDENCY</text>
    </svg>
  )
}

// Ownership Diagram — file tree stays on device
function OwnershipDiagram({ isRevealed }: DiagramProps) {
  const lines = [
    { x1: 40, y1: 30, x2: 40, y2: 110, delay: '0.3s' },
    { x1: 40, y1: 45, x2: 60, y2: 45, delay: '0.4s' },
    { x1: 40, y1: 62, x2: 60, y2: 62, delay: '0.5s' },
    { x1: 40, y1: 79, x2: 60, y2: 79, delay: '0.6s' },
    { x1: 40, y1: 96, x2: 60, y2: 96, delay: '0.65s' },
    { x1: 60, y1: 62, x2: 60, y2: 96, delay: '0.55s' },
    { x1: 60, y1: 79, x2: 80, y2: 79, delay: '0.7s' },
  ]
  const labels = [
    { x: 68, y: 48, text: '/neomagnesis', color: '#B87333' },
    { x: 68, y: 65, text: '/workflows', color: '#9AA19E' },
    { x: 88, y: 82, text: '/tasks', color: '#9AA19E' },
    { x: 68, y: 99, text: '/models', color: '#9AA19E' },
  ]

  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Lock icon */}
      <rect x="86" y="108" width="28" height="20" rx="4" fill="#181B1A" stroke="#B87333" strokeWidth="1.2"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 0.8s' }} />
      <path d="M92 108 V104 C92 100 108 100 108 104 V108" stroke="#B87333" strokeWidth="1.2" strokeLinecap="round" fill="none"
        strokeDasharray="40" strokeDashoffset={isRevealed ? 0 : 40}
        style={{ transition: 'stroke-dashoffset 0.4s ease 0.85s' }} />
      <circle cx="100" cy="118" r="2" fill="#B87333"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.3s ease 0.9s' }} />

      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="#2A2D2C" strokeWidth="1.2" strokeLinecap="round"
          strokeDasharray="200" strokeDashoffset={isRevealed ? 0 : 200}
          style={{ transition: `stroke-dashoffset 0.5s ease ${l.delay}` }} />
      ))}

      {labels.map((lb, i) => (
        <text key={i} x={lb.x} y={lb.y} fill={lb.color} fontSize="7.5" fontFamily="monospace"
          opacity={isRevealed ? 1 : 0}
          style={{ transition: `opacity 0.4s ease ${0.45 + i * 0.08}s` }}>
          {lb.text}
        </text>
      ))}

      <text x="100" y="132" textAnchor="middle" fill="#626A66" fontSize="7" fontFamily="monospace" letterSpacing="1">YOUR DATA, YOUR CONTROL</text>
    </svg>
  )
}

// Performance Diagram — local latency arc vs cloud round-trip
function PerformanceDiagram({ isRevealed }: DiagramProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Local arc (fast, copper) */}
      <path d="M 20 90 Q 60 20 100 90" stroke="#B87333" strokeWidth="2" strokeLinecap="round" fill="none"
        strokeDasharray="120" strokeDashoffset={isRevealed ? 0 : 120}
        style={{ transition: 'stroke-dashoffset 0.6s ease 0.3s' }} />
      <text x="55" y="38" fill="#B87333" fontSize="7" fontFamily="monospace">Local</text>
      <text x="52" y="48" fill="#626A66" fontSize="6.5" fontFamily="monospace">~12ms</text>

      {/* Cloud arc (slow, muted) */}
      <path d="M 100 90 Q 160 -20 180 90" stroke="#2A2D2C" strokeWidth="1.5" strokeLinecap="round" fill="none"
        strokeDasharray="200" strokeDashoffset={isRevealed ? 0 : 200}
        style={{ transition: 'stroke-dashoffset 0.8s ease 0.5s' }} />
      <text x="148" y="25" fill="#626A66" fontSize="7" fontFamily="monospace">Cloud</text>
      <text x="144" y="35" fill="#626A66" fontSize="6.5" fontFamily="monospace">~340ms</text>

      {/* Baseline */}
      <line x1="10" y1="90" x2="190" y2="90" stroke="#2A2D2C" strokeWidth="1" strokeDasharray="4 4"
        opacity={isRevealed ? 0.8 : 0}
        style={{ transition: 'opacity 0.4s ease 0.3s' }} />

      {/* Dots */}
      <circle cx="20" cy="90" r="3" fill="#B87333"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.3s ease 0.8s' }} />
      <circle cx="100" cy="90" r="3" fill="#9AA19E"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.3s ease 0.85s' }} />
      <circle cx="180" cy="90" r="3" fill="#626A66"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.3s ease 0.9s' }} />

      <text x="100" y="132" textAnchor="middle" fill="#626A66" fontSize="7" fontFamily="monospace" letterSpacing="1">LATENCY COMPARISON</text>
    </svg>
  )
}

// Independence Diagram — works offline
function IndependenceDiagram({ isRevealed }: DiagramProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Device circle */}
      <circle cx="100" cy="65" r="38" fill="none" stroke="#B87333" strokeWidth="1.5"
        strokeDasharray="240" strokeDashoffset={isRevealed ? 0 : 240}
        style={{ transition: 'stroke-dashoffset 0.8s ease 0.3s' }} />

      {/* Inner icon */}
      <rect x="84" y="52" width="32" height="26" rx="4" fill="#181B1A" stroke="#2A2D2C" strokeWidth="1.2"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 0.7s' }} />
      <line x1="84" y1="60" x2="116" y2="60" stroke="#2A2D2C" strokeWidth="1"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 0.75s' }} />

      {/* Signal bars (offline) — grey */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={88 + i * 8} y={64 + (2 - i) * 3} width="5" height={4 + i * 3} rx="1"
          fill={i === 0 ? '#B87333' : '#2A2D2C'}
          opacity={isRevealed ? 1 : 0}
          style={{ transition: `opacity 0.3s ease ${0.8 + i * 0.06}s` }} />
      ))}

      {/* "OFFLINE" label */}
      <text x="100" y="100" textAnchor="middle" fill="#B87333" fontSize="7.5" fontFamily="monospace" letterSpacing="2"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 1.0s' }}>
        OPERATING
      </text>

      <text x="100" y="132" textAnchor="middle" fill="#626A66" fontSize="7" fontFamily="monospace" letterSpacing="1">WORKS WITHOUT INTERNET</text>
    </svg>
  )
}

const diagrams = [
  { id: 'privacy',       title: 'Private by Architecture',    desc: 'No data ever leaves your machine. Your conversations, files, and models stay local.', Diagram: PrivacyDiagram },
  { id: 'ownership',     title: 'You Own Everything',         desc: 'Your workflows, your agents, your data. No vendor lock-in, no hidden data sharing.', Diagram: OwnershipDiagram },
  { id: 'performance',   title: 'Local Speed, Globally Fast', desc: 'Run models directly on your hardware. Response times measured in milliseconds, not seconds.', Diagram: PerformanceDiagram },
  { id: 'independence',  title: 'Works Without Internet',     desc: 'Critical workflows keep running even when your connection drops. Resilience is designed in.', Diagram: IndependenceDiagram },
]

function DiagramCard({ diagram }: { diagram: typeof diagrams[0] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const { Diagram } = diagram

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="surface-card p-7 flex flex-col gap-6"
    >
      {/* Blueprint diagram */}
      <div
        className="rounded-xl p-5 flex items-center justify-center"
        style={{ background: '#111312', border: '1px solid #2A2D2C', minHeight: 160 }}
      >
        <Diagram isRevealed={isInView} />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-base font-medium text-[#F1EFE8] mb-2 tracking-[-0.01em]">
          {diagram.title}
        </h3>
        <p className="text-sm text-[#9AA19E] leading-relaxed">
          {diagram.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function WhyLocalFirst() {
  return (
    <section
      id="why-local-first"
      className="py-24 lg:py-32 px-5 sm:px-8"
      style={{ borderTop: '1px solid #2A2D2C' }}
      aria-labelledby="why-local-first-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <motion.span
            className="mono-label block mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            // Why Local-First
          </motion.span>
          <motion.h2
            id="why-local-first-heading"
            className="font-light text-[#F1EFE8] tracking-[-0.025em] leading-[1.1] mb-5"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Your intelligence.
            <br />
            <span className="text-[#9AA19E]">Not theirs.</span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-[#9AA19E] leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Local-first is not a compromise. It is a deliberate choice to give you privacy,
            speed, and sovereignty that cloud-dependent systems cannot provide.
          </motion.p>
        </div>

        {/* Blueprint diagram grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {diagrams.map((diagram, i) => (
            <motion.div
              key={diagram.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              <DiagramCard diagram={diagram} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
