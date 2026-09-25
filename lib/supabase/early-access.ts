/**
 * early-access.ts — Authoritative server-side registration and storage logic.
 * Called exclusively from server API routes (/api/early-access, /api/delete-registration).
 */

import { promises as fs } from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

export interface EarlyAccessInput {
  name: string
  email: string
  username: string
}

export interface EarlyAccessResult {
  success: boolean
  error?: string
  launchPassNumber?: string
  name?: string
  email?: string
  username?: string
  registrationDate?: string
}

const CSV_PATH = path.join(process.cwd(), 'data', 'early-access-registrations.csv')
const CSV_HEADER = 'Launch Pass,Name,Username,Email,Registration Date\n'

/** Format Launch Pass: USER001, USER002, ... */
export function formatLaunchPass(num: number): string {
  return `USER${String(num).padStart(3, '0')}`
}

/** Simple CSV parser for standard quotes/commas */
function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

/** Escape field for CSV */
function escapeCsvField(val: string): string {
  if (val.includes(',') || val.includes('"') || val.includes('\n')) {
    return `"${val.replace(/"/g, '""')}"`
  }
  return val
}

/** Ensure CSV file exists with the standard 5 columns */
async function ensureCsvExists(): Promise<void> {
  try {
    await fs.access(CSV_PATH)
  } catch {
    await fs.mkdir(path.dirname(CSV_PATH), { recursive: true })
    await fs.writeFile(CSV_PATH, CSV_HEADER, 'utf-8')
  }
}

/** Read all valid registrations from CSV */
async function readRegistrationsFromCsv(): Promise<Array<{
  launchPass: string
  name: string
  username: string
  email: string
  registrationDate: string
}>> {
  await ensureCsvExists()
  const content = await fs.readFile(CSV_PATH, 'utf-8')
  const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0)
  if (lines.length <= 1) return []

  const headerParts = parseCsvLine(lines[0]).map(h => h.toLowerCase().trim())
  const hasV1Format = headerParts.includes('position') || headerParts.includes('country')

  const records = []
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i])
    if (cols.length < 4) continue

    if (hasV1Format) {
      // Old format: Launch Pass,Name,Email,Username,Country,Use Case,Position,Created At
      records.push({
        launchPass: cols[0] || '',
        name: cols[1] || '',
        username: (cols[3] || '').replace(/^@/, '').toLowerCase(),
        email: (cols[2] || '').toLowerCase(),
        registrationDate: cols[7] || cols[cols.length - 1] || '',
      })
    } else {
      // Standard format: Launch Pass,Name,Username,Email,Registration Date
      records.push({
        launchPass: cols[0] || '',
        name: cols[1] || '',
        username: (cols[2] || '').replace(/^@/, '').toLowerCase(),
        email: (cols[3] || '').toLowerCase(),
        registrationDate: cols[4] || '',
      })
    }
  }
  return records
}

/** Rewrite CSV with standard format */
async function writeAllRegistrationsToCsv(records: Array<{
  launchPass: string
  name: string
  username: string
  email: string
  registrationDate: string
}>): Promise<void> {
  await ensureCsvExists()
  const rows = [CSV_HEADER.trim()]
  for (const r of records) {
    rows.push([
      escapeCsvField(r.launchPass),
      escapeCsvField(r.name),
      escapeCsvField(r.username),
      escapeCsvField(r.email),
      escapeCsvField(r.registrationDate),
    ].join(','))
  }
  const tempPath = `${CSV_PATH}.tmp`
  await fs.writeFile(tempPath, rows.join('\n') + '\n', 'utf-8')
  await fs.rename(tempPath, CSV_PATH)
}

