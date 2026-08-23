'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Youtube, Users, MessageSquare, Briefcase, Check } from 'lucide-react'

export default function UseCases() {
  return (
    <section id="use-cases" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(143,150,147,0.12)]">
      {/* Header */}
      <div className="max-w-3xl mb-16 sm:mb-20">
        <span className="text-xs uppercase tracking-[0.2em] text-[#8F9693] font-medium mb-4 block">
          Applied Deployments
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-ink-ivory tracking-tight leading-[1.15] mb-6">
          Architected for high-leverage <span className="font-normal text-white">operations</span>.
        </h2>
        <p className="text-base sm:text-lg text-[#8F9693] leading-relaxed font-normal">
          From creator automation at massive scale to mission-critical business data pipelines, Neomagnesis delivers dependable results without manual oversight.
        </p>
      </div>

      {/* Editorial Asymmetrical Layout: Block 1 (Large 8 col + Side 4 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Large Media Automation Showcase (8 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 bg-[#111312] border border-[rgba(143,150,147,0.14)] rounded-2xl p-8 sm:p-10 flex flex-col justify-between hover:border-[rgba(143,150,147,0.26)] transition-colors duration-300"
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono tracking-wider uppercase text-[#8F9693] px-2.5 py-1 rounded border border-[rgba(143,150,147,0.15)] bg-[#181B1A]">
                Media &amp; Publishing
              </span>
              <span className="text-xs font-mono text-[#8F9693]">End-to-End Pipeline</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-light text-[#F1EFE8] mb-4 leading-snug">
              YouTube &amp; Short-Form Content Engine
            </h3>
            <p className="text-sm sm:text-base text-[#8F9693] leading-relaxed max-w-2xl mb-8">
              Transform raw source recordings or scripts into scheduled video uploads. The system writes retention-optimized copy, formats thumbnails, tags chapters, and auto-publishes cross-platform.
            </p>

            {/* Stepped Workflow Pipeline Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-lg bg-[#181B1A] border border-[rgba(143,150,147,0.1)]">
                <div className="text-[#8F9693] mb-1">01. Transcription</div>
                <div className="text-[#D8D6CF]">Whisper hook extraction</div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#181B1A] border border-[rgba(143,150,147,0.1)]">
                <div className="text-[#8F9693] mb-1">02. Hook Synthesis</div>
                <div className="text-[#D8D6CF]">Context-aware viral titles</div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#181B1A] border border-[rgba(143,150,147,0.1)]">
                <div className="text-[#8F9693] mb-1">03. Automated Schedule</div>
                <div className="text-[#D8D6CF]">Timezone-optimized publish</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(143,150,147,0.1)] flex items-center justify-between text-xs font-mono text-[#8F9693]">
            <span>Average creator time saved: 14 hrs/week</span>
            <span className="text-[#F1EFE8]">Zero Rendering Glitches</span>
          </div>
        </motion.div>

        {/* Lead Intelligence Block (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-4 bg-[#111312] border border-[rgba(143,150,147,0.14)] rounded-2xl p-8 sm:p-10 flex flex-col justify-between hover:border-[rgba(143,150,147,0.26)] transition-colors duration-300"
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono tracking-wider uppercase text-[#8F9693] px-2.5 py-1 rounded border border-[rgba(143,150,147,0.15)] bg-[#181B1A]">
                Growth &amp; Revenue
              </span>
              <ArrowUpRight size={16} className="text-[#8F9693]" />
            </div>

            <h3 className="text-2xl font-light text-[#F1EFE8] mb-4 leading-snug">
              Autonomous Lead Qualification
            </h3>
            <p className="text-sm text-[#8F9693] leading-relaxed mb-6">
              Ingest inquiries across webforms, email, and social. Neomagnesis enriches firmographic data, scores buying intent, and triggers contextual executive outreach.
            </p>

            <ul className="space-y-2.5 text-xs text-[#D8D6CF]">
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#8F9693]" /> Sub-minute lead response time
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#8F9693]" /> AI-evaluated ICP matching
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-[#8F9693]" /> Bi-directional CRM sync
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(143,150,147,0.1)] text-xs font-mono text-[#8F9693]">
            <span>Qualification accuracy: 94.2%</span>
          </div>
        </motion.div>
      </div>

      {/* Block 2: Discord & Business Workflows Duo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Discord Autonomous Operations */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#111312] border border-[rgba(143,150,147,0.12)] rounded-2xl p-8 hover:border-[rgba(143,150,147,0.24)] transition-colors duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono tracking-wider uppercase text-[#8F9693] px-2.5 py-1 rounded border border-[rgba(143,150,147,0.15)] bg-[#181B1A]">
              Community Infrastructure
            </span>
            <span className="text-xs font-mono text-[#8F9693]">Discord Engine</span>
          </div>
          <h3 className="text-xl font-light text-[#F1EFE8] mb-3">
            Intelligent Community Operations
          </h3>
          <p className="text-sm text-[#8F9693] leading-relaxed mb-6">
            Deploy self-moderating bots that resolve technical inquiries, surface top discussions, manage role access, and post contextual announcements automatically.
          </p>
          <div className="pt-4 border-t border-[rgba(143,150,147,0.1)] flex items-center justify-between text-xs font-mono text-[#8F9693]">
            <span>Active Server Health: 99.9%</span>
            <span className="text-[#F1EFE8]">Zero Token Bloat</span>
          </div>
        </motion.div>

        {/* Business Operations */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#111312] border border-[rgba(143,150,147,0.12)] rounded-2xl p-8 hover:border-[rgba(143,150,147,0.24)] transition-colors duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono tracking-wider uppercase text-[#8F9693] px-2.5 py-1 rounded border border-[rgba(143,150,147,0.15)] bg-[#181B1A]">
              Enterprise Operations
            </span>
            <span className="text-xs font-mono text-[#8F9693]">Back-Office Sync</span>
          </div>
          <h3 className="text-xl font-light text-[#F1EFE8] mb-3">
            Deterministic Business Workflows
          </h3>
          <p className="text-sm text-[#8F9693] leading-relaxed mb-6">
            Automate invoicing reconciliation, cross-platform spreadsheet syncs, and weekly executive briefings without writing glue code or maintaining custom microservices.
          </p>
          <div className="pt-4 border-t border-[rgba(143,150,147,0.1)] flex items-center justify-between text-xs font-mono text-[#8F9693]">
            <span>Audit Trail: Immutable Log</span>
            <span className="text-[#F1EFE8]">SOC2 Aligned</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
