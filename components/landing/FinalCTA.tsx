'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthContext'

export default function FinalCTA() {
  const { openAuthModal } = useAuth()

  return (
    <section className="relative py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2A2D2C] text-center">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9AA19E] mb-4 block">
          // Deployment
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light text-[#F1EFE8] tracking-[-0.03em] leading-[1.08] mb-6">
          Ready to build with <br />
          <span className="font-normal text-[#F1EFE8]">sovereign intelligence</span>?
        </h2>
        <p className="text-base sm:text-lg text-[#9AA19E] leading-relaxed font-normal mb-10 max-w-xl mx-auto">
          Start deploying autonomous workflows today. Connect your platforms, configure high-level goals, and let Neomagnesis handle execution.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={() => openAuthModal('signup')}
            className="btn-primary px-8 py-3.5 text-sm w-full sm:w-auto justify-center"
          >
            Get Started Free
            <ArrowRight size={14} className="text-[#9AA19E]" />
          </button>
          <a
            href="https://discord.gg/neomagnesis"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-8 py-3.5 text-sm w-full sm:w-auto justify-center"
          >
            Join Community
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="mt-12 text-xs font-mono text-[#626A66]">
          Zero lock-in · Native webhook support · End-to-end data encryption
        </div>
      </motion.div>
    </section>
  )
}

