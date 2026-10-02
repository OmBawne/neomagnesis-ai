'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
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
      'Neomagnesis scans your local PDFs, markdown notes, codebases, and offline documentation. It synthesizes cross-referenced knowledge graphs within local memory, keeping your proprietary research off public networks by default.',
    nodes: {
      inputs: [
        { title: 'Local PDF Archives', type: 'Local Storage' },
        { title: 'Markdown Vaults', type: 'Obsidian / Filesystem' },
        { title: 'Offline Repositories', type: 'Git AST' },
      ],
      processor: {
        title: 'Local Context Core',
        subtitle: 'Local semantic indexing & citation mapping',
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
    principles: ['Explicit boundary confirmation', 'Dry-run rollback safety', 'Native OS event hooks'],
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

function WorkflowCard({ workflow, index }: { workflow: WorkflowItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })
  const prefersReduced = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card rounded-2xl overflow-hidden border border-[#2A2D2C] hover:border-[#E58B4E]/40 hover:-translate-y-1 transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.6)]"
    >
      {/* Card Header & Node Graph */}
      <div className="p-6 sm:p-8 pb-5 border-b border-[#2A2D2C]/80">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#E58B4E] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#FAF8F5] font-medium">
              Node Graph // {workflow.title}
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#D4DDD8] bg-[#181B1A] px-2.5 py-1 rounded-full border border-[#2A2D2C] font-medium">
            Local Processing Loop
          </span>
        </div>

        {/* Abstract Node Graph Flow */}
        <div className="relative py-2 sm:py-4">
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center relative z-10">
            {/* 1. Input Nodes (3 cols) */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-[10px] font-mono uppercase text-[#FFAE70] tracking-widest pl-1 font-semibold">
                Context Ingestion
              </div>
              {workflow.nodes.inputs.map((node, i) => (
                <motion.div
                  key={node.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#141716] border border-[#2A2D2C] rounded-xl p-3.5 hover:border-[#E58B4E]/50 transition-colors"
                >
                  <div className="text-xs sm:text-sm text-[#FAF8F5] font-medium truncate">{node.title}</div>
                  <div className="text-[10px] font-mono text-[#A6B2AC] mt-0.5 truncate">{node.type}</div>
                </motion.div>
              ))}
            </div>

            {/* Arrow Conduit from Inputs to Core (1 col) */}
            <div className="hidden md:flex md:col-span-1 flex-col items-center justify-center">
              <svg width="24" height="70" viewBox="0 0 24 70" fill="none" className="text-[#3A3E3C]">
                <path
                  d="M 2 10 C 12 10, 12 35, 22 35"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <path
                  d="M 2 35 L 22 35"
                  stroke="#E58B4E"
                  strokeWidth="1.8"
                />
                <path
                  d="M 2 60 C 12 60, 12 35, 22 35"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              </svg>
            </div>

            {/* 2. Core Processing Node (3 cols) */}
            <div className="md:col-span-3">
              <div className="text-[10px] font-mono uppercase text-[#FFAE70] tracking-widest pl-1 mb-3 font-semibold">
                Local Core
              </div>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[#181B1A] border-2 border-[#E58B4E]/70 rounded-xl p-4 sm:p-5 shadow-[0_0_25px_rgba(229,139,78,0.15)] relative"
              >
                <div className="inline-block text-[9px] font-mono uppercase bg-[#E58B4E]/20 text-[#FFAE70] font-semibold px-2 py-0.5 rounded mb-2 border border-[#E58B4E]/30">
                  {workflow.nodes.processor.badge}
                </div>
                <div className="text-sm font-medium text-[#FAF8F5] mb-1">
                  {workflow.nodes.processor.title}
                </div>
                <div className="text-xs text-[#FAF8F5] leading-relaxed">
                  {workflow.nodes.processor.subtitle}
                </div>
                <div className="mt-3.5 pt-2.5 border-t border-[#2A2D2C] flex items-center justify-between text-[10px] font-mono text-[#D4DDD8]">
                  <span>Local execution</span>
                  <Shield size={13} className="text-[#FFAE70]" />
                </div>
              </motion.div>
            </div>

            {/* Arrow Conduit from Core to Outputs (1 col) */}
            <div className="hidden md:flex md:col-span-1 flex-col items-center justify-center">
              <svg width="24" height="70" viewBox="0 0 24 70" fill="none" className="text-[#3A3E3C]">
                <path
                  d="M 2 35 C 12 35, 12 18, 22 18"
                  stroke="#E58B4E"
                  strokeWidth="1.8"
                />
                <path
                  d="M 2 35 C 12 35, 12 52, 22 52"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              </svg>
            </div>

            {/* 3. Output Nodes (3 cols) */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-[10px] font-mono uppercase text-[#7FA692] tracking-widest pl-1 font-semibold">
                Deterministic Output
              </div>
              {workflow.nodes.outputs.map((node, i) => (
                <motion.div
                  key={node.title}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-[#141716] border border-[#2A2D2C] rounded-xl p-3.5 hover:border-[#7FA692]/60 transition-colors"
                >
                  <div className="text-xs sm:text-sm text-[#FAF8F5] font-medium truncate">{node.title}</div>
                  <div className="text-[10px] font-mono text-[#7FA692] mt-0.5 truncate font-medium">{node.type}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagram Footer: Verification Indicator */}
        <div className="pt-4 border-t border-[#2A2D2C]/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#D4DDD8]">
          <span className="flex items-center gap-1.5 text-[#D4DDD8]">
            <CheckCircle2 size={13} className="text-[#64B889]" />
            No unnecessary external telemetry dispatched
          </span>
          <span className="text-[#FAF8F5] font-medium">Native OS Thread #1</span>
        </div>
      </div>

      {/* Narrative Details & Architectural Principles */}
      <div className="p-6 sm:p-8">
        <div className="text-xs font-mono uppercase tracking-wider text-[#FFAE70] mb-2 font-semibold">
          {workflow.tagline}
        </div>
        <h3 className="text-xl sm:text-2xl font-light text-[#FAF8F5] mb-3">
          {workflow.title}
        </h3>
        <p className="text-sm sm:text-base text-[#D4DDD8] leading-relaxed mb-6 font-normal">
          {workflow.description}
        </p>

        <div className="space-y-3 pt-6 border-t border-[#2A2D2C]">
          <div className="text-xs font-mono uppercase tracking-wider text-[#FAF8F5] mb-2 font-semibold">
            System Invariants
          </div>
          {workflow.principles.map((principle) => (
            <div key={principle} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#D4DDD8]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E58B4E] mt-2 shrink-0" />
              <span>{principle}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#2A2D2C]">
          <a
            href="#early-access"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FAF8F5] hover:text-[#FFAE70] transition-colors py-1 group/link"
          >
            <span className="font-semibold">Reserve Early Access for this workflow</span>
            <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function WorkflowVision() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Subtle scroll-linked background gradient
  const sectionBgOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.05, 0])

  return (
    <section
      id="workflows"
      ref={sectionRef}
      className="relative py-20 lg:py-28 px-5 sm:px-8 max-w-[1200px] mx-auto border-t border-[#2A2D2C]"
      style={{ 
        background: `radial-gradient(ellipse at 50% 0%, rgba(229,139,78,${sectionBgOpacity}) 0%, transparent 60%)`,
      }}
    >
      {/* Section Header */}
      <div className="max-w-3xl mb-14 lg:mb-18">
        <motion.div
          className="flex items-center gap-2.5 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E58B4E]" aria-hidden="true" />
          <span className="mono-label text-[#FAF8F5] font-medium">
            // Workflow Vision
          </span>
        </motion.div>
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#FAF8F5] tracking-[-0.025em] leading-[1.12] mb-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Deterministic execution.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#FFAE70] to-[#E58B4E] font-normal">
            Contextual intelligence.
          </span>
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg text-[#D4DDD8] leading-relaxed font-normal"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Neomagnesis orchestrates multi-step, autonomous tasks directly on your machine.
          Information flows through isolated local processing nodes, minimising unnecessary contact with external services.
        </motion.p>
      </div>

      {/* Four Workflow Cards - stacked vertically with generous spacing */}
      <div className="space-y-8">
        {workflows.map((wf, i) => (
          <WorkflowCard key={wf.id} workflow={wf} index={i} />
        ))}
      </div>
    </section>
  )
}