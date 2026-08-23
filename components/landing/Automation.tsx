'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Play, GitFork, ArrowRight, CornerDownRight, Sliders, Database, MessageSquare, Video } from 'lucide-react'

interface WorkflowNode {
  id: string
  label: string
  type: string
  status: 'completed' | 'active' | 'waiting'
  summary: string
  metrics?: string
  icon: any
}

const pipelineNodes: WorkflowNode[] = [
  {
    id: 'trigger',
    label: 'Channel Listener',
    type: 'Event Ingestion',
    status: 'completed',
    summary: 'Monitors video uploads, discord mentions, and lead forms with webhook fallback.',
    metrics: '0.12s latency',
    icon: Video,
  },
  {
    id: 'reason',
    label: 'Cognitive Classifier',
    type: 'Reasoning Step',
    status: 'completed',
    summary: 'Analyzes intent, verifies permissions, and dynamically extracts entity metadata.',
    metrics: '99.8% precision',
    icon: Sliders,
  },
  {
    id: 'branch',
    label: 'Adaptive Dispatcher',
    type: 'Routing Engine',
    status: 'active',
    summary: 'Splits execution across parallel distribution channels based on sentiment & priority.',
    metrics: 'Branching: 3 routes',
    icon: GitFork,
  },
  {
    id: 'output',
    label: 'Omnichannel Action',
    type: 'Execution Target',
    status: 'waiting',
    summary: 'Publishes synchronized updates to Discord, CRM database, and analytics dashboard.',
    metrics: 'Scheduled sync',
    icon: MessageSquare,
  },
]

export default function Automation() {
  const [selectedNode, setSelectedNode] = useState<string>('branch')
  const activeNode = pipelineNodes.find(n => n.id === selectedNode) || pipelineNodes[2]

  return (
    <section id="automation" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(143,150,147,0.12)]">
      {/* Header */}
      <div className="max-w-3xl mb-16 sm:mb-20">
        <span className="text-xs uppercase tracking-[0.2em] text-[#8F9693] font-medium mb-4 block">
          Workflow Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-ink-ivory tracking-tight leading-[1.15] mb-6">
          Precise engineering for <span className="font-normal text-white">complex operations</span>.
        </h2>
        <p className="text-base sm:text-lg text-[#8F9693] leading-relaxed font-normal">
          Build multi-stage pipelines with deterministic reliability. Every step is transparent, audit-ready, and equipped with automated fallback heuristics.
        </p>
      </div>

      {/* Interactive Workflow Canvas Mockup */}
      <div className="bg-[#111312] border border-[rgba(143,150,147,0.18)] rounded-2xl overflow-hidden shadow-2xl">
        {/* Workspace Chrome Toolbar */}
        <div className="px-6 py-4 border-b border-[rgba(143,150,147,0.12)] bg-[#181B1A] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[rgba(143,150,147,0.3)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[rgba(143,150,147,0.3)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[rgba(143,150,147,0.3)]" />
            </div>
            <div className="h-4 w-px bg-[rgba(143,150,147,0.15)] mx-1" />
            <span className="text-xs font-mono text-[#D8D6CF]">pipeline_v4_omnichannel_sync.neo</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#8F9693] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live Execution
            </span>
            <span className="text-[#D8D6CF] px-2.5 py-1 rounded bg-[#111312] border border-[rgba(143,150,147,0.15)]">
              4 nodes active
            </span>
          </div>
        </div>

        {/* Workflow Diagram & Node Inspector Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(143,150,147,0.12)]">
          {/* Nodes Pipeline Canvas (8 cols) */}
          <div className="lg:col-span-8 p-6 sm:p-10 bg-[#0c0d0d] flex flex-col justify-center">
            <div className="text-xs font-mono text-[#8F9693] mb-6 flex items-center justify-between">
              <span>Interactive Pipeline Graph</span>
              <span className="text-[11px]">Select any node to inspect payload</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              {pipelineNodes.map((node, index) => {
                const isSelected = node.id === selectedNode
                const Icon = node.icon
                return (
                  <motion.button
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    whileHover={{ y: -2 }}
                    className={`text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#181B1A] border-[#F1EFE8] shadow-lg ring-1 ring-[#F1EFE8]/20'
                        : 'bg-[#111312] border-[rgba(143,150,147,0.14)] hover:border-[rgba(143,150,147,0.3)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#181B1A] border border-[rgba(143,150,147,0.15)] flex items-center justify-center">
                        <Icon size={14} className={isSelected ? 'text-[#F1EFE8]' : 'text-[#8F9693]'} />
                      </div>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                          node.status === 'completed'
                            ? 'text-[#8F9693] bg-[#181B1A]'
                            : node.status === 'active'
                            ? 'text-[#F1EFE8] bg-[rgba(241,239,232,0.1)] border border-[#F1EFE8]/30'
                            : 'text-[#8F9693] opacity-60 bg-[#181B1A]'
                        }`}
                      >
                        {node.status}
                      </span>
                    </div>

                    <div className="text-sm font-medium text-[#F1EFE8] mb-1">{node.label}</div>
                    <div className="text-xs text-[#8F9693] font-mono">{node.type}</div>
                  </motion.button>
                )
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-[rgba(143,150,147,0.1)] flex items-center justify-between text-xs font-mono text-[#8F9693]">
              <span className="flex items-center gap-2">
                <CornerDownRight size={13} />
                <span>Deterministic Execution Matrix</span>
              </span>
              <span>Payload: JSON-Schema 2026.04</span>
            </div>
          </div>

          {/* Node Inspector Sidebar (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-8 bg-[#111312] flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#8F9693] mb-4">
                Node Telemetry
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-light text-[#F1EFE8] mb-1">{activeNode.label}</h4>
                <div className="text-xs font-mono text-[#8F9693]">{activeNode.type}</div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-[#181B1A] border border-[rgba(143,150,147,0.12)] rounded-lg p-4">
                  <div className="text-[#8F9693] font-mono mb-1">Node Purpose</div>
                  <div className="text-[#D8D6CF] leading-relaxed">{activeNode.summary}</div>
                </div>

                <div className="bg-[#181B1A] border border-[rgba(143,150,147,0.12)] rounded-lg p-4">
                  <div className="text-[#8F9693] font-mono mb-1">Performance SLA</div>
                  <div className="text-[#F1EFE8] font-mono font-medium">{activeNode.metrics}</div>
                </div>

                <div className="bg-[#181B1A] border border-[rgba(143,150,147,0.12)] rounded-lg p-4">
                  <div className="text-[#8F9693] font-mono mb-1">State Integrity</div>
                  <div className="text-emerald-400 font-mono flex items-center gap-1.5">
                    <CheckCircle2 size={12} /> Verified Cryptographically
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[rgba(143,150,147,0.1)]">
              <span className="text-[11px] font-mono text-[#8F9693] block">
                Instant rollback &amp; idempotent re-execution guaranteed.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
