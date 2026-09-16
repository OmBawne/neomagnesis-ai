# ROADMAP.md — Neomagnesis AI Build Phases

> **This document is the authoritative boundary reference.**
> Future agents must read this file before making any changes to understand which features belong to which version. Mixing public marketing site code with the SaaS dashboard is a critical error.

---

## Version 1 — Public Website (Current)

**Status**: In Progress (Brand Launch)
**Purpose**: Public brand launch. Early Access registration. No application functionality.

### What Version 1 IS

- Public marketing website at root URL (`/`)
- Early Access registration form (Supabase insert only)
- Legal pages (`/legal`) — Privacy, Terms, Security, AI Transparency
- SEO optimization
- Brand identity system
- Nucleus Loop logo and visual language

### What Version 1 Contains

**Pages**:
- `/` — Main landing page
- `/legal` — Legal documents

**Sections on `/`**:
1. Loading Sequence — Nucleus Loop intro
2. Dock — Floating glass navigation
3. Hero — 3D Living Core + headline + CTAs
4. Philosophy — Editorial statements
5. Why Local First — Blueprint diagrams
6. Workflow Vision — Node graph diagrams
7. Use Cases — Archetype cards
8. Pricing — Honest "TBA" section
9. Roadmap — Public milestone timeline
10. Early Access — Registration form + Launch Pass
11. Footer — Links, legal, contact

**Components in scope**:
- Everything in `components/landing/`
- Everything in `components/ui/` (global UI helpers)
- `components/shared/Logo.tsx`
- `components/shared/BackgroundElements.tsx`

**Infrastructure**:
- Next.js 14 App Router
- Supabase (auth + early_access table only)
- Framer Motion
- React Three Fiber (hero only)

### What Version 1 DOES NOT Contain

- No dashboard pages (`/dashboard`)
- No AI workflow execution
- No file management
- No agent configuration
- No settings pages
- No user management UI
- No billing or subscription management
- No real-time data or websockets
- No Tauri desktop integration
- No API routes beyond auth callbacks and early access submission

---

## Version 2 — Dashboard (Planned)

**Status**: Planned
**Purpose**: Authenticated SaaS dashboard for early access users.

### What Version 2 IS

- Protected application area at `/dashboard`
- First real product experience for early access members
- Invitation-only access (email invitation flow)

### What Version 2 Will Contain

**Pages** (all under `/dashboard/**`):
- `/dashboard` — Home / overview
- `/dashboard/workflows` — Workflow listing and management
- `/dashboard/agents` — Agent configuration
- `/dashboard/settings` — User preferences
- `/dashboard/billing` — Future billing (not V2)

**Components** (new, separate from V1):
- Sidebar navigation (replaces Dock in dashboard context)
- Command palette
- Workflow builder canvas
- Agent cards
- Activity feed (real data only)
- Settings panels

**Infrastructure additions**:
- Supabase RLS policies for user data isolation
- Additional database tables (workflows, agents, executions)
- Server-sent events or Supabase realtime
- Edge functions for agent execution

### Dashboard Visual Identity

The dashboard INHERITS from the public website design system:
- Identical color tokens (`--color-bg`, `--color-surface`, etc.)
- Identical typography (Inter, same weights)
- Identical button variants (`.btn-primary`, `.btn-ghost`)
- Identical input styling (`.neo-input`)
- Identical card surface treatment

The dashboard DOES NOT use:
- The floating glass Dock (use a sidebar or top bar instead)
- The 3D hero canvas (HeroCanvas stays on `/` only)
- Marketing copy or CTAs
- The loading sequence (Nucleus Loop loader is for public site only)
- The cursor light or scroll progress line (optional for dashboard)
- PhilosophySection, WhyLocalFirst, WorkflowVision, RoadmapSection, EarlyAccessSection

---

## Version 3 — Desktop Application (Future)

**Status**: Concept Phase
**Purpose**: Native desktop application via Tauri.

### Version 3 Direction

- Built with Tauri (not Electron)
- Local-first: all data stored on user device by default
- Hardware metrics: real system data only (CPU, RAM, storage)
- AI model execution: local models via Ollama or similar
- Desktop-native: file system access, system notifications, tray icon

### What Version 3 Inherits

- All color tokens and design system
- Component patterns from Version 2 dashboard
- Supabase only for sync/backup (optional)

---

## Critical Boundaries for Future Agents

### The Public/Dashboard Boundary

```
NEVER do this:
- Add a dashboard widget to the public homepage
- Redirect public visitors to /dashboard
- Show authenticated-only content on public pages (except the auth modal)
- Import dashboard components into landing components
- Import landing components into dashboard components

ALWAYS do this:
- Check which version a feature belongs to before building
- Keep /app/page.tsx (public) and /app/dashboard/** (private) completely separate
- New landing features → components/landing/
- New dashboard features → components/dashboard/ (to be created in V2)
```

### Data Integrity Rules (All Versions)

```
NEVER:
- Create fake analytics, fake users, fake workflows
- Show placeholder data as real production data
- Hardcode metrics that sound real (uptime percentages, user counts)
- Create fake testimonials

ALWAYS:
- Show honest empty states when real data does not exist
- Use real authenticated user data (not hardcoded names)
- Label Early Access features honestly
```

### Authentication Rules (All Versions)

```
NEVER:
- Expose service-role keys to client components
- Hardcode API keys or secrets
- Redirect unauthenticated users to the dashboard in V1

V1 Auth is for: sign up / sign in only
Dashboard access: invitation-only in V2
```

---

## Milestone Status

| Milestone | Version | Status |
|---|---|---|
| Brand Identity & Logo | V1 | ✓ Complete |
| Design System (DESIGN.md) | V1 | ✓ Complete |
| Animation System | V1 | ✓ Complete |
| Public Website Build | V1 | ⟳ In Progress |
| Early Access Registration | V1 | ⟳ In Progress |
| Legal Pages | V1 | ✓ Complete |
| Email Invitation System | V1→V2 | ◷ Upcoming |
| Dashboard Preview | V2 | ◷ Upcoming |
| Workflow Builder | V2 | ◷ Upcoming |
| Agent Configuration | V2 | ◷ Upcoming |
| Tauri Desktop App | V3 | ◷ Future |
| Local Model Execution | V3 | ◷ Future |

---

*No dates are published. Milestones progress when quality meets standard, not when calendars dictate.*
