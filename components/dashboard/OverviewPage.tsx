'use client'

import { useMemo } from 'react'
import {
  Search,
  Bell,
  ChevronDown,
  Users,
  GitBranch,
  Zap,
  Database,
  Plus,
  MoreHorizontal,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Sparkline from './Sparkline'

// ─── Types ────────────────────────────────────────────────────────────────────
interface User {
  user_metadata?: { full_name?: string }
  email?: string
}

interface OverviewPageProps {
  user: User | null
}

// ─── Time-based greeting ──────────────────────────────────────────────────────
function getGreeting(name: string | null): string {
  const hour = new Date().getHours()
  const salutation =
    hour >= 5 && hour < 12
      ? 'Good Morning'
      : hour >= 12 && hour < 17
      ? 'Good Afternoon'
      : hour >= 17 && hour < 21
      ? 'Good Evening'
      : 'Welcome'

  return name ? `${salutation}, ${name}.` : `${salutation}.`
}

// ─── Analytics card data ──────────────────────────────────────────────────────
const ANALYTICS_CARDS = [
  {
    id: 'agents',
    title: 'Total Agents',
    value: '35',
    icon: Users,
    color: '#3DB882',
    data: [12, 18, 14, 22, 19, 28, 24, 30, 28, 35, 32, 35],
  },
  {
    id: 'workflows1',
    title: 'Active Workflows',
    value: '12',
    icon: GitBranch,
    color: '#8B5CF6',
    data: [5, 8, 6, 10, 7, 9, 11, 8, 12, 10, 11, 12],
  },
  {
    id: 'executions',
    title: 'Active Workflows',
    value: '12',
    icon: Zap,
    color: '#F59E0B',
    data: [8, 6, 9, 5, 11, 7, 10, 8, 12, 9, 11, 12],
  },
  {
    id: 'storage',
    title: 'Storage Used',
    value: '1.2TB',
    icon: Database,
    color: '#3B82F6',
    data: [0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0, 1.05, 1.1, 1.15, 1.2],
  },
]

// ─── Workflow table data ──────────────────────────────────────────────────────
type WorkflowStatus = 'Executing' | 'Queued' | 'Compute'

interface WorkflowRow {
  id: string
  name: string
  sub: string
  creatorInitials: string
  creatorName: string
  creatorColor: string
  status: WorkflowStatus
  timestamp: string
  duration: string
}

const WORKFLOW_ROWS: WorkflowRow[] = [
  {
    id: '1',
    name: 'Analyse-Folder',
    sub: 'Created 3 minurs ago',
    creatorInitials: 'JS',
    creatorName: 'J. Smith',
    creatorColor: '#6366f1',
    status: 'Executing',
    timestamp: 'Apr 14, 2023, 9:15 AM',
    duration: '1h 22m',
  },
  {
    id: '2',
    name: 'Create Workflow',
    sub: 'Created 3 minurs ago',
    creatorInitials: 'AP',
    creatorName: 'A. Patel',
    creatorColor: '#8B5CF6',
    status: 'Queued',
    timestamp: 'Apr 13, 2023, 1:45 PM',
    duration: '1h 22m',
  },
  {
    id: '3',
    name: 'Research Tipes',
    sub: 'Created 2 minurs ago',
    creatorInitials: 'MD',
    creatorName: 'M. Dubois',
    creatorColor: '#0EA5E9',
    status: 'Compute',
    timestamp: 'Apr 13, 2023, 3:35 PM',
    duration: '1h 26m',
  },
  {
    id: '4',
    name: 'Summarde Files',
    sub: 'Created 3 minurs ago',
    creatorInitials: 'SG',
    creatorName: 'S. Garcia',
    creatorColor: '#10B981',
    status: 'Compute',
    timestamp: 'Apr 13, 2023, 3:25 PM',
    duration: '1h 30m',
  },
  {
    id: '5',
    name: 'Analyse-Folder',
    sub: 'Created 3 minurs ago',
    creatorInitials: 'KL',
    creatorName: 'K. Lee',
    creatorColor: '#F59E0B',
    status: 'Compute',
    timestamp: 'Apr 13, 2023, 3:25 PM',
    duration: '1h 32m',
  },
]

// ─── Status pill config ───────────────────────────────────────────────────────
const STATUS_CONFIG: Record<WorkflowStatus, { bg: string; color: string; dot: string }> = {
  Executing: {
    bg: 'rgba(59,130,246,0.14)',
    color: '#60A5FA',
    dot: '#3B82F6',
  },
  Queued: {
    bg: 'rgba(245,158,11,0.14)',
    color: '#FBB724',
    dot: '#F59E0B',
  },
  Compute: {
    bg: 'rgba(52,211,153,0.12)',
    color: '#34D399',
    dot: '#10B981',
  },
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function OverviewPage({ user }: OverviewPageProps) {
  const firstName = useMemo(() => {
    const full = user?.user_metadata?.full_name
    if (!full) return null
    return full.split(' ')[0]
  }, [user])

  const greeting = useMemo(() => getGreeting(firstName), [firstName])

  const initials = useMemo(() => {
    const full = user?.user_metadata?.full_name
    if (full) return full.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    return user?.email?.[0]?.toUpperCase() ?? 'U'
  }, [user])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#0E1112',
        overflow: 'hidden',
      }}
    >
      {/* ── Top Header ──────────────────────────────────────────────────────── */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          height: 60,
          flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          gap: 16,
        }}
      >
        {/* Page title */}
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#F1EFE8',
            letterSpacing: '-0.01em',
            flexShrink: 0,
          }}
        >
          Overview
        </span>

        {/* Search bar — centered */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              width: 320,
              height: 38,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: '0 12px',
              cursor: 'text',
            }}
            whileFocus={{ borderColor: 'rgba(255,255,255,0.18)' }}
          >
            <Search size={13} color="#6B7280" style={{ flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Natural language search..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: 12.5,
                color: '#F1EFE8',
                fontFamily: 'inherit',
              }}
              onFocus={(e) => {
                const parent = e.currentTarget.parentElement
                if (parent) {
                  parent.style.borderColor = 'rgba(255,255,255,0.18)'
                  parent.style.background = 'rgba(255,255,255,0.06)'
                }
              }}
              onBlur={(e) => {
                const parent = e.currentTarget.parentElement
                if (parent) {
                  parent.style.borderColor = 'rgba(255,255,255,0.08)'
                  parent.style.background = 'rgba(255,255,255,0.04)'
                }
              }}
            />
          </motion.div>
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          {/* Notification bell */}
          <div style={{ position: 'relative' }}>
            <button
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Bell size={16} color="#7A8380" />
            </button>
            {/* Red badge */}
            <span
              style={{
                position: 'absolute',
                top: 1,
                right: 1,
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#EF4444',
                border: '1.5px solid #0E1112',
              }}
            />
          </div>

          {/* Avatar + caret */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <ChevronDown size={12} color="#7A8380" />
          </div>
        </div>
      </header>

      {/* ── Scrollable body ──────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 24px 24px' }}>

        {/* ── Greeting ──────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: '#F1EFE8',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              marginBottom: 8,
            }}
          >
            {greeting}
          </h1>
          <p
            style={{
              fontSize: 16,
              color: '#7A8380',
              fontWeight: 400,
              letterSpacing: '-0.005em',
            }}
          >
            Continue optimization or create a new agent.
          </p>
        </div>

        {/* ── Analytics Cards ────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
            marginBottom: 24,
          }}
        >
          {ANALYTICS_CARDS.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
                style={{
                  background: '#141718',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16,
                  padding: '16px 16px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  cursor: 'default',
                }}
              >
                {/* Title row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: '#7A8380',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {card.title}
                  </span>
                  <Icon size={13} color="#4B5563" />
                </div>

                {/* Big number */}
                <span
                  style={{
                    fontSize: 30,
                    fontWeight: 700,
                    color: '#F1EFE8',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    marginBottom: 14,
                  }}
                >
                  {card.value}
                </span>

                {/* Sparkline */}
                <div style={{ marginTop: 'auto' }}>
                  <Sparkline
                    data={card.data}
                    color={card.color}
                    width={160}
                    height={38}
                    strokeWidth={1.5}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Workflows Section ─────────────────────────────────────────────── */}
        <div
          style={{
            background: '#141718',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {/* Section header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px 12px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#F1EFE8',
                letterSpacing: '-0.01em',
              }}
            >
              Workflows
            </span>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 7,
                padding: '4px 10px',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 500,
                color: '#8F9693',
                transition: 'background 0.12s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background =
                  'rgba(255,255,255,0.08)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background =
                  'rgba(255,255,255,0.05)'
              }}
            >
              <Plus size={11} />
              Expand
            </button>
          </div>

          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1.2fr 1fr 1.6fr 0.8fr 0.5fr',
              padding: '8px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            {['Workflow Name', 'Creator', 'Status', 'Timestamp', 'Duration', 'Actions'].map(
              (col) => (
                <span
                  key={col}
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: '#4B5563',
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                  }}
                >
                  {col}
                </span>
              )
            )}
          </div>

          {/* Table rows */}
          {WORKFLOW_ROWS.map((row, i) => (
            <WorkflowRow
              key={row.id}
              row={row}
              isLast={i === WORKFLOW_ROWS.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Workflow table row ───────────────────────────────────────────────────────
function WorkflowRow({ row, isLast }: { row: WorkflowRow; isLast: boolean }) {
  const pill = STATUS_CONFIG[row.status]

  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.025)' }}
      transition={{ duration: 0.1 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.2fr 1fr 1.6fr 0.8fr 0.5fr',
        padding: '9px 18px',
        alignItems: 'center',
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)',
        cursor: 'default',
      }}
    >
      {/* Workflow name + sub */}
      <div>
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 500,
            color: '#E5E3DC',
            letterSpacing: '-0.005em',
          }}
        >
          {row.name}
        </div>
        <div style={{ fontSize: 10, color: '#4B5563', marginTop: 1 }}>
          {row.sub}
        </div>
      </div>

      {/* Creator avatar + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: row.creatorColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 8,
            fontWeight: 700,
            color: '#fff',
            flexShrink: 0,
            opacity: 0.9,
          }}
        >
          {row.creatorInitials}
        </div>
        <span style={{ fontSize: 11.5, color: '#9CA3AF' }}>{row.creatorName}</span>
      </div>

      {/* Status pill */}
      <div>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 8px',
            borderRadius: 20,
            background: pill.bg,
            fontSize: 10.5,
            fontWeight: 500,
            color: pill.color,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: pill.dot,
              flexShrink: 0,
              display: 'block',
            }}
          />
          {row.status}
        </span>
      </div>

      {/* Timestamp */}
      <span style={{ fontSize: 11, color: '#6B7280' }}>{row.timestamp}</span>

      {/* Duration */}
      <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}>
        {row.duration}
      </span>

      {/* Actions */}
      <div>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '3px 4px',
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <MoreHorizontal size={14} color="#4B5563" />
        </button>
      </div>
    </motion.div>
  )
}
