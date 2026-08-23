'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { MessageSquare, FolderOpen, Layout, Settings, Plus, LogOut } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthContext'
import { Logo } from '@/components/shared/Logo'

interface SidebarProps {
  onNewChat: () => void
}

const navItems = [
  { href: '/dashboard', label: 'Chat', icon: MessageSquare },
  { href: '/dashboard/projects', label: 'Projects', icon: FolderOpen },
  { href: '/dashboard/templates', label: 'Templates', icon: Layout },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ onNewChat }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? 'U'

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <aside className="flex flex-col h-full w-60 flex-shrink-0 border-r border-white/[0.06]" style={{ background: '#08080f' }}>
      {/* Logo */}
      <div className="flex items-center h-[72px] px-6 border-b border-white/[0.04] shrink-0">
        <Logo width={120} height={28} href="/dashboard" />
      </div>

      {/* New Chat */}
      <div className="px-3 pt-4 pb-2">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-white hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))', border: '1px solid rgba(99,102,241,0.25)' }}
        >
          <Plus size={15} className="text-indigo-400" />
          New Chat
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <span className={`sidebar-link ${active ? 'active' : ''}`}>
                <item.icon size={15} />
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* User profile */}
      <div className="px-3 py-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors cursor-default">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">
              {user?.user_metadata?.full_name ?? 'User'}
            </p>
            <p className="text-[10px] text-slate-600 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-600 hover:text-red-400 transition-colors"
            title="Sign out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}
