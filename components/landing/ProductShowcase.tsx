'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Shield, Sparkles, Database, Layers, CheckCircle2, ChevronRight, Play } from 'lucide-react'

const showcaseViews = [
  {
    id: 'reasoning',
    label: 'Reasoning Engine',
    title: 'Autonomous Goal Decomposition',
    caption: 'Observe the agent actively break an ambiguous operational goal into verified sub-tasks in milliseconds.',
  },
  {
    id: 'runtime',
    label: 'Execution Console',
    title: 'Zero-Latency Pipeline Runner',
    caption: 'Live streaming telemetry showing multi-platform dispatch, state checkpointing, and payload validation.',
  },
  {
    id: 'memory',
    label: 'Context Memory',
    title: 'Persistent Knowledge Graph',
    caption: 'Unified enterprise memory index that retains user preferences, historical patterns, and brand guidelines.',
  },
]

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState('reasoning')

  return (
    <section id="showcase" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(143,150,147,0.12)]">
      {/* Header */}
      <div className="max-w-3xl mb-14">
        <span className="text-xs uppercase tracking-[0.2em] text-[#8F9693] font-medium mb-4 block">
          Interface &amp; Capabilities
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-ink-ivory tracking-tight leading-[1.15] mb-6">
          Intelligence with <span className="font-normal text-white">total visibility</span>.
        </h2>
        <p className="text-base sm:text-lg text-[#8F9693] leading-relaxed font-normal">
          No black boxes. Neomagnesis exposes step-by-step reasoning tokens, live execution checkpoints, and schema contracts so engineering teams maintain complete oversight.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-[rgba(143,150,147,0.12)]">
        {showcaseViews.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#181B1A] text-[#F1EFE8] border border-[rgba(143,150,147,0.25)] shadow-sm'
                : 'text-[#8F9693] hover:text-[#D8D6CF] hover:bg-[#111312]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Interface Window Mockup */}
      <div className="bg-[#111312] border border-[rgba(143,150,147,0.18)] rounded-2xl overflow-hidden shadow-2xl">
        {/* Chrome Titlebar */}
        <div className="px-6 py-3.5 bg-[#181B1A] border-b border-[rgba(143,150,147,0.12)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#242928]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#242928]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#242928]" />
            </div>
            <span className="text-xs font-mono text-[#8F9693]">neomagnesis-core // runtime-session-882</span>
          </div>
          <div className="text-xs font-mono text-[#8F9693]">
            Status: <span className="text-[#F1EFE8]">Active</span>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="p-6 sm:p-10 font-mono text-xs">
          {activeTab === 'reasoning' && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-[#181B1A] border border-[rgba(143,150,147,0.12)]">
                <div className="text-[#8F9693] mb-1.5">// High-Level Goal Received</div>
                <div className="text-[#F1EFE8] font-sans text-sm font-normal">
                  "Analyze new YouTube video metrics, generate contextual Discord summary with key timestamps, and notify high-intent leads via CRM sequence."
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[#8F9693] text-[11px] uppercase tracking-wider">// Dynamic Task Graph Deduction</div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-lg bg-[#0c0d0d] border border-[rgba(143,150,147,0.14)]">
                    <div className="text-[#8F9693] mb-1">Step 1 — Extraction</div>
                    <div className="text-[#D8D6CF]">Fetch transcripts &amp; retention drops &gt; 40%</div>
                    <div className="text-emerald-400 mt-2 text-[10px] flex items-center gap-1">
                      <CheckCircle2 size={11} /> Resolved (42ms)
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#0c0d0d] border border-[rgba(143,150,147,0.22)] ring-1 ring-[#F1EFE8]/10">
                    <div className="text-[#F1EFE8] mb-1">Step 2 — Synthesis</div>
                    <div className="text-[#D8D6CF]">Condense key narrative hooks for community</div>
                    <div className="text-[#F1EFE8] mt-2 text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F1EFE8] animate-pulse" /> Processing Reasoning
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#0c0d0d] border border-[rgba(143,150,147,0.1)] opacity-70">
                    <div className="text-[#8F9693] mb-1">Step 3 — Omnichannel Dispatch</div>
                    <div className="text-[#8F9693]">Format Discord embed &amp; trigger CRM workflow</div>
                    <div className="text-[#8F9693] mt-2 text-[10px]">Queued</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'runtime' && (
            <div className="space-y-4">
              <div className="text-[#8F9693] text-[11px] uppercase tracking-wider">// Telemetry Stream</div>
              <div className="bg-[#0c0d0d] p-4 rounded-xl border border-[rgba(143,150,147,0.12)] space-y-2 text-[#D8D6CF]">
                <div><span className="text-[#8F9693]">[14:02:11.204]</span> INGEST: Webhook event payload received (size: 2.4kb)</div>
                <div><span className="text-[#8F9693]">[14:02:11.238]</span> VALIDATE: Schema adherence 100% matched</div>
                <div><span className="text-[#8F9693]">[14:02:11.290]</span> DISPATCH: YouTube API v3 connection authenticated</div>
                <div><span className="text-[#8F9693]">[14:02:11.382]</span> AI_REASON: Prompt tokens: 420 | Output tokens: 165 | Latency: 92ms</div>
                <div className="text-emerald-400"><span className="text-[#8F9693]">[14:02:11.450]</span> SUCCESS: Discord webhook delivered with status 204 No Content</div>
              </div>
            </div>
          )}

          {activeTab === 'memory' && (
            <div className="space-y-4">
              <div className="text-[#8F9693] text-[11px] uppercase tracking-wider">// Unified Enterprise Memory Context</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0c0d0d] border border-[rgba(143,150,147,0.12)]">
                  <div className="text-[#8F9693] mb-1.5">Brand Voice Guidelines</div>
                  <div className="text-[#D8D6CF] font-sans text-xs leading-relaxed">
                    Tone: Direct, editorial, highly technical. Avoid hype words. Standard response format: concise bullet points with verified data links.
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#0c0d0d] border border-[rgba(143,150,147,0.12)]">
                  <div className="text-[#8F9693] mb-1.5">Security &amp; Privacy Boundary</div>
                  <div className="text-[#D8D6CF] font-sans text-xs leading-relaxed">
                    Zero model training on customer payloads. Session context wiped post execution. Encrypted at rest (AES-256).
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
