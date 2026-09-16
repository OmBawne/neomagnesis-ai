'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

// Lazy-load the 3D canvas — client-only, zero SSR cost
const HeroCanvas = dynamic(
  () => import('./hero/HeroCanvas').then(m => m.HeroCanvas),
  { ssr: false, loading: () => null }
)

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero() {
  const [canvasReady, setCanvasReady] = useState(false)

  useEffect(() => {
    // Small delay so canvas has time to initialize before fading in
    const t = setTimeout(() => setCanvasReady(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080909]"
      aria-label="Hero section"
    >
      {/* ── 3D Living Core Canvas ─────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: canvasReady ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        aria-hidden="true"
      >
        <HeroCanvas />
      </motion.div>

      {/* ── Gradient vignette for readability ─────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(8,9,9,0.5) 100%)',
            'linear-gradient(180deg, rgba(8,9,9,0.55) 0%, transparent 30%, transparent 65%, rgba(8,9,9,0.9) 100%)',
          ].join(', '),
        }}
      />

      {/* ── Hero Text Content ──────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center pt-32 pb-32"
      >
        {/* Eyebrow pill */}
        <motion.div variants={fadeUp} className="flex justify-center mb-10">
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-[0.18em] uppercase"
            style={{
              background: 'rgba(24,27,26,0.8)',
              border: '1px solid rgba(42,45,44,0.9)',
              color: '#9AA19E',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#B87333', boxShadow: '0 0 6px rgba(184,115,51,0.6)' }}
            />
            Early Access — Now Open
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
          className="font-light tracking-[-0.04em] leading-[0.95] text-[#F1EFE8] mb-8"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}
        >
          Neomagnesis
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl leading-relaxed font-light max-w-xl mx-auto mb-12"
          style={{ color: '#9AA19E', letterSpacing: '-0.01em' }}
        >
          The Local-First Agentic AI Operating System.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-3.5 justify-center items-center"
        >
          <motion.a
            href="#early-access"
            className="btn-copper px-8 py-3.5 text-sm font-semibold"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          >
            Join Early Access
            <ArrowRight size={15} />
          </motion.a>
          <motion.a
            href="#philosophy"
            className="btn-ghost px-8 py-3.5 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          >
            Explore the Vision
          </motion.a>
        </motion.div>

        {/* Subtle spec line */}
        <motion.div
          variants={fadeIn}
          className="flex items-center justify-center gap-4 mt-16 text-[11px] font-mono tracking-[0.14em] uppercase"
          style={{ color: '#626A66' }}
        >
          <span>Local-First</span>
          <span className="w-px h-3 bg-[#2A2D2C]" />
          <span>Privacy by Design</span>
          <span className="w-px h-3 bg-[#2A2D2C]" />
          <span>Agentic Workflows</span>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#626A66]">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} className="text-[#626A66]" />
        </motion.div>
      </motion.div>

      {/* ── Bottom ground gradient ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-40 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #080909)' }}
      />
    </section>
  )
}