/** Send Welcome confirmation email */
async function sendConfirmationEmail(data: {
  launchPassNumber: string
  name: string
  username: string
  email: string
  registrationDate: string
}): Promise<void> {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const fromEmail = process.env.FROM_EMAIL || 'neomagnesisai@gmail.com'

  const formattedDate = new Date(data.registrationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Neomagnesis Early Access</title>
</head>
<body style="margin: 0; padding: 0; background: #08090A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F1EFE8;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 580px; margin: 0 auto; padding: 48px 24px;">
    <tr>
      <td style="text-align: center; padding-bottom: 32px;">
        <div style="font-size: 13px; font-family: monospace; letter-spacing: 0.2em; text-transform: uppercase; color: #C87D55; margin-bottom: 16px;">
          Early Access • Verified Registration
        </div>
        <h1 style="font-size: 28px; font-weight: 300; letter-spacing: -0.02em; margin: 0 0 12px; color: #F1EFE8;">
          Welcome to Neomagnesis Early Access
        </h1>
        <p style="font-size: 15px; line-height: 1.6; color: #9AA19E; margin: 0;">
          Your registration has been confirmed. Below is your official Launch Pass credential.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #111314; border: 1px solid rgba(200, 125, 85, 0.35); border-radius: 16px; overflow: hidden;">
          <tr>
            <td style="padding: 24px; border-bottom: 1px solid #232726;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family: monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #7A817E;">
                    Neomagnesis AI — Launch Pass
                  </td>
                  <td style="text-align: right;">
                    <span style="font-family: monospace; font-size: 10px; color: #5BA87E; background: rgba(91, 168, 126, 0.12); border: 1px solid rgba(91, 168, 126, 0.3); padding: 4px 10px; border-radius: 4px;">
                      Verified
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 24px;">
              <div style="font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #7A817E; margin-bottom: 6px;">
                Launch Pass ID
              </div>
              <div style="font-family: monospace; font-size: 32px; font-weight: 400; letter-spacing: 0.08em; color: #C87D55;">
                ${data.launchPassNumber}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 24px; border-top: 1px solid #232726; background: #0E1010;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family: monospace; font-size: 12px;">
                <tr>
                  <td style="color: #7A817E; padding-bottom: 4px;">Name</td>
                  <td style="color: #F1EFE8; text-align: right; padding-bottom: 4px;">${data.name}</td>
                </tr>
                <tr>
                  <td style="color: #7A817E; padding-bottom: 4px;">Username</td>
                  <td style="color: #F1EFE8; text-align: right; padding-bottom: 4px;">@${data.username}</td>
                </tr>
                <tr>
                  <td style="color: #7A817E; padding-bottom: 4px;">Email</td>
                  <td style="color: #F1EFE8; text-align: right; padding-bottom: 4px;">${data.email}</td>
                </tr>
                <tr>
                  <td style="color: #7A817E;">Registration Date</td>
                  <td style="color: #F1EFE8; text-align: right;">${formattedDate}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px 0; text-align: center;">
        <p style="font-size: 14px; line-height: 1.6; color: #9AA19E; margin: 0 0 16px;">
          The full Neomagnesis AI platform and desktop application are under active development. Your private dashboard invitation and alpha build access will arrive directly at this email when your cohort is admitted.
        </p>
        <p style="font-size: 12px; color: #626A66; margin: 0;">
          Local-First Agentic AI Operating System
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    console.log('[Early Access] Confirmation email queued (SMTP credentials not provided in environment):', {
      to: data.email,
      pass: data.launchPassNumber,
    })
    return
  }

  try {
    const nodemailer = await import('nodemailer')
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: parseInt(smtpPort, 10) === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })

    await transporter.sendMail({
      from: `Neomagnesis AI <${fromEmail}>`,
      to: data.email,
      subject: 'Welcome to Neomagnesis Early Access — Your Launch Pass',
      html,
    })
  } catch (err) {
    console.warn('[Early Access] Failed to dispatch SMTP email:', err)
  }
}

/** Register for Early Access */
export async function registerEarlyAccess(input: EarlyAccessInput): Promise<EarlyAccessResult> {
  const name = input.name?.trim()
  const email = input.email?.trim().toLowerCase()
  const username = input.username?.trim().replace(/^@/, '').toLowerCase()

  // 1. Validation
  if (!name || name.length < 2) {
    return { success: false, error: 'Please enter a valid full name.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  if (!username || username.length < 2) {
    return { success: false, error: 'Please choose a username (minimum 2 characters).' }
  }

  const usernameRegex = /^[a-z0-9_.-]{2,32}$/
  if (!usernameRegex.test(username)) {
    return {
      success: false,
      error: 'Username may only contain lowercase letters, numbers, underscores, hyphens, and dots.',
    }
  }

  const now = new Date().toISOString()

  // 2. Read existing CSV records to enforce uniqueness
  const existingRecords = await readRegistrationsFromCsv()

  // Prevent duplicate email
  const existingByEmail = existingRecords.find(r => r.email.toLowerCase() === email)
  if (existingByEmail) {
    return {
      success: false,
      error: 'This email is already registered. Your Launch Pass has already been issued.',
    }
  }

  // Prevent duplicate username
  const existingByUsername = existingRecords.find(r => r.username.toLowerCase() === username)
  if (existingByUsername) {
    return {
      success: false,
      error: 'That username is already taken. Please choose a different one.',
    }
  }

  // Generate unique sequential Launch Pass
  const nextNum = existingRecords.length + 1
  const launchPassNumber = formatLaunchPass(nextNum)

  const newRecord = {
    launchPass: launchPassNumber,
    name,
    username,
    email,
    registrationDate: now,
  }

  existingRecords.push(newRecord)
  await writeAllRegistrationsToCsv(existingRecords)

  // Supabase sync if credentials available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
      await supabase.from('early_access').insert({
        name,
        email,
        username,
        position_number: nextNum,
        created_at: now,
      })
    } catch (e) {
      console.warn('[Early Access] Optional Supabase sync skipped:', e)
    }
  }

  // Send confirmation email
  await sendConfirmationEmail({
    launchPassNumber,
    name,
    username,
    email,
    registrationDate: now,
  })

  return {
    success: true,
    launchPassNumber,
    name,
    email,
    username,
    registrationDate: now,
  }
}

/** Permanently delete registration record */
export async function deleteRegistration(email: string): Promise<{ success: boolean; error?: string }> {
  const normalizedEmail = email?.trim().toLowerCase()

  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    return { success: false, error: 'Please provide a valid registration email address.' }
  }

  const existingRecords = await readRegistrationsFromCsv()
  const matching = existingRecords.filter(r => r.email.toLowerCase() === normalizedEmail)

  if (matching.length === 0) {
    return {
      success: false,
      error: 'No registration was found matching that email address.',
    }
  }

  // Remove matching records
  const updatedRecords = existingRecords.filter(r => r.email.toLowerCase() !== normalizedEmail)
  await writeAllRegistrationsToCsv(updatedRecords)

  // Also remove from Supabase if configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
      await supabase.from('early_access').delete().eq('email', normalizedEmail)
    } catch (e) {
      console.warn('[Early Access] Supabase delete sync notice:', e)
    }
  }

  return { success: true }
}
