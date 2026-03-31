# No Spend Hub

The front-end for **No Spend Collective** — a 30-day spending challenge centered on pattern recognition, not restriction. No shame. No perfection required. Just curiosity.

## Tech Stack

- [React](https://react.dev/) 18 + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for builds and dev server
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) component library
- [React Router](https://reactrouter.com/) for routing
- [TanStack Query](https://tanstack.com/query) for data fetching
- [Recharts](https://recharts.org/) for data visualization

## Getting Started

```sh
# Install dependencies
npm install

# Start dev server (localhost:8080)
npm run dev

# Run tests
npm test

# Production build
npm run build
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run build:dev` | Development build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── pages/          # Route pages (Index, App, Lab, Patterns, Guides, Auth)
├── components/     # Shared React components (landing, app, lab, ui)
├── features/       # 22 standalone sub-apps (each independently buildable)
├── data/           # Static content (chasing patterns)
├── contexts/       # React context providers (Auth)
├── hooks/          # Custom React hooks
├── lib/            # Utilities, data helpers, tool registry
└── main.tsx        # App entry point

public/
├── coming-soon/    # Static pre-launch landing page

api/
└── subscribe.js    # Vercel serverless function (MailerLite)
```

## Environment Variables

Copy `.env.example` and fill in values:

```sh
cp .env.example .env
```

Required for email subscription: `MAILERLITE_API_KEY`, `MAILERLITE_GROUP_ID`.

## Deployment

Hosted on Vercel. The root `vercel.json` sends all non-API routes to the React
app via a catch-all rewrite. The `/api` directory contains serverless functions.

## License

Private
