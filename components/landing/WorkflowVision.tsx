'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, BookOpen, PenTool, Terminal, GitBranch, Shield, CheckCircle2 } from 'lucide-react'

interface WorkflowItem {
  id: string
  label: string
  icon: typeof BookOpen
  title: string
  tagline: string
  description: string
  nodes: {
    inputs: { title: string; type: string }[]
    processor: { title: string; subtitle: string; badge: string }
    outputs: { title: string; type: string }[]
  }
  principles: string[]
}

const workflows: WorkflowItem[] = [
  {
    id: 'research',
    label: 'Research & Synthesis',
    icon: BookOpen,
    title: 'Multi-Source Knowledge Graph',
    tagline: 'Aggregate local archives without external indexing.',
    description:
      'Neomagnesis scans your local PDFs, markdown notes, codebases, and offline documentation. It synthesizes cross-referenced knowledge graphs entirely within local memory, ensuring proprietary research never traverses public networks.',
    nodes: {
      inputs: [
        { title: 'Local PDF Archives', type: 'Local Storage' },
        { title: 'Markdown Vaults', type: 'Obsidian / Filesystem' },
        { title: 'Offline Repositories', type: 'Git AST' },
      ],
      processor: {
        title: 'Local Context Core',
        subtitle: 'Zero-cloud semantic vectorization & citation mapping',
        badge: 'Isolated Process',
      },
      outputs: [
        { title: 'Verified Briefing', type: 'Structured Markdown' },
        { title: 'Citation Matrix', type: 'Exact File Pointers' },
      ],
    },
    principles: ['Zero external vector databases', 'Strict filesystem boundary', 'Instant local cache retrieval'],
  },
  {
    id: 'content',
    label: 'Editorial & Content',
    icon: PenTool,
    title: 'Autonomous Editorial Pipeline',
    tagline: 'From scattered research to polished multi-format publication.',
    description:
      'Transform structured ideas into essays, technical specifications, and release notes. Neomagnesis preserves your authentic voice, cross-checks factual assertions against your reference vault, and formats output deterministically.',
    nodes: {
      inputs: [
        { title: 'Voice & Style Guide', type: 'Local Tokens' },
        { title: 'Raw Argument Notes', type: 'Unstructured Text' },
        { title: 'Verified References', type: 'Local Bibliography' },
      ],
      processor: {
        title: 'Editorial Engine',
        subtitle: 'Tone alignment, logical cohesion, and proofing loop',
        badge: 'Iterative Pass',
      },
      outputs: [
        { title: 'Polished Manuscript', type: 'Clean Markdown' },
        { title: 'Social / Dispatch Cuts', type: 'Formatted Snippets' },
      ],
    },
    principles: ['Consistent tone preservation', 'Context-aware revision cycle', 'No telemetry on drafts'],
  },
  {
    id: 'automation',
    label: 'System Automation',
    icon: Terminal,
    title: 'Deterministic OS Orchestration',
    tagline: 'Safe, sandboxed scripts executing directly on your machine.',
    description:
      'Automate repetitive desktop tasks, file organizing, media conversions, and build pipelines. Agents evaluate tasks, formulate shell actions, test invariants inside a local sandbox, and execute with explicit user permissions.',
    nodes: {
      inputs: [
        { title: 'Filesystem Watcher', type: 'OS Event' },
        { title: 'Local Script Trigger', type: 'Cron / Webhook' },
        { title: 'User Intent Prompt', type: 'CLI / Shell' },
      ],
      processor: {
        title: 'Sandboxed Runtime',
        subtitle: 'Permission boundaries, dry-run safety verification',
        badge: 'Guarded Execution',
      },
      outputs: [
        { title: 'Atomic File Changes', type: 'Verified Diff' },
        { title: 'Audit Execution Log', type: 'Local JSONL' },
      ],
    },
    principles: ['Explicit boundary confirmation', 'Dry-run rollback safety', 'Sub-millisecond native hooks'],
  },
  {
    id: 'engineering',
    label: 'Code Engineering',
    icon: GitBranch,
    title: 'Local Repository Agent',
    tagline: 'Deep codebase understanding without remote indexing.',
    description:
      'Analyze AST trees, navigate dependency graphs, generate test suites, and draft refactorings. The model runs against your local working tree, respecting your gitignore and maintaining strict confidentiality.',
    nodes: {
      inputs: [
        { title: 'Working Repository Tree', type: 'Git Working Tree' },
        { title: 'Type Definitions', type: 'TypeScript AST' },
        { title: 'Issue Specification', type: 'Task Brief' },
      ],
      processor: {
        title: 'Engineering Core',
        subtitle: 'Dependency analysis, patch creation, local test execution',
        badge: 'AST-Aware',
      },
      outputs: [
        { title: 'Atomic Git Commits', type: 'Staged Patches' },
        { title: 'Unit Test Suite', type: 'Passing Verification' },
      ],
    },
    principles: ['Deterministic type checking', 'Clean patch formatting', 'Full source confidentiality'],
  },
]

