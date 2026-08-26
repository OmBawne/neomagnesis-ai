'use client'

import { Bot, ChevronLeft } from 'lucide-react'

export default function AIRail() {
  return (
    <div
      style={{
        width: 40,
        flexShrink: 0,
        background: '#0C0F11',
        borderLeft: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '0 24px 24px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 24,
        position: 'relative',
        userSelect: 'none',
      }}
    >
      {/* Bot icon */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: 'rgba(139,92,246,0.12)',
          border: '1px solid rgba(139,92,246,0.22)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          flexShrink: 0,
        }}
      >
        <Bot size={14} color="#a78bfa" />
      </div>

      {/* Vertical label block */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        {/* AI ASSISTANT text rotated */}
        <div
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: '#8F9693',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          AI ASSISTANT
        </div>

        {/* Divider dot */}
        <div
          style={{
            width: 3,
            height: 3,
            borderRadius: '50%',
            background: 'rgba(143,150,147,0.25)',
            flexShrink: 0,
          }}
        />

        {/* CLICK TO EXPAND text rotated */}
        <div
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: 7.5,
            fontWeight: 500,
            letterSpacing: '0.14em',
            color: 'rgba(143,150,147,0.4)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          CLICK TO EXPAND
        </div>
      </div>

      {/* Chevron arrow at bottom */}
      <div style={{ opacity: 0.3, marginTop: 16 }}>
        <ChevronLeft size={14} color="#8F9693" />
      </div>
    </div>
  )
}
