'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Shield, Sparkles, Key, Lock } from 'lucide-react'
import { EarlyAccessModal } from '@/components/ui/EarlyAccessModal'

const perks = [
  { icon: Sparkles, text: 'Priority access to private alpha desktop builds' },
  { icon: Key,      text: 'Unique verified Launch Pass — permanent Founding Member record' },
  { icon: Lock,     text: 'Grandfathered terms upon public release — zero forced migration' },
]

export function EarlyAccessSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Subtle scroll-linked background gradient - replaces static ambient glow
  const sectionBgOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.04, 0.08, 0.04])

  return (
    <>
      <EarlyAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section
        id="early-access"
        ref={sectionRef}
        className="relative py-20 lg:py-28 px-5 sm:px-8 max-w-[1200px] mx-auto border-t border-[#2A2D2C]"
        style={{ 
          background: `radial-gradient(ellipse at 50% 50%, rgba(184,115,51,${sectionBgOpacity}) 0%, transparent 70%)`,
        }}
        aria-labelledby="early-access-heading"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Editorial copy */}
          <div className="lg:col-span-5">
            <motion.div
              className="flex items-center gap-2.5 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E58B4E]" aria-hidden="true" />
              <span className="mono-label text-[#FAF8F5] font-medium">
                // Priority Registration
              </span>
            </motion.div>

            <motion.h2
              id="early-access-heading"
              className="font-light text-[#FAF8F5] tracking-[-0.025em] leading-[1.12] mb-5 text-3xl sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Claim your Launch Pass. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#FFAE70] to-[#E58B4E] font-normal">
                Join the founding cohort.
              </span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-[#D4DDD8] leading-relaxed mb-10 font-normal"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Receive direct updates as private alpha builds roll out.
              No spam. No telemetry. No obligations.
            </motion.p>

            {/* Perks with staggered reveals */}
            <motion.div
              className="space-y-4 mb-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              {perks.map(({ icon: Icon, text }, idx) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 text-sm sm:text-base text-[#FAF8F5]"
                >
                  <Icon size={16} className="text-[#FFAE70] shrink-0 mt-1" aria-hidden="true" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                id="open-early-access-modal"
                onClick={() => setModalOpen(true)}
                className="btn-primary group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest font-semibold"
                aria-label="Open Early Access registration"
              >
                <span>Claim Your Launch Pass</span>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ x: 0, scale: 0.9 }}
                  transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ArrowRight size={14} aria-hidden="true" />
                </motion.div>
              </button>
            </motion.div>
          </div>

          {/* Right: Launch Pass specimen */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="surface-card relative rounded-2xl p-7 sm:p-10 overflow-hidden bg-[#0D0F0E] border border-[#2A2D2C] shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Top copper accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(229,139,78,0.7) 40%, rgba(229,139,78,0.7) 60%, transparent 95%)' }}
                aria-hidden="true"
              />

              {/* Card header */}
              <div
                className="flex items-center justify-between pb-5 mb-5 border-b border-[#2A2D2C]"
              >
                <span className="text-xs font-mono uppercase tracking-widest text-[#FAF8F5] font-semibold">
                  Neomagnesis — Launch Pass
                </span>
                <span
                  className="text-xs font-mono px-3 py-1 rounded-full font-semibold bg-[#3D6B52]/20 border border-[#5BA87E]/50 text-[#7FA692]"
                >
                  Founding Cohort
                </span>
              </div>

              {/* Pass number specimen */}
              <div className="mb-8">
                <div className="text-xs font-mono text-[#D4DDD8] uppercase mb-2 font-semibold">Pass Identifier</div>
                <div
                  className="text-5xl sm:text-6xl font-mono font-light tracking-widest text-[#FFAE70]"
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
                    <div className="text-[#D4DDD8] text-xs uppercase mb-1 font-medium">{label}</div>
                    <div className="text-[#FAF8F5] text-sm font-semibold">{value}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => setModalOpen(true)}
                className="btn-accent w-full py-3.5 rounded-xl text-xs font-mono uppercase tracking-widest font-semibold cursor-pointer flex items-center justify-center gap-2"
                aria-label="Register for Early Access"
              >
                <span>Register for Early Access</span>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ x: 0, scale: 0.9 }}
                  transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ArrowRight size={14} aria-hidden="true" />
                </motion.div>
              </button>

              {/* Privacy note */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono text-[#D4DDD8]">
                <Shield size={13} aria-hidden="true" className="text-[#64B889]" />
                <span>Contact info is never shared or commercialized.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}