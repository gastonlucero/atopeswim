# OceanSwim Design System

A small, focused design system extracted from the **OceanSwim** mobile-first
React app — a Spanish-language tool for coordinating open-water sea swims
along the Catalan coast.

## What is OceanSwim?

OceanSwim (`oceanswim` codebase) is a single-page React + TypeScript + Vite
app whose tagline is **"Coordina tus nadas en el océano"** — *Coordinate your
ocean swims*. It has three tabs:

| Tab        | Purpose                                                           |
| ---------- | ----------------------------------------------------------------- |
| **Salidas**  | Plan group swims: organizer, date/time, distance, beach, swimmers |
| **Tracking** | Live timer + log of distance completed when finishing a swim    |
| **Rutas**    | Saved swims, optionally with a Leaflet map of the GPS trace      |

Beach coordinates are pre-seeded for **Barceloneta**, **Sant Sebastià**, and
**Bogatell** (Barcelona); each links out to surf-forecast widgets and Google
Maps. The community is a tight friend group (Pau, Enric, Xènia, Flor, Berta,
Nuria, Marc, Jordi, Vladi, Ona, Xabi, Gastón, Pía, Celia).

## Sources used

- **Codebase**: `oceanswim/` (mounted local folder) — Vite + React 19 +
  TypeScript + Tailwind 4 + react-icons (Feather set) + Leaflet 1.9.
  Key files: `tailwind.config.js`, `src/styles/tailwind.css`, `src/App.tsx`,
  `src/components/**`.
- No Figma file or slide deck was provided.

---

## Index

| File / folder         | What it holds                                              |
| --------------------- | ---------------------------------------------------------- |
| `README.md`           | This document                                              |
| `SKILL.md`            | Skill metadata so this folder can be used as a Claude Skill |
| `colors_and_type.css` | All CSS custom properties — colors, type, shadows, motion  |
| `assets/`             | Logos & imagery copied from the codebase                   |
| `preview/`            | HTML cards that populate the Design System review tab      |
| `ui_kits/app/`        | Click-thru recreation of the OceanSwim mobile app          |

There is one product (the mobile-first PWA-style web app) so there is one
UI kit: `ui_kits/app`.

---

## Content fundamentals

**Language.** All UI strings are **Spanish (Spain)** — `<html lang="es">`,
`toLocaleDateString('es-ES', …)`. There is no English fallback. Don't
translate; if you add copy, write it in Spanish using the same register.

**Tone.** Friendly, plain, second-person *tú* (informal). Short imperative
labels on buttons; full-sentence helper text only when needed. No marketing
bombast, no exclamation marks except in success toasts.

**Casing.** Sentence case for headings, helper text, and most buttons.
Section titles use Title Case for the proper noun (*Nueva Salida*, *Editar
Salida*, *Guardar Ruta*). Tab labels are single-word Title Case
(*Salidas / Tracking / Rutas*).

**Pronouns.** `tú`, never `usted`. Confirmation modals address the user
directly: *"¿Estás seguro de que deseas eliminar esta salida?"*. Errors
state the rule, not blame: *"La distancia debe ser mayor a 0"*,
*"La fecha debe ser en el futuro"*.

**Vocabulary cheat-sheet.**

| Term        | Meaning in this app                                  |
| ----------- | ---------------------------------------------------- |
| *Salida*    | A planned group swim                                 |
| *Ruta*      | A completed/saved swim, optionally with a GPS trace  |
| *Tracking*  | Recording the in-progress swim                       |
| *Punto de encuentro* | Meeting point / launch beach                |
| *Nada*      | "Swim" (the noun) — used in helper text & taglines   |
| *Pronóstico de olas* | Wave forecast                               |

**Emoji usage.** Yes — sparingly, as decorative leading glyphs in labels and
toasts, never alone as icons that carry meaning. Inventory observed in the
code: `🌊` (header & wave forecast), `📍` (location / map link),
`📊` (info), `📋` (info link), `📏` (distance), `👥` (participants),
`✏️` (edit), `🗑️` (delete), `✅` (success), `✕` (modal close). Pair every
emoji with a text label.

