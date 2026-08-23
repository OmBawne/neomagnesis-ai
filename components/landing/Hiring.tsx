'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Briefcase } from 'lucide-react'

const roles = [
  { title: 'Senior Full-Stack Engineer', type: 'Full-time · Remote', tags: ['Next.js', 'TypeScript', 'Supabase'] },
  { title: 'AI & Systems Engineer', type: 'Full-time · Remote', tags: ['Python', 'Agentic LLMs', 'Orchestration'] },
  { title: 'Product & Growth Lead', type: 'Full-time · Remote', tags: ['Developer Tooling', 'Enterprise Growth', 'Content'] },
  { title: 'Product Designer (UI/UX)', type: 'Full-time · Remote', tags: ['Design Systems', 'Motion', 'Interface Craft'] },
]

export default function Hiring() {
  return (
    <section id="hiring" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(143,150,147,0.12)]">
      <div className="max-w-3xl mb-14">
        <span className="text-xs uppercase tracking-[0.2em] text-[#8F9693] font-medium mb-4 block font-mono">
          // Careers
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-ink-ivory tracking-tight leading-[1.15] mb-6">
          Build the operating system for <span className="font-normal text-white">autonomous work</span>.
        </h2>
        <p className="text-base sm:text-lg text-[#8F9693] leading-relaxed font-normal">
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
            className="bg-[#111312] rounded-xl p-5 sm:p-6 border border-[rgba(143,150,147,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-[rgba(143,150,147,0.28)] transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-[#181B1A] border border-[rgba(143,150,147,0.15)] flex items-center justify-center shrink-0">
                <Briefcase size={14} className="text-[#8F9693]" />
              </div>
              <div>
                <p className="text-base font-normal text-[#F1EFE8]">{role.title}</p>
                <p className="text-xs text-[#8F9693] font-mono mt-0.5">{role.type}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-wrap gap-1.5">
                {role.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-[#8F9693] bg-[#181B1A] border border-[rgba(143,150,147,0.1)] px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ArrowUpRight size={15} className="text-[#8F9693] group-hover:text-[#F1EFE8] transition-colors ml-2 hidden sm:block" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl bg-[#111312] border border-[rgba(143,150,147,0.1)]">
        <p className="text-xs sm:text-sm text-[#8F9693] font-mono">
          Looking for custom opportunities? We always welcome exceptional engineering &amp; design talent.
        </p>
        <a
          href="mailto:neomagnesisai@gmail.com?subject=Job Application — Neomagnesis AI"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium font-mono transition-all duration-200 cursor-pointer bg-[#181B1A] text-[#F1EFE8] border border-[rgba(143,150,147,0.22)] hover:border-[rgba(143,150,147,0.4)] shrink-0"
        >
          Send Your Resume
          <ArrowUpRight size={13} />
        </a>
      </div>
    </section>
  )
}
