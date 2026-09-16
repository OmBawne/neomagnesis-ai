'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, Copy, Check, Sparkles, Shield, User, Mail, AtSign } from 'lucide-react'
import { registerEarlyAccess, type EarlyAccessResult } from '@/lib/supabase/early-access'

export function EarlyAccessSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [resultData, setResultData] = useState<EarlyAccessResult | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!name.trim()) {
      setErrorMessage('Please provide your name.')
      return
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.')
      return
    }

    setStatus('submitting')

    try {
      const res = await registerEarlyAccess({
        name,
        email,
        username: username.trim() || undefined,
      })

      if (res.success) {
        setResultData(res)
        setStatus('success')
      } else {
        setErrorMessage(res.error || 'Failed to complete registration. Please try again.')
        setStatus('error')
      }
    } catch (err: any) {
      setErrorMessage('An unexpected error occurred. Please try again later.')
      setStatus('error')
    }
  }

  const handleCopy = () => {
    if (resultData?.launchPassNumber) {
      navigator.clipboard.writeText(resultData.launchPassNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="early-access" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#2A2D2C]">
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C87D55]/5 rounded-full blur-[120px] pointer-events-none -z-10"
      />

      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C87D55] mb-3 inline-block">
          // Priority Registration
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#F1EFE8] tracking-[-0.025em] leading-[1.15] mb-5">
          Claim your Launch Pass. <br />
          <span className="font-normal text-[#F1EFE8]">Join the Founding Cohort.</span>
        </h2>
        <p className="text-base text-[#9AA19E] leading-relaxed font-normal">
          Receive direct updates as private alpha builds roll out. No spam, no telemetry, and no obligations.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status !== 'success' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="bg-[#0E100F] border border-[#2A2D2C] rounded-3xl p-8 sm:p-12 shadow-macos-dock max-w-xl mx-auto relative overflow-hidden"
          >
            {/* Top accent rim */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C87D55]/60 to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="ea-name" className="block text-xs font-mono uppercase text-[#9AA19E] mb-2 tracking-wider">
                  Full Name <span className="text-[#C87D55]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9AA19E]">
                    <User size={15} />
                  </div>
                  <input
                    id="ea-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#141716] border border-[#2A2D2C] text-[#F1EFE8] text-sm placeholder-[#9AA19E]/50 focus:outline-none focus:border-[#C87D55] focus:ring-1 focus:ring-[#C87D55] transition-all font-sans"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="ea-email" className="block text-xs font-mono uppercase text-[#9AA19E] mb-2 tracking-wider">
                  Email Address <span className="text-[#C87D55]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9AA19E]">
                    <Mail size={15} />
                  </div>
                  <input
                    id="ea-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ada@lovelace.dev"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#141716] border border-[#2A2D2C] text-[#F1EFE8] text-sm placeholder-[#9AA19E]/50 focus:outline-none focus:border-[#C87D55] focus:ring-1 focus:ring-[#C87D55] transition-all font-sans"
                  />
                </div>
              </div>

              {/* Optional Username Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="ea-user" className="block text-xs font-mono uppercase text-[#9AA19E] tracking-wider">
                    Preferred Identifier
                  </label>
                  <span className="text-[10px] font-mono text-[#9AA19E]/60 uppercase">Optional</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9AA19E]">
                    <AtSign size={15} />
                  </div>
                  <input
                    id="ea-user"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="adalovelace"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#141716] border border-[#2A2D2C] text-[#F1EFE8] text-sm placeholder-[#9AA19E]/50 focus:outline-none focus:border-[#C87D55] focus:ring-1 focus:ring-[#C87D55] transition-all font-sans"
                  />
                </div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="text-xs font-mono text-[#E06C75] bg-[#E06C75]/10 border border-[#E06C75]/30 rounded-lg p-3">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#C87D55] text-[#080909] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#d68b63] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(200,125,85,0.25)] cursor-pointer disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <span>Generating Launch Pass...</span>
                ) : (
                  <>
                    <span>Request Early Access</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              <div className="pt-4 flex items-center justify-center gap-2 text-[11px] font-mono text-[#9AA19E]">
                <Shield size={12} className="text-[#5B7065]" />
                <span>Your contact info is never shared or commercialized.</span>
              </div>
            </form>
          </motion.div>
        ) : (
          /* Success State: Verified Launch Pass */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0E100F] border border-[#C87D55]/60 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(200,125,85,0.15)] max-w-xl mx-auto relative overflow-hidden text-center"
          >
            {/* Top accent badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C87D55]/15 border border-[#C87D55]/40 text-[#C87D55] text-xs font-mono mb-6">
              <Sparkles size={13} />
              <span>Founding Cohort Confirmed</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-light text-[#F1EFE8] mb-2">
              Welcome, {resultData?.name || 'Explorer'}.
            </h3>
            <p className="text-sm text-[#9AA19E] mb-8">
              Your registration has been recorded. Here is your official Launch Pass credential.
            </p>

            {/* Launch Pass Card */}
            <div className="bg-[#141716] border border-[#2A2D2C] rounded-2xl p-6 mb-8 text-left relative group">
              <div className="flex items-center justify-between pb-4 border-b border-[#2A2D2C]/70">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9AA19E]">
                  Neomagnesis OS // Launch Pass
                </span>
                <span className="text-[10px] font-mono text-[#5B7065] bg-[#5B7065]/10 px-2 py-0.5 rounded border border-[#5B7065]/30">
                  Verified Tier
                </span>
              </div>

              <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono text-[#9AA19E] uppercase mb-1">Pass Identifier</div>
                  <div className="text-2xl sm:text-3xl font-mono font-light text-[#C87D55] tracking-wider">
                    {resultData?.launchPassNumber}
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg bg-[#1C1F1E] border border-[#2A2D2C] text-[#F1EFE8] hover:border-[#C87D55] transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-[#5B7065]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Pass</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-4 border-t border-[#2A2D2C]/70 grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <div className="text-[#9AA19E] text-[10px] uppercase">Registered To</div>
                  <div className="text-[#F1EFE8] truncate">{resultData?.email}</div>
                </div>
                <div>
                  <div className="text-[#9AA19E] text-[10px] uppercase">Cohort Priority</div>
                  <div className="text-[#F1EFE8]">#{resultData?.position || '001'} in line</div>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#9AA19E] leading-relaxed">
              We will reach out with your private desktop alpha invitation at this email address. Thank you for championing sovereign, local-first computing.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
