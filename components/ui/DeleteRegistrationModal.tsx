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
        setEmail(''); setStatus('idle'); setErrorMsg('')
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
            style={{ background: 'rgba(4, 5, 5, 0.88)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
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
              className="pointer-events-auto relative w-full max-w-md rounded-3xl p-8 modal-glass"
              style={{
                border: '1px solid rgba(168, 75, 75, 0.35)',
              }}
            >
              {/* Top danger rim */}
              <div
                className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
                style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(168,75,75,0.5) 50%, transparent 90%)' }}
                aria-hidden="true"
              />

              {status !== 'submitting' && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-[#A6B2AC] hover:text-[#FAF8F5] hover:bg-white/[0.04] transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              )}

              <AnimatePresence mode="wait">
                {status !== 'success' ? (
                  <motion.div key="del-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="mb-7">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                        style={{ background: 'rgba(168,75,75,0.12)', border: '1px solid rgba(168,75,75,0.3)' }}
                      >
                        <Trash2 size={18} className="text-[#C9706A]" aria-hidden="true" />
                      </div>
                      <h2 className="text-xl font-light text-[#FAF8F5] mb-2">Delete Registration</h2>
                      <p className="text-sm text-[#C8D0CC] leading-relaxed">
                        Enter the email you registered with. All associated data, including your Launch Pass, will be permanently removed.
                      </p>
                    </div>

                    {/* Warning */}
                    <div className="flex items-start gap-3 p-3.5 rounded-xl mb-6"
                      style={{ background: 'rgba(168,75,75,0.08)', border: '1px solid rgba(168,75,75,0.2)' }}
                    >
                      <AlertTriangle size={14} className="text-[#C9706A] shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-xs text-[#C8D0CC] leading-relaxed">
                        This action is irreversible. Your Launch Pass number cannot be recovered or reassigned.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      <div>
                        <label htmlFor="delete-email" className="block text-[11px] font-mono uppercase tracking-[0.15em] text-[#C8D0CC] mb-2 font-medium">
                          Registration Email
                        </label>
                        <div className="relative input-wrapper">
                          <Mail size={14} className="input-icon text-[#8E9A94]" aria-hidden="true" />
                          <input
                            id="delete-email"
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full py-3 px-4 rounded-xl text-sm bg-[#141716] border border-[#2A2D2C] text-[#FAF8F5] placeholder-[#8E9A94] focus:outline-none focus:border-[#C9706A] focus:ring-1 focus:ring-[#C9706A]/25 transition-all font-sans"
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
                        className="w-full py-3.5 rounded-xl text-sm font-semibold cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 transition-all duration-200"
                        style={{ background: 'rgba(168,75,75,0.9)', color: '#FAF8F5' }}
                      >
                        {status === 'submitting' ? (
                          <>
                            <span className="w-3.5 h-3.5 border border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
                            Processing…
                          </>
                        ) : (
                          <>
                            <Trash2 size={14} aria-hidden="true" />
                            Permanently Delete Registration
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
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: 'rgba(61,107,82,0.15)', border: '1px solid rgba(61,107,82,0.35)' }}
                    >
                      <CheckCircle2 size={22} className="text-[#5BA87E]" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-light text-[#FAF8F5] mb-2">Registration Removed</h2>
                    <p className="text-sm text-[#C8D0CC] leading-relaxed mb-7">
                      All data associated with <span className="text-[#FAF8F5] font-medium">{email}</span> has been permanently deleted. Your Launch Pass has been invalidated.
                    </p>
                    <button
                      onClick={onClose}
                      className="text-xs font-mono text-[#C8D0CC] hover:text-[#FAF8F5] transition-colors"
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