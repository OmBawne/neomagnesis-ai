'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface WorkflowNode {
  id: string
  label: string
  x: number
  y: number
  icon: React.ReactNode
}

interface WorkflowConnection {
  from: string
  to: string
}

interface WorkflowVisualizationProps {
  side: 'left' | 'right'
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
  animationDelay?: number
}

const NODE_RADIUS = 24
const STROKE_WIDTH = 1
const ACTIVE_OPACITY = 0.55
const INACTIVE_OPACITY = 0.12
const SIGNAL_OPACITY = 0.6
const BASE_BLUR = 10
const CONTAINER_OPACITY = 0.45

const KNOWLEDGE_NODES: WorkflowNode[] = [
  { id: 'doc', label: 'Documents', x: 60, y: 60, icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )},
  { id: 'extract', label: 'Extract', x: 60, y: 160, icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )},
  { id: 'organize', label: 'Organize', x: 60, y: 260, icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )},
  { id: 'summary', label: 'Summary', x: 60, y: 360, icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="14" y2="9" />
    </svg>
  )},
]

const KNOWLEDGE_CONNECTIONS: WorkflowConnection[] = [
  { from: 'doc', to: 'extract' },
  { from: 'extract', to: 'organize' },
  { from: 'organize', to: 'summary' },
]

const AUTOMATION_NODES: WorkflowNode[] = [
  { id: 'task', label: 'Task', x: 60, y: 60, icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )},
  { id: 'plan', label: 'Plan', x: 60, y: 160, icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="9" y1="9" x2="15" y2="9" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="12" y2="17" />
    </svg>
  )},
  { id: 'tool', label: 'Tool', x: 60, y: 260, icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )},
  { id: 'result', label: 'Result', x: 60, y: 360, icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )},
]

const AUTOMATION_CONNECTIONS: WorkflowConnection[] = [
  { from: 'task', to: 'plan' },
  { from: 'plan', to: 'tool' },
  { from: 'tool', to: 'result' },
]

function getNodePosition(nodes: WorkflowNode[], id: string) {
  const node = nodes.find(n => n.id === id)
  return node ? { x: node.x, y: node.y } : { x: 0, y: 0 }
}

