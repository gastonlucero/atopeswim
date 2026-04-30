---
name: Aquatic Community System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#404850'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#707881'
  outline-variant: '#bfc7d1'
  surface-tint: '#006399'
  primary: '#005d90'
  on-primary: '#ffffff'
  primary-container: '#0077b6'
  on-primary-container: '#f3f7ff'
  inverse-primary: '#94ccff'
  secondary: '#006878'
  on-secondary: '#ffffff'
  secondary-container: '#69e5ff'
  on-secondary-container: '#006575'
  tertiary: '#006176'
  on-tertiary: '#ffffff'
  tertiary-container: '#007c95'
  on-tertiary-container: '#ecf9ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cde5ff'
  primary-fixed-dim: '#94ccff'
  on-primary-fixed: '#001d32'
  on-primary-fixed-variant: '#004b74'
  secondary-fixed: '#a7edff'
  secondary-fixed-dim: '#58d6f1'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e5b'
  tertiary-fixed: '#b3ebff'
  tertiary-fixed-dim: '#4cd6fb'
  on-tertiary-fixed: '#001f27'
  on-tertiary-fixed-variant: '#004e5f'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  h1:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  h2:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  h3:
    fontFamily: Lexend
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

The brand personality is centered on the concept of "The Refreshing Flow"—a mix of athletic energy and the calming clarity of water. It targets recreational swimmers, competitive athletes, and club organizers who value efficiency and community. 

This design system utilizes a **Modern Minimalist** aesthetic with **Glassmorphic** accents to mimic the transparency and refraction of water. The UI prioritizes high legibility and breathability, ensuring that complex scheduling data remains approachable. The emotional response should be one of reliability and "cool" energy—like stepping into a pristine pool on a summer morning.

## Colors

The palette is derived from varying depths of water. 
- **Primary (Deep Ocean):** Used for core branding, primary actions, and active states. It provides the necessary "anchor" for reliability.
- **Secondary (Clear Pool):** A bright teal used for highlights, progress indicators, and accenting community features.
- **Tertiary (Surface Ripple):** Used for subtle interactive states and softer visual cues.
- **Neutral (Soft Foam):** A collection of cool whites and very light greys that prevent the "starkness" of pure white, reducing eye strain during high-sun outdoor usage.
- **Functional Colors:** Success (Seafoam Green), Warning (Coral), and Error (Deep Sunset) are used sparingly to maintain the aquatic theme.

## Typography

This design system pairs **Lexend** for headings and labels with **Plus Jakarta Sans** for body text. 
- **Lexend** was chosen for its athletic, hyper-legible geometric construction, which excels in presenting numerical data like lap times and lane schedules.
- **Plus Jakarta Sans** provides a friendly, contemporary warmth for community posts and descriptions.
- Use tighter letter spacing for large headlines to maintain a modern, "locked-in" feel, and increased tracking for small labels to ensure readability on mobile devices in bright light.

## Layout & Spacing

The layout utilizes a **Fluid Grid** system based on an 8px rhythmic scale. 
- Mobile layouts use a 4-column grid with 20px side margins to provide a generous "safe zone" for thumb-driven navigation.
- Tablet and Desktop layouts expand to 8 and 12 columns respectively, with a maximum content width of 1280px.
- Vertical rhythm is strictly enforced to ensure scheduling tables (lanes, times, dates) are perfectly aligned, creating a sense of professional organization. Use `spacing-lg` between major sections to emphasize the "clean and refreshing" brand attribute.

## Elevation & Depth

This design system moves away from heavy drop shadows, opting for **Tonal Layering** and **Glassmorphism**.
- **Surface Level 0:** The neutral background (Soft Foam).
- **Surface Level 1:** White containers with a subtle 1px border in a low-opacity primary color.
- **Surface Level 2 (Floating):** Used for active cards and modals. Employs a very soft, diffused "Underwater Shadow"—a primary-tinted blur with 8% opacity.
- **Backdrop Blurs:** High-priority overlays (like navigation bars or filters) use a `blur(12px)` effect with a semi-transparent white fill, mimicking the look of frosted pool-side glass. This keeps the user connected to the background context while focusing on the task.

## Shapes

The shape language is **Rounded**, reflecting the organic, fluid nature of water.
- **Buttons and Chips:** Use "Pill-shape" (Full radius) to convey a friendly, active, and aerodynamic feel.
- **Cards and Containers:** Use `rounded-lg` (1rem) for a modern, approachable structure.
- **Selection Indicators:** Use soft, circular shapes. Avoid sharp corners entirely to maintain the "friendly and reliable" persona.

## Components

- **Buttons:** Primary buttons use a solid gradient from Primary to Tertiary. Secondary buttons use a ghost style with a 2px Primary border.
- **Chips:** Used for "Pool Type" (Indoor/Outdoor) or "Level" (Beginner/Pro). These should be pill-shaped with light teal backgrounds and dark teal text.
- **Scheduling Cards:** These are the heart of the app. They feature a vertical "Waterline" accent (a 4px left-border) indicating lane availability.
- **Input Fields:** Minimalist with a soft-blue bottom border that transitions to a solid Primary glow when focused.
- **Interactive Map Pins:** Circular, utilizing a primary-to-secondary gradient to stand out against standard map tiles.
- **Progress Rings:** Used for tracking swim distances; utilize a thick stroke with a rounded cap to reinforce the fluid aesthetic.
- **Community Feed Cards:** Use a subtle "glass" header to separate user information from the post content, maintaining a high-end feel.