# COMPONENTS.md — Neomagnesis AI Component Reference

> **Applies To**: Public website (Version 1). See ROADMAP.md for dashboard component scope.

---

## Component Hierarchy

```
app/
  layout.tsx         — Root: fonts, metadata, providers, global UI
  page.tsx           — Public landing page assembly

components/
  ui/
    ScrollProgressLine   — 1px copper scroll indicator
    CursorLight          — Cursor-reactive warm ambient glow
    LoadingSequence      — Nucleus Loop intro loader
    SmoothReveal         — Reusable scroll-reveal wrapper

  landing/
    Dock                 — macOS-style floating glass navigation
    Hero                 — Hero section shell (layout + text)
    hero/
      HeroCanvas         — Three.js Canvas wrapper (client-only)
      LivingCore         — Custom orbital ribbon geometry
      ParticleField      — 8-point ambient particle system
      CopperLights       — Warm directional light setup
      CursorParallax     — Mouse-reactive camera controller
      Environment        — Scene environment and fog
    PhilosophySection    — Editorial typography section
    WhyLocalFirst        — Blueprint SVG diagrams section
    WorkflowVision       — Animated node diagram section
    UseCases             — Four premium user archetype cards
    PricingSection       — Honest pricing / Early Access benefits
    RoadmapSection       — Public milestone timeline
    EarlyAccessSection   — Conversion form + Launch Pass
    Footer               — Premium minimal footer

  shared/
    Logo                 — Nucleus Loop mark + wordmark
    BackgroundElements   — Grain texture overlay

  auth/
    AuthContext          — Supabase auth state (preserved)
    AuthModal            — Auth modal (preserved)
```

---

## Global UI Components

### `ScrollProgressLine`
**File**: `components/ui/ScrollProgressLine.tsx`
**Purpose**: 1px copper line at top of viewport showing scroll depth.
**Props**: None
**Behavior**:
- Fixed position, `top: 0`, `left: 0`, full width, z-index 100
- Width = `(scrollY / (documentHeight - windowHeight)) * 100%`
- Color: `var(--color-accent)`
- No transition — direct follow
- Visibility: always visible (not hidden on hero)
**Accessibility**: `role="progressbar"`, `aria-hidden="true"` (decorative)

---

### `CursorLight`
**File**: `components/ui/CursorLight.tsx`
**Purpose**: Subtle warm ambient glow that follows cursor.
**Props**: None
**Behavior**:
- Radial gradient div, pointer-events: none, fixed position
- Follows `mousemove` with lag factor 0.08
- Glow: 400px radius, `rgba(184, 115, 51, 0.04)` center → transparent
- Hidden on touch devices (`hover: none` media query)
- Disabled when `prefers-reduced-motion: reduce`
**Note**: Very subtle — should be nearly imperceptible, felt not seen

---

### `LoadingSequence`
**File**: `components/ui/LoadingSequence.tsx`
**Purpose**: Minimalist entrance loader featuring the Nucleus Loop mark.
**Props**: `onComplete: () => void`
**Behavior**:
- Full-screen `#080909` overlay, z-index 200
- Nucleus Loop SVG centered, draws in via `strokeDashoffset` (0.8s)
- Fades out after 1.2s total
- Sets `sessionStorage.setItem('neo-loaded', '1')` after first show
- On subsequent visits: calls `onComplete()` immediately
**Accessibility**: `aria-live="polite"`, `aria-label="Loading Neomagnesis"`

---

### `SmoothReveal`
**File**: `components/ui/SmoothReveal.tsx`
**Purpose**: Reusable scroll-triggered reveal wrapper.
**Props**:
```ts
interface SmoothRevealProps {
  children: React.ReactNode
  delay?: number      // seconds, default 0
  className?: string
  direction?: 'up' | 'fade' // default 'up'
}
```
**Behavior**: Wraps children in Framer Motion div with `whileInView` entrance.

---

## Navigation

### `Dock`
**File**: `components/landing/Dock.tsx`
**Purpose**: macOS-inspired floating glass navigation dock.
**Props**: None
**Spec**:
- Fixed `top: 24px`, centered horizontally, z-index 50
- Glass background (see DESIGN.md glass spec)
- Items: Home, Philosophy, Why Local-First, Workflows, Use Cases, Roadmap, Early Access
- "Early Access" rendered as copper-accented CTA pill
- Logo mark (icon only) on left of dock items
**Hover behavior**:
- Spring magnification on hovered item (scale 1.15) and neighbors (1.06)
- Tooltip label appears above hovered item
- No JS library needed — pure Framer Motion spring
**Keyboard**: `role="navigation"`, all links keyboard focusable, visible focus ring
**Mobile**: Collapses to hamburger → full-screen overlay menu at <768px

---

## Hero Components

### `Hero`
**File**: `components/landing/Hero.tsx`
**Purpose**: Full-screen hero section shell.
**Layout**:
- `min-h-screen` flex column, items centered
- HeroCanvas absolutely positioned behind content
- Text content: centered, z-index above canvas
- Headline: "Neomagnesis" — display size, font-weight 300
- Subtitle: "The Local-First Agentic AI Operating System."
- Buttons: "Join Early Access" (primary) + "Explore the Vision" (ghost)
- Scroll indicator: animated chevron at bottom

---

