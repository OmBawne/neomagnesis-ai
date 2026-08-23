'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Cpu, Layers, Sparkles, Workflow, ShieldCheck, Activity } from 'lucide-react'

const capabilities = [
  {
    icon: Cpu,
    label: 'Autonomous Reasoning',
    title: 'Self-governing AI agents that deduce next steps',
    desc: 'Unlike static scripts, Neomagnesis agents evaluate goals, assess live context, and dynamically form execution paths without human intervention.',
    highlight: 'Goal-driven execution',
  },
  {
    icon: Workflow,
    label: 'Orchestrated Workflows',
    title: 'Deterministic execution meet adaptive intelligence',
    desc: 'Combine strict operational logic with generative reasoning. When unpredictable inputs occur, the system self-corrects and continues processing.',
    highlight: 'Multi-system pipelines',
  },
]

const tertiaryFeatures = [
  {
    icon: Layers,
    title: 'Omnichannel Connectors',
    desc: 'Native integrations across YouTube, Discord, enterprise CRMs, and custom webhooks with sub-second event propagation.',
  },
  {
    icon: ShieldCheck,
    label: 'Enterprise Governance',
    title: 'Secure Context Boundaries',
    desc: 'Isolated execution sandboxes with end-to-end data privacy and role-based operational permissions.',
  },
  {
    icon: Activity,
    label: 'Real-Time Telemetry',
    title: 'Deterministic Audit Trails',
    desc: 'Inspect step-by-step reasoning tokens, execution latency, and automated decision rationales in real time.',
  },
]

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl mb-16 sm:mb-20">
        <span className="text-xs uppercase tracking-[0.2em] text-[#8F9693] font-medium mb-4 block">
          Platform Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-ink-ivory tracking-tight leading-[1.15] mb-6">
          An operating system for <span className="font-normal text-white">autonomous work</span>.
        </h2>
        <p className="text-base sm:text-lg text-[#8F9693] leading-relaxed font-normal">
          Neomagnesis unites agentic reasoning with enterprise-grade workflow pipelines. Build systems that don't just trigger actions—they observe, evaluate, and resolve complex objectives.
        </p>
      </div>

      {/* Asymmetrical Hero Feature Duo (60 / 40) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Large Feature Block (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 bg-[#111312] border border-[rgba(143,150,147,0.14)] rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[rgba(143,150,147,0.28)] transition-colors duration-300"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono tracking-wider uppercase text-[#8F9693] px-2.5 py-1 rounded border border-[rgba(143,150,147,0.15)] bg-[#181B1A]">
                {capabilities[0].label}
              </span>
              <span className="text-xs text-[#8F9693] font-mono">{capabilities[0].highlight}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light text-[#F1EFE8] mb-4 leading-snug">
              {capabilities[0].title}
            </h3>
            <p className="text-sm sm:text-base text-[#8F9693] leading-relaxed max-w-xl">
              {capabilities[0].desc}
            </p>
          </div>

          {/* Minimalist Micro-Interface Graphic */}
          <div className="mt-8 pt-6 border-t border-[rgba(143,150,147,0.1)] relative z-10">
            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-[#181B1A] p-3 rounded-lg border border-[rgba(143,150,147,0.1)]">
                <div className="text-[#8F9693] mb-1">State Evaluation</div>
                <div className="text-[#F1EFE8] font-medium">Continuous</div>
              </div>
              <div className="bg-[#181B1A] p-3 rounded-lg border border-[rgba(143,150,147,0.1)]">
                <div className="text-[#8F9693] mb-1">Error Recovery</div>
                <div className="text-[#F1EFE8] font-medium">Autonomous</div>
              </div>
              <div className="bg-[#181B1A] p-3 rounded-lg border border-[rgba(143,150,147,0.1)]">
                <div className="text-[#8F9693] mb-1">Execution Speed</div>
                <div className="text-[#F1EFE8] font-medium">&lt;140ms step</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Supporting Feature Block (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 bg-[#111312] border border-[rgba(143,150,147,0.14)] rounded-2xl p-8 sm:p-10 flex flex-col justify-between group hover:border-[rgba(143,150,147,0.28)] transition-colors duration-300"
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono tracking-wider uppercase text-[#8F9693] px-2.5 py-1 rounded border border-[rgba(143,150,147,0.15)] bg-[#181B1A]">
                {capabilities[1].label}
              </span>
              <ArrowUpRight size={16} className="text-[#8F9693] group-hover:text-[#F1EFE8] transition-colors" />
            </div>
            <h3 className="text-2xl font-light text-[#F1EFE8] mb-4 leading-snug">
              {capabilities[1].title}
            </h3>
            <p className="text-sm text-[#8F9693] leading-relaxed">
              {capabilities[1].desc}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(143,150,147,0.1)]">
            <div className="flex items-center justify-between text-xs font-mono text-[#8F9693]">
              <span>Logic Protocol: Multi-Branch</span>
              <span className="text-[#F1EFE8]">Zero-Drift SLA</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Triad Row with Subtle Borders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tertiaryFeatures.map((feat, idx) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="bg-[#111312] border border-[rgba(143,150,147,0.12)] rounded-2xl p-7 hover:border-[rgba(143,150,147,0.24)] transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-[#181B1A] border border-[rgba(143,150,147,0.15)] flex items-center justify-center mb-6">
                <feat.icon size={16} className="text-[#D8D6CF]" />
              </div>
              <h4 className="text-lg font-normal text-[#F1EFE8] mb-2.5">{feat.title}</h4>
              <p className="text-sm text-[#8F9693] leading-relaxed">{feat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
