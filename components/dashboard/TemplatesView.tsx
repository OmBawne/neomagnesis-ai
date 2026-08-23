'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layout, Youtube, MessageSquare, Users, ArrowRight, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

const templates = [
  {
    id: 'youtube',
    icon: Youtube,
    title: 'YouTube Automation',
    desc: 'Auto-generate Short scripts from trending topics, add voiceover, and upload on a schedule. Fully hands-free.',
    tags: ['Content', 'AI', 'Scheduling'],
    color: '#ef4444',
    steps: ['Fetch trending topics', 'Generate script via AI', 'Create voiceover', 'Upload to YouTube', 'Post to Discord'],
  },
  {
    id: 'discord',
    icon: MessageSquare,
    title: 'Discord Automation',
    desc: 'Set up welcome flows, auto-role assignment, community announcements, and AI-powered moderation responses.',
    tags: ['Community', 'Moderation', 'AI'],
    color: '#5865f2',
    steps: ['Monitor events', 'Trigger welcome flow', 'Assign roles', 'Post announcements', 'AI moderation'],
  },
  {
    id: 'leads',
    icon: Users,
    title: 'Lead Generation',
    desc: 'Capture leads from your website and socials, score them with AI, and push qualified contacts to your CRM.',
    tags: ['Growth', 'CRM', 'AI Scoring'],
    color: '#3b82f6',
    steps: ['Capture form submissions', 'Enrich contact data', 'AI lead scoring', 'Push to CRM', 'Send follow-up email'],
  },
]

export default function TemplatesView() {
  const router = useRouter()
  const [creating, setCreating] = useState<string | null>(null)
  const [created, setCreated] = useState<string | null>(null)

  const handleUse = async (id: string) => {
    setCreating(id)
    await new Promise(r => setTimeout(r, 900))
    setCreating(null)
    setCreated(id)
    await new Promise(r => setTimeout(r, 800))
    router.push('/dashboard/projects')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <h1 className="text-base font-semibold text-white">Templates</h1>
        <p className="text-xs text-slate-500 mt-0.5">Start with a pre-built workflow — customize it as needed</p>
      </div>

      {/* Templates */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {templates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-light rounded-xl border border-white/[0.06] overflow-hidden group hover:border-white/[0.12] transition-all duration-200"
            >
              {/* Card top */}
              <div className="p-5 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${t.color}18`, border: `1px solid ${t.color}30` }}
                  >
                    <t.icon size={18} style={{ color: t.color }} />
                  </div>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {t.tags.map(tag => (
                      <span key={tag} className="text-[9px] text-slate-500 bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{t.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{t.desc}</p>
              </div>

              {/* Steps */}
              <div className="px-5 pb-4">
                <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-2 font-medium">Workflow Steps</p>
                <div className="space-y-1.5">
                  {t.steps.map((step, idx) => (
                    <div key={step} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0"
                        style={{ background: `${t.color}20`, color: t.color }}
                      >
                        {idx + 1}
                      </div>
                      <span className="text-[11px] text-slate-500">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="px-5 pb-5">
                <button
                  onClick={() => handleUse(t.id)}
                  disabled={!!creating}
                  className="w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    background: created === t.id ? 'rgba(34,197,94,0.15)' : `${t.color}18`,
                    border: `1px solid ${created === t.id ? 'rgba(34,197,94,0.3)' : `${t.color}30`}`,
                    color: created === t.id ? '#22c55e' : t.color,
                  }}
                >
                  {creating === t.id ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                      Creating project...
                    </span>
                  ) : created === t.id ? (
                    <><Check size={13} /> Project created</>
                  ) : (
                    <>Use Template <ArrowRight size={13} /></>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
