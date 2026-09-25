import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'

const sections = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    content: `Effective Date: June 1, 2026 | Contact: neomagnesisai@gmail.com

1. Introduction
At Neomagnesis AI, privacy is an architectural pillar, not an afterthought. This Privacy Policy explains what information we collect when you visit our website, register for Early Access, and how we handle your data.

2. Information We Collect
For Early Access registration, we collect:
• Full Name
• Email Address
• Chosen Username
We do not sell, rent, monetize, or broker your personal information to any third party.

3. Local-First Architecture Guarantee
The future Neomagnesis AI operating system executes models and workflows locally on your own machine. Your prompts, context, documents, agent executions, and file outputs reside strictly on your local hardware.

4. Data Retention & Deletion
We retain registration information exclusively for coordinating Early Access and notifying you of platform availability. You may exercise your right to deletion at any time via the permanent "Delete Registration" link in our website footer.

5. Cookies & Tracking
We do not utilize invasive tracking pixels or cross-site commercial trackers. Minimal technical session cookies are utilized solely for security and accessibility state.

6. Inquiries
For any privacy inquiries or data subject access requests, please contact: neomagnesisai@gmail.com.`,
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    content: `Effective Date: June 1, 2026 | Contact: neomagnesisai@gmail.com

1. Acceptance of Terms
By accessing or using the Neomagnesis AI website and early access services, you agree to comply with and be bound by these Terms & Conditions.

2. Early Access Program
Neomagnesis AI is currently in active development. Early Access registration provides priority consideration for private preview builds. Registration does not constitute an immediate grant of software license or guarantee of access to unreleased features.

3. Intellectual Property
All software, visual identities, the Nucleus Loop trademark, designs, and architectural specifications are the proprietary intellectual property of Neomagnesis AI.

4. Acceptable Conduct
You agree not to disrupt, reverse-engineer, or attempt unauthorized access to our registration infrastructure, nor use our services for malicious automated activity.

5. Disclaimer of Warranties
Early Access materials and website content are provided "as is" without warranty of any kind, express or implied.

6. Governing Law
These Terms are governed by and construed in accordance with applicable laws.`,
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    content: `Effective Date: June 1, 2026 | Contact: neomagnesisai@gmail.com

1. What Are Cookies
Cookies are small text files placed on your device to maintain interface state and secure session continuity.

2. How Neomagnesis Uses Cookies
• Strictly Essential: Session tokens and security verification.
• Functional: Remembering user preferences such as reduced motion settings and theme mode.
• No Third-Party Tracking Cookies: We do not serve third-party marketing or cross-site tracking cookies.

3. Managing Your Preferences
You can disable or delete cookies through your browser settings. Disabling essential cookies may impact your ability to register for early access.`,
  },
  {
    id: 'security',
    title: 'Security & Integrity',
    content: `Effective Date: June 1, 2026 | Contact: neomagnesisai@gmail.com

1. Security Doctrine
Neomagnesis is engineered around local sovereignty:
• Data Minimization: We collect only what is strictly necessary.
• Transport Layer Security: All client communication uses modern HTTPS/TLS with strong cipher suites.
• Air-Gapped Readiness: Local runtime systems are designed to function without constant internet connectivity.

2. Vulnerability Reporting
We welcome responsible disclosure of potential security vulnerabilities. If you believe you have discovered a vulnerability, please contact our security team directly at neomagnesisai@gmail.com.`,
  },
  {
    id: 'ai-transparency',
    title: 'AI Transparency',
    content: `Effective Date: June 1, 2026 | Contact: neomagnesisai@gmail.com

1. Autonomous Agents & Determinism
Neomagnesis AI provides agentic orchestration running against your local hardware. Agents perform tasks with user-defined boundaries, verifiable tool logs, and explicit permissions.

2. Model Sovereignty & Weights
Users retain choice of underlying language model weights (open-weights local models or user-configured API endpoints). Neomagnesis does not intercept, log, or harvest your private inferences to train centralized models.

3. Honest Capability Disclosures
We reject deceptive benchmarks, simulated telemetry, and exaggerated marketing claims. Our architectural milestones and specifications reflect genuine system capabilities.`,
  },
  {
    id: 'about',
    title: 'About Neomagnesis AI',
    content: `Neomagnesis AI is developing a Local-First Agentic AI Operating System.

We believe the next era of personal computing belongs to software that honors user sovereignty, operates directly on personal hardware, and coordinates intelligent autonomous agents without surrender of privacy or reliance on centralized cloud monopolies.

Our design language and architectural doctrine are built upon restraint, intelligence, and timeless craftsmanship.`,
  },
]

export const metadata = {
  title: 'Legal & Governance — Neomagnesis AI',
  description: 'Privacy Policy, Terms & Conditions, Cookie Policy, Security, and AI Transparency for Neomagnesis AI.',
}

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[#080909] text-[#FAF8F5]">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-30 bg-[#080909]/90 backdrop-blur-xl border-b border-[#2A2D2C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-[#C8D0CC] hover:text-[#FAF8F5] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>← Back to Home</span>
          </Link>
          <nav className="flex items-center gap-4 overflow-x-auto text-xs font-mono py-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-[#C8D0CC] hover:text-[#E58B4E] transition-colors whitespace-nowrap"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Page Title Header */}
        <div className="mb-14 text-center">
          <div className="flex justify-center mb-6">
            <Logo variant="icon" height={44} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-[#FAF8F5] mb-2 tracking-tight">
            Legal &amp; Governance
          </h1>
          <p className="text-xs font-mono text-[#A6B2AC]">Neomagnesis AI — Early Access Documentation</p>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {sections.map((section, i) => (
            <div key={section.id} id={section.id} className="scroll-mt-20">
              <div className="mb-8 pb-4 border-b border-[#2A2D2C]">
                <span className="text-[10px] font-mono uppercase text-[#E58B4E] bg-[#E58B4E]/10 border border-[#E58B4E]/30 px-2.5 py-1 rounded-full font-medium">
                  Section 0{i + 1}
                </span>
                <h2 className="text-2xl font-light text-[#FAF8F5] mt-3">{section.title}</h2>
              </div>
              <div
                className="prose prose-invert max-w-none text-[#C8D0CC] text-sm leading-relaxed"
                style={{ lineHeight: '1.8' }}
              >
                {section.content.split('\n\n').map((para, pi) => {
                  if (para.startsWith('•')) {
                    const items = para.split('\n').filter((l) => l.startsWith('•'))
                    return (
                      <ul key={pi} className="my-4 pl-5 space-y-1.5 list-disc text-[#C8D0CC]">
                        {items.map((item, ii) => (
                          <li key={ii}>{item.replace('• ', '')}</li>
                        ))}
                      </ul>
                    )
                  }
                  if (/^\d+\./.test(para) && para.length < 80) {
                    return (
                      <h3 key={pi} className="text-[#FAF8F5] font-normal text-base mt-6 mb-2">
                        {para}
                      </h3>
                    )
                  }
                  if (para.trim()) {
                    return (
                      <p key={pi} className="mb-4">
                        {para}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-[#2A2D2C] text-center text-xs font-mono text-[#A6B2AC]">
          <p>
            Direct inquiries:{' '}
            <a href="mailto:neomagnesisai@gmail.com" className="text-[#E58B4E] hover:underline">
              neomagnesisai@gmail.com
            </a>
          </p>
          <p className="mt-2 text-[#A6B2AC]">© {new Date().getFullYear()} Neomagnesis AI. All rights reserved.</p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#C8D0CC] hover:text-[#FAF8F5] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>← Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
