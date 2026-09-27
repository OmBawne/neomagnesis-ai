'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react'

interface DeleteRegistrationModalProps {
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

export function DeleteRegistrationModal({ isOpen, onClose }: DeleteRegistrationModalProps) {
  const [email, setEmail]     = useState('')
  const [status, setStatus]   = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

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
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setEmail('')
        setStatus('idle')
        setErrorMsg('')
      }, 300)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter your registration email address.')
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch('/api/delete-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()

      if (data.success) {
        setStatus('success')
      } else {
        setErrorMsg(data.error || 'Unable to process deletion. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="delete-backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-[150] cursor-pointer"
            style={{ background: 'rgba(4, 5, 5, 0.88)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
            onClick={status !== 'submitting' ? onClose : undefined}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Delete Registration"
            className="fixed inset-0 z-[151] flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              key="delete-panel"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="pointer-events-auto relative w-full max-w-md rounded-2xl p-7 sm:p-9 overflow-hidden"
              style={{
                background: 'rgba(15, 17, 18, 0.97)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(168, 75, 75, 0.4)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04) inset',
              }}
            >
              {/* Top danger rim */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(168,75,75,0.7) 50%, transparent 90%)' }}
                aria-hidden="true"
              />

              {status !== 'submitting' && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-[#D4DDD8] hover:text-[#FAF8F5] hover:bg-white/[0.06] transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              )}

              <AnimatePresence mode="wait">
                {status !== 'success' ? (
                  <motion.div key="del-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="mb-7">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                        style={{ background: 'rgba(168,75,75,0.14)', border: '1px solid rgba(168,75,75,0.35)' }}
                      >
                        <Trash2 size={18} className="text-[#C9706A]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-light text-[#FAF8F5] mb-2 tracking-tight">Delete Registration</h2>
                      <p className="text-xs sm:text-sm text-[#D4DDD8] leading-relaxed">
                        Enter the email you registered with. All associated data, including your Launch Pass, will be permanently removed.
                      </p>
                    </div>

                    {/* Warning */}
                    <div
                      className="flex items-start gap-3 p-3.5 rounded-xl mb-6"
                      style={{ background: 'rgba(168,75,75,0.1)', border: '1px solid rgba(168,75,75,0.25)' }}
                    >
                      <AlertTriangle size={15} className="text-[#C9706A] shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-xs text-[#D4DDD8] leading-relaxed">
                        This action is irreversible. Your Launch Pass number cannot be recovered or reassigned.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      <div>
                        <label htmlFor="delete-email" className="block text-xs font-mono uppercase tracking-[0.15em] text-[#FAF8F5] mb-2 font-semibold">
                          Registration Email
                        </label>
                        <div className="relative flex items-center">
                          <Mail size={15} className="absolute left-3.5 text-[#8E9A94] pointer-events-none" aria-hidden="true" />
                          <input
                            id="delete-email"
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full py-3.5 pl-11 pr-4 rounded-xl text-sm bg-[#141716] border border-[#2A2D2C] text-[#FAF8F5] placeholder-[#8E9A94] focus:outline-none focus:border-[#C9706A] focus:ring-1 focus:ring-[#C9706A]/30 transition-all font-sans"
                            disabled={status === 'submitting'}
                          />
                        </div>
                      </div>

                      <AnimatePresence>
                        {errorMsg && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            role="alert"
                            className="text-xs font-mono text-[#E07A74] bg-[#C9706A]/10 border border-[#C9706A]/30 rounded-xl px-4 py-3"
                          >
                            {errorMsg}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        id="delete-registration-submit"
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full mt-2 py-3.5 rounded-xl text-xs font-mono uppercase tracking-widest font-semibold cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 transition-all duration-200 bg-[#A84B4B] hover:bg-[#B95555] text-white active:scale-[0.98]"
                      >
                        {status === 'submitting' ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
                            <span>Processing&hellip;</span>
                          </>
                        ) : (
                          <>
                            <Trash2 size={14} aria-hidden="true" />
                            <span>Permanently Delete Registration</span>
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="del-success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center py-4"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: 'rgba(61,107,82,0.18)', border: '1px solid rgba(61,107,82,0.45)' }}
                    >
                      <CheckCircle2 size={24} className="text-[#64B889]" aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl font-light text-[#FAF8F5] mb-2 tracking-tight">Registration Removed</h2>
                    <p className="text-xs sm:text-sm text-[#D4DDD8] leading-relaxed mb-7 font-normal">
                      All data associated with <span className="text-[#FAF8F5] font-semibold">{email}</span> has been permanently deleted. Your Launch Pass has been invalidated.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-8 py-3 rounded-full text-xs font-mono uppercase tracking-widest font-semibold bg-[#FAF8F5] text-[#08090A] hover:bg-white active:scale-[0.98] transition-all cursor-pointer"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}