'use client'

import ChatView from '@/components/dashboard/ChatView'
import { useChatReset } from './layout'

export default function DashboardPage() {
  const { chatKey } = useChatReset()
  return <ChatView resetKey={chatKey} />
}
