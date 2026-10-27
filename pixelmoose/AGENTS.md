# Pixel Moose Studio Agents

## Project overview
- One-page marketing + portfolio site built with Next.js (App Router) as a static export for GitHub Pages.
- Brand direction: minimal and type-led. Warm off-white / brown-black, one antler-brown accent taken from the moose logo.
- Positioning: small, local, woman-owned studio in Moose Jaw; hand-coded by Ami.

## Working agreements
- All copy and project data live in `lib/content.ts`; colours are CSS variables in `app/globals.css` (light, dark, and the `data-theme` override).
- Keep the logo lockup: moose mark left, "Pixel Moose" with small "Studio" below.
- Project screenshots go in `public/work/<slug>/` as WebP, max 1600px.
- Favor accessible contrast and responsive layouts for both desktop and mobile.

## Useful commands
- `npm run dev`
- `npm run build` (writes the static site to `out/`)
- `npm run deploy`
