# ANIMATION.md — Neomagnesis AI Motion System

> **Applies To**: Public website (Version 1). Dashboard animations TBD separately.

---

## Core Philosophy

Every animation must have purpose. Motion communicates meaning — it reveals structure, provides feedback, and creates presence. Decorative motion is forbidden.

**The golden rule**: If removing an animation makes the page feel identical, remove it.

---

## Easing Functions

| Name | Value | Use |
|---|---|---|
| Spring | `cubic-bezier(0.16, 1, 0.3, 1)` | Primary — hover, entrances, transitions |
| Smooth | `cubic-bezier(0.4, 0, 0.2, 1)` | Secondary — subtle state changes |
| Linear | `linear` | Progress bars, continuous animations only |
| Ease Out | `cubic-bezier(0, 0, 0.2, 1)` | Exit animations |

---

## Duration Scale

| Token | Value | Use |
|---|---|---|
| instant | 80ms | Micro feedback (button active state) |
| fast | 150ms | Hover state transitions |
| normal | 200ms | Standard transitions |
| slow | 400ms | Entrance animations |
| deliberate | 600–800ms | Hero entrances, section reveals |
| breath | 4000ms | 3D object breathing cycle |
| drift | 8000–12000ms | Particle drift, ambient motion |

---

## Entrance Animations

All section entrances use Framer Motion `whileInView` with:
```ts
viewport={{ once: true, margin: "-10%" }}
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
```

**Stagger children**: `staggerChildren: 0.1`
**Maximum stagger count**: 6 items (beyond that, omit stagger)

### Section Reveal Pattern
1. Overline label fades in (delay: 0)
2. Heading lifts in (delay: 0.1)
3. Body copy fades in (delay: 0.2)
4. Cards/content stagger in (delay: 0.3+, 0.1 per item)

---

## Hero Animations

### Entrance Sequence
1. LoadingSequence fades out (0–1.2s)
2. Hero canvas opacity: 0 → 1 (1.0s, ease)
3. Headline: fade + lift (1.2s, 0.8s duration)
4. Subtitle: fade + lift (1.5s, 0.7s duration)
5. Buttons: fade + lift (1.8s, 0.6s duration)
6. Scroll indicator: fade in (2.5s)

### 3D Living Core
- Breathing: `scale` oscillates 0.97–1.03 every 4s, `easeInOut` sine
- Rotation: slow continuous y-axis (0.003 rad/frame)
- Mouse parallax: target `rotateX` ±8deg, `rotateY` ±12deg, lerp factor 0.05
- Particle drift: each particle follows unique Lissajous path, 8–12s period
- Frame rate cap: 60fps via `useFrame` delta time

---

## Hover Behaviors

### Dock Items
- Scale: 1.0 → 1.15 (spring: stiffness 400, damping 25)
- Neighbors scale: 1.0 → 1.06
- Label: `opacity: 0` → `opacity: 1`, translates up 4px
- Duration: 150ms

### Cards
- `translateY`: 0 → -2px (200ms spring)
- Border: `#2A2D2C` → `rgba(184, 115, 51, 0.35)` (200ms)
- Shadow deepens slightly

### Buttons (Primary)
- `translateY`: 0 → -1px (200ms)
- Border transitions to copper tint

### Buttons (Active/Press)
- `scale`: 1.0 → 0.98 (80ms)
- `translateY` returns to 0

---

## Cursor Light

A subtle, diffused warm glow that follows the cursor at a slight lag.

```ts
// Lag factor: 0.08 (heavy smoothing)
// Glow radius: 300px
// Color: rgba(184, 115, 51, 0.04)
// No glow on touch devices (hover: none media query)
```

---

## Scroll Progress Line

- 1px fixed line at top of viewport
- Color: `var(--color-accent)` (#B87333)
- Width: 0% → 100% based on scroll position
- No transition (direct follow)
- Opacity: 0.7

---

## Loading Sequence

- Duration: 1.2s total
- Shows Nucleus Loop mark centered on `var(--color-bg)`
- Mark draws in via `strokeDashoffset` animation (0.8s)
- Whole loader fades out (0.4s)
- Never shows on repeat visits (sessionStorage flag)

---

## Scroll Reveal Parallax

Used on Philosophy section large text only.

- Speed: 0.15× scroll speed (very subtle)
- Only applies `translateY` (never scale or opacity)
- Disabled when `prefers-reduced-motion: reduce`

---

## Blueprint SVG Animations (Why Local First)

Each diagram animates on viewport enter:

1. Lines draw in via `strokeDashoffset` (0.6s, stagger 0.1s per element)
2. Nodes pulse in via `scale` 0 → 1 (0.3s, spring)
3. Labels fade in (0.4s)

Stroke color: `rgba(184, 115, 51, 0.6)` on `#111312` background
Node fill: `#181B1A` with `#B87333` border

---

## Node Diagram Animations (Workflow Vision)

Connection lines draw from source to target:

1. Start node appears (scale 0 → 1, 0.3s)
2. Edge draws along path (strokeDashoffset, 0.4s per edge)
3. Target node appears (scale 0 → 1, 0.3s)
4. Data pulse: small circle travels along edge path (2s loop)

---

## Reduced Motion Rules

When `prefers-reduced-motion: reduce` is set:

- ALL CSS transitions → `0.01ms`
- ALL Framer Motion animations: `duration: 0`, `delay: 0`
- 3D canvas: static pose, no rotation, no breathing, no particles
- Scroll progress line: still visible (not animated)
- Cursor light: disabled
- Loading sequence: instant (no animation)

Implementation:
```ts
const prefersReducedMotion = 
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
```

---

## Forbidden Animations

- Spinning objects (except slow 3D rotation < 0.003 rad/frame)
- Bounce/elastic effects on page elements (springs on Dock only)
- Glowing explosions or burst effects
- Shake animations
- Auto-playing video or audio
- Scroll hijacking or scroll locking
- Excessive parallax (>20% of scroll distance)
- Blinking text or elements
