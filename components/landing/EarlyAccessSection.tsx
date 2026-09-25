'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Sparkles, Key, Lock } from 'lucide-react'
import { EarlyAccessModal } from '@/components/ui/EarlyAccessModal'

const perks = [
  { icon: Sparkles, text: 'Priority access to private alpha desktop builds' },
  { icon: Key,      text: 'Unique verified Launch Pass — permanent Founding Member record' },
  { icon: Lock,     text: 'Grandfathered terms upon public release — no forced migration' },
]

export function EarlyAccessSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <EarlyAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section
        id="early-access"
        className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto"
        style={{ borderTop: '1px solid #2A2D2C' }}
        aria-labelledby="early-access-heading"
      >
        {/* Ambient glow — restrained, non-glowing */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(184,115,51,0.04) 0%, transparent 70%)',
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* ── Left: Editorial copy ── */}
          <div className="lg:col-span-5">
            <motion.span
              className="mono-label block mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              // Priority Registration
            </motion.span>

            <motion.h2
              id="early-access-heading"
              className="font-light text-[#FAF8F5] tracking-[-0.025em] leading-[1.1] mb-5"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Claim your Launch Pass.
              <br />
              <span className="text-[#C8D0CC]">Join the founding cohort.</span>
            </motion.h2>

            <motion.p
              className="text-base text-[#C8D0CC] leading-relaxed mb-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Receive direct updates as private alpha builds roll out.
              No spam. No telemetry. No obligations.
            </motion.p>

            {/* Perks */}
            <motion.div
              className="space-y-3.5 mb-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              {perks.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-sm text-[#C8D0CC]">
                  <Icon size={14} className="text-[#E58B4E] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.button
                id="open-early-access-modal"
                onClick={() => setModalOpen(true)}
                className="btn-copper px-8 py-3.5 text-sm font-semibold cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                aria-label="Open Early Access registration"
              >
                Claim Your Launch Pass
                <ArrowRight size={15} aria-hidden="true" />
              </motion.button>
            </motion.div>
          </div>

          {/* ── Right: Launch Pass specimen ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl p-8 sm:p-10 overflow-hidden"
              style={{
                background: '#0D0F0E',
                border: '1px solid #2A2D2C',
              }}
            >
              {/* Top copper accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(229,139,78,0.6) 40%, rgba(229,139,78,0.6) 60%, transparent 95%)' }}
                aria-hidden="true"
              />

              {/* Card header */}
              <div
                className="flex items-center justify-between pb-5 mb-5"
                style={{ borderBottom: '1px solid #2A2D2C' }}
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A6B2AC] font-medium">
                  Neomagnesis — Launch Pass
                </span>
                <span
                  className="text-[10px] font-mono px-2.5 py-1 rounded font-medium"
                  style={{ background: 'rgba(61,107,82,0.18)', border: '1px solid rgba(91,168,126,0.4)', color: '#7FA692' }}
                >
                  Founding Cohort
                </span>
              </div>

              {/* Pass number specimen */}
              <div className="mb-8">
                <div className="text-[10px] font-mono text-[#A6B2AC] uppercase mb-2 font-medium">Pass Identifier</div>
                <div
                  className="text-5xl sm:text-6xl font-mono font-light tracking-widest"
                  style={{ color: '#E58B4E' }}
                  aria-label="Sample Launch Pass number"
                >
                  USER<span style={{ opacity: 0.7 }}>001</span>
                </div>
              </div>

              {/* Meta row */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono mb-8">
                {[
                  { label: 'Status', value: 'Verified Founding Member' },
                  { label: 'Access Tier', value: 'Alpha Priority' },
                  { label: 'Platform', value: 'Local-First OS' },
                  { label: 'Next Phase', value: 'Private Alpha Invite' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-[#A6B2AC] text-[10px] uppercase mb-0.5 font-medium">{label}</div>
                    <div className="text-[#FAF8F5]">{value}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-3.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  background: 'rgba(229,139,78,0.12)',
                  border: '1px solid rgba(229,139,78,0.4)',
                  color: '#E58B4E',
                }}
                aria-label="Register for Early Access"
              >
                Register for Early Access
                <ArrowRight size={14} aria-hidden="true" />
              </button>

              {/* Privacy note */}
              <div className="flex items-center justify-center gap-2 mt-4 text-[11px] font-mono text-[#A6B2AC]">
                <Shield size={11} aria-hidden="true" className="text-[#7FA692]" />
                <span>Contact info is never shared or commercialized.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}