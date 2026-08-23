'use client'

import { motion } from 'framer-motion'
import { Check, Compass, GitBranch, RefreshCw, Sparkles, Target } from 'lucide-react'

const traditionalSteps = [
  { label: 'Trigger', desc: 'Static event arrives' },
  { label: 'Action A', desc: 'Blind HTTP request' },
  { label: 'Action B', desc: 'Fails on schema change' },
]

const agenticSteps = [
  { step: '01', title: 'Goal Intake', desc: 'Define high-level objective with constraints and success metrics.' },
  { step: '02', title: 'Context Reason', desc: 'Analyze real-time variables, environment data, and historical history.' },
  { step: '03', title: 'Dynamic Plan', desc: 'Synthesize the optimal multi-step route with contingency branches.' },
  { step: '04', title: 'Execute & Act', desc: 'Dispatch actions across APIs, services, and multi-platform tools.' },
  { step: '05', title: 'Observe Output', desc: 'Validate outcome against strict semantic and numerical thresholds.' },
  { step: '06', title: 'Self-Adapt', desc: 'If edge case detected, re-plan route immediately without human triage.' },
]

export default function AgenticAI() {
  return (
    <section id="agentic-ai" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(143,150,147,0.12)]">
      {/* Header */}
      <div className="max-w-3xl mb-16 sm:mb-20">
        <span className="text-xs uppercase tracking-[0.2em] text-[#8F9693] font-medium mb-4 block">
          Agentic Paradigm
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-ink-ivory tracking-tight leading-[1.15] mb-6">
          Beyond brittle triggers. <br />
          <span className="font-normal text-white">Systems that reason in real time.</span>
        </h2>
        <p className="text-base sm:text-lg text-[#8F9693] leading-relaxed font-normal">
          Traditional automation breaks the moment unexpected inputs occur. Neomagnesis operates as an autonomous cognitive loop—synthesizing context, testing assumptions, and executing with self-correcting precision.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Traditional Automation (Linear & Fragile) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4 bg-[#111312] border border-[rgba(143,150,147,0.14)] rounded-2xl p-7 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(143,150,147,0.1)]">
              <span className="text-xs uppercase font-mono tracking-wider text-[#8F9693]">Traditional Automation</span>
              <span className="text-[11px] font-mono text-[#8F9693] bg-[#181B1A] px-2 py-0.5 rounded">Linear Flow</span>
            </div>

            <p className="text-xs text-[#8F9693] mb-8 leading-relaxed">
              Rigid conditional chains. If payload schema alters by 1%, the entire pipeline halts silently.
            </p>

            <div className="space-y-4 relative">
              {traditionalSteps.map((item, idx) => (
                <div key={item.label} className="relative">
                  <div className="bg-[#181B1A] border border-[rgba(143,150,147,0.12)] rounded-lg p-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-[#D8D6CF]">{item.label}</div>
                      <div className="text-[11px] text-[#8F9693] mt-0.5">{item.desc}</div>
                    </div>
                    <span className="text-[10px] font-mono text-[#8F9693] opacity-60">0{idx + 1}</span>
                  </div>
                  {idx < traditionalSteps.length - 1 && (
                    <div className="h-4 w-px bg-[rgba(143,150,147,0.15)] mx-auto my-1" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[rgba(143,150,147,0.1)] text-xs text-[#8F9693] font-mono flex items-center justify-between">
            <span>Failure Mode</span>
            <span className="text-rose-400/80">Requires Manual Fix</span>
          </div>
        </motion.div>

        {/* Right: Neomagnesis Autonomous Cognitive Cycle (8 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-8 bg-[#111312] border border-[rgba(143,150,147,0.22)] rounded-2xl p-7 sm:p-10 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(143,150,147,0.1)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F1EFE8]" />
                <span className="text-xs uppercase font-mono tracking-wider text-[#F1EFE8]">Neomagnesis Cognitive Loop</span>
              </div>
              <span className="text-[11px] font-mono text-[#D8D6CF] bg-[#181B1A] border border-[rgba(143,150,147,0.15)] px-2.5 py-0.5 rounded">
                Autonomous &amp; Resilient
              </span>
            </div>

            <p className="text-sm text-[#8F9693] mb-8 leading-relaxed max-w-2xl">
              An intelligent loop that tests assumptions at each step. If upstream data shifts, the engine reasons over alternatives, self-heals the execution graph, and delivers the final goal.
            </p>

            {/* 6-Phase Editorial Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {agenticSteps.map((item) => (
                <div
                  key={item.step}
                  className="bg-[#181B1A] border border-[rgba(143,150,147,0.14)] rounded-xl p-4.5 flex flex-col justify-between hover:border-[rgba(143,150,147,0.3)] transition-colors duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono text-[#8F9693]">{item.step}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[rgba(143,150,147,0.4)]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#F1EFE8] mb-1.5">{item.title}</h4>
                    <p className="text-xs text-[#8F9693] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(143,150,147,0.1)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8F9693]">
            <div className="flex items-center gap-2">
              <RefreshCw size={13} className="text-[#D8D6CF]" />
              <span>Closed-Loop Verification Engine</span>
            </div>
            <span className="text-[#F1EFE8]">Zero Downtime on Unstructured Inputs</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
