'use client'

import { motion } from 'framer-motion'
import { Check, Radio } from 'lucide-react'

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
    <section id="roadmap" className="relative py-20 lg:py-28 px-5 sm:px-8 max-w-[1200px] mx-auto border-t border-[#2A2D2C]">
      {/* Header */}
      <div className="max-w-3xl mb-14 lg:mb-18">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E58B4E]" aria-hidden="true" />
          <span className="mono-label text-[#FAF8F5] font-medium">
            // Product Evolution
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#FAF8F5] tracking-[-0.025em] leading-[1.12] mb-5">
          Architectural roadmap. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#FFAE70] to-[#E58B4E] font-normal">
            Milestones without speculation.
          </span>
        </h2>
        <p className="text-base sm:text-lg text-[#D4DDD8] leading-relaxed font-normal">
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
              {/* Timeline Marker Node (centered exactly on border-l: 24px/40px pl + 12px half + 1px border = 37px/53px) */}
              <div
                className={`absolute -left-[37px] sm:-left-[53px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isInProgress
                    ? 'bg-[#080909] border-[#E58B4E] shadow-[0_0_14px_rgba(229,139,78,0.5)]'
                    : isCompleted
                    ? 'bg-[#181B1A] border-[#7FA692] text-[#7FA692]'
                    : 'bg-[#111312] border-[#2A2D2C] text-[#A6B2AC]'
                }`}
              >
                {isInProgress ? (
                  <span className="w-2 h-2 rounded-full bg-[#FFAE70] animate-pulse" />
                ) : isCompleted ? (
                  <Check size={12} className="text-[#7FA692]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#484E4B]" />
                )}
              </div>

              {/* Milestone Card */}
              <div
                className={`surface-card rounded-2xl p-6 sm:p-8 border transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] ${
                  isInProgress
                    ? 'bg-[#131615] border-[#E58B4E]/60 shadow-[0_0_35px_rgba(229,139,78,0.08)]'
                    : 'bg-[#111312] border-[#2A2D2C] hover:border-[#E58B4E]/40'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#FAF8F5] font-semibold">
                      {m.phase}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                        isInProgress
                          ? 'bg-[#E58B4E]/20 border-[#E58B4E]/60 text-[#FFAE70] font-semibold'
                          : isCompleted
                          ? 'bg-[#5B7065]/20 border-[#7FA692]/60 text-[#7FA692] font-semibold'
                          : 'bg-[#181B1A] border-[#2A2D2C] text-[#D4DDD8] font-medium'
                      }`}
                    >
                      {isInProgress ? 'In Progress' : isCompleted ? 'Completed' : 'Upcoming'}
                    </span>
                  </div>
                  {isInProgress && (
                    <span className="text-xs font-mono text-[#FFAE70] font-semibold flex items-center gap-1.5">
                      <Radio size={13} className="animate-pulse" />
                      Active Focus
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-light text-[#FAF8F5] mb-3">
                  {m.title}
                </h3>
                <p className="text-sm sm:text-base text-[#D4DDD8] leading-relaxed mb-6 max-w-3xl font-normal">
                  {m.description}
                </p>

                <div className="pt-5 border-t border-[#2A2D2C]/80">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#FAF8F5] mb-3 font-semibold">
                    Core Deliverables
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {m.deliverables.map((item) => (
                      <div
                        key={item}
                        className="text-xs font-mono text-[#FAF8F5] bg-[#181B1A] border border-[#2A2D2C] px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 hover:border-[#E58B4E]/40 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E58B4E] shrink-0" />
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