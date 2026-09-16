'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Terminal, UserCheck, Briefcase, Code2, Lock } from 'lucide-react'

const useCases = [
  {
    id: 'researchers',
    audience: 'Researchers & Analysts',
    tag: 'Knowledge Sovereignty',
    icon: UserCheck,
    title: 'Private Synthesis of Sensitive Archives',
    description:
      'Analyze internal whitepapers, proprietary datasets, and confidential interview transcripts without uploading a single token to third-party model providers.',
    points: [
      'Zero external data egress',
      'Local citation cross-referencing',
      'Preserves original document formatting',
    ],
    highlight: 'Strict Local Scope',
  },
  {
    id: 'developers',
    audience: 'Engineers & Developers',
    tag: 'Local Automation',
    icon: Code2,
    title: 'Sandboxed Local Agent Pipelines',
    description:
      'Run multi-step refactoring passes, dependency updates, and automated test fixes directly within your local working tree, governed by strict execution boundaries.',
    points: [
      'AST-aware repository parsing',
      'Deterministic shell sandboxing',
      'Native Git patch generation',
    ],
    highlight: 'Permission-Gated',
  },
  {
    id: 'founders',
    audience: 'Founders & Operators',
    tag: 'Operational Leverage',
    icon: Briefcase,
    title: 'Offline Executive Intelligence',
    description:
      'Synthesize customer feedback, financial reports, and meeting summaries into structured action items on your desktop, even when working completely offline.',
    points: [
      'Full offline capability',
      'Deterministic document parsing',
      'No third-party subscription lock-in',
    ],
    highlight: 'Offline-First',
  },
  {
    id: 'organizations',
    audience: 'Security & Enterprise Teams',
    tag: 'Compliance Ready',
    icon: Lock,
    title: 'Auditable Local Agent Execution',
    description:
      'Deploy autonomous agents with complete transparency into step-by-step reasoning tokens, local file modifications, and auditable JSONL execution logs.',
    points: [
      'Immutable local logs',
      'No hidden telemetry',
      'Local-first architectural control',
    ],
    highlight: 'Verifiable Trails',
  },
]

export function UseCases() {
  return (
    <section id="use-cases" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2A2D2C]">
      {/* Header */}
      <div className="max-w-3xl mb-16 sm:mb-20">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9AA19E] mb-3 block">
          // Applied Deployments
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#F1EFE8] tracking-[-0.025em] leading-[1.12] mb-6">
          Architected for <br />
          <span className="font-normal text-[#F1EFE8]">high-leverage practitioners</span>.
        </h2>
        <p className="text-base sm:text-lg text-[#9AA19E] leading-relaxed font-normal">
          Neomagnesis is designed for individuals and teams who require uncompromising privacy,
          predictable execution, and deep local system leverage.
        </p>
      </div>

      {/* 4 Asymmetric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {useCases.map((uc, idx) => {
          const Icon = uc.icon
          return (
            <motion.div
              key={uc.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#111312] border border-[#2A2D2C] rounded-2xl p-7 sm:p-9 flex flex-col justify-between group hover:border-[#C87D55]/40 transition-colors duration-300 shadow-macos-panel"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#181B1A] border border-[#2A2D2C] flex items-center justify-center text-[#C87D55]">
                      <Icon size={15} />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-[#F1EFE8] block">{uc.audience}</span>
                      <span className="text-[10px] font-mono text-[#9AA19E] uppercase tracking-wider">{uc.tag}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#9AA19E] px-2.5 py-1 rounded border border-[#2A2D2C] bg-[#181B1A]">
                    {uc.highlight}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-light text-[#F1EFE8] mb-3 leading-snug group-hover:text-[#F1EFE8] transition-colors">
                  {uc.title}
                </h3>
                <p className="text-sm text-[#9AA19E] leading-relaxed mb-6">
                  {uc.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-[#2A2D2C]/70">
                  {uc.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-2 text-xs text-[#9AA19E]">
                      <div className="w-1 h-1 rounded-full bg-[#C87D55]" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#2A2D2C]/70 flex items-center justify-between text-xs font-mono text-[#9AA19E]">
                <span>Architecture Target</span>
                <span className="text-[#F1EFE8]">Local Agent Runtime</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
