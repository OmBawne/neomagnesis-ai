'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Shield, Cpu, Network } from 'lucide-react'
import { EarlyAccessModal } from '@/components/ui/EarlyAccessModal'

const HeroCanvas = dynamic(
  () => import('./hero/HeroCanvas').then((m) => m.HeroCanvas),
  { ssr: false, loading: () => null }
)

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setCanvasReady(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <EarlyAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section
        id="hero"
        className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#08090A] pt-24 pb-20"
        aria-label="Hero section"
      >
        {/* 3D Agentic Intelligence Visual */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: canvasReady ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <HeroCanvas />
        </motion.div>

        {/* Restrained Radial Lighting Vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: [
              'radial-gradient(circle at 50% 45%, rgba(200, 125, 85, 0.04) 0%, transparent 60%)',
              'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 35%, rgba(8, 9, 10, 0.75) 100%)',
              'linear-gradient(180deg, rgba(8, 9, 10, 0.5) 0%, transparent 30%, transparent 70%, rgba(8, 9, 10, 0.95) 100%)',
            ].join(', '),
          }}
        />

        {/* Hero Narrative Stack */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-[880px] mx-auto px-5 sm:px-8 text-center"
        >
          {/* Primary Brand Headline — light, commanding, elegant */}
          <motion.h1
            variants={fadeUp}
            className="font-light tracking-[-0.04em] text-[#FAF8F5] leading-[0.95] mb-5 select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
            style={{ fontSize: 'clamp(3.2rem, 9vw, 6.5rem)' }}
          >
            Neomagnesis AI
          </motion.h1>

          {/* Defining Subtitle */}
          <motion.h2
            variants={fadeUp}
            className="text-lg sm:text-2xl lg:text-3xl font-light tracking-[-0.02em] text-[#FAF8F5] max-w-2xl mx-auto mb-6 drop-shadow-[0_2px_16px_rgba(0,0,0,0.75)]"
          >
            A Local-First Agentic AI Operating System
          </motion.h2>

          {/* Contextual Description — high contrast warm ivory-mist */}
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base leading-relaxed text-[#E2E8E5] max-w-xl mx-auto mb-10 font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
          >
            Autonomous intelligence executing entirely on your personal silicon.
            Zero cloud telemetry, air-gapped security, and deterministic agent orchestration.
          </motion.p>

          {/* Action CTAs — standardized button sizing and hover/press behavior */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest font-semibold bg-[#FAF8F5] text-[#08090A] hover:bg-white hover:shadow-[0_0_30px_rgba(241,239,232,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Join Early Access</span>
              <ArrowRight size={14} />
            </button>

            <a
              href="#philosophy"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest text-[#FAF8F5] hover:text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.22] hover:border-white/[0.35] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Architectural Vision</span>
            </a>
          </motion.div>

          {/* System Guarantees Monospace Triad with protective subtle glass backdrop */}
          <motion.div variants={fadeUp} className="flex justify-center mt-16">
            <div
              className="inline-flex flex-wrap items-center justify-center gap-5 sm:gap-8 px-6 py-2.5 rounded-full text-[11px] font-mono tracking-[0.16em] uppercase text-[#E2E8E5]"
              style={{
                background: 'rgba(14, 16, 17, 0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(241, 239, 232, 0.14)',
                boxShadow: '0 8px 30px -6px rgba(0, 0, 0, 0.75)',
              }}
            >
              <div className="flex items-center gap-2">
                <Cpu size={13} className="text-[#FFAE70]" aria-hidden="true" />
                <span className="text-[#FAF8F5] font-medium">Local Execution</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <Shield size={13} className="text-[#64B889]" aria-hidden="true" />
                <span className="text-[#FAF8F5] font-medium">Hardware Sovereignty</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <Network size={13} className="text-[#FFAE70]" aria-hidden="true" />
                <span className="text-[#FAF8F5] font-medium">Inter-Agent Mesh</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity pointer-events-none"
          aria-hidden="true"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C8D0CC] font-medium">Scroll</span>
          <ChevronDown size={14} className="text-[#C8D0CC] animate-bounce" />
        </div>
      </section>
    </>
  )
}