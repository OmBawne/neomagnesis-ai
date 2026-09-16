# Neomagnesis AI — Project Rules

## Product
Neomagnesis AI is a premium, local-first Agentic AI Operating System.
The current public website is an Early Access launch website.
The production dashboard and full AI platform are under development.

## Core Principles
- Premium, minimal, intelligent, timeless.
- Never make the product look childish, generic, cyberpunk, or overly futuristic.
- No neon gradients.
- Avoid unnecessary blue/purple AI aesthetics.
- Prefer the Ink Wash visual language:
  - Deep charcoal/black
  - Warm ivory
  - Soft copper
  - Muted forest tones
  - Warm amber where appropriate
- Follow DESIGN.md whenever it exists.
- Preserve the existing brand identity and Nucleus Loop logo.

## Design
- Apple-level polish and restraint.
- Strong typography and spacing.
- Use subtle motion rather than flashy animation.
- Respect prefers-reduced-motion.
- Glassmorphism should be used intentionally, not everywhere.
- The primary glass element on the public website is the floating navigation dock.
- Avoid excessive blur, glow, shadows, gradients, and rounded containers.
- Never introduce random colors that conflict with the design system.

## Development
- Use TypeScript.
- Follow the existing Next.js App Router architecture.
- Prefer reusable components.
- Keep components maintainable and focused.
- Do not introduce unnecessary dependencies.
- Do not rewrite working systems without a reason.
- Do not change architecture merely for stylistic preference.
- Preserve existing functionality while implementing requested changes.
- Run TypeScript/build checks after substantial changes.

## Data Integrity
- NEVER create fake analytics, fake users, fake workflows, fake metrics, fake activity, or fake system statistics.
- If real data does not exist, clearly show an appropriate empty state.
- Never hardcode a user's name when the authenticated user's information is available.
- Never present placeholder data as real production data.

## Current Public Website
The public website is Early Access only.

Do NOT:
- Redirect visitors to a fake dashboard.
- Claim the full platform is currently available.
- Promise features that have not been released.
- Create fake pricing plans.
- Create fake testimonials or customer statistics.

Early Access registration may collect:
- Name
- Email
- Optional username

The dashboard will be introduced in a future release.

## Authentication
- Supabase is the current authentication/backend system.
- Never expose Supabase service-role credentials to the client.
- Keep secrets in environment variables.
- Never hardcode API keys or secrets.
- Validate user input server-side where applicable.

## Local-First Direction
The future desktop application will use Tauri.
Do not replace Tauri with Electron unless explicitly instructed.
Hardware metrics must be real when implemented.
Never simulate CPU, RAM, storage, or other system information.

## Security
- Treat all user input as untrusted.
- Do not weaken authentication or authorization for convenience.
- Do not disable security controls merely to make development easier.
- Avoid exposing sensitive information in client-side code or logs.
- Rate limiting will be added before production Early Access registration is publicly exposed.
- Follow the legal/security documents in /legal.

## Legal
The legal documents in `/legal` are authoritative project materials.

Do not:
- Invent legal claims.
- Claim Neomagnesis is a registered company unless explicitly confirmed.
- Claim trademarks are registered unless explicitly confirmed.
- Claim certifications or security standards that have not actually been obtained.
- Promise specific security controls that have not been implemented.
- State that unavailable platform functionality currently exists.

## Skills
When available, use the project's installed design/animation skills as references.
Do not blindly copy code from external skill repositories.
Adapt recommendations to Neomagnesis' design system.

## Editing Rules
Before changing code:
1. Inspect the relevant existing implementation.
2. Understand its dependencies.
3. Make the smallest appropriate change.
4. Preserve unrelated functionality.
5. Check for TypeScript/build errors afterward.

Never delete or overwrite large parts of the project without explicit instruction.

## Communication
When explaining changes:
- Be concise.
- State what changed.
- State important files affected.
- Mention any remaining issue or required manual configuration.
