'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Sidebar from '@/components/dashboard/Sidebar'
import { Logo } from '@/components/shared/Logo'

const ChatResetContext = createContext<{ chatKey: number; newChat: () => void }>({ chatKey: 0, newChat: () => { } })
export const useChatReset = () => useContext(ChatResetContext)

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
      <div className="min-h-screen flex items-center justify-center bg-base">
        <div className="flex flex-col items-center gap-4">
          <Logo width={160} height={36} className="opacity-80 animate-pulse" />
          <p className="text-slate-600 text-sm">Loading workspace...</p>
        </div>
      </div>
    )
  }

  return (
    <ChatResetContext.Provider value={{ chatKey, newChat: () => { setChatKey(k => k + 1); router.push('/dashboard') } }}>
      <div className="flex h-screen bg-base overflow-hidden">
        <Sidebar onNewChat={() => { setChatKey(k => k + 1); router.push('/dashboard') }} />
        <main className="flex-1 overflow-hidden flex flex-col">
          {children}
        </main>
      </div>
    </ChatResetContext.Provider>
  )
}
