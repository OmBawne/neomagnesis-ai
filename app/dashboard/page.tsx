'use client'

import OverviewPage from '@/components/dashboard/OverviewPage'
import { useAuth } from '@/components/auth/AuthContext'

export default function DashboardPage() {
  const { user } = useAuth()
  return <OverviewPage user={user} />
}