function ConnectionLine({
  fromId,
  toId,
  nodes,
  progress,
  isActive,
  side,
}: {
  fromId: string
  toId: string
  nodes: WorkflowNode[]
  progress: number
  isActive: boolean
  side: 'left' | 'right'
}) {
  const from = getNodePosition(nodes, fromId)
  const to = getNodePosition(nodes, toId)

  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2
  const offset = side === 'left' ? -24 : 24

  const path = `
    M ${from.x} ${from.y}
    Q ${midX + offset} ${midY} ${to.x} ${to.y}
  `

  const pathLength = Math.sqrt(
    Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
  ) * 1.2

  return (
    <g filter="url(#workflow-blur)">
      <motion.path
        d={path}
        stroke="#9AA19E"
        strokeWidth={STROKE_WIDTH}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${pathLength} ${pathLength}`}
        strokeDashoffset={isActive ? progress * pathLength : pathLength}
        style={{
          opacity: isActive ? ACTIVE_OPACITY : INACTIVE_OPACITY,
          filter: `blur(${BASE_BLUR * 0.6}px)`,
        }}
        initial={false}
        animate={{ strokeDashoffset: isActive ? 0 : pathLength }}
        transition={{ duration: isActive ? 3 : 0, ease: 'linear' }}
      />
      {isActive && (
        <motion.circle
          r={2.5}
          fill="#E58B4E"
          style={{
            filter: `blur(${BASE_BLUR * 0.4}px)`,
          }}
          animate={{
            offset: [0, 1],
          }}
          transition={{
            duration: 3,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          <animateMotion
            path={path}
            dur="3s"
            repeatCount="indefinite"
            rotate="auto"
          />
        </motion.circle>
      )}
    </g>
  )
}

function WorkflowNodeComponent({
  node,
  isActive,
  side,
}: {
  node: WorkflowNode
  isActive: boolean
  side: 'left' | 'right'
}) {
  return (
    <g filter="url(#workflow-blur)">
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={NODE_RADIUS}
        fill="none"
        stroke={isActive ? '#E58B4E' : '#9AA19E'}
        strokeWidth={isActive ? 1.5 : STROKE_WIDTH}
        style={{
          opacity: isActive ? ACTIVE_OPACITY : INACTIVE_OPACITY,
          filter: `blur(${BASE_BLUR * 0.6}px)`,
        }}
        animate={{
          scale: isActive ? [1, 1.04, 1] : 1,
          strokeWidth: isActive ? [1.5, 2, 1.5] : STROKE_WIDTH,
        }}
        transition={{
          duration: 2.5,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />
      <g
        transform={`translate(${node.x}, ${node.y})`}
        style={{
          opacity: isActive ? ACTIVE_OPACITY * 1.1 : INACTIVE_OPACITY,
          filter: `blur(${BASE_BLUR * 0.4}px)`,
        }}
      >
        {node.icon}
        <text
          x="0"
          y={NODE_RADIUS + 16}
          textAnchor="middle"
          fill="#9AA19E"
          fontSize="9"
          fontFamily="ui-monospace, SF Mono, Menlo, monospace"
          fontWeight={isActive ? 500 : 400}
          style={{
            filter: `blur(${BASE_BLUR * 0.3}px)`,
          }}
        >
          {node.label}
        </text>
      </g>
    </g>
  )
}

export function WorkflowVisualization({
  side,
  nodes,
  connections,
  animationDelay = 0,
}: WorkflowVisualizationProps) {
  const prefersReduced = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReduced) return

    const sequence = [0, 1, 2, 3]

    let currentStep = 0

    const runSequence = () => {
      if (prefersReduced) return

      setActiveIndex(sequence[currentStep])

      currentStep = (currentStep + 1) % sequence.length

      setTimeout(runSequence, 3800)
    }

    const timer = setTimeout(runSequence, animationDelay)
    return () => clearTimeout(timer)
  }, [animationDelay, prefersReduced])

  const isLeft = side === 'left'

  return (
    <div
      ref={containerRef}
      className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'left-0' : 'right-0'} z-[3] pointer-events-none select-none hidden lg:block`}
      style={{
        opacity: CONTAINER_OPACITY,
        transform: prefersReduced ? 'translateY(-50%)' : 'translateY(-50%)',
        filter: `blur(${BASE_BLUR}px)`,
        maxWidth: isLeft ? '32vw' : '32vw',
        width: isLeft ? '32vw' : '32vw',
      }}
      aria-hidden="true"
    >
      <svg
        width={180}
        height={440}
        viewBox={`0 0 180 440`}
        preserveAspectRatio="none"
        style={{
          transform: isLeft ? 'scaleX(-1)' : 'scaleX(1)',
          transformOrigin: 'center',
        }}
      >
        <defs>
          <filter id="workflow-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={BASE_BLUR / 2} />
          </filter>
          <linearGradient id="edge-fade-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity={0} />
            <stop offset="25%" stopColor="currentColor" stopOpacity={0.6} />
            <stop offset="70%" stopColor="currentColor" stopOpacity={1} />
            <stop offset="100%" stopColor="currentColor" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="edge-fade-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity={1} />
            <stop offset="30%" stopColor="currentColor" stopOpacity={1} />
            <stop offset="75%" stopColor="currentColor" stopOpacity={0.6} />
            <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
          </linearGradient>
          <mask id="edge-mask-left">
            <rect width="100%" height="100%" fill="url(#edge-fade-left)" />
          </mask>
          <mask id="edge-mask-right">
            <rect width="100%" height="100%" fill="url(#edge-fade-right)" />
          </mask>
        </defs>

        <g mask={`url(#edge-mask-${isLeft ? 'left' : 'right'})`}>
          {connections.map((conn, idx) => (
            <ConnectionLine
              key={`${conn.from}-${conn.to}`}
              fromId={conn.from}
              toId={conn.to}
              nodes={nodes}
              progress={(activeIndex - idx) / 4}
              isActive={activeIndex === idx}
              side={side}
            />
          ))}

          {nodes.map((node, idx) => (
            <WorkflowNodeComponent
              key={node.id}
              node={node}
              isActive={activeIndex === idx}
              side={side}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

export function KnowledgeWorkflow() {
  return (
    <WorkflowVisualization
      side="left"
      nodes={KNOWLEDGE_NODES}
      connections={KNOWLEDGE_CONNECTIONS}
      animationDelay={0}
    />
  )
}

export function AutomationWorkflow() {
  return (
    <WorkflowVisualization
      side="right"
      nodes={AUTOMATION_NODES}
      connections={AUTOMATION_CONNECTIONS}
      animationDelay={1900}
    />
  )
}