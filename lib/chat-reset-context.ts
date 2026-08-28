'use client'

import { createContext, useContext } from 'react'

// ─── Chat Reset Context ───────────────────────────────────────────────────────
// Separated from layout.tsx to avoid Next.js TS2344 constraint violation:
// Next.js 14 requires that layout files export ONLY Next.js recognized symbols.
// Exporting useChatReset from layout.tsx caused:
//   error TS2344: Property 'useChatReset' is incompatible with index signature.

export const ChatResetContext = createContext<{ chatKey: number; newChat: () => void }>({
  chatKey: 0,
  newChat: () => {},
})

export const useChatReset = () => useContext(ChatResetContext)
