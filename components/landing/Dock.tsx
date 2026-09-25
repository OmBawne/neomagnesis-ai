'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/shared/Logo'
import { Menu, X, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react'
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

export function Dock({ onOpenEarlyAccess }: DockProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  return (
    <>
      <EarlyAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Desktop Centered Floating Dock */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none px-4"
        role="banner"
      >
        <nav
          role="navigation"
          aria-label="Main Navigation"
          className="pointer-events-auto relative flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-300"
          style={{
            background: scrolled
              ? 'rgba(12, 14, 15, 0.82)'
              : 'rgba(15, 17, 18, 0.72)',
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            border: '1px solid rgba(241, 239, 232, 0.09)',
            boxShadow: scrolled
              ? '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04) inset'
              : '0 12px 30px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03) inset',
          }}
        >
          {/* Subtle Top Specular Glass Reflection */}
          <div
            className="absolute top-0 left-6 right-6 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          {/* Official Logo Brand Mark */}
          <a
            href="#hero"
            className="flex items-center pl-2 pr-3 py-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C87D55] rounded-full"
            aria-label="Neomagnesis AI — Return to Hero"
          >
            <Logo variant="icon" height={24} />
          </a>

          {/* Subtle Hairline Divider */}
          <div className="w-px h-4 mx-1 bg-white/[0.08]" aria-hidden="true" />

          {/* Nav Links */}
          <div className="flex items-center gap-0.5">
            {navItems.map((item, idx) => {
              const isExternal = item.href.startsWith('/')
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="relative px-3.5 py-1.5 rounded-full text-xs font-medium text-[#C8D0CC] hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C87D55]"
                >
                  {hoveredIdx === idx && (
                    <motion.div
                      layoutId="dockHover"
                      className="absolute inset-0 rounded-full bg-white/[0.06] -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span>{item.label}</span>
                </a>
              )
            })}
          </div>

          {/* Hairline Divider */}
          <div className="w-px h-4 mx-1 bg-white/[0.08]" aria-hidden="true" />

          {/* Primary Action Button: Early Access Modal */}
          <button
            onClick={handleOpenEarlyAccess}
            className="relative flex items-center gap-2 pl-3.5 pr-4 py-1.5 rounded-full text-xs font-medium text-[#08090A] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C87D55]"
            style={{
              background: '#F1EFE8',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C87D55] animate-pulse" aria-hidden="true" />
            <span className="font-semibold tracking-tight">Early Access</span>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Compact Navigation Bar */}
      <div className="fixed top-4 left-4 right-4 z-50 md:hidden">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between px-4 py-2.5 rounded-2xl"
          style={{
            background: 'rgba(12, 14, 15, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(241, 239, 232, 0.09)',
            boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.6)',
          }}
        >
          <a href="#hero" className="flex items-center gap-2">
            <Logo variant="icon" height={22} />
            <span className="font-medium text-xs tracking-wider text-[#F1EFE8] font-sans">
              NEOMAGNESIS
            </span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenEarlyAccess}
              className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#F1EFE8] text-[#08090A] cursor-pointer"
            >
              Early Access
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-[#9AA19E] hover:text-[#F1EFE8] hover:bg-white/[0.05] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
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
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 p-4 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(15, 17, 18, 0.96)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(241, 239, 232, 0.08)',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7)',
              }}
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[#E2E8E5] hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="text-[#A6B2AC] text-xs">→</span>
                  </a>
                ))}

                <div className="pt-2 mt-1 border-t border-white/[0.06]">
                  <button
                    onClick={handleOpenEarlyAccess}
                    className="w-full py-3 rounded-xl text-xs font-mono uppercase tracking-widest font-semibold bg-[#C87D55] text-[#08090A] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles size={13} />
                    <span>Join Early Access</span>
                  </button>
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