### `HeroCanvas`
**File**: `components/landing/hero/HeroCanvas.tsx`
**Purpose**: Three.js Canvas entry point, client-only.
**Loading**: `next/dynamic({ ssr: false })`
**Contains**: `<Canvas>` wrapping `Environment`, `CopperLights`, `LivingCore`, `ParticleField`, `CursorParallax`
**Canvas props**: `dpr={[1, 2]}`, `gl={{ antialias: true, alpha: true }}`

---

### `LivingCore`
**File**: `components/landing/hero/LivingCore.tsx`
**Purpose**: The custom sculptural centerpiece — three orbital ribbons.
**Geometry**: Custom `BufferGeometry` generating three interleaved tube paths that orbit a shared center, mirroring the Nucleus Loop's three-arc structure.
**Material**: `MeshStandardMaterial` — `color: #1A1C1B`, `roughness: 0.85`, `metalness: 0.15`, `envMapIntensity: 0.5`
**Animation**: Slow y-axis rotation + breathing scale oscillation

---

### `ParticleField`
**File**: `components/landing/hero/ParticleField.tsx`
**Purpose**: 8 ambient particles drifting in slow arcs.
**Geometry**: `SphereGeometry(0.012, 6, 6)` per particle
**Material**: `MeshBasicMaterial({ color: '#B87333', transparent: true, opacity: 0.6 })`
**Motion**: Unique Lissajous path per particle, 8–12s period

---

### `CopperLights`
**File**: `components/landing/hero/CopperLights.tsx`
**Purpose**: Scene lighting setup for warm copper reflections.
**Contains**:
- `ambientLight` intensity 0.3, color `#F1EFE8`
- `directionalLight` position [3, 4, 2], color `#C98344`, intensity 1.2
- `pointLight` position [-2, -1, -3], color `#9AA19E`, intensity 0.4

---

### `CursorParallax`
**File**: `components/landing/hero/CursorParallax.tsx`
**Purpose**: Mouse-reactive camera offset controller.
**Behavior**: Reads normalized cursor position, applies lerped rotation to a group wrapping LivingCore. Max ±12deg X, ±15deg Y.
**Reduced motion**: `useRef` check — if reduced motion, applies no rotation.

---

### `Environment`
**File**: `components/landing/hero/Environment.tsx`
**Purpose**: Scene environment — fog, background color.
**Contains**: `fogExp2` density 0.05, color `#080909`. Background `#080909`.

---

## Content Sections

### `PhilosophySection`
**File**: `components/landing/PhilosophySection.tsx`
**ID**: `#philosophy`
**Purpose**: Editorial section with oversized statements.
**Content**: Three philosophical statements, large typographic treatment.
- Scroll-triggered line-by-line reveal
- Subtle parallax on large text (0.15× speed)

---

### `WhyLocalFirst`
**File**: `components/landing/WhyLocalFirst.tsx`
**ID**: `#why-local-first`
**Purpose**: Explains local-first philosophy via animated blueprint SVGs.
**Four diagrams**:
1. Privacy — data flow diagram showing no external cloud node
2. Ownership — file structure showing data stays local
3. Performance — latency comparison arc diagram
4. Independence — disconnected operation diagram
**Animation**: `strokeDashoffset` draw-in on viewport enter

---

### `WorkflowVision`
**File**: `components/landing/WorkflowVision.tsx`
**ID**: `#workflows`
**Purpose**: Conceptual workflow as animated node graphs.
**Four workflows**: Research, Content, Automation, Business
**Each**: Animated node + edge diagram (SVG), no fake UI, no fake data

---

### `UseCases`
**File**: `components/landing/UseCases.tsx`
**ID**: `#use-cases`
**Purpose**: Four user archetype cards.
**Users**: Entrepreneurs, Developers, Creators, Businesses
**Rules**: No fake metrics, no fake stats, honest capability descriptions

---

### `PricingSection`
**File**: `components/landing/PricingSection.tsx`
**ID**: `#pricing`
**Purpose**: Honest pricing transparency section.
**Content**: "Pricing to be announced" + Early Access benefit list
**Rules**: No fake plans, no fake prices

---

### `RoadmapSection`
**File**: `components/landing/RoadmapSection.tsx`
**ID**: `#roadmap`
**Purpose**: Public milestone timeline.
**Milestones**: Brand Launch, Early Access, Dashboard Preview, Workflow Builder, Desktop Release
**Rules**: No dates, status indicators only (Complete / In Progress / Upcoming)

---

### `EarlyAccessSection`
**File**: `components/landing/EarlyAccessSection.tsx`
**ID**: `#early-access`
**Purpose**: Primary conversion section — Early Access registration.
**Fields**: Name (required), Email (required), Username (optional)
**Validation**: Client-side email format, required field checks
**Submission**: Server action → Supabase `early_access` table
**Success state**: Launch Pass display (`#XXXXX`, join date, "Early Supporter" badge)
**Rules**: No login, no dashboard redirect, position number from server only

---

## Shared Components

### `Logo`
**File**: `components/shared/Logo.tsx`
**Variants**: `full` (mark + wordmark) | `icon` (mark only)
**Mark**: Inline SVG recreation of the Nucleus Loop three-arc orbital form

---

## Usage Rules

1. Never import landing components in the dashboard area
2. Never import dashboard components in the landing area
3. All `'use client'` components must handle `prefers-reduced-motion`
4. All sections must have a unique `id` attribute for anchor navigation
5. No component should contain hardcoded fake data of any kind
6. Server actions must never expose service-role keys to the client
