'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/shared/Logo'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'
import { EarlyAccessModal } from '@/components/ui/EarlyAccessModal'

interface DockProps {
  onOpenEarlyAccess?: () => void
}

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Architecture', href: '#why-local-first' },
  { label: 'Workflows', href: '#workflows' },
  { label: 'Updates', href: '#roadmap' },
  { label: 'Security', href: '/legal#security' },
]

const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false

export function Dock({ onOpenEarlyAccess }: DockProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pressedIdx, setPressedIdx] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleOpenEarlyAccess = () => {
    setMobileMenuOpen(false)
    if (onOpenEarlyAccess) {
      onOpenEarlyAccess()
    } else {
      setModalOpen(true)
    }
  }

  const springTransition = { type: 'spring', stiffness: 450, damping: 30 }
  const pressTransition = { duration: 0.08, ease: [0.22, 1, 0.36, 1] }

  return (
    <>
      <EarlyAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Desktop Centered Floating Dock */}
      <motion.header
        initial={prefersReducedMotion ? { opacity: 1 } : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-6 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none px-4"
        role="banner"
      >
        <nav
          role="navigation"
          aria-label="Main Navigation"
          className="pointer-events-auto relative flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-300"
          style={{
            background: scrolled
              ? 'rgba(12, 14, 15, 0.88)'
              : 'rgba(15, 17, 18, 0.78)',
            backdropFilter: 'blur(24px) saturate(150%)',
            WebkitBackdropFilter: 'blur(24px) saturate(150%)',
            border: '1px solid rgba(241, 239, 232, 0.12)',
            boxShadow: scrolled
              ? '0 20px 40px -15px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
              : '0 12px 30px -10px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.04) inset',
          }}
        >
          {/* Subtle Top Specular Glass Reflection */}
          <div
            className="absolute top-0 left-6 right-6 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.18) 50%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          {/* Official Logo Brand Mark */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={pressTransition}
            className="flex items-center pl-2 pr-3 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E58B4E] rounded-full"
            aria-label="Neomagnesis AI — Return to Hero"
          >
            <Logo variant="icon" height={24} />
          </motion.a>

          {/* Subtle Hairline Divider */}
          <div className="w-px h-4 mx-1 bg-white/[0.12]" aria-hidden="true" />

          {/* Nav Links */}
          <div className="flex items-center gap-0.5">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.href}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => { setHoveredIdx(null); setPressedIdx(null); }}
                onMouseDown={() => setPressedIdx(idx)}
                onMouseUp={() => setPressedIdx(null)}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0, scale: 0.97 }}
                transition={pressTransition}
                className="relative px-3.5 py-1.5 rounded-full text-xs font-medium text-[#D4DDD8] hover:text-[#FAF8F5] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E58B4E]"
              >
                {hoveredIdx === idx && (
                  <motion.div
                    layoutId="dockHover"
                    className="absolute inset-0 rounded-full bg-white/[0.08] -z-10"
                    transition={springTransition}
                  />
                )}
                <span>{item.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Hairline Divider */}
          <div className="w-px h-4 mx-1 bg-white/[0.12]" aria-hidden="true" />

          {/* Primary Action Button: Early Access Modal */}
          <motion.button
            onClick={handleOpenEarlyAccess}
            whileHover={{ y: -1, boxShadow: '0 8px 24px -4px rgba(241,239,232,0.35)' }}
            whileTap={{ y: 0, scale: 0.97 }}
            transition={pressTransition}
            className="relative flex items-center gap-2 pl-3.5 pr-4 py-1.5 rounded-full text-xs font-semibold text-[#08090A] bg-[#FAF8F5] hover:bg-white active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E58B4E]"
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-[#E58B4E]"
              aria-hidden="true"
            />
            <span className="tracking-tight">Early Access</span>
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Compact Navigation Bar */}
      <div className="fixed top-4 left-4 right-4 z-50 md:hidden">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="flex items-center justify-between px-4 py-2.5 rounded-2xl"
          style={{
            background: 'rgba(12, 14, 15, 0.92)',
            backdropFilter: 'blur(24px) saturate(150%)',
            WebkitBackdropFilter: 'blur(24px) saturate(150%)',
            border: '1px solid rgba(241, 239, 232, 0.12)',
            boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.7)',
          }}
        >
          <a href="#hero" className="flex items-center gap-2">
            <Logo variant="icon" height={22} />
            <span className="font-semibold text-xs tracking-wider text-[#FAF8F5] font-sans">
              NEOMAGNESIS
            </span>
          </a>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={handleOpenEarlyAccess}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={pressTransition}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FAF8F5] text-[#08090A] hover:bg-white active:scale-[0.98] transition-all cursor-pointer"
            >
              Early Access
            </motion.button>

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={pressTransition}
              className="p-1.5 rounded-lg text-[#D4DDD8] hover:text-[#FAF8F5] hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-drawer"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 p-4 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(15, 17, 18, 0.98)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(241, 239, 232, 0.12)',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ x: 4 }}
                    whileTap={{ x: 0, scale: 0.98 }}
                    className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium text-[#FAF8F5] hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={14} className="text-[#FFAE70]" />
                  </motion.a>
                ))}

                <div className="pt-2 mt-1 border-t border-white/[0.1]">
                  <motion.button
                    onClick={handleOpenEarlyAccess}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0, scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl text-xs font-mono uppercase tracking-widest font-semibold bg-[#FAF8F5] text-[#08090A] hover:bg-white flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Sparkles size={13} className="text-[#E58B4E]" />
                    <span>Join Early Access</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Dock