'use client'

import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import { ArrowUpRight } from 'lucide-react'

interface FooterLinkItem {
  label: string
  href: string
  external?: boolean
}

const footerLinks: Record<string, FooterLinkItem[]> = {
  Architecture: [
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Why Local-First', href: '#why-local-first' },
    { label: 'Workflow Vision', href: '#workflows' },
    { label: 'Use Cases', href: '#use-cases' },
  ],
  Project: [
    { label: 'Access & Membership', href: '#pricing' },
    { label: 'Public Roadmap', href: '#roadmap' },
    { label: 'Early Access', href: '#early-access' },
    { label: 'Discord Community', href: 'https://discord.gg/neomagnesis', external: true },
  ],
  Governance: [
    { label: 'Privacy Policy', href: '/legal' },
    { label: 'Terms of Service', href: '/legal' },
    { label: 'Security & AI Transparency', href: '/legal' },
    { label: 'Contact', href: 'mailto:neomagnesisai@gmail.com' },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-[#2A2D2C] pt-24 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Brand Column (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <Logo width={140} height={32} href="/" />
          <p className="text-sm text-[#9AA19E] leading-relaxed max-w-sm pt-2">
            The Local-First Agentic AI Operating System. Sovereign intelligence, local-first execution, and timeless craftsmanship.
          </p>
          <div className="pt-2 text-xs font-mono text-[#626A66]">
            Direct contact:{' '}
            <a
              href="mailto:neomagnesisai@gmail.com"
              className="text-[#9AA19E] hover:text-[#C87D55] transition-colors"
            >
              neomagnesisai@gmail.com
            </a>
          </div>
        </div>

        {/* Links Columns (7 cols) */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#F1EFE8] mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/legal') ? (
                      <Link
                        href={link.href}
                        className="text-xs text-[#9AA19E] hover:text-[#F1EFE8] transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-xs text-[#9AA19E] hover:text-[#F1EFE8] transition-colors inline-flex items-center gap-1"
                      >
                        {link.label}
                        {link.external && <ArrowUpRight size={11} className="opacity-70" />}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="pt-8 border-t border-[#2A2D2C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#626A66]">
        <div>&copy; {new Date().getFullYear()} Neomagnesis AI. All rights reserved.</div>
        <div className="flex items-center gap-4 text-[#9AA19E]">
          <span>Local-First Architecture</span>
          <span>·</span>
          <span>Air-Gapped Execution</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
