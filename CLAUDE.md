# CLAUDE.md — No Spend Hub

## Project Overview
No Spend Hub is the web platform for the No Spend Collective — a 30-day spending challenge community. It includes a main React app, 22 standalone feature sub-apps, and a coming-soon landing page.

## Quick Start
```bash
npm install
npm run dev        # Vite dev server on port 8080
npm run build      # Production build
npm test           # Run tests (vitest)
```

## Architecture
- **Main app:** React 18 + TypeScript + Vite + shadcn/ui + Tailwind CSS
- **Sub-apps:** 22 standalone React/JSX apps in `src/features/` (each has own package.json, vite.config, index.html)
- **Coming-soon page:** Static HTML at `public/coming-soon/index.html` (currently served as homepage via vercel.json rewrite)
- **API:** One Vercel serverless function at `api/subscribe.js` (MailerLite email subscription)
- **Data storage:** Browser localStorage (no database) via `src/lib/challenge-data.ts`
- **Path alias:** `@` maps to `./src`

## Key Directories
- `src/pages/` — Route pages (Index, AppPage, NotFound)
- `src/components/` — Shared React components (shadcn/ui based)
- `src/features/` — 22 standalone sub-apps (independently buildable)
- `public/coming-soon/` — Static landing page with countdown to launch
- `api/` — Vercel serverless functions
- `docs/` — Product docs, brand guidelines, strategy, planning

## Environment Variables
See `.env.example`. Required for email subscription:
- `MAILERLITE_API_KEY`
- `MAILERLITE_GROUP_ID`

## Deployment
- Hosted on Vercel
- `vercel.json` rewrites `/` to `/coming-soon/index.html` (pre-launch)
- After launch, remove the rewrite to serve the React app at `/`

## Testing
- Framework: Vitest + React Testing Library + jsdom
- Config: `vitest.config.ts`
- Run: `npm test` (single run) or `npm run test:watch`

## Conventions
- Use TypeScript for the main app (`src/`)
- Sub-apps in `src/features/` use plain JSX
- Components use shadcn/ui patterns with Tailwind
- Use `sonner` for toast notifications
- Use `date-fns` for date formatting
