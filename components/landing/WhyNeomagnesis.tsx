'use client'

import { motion } from 'framer-motion'
import { Target, Compass, Globe2, ShieldCheck, ArrowRight } from 'lucide-react'

const metrics = [
  { value: '10,000+', label: 'Workflows Executed' },
  { value: '99.2%', label: 'Deterministic Uptime' },
  { value: '40+', label: 'Native API Adapters' },
  { value: '<140ms', label: 'Average Node Latency' },
]

const values = [
  {
    icon: Target,
    title: 'Precision-first design',
    desc: 'We engineer for mission-critical reliability. When an agent acts on behalf of your business, failure is not an option.',
  },
  {
    icon: Compass,
    title: 'Autonomous cognitive loops',
    desc: 'AI is integrated into the core architecture, not slapped on as a chatbot wrapper. Every subsystem reasons, tests, and self-heals.',
  },
  {
    icon: Globe2,
    title: 'Open and interoperable',
    desc: 'Connect your existing stack without lock-in. Neomagnesis adapts seamlessly to your databases, APIs, and custom services.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy by architectural design',
    desc: 'Your data is strictly yours. We enforce zero model training on customer payloads and complete tenant data isolation.',
  },
]

export default function WhyNeomagnesis() {
  return (
    <section id="why-neomagnesis" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(143,150,147,0.12)]">
      {/* Header */}
      <div className="max-w-3xl mb-16 sm:mb-20">
        <span className="text-xs uppercase tracking-[0.2em] text-[#8F9693] font-medium mb-4 block">
          Philosophy &amp; Standards
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-ink-ivory tracking-tight leading-[1.15] mb-6">
          Engineered for teams that <span className="font-normal text-white">refuse to compromise</span>.
        </h2>
        <p className="text-base sm:text-lg text-[#8F9693] leading-relaxed font-normal">
          We believe automation shouldn't require maintaining fragile scripts or wrestling with opaque systems. Neomagnesis is built to be calm, intelligent, and unyielding in quality.
        </p>
      </div>

      {/* Vision & Mission Duo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#111312] border border-[rgba(143,150,147,0.14)] rounded-2xl p-8 sm:p-10 hover:border-[rgba(143,150,147,0.26)] transition-colors duration-300"
        >
          <span className="text-xs font-mono tracking-wider uppercase text-[#8F9693] block mb-4">
            Our Vision
          </span>
          <h3 className="text-2xl font-light text-[#F1EFE8] mb-4">
            Democratize sovereign intelligence for every enterprise
          </h3>
          <p className="text-sm text-[#8F9693] leading-relaxed mb-4">
            To create an operating system where humans define strategic outcomes, and autonomous agents navigate the logistical complexity required to achieve them.
          </p>
          <p className="text-xs text-[#8F9693]/80 leading-relaxed font-mono">
            // Building the infrastructure for the next generation of autonomous digital enterprises.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#111312] border border-[rgba(143,150,147,0.14)] rounded-2xl p-8 sm:p-10 hover:border-[rgba(143,150,147,0.26)] transition-colors duration-300"
        >
          <span className="text-xs font-mono tracking-wider uppercase text-[#8F9693] block mb-4">
            Our Mission
          </span>
          <h3 className="text-2xl font-light text-[#F1EFE8] mb-4">
            Eliminate operational toil with zero friction
          </h3>
          <p className="text-sm text-[#8F9693] leading-relaxed mb-4">
            To eliminate repetitive, mundane digital tasks with intelligent, self-correcting workflows—enabling operators and builders to focus entirely on creative vision.
          </p>
          <p className="text-xs text-[#8F9693]/80 leading-relaxed font-mono">
            // High-throughput, low-latency execution with cryptographic auditability.
          </p>
        </motion.div>
      </div>

      {/* Numerical Telemetry Metrics Strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#111312] border border-[rgba(143,150,147,0.14)] rounded-2xl p-8 sm:p-10 mb-12"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m) => (
            <div key={m.label} className="text-left">
              <div className="text-3xl sm:text-4xl font-light text-[#F1EFE8] mb-2 tracking-tight">
                {m.value}
              </div>
              <div className="text-xs font-mono text-[#8F9693] uppercase tracking-wider">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Core Principles List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="p-6 rounded-xl bg-[#111312] border border-[rgba(143,150,147,0.12)] hover:border-[rgba(143,150,147,0.24)] transition-colors duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-[#181B1A] border border-[rgba(143,150,147,0.15)] flex items-center justify-center mb-4">
              <v.icon size={15} className="text-[#D8D6CF]" />
            </div>
            <h4 className="text-base font-normal text-[#F1EFE8] mb-2">{v.title}</h4>
            <p className="text-xs sm:text-sm text-[#8F9693] leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
