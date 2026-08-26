'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Bot,
  Users,
  GitBranch,
  Play,
  FolderOpen,
  Plug,
  Shield,
  Settings,
  Cpu,
  MemoryStick,
  HardDrive,
} from 'lucide-react'

// ─── Navigation items (exact order from mockup) ──────────────────────────────
const NAV_ITEMS = [
  { href: '/dashboard',              label: 'Overview',     icon: LayoutDashboard },
  { href: '/dashboard/assistant',    label: 'AI Assistant', icon: Bot },
  { href: '/dashboard/agents',       label: 'Agents',       icon: Users },
  { href: '/dashboard/workflows',    label: 'Workflows',    icon: GitBranch },
  { href: '/dashboard/executions',   label: 'Executions',   icon: Play },
  { href: '/dashboard/files',        label: 'Files',        icon: FolderOpen },
  { href: '/dashboard/integrations', label: 'Integrations', icon: Plug },
  { href: '/dashboard/security',     label: 'Security',     icon: Shield },
  { href: '/dashboard/settings',     label: 'Settings',     icon: Settings },
]

// ─── System health mock data ──────────────────────────────────────────────────
const SYSTEM_STATS = [
  { label: 'CPU',     value: '22%',  icon: Cpu },
  { label: 'RAM',     value: '64%',  icon: MemoryStick },
  { label: 'Storage', value: '45%',  icon: HardDrive },
]

interface SidebarProps {
  /** Legacy prop kept for layout compatibility */
  onNewChat?: () => void
}

export default function Sidebar({ onNewChat }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      style={{
        width: 148,
        minWidth: 148,
        flexShrink: 0,
        background: '#141718',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        borderRadius: '24px 0 0 24px',
      }}
    >
      {/* ── Branding ─────────────────────────────────────────────────────── */}
      <div style={{ padding: '20px 14px 16px' }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#F1EFE8',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}
        >
          Neomagnesis AI
        </span>
      </div>

      {/* ── System Health ─────────────────────────────────────────────────── */}
      <div
        style={{
          margin: '0 10px 14px',
          borderRadius: 10,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '10px 10px',
        }}
      >
        {/* Label row */}
        <div
          style={{
            fontSize: 8.5,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#8F9693',
            marginBottom: 6,
          }}
        >
          SYSTEM HEALTH:{' '}
          <span style={{ color: '#4ADE80' }}>OPTIMAL (100%)</span>
        </div>

        {/* Active row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            marginBottom: 8,
          }}
        >
          {/* Green pulse dot */}
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#4ADE80',
              boxShadow: '0 0 4px rgba(74,222,128,0.6)',
              flexShrink: 0,
              display: 'block',
            }}
          />
          <span style={{ fontSize: 9.5, color: '#D8D6CF', fontWeight: 500 }}>
            Local Engine Active
          </span>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {SYSTEM_STATS.map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 9, color: '#8F9693', fontWeight: 500 }}>
                {s.label}
              </span>
              <span style={{ fontSize: 9, color: '#D8D6CF', fontWeight: 600 }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isActive}
            />
          )
        })}
      </nav>
    </aside>
  )
}

// ─── Individual nav item ──────────────────────────────────────────────────────
function NavItem({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string
  label: string
  icon: React.ElementType
  active: boolean
}) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(href)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        padding: '6px 8px',
        borderRadius: 7,
        border: 'none',
        background: active ? 'rgba(241,239,232,0.09)' : 'transparent',
        color: active ? '#F1EFE8' : '#7A8380',
        cursor: 'pointer',
        fontSize: 12.5,
        fontWeight: active ? 500 : 400,
        letterSpacing: '0.005em',
        textAlign: 'left',
        marginBottom: 1,
        transition: 'background 0.12s ease, color 0.12s ease',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          ;(e.currentTarget as HTMLButtonElement).style.background =
            'rgba(255,255,255,0.04)'
          ;(e.currentTarget as HTMLButtonElement).style.color = '#C5C3BC'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
          ;(e.currentTarget as HTMLButtonElement).style.color = '#7A8380'
        }
      }}
    >
      <Icon size={14} style={{ flexShrink: 0, opacity: active ? 1 : 0.7 }} />
      {label}
    </button>
  )
}