**Examples (verbatim from the app).**

- Header: *"🌊 OceanSwim"* / *"Coordina tus nadas en el océano"*
- Empty state: *"No hay salidas planificadas"*
- Empty (tracking): *"No hay salidas pendientes"* / *"Crea una salida primero
  en la pestaña «Salidas»"*
- Submit CTA: *"+ Nueva Salida"*, *"Crear Salida"*, *"Actualizar Salida"*,
  *"Guardar Ruta"*, *"Finalizar Salida"*
- Live timer caption: *"Nada en progreso..."*
- Success: *"✅ Salida finalizada"*, *"La ruta ha sido guardada"*,
  *"✅ Ruta guardada exitosamente"*

---

## Visual foundations

**Palette vibe.** Sea-and-sky. Two scales: a Tailwind **`ocean`** sky-blue
ramp (50–900) for headings, links, and map polylines; and a saturated
**teal/cyan** brand pair `rgb(0,150,180)` → `rgb(0,200,200)` →
`rgb(0,220,220)` used in 135° gradients on the page header, primary
buttons, and active-tab underline. Body text is `rgb(15, 63, 88)`
(deep desaturated navy), grays come from Tailwind's gray scale. There
are no warm accents.

**Backgrounds.** The whole app sits on a soft **diagonal gradient**
`linear-gradient(135deg, #f0f9ff 0%, #fff 50%, #e0f7ff 100%)` — almost
white, sky-tinted at the corners. The header is a separate teal gradient
with two faint white **radial-gradient "spotlights"** at 20%/50% and
80%/80%, layered at 10% opacity. No photography, no full-bleed imagery,
no patterns or textures, no hand-drawn illustrations. Just gradients.

**Typography.** System sans (`Inter, system-ui, sans-serif`) — no custom
webfont is loaded. Sizes are deliberately small/mobile-friendly: h1=24px,
h2=20px, h3=18px, body=16px, helper=14px, micro=12px. Two oversized
moments only: the swim timer (48px idle, 60px recording, ocean-600,
`animate-pulse` while recording) and the page title on tablet/desktop
(36px). Headings are bold (700), in `ocean-700` (`#0369a1`).

**Cards.** White background, `border-radius: 12px`, `1px solid #e0f7ff`
border, **tinted box-shadow**: `0 2px 8px rgba(0,150,180,0.08)` resting,
`0 8px 24px rgba(0,150,180,0.15)` on hover. Cards lift `translateY(-2px)`
on hover with a **bouncy ease** `cubic-bezier(0.34, 1.56, 0.64, 1)`,
0.3s. The tinted shadow is the brand's signature — keep it.

**Buttons.** Three flavors, all 135° gradient fills, 8px radius, 44px
min-height, semibold. Primary teal, secondary gray, danger red→rose.
Hover: a slightly darker gradient + larger shadow + `translateY(-2px)`
(primary only). Active: `transform: scale(0.95)` (secondary/danger) or
flat translate (primary). Disabled: `opacity: 0.5`, no pointer.

**Inputs.** White, 2px solid `gray-200` border, 8px radius, 44px tall,
16px text. Hover thickens border to `gray-300`. Focus uses a thin
`blue-500` border + `gray-200` 2px outer ring (no glow, no inset
shadow). Disabled: `gray-50` background, gray-500 text. Error message
sits below: 14px, `red-600`, weight-500.

**Tab bar.** Fixed to the bottom, white, `1px` top border, height 64px
(80px on `md+`). The active tab is **teal text + 8% teal background +
3-px gradient underline** (the same teal→cyan gradient). Underline and
text fade in over the bouncy 0.3s ease. Inactive tabs are gray-500.

**Animation.** `bounce-soft` (signature 0.3s `cubic-bezier(0.34, 1.56,
0.64, 1)`) on cards & tabs; `fade-in` 0.3s ease-in-out; `slide-up`
(opacity + 10px translate) on entry; `pulse-soft` (2s opacity 1↔0.7) on
the live timer. No spinners except a 1s linear `spin` keyframe.

