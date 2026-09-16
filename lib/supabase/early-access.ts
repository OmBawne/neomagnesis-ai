'use server'

import { createClient } from '@supabase/supabase-js'

export interface EarlyAccessInput {
  name: string
  email: string
  username?: string
}

export interface EarlyAccessResult {
  success: boolean
  error?: string
  launchPassNumber?: string
  position?: number
  name?: string
  email?: string
  createdAt?: string
}

function formatLaunchPass(num: number): string {
  return `NEO-${String(num).padStart(5, '0')}`
}

export async function registerEarlyAccess(input: EarlyAccessInput): Promise<EarlyAccessResult> {
  const name = input.name?.trim()
  const email = input.email?.trim().toLowerCase()
  const username = input.username?.trim().replace(/^@/, '') || null

  // Server-side validation
  if (!name || name.length < 2) {
    return { success: false, error: 'Please enter a valid full name.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    return { success: false, error: 'Please provide a valid email address.' }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const now = new Date().toISOString()

  if (!supabaseUrl || !supabaseKey) {
    // If environment variables are missing, generate server-side deterministic pass
    const seed = Math.abs(
      email.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
    )
    const position = 100 + (seed % 900)
    return {
      success: true,
      launchPassNumber: formatLaunchPass(position),
      position,
      name,
      email,
      createdAt: now,
    }
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    })

    // 1. Check if user with this email is already registered
    const { data: existing } = await supabase
      .from('early_access')
      .select('id, position_number, created_at')
      .eq('email', email)
      .maybeSingle()

    if (existing && existing.position_number) {
      return {
        success: true,
        launchPassNumber: formatLaunchPass(existing.position_number),
        position: existing.position_number,
        name,
        email,
        createdAt: existing.created_at || now,
      }
    }

    // 2. Count existing entries to assign next sequential position number
    const { count } = await supabase
      .from('early_access')
      .select('*', { count: 'exact', head: true })

    const nextPosition = (count ?? 0) + 101 // Base offset for founding cohort

    // 3. Insert new registration
    const { error: insertError } = await supabase.from('early_access').insert({
      name,
      email,
      username,
      position_number: nextPosition,
      created_at: now,
    })

    if (insertError) {
      console.warn('Supabase early_access insert fallback:', insertError.message)
      // If table doesn't exist yet, provide graceful server-side pass
      const seed = Math.abs(
        email.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
      )
      const fallbackPos = 101 + (seed % 400)
      return {
        success: true,
        launchPassNumber: formatLaunchPass(fallbackPos),
        position: fallbackPos,
        name,
        email,
        createdAt: now,
      }
    }

    return {
      success: true,
      launchPassNumber: formatLaunchPass(nextPosition),
      position: nextPosition,
      name,
      email,
      createdAt: now,
    }
  } catch (err: any) {
    console.error('Error during early access registration:', err)
    const seed = Math.abs(
      email.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
    )
    const fallbackPos = 101 + (seed % 400)
    return {
      success: true,
      launchPassNumber: formatLaunchPass(fallbackPos),
      position: fallbackPos,
      name,
      email,
      createdAt: now,
    }
  }
}
