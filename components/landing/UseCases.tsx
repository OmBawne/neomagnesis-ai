'use client'

import { motion } from 'framer-motion'
import { UserCheck, Code2, Briefcase, Lock } from 'lucide-react'

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

function UseCaseCard({ uc, idx }: { uc: typeof useCases[0]; idx: number }) {
  const Icon = uc.icon

  return (
    <motion.div
      key={uc.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="surface-card rounded-2xl p-7 sm:p-9 flex flex-col justify-between border border-[#2A2D2C] hover:border-[#E58B4E]/40 hover:-translate-y-1 transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.6)] group h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#181B1A] border border-[#2A2D2C] flex items-center justify-center text-[#FFAE70] group-hover:border-[#E58B4E]/40 transition-colors">
              <Icon size={18} />
            </div>
            <div>
              <span className="text-sm font-semibold text-[#FAF8F5] block">{uc.audience}</span>
              <span className="text-[10px] font-mono text-[#D4DDD8] uppercase tracking-wider font-medium">{uc.tag}</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#FAF8F5] px-3 py-1 rounded-full border border-[#2A2D2C] bg-[#181B1A] font-medium">
            {uc.highlight}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-light text-[#FAF8F5] mb-3 leading-snug group-hover:text-white transition-colors">
          {uc.title}
        </h3>
        <p className="text-sm sm:text-base text-[#D4DDD8] leading-relaxed mb-6 font-normal">
          {uc.description}
        </p>

        <div className="space-y-2.5 pt-5 border-t border-[#2A2D2C]/80">
          {uc.points.map((pt) => (
            <div key={pt} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FAF8F5]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E58B4E]" />
              <span>{pt}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-[#2A2D2C]/80 flex items-center justify-between text-xs font-mono text-[#D4DDD8]">
        <span>Architecture Target</span>
        <span className="text-[#FAF8F5] font-semibold">Local Agent Runtime</span>
      </div>
    </motion.div>
  )
}

export function UseCases() {
  return (
    <section id="use-cases" className="relative py-20 lg:py-28 px-5 sm:px-8 max-w-[1200px] mx-auto border-t border-[#2A2D2C]">
      {/* Header */}
      <div className="max-w-3xl mb-14 lg:mb-18">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E58B4E]" aria-hidden="true" />
          <span className="mono-label text-[#FAF8F5] font-medium">
            // Applied Deployments
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#FAF8F5] tracking-[-0.025em] leading-[1.12] mb-5">
          Architected for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#FFAE70] to-[#E58B4E] font-normal">
            high-leverage practitioners
          </span>.
        </h2>
        <p className="text-base sm:text-lg text-[#D4DDD8] leading-relaxed font-normal">
          Neomagnesis is designed for individuals and teams who require uncompromising privacy,
          predictable execution, and deep local system leverage.
        </p>
      </div>

      {/* 4 Standardized Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {useCases.map((uc, idx) => (
          <UseCaseCard key={uc.id} uc={uc} idx={idx} />
        ))}
      </div>
    </section>
  )
}