'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Briefcase } from 'lucide-react'

const roles = [
  { title: 'Senior Full-Stack Systems Engineer', type: 'Full-time · Remote', tags: ['Next.js', 'TypeScript', 'Distributed State'] },
  { title: 'AI & Runtime Systems Architect', type: 'Full-time · Remote', tags: ['Python', 'Agentic LLMs', 'Orchestration'] },
  { title: 'Product & Technical Growth Lead', type: 'Full-time · Remote', tags: ['Developer Tooling', 'Enterprise Growth', 'Content'] },
  { title: 'Senior Product Designer (UI/UX)', type: 'Full-time · Remote', tags: ['Design Systems', 'macOS Craft', 'Interface Engineering'] },
]

export default function Hiring() {
  return (
    <section id="hiring" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2A2D2C]">
      <div className="max-w-3xl mb-14">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9AA19E] mb-4 block">
          // Careers
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#F1EFE8] tracking-[-0.025em] leading-[1.12] mb-6">
          Build the operating system for <span className="font-normal text-[#F1EFE8]">autonomous work</span>.
        </h2>
        <p className="text-base sm:text-lg text-[#9AA19E] leading-relaxed font-normal">
          We are a focused team solving challenging problems in agentic reasoning, resilient workflow orchestration, and high-craft interfaces.
        </p>
      </div>

      <div className="space-y-3.5 mb-12">
        {roles.map((role, i) => (
          <motion.div
            key={role.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="bg-[#111312] rounded-xl p-5 sm:p-6 border border-[#2A2D2C] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-[#B87333]/40 hover:bg-[#181B1A]/50 transition-all duration-200 shadow-macos-panel"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-[#181B1A] border border-[#2A2D2C] flex items-center justify-center shrink-0">
                <Briefcase size={14} className="text-[#9AA19E]" />
              </div>
              <div>
                <p className="text-base font-normal text-[#F1EFE8]">{role.title}</p>
                <p className="text-xs text-[#9AA19E] font-mono mt-0.5">{role.type}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-wrap gap-1.5">
                {role.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-[#9AA19E] bg-[#181B1A] border border-[#2A2D2C] px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ArrowUpRight size={15} className="text-[#9AA19E] group-hover:text-[#F1EFE8] transition-colors ml-2 hidden sm:block" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl bg-[#111312] border border-[#2A2D2C]">
        <p className="text-xs sm:text-sm text-[#9AA19E] font-mono">
          Looking for custom opportunities? We always welcome exceptional engineering &amp; design talent.
        </p>
        <a
          href="mailto:neomagnesisai@gmail.com?subject=Job Application — Neomagnesis AI"
          className="btn-ghost text-xs shrink-0"
        >
          Send Your Resume
          <ArrowUpRight size={13} />
        </a>
      </div>
    </section>
  )
}

