'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  showAuthModal: boolean
  authTab: 'signin' | 'signup'
  openAuthModal: (tab?: 'signin' | 'signup') => void
  closeAuthModal: () => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  showAuthModal: false,
  authTab: 'signin',
  openAuthModal: () => {},
  closeAuthModal: () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin')
  const supabase = createClient()

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      })
      .catch((err) => {
        console.error('[AuthContext] getSession error:', err)
        setLoading(false)
      })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const openAuthModal = (tab: 'signin' | 'signup' = 'signin') => {
    setAuthTab(tab)
    setShowAuthModal(true)
  }

  const closeAuthModal = () => setShowAuthModal(false)

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, showAuthModal, authTab, openAuthModal, closeAuthModal, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
