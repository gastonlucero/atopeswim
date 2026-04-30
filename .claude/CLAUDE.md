# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Type-check + production build (tsc -b && vite build)
npm run lint      # ESLint
npm run preview   # Preview production build
```

There are no tests in this project.

## Architecture

OceanSwim is a **mobile-first PWA** for coordinating open-water swimming sessions ("salidas") in Barcelona. It is entirely client-side — no backend, no auth. All state lives in `localStorage`.

### Data model (`src/types/index.ts`)

Two core entities:

- **`Salida`** — a planned swim session: organizer, datetime, distance, location (lat/lon + description), participant list, and `status: 'pending' | 'finished'`.
- **`Ruta`** — a completed swim record created when a Salida is finished via the Tracking tab. References the originating `salidaId` and stores the actual distance swum.

### Tab structure

The app has three tabs managed by `App.tsx` with `activeTab` state:

| Tab | Purpose |
|-----|---------|
| **Salidas** | CRUD for pending/finished swim sessions |
| **Tracking** | Select a pending Salida → record distance completed → creates a Ruta |
| **Rutas** | View history of completed swims |

Each tab lives in `src/components/tabs/` and composes sub-components from `src/components/salidas/`, `src/components/tracking/`, and `src/components/rutas/`.

### Storage (`src/utils/storage.ts`)

All persistence is through `localStorage` with keys `oceanswim_salidas` and `oceanswim_rutas`. The module exposes typed CRUD functions (`getSalidas`, `addSalida`, `updateSalida`, `deleteSalida`, etc.) used directly by components — there is no global state manager or context.

### Constants

- **`src/constants/locations.ts`** — predefined Barcelona beach locations (Barceloneta, Sant Sebastià, Bogatell), each with coordinates, an info link, and a surf forecast URL.
- **`src/constants/organizers.ts`** — hardcoded list of swimmer names used in Salida forms.

### Styling

The project uses **Tailwind CSS v4** for utility classes alongside a global component stylesheet at `src/styles/tailwind.css`, which defines custom CSS classes (`.btn-primary`, `.btn-secondary`, `.btn-danger`, `.card`, `.input-field`, `.form-section`, `.form-label`, `.form-group`, `.checkbox-item`, `.tab-button`, `.error-message`, `.success-message`). Use these existing classes before reaching for inline styles or new Tailwind utilities. The brand color is `rgb(252, 82, 0)` (orange).

### Tracking flow

1. `TrackingSelector` lists pending Salidas from localStorage.
2. User picks one → `TrackingForm` renders with that Salida.
3. On submit: marks the Salida `status: 'finished'`, creates a `Ruta` with the actual distance, saves both to localStorage.

The `TrackingRecorder` and `RouteNamer` components exist but are not currently wired into the main flow — they appear to be in-progress features for GPS-based route recording.
