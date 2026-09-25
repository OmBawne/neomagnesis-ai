'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import { ArrowUpRight, Trash2 } from 'lucide-react'
import { DeleteRegistrationModal } from '@/components/ui/DeleteRegistrationModal'

export function Footer() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  return (
    <>
      <DeleteRegistrationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />

      <footer
        className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto"
        style={{ borderTop: '1px solid rgba(42, 45, 44, 0.6)' }}
        aria-label="Site footer"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Logo height={30} href="/" />
            <p className="text-sm text-[#C8D0CC] leading-relaxed max-w-sm">
              The Local-First Agentic AI Operating System. Sovereign intelligence, privacy by design, and timeless craftsmanship.
            </p>
            <div className="flex flex-col gap-1 text-xs font-mono text-[#A6B2AC]">
              <span>Public Early Access Launch</span>
              <a
                href="mailto:neomagnesisai@gmail.com"
                className="text-[#C8D0CC] hover:text-[#E58B4E] transition-colors"
              >
                neomagnesisai@gmail.com
              </a>
            </div>
          </div>

          {/* Navigation & Documentation */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* System */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#FAF8F5] mb-4 font-medium">
                System
              </h3>
              <ul className="space-y-3 text-xs" role="list">
                <li>
                  <Link href="/legal#about" className="text-[#C8D0CC] hover:text-[#FAF8F5] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <a href="#philosophy" className="text-[#C8D0CC] hover:text-[#FAF8F5] transition-colors">
                    Philosophy
                  </a>
                </li>
                <li>
                  <a href="#why-local-first" className="text-[#C8D0CC] hover:text-[#FAF8F5] transition-colors">
                    Local-First Architecture
                  </a>
                </li>
                <li>
                  <a href="#roadmap" className="text-[#C8D0CC] hover:text-[#FAF8F5] transition-colors">
                    Updates & Roadmap
                  </a>
                </li>
                <li>
                  <a href="#early-access" className="text-[#E58B4E] hover:text-[#FFAE70] transition-colors font-medium">
                    Early Access Program
                  </a>
                </li>
              </ul>
            </div>

            {/* Governance & Trust */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#FAF8F5] mb-4 font-medium">
                Governance
              </h3>
              <ul className="space-y-3 text-xs" role="list">
                <li>
                  <Link href="/legal#privacy" className="text-[#C8D0CC] hover:text-[#FAF8F5] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal#terms" className="text-[#C8D0CC] hover:text-[#FAF8F5] transition-colors">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/legal#cookies" className="text-[#C8D0CC] hover:text-[#FAF8F5] transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal#security" className="text-[#C8D0CC] hover:text-[#FAF8F5] transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/legal#ai-transparency" className="text-[#C8D0CC] hover:text-[#FAF8F5] transition-colors">
                    AI Transparency
                  </Link>
                </li>
              </ul>
            </div>

            {/* Inquiries & Rights */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#FAF8F5] mb-4 font-medium">
                Inquiries &amp; Rights
              </h3>
              <ul className="space-y-3 text-xs" role="list">
                <li>
                  <a href="mailto:neomagnesisai@gmail.com" className="text-[#C8D0CC] hover:text-[#FAF8F5] transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/neomagnesis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C8D0CC] hover:text-[#FAF8F5] transition-colors inline-flex items-center gap-1"
                  >
                    Discord Community
                    <ArrowUpRight size={11} className="opacity-70" />
                  </a>
                </li>
                <li className="pt-2">
                  <button
                    onClick={() => setDeleteModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#A6B2AC] hover:text-[#E07A74] transition-colors cursor-pointer"
                    aria-label="Delete Early Access registration"
                  >
                    <Trash2 size={11} />
                    <span>Delete Registration</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A6B2AC]"
          style={{ borderTop: '1px solid rgba(42, 45, 44, 0.4)' }}
        >
          <div>© {new Date().getFullYear()} Neomagnesis AI. All rights reserved.</div>
          <div className="flex items-center gap-4 text-[11px] text-[#A6B2AC]">
            <span>Local-First OS</span>
            <span>•</span>
            <span>Zero Data Brokerage</span>
            <span>•</span>
            <span>Sovereign Compute</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer