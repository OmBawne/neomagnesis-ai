'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

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
    <section id="showcase" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2A2D2C]">
      {/* Header */}
      <div className="max-w-3xl mb-14">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9AA19E] mb-4 block">
          // Interface &amp; Telemetry
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#F1EFE8] tracking-[-0.025em] leading-[1.12] mb-6">
          Intelligence with <span className="font-normal text-[#F1EFE8]">total visibility</span>.
        </h2>
        <p className="text-base sm:text-lg text-[#9AA19E] leading-relaxed font-normal">
          No black boxes. Neomagnesis exposes execution steps, agent actions, and schema contracts so engineering teams maintain complete oversight.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-[#2A2D2C]">
        {showcaseViews.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#181B1A] text-[#F1EFE8] border border-[#2A2D2C] shadow-sm'
                : 'text-[#9AA19E] hover:text-[#F1EFE8] hover:bg-[#111312]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* macOS Interface Window Mockup */}
      <div className="bg-[#111312] border border-[#2A2D2C] rounded-2xl overflow-hidden shadow-macos-window">
        {/* macOS Titlebar */}
        <div className="px-6 py-3.5 bg-[#181B1A] border-b border-[#2A2D2C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2A2D2C]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2A2D2C]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2A2D2C]" />
            </div>
            <span className="text-xs font-mono text-[#9AA19E]">neomagnesis-core // runtime-session-882</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D6B52]" />
            <span className="text-xs font-mono text-[#5BA87E]">Engine Active</span>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="p-6 sm:p-10 font-mono text-xs">
          {activeTab === 'reasoning' && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-[#181B1A] border border-[#2A2D2C]">
                <div className="text-[#9AA19E] mb-1.5">// High-Level Goal Received</div>
                <div className="text-[#F1EFE8] font-sans text-sm font-normal">
                  "Analyze new YouTube video metrics, generate contextual Discord summary with key timestamps, and notify high-intent leads via CRM sequence."
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[#9AA19E] text-[11px] uppercase tracking-wider">// Dynamic Task Graph Deduction</div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-lg bg-[#080909] border border-[#2A2D2C]">
                    <div className="text-[#9AA19E] mb-1">Step 1 — Extraction</div>
                    <div className="text-[#F1EFE8]">Fetch transcripts &amp; retention drops &gt; 40%</div>
                    <div className="text-[#5BA87E] mt-2 text-[10px] flex items-center gap-1">
                      <CheckCircle2 size={11} /> Resolved (42ms)
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#080909] border border-[#B87333]/40 ring-1 ring-[#B87333]/20">
                    <div className="text-[#F1EFE8] mb-1">Step 2 — Synthesis</div>
                    <div className="text-[#F1EFE8]">Condense key narrative hooks for community</div>
                    <div className="text-[#D4883B] mt-2 text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B87333] animate-pulse" /> Processing Reasoning
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#080909] border border-[#2A2D2C] opacity-60">
                    <div className="text-[#9AA19E] mb-1">Step 3 — Omnichannel Dispatch</div>
                    <div className="text-[#9AA19E]">Format Discord embed &amp; trigger CRM workflow</div>
                    <div className="text-[#8E9A94] mt-2 text-[10px]">Queued</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'runtime' && (
            <div className="space-y-4">
              <div className="text-[#9AA19E] text-[11px] uppercase tracking-wider">// Telemetry Stream</div>
              <div className="bg-[#080909] p-4 rounded-xl border border-[#2A2D2C] space-y-2 text-[#F1EFE8]">
                <div><span className="text-[#8E9A94]">[14:02:11.204]</span> <span className="text-[#9AA19E]">INGEST:</span> Webhook event payload received (size: 2.4kb)</div>
                <div><span className="text-[#8E9A94]">[14:02:11.238]</span> <span className="text-[#9AA19E]">VALIDATE:</span> Schema adherence 100% matched</div>
                <div><span className="text-[#8E9A94]">[14:02:11.290]</span> <span className="text-[#9AA19E]">DISPATCH:</span> YouTube API v3 connection authenticated</div>
                <div><span className="text-[#8E9A94]">[14:02:11.382]</span> <span className="text-[#D4883B]">AI_REASON:</span> Prompt tokens: 420 | Output tokens: 165 | Latency: 92ms</div>
                <div className="text-[#5BA87E]"><span className="text-[#8E9A94]">[14:02:11.450]</span> SUCCESS: Discord webhook delivered with status 204 No Content</div>
              </div>
            </div>
          )}

          {activeTab === 'memory' && (
            <div className="space-y-4">
              <div className="text-[#9AA19E] text-[11px] uppercase tracking-wider">// Unified Enterprise Memory Context</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#080909] border border-[#2A2D2C]">
                  <div className="text-[#9AA19E] mb-1.5">Brand Voice Guidelines</div>
                  <div className="text-[#F1EFE8] font-sans text-xs leading-relaxed">
                    Tone: Direct, editorial, highly technical. Standard response format: concise bullet points with verified data links.
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#080909] border border-[#2A2D2C]">
                  <div className="text-[#9AA19E] mb-1.5">Security &amp; Privacy Boundary</div>
                  <div className="text-[#F1EFE8] font-sans text-xs leading-relaxed">
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

