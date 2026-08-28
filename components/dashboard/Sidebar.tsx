'use client'

import { useState, useEffect } from 'react'
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
import { getAllSystemMetrics, type SystemMetrics } from '@/lib/system'

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

// ─── System stat display config ───────────────────────────────────────────────
const STAT_DISPLAY = [
  { label: 'CPU',     key: 'cpu'     as keyof SystemMetrics, icon: Cpu },
  { label: 'RAM',     key: 'ram'     as keyof SystemMetrics, icon: MemoryStick },
  { label: 'Storage', key: 'storage' as keyof SystemMetrics, icon: HardDrive },
]

interface SidebarProps {
  /** Legacy prop kept for layout compatibility */
  onNewChat?: () => void
}

export default function Sidebar({ onNewChat }: SidebarProps) {
  const pathname = usePathname()

  // ── System metrics — sourced exclusively from lib/system.ts ──────────────
  // Initial state shows detecting labels until the service resolves.
  // On Tauri migration, getAllSystemMetrics() will return real values
  // from Rust invoke() commands without any change to this component.
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 'Detecting CPU…',
    ram: 'Detecting Memory…',
    storage: 'Detecting Storage…',
    engineStatus: 'detecting',
  })

  useEffect(() => {
    // Load metrics from the system service on mount.
    // In the browser this returns honest loading states.
    // TODO (Tauri): getAllSystemMetrics() will become async once Rust
    // invoke() commands are wired — update to: setMetrics(await getAllSystemMetrics())
    const result = getAllSystemMetrics()
    setMetrics(result)
  }, [])

  const engineActive = metrics.engineStatus === 'active'
  const engineLabel = metrics.engineStatus === 'detecting'
    ? 'Detecting Engine…'
    : engineActive
    ? 'Local Engine Active'
    : 'Engine Offline'

  const engineDotColor = metrics.engineStatus === 'detecting'
    ? '#8F9693'
    : engineActive
    ? '#4ADE80'
    : '#EF4444'

  const engineDotShadow = engineActive
    ? '0 0 4px rgba(74,222,128,0.6)'
    : 'none'

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
          SYSTEM HEALTH
        </div>

        {/* Engine status row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            marginBottom: 8,
          }}
        >
          {/* Status dot */}
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: engineDotColor,
              boxShadow: engineDotShadow,
              flexShrink: 0,
              display: 'block',
              transition: 'background 0.3s ease',
            }}
          />
          <span style={{ fontSize: 9.5, color: '#D8D6CF', fontWeight: 500 }}>
            {engineLabel}
          </span>
        </div>

        {/* Stats — sourced from lib/system.ts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {STAT_DISPLAY.map((s) => {
            const value = metrics[s.key] as string
            return (
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
                <span
                  style={{
                    fontSize: 9,
                    color: value.startsWith('Detecting') ? '#4B5563' : '#D8D6CF',
                    fontWeight: 600,
                    fontStyle: value.startsWith('Detecting') ? 'italic' : 'normal',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {value}
                </span>
              </div>
            )
          })}
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
