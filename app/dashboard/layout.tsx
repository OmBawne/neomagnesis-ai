'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Sidebar from '@/components/dashboard/Sidebar'
import AIRail from '@/components/dashboard/AIRail'
import { Logo } from '@/components/shared/Logo'
import { ChatResetContext } from '@/lib/chat-reset-context'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [chatKey, setChatKey] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace('/')
      else setChecking(false)
    })
  }, [])

  if (checking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#E8ECE8',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <Logo width={160} height={36} className="opacity-80 animate-pulse" />
          <p style={{ color: '#6B7280', fontSize: 13 }}>Loading workspace...</p>
        </div>
      </div>
    )
  }

  return (
    <ChatResetContext.Provider
      value={{
        chatKey,
        newChat: () => {
          setChatKey((k) => k + 1)
          router.push('/dashboard')
        },
      }}
    >
      {/* ── Outer canvas ────────────────────────────────────────────────────── */}
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          background: '#E8ECE8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 48px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 0,
        }}
      >
        {/* ── Floating dashboard window ────────────────────────────────────── */}
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            height: 'calc(100vh - 64px)',
            maxHeight: 900,
            minHeight: 600,
            borderRadius: 26,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            boxShadow:
              '0 2px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.14), 0 32px 64px rgba(0,0,0,0.22)',
          }}
        >
          {/* Sidebar */}
          <Sidebar
            onNewChat={() => {
              setChatKey((k) => k + 1)
              router.push('/dashboard')
            }}
          />

          {/* Main content */}
          <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>

          {/* AI Assistant rail */}
          <AIRail />
        </div>
      </div>
    </ChatResetContext.Provider>
  )
}
