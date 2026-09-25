'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface DiagramProps {
  isRevealed: boolean
}

// Privacy Diagram — data stays local, no cloud node
function PrivacyDiagram({ isRevealed }: DiagramProps) {
  return (
    <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Your Device (center) */}
      <rect x="85" y="55" width="50" height="50" rx="8"
        fill="#181B1A" stroke="#B87333" strokeWidth="1.5"
        strokeDasharray="220" strokeDashoffset={isRevealed ? 0 : 220}
        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
      <text x="110" y="80" textAnchor="middle" fill="#F1EFE8" fontSize="8" fontFamily="monospace" fontWeight="500">Your</text>
      <text x="110" y="94" textAnchor="middle" fill="#F1EFE8" fontSize="8" fontFamily="monospace" fontWeight="500">Device</text>

      {/* Local data nodes */}
      <circle cx="30" cy="50" r="16" fill="#181B1A" stroke="#3A3E3C" strokeWidth="1.2"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 0.3s' }} />
      <text x="30" y="53" textAnchor="middle" fill="#FAF8F5" fontSize="8" fontFamily="monospace" fontWeight="500">Files</text>

      <circle cx="30" cy="110" r="16" fill="#181B1A" stroke="#3A3E3C" strokeWidth="1.2"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 0.4s' }} />
      <text x="30" y="113" textAnchor="middle" fill="#FAF8F5" fontSize="8" fontFamily="monospace" fontWeight="500">Models</text>

      <circle cx="190" cy="80" r="16" fill="#181B1A" stroke="#3A3E3C" strokeWidth="1.2"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 0.35s' }} />
      <text x="190" y="83" textAnchor="middle" fill="#FAF8F5" fontSize="8" fontFamily="monospace" fontWeight="500">APIs</text>

      {/* Connection lines (local = copper) */}
      <line x1="46" y1="55" x2="85" y2="72" stroke="#E58B4E" strokeWidth="1.5" strokeLinecap="round"
        strokeDasharray="70" strokeDashoffset={isRevealed ? 0 : 70}
        style={{ transition: 'stroke-dashoffset 0.5s ease 0.5s' }} />
      <line x1="46" y1="105" x2="85" y2="88" stroke="#E58B4E" strokeWidth="1.5" strokeLinecap="round"
        strokeDasharray="70" strokeDashoffset={isRevealed ? 0 : 70}
        style={{ transition: 'stroke-dashoffset 0.5s ease 0.55s' }} />
      <line x1="135" y1="80" x2="174" y2="80" stroke="#E58B4E" strokeWidth="1.5" strokeLinecap="round"
        strokeDasharray="70" strokeDashoffset={isRevealed ? 0 : 70}
        style={{ transition: 'stroke-dashoffset 0.5s ease 0.6s' }} />

      {/* Cloud (crossed out) */}
      <ellipse cx="110" cy="18" rx="26" ry="14" fill="none" stroke="#A6B2AC" strokeWidth="1" strokeDasharray="4 3" />
      <text x="110" y="21" textAnchor="middle" fill="#C4CCC8" fontSize="8" fontFamily="monospace" fontWeight="500">Cloud</text>
      {/* X mark */}
      <line x1="92" y1="4" x2="128" y2="32" stroke="#E05D5D" strokeWidth="1.8" strokeLinecap="round"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.3s ease 0.7s' }} />
      <line x1="128" y1="4" x2="92" y2="32" stroke="#E05D5D" strokeWidth="1.8" strokeLinecap="round"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.3s ease 0.7s' }} />

      {/* Label */}
      <text x="110" y="150" textAnchor="middle" fill="#A6B2AC" fontSize="8" fontFamily="monospace" fontWeight="600" letterSpacing="1">ZERO CLOUD DEPENDENCY</text>
    </svg>
  )
}

// Ownership Diagram — file tree stays on device
function OwnershipDiagram({ isRevealed }: DiagramProps) {
  const lines = [
    { x1: 45, y1: 30, x2: 45, y2: 130, delay: '0.3s' },
    { x1: 45, y1: 50, x2: 70, y2: 50, delay: '0.4s' },
    { x1: 45, y1: 72, x2: 70, y2: 72, delay: '0.5s' },
    { x1: 45, y1: 94, x2: 70, y2: 94, delay: '0.6s' },
    { x1: 45, y1: 116, x2: 70, y2: 116, delay: '0.65s' },
    { x1: 70, y1: 72, x2: 70, y2: 116, delay: '0.55s' },
    { x1: 70, y1: 94, x2: 95, y2: 94, delay: '0.7s' },
  ]
  const labels = [
    { x: 78, y: 53, text: '/neomagnesis', color: '#E58B4E' },
    { x: 78, y: 75, text: '/workflows', color: '#FAF8F5' },
    { x: 103, y: 97, text: '/tasks', color: '#FAF8F5' },
    { x: 78, y: 119, text: '/models', color: '#FAF8F5' },
  ]

  return (
    <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Lock icon */}
      <rect x="94" y="122" width="32" height="24" rx="5" fill="#181B1A" stroke="#E58B4E" strokeWidth="1.5"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 0.8s' }} />
      <path d="M100 122 V116 C100 110 120 110 120 116 V122" stroke="#E58B4E" strokeWidth="1.5" strokeLinecap="round" fill="none"
        strokeDasharray="50" strokeDashoffset={isRevealed ? 0 : 50}
        style={{ transition: 'stroke-dashoffset 0.4s ease 0.85s' }} />
      <circle cx="110" cy="134" r="2.5" fill="#E58B4E"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.3s ease 0.9s' }} />

      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="#3A3E3C" strokeWidth="1.3" strokeLinecap="round"
          strokeDasharray="250" strokeDashoffset={isRevealed ? 0 : 250}
          style={{ transition: `stroke-dashoffset 0.5s ease ${l.delay}` }} />
      ))}

      {labels.map((lb, i) => (
        <text key={i} x={lb.x} y={lb.y} fill={lb.color} fontSize="8" fontFamily="monospace" fontWeight="500"
          opacity={isRevealed ? 1 : 0}
          style={{ transition: `opacity 0.4s ease ${0.45 + i * 0.08}s` }}>
          {lb.text}
        </text>
      ))}

      <text x="110" y="150" textAnchor="middle" fill="#A6B2AC" fontSize="8" fontFamily="monospace" fontWeight="600" letterSpacing="1">YOUR DATA, YOUR CONTROL</text>
    </svg>
  )
}

