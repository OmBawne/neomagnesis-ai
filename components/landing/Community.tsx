'use client'

import { motion } from 'framer-motion'
import { Users, Star, ArrowUpRight } from 'lucide-react'

export default function Community() {
  return (
    <section id="community" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2A2D2C]">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#111312] border border-[#2A2D2C] rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-macos-window"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#9AA19E] font-medium mb-4 block font-mono">
              // Community &amp; Knowledge
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#F1EFE8] tracking-[-0.025em] leading-[1.12] mb-6">
              Connect with thousands of <br />
              <span className="font-normal text-[#F1EFE8]">operators and builders</span>.
            </h2>
            <p className="text-base sm:text-lg text-[#9AA19E] leading-relaxed font-normal mb-8 max-w-xl">
              Exchange production workflow templates, learn cutting-edge agentic prompt patterns, and participate in direct office hours with our core engineering team.
            </p>

            {/* Metrics badges */}
            <div className="flex flex-wrap gap-4 mb-10 text-xs font-mono">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181B1A] border border-[#2A2D2C] text-[#F1EFE8]">
                <Users size={13} className="text-[#9AA19E]" />
                <span>2,400+ Active Builders</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181B1A] border border-[#2A2D2C] text-[#F1EFE8]">
                <Star size={13} className="text-[#9AA19E]" />
                <span>Curated Template Library</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://discord.gg/neomagnesis"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Join Discord Server
                <ArrowUpRight size={14} className="text-[#9AA19E]" />
              </a>
              <a
                href="https://instagram.com/neomagnesis.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Follow on Instagram
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Restrained Info Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#181B1A] border border-[#2A2D2C] rounded-xl p-6 sm:p-8 font-mono text-xs text-[#9AA19E] space-y-4">
            <div className="text-[11px] uppercase tracking-wider text-[#F1EFE8] border-b border-[#2A2D2C] pb-3">
              Community Highlights
            </div>
            <div className="space-y-3 text-[#F1EFE8]">
              <div className="p-3.5 rounded bg-[#111312] border border-[#2A2D2C]">
                <div className="text-[11px] text-[#9AA19E] mb-1">#workflow-showcase</div>
                <div className="text-xs font-sans text-[#F1EFE8]">Community templates shared weekly across YouTube, Discord, &amp; CRM pipelines.</div>
              </div>
              <div className="p-3.5 rounded bg-[#111312] border border-[#2A2D2C]">
                <div className="text-[11px] text-[#9AA19E] mb-1">#engineering-briefs</div>
                <div className="text-xs font-sans text-[#F1EFE8]">Deep dives on agentic loops, state persistence, and deterministic orchestration.</div>
              </div>
            </div>
            <div className="pt-2 text-[11px] text-[#626A66]">
              // Open to all creators, engineers, and automation architects.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

