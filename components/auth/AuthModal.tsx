'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { useAuth } from './AuthContext'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/shared/Logo'

function getStrength(password: string): { score: number; label: string; color: string } {
  let score = 0
  if (password.length >= 8) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (password.length >= 12) score++
  const map = [
    { label: '', color: '#181B1A' },
    { label: 'Weak', color: '#ef4444' },
    { label: 'Fair', color: '#eab308' },
    { label: 'Good', color: '#8F9693' },
    { label: 'Strong', color: '#F1EFE8' },
  ]
  return { score, ...map[score] }
}

function validate(email: string, password: string, name: string, isSignup: boolean) {
  const errors: string[] = []
  if (isSignup && !name.trim()) errors.push('Name is required.')
  if (!email.includes('@')) errors.push('Enter a valid email.')
  if (password.length < 8) errors.push('Password must be at least 8 characters.')
  if (!/[0-9]/.test(password)) errors.push('Password must include a number.')
  if (!/[^A-Za-z0-9]/.test(password)) errors.push('Password must include a symbol.')
  return errors
}

export default function AuthModal() {
  const { showAuthModal, closeAuthModal, authTab } = useAuth()
  const [tab, setTab] = useState<'signin' | 'signup'>(authTab)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const overlayRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => { setTab(authTab) }, [authTab])
  useEffect(() => {
    setErrors([]); setMessage(''); setName(''); setEmail(''); setPassword('')
  }, [tab, showAuthModal])

  const strength = getStrength(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[Auth] Login button clicked')
    const errs = validate(email, password, name, tab === 'signup')
    if (errs.length) { setErrors(errs); return }
    setErrors([])
    setLoading(true)

    try {
      if (tab === 'signup') {
        console.log('[Auth] Before supabase.auth.signUp')
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        console.log('[Auth] After Supabase response (signUp):', { data, error })
        if (error) {
          setErrors([error.message])
          return
        }
        if (data.session) {
          closeAuthModal()
          router.push('/dashboard')
          router.refresh()
        } else {
          setMessage('Check your email to confirm your account before logging in.')
        }
      } else {
        console.log('[Auth] Before supabase.auth.signInWithPassword')
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        console.log('[Auth] After Supabase response (signInWithPassword):', { data, error })
        if (error) {
          setErrors([error.message])
          return
        }
        closeAuthModal()
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err: any) {
      console.error('[Auth] Inside catch:', err)
      setErrors([err?.message || 'An unexpected error occurred during authentication.'])
    } finally {
      console.log('[Auth] Inside finally')
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    console.log('[Auth] Google login button clicked')
    setErrors([])
    setLoading(true)
    try {
      console.log('[Auth] Before supabase.auth.signInWithOAuth')
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      console.log('[Auth] After Supabase response (signInWithOAuth):', { data, error })
      if (error) {
        setErrors([error.message])
      }
    } catch (err: any) {
      console.error('[Auth] Inside catch (Google OAuth):', err)
      setErrors([err?.message || 'Failed to sign in with Google.'])
    } finally {
      console.log('[Auth] Inside finally (Google OAuth)')
      setLoading(false)
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeAuthModal()
  }

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md mx-auto bg-[#111312] border border-[rgba(143,150,147,0.18)] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={closeAuthModal}
              className="absolute top-5 right-5 text-[#8F9693] hover:text-[#F1EFE8] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Logo + Title */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <Logo width={140} height={32} />
              </div>
              <h2 className="text-xl font-light text-[#F1EFE8]">
                {tab === 'signin' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="text-xs text-[#8F9693] mt-1 font-mono">
                {tab === 'signin' ? 'Sign in to access your autonomous workspace' : 'Deploy intelligent workflows with Neomagnesis'}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex rounded-lg bg-[#181B1A] border border-[rgba(143,150,147,0.12)] p-1 mb-6">
              {(['signin', 'signup'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2 text-xs font-mono rounded-md font-medium transition-all duration-200 cursor-pointer ${
                    tab === t
                      ? 'bg-[#111312] text-[#F1EFE8] border border-[rgba(143,150,147,0.2)] shadow-sm'
                      : 'text-[#8F9693] hover:text-[#D8D6CF]'
                  }`}
                >
                  {t === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border border-[rgba(143,150,147,0.15)] bg-[#181B1A] text-[#D8D6CF] text-xs font-mono font-medium hover:border-[rgba(143,150,147,0.3)] hover:text-[#F1EFE8] transition-all mb-5 cursor-pointer disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-[rgba(143,150,147,0.12)]" />
              <span className="text-[11px] font-mono text-[#8F9693]">or email</span>
              <div className="flex-1 h-px bg-[rgba(143,150,147,0.12)]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-3.5">
                {tab === 'signup' && (
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F9693]" />
                    <input
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-[#181B1A] border border-[rgba(143,150,147,0.15)] rounded-lg py-2.5 pl-10 pr-3.5 text-xs text-[#F1EFE8] placeholder:text-[#8F9693] outline-none focus:border-[#8F9693] transition-colors font-mono"
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F9693]" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#181B1A] border border-[rgba(143,150,147,0.15)] rounded-lg py-2.5 pl-10 pr-3.5 text-xs text-[#F1EFE8] placeholder:text-[#8F9693] outline-none focus:border-[#8F9693] transition-colors font-mono"
                  />
                </div>

                <div>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F9693]" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      placeholder="Password (min 8 chars, 1 num, 1 sym)"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-[#181B1A] border border-[rgba(143,150,147,0.15)] rounded-lg py-2.5 pl-10 pr-10 text-xs text-[#F1EFE8] placeholder:text-[#8F9693] outline-none focus:border-[#8F9693] transition-colors font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8F9693] hover:text-[#D8D6CF] cursor-pointer"
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {/* Strength indicator */}
                  {tab === 'signup' && password.length > 0 && (
                    <div className="mt-2.5">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map(i => (
                          <div
                            key={i}
                            className="h-1 flex-1 rounded-sm transition-all duration-300"
                            style={{
                              backgroundColor: i <= strength.score ? strength.color : '#181B1A',
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-[11px] font-mono" style={{ color: strength.color }}>{strength.label}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Errors */}
              {errors.length > 0 && (
                <div className="mt-4 p-3 rounded-lg bg-rose-950/30 border border-rose-800/30">
                  {errors.map((e, i) => (
                    <p key={i} className="text-xs text-rose-400 font-mono">{e}</p>
                  ))}
                </div>
              )}

              {/* Success */}
              {message && (
                <div className="mt-4 p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/30">
                  <p className="text-xs text-emerald-400 font-mono">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-5 py-3 rounded-lg bg-[#F1EFE8] text-[#080909] text-xs font-mono font-medium hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Processing...' : tab === 'signup' ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-xs text-[#8F9693] font-mono mt-5">
              {tab === 'signin' ? "Don't have an account? " : 'Already registered? '}
              <button
                onClick={() => setTab(tab === 'signin' ? 'signup' : 'signin')}
                className="text-[#F1EFE8] hover:underline transition-colors cursor-pointer"
              >
                {tab === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