// Performance Diagram — local latency arc vs cloud round-trip
function PerformanceDiagram({ isRevealed }: DiagramProps) {
  return (
    <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Local arc (fast, copper) */}
      <path d="M 20 100 Q 70 15 110 100" stroke="#E58B4E" strokeWidth="2.5" strokeLinecap="round" fill="none"
        strokeDasharray="140" strokeDashoffset={isRevealed ? 0 : 140}
        style={{ transition: 'stroke-dashoffset 0.6s ease 0.3s' }} />
      <text x="70" y="44" textAnchor="middle" fill="#E58B4E" fontSize="9" fontFamily="monospace" fontWeight="600">Local</text>

      {/* Cloud arc (slow, muted) */}
      <path d="M 110 100 Q 185 -30 200 100" stroke="#3A3E3C" strokeWidth="1.8" strokeLinecap="round" fill="none"
        strokeDasharray="250" strokeDashoffset={isRevealed ? 0 : 250}
        style={{ transition: 'stroke-dashoffset 0.8s ease 0.5s' }} />
      <text x="160" y="28" textAnchor="middle" fill="#C4CCC8" fontSize="8" fontFamily="monospace" fontWeight="500">Cloud Round-trip</text>

      {/* Baseline */}
      <line x1="10" y1="100" x2="210" y2="100" stroke="#3A3E3C" strokeWidth="1" strokeDasharray="4 4"
        opacity={isRevealed ? 0.8 : 0}
        style={{ transition: 'opacity 0.4s ease 0.3s' }} />

      {/* Dots */}
      <circle cx="20" cy="100" r="3.5" fill="#E58B4E"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.3s ease 0.8s' }} />
      <circle cx="110" cy="100" r="3.5" fill="#FAF8F5"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.3s ease 0.85s' }} />
      <circle cx="200" cy="100" r="3.5" fill="#A6B2AC"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.3s ease 0.9s' }} />

      <text x="110" y="150" textAnchor="middle" fill="#A6B2AC" fontSize="8" fontFamily="monospace" fontWeight="600" letterSpacing="1">LATENCY COMPARISON</text>
    </svg>
  )
}

// Independence Diagram — works offline
function IndependenceDiagram({ isRevealed }: DiagramProps) {
  return (
    <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Device circle */}
      <circle cx="110" cy="70" r="42" fill="none" stroke="#E58B4E" strokeWidth="1.5"
        strokeDasharray="280" strokeDashoffset={isRevealed ? 0 : 280}
        style={{ transition: 'stroke-dashoffset 0.8s ease 0.3s' }} />

      {/* Inner device icon */}
      <rect x="90" y="55" width="40" height="30" rx="5" fill="#181B1A" stroke="#3A3E3C" strokeWidth="1.2"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 0.7s' }} />
      <line x1="90" y1="65" x2="130" y2="65" stroke="#3A3E3C" strokeWidth="1"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 0.75s' }} />

      {/* Signal bars (offline) */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={94 + i * 10} y={68 + (2 - i) * 4} width="6" height={5 + i * 4} rx="1"
          fill={i === 0 ? '#E58B4E' : '#3A3E3C'}
          opacity={isRevealed ? 1 : 0}
          style={{ transition: `opacity 0.3s ease ${0.8 + i * 0.06}s` }} />
      ))}

      {/* "OPERATING" label */}
      <text x="110" y="108" textAnchor="middle" fill="#E58B4E" fontSize="9" fontFamily="monospace" fontWeight="600" letterSpacing="2"
        opacity={isRevealed ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 1.0s' }}>
        OPERATING
      </text>

      <text x="110" y="150" textAnchor="middle" fill="#A6B2AC" fontSize="8" fontFamily="monospace" fontWeight="600" letterSpacing="1">WORKS WITHOUT INTERNET</text>
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
        style={{ background: '#111314', border: '1px solid #2A2E2C', minHeight: 180 }}
      >
        <Diagram isRevealed={isInView} />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-base font-medium text-[#FAF8F5] mb-2 tracking-[-0.01em]">
          {diagram.title}
        </h3>
        <p className="text-sm text-[#C8D0CC] leading-relaxed">
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
      className="relative py-16 lg:py-24 px-5 sm:px-8"
      style={{ borderTop: '1px solid #2A2D2C' }}
      aria-labelledby="why-local-first-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <motion.span
            className="mono-label block mb-5 text-[#A6B2AC]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            // Why Local-First
          </motion.span>
          <motion.h2
            id="why-local-first-heading"
            className="font-light text-[#FAF8F5] tracking-[-0.025em] leading-[1.1] mb-5"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Your intelligence.
            <br />
            <span className="text-[#C8D0CC]">Not theirs.</span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-[#C8D0CC] leading-relaxed"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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