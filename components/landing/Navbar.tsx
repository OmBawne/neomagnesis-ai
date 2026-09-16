'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import AuthModal from '@/components/auth/AuthModal'
import { Logo } from '@/components/shared/Logo'

const navLinks = [
  { label: 'Platform', href: '#what-we-do' },
  { label: 'Agentic Loop', href: '#agentic-ai' },
  { label: 'Workflows', href: '#automation' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Philosophy', href: '#why-neomagnesis' },
]

export default function Navbar() {
  const { openAuthModal, user } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <AuthModal />
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl border-b border-[#2A2D2C] bg-[#080909]/85'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Logo href="/" width={140} height={32} />

          {/* Center nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-normal text-[#9AA19E] hover:text-[#F1EFE8] rounded-lg transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right action cluster */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <Link href="/dashboard" className="btn-primary">
                Dashboard
              </Link>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal('signin')}
                  className="px-3.5 py-1.5 text-xs font-normal text-[#9AA19E] hover:text-[#F1EFE8] transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="btn-primary text-xs"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              className="text-[#9AA19E] hover:text-[#F1EFE8] p-1 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden backdrop-blur-xl border-b border-[#2A2D2C] bg-[#080909]/95 px-4 pb-5 pt-2"
            >
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 text-xs text-[#9AA19E] hover:text-[#F1EFE8] border-b border-[#2A2D2C]/40 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => { openAuthModal('signin'); setMobileOpen(false) }}
                  className="btn-ghost flex-1 justify-center text-xs"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { openAuthModal('signup'); setMobileOpen(false) }}
                  className="btn-primary flex-1 justify-center text-xs"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