**Hover states.** Buttons darken their gradient + grow shadow + lift 2px.
Cards grow shadow + tint border `sky-200` + lift 2px. Links use Tailwind
`hover:underline`. There is no opacity-fade hover.

**Press states.** `transform: scale(0.95)` on secondary/danger buttons;
primary buttons drop the `translateY` back to 0. No color change on press.

**Borders & dividers.** 1px `gray-200` for inputs, `sky-100` for cards
and form sections, `blue-100` for the tab bar's top edge. No double
borders, no dashed/dotted styles.

**Shadows — system.** Two stacks coexist: a generic `shadow-{sm,base,
md,lg,xl}` borrowed from Tailwind (used on modals and the input focus
ring) and the **tinted teal shadows** on cards/buttons/tab-bar. There are
no inner shadows in shipped UI (the variable is defined but unused). No
"protection" gradients (e.g. content-fade-out on scroll).

**Layout rules.** Single fixed-width column: `1126px` max in the source
CSS, but the app runs full-width with `p-2 sm:p-3 md:p-4` content
padding. Tab bar is `position: fixed; bottom: 0`. Modals use
`position: fixed; inset: 0` with a 50%-black scrim and a centered
`max-w-2xl` panel. List views are vertical card stacks with
`space-y-4`.

**Transparency & blur.** Modal scrim is solid `bg-black bg-opacity-50`.
Active-tab background is `rgba(0,200,200,0.08)`. No `backdrop-filter`
blurs anywhere.

**Imagery vibe.** N/A — there is no photography in the shipped UI.
Maps are OpenStreetMap tiles via Leaflet, GPS polyline drawn in
`#0369a1` (`ocean-700`), 3px wide. Beach forecast widgets are embedded
iframes from `surf-forecast.com`.

**Corner radii.** 4px (small inputs/code), 8px (buttons, inputs,
toasts, panels), 12px (cards), 9999px (none used yet, kept for
chips/avatars). `lg` 12px is the most common.

**Cards in summary.** 12px radius • white • 1px sky-100 border •
8% teal shadow • 0.3s bouncy hover lifting 2px and growing the shadow.

---

## Iconography

OceanSwim does **not** ship its own icon font or sprite. It pulls icons
from two places:

1. **react-icons / Feather (`react-icons/fi`)** — used in the tab bar:
   `FiUsers` (Salidas), `FiActivity` (Tracking), `FiMap` (Rutas).
   Stroke-style, 2px stroke weight, 24×24, currentColor.
2. **Emoji** — for content-level glyphs inside copy and buttons (see the
   Content Fundamentals inventory above).

There are **no SVG illustrations**, **no PNG icons**, no Lucide,
no Heroicons. The codebase's `public/icons.svg` and
`assets/{react,vite}.svg` files are **leftovers from the Vite/React
template and unused in the app** — do not treat them as brand assets.

**Recommendation for new work**: stay on Feather (`react-icons/fi`)
for any UI glyph; reach for emoji for content-level glyphs the way the
existing app does. If you need an icon Feather doesn't have, the closest
CDN match is **Lucide** (Feather's actively-maintained fork) — flag the
substitution.

**Logo.** The app has no proper logo — only the inline header
`🌊 OceanSwim`. Treat the wave emoji + the wordmark in `font-weight: 700`
as the logo lockup until a real one is provided.

---

## Caveats / what's missing

- **No real logo / favicon.** The shipped `public/favicon.svg` is the
  Anthropic Solid violet diamond, left over from the project template —
  it's been copied to `assets/` for completeness but is **not** the brand.
- **No webfont.** App uses `Inter, system-ui, sans-serif` but doesn't
  load Inter; it falls back to system sans on most devices. If you want
  Inter to actually render, add `<link>` to Google Fonts.
- **No Figma file** was provided.
- **No marketing site / docs / second product** exists, so this DS has a
  single UI kit (`ui_kits/app`).
