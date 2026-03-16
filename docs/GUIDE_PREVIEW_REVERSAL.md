# Reversing Mini-Guide Preview Mode

When you're ready to put the guides behind auth again, here's what to do.

## 1. Re-enable auth gate (required)

**File:** `src/pages/GuidePage.tsx`

Uncomment the auth block — look for the `TODO: Re-enable auth gate before launch` comment. Change this:

```tsx
// TODO: Re-enable auth gate before launch
// if (loading) {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <p className="font-body text-muted-foreground animate-pulse">Loading...</p>
//     </div>
//   );
// }
// if (!user) return <Navigate to="/login" replace />;
```

Back to this:

```tsx
if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="font-body text-muted-foreground animate-pulse">Loading...</p>
    </div>
  );
}
if (!user) return <Navigate to="/login" replace />;
```

## 2. Restore Vercel deploy restrictions (optional)

**File:** `vercel.json`

If you want to stop preview deploys on non-main branches, change:

```json
"git": { "deploymentEnabled": true }
```

Back to:

```json
"git": { "deploymentEnabled": { "main": true } },
"ignoreCommand": "git diff --quiet HEAD^ HEAD -- src/ public/ api/ package.json vite.config.ts index.html"
```

## Do NOT revert these (bug fixes)

These were fixed during the build and should stay permanently:

- **`src/lib/supabase.ts`** — Uses placeholder URL when env vars are missing. Without this, the entire app crashes (blank page) when Supabase env vars aren't set.
- **`src/contexts/AuthContext.tsx`** — Added `.catch()` on `getSession()`. Without this, a failed Supabase call leaves `loading: true` forever (blank page).
- **`vercel.json` SPA rewrites** — The `/guides/*`, `/lab/*`, `/login`, `/signup`, `/app` rewrites to `index.html` are needed for React Router routes to work when accessed directly via URL on Vercel. Without them, any direct URL visit (not via in-app navigation) returns a 404.
