'use client'

import { motion } from 'framer-motion'
import { Check, Clock, Radio, ArrowUpRight } from 'lucide-react'

interface Milestone {
  id: string
  phase: string
  title: string
  description: string
  deliverables: string[]
  status: 'completed' | 'in-progress' | 'upcoming'
}

const milestones: Milestone[] = [
  {
    id: 'm1',
    phase: 'Phase 01',
    title: 'Brand Launch & System Architecture',
    description:
      'Foundational brand identity, Nucleus Loop design system, architectural doctrine, and local-first execution specifications.',
    deliverables: [
      'Ink Wash visual language & design tokens',
      'Local-first air-gapped runtime specifications',
      'Cryptographic execution boundaries research',
    ],
    status: 'completed',
  },
  {
    id: 'm2',
    phase: 'Phase 02',
    title: 'Early Access & Founding Cohort Onboarding',
    description:
      'Opening private registration, generating verified Launch Passes, and gathering feedback from selected security and AI engineers.',
    deliverables: [
      'Public Early Access portal with verified Launch Passes',
      'Core community channel for founding members',
      'Hardware benchmarking matrix for local LLMs',
    ],
    status: 'in-progress',
  },
  {
    id: 'm3',
    phase: 'Phase 03',
    title: 'Private Alpha Runtime Engine',
    description:
      'First deployment of the isolated local agent execution environment, supporting local LLMs and offline document indexing.',
    deliverables: [
      'Local context engine with zero cloud egress',
      'Deterministic permission boundary verification',
      'CLI toolchain for local workflow triggers',
    ],
    status: 'upcoming',
  },
  {
    id: 'm4',
    phase: 'Phase 04',
    title: 'Visual Workflow Canvas & Node Orchestrator',
    description:
      'Intuitive node-based canvas for constructing, testing, and monitoring complex multi-agent execution graphs.',
    deliverables: [
      'Interactive visual graph editor for local pipelines',
      'Step-by-step reasoning inspector & JSONL audit trail',
      'Custom skill & plugin loader interface',
    ],
    status: 'upcoming',
  },
  {
    id: 'm5',
    phase: 'Phase 05',
    title: 'Native Tauri Desktop Application Release',
    description:
      'Full production desktop operating system shell built with Rust and Tauri, featuring native hardware acceleration and deep OS hooks.',
    deliverables: [
      'Cross-platform desktop binaries (macOS, Windows, Linux)',
      'Sub-millisecond filesystem event watchers',
      'Offline-first encrypted vault storage',
    ],
    status: 'upcoming',
  },
]

export function RoadmapSection() {
  return (
    <section id="roadmap" className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto border-t border-[#2A2D2C]">
      {/* Header */}
      <div className="max-w-3xl mb-14 lg:mb-18">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#A6B2AC] mb-3 block font-medium">
          // Product Evolution
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#FAF8F5] tracking-[-0.025em] leading-[1.12] mb-6">
          Architectural roadmap. <br />
          <span className="font-normal text-[#FAF8F5]">Milestones without speculation.</span>
        </h2>
        <p className="text-base sm:text-lg text-[#C8D0CC] leading-relaxed font-normal">
          We do not publish artificial calendar deadlines. We advance through strict technical milestones,
          releasing each capability only when it satisfies our standards for privacy, stability, and craft.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l border-[#2A2D2C] ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10">
        {milestones.map((m, idx) => {
          const isCompleted = m.status === 'completed'
          const isInProgress = m.status === 'in-progress'

          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Timeline Marker Node */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isInProgress
                    ? 'bg-[#080909] border-[#E58B4E] shadow-[0_0_12px_rgba(229,139,78,0.4)]'
                    : isCompleted
                    ? 'bg-[#181B1A] border-[#7FA692] text-[#7FA692]'
                    : 'bg-[#111312] border-[#2A2D2C] text-[#A6B2AC]'
                }`}
              >
                {isInProgress ? (
                  <span className="w-2 h-2 rounded-full bg-[#E58B4E] animate-pulse" />
                ) : isCompleted ? (
                  <Check size={12} className="text-[#7FA692]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3A3E3C]" />
                )}
              </div>

              {/* Milestone Card */}
              <div
                className={`rounded-2xl p-6 sm:p-8 border transition-all duration-300 ${
                  isInProgress
                    ? 'bg-[#121413] border-[#E58B4E]/50 shadow-[0_0_30px_rgba(229,139,78,0.06)]'
                    : 'bg-[#111312] border-[#2A2D2C] hover:border-[#A6B2AC]/40'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#A6B2AC] font-medium">
                      {m.phase}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                        isInProgress
                          ? 'bg-[#E58B4E]/15 border-[#E58B4E]/60 text-[#E58B4E] font-medium'
                          : isCompleted
                          ? 'bg-[#5B7065]/20 border-[#7FA692]/60 text-[#7FA692] font-medium'
                          : 'bg-[#181B1A] border-[#2A2D2C] text-[#A6B2AC]'
                      }`}
                    >
                      {isInProgress ? 'In Progress' : isCompleted ? 'Completed' : 'Upcoming'}
                    </span>
                  </div>
                  {isInProgress && (
                    <span className="text-xs font-mono text-[#E58B4E] font-medium flex items-center gap-1.5">
                      <Radio size={13} className="animate-pulse" />
                      Active Focus
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-light text-[#FAF8F5] mb-3">
                  {m.title}
                </h3>
                <p className="text-sm text-[#C8D0CC] leading-relaxed mb-6 max-w-3xl">
                  {m.description}
                </p>

                <div className="pt-4 border-t border-[#2A2D2C]/60">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#A6B2AC] mb-2.5 font-medium">
                    Core Deliverables
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {m.deliverables.map((item) => (
                      <div
                        key={item}
                        className="text-xs font-mono text-[#FAF8F5] bg-[#181B1A] border border-[#2A2D2C] px-3 py-2 rounded-lg flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#E58B4E] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}