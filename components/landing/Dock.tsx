'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'

const dockItems = [
  { label: 'Home',          href: '#hero' },
  { label: 'Philosophy',    href: '#philosophy' },
  { label: 'Local-First',   href: '#why-local-first' },
  { label: 'Workflows',     href: '#workflows' },
  { label: 'Use Cases',     href: '#use-cases' },
  { label: 'Roadmap',       href: '#roadmap' },
]

const CTA_ITEM = { label: 'Early Access', href: '#early-access' }

export default function Dock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1
    const diff = Math.abs(index - hoveredIndex)
    if (diff === 0) return 1.14
    if (diff === 1) return 1.06
    return 1
  }

  if (!mounted) return null

  return (
    <>
      {/* ── Desktop Dock ──────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="dock-glass flex items-center gap-1 px-4 py-2.5">
          {/* Logo mark */}
          <div className="mr-2 pr-3 border-r border-white/[0.07]">
            <Logo variant="icon" height={22} href="/" />
          </div>

          {/* Nav items */}
          {dockItems.map((item, index) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md text-[10px] font-medium text-[#F1EFE8] pointer-events-none"
                    style={{
                      background: 'rgba(24, 27, 26, 0.95)',
                      border: '1px solid rgba(42,45,44,0.8)',
                    }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.a
                href={item.href}
                animate={{ scale: getScale(index) }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                className="flex items-center px-3 py-1.5 rounded-xl text-[13px] font-medium text-[#9AA19E] hover:text-[#F1EFE8] transition-colors duration-150 cursor-pointer"
                style={{ transformOrigin: 'bottom center' }}
              >
                {item.label}
              </motion.a>
            </div>
          ))}

          {/* Divider */}
          <div className="mx-1 w-px h-4 bg-white/[0.07]" />

          {/* Early Access CTA */}
          <motion.a
            href={CTA_ITEM.href}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            className="ml-1 px-3.5 py-1.5 rounded-xl text-[13px] font-semibold cursor-pointer"
            style={{
              background: 'rgba(184, 115, 51, 0.15)',
              color: '#D4883B',
              border: '1px solid rgba(184, 115, 51, 0.3)',
              letterSpacing: '-0.01em',
            }}
          >
            Early Access
          </motion.a>
        </div>
      </motion.nav>

      {/* ── Mobile Header ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-5 h-14"
        style={{
          background: 'rgba(8, 9, 9, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(42, 45, 44, 0.6)',
        }}
      >
        <Logo variant="full" height={26} href="/" />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-[#9AA19E] hover:text-[#F1EFE8] p-1.5 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      {/* ── Mobile Menu Overlay ────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden pt-14 px-5 pb-8 flex flex-col gap-2"
            style={{
              background: 'rgba(8, 9, 9, 0.97)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div className="flex-1 flex flex-col gap-1 pt-8">
              {dockItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3.5 px-4 rounded-xl text-base font-medium text-[#9AA19E] hover:text-[#F1EFE8] hover:bg-white/[0.03] transition-colors"
                  style={{ borderBottom: '1px solid rgba(42,45,44,0.4)' }}
                >
                  <span>{item.label}</span>
                  <span className="text-[#2A2D2C] text-sm">→</span>
                </motion.a>
              ))}
            </div>

            <motion.a
              href={CTA_ITEM.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setMobileOpen(false)}
              className="btn-copper w-full justify-center text-base py-4 mt-4"
            >
              Join Early Access
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
