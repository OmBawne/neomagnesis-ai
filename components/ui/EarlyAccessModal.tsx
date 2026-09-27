'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Copy, Check, Shield, User, Mail, AtSign, Sparkles } from 'lucide-react'

interface RegistrationResult {
  success: boolean
  error?: string
  launchPassNumber?: string
  name?: string
  email?: string
  username?: string
  registrationDate?: string
}

interface EarlyAccessModalProps {
  isOpen: boolean
  onClose: () => void
}

const overlayVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit:   { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}

const panelVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  show:   { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit:   { opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } },
}

export function EarlyAccessModal({ isOpen, onClose }: EarlyAccessModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [result, setResult] = useState<RegistrationResult | null>(null)
  const [copied, setCopied] = useState(false)

  const firstFieldRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstFieldRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setName('')
        setEmail('')
        setUsername('')
        setStatus('idle')
        setErrorMsg('')
        setResult(null)
        setCopied(false)
      }, 300)
    }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && status !== 'submitting') onClose()
    },
    [onClose, status]
  )

  useEffect(() => {
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleKeyDown])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedUsername = username.trim().toLowerCase().replace(/^@/, '')

    if (!trimmedName || trimmedName.length < 2) {
      setErrorMsg('Please enter your full name.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    if (!trimmedUsername || trimmedUsername.length < 2) {
      setErrorMsg('Please enter a username (minimum 2 characters).')
      return
    }

    const usernameRegex = /^[a-z0-9_.-]{2,32}$/
    if (!usernameRegex.test(trimmedUsername)) {
      setErrorMsg('Username may only contain lowercase letters, numbers, underscores, hyphens, or dots.')
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          username: trimmedUsername,
        }),
      })
      const data: RegistrationResult = await res.json()

      if (data.success) {
        setResult(data)
        setStatus('success')
      } else {
        setErrorMsg(data.error || 'Registration could not be completed. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const handleCopy = () => {
    if (result?.launchPassNumber) {
      navigator.clipboard.writeText(result.launchPassNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const inputClass = `
    w-full py-3.5 pl-11 pr-4 rounded-xl text-sm
    bg-[#141716] border border-[#2A2D2C]
    text-[#FAF8F5] placeholder-[#8E9A94]
    focus:outline-none focus:border-[#E58B4E] focus:ring-1 focus:ring-[#E58B4E]/30
    transition-all duration-150 font-sans
  `

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-[150] cursor-pointer"
            style={{
              background: 'rgba(5, 6, 7, 0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
            onClick={status !== 'submitting' ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Early Access Registration"
            className="fixed inset-0 z-[151] flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              key="panel"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-2xl"
              style={{
                background: 'rgba(15, 17, 18, 0.97)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(241, 239, 232, 0.12)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04) inset',
              }}
            >
              {/* Subtle top copper accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(229, 139, 78, 0.8) 50%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              {/* Close Button */}
              {status !== 'submitting' && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-[#D4DDD8] hover:text-[#FAF8F5] hover:bg-white/[0.06] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              )}

              <div className="p-7 sm:p-9">
                <AnimatePresence mode="wait">
                  {status !== 'success' ? (
                    <motion.div
                      key="form-view"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Header */}
                      <div className="mb-7">
                        <div
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                          style={{
                            background: 'rgba(229, 139, 78, 0.12)',
                            border: '1px solid rgba(229, 139, 78, 0.3)',
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E58B4E]" aria-hidden="true" />
                          <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#FFAE70] font-semibold">
                            Early Access Program
                          </span>
                        </div>
                        <h2 className="text-2xl font-light text-[#FAF8F5] tracking-[-0.02em] mb-2">
                          Claim your Launch Pass.
                        </h2>
                        <p className="text-xs sm:text-sm text-[#D4DDD8] leading-relaxed font-normal">
                          Register for the founding cohort. A unique verified Launch Pass will be issued for your private preview invitation.
                        </p>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        {/* Full Name */}
                        <div>
                          <label
                            htmlFor="modal-name"
                            className="block text-xs font-mono uppercase tracking-[0.15em] text-[#FAF8F5] mb-2 font-semibold"
                          >
                            Full Name
                          </label>
                          <div className="relative flex items-center">
                            <User size={15} className="absolute left-3.5 text-[#8E9A94] pointer-events-none" aria-hidden="true" />
                            <input
                              ref={firstFieldRef}
                              id="modal-name"
                              type="text"
                              required
                              autoComplete="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your full name"
                              className={inputClass}
                              disabled={status === 'submitting'}
                            />
                          </div>
                        </div>

                        {/* Username */}
                        <div>
                          <label
                            htmlFor="modal-username"
                            className="block text-xs font-mono uppercase tracking-[0.15em] text-[#FAF8F5] mb-2 font-semibold"
                          >
                            Username
                          </label>
                          <div className="relative flex items-center">
                            <AtSign size={15} className="absolute left-3.5 text-[#8E9A94] pointer-events-none" aria-hidden="true" />
                            <input
                              id="modal-username"
                              type="text"
                              required
                              autoComplete="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_.-]/g, ''))}
                              placeholder="username"
                              className={inputClass}
                              disabled={status === 'submitting'}
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label
                            htmlFor="modal-email"
                            className="block text-xs font-mono uppercase tracking-[0.15em] text-[#FAF8F5] mb-2 font-semibold"
                          >
                            Email Address
                          </label>
                          <div className="relative flex items-center">
                            <Mail size={15} className="absolute left-3.5 text-[#8E9A94] pointer-events-none" aria-hidden="true" />
                            <input
                              id="modal-email"
                              type="email"
                              required
                              autoComplete="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@domain.com"
                              className={inputClass}
                              disabled={status === 'submitting'}
                            />
                          </div>
                        </div>

                        {/* Inline Error */}
                        <AnimatePresence>
                          {errorMsg && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              role="alert"
                              className="text-xs font-mono text-[#E07A74] bg-[#C9706A]/10 border border-[#C9706A]/30 rounded-xl px-4 py-3 leading-relaxed"
                            >
                              {errorMsg}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <button
                          id="early-access-submit"
                          type="submit"
                          disabled={status === 'submitting'}
                          className="w-full mt-2 py-3.5 rounded-xl text-xs font-mono uppercase tracking-widest font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200 bg-[#FAF8F5] text-[#08090A] hover:bg-white hover:shadow-[0_0_24px_rgba(241,239,232,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                        >
                          {status === 'submitting' ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-[#08090A]/30 border-t-[#08090A] rounded-full animate-spin" aria-hidden="true" />
                              <span>Generating Launch Pass&hellip;</span>
                            </>
                          ) : (
                            <>
                              <span>Register for Early Access</span>
                              <ArrowRight size={14} aria-hidden="true" />
                            </>
                          )}
                        </button>

                        <div className="flex items-center justify-center gap-2 pt-2 text-xs font-mono text-[#D4DDD8]">
                          <Shield size={13} aria-hidden="true" className="text-[#64B889]" />
                          <span>Local-first architecture &middot; Zero telemetry tracking</span>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    /* Launch Pass Success State */
                    <motion.div
                      key="success-view"
                      initial={{ opacity: 0, scale: 0.97, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center"
                    >
                      <div
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
                        style={{
                          background: 'rgba(229, 139, 78, 0.12)',
                          border: '1px solid rgba(229, 139, 78, 0.35)',
                        }}
                      >
                        <Sparkles size={13} className="text-[#FFAE70]" aria-hidden="true" />
                        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#FFAE70] font-semibold">
                          Launch Pass Confirmed
                        </span>
                      </div>

                      <h2 className="text-2xl font-light text-[#FAF8F5] mb-2 tracking-tight">
                        Welcome, {result?.name?.split(' ')[0] || 'Member'}.
                      </h2>
                      <p className="text-xs sm:text-sm text-[#D4DDD8] mb-6 leading-relaxed">
                        Your registration is secured. Here is your official Launch Pass.
                      </p>

                      {/* Official Launch Pass Card */}
                      <div
                        className="rounded-2xl p-5 mb-5 text-left relative overflow-hidden bg-[#0D0F0E] border border-[#E58B4E]/40 shadow-[0_12px_36px_rgba(0,0,0,0.5)]"
                      >
                        {/* Header of pass */}
                        <div
                          className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#232726]"
                        >
                          <span className="text-xs font-mono uppercase tracking-widest text-[#FAF8F5] font-semibold">
                            Neomagnesis OS — Launch Pass
                          </span>
                          <span
                            className="text-xs font-mono text-[#7FA692] px-2.5 py-0.5 rounded-full font-semibold bg-[#5BA87E]/20 border border-[#5BA87E]/50"
                          >
                            Verified
                          </span>
                        </div>

                        {/* Pass ID with copy */}
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <div>
                            <div className="text-xs font-mono text-[#D4DDD8] uppercase mb-1 font-semibold">
                              Pass Identifier
                            </div>
                            <div className="text-3xl sm:text-4xl font-mono font-light text-[#FFAE70] tracking-widest">
                              {result?.launchPassNumber}
                            </div>
                          </div>
                          <button
                            onClick={handleCopy}
                            className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-2 rounded-xl cursor-pointer transition-all hover:bg-white/[0.08] active:scale-[0.98] bg-[#191C1B] border border-[#2A2D2C] text-[#FAF8F5]"
                            aria-label="Copy Launch Pass ID"
                          >
                            {copied ? (
                              <>
                                <Check size={12} className="text-[#64B889]" aria-hidden="true" />
                                <span className="font-semibold text-[#64B889]">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={12} aria-hidden="true" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Detail grid */}
                        <div
                          className="pt-3.5 grid grid-cols-2 gap-3 text-xs font-mono border-t border-[#232726]"
                        >
                          <div>
                            <div className="text-[#D4DDD8] text-[10px] uppercase mb-0.5 font-medium">Name</div>
                            <div className="text-[#FAF8F5] font-semibold truncate">{result?.name}</div>
                          </div>
                          <div>
                            <div className="text-[#D4DDD8] text-[10px] uppercase mb-0.5 font-medium">Username</div>
                            <div className="text-[#FAF8F5] font-semibold truncate">@{result?.username}</div>
                          </div>
                          <div>
                            <div className="text-[#D4DDD8] text-[10px] uppercase mb-0.5 font-medium">Registration Date</div>
                            <div className="text-[#FAF8F5] font-semibold">
                              {result?.registrationDate
                                ? new Date(result.registrationDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })
                                : 'Today'}
                            </div>
                          </div>
                          <div>
                            <div className="text-[#D4DDD8] text-[10px] uppercase mb-0.5 font-medium">Status</div>
                            <div className="text-[#FFAE70] font-semibold">Founding Cohort</div>
                          </div>
                        </div>
                      </div>

                      {/* Explicit confirmation message about dashboard unreleased / arriving later */}
                      <div className="rounded-xl p-3.5 mb-6 bg-white/[0.04] border border-[#2A2D2C] text-left">
                        <p className="text-xs text-[#D4DDD8] leading-relaxed font-normal">
                          The production dashboard and desktop application are under active development. Your private dashboard invitations and alpha build access will arrive directly at <span className="text-[#FAF8F5] font-medium">{result?.email}</span> when invitations roll out.
                        </p>
                      </div>

                      <button
                        onClick={onClose}
                        className="px-8 py-3 rounded-full text-xs font-mono uppercase tracking-widest font-semibold bg-[#FAF8F5] text-[#08090A] hover:bg-white active:scale-[0.98] transition-all cursor-pointer"
                      >
                        Done
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}