export function WorkflowVision() {
  const [activeId, setActiveId] = useState<string>('research')
  const activeWorkflow = workflows.find((w) => w.id === activeId) || workflows[0]

  return (
    <section id="workflows" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2A2D2C]">
      {/* Section Header */}
      <div className="max-w-3xl mb-16 sm:mb-20">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9AA19E] mb-3 block">
          // Workflow Vision
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#F1EFE8] tracking-[-0.025em] leading-[1.12] mb-6">
          Deterministic execution. <br />
          <span className="font-normal text-[#F1EFE8]">Contextual intelligence.</span>
        </h2>
        <p className="text-base sm:text-lg text-[#9AA19E] leading-relaxed font-normal">
          Neomagnesis orchestrates multi-step, autonomous tasks directly on your machine.
          Observe how information flows through isolated local processing nodes without contacting cloud servers.
        </p>
      </div>

      {/* Workflow Navigation Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 pb-2 border-b border-[#2A2D2C]/60">
        {workflows.map((wf) => {
          const Icon = wf.icon
          const isActive = wf.id === activeId
          return (
            <button
              key={wf.id}
              onClick={() => setActiveId(wf.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#C87D55]/15 text-[#F1EFE8] border border-[#C87D55]/60 shadow-[0_0_15px_rgba(200,125,85,0.15)]'
                  : 'bg-[#111312] text-[#9AA19E] border border-[#2A2D2C] hover:text-[#F1EFE8] hover:border-[#9AA19E]/40'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-[#C87D55]' : 'text-[#9AA19E]'} />
              <span>{wf.label}</span>
            </button>
          )
        })}
      </div>

      {/* Main Workflow Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeWorkflow.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Column: Conceptual Abstract Node Graph (7 cols) */}
          <div className="lg:col-span-7 bg-[#0E100F] border border-[#2A2D2C] rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-macos-panel">
            {/* Diagram Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#2A2D2C]/70">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C87D55] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#F1EFE8]">
                  Node Graph // {activeWorkflow.title}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#9AA19E] bg-[#181B1A] px-2.5 py-1 rounded border border-[#2A2D2C]">
                Air-Gapped Loop
              </span>
            </div>

            {/* Abstract Interactive Node Graph Flow */}
            <div className="my-8 py-4 relative">
              {/* Background blueprint subtle grid */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #F1EFE8 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center relative z-10">
                {/* 1. Input Nodes (3 cols) */}
                <div className="md:col-span-3 space-y-3">
                  <div className="text-[10px] font-mono uppercase text-[#9AA19E] tracking-widest pl-1">
                    Context Ingestion
                  </div>
                  {activeWorkflow.nodes.inputs.map((node, i) => (
                    <motion.div
                      key={node.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-[#141716] border border-[#2A2D2C] rounded-lg p-3 hover:border-[#C87D55]/50 transition-colors"
                    >
                      <div className="text-xs text-[#F1EFE8] font-medium truncate">{node.title}</div>
                      <div className="text-[10px] font-mono text-[#9AA19E] mt-0.5 truncate">{node.type}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Arrow Conduit from Inputs to Core (1 col) */}
                <div className="hidden md:flex md:col-span-1 flex-col items-center justify-center">
                  <svg width="24" height="60" viewBox="0 0 24 60" fill="none" className="text-[#2A2D2C]">
                    <path
                      d="M 2 10 C 12 10, 12 30, 22 30"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    <path
                      d="M 2 30 L 22 30"
                      stroke="#C87D55"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 2 50 C 12 50, 12 30, 22 30"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  </svg>
                </div>

                {/* 2. Core Processing Node (3 cols) */}
                <div className="md:col-span-3">
                  <div className="text-[10px] font-mono uppercase text-[#C87D55] tracking-widest pl-1 mb-3">
                    Local Core
                  </div>
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#181B1A] border-2 border-[#C87D55]/60 rounded-xl p-4 shadow-[0_0_25px_rgba(200,125,85,0.12)] relative"
                  >
                    <div className="inline-block text-[9px] font-mono uppercase bg-[#C87D55]/20 text-[#C87D55] px-2 py-0.5 rounded mb-2">
                      {activeWorkflow.nodes.processor.badge}
                    </div>
                    <div className="text-sm font-medium text-[#F1EFE8] mb-1">
                      {activeWorkflow.nodes.processor.title}
                    </div>
                    <div className="text-[11px] text-[#9AA19E] leading-relaxed">
                      {activeWorkflow.nodes.processor.subtitle}
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-[#2A2D2C] flex items-center justify-between text-[10px] font-mono text-[#9AA19E]">
                      <span>Latency: 0ms net</span>
                      <Shield size={12} className="text-[#C87D55]" />
                    </div>
                  </motion.div>
                </div>

                {/* Arrow Conduit from Core to Outputs (1 col) */}
                <div className="hidden md:flex md:col-span-1 flex-col items-center justify-center">
                  <svg width="24" height="60" viewBox="0 0 24 60" fill="none" className="text-[#2A2D2C]">
                    <path
                      d="M 2 30 C 12 30, 12 18, 22 18"
                      stroke="#C87D55"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 2 30 C 12 30, 12 42, 22 42"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  </svg>
                </div>

                {/* 3. Output Nodes (3 cols) */}
                <div className="md:col-span-3 space-y-3">
                  <div className="text-[10px] font-mono uppercase text-[#9AA19E] tracking-widest pl-1">
                    Deterministic Output
                  </div>
                  {activeWorkflow.nodes.outputs.map((node, i) => (
                    <motion.div
                      key={node.title}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="bg-[#141716] border border-[#2A2D2C] rounded-lg p-3 hover:border-[#5B7065]/60 transition-colors"
                    >
                      <div className="text-xs text-[#F1EFE8] font-medium truncate">{node.title}</div>
                      <div className="text-[10px] font-mono text-[#5B7065] mt-0.5 truncate">{node.type}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Diagram Footer: Verification Indicator */}
            <div className="pt-4 border-t border-[#2A2D2C]/70 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#9AA19E]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#5B7065]" />
                Zero external telemetry dispatched
              </span>
              <span className="text-[#F1EFE8]/70">Native OS Thread #1</span>
            </div>
          </div>

          {/* Right Column: Narrative Details & Architectural Principles (5 cols) */}
          <div className="lg:col-span-5 bg-[#111312] border border-[#2A2D2C] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-macos-panel">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#C87D55] mb-2">
                {activeWorkflow.tagline}
              </div>
              <h3 className="text-2xl font-light text-[#F1EFE8] mb-4">
                {activeWorkflow.title}
              </h3>
              <p className="text-sm text-[#9AA19E] leading-relaxed mb-6">
                {activeWorkflow.description}
              </p>

              <div className="space-y-3 pt-6 border-t border-[#2A2D2C]">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#F1EFE8]/80 mb-2">
                  System Invariants
                </div>
                {activeWorkflow.principles.map((principle) => (
                  <div key={principle} className="flex items-start gap-2.5 text-xs text-[#9AA19E]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C87D55] mt-1.5 shrink-0" />
                    <span>{principle}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2A2D2C]">
              <a
                href="#early-access"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#F1EFE8] hover:text-[#C87D55] transition-colors"
              >
                <span>Reserve Early Access for this workflow</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
