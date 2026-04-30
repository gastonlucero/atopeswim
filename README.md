# OceanSwim PWA

A modern, **mobile-first Progressive Web App** for coordinating open-water sea swims in Barcelona. Built with React, TypeScript, Vite, and the RefreshFlow design system featuring glassmorphic UI with Material Design 3.

🌐 **Live Demo:** https://gastonlucero.github.io/atopeswim/

## What is OceanSwim?

OceanSwim is a single-page React + TypeScript + Vite PWA with the tagline **"Coordina tus nadas en el océano"** — *Coordinate your ocean swims*. It has three tabs:

| Tab        | Purpose                                                           |
| ---------- | ----------------------------------------------------------------- |
| **Salidas**  | Plan group swims: organizer, date/time, distance, beach, swimmers |
| **Tracking** | Record distance completed when finishing a swim                   |
| **Rutas**    | View history of completed swims                                   |

Beach locations are pre-seeded for **Barceloneta**, **Sant Sebastià**, and **Bogatell** (Barcelona); each includes surf forecast data. All data is stored locally in browser localStorage — no backend required.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Design System**: RefreshFlow (Material Design 3 palette)
- **Styling**: Tailwind CSS v4 + custom CSS variables (glassmorphism)
- **Icons**: Material Symbols Outlined
- **Typography**: Lexend (headings) + Plus Jakarta Sans (body)
- **Persistence**: localStorage (no backend)
- **Hosting**: GitHub Pages (auto-deployed on push)

## Getting Started

### Development
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

### Deploy
Push to `main` branch — GitHub Actions will automatically build and deploy to GitHub Pages.

---

## Key Features

✅ **Glassmorphic Design** — Modern UI with backdrop blur and semi-transparent surfaces
✅ **Material Design 3** — Professional color palette and components
✅ **Material Symbols** — Clean, consistent icon system
✅ **Responsive** — Mobile-first, works on all screen sizes
✅ **PWA** — Installable, works offline with localStorage persistence
✅ **No Backend** — All data stored locally in browser
✅ **Auto-Deployed** — GitHub Pages updated on every push

## Design System (RefreshFlow)

### Colors
- **Primary**: #0D47A1 (Deep Blue)
- **Secondary**: #1976D2 (Bright Blue)
- **Tertiary**: #0288D1 (Light Blue)
- **Surface**: #F5F5F5
- **Error**: #F44336

### Typography
- **Headings**: Lexend (600-800 weight)
- **Body**: Plus Jakarta Sans (400-500 weight)

### Components
- Glassmorphic cards with rounded-24px radius
- Material Symbols icons (not react-icons)
- Gradient buttons with elevation
- Status badges (active/upcoming/finished)

## Project Structure

```
oceanswim/
├── src/
│   ├── components/
│   │   ├── salidas/       # Beach selection & session planning
│   │   ├── tracking/      # Distance logging
│   │   ├── rutas/         # Swim history
│   │   └── tabs/          # Tab navigation
│   ├── constants/         # Beaches, organizers
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Storage, formatting, validation
│   └── styles/           # Tailwind CSS + design tokens
├── .github/workflows/    # GitHub Actions (auto-deploy)
└── vite.config.ts        # Vite configuration
```

## Language & Tone

- **Spanish (Spain)** — `es-ES` locale
- **Informal** — Uses *tú*, friendly tone
- **Minimal copy** — Concise labels and helpers
- **Emoji** — As decorative glyphs alongside text labels

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes (always with TypeScript)
4. Test locally: `npm run dev`
5. Build: `npm run build`
6. Push — GitHub Actions will deploy automatically

---

**Made with ❤️ for Barcelona ocean swimmers**
