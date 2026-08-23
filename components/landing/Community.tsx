'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Users, Star, ArrowUpRight } from 'lucide-react'

export default function Community() {
  return (
    <section id="community" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(143,150,147,0.12)]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#111312] border border-[rgba(143,150,147,0.16)] rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8F9693] font-medium mb-4 block font-mono">
              // Community &amp; Knowledge
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-ink-ivory tracking-tight leading-[1.15] mb-6">
              Connect with thousands of <br />
              <span className="font-normal text-white">operators and builders</span>.
            </h2>
            <p className="text-base sm:text-lg text-[#8F9693] leading-relaxed font-normal mb-8 max-w-xl">
              Exchange production workflow templates, learn cutting-edge agentic prompt patterns, and participate in direct office hours with our core engineering team.
            </p>

            {/* Metrics badges */}
            <div className="flex flex-wrap gap-4 mb-10 text-xs font-mono">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181B1A] border border-[rgba(143,150,147,0.14)] text-[#D8D6CF]">
                <Users size={13} className="text-[#8F9693]" />
                <span>2,400+ Active Builders</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181B1A] border border-[rgba(143,150,147,0.14)] text-[#D8D6CF]">
                <Star size={13} className="text-[#8F9693]" />
                <span>Curated Template Library</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://discord.gg/neomagnesis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer bg-[#F1EFE8] text-[#080909] hover:opacity-90"
              >
                Join Discord Server
                <ArrowUpRight size={15} />
              </a>
              <a
                href="https://instagram.com/neomagnesis.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer bg-[#181B1A] text-[#F1EFE8] border border-[rgba(143,150,147,0.22)] hover:border-[rgba(143,150,147,0.4)]"
              >
                Follow on Instagram
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: Restrained Info Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#181B1A] border border-[rgba(143,150,147,0.12)] rounded-xl p-6 sm:p-8 font-mono text-xs text-[#8F9693] space-y-4">
            <div className="text-[11px] uppercase tracking-wider text-[#D8D6CF] border-b border-[rgba(143,150,147,0.1)] pb-3">
              Community Highlights
            </div>
            <div className="space-y-3 text-[#D8D6CF]">
              <div className="p-3 rounded bg-[#111312] border border-[rgba(143,150,147,0.08)]">
                <div className="text-[11px] text-[#8F9693] mb-1">#workflow-showcase</div>
                <div>Community templates shared weekly across YouTube, Discord, &amp; CRM pipelines.</div>
              </div>
              <div className="p-3 rounded bg-[#111312] border border-[rgba(143,150,147,0.08)]">
                <div className="text-[11px] text-[#8F9693] mb-1">#engineering-briefs</div>
                <div>Deep dives on agentic loops, state persistence, and deterministic orchestration.</div>
              </div>
            </div>
            <div className="pt-2 text-[11px] text-[#8F9693]">
              // Open to all creators, engineers, and automation architects.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
