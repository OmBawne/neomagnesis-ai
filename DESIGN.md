# DESIGN.md — Neomagnesis AI Design System

> **Status**: Living Document — Public Website (Version 1)
> **Last Updated**: September 2026
> **Applies To**: Public website only. See ROADMAP.md for dashboard guidelines.

---

## Brand Philosophy

Neomagnesis AI is a premium, local-first Agentic AI Operating System.

The design language is called **Ink Wash Dark** — inspired by:
- Japanese sumi-e ink painting (negative space, controlled precision)
- Premium industrial design (intentional materiality, zero decoration)
- Architectural photography (cinematic framing, breathing room)
- Editorial layout (hierarchy through typography, not color)

**Core emotional targets:**
1. Curiosity — the visitor should want to know more
2. Trust — the craftsmanship signals stability and seriousness
3. Ambition — this feels like the beginning of something significant
4. Quiet confidence — no hype, no urgency, no pressure

**Never create:**
- Generic AI SaaS aesthetics (blue gradients, robot icons, circuit patterns)
- Cyberpunk or neon effects
- Gaming-style glow or particle explosions
- Colorful gradients or blue/purple AI visual clichés
- Fake dashboards, fake metrics, fake testimonials

---

## Color System

### Semantic Tokens

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#080909` | Page background |
| `--color-surface` | `#111312` | Card/panel background |
| `--color-surface-raised` | `#181B1A` | Elevated surfaces, inputs |
| `--color-border` | `#2A2D2C` | Default borders |
| `--color-border-strong` | `rgba(154,161,158,0.22)` | Visible dividers |
| `--color-text-primary` | `#F1EFE8` | Headings, primary content |
| `--color-text-secondary` | `#9AA19E` | Body copy, labels |
| `--color-text-muted` | `#626A66` | Placeholders, tertiary |
| `--color-accent` | `#B87333` | Warm copper accent |
| `--color-accent-hover` | `#C98344` | Accent hover state |
| `--color-success` | `#3D6B52` | Muted forest green |
| `--color-warning` | `#C68A4C` | Warm amber |

### Color Rules

- **No blue.** Not in gradients, not in shadows, not in glows.
- **No purple.** This is not an AI assistant brand.
- **No neon.** No electric colors.
- **Orange/copper is the only energetic accent.** Use sparingly.
- **Shadows use black opacity only.** Never colored shadows.
- The Nucleus Loop logo uses black, white, and orange. Treat it as sacred.

---

## Logo — Nucleus Loop

The Nucleus Loop depicts three distinct curved strokes orbiting a negative space center — representing intelligence, flow, and unity.

### Rules
- Never distort, stretch, or recolor the mark
- Minimum 16px breathing room on all sides
- White mark on dark backgrounds; black on light surfaces
- Orange app icon for app stores and favicons only
- The mark is the visual anchor — treat it as Apple treats their logo

---

## Typography

**Inter** via `next/font/google`. Weights: 300, 400, 500, 600.

| Name | Size | Weight | Tracking |
|---|---|---|---|
| Display | 72–96px | 300 | -0.03em |
| Title | 48–64px | 300–400 | -0.025em |
| Heading | 32–40px | 400 | -0.02em |
| Body | 16–18px | 400 | 0 |
| Caption | 12px | 400–500 | 0 |
| Mono Label | 11px | 400 | 0.15–0.2em uppercase |

---

## Motion Principles

See ANIMATION.md for full details.

- Every animation must have purpose
- Respect `prefers-reduced-motion` always
- Entrance animations: `whileInView` with `viewport={{ once: true }}`
- Primary easing: `cubic-bezier(0.16, 1, 0.3, 1)` — spring-like

---

## Glass System

Glassmorphism is used intentionally. **Only the Dock uses backdrop-filter.**

```css
/* Dock Glass */
background: rgba(17, 19, 18, 0.72);
backdrop-filter: blur(24px) saturate(1.4);
border: 1px solid rgba(241, 239, 232, 0.08);
border-radius: 24px;
box-shadow:
  0 0 0 0.5px rgba(241, 239, 232, 0.06),
  0 8px 32px rgba(0, 0, 0, 0.45),
  inset 0 1px 0 rgba(241, 239, 232, 0.06);
```

### Glass Rules
- Only the Dock uses `backdrop-filter`
- Cards use matte surfaces only
- Never stack blur layers
- Only black-opacity shadows

---

## 3D Principles

The 3D hero is called **The Living Core** — three orbital ribbons inspired by the Nucleus Loop.

- Movement: slow, calm (max 2% scale variance)
- Material: matte obsidian with warm copper reflections
- Cursor parallax: max ±15deg over full viewport
- Particles: 8 maximum, tiny, slow arcs
- Target: 60fps on mid-range laptops
- Always lazy-loaded with `next/dynamic({ ssr: false })`
- Respect `prefers-reduced-motion`

---

## Accessibility

- WCAG AA minimum
- Focus rings: `outline: 2px solid var(--color-accent); outline-offset: 2px`
- One `<h1>` per page
- Keyboard navigation throughout
- `prefers-reduced-motion` respected at CSS and component level

---

## Future Dashboard Consistency

The dashboard inherits: color tokens, typography scale, button/input variants, card surface treatment, spacing system.

The dashboard must NOT include: floating glass Dock, 3D hero, marketing copy, Early Access CTAs.

See ROADMAP.md for complete boundary definition.
