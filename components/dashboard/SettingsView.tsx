'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, LogOut, Check, Eye, EyeOff, Palette, Moon, Sun } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthContext'
import { useTheme } from '@/lib/theme'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Tab = 'profile' | 'security' | 'appearance'

export default function SettingsView() {
  const { user, signOut } = useAuth()
  const { theme, setTheme } = useTheme()
  const [tab, setTab] = useState<Tab>('profile')
  const router = useRouter()
  const supabase = createClient()

  // Profile
  const [displayName, setDisplayName] = useState(user?.user_metadata?.full_name ?? '')
  const [profileSaved, setProfileSaved] = useState(false)

  // Security
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSaved, setPwSaved] = useState(false)
  const [pwLoading, setPwLoading] = useState(false)

  const saveProfile = async () => {
    await supabase.auth.updateUser({ data: { full_name: displayName } })
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2000)
  }

  const changePassword = async () => {
    setPwError('')
    if (newPw.length < 8) { setPwError('Password must be at least 8 characters.'); return }
    if (!/[0-9]/.test(newPw)) { setPwError('Must include a number.'); return }
    if (!/[^A-Za-z0-9]/.test(newPw)) { setPwError('Must include a symbol.'); return }
    if (newPw !== confirmPw) { setPwError('Passwords do not match.'); return }
    setPwLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPw })
    setPwLoading(false)
    if (error) { setPwError(error.message); return }
    setPwSaved(true)
    setNewPw(''); setConfirmPw('')
    setTimeout(() => setPwSaved(false), 2500)
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Lock },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-slate-200 dark:border-white/[0.06]">
        <h1 className="text-base font-semibold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-xs text-slate-600 dark:text-slate-500 mt-0.5">Manage your account preferences</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Tab list */}
        <div className="w-48 border-r border-slate-200 dark:border-white/[0.06] p-4 space-y-1 flex-shrink-0">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`sidebar-link w-full ${tab === t.id ? 'active' : ''}`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/[0.06]">
            <button
              onClick={handleLogout}
              className="sidebar-link w-full text-red-500/70 hover:text-red-400 hover:bg-red-500/10"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {tab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg space-y-6"
            >
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Profile Information</h2>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                  >
                    {displayName?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{displayName || 'Your Name'}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-500">{user?.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Display Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={e => setDisplayName(e.target.value)}
                      className="neo-input"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Email Address</label>
                    <input
                      type="email"
                      value={user?.email ?? ''}
                      disabled
                      className="neo-input opacity-50 cursor-not-allowed"
                    />
                    <p className="text-[10px] text-slate-600 mt-1">Email cannot be changed here. Contact support.</p>
                  </div>
                  <button
                    onClick={saveProfile}
                    className="btn-primary"
                  >
                    {profileSaved ? <><Check size={13} /> Saved</> : 'Save Changes'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {tab === 'appearance' && (
            <motion.div
              key="appearance"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg space-y-6"
            >
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Appearance</h2>
                <p className="text-xs text-slate-600 dark:text-slate-500 mb-6">Choose how Neomagnesis AI looks to you. Your preference is saved locally.</p>

                <div className="space-y-3">
                  {/* Dark mode option */}
                  <button
                    onClick={() => setTheme('dark')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                      theme === 'dark'
                        ? 'border-indigo-500/40 bg-indigo-500/10'
                        : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      theme === 'dark' ? 'bg-indigo-500/20 border border-indigo-500/30' : 'bg-white/[0.05] border border-white/[0.08]'
                    }`}>
                      <Moon size={16} className={theme === 'dark' ? 'text-indigo-400' : 'text-slate-500'} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>Dark Mode</p>
                      <p className="text-xs text-slate-500 dark:text-slate-600 mt-0.5">Easy on the eyes, great for low-light environments</p>
                    </div>
                    {theme === 'dark' && (
                      <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                  </button>

                  {/* Light mode option */}
                  <button
                    onClick={() => setTheme('light')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                      theme === 'light'
                        ? 'border-indigo-500/40 bg-indigo-500/10'
                        : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      theme === 'light' ? 'bg-indigo-500/20 border border-indigo-500/30' : 'bg-white/[0.05] border border-white/[0.08]'
                    }`}>
                      <Sun size={16} className={theme === 'light' ? 'text-indigo-400' : 'text-slate-500'} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${theme === 'light' ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400'}`}>Light Mode</p>
                      <p className="text-xs text-slate-500 dark:text-slate-600 mt-0.5">Clean, minimal, and great for daytime use</p>
                    </div>
                    {theme === 'light' && (
                      <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {tab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg space-y-6"
            >
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">New Password</label>
                    <div className="relative">
                      <input
                        type={showNew ? 'text' : 'password'}
                        value={newPw}
                        onChange={e => setNewPw(e.target.value)}
                        className="neo-input pr-10"
                        placeholder="Min 8 chars, include number + symbol"
                      />
                      <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400">
                        {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPw}
                      onChange={e => setConfirmPw(e.target.value)}
                      className="neo-input"
                      placeholder="Repeat new password"
                    />
                  </div>

                  {pwError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <p className="text-xs text-red-400">{pwError}</p>
                    </div>
                  )}
                  {pwSaved && (
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-xs text-green-400">Password updated successfully.</p>
                    </div>
                  )}

                  <button
                    onClick={changePassword}
                    disabled={pwLoading}
                    className="btn-primary disabled:opacity-50"
                  >
                    {pwLoading ? 'Updating...' : pwSaved ? <><Check size={13} /> Updated</> : 'Update Password'}
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-white/[0.06]">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Danger Zone</h3>
                <p className="text-xs text-slate-600 dark:text-slate-500 mb-4">Sign out of your account on this device.</p>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-400 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all"
                >
                  <LogOut size={13} /> Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
