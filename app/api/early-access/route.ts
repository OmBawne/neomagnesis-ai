import { NextResponse } from 'next/server'
import { registerEarlyAccess } from '@/lib/supabase/early-access'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, username } = body

    const result = await registerEarlyAccess({ name, email, username })

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Unable to process registration at this time.' },
      { status: 500 }
    )
  }
}
