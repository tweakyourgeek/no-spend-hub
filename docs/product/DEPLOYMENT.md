# Deployment Documentation

## Vercel Hosting

### Live URL
**https://no-spend-hub.vercel.app** (or custom domain when configured)

### Repository
- **Repo:** https://github.com/tweakyourgeek/no-spend-hub
- **Branch:** `main`
- **Framework:** Vite (auto-detected by Vercel)

### Current Configuration

**Pre-launch (until March 20, 2026):**
- `vercel.json` rewrites `/` → `/coming-soon/index.html`
- Visitors see the coming-soon landing page with countdown

**Post-launch:**
- Remove the rewrite from `vercel.json` to serve the React app at `/`
- The coming-soon page remains accessible at `/coming-soon/index.html`

### Environment Variables (Vercel Dashboard)

| Variable | Purpose |
|----------|---------|
| `MAILERLITE_API_KEY` | MailerLite API key for email subscription |
| `MAILERLITE_GROUP_ID` | MailerLite group ID for subscriber list |

Set these in: Vercel Dashboard → Project → Settings → Environment Variables

### Serverless Functions

| Endpoint | File | Purpose |
|----------|------|---------|
| `POST /api/subscribe` | `api/subscribe.js` | Subscribe email to MailerLite list |

---

## Deploying Updates

### Automatic (recommended)
1. Push changes to `main` branch (or merge a PR)
2. Vercel auto-deploys within ~1-2 minutes
3. Preview deployments are created for every PR

### Manual
```bash
npx vercel          # Deploy preview
npx vercel --prod   # Deploy to production
```

---

## Local Development

```bash
npm install
npm run dev          # Vite dev server on http://localhost:8080
npm run build        # Production build to dist/
npm run preview      # Preview production build
npm test             # Run tests
```

---

## Project Structure

```
no-spend-hub/
├── api/subscribe.js           # Vercel serverless function
├── public/coming-soon/        # Static coming-soon landing page
├── src/
│   ├── pages/                 # Route pages (Index, AppPage, NotFound)
│   ├── components/            # Shared React components (shadcn/ui)
│   ├── features/              # 22 standalone sub-apps
│   └── lib/challenge-data.ts  # Core data layer (localStorage)
├── docs/                      # Product docs, strategy, planning
├── vercel.json                # Vercel routing config
├── vite.config.ts             # Vite build config
└── package.json               # Dependencies & scripts
```

---

## Post-Launch Checklist

- [ ] Set `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID` in Vercel
- [ ] Test email subscription end-to-end on production
- [ ] Remove `vercel.json` rewrite to serve React app at `/`
- [ ] Verify all routes work (/, /app, 404 fallback)
- [ ] Test on mobile devices

---

**Last Updated:** March 15, 2026
