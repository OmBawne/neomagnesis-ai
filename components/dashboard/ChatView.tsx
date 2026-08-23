'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: Date
}

const WELCOME: Message = {
  id: 'welcome',
  role: 'ai',
  content: "Hello! I'm Neo, your AI automation assistant. I can help you build workflows, generate content, automate your YouTube channel, manage your Discord, and more. What would you like to automate today?",
  timestamp: new Date(),
}

const AI_RESPONSES: Record<string, string> = {
  default: "I understand you want to automate that. Let me help you design a workflow. First, can you tell me more about the trigger — what event should kick off this automation?",
  youtube: "Great choice! For YouTube automation I can help you: (1) Auto-generate Short scripts from trending topics, (2) Schedule uploads with optimized metadata, (3) Sync new videos to your Discord server. Which would you like to start with?",
  discord: "Discord automation is powerful. I can help you set up: (1) Welcome message flows, (2) Role assignment triggers, (3) Content announcement pipelines, (4) AI moderation responses. What does your community need?",
  lead: "Lead generation workflows are one of our most popular templates. I'll build you a flow that: captures from multiple sources, scores leads with AI, sends qualified contacts to your CRM, and triggers follow-up sequences. Ready to configure?",
}

function getAIResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('youtube') || lower.includes('video') || lower.includes('short')) return AI_RESPONSES.youtube
  if (lower.includes('discord') || lower.includes('community') || lower.includes('server')) return AI_RESPONSES.discord
  if (lower.includes('lead') || lower.includes('crm') || lower.includes('sales')) return AI_RESPONSES.lead
  return AI_RESPONSES.default
}

interface ChatViewProps {
  resetKey?: number
  projectTitle?: string
}

export default function ChatView({ resetKey = 0, projectTitle }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [typingText, setTypingText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setMessages([{ ...WELCOME, timestamp: new Date() }])
    setInput('')
  }, [resetKey])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typingText])

  const sendMessage = async () => {
    if (!input.trim() || typing) return
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTypingText('')

    const response = getAIResponse(userMsg.content)
    await new Promise(r => setTimeout(r, 600))

    // Typewriter effect
    let i = 0
    const interval = setInterval(() => {
      i++
      setTypingText(response.slice(0, i))
      if (i >= response.length) {
        clearInterval(interval)
        setTyping(false)
        setTypingText('')
        setMessages(prev => [
          ...prev,
          { id: Date.now().toString(), role: 'ai', content: response, timestamp: new Date() },
        ])
      }
    }, 18)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
          <Bot size={14} className="text-indigo-400" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-white">{projectTitle ?? 'Neo AI'}</h1>
          <p className="text-[10px] text-slate-600">AI Automation Assistant</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse block" />
          Online
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden mt-0.5" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
                  <Logo variant="icon" width={18} height={18} />
                </div>
              )}
              <div className={msg.role === 'user' ? 'chat-user' : 'chat-ai'}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {typing && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start"
          >
            <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden mt-0.5" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
              <Logo variant="icon" width={18} height={18} />
            </div>
            <div className="chat-ai min-w-[40px]">
              {typingText || (
                <span className="flex gap-1 items-center py-0.5">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              )}
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 pb-6 pt-3 border-t border-white/[0.06]">
        <div className="flex gap-3 items-end p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Message Neo AI..."
            rows={1}
            className="flex-1 bg-transparent outline-none text-sm text-slate-200 placeholder-slate-600 resize-none leading-relaxed"
            style={{ maxHeight: 120 }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || typing}
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 disabled:opacity-30"
            style={{ background: input.trim() ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.06)' }}
          >
            <Send size={14} className="text-white" />
          </button>
        </div>
        <p className="text-[10px] text-slate-700 text-center mt-2">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}
