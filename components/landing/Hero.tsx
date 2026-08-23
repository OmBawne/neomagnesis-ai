'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthContext'

export default function Hero() {
  const { openAuthModal } = useAuth()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion && videoRef.current) {
      videoRef.current.pause()
    }
  }, [reducedMotion])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ─── Cinematic Video Background ─── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        src="/hero-video.mp4"
      />

      {/* ─── Readability overlay — subtle, not aggressive ─── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(180deg, rgba(8,9,9,0.5) 0%, rgba(8,9,9,0.35) 40%, rgba(8,9,9,0.55) 100%)',
        }}
      />

      {/* ─── Content ─── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-20"
      >
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] mb-6"
          style={{
            color: '#F1EFE8',
            fontWeight: 300,
            letterSpacing: '-0.02em',
          }}
        >
          AI that thinks.
          <br />
          Workflows that execute.
        </motion.h1>

        <motion.p
          variants={item}
          className="text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: '#D8D6CF' }}
        >
          Neomagnesis is an intelligent system that can reason, plan, and
          execute&mdash;not merely another automation builder.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={() => openAuthModal('signup')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
            style={{
              background: '#F1EFE8',
              color: '#080909',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            Get Started
            <ArrowRight size={15} />
          </button>
          <a
            href="#what-we-do"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
            style={{
              color: '#D8D6CF',
              border: '1px solid rgba(216,214,207,0.25)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(216,214,207,0.5)'
              ;(e.currentTarget as HTMLElement).style.color = '#F1EFE8'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(216,214,207,0.25)'
              ;(e.currentTarget as HTMLElement).style.color = '#D8D6CF'
            }}
          >
            Learn More
          </a>
        </motion.div>
      </motion.div>

      {/* ─── Bottom gradient fade into next section ─── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to bottom, transparent, var(--color-bg))',
        }}
      />
    </section>
  )
}
