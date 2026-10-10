'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown, Shield, Cpu, Network } from 'lucide-react'
import { EarlyAccessModal } from '@/components/ui/EarlyAccessModal'
import { KnowledgeWorkflow, AutomationWorkflow } from './hero/WorkflowVisualization'

const HeroCanvas = dynamic(
  () => import('./hero/HeroCanvas').then((m) => m.HeroCanvas),
  { ssr: false, loading: () => null }
)

const HeroParticles = dynamic(
  () => import('./hero/HeroParticles').then((m) => m.HeroParticles),
  { ssr: false, loading: () => null }
)

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  // Touch device detection — disable pointer parallax on touch
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouch(hasTouch)
  }, [])

  // Pointer parallax state for workflow layers
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 })
  const [pointerActive, setPointerActive] = useState(false)

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (prefersReduced || isTouch) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setPointerPos({ x, y })
    setPointerActive(true)
  }, [prefersReduced, isTouch])

  const handlePointerLeave = useCallback(() => {
    setPointerActive(false)
    setPointerPos({ x: 0, y: 0 })
  }, [])

  // Scroll-linked hero behavior (for 3D canvas and particles)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.8, 0.3])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.02])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60])

  // Gentle pointer parallax for workflow layers — more pronounced than 3D logo rotation
  const workflowParallaxX = prefersReduced || isTouch ? 0 : pointerPos.x * 18
  const workflowParallaxY = prefersReduced || isTouch ? 0 : pointerPos.y * 10

  useEffect(() => {
    const timer = setTimeout(() => setCanvasReady(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // Page load entrance sequence
  const entranceVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  }

  const itemFadeUp = (delay = 0, yOffset = 20) => ({
    hidden: { opacity: 0, y: yOffset },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  })

  return (
    <>
      <EarlyAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section
        id="hero"
        ref={sectionRef}
        className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#08090A] pt-24 pb-20"
        aria-label="Hero section"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* 3D Agentic Intelligence Visual with scroll-linked behavior */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: canvasReady ? 1 : 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            opacity: prefersReduced ? 1 : undefined,
            transform: prefersReduced ? undefined : heroScale,
            y: prefersReduced ? undefined : heroY,
          }}
          aria-hidden="true"
        >
          <HeroCanvas />
        </motion.div>

        {/* Interactive particle layer — micro dust + cursor-reactive major motes */}
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: canvasReady ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity: prefersReduced ? 1 : undefined }}
          aria-hidden="true"
        >
          <HeroParticles />
        </motion.div>

        {/* Left Workflow Visualization — Knowledge & Research */}
        <motion.div
          className="absolute z-[3] pointer-events-none"
          style={{ x: workflowParallaxX, y: workflowParallaxY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: canvasReady ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <KnowledgeWorkflow />
        </motion.div>

        {/* Right Workflow Visualization — Software & Task Automation */}
        <motion.div
          className="absolute z-[3] pointer-events-none"
          style={{ x: workflowParallaxX, y: workflowParallaxY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: canvasReady ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <AutomationWorkflow />
        </motion.div>

        {/* Enhanced Radial Lighting Vignette with depth — warm copper glow behind logo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[4] pointer-events-none"
          style={{
            background: [
              'radial-gradient(circle at 50% 48%, rgba(229, 139, 78, 0.05) 0%, transparent 50%)',
              'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 25%, rgba(8, 9, 10, 0.65) 100%)',
              'linear-gradient(180deg, rgba(8, 9, 10, 0.35) 0%, transparent 20%, transparent 80%, rgba(8, 9, 10, 0.9) 100%)',
              'radial-gradient(ellipse at 12% 50%, rgba(229, 139, 78, 0.025) 0%, transparent 35%)',
              'radial-gradient(ellipse at 88% 50%, rgba(229, 139, 78, 0.025) 0%, transparent 35%)',
            ].join(', '),
          }}
        />

        {/* Subtle edge gradients for depth — fade toward viewport edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[4] pointer-events-none"
          style={{
            background: [
              'linear-gradient(90deg, rgba(8, 9, 10, 0.55) 0%, transparent 18%)',
              'linear-gradient(270deg, rgba(8, 9, 10, 0.55) 0%, transparent 18%)',
            ].join(', '),
          }}
        />

        {/* Extremely faint structural texture — receding lines toward edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(154,161,158,0.1) 1px, transparent 1px),
              linear-gradient(rgba(154,161,158,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%)',
          }}
        />

        {/* Hero Narrative Stack — deliberate entrance sequence */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-[880px] mx-auto px-5 sm:px-8 text-center"
          style={{ opacity: prefersReduced ? 1 : undefined }}
        >
          {/* Primary Brand Headline — Sora display lockup with copper accent */}
          <motion.h1
            variants={itemFadeUp(0, 16)}
            className="text-display-hero hero-title-glow mb-5 select-none"
          >
            Neomagnesis{' '}
            <span className="hero-title-accent">AI</span>
          </motion.h1>

          {/* Defining Subtitle */}
          <motion.h2
            variants={itemFadeUp(0.05, 16)}
            className="text-display-hero-sub text-lg sm:text-2xl lg:text-3xl font-medium tracking-[-0.02em] text-[#FAF8F5] max-w-2xl mx-auto mb-6 drop-shadow-[0_2px_16px_rgba(0,0,0,0.75)]"
          >
            AI that works through your workflows.
          </motion.h2>

          {/* Contextual Description — high contrast warm ivory-mist */}
          <motion.p
            variants={itemFadeUp(0.1, 16)}
            className="text-sm sm:text-base leading-relaxed text-[#E2E8E5] max-w-xl mx-auto mb-10 font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
          >
            Build and run intelligent workflows that orchestrate tasks, use available tools, and execute actions — with a local-first architecture designed to give you greater control over your data and execution.
          </motion.p>

          {/* Action CTAs — standardized button sizing and hover/press behavior */}
          <motion.div
            variants={itemFadeUp(0.15, 16)}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest font-semibold"
            >
              <span>Join Early Access</span>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ x: 0, scale: 0.9 }}
                transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <ArrowRight size={14} />
              </motion.div>
            </button>

            <a
              href="#philosophy"
              className="btn-ghost group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest"
            >
              <span>Architectural Vision</span>
            </a>
          </motion.div>

          {/* System Guarantees Monospace Triad with protective subtle glass backdrop */}
          <motion.div
            variants={itemFadeUp(0.2, 16)}
            className="flex justify-center mt-16"
          >
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
              <div className="flex items-center gap-2 group">
                <motion.span
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Cpu size={13} className="text-[#FFAE70]" aria-hidden="true" />
                </motion.span>
                <span className="text-[#FAF8F5] font-medium">Local Execution</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
              <div className="flex items-center gap-2 group">
                <motion.span
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Shield size={13} className="text-[#64B889]" aria-hidden="true" />
                </motion.span>
                <span className="text-[#FAF8F5] font-medium">Hardware Sovereignty</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
              <div className="flex items-center gap-2 group">
                <motion.span
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Network size={13} className="text-[#FFAE70]" aria-hidden="true" />
                </motion.span>
                <span className="text-[#FAF8F5] font-medium">Local-First Architecture</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator with subtle entrance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 hover:opacity-100 transition-opacity pointer-events-none"
          aria-hidden="true"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C8D0CC] font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={14} className="text-[#C8D0CC]" />
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}