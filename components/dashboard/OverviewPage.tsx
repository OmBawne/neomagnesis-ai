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
} from 'lucide-react'
import { motion } from 'framer-motion'
import Sparkline from './Sparkline'
import { getStorageUsage } from '@/lib/system'

// ─── Types ────────────────────────────────────────────────────────────────────
interface User {
  user_metadata?: { full_name?: string }
  email?: string
}

interface OverviewPageProps {
  user: User | null
}

// ─── Time-based greeting ──────────────────────────────────────────────────────
// Uses local device time — no server time dependency.
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

// ─── Analytics cards — real application state ─────────────────────────────────
// Values reflect actual data. When no data exists, display 0.
// Never display invented analytics.
//
// TODO (Tauri / backend):
// Replace these values with real queries once a data layer exists:
//   - Total Agents: query local agent registry
//   - Active Workflows: query workflow engine
//   - Running Tasks: query task executor
//   - Storage: invoke('get_storage_usage') via lib/system.ts
const ANALYTICS_CARDS = [
  {
    id: 'agents',
    title: 'Total Agents',
    value: '0',
    icon: Users,
    color: '#3DB882',
    // Sparkline data zeroed — no agents registered yet
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: 'workflows',
    title: 'Active Workflows',
    value: '0',
    icon: GitBranch,
    color: '#8B5CF6',
    // Sparkline data zeroed — no active workflows
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: 'tasks',
    title: 'Running Tasks',
    value: '0',
    icon: Zap,
    color: '#F59E0B',
    // Sparkline data zeroed — no running tasks
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: 'storage',
    title: 'Storage Used',
    // Sourced from lib/system.ts — honest detecting state in browser,
    // will show real value after Tauri migration.
    value: getStorageUsage(),
    icon: Database,
    color: '#3B82F6',
    // Sparkline data zeroed — will be populated by Tauri storage history
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
]

// ─── Status pill config ───────────────────────────────────────────────────────
type WorkflowStatus = 'Executing' | 'Queued' | 'Compute'

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

  // Real workflows — empty array until actual data exists.
  // Replace with a real data fetch (Supabase query / Tauri invoke) when ready.
  // TODO: const workflows = await supabase.from('workflows').select('*').eq('user_id', user.id)
  const workflows: never[] = []

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

        {/* Search bar — centered, refined vertical alignment */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              width: 320,
              height: 34,
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
                lineHeight: 1,
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

                {/* Value */}
                <span
                  style={{
                    fontSize: card.value.startsWith('Detecting') ? 11 : 30,
                    fontWeight: 700,
                    color: card.value.startsWith('Detecting') ? '#4B5563' : '#F1EFE8',
                    letterSpacing: card.value.startsWith('Detecting') ? '0' : '-0.03em',
                    fontStyle: card.value.startsWith('Detecting') ? 'italic' : 'normal',
                    lineHeight: 1,
                    marginBottom: 14,
                  } as React.CSSProperties}
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

            <motion.button
              whileHover={{ background: 'rgba(255,255,255,0.08)' } as any}
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
              }}
            >
              <Plus size={11} />
              Expand
            </motion.button>
          </div>

          {/* Table — renders real data or premium empty state */}
          {workflows.length > 0 ? (
            <>
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

              {/* Workflow rows — mapped from real data */}
              {workflows.map((row: any, i: number) => (
                <WorkflowTableRow
                  key={row.id}
                  row={row}
                  isLast={i === workflows.length - 1}
                />
              ))}
            </>
          ) : (
            <WorkflowEmptyState />
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Workflow table row — renders real workflow data ──────────────────────────
// Shape matches a future Supabase or Tauri workflow record.
interface WorkflowRowData {
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

function WorkflowTableRow({ row, isLast }: { row: WorkflowRowData; isLast: boolean }) {
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

      {/* Creator */}
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
          <span style={{ fontSize: 14, color: '#4B5563', lineHeight: 1 }}>⋯</span>
        </button>
      </div>
    </motion.div>
  )
}

// ─── Premium empty state ──────────────────────────────────────────────────────
// Shown when zero workflows exist. No fake data, no placeholders.
function WorkflowEmptyState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '52px 24px',
        gap: 0,
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 18,
        }}
      >
        <GitBranch size={20} color="#4B5563" />
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#E5E3DC',
          letterSpacing: '-0.01em',
          marginBottom: 8,
          textAlign: 'center',
        }}
      >
        No workflows yet
      </h3>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 12.5,
          color: '#4B5563',
          fontWeight: 400,
          textAlign: 'center',
          lineHeight: 1.6,
          maxWidth: 280,
          marginBottom: 24,
        }}
      >
        Create your first AI workflow to start automating tasks.
      </p>

      {/* Create Workflow CTA */}
      <motion.button
        whileHover={{
          background: 'rgba(241,239,232,0.14)',
          borderColor: 'rgba(241,239,232,0.18)',
          y: -1,
          transition: { duration: 0.15 },
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(241,239,232,0.07)',
          border: '1px solid rgba(241,239,232,0.12)',
          borderRadius: 9,
          padding: '8px 18px',
          cursor: 'pointer',
          fontSize: 12.5,
          fontWeight: 500,
          color: '#E5E3DC',
          letterSpacing: '-0.005em',
        }}
      >
        <Plus size={13} />
        Create Workflow
      </motion.button>
    </div>
  )
}
