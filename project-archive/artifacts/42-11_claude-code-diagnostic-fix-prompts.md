<!-- Source: Conversation 42 (No Spend 3 031026), Item 42.11 -->
<!-- Status: REFERENCE -->

# Multiple Claude Code Diagnostic/Fix Prompts (subscribe.js Issues)

The following prompts were used in sequence to diagnose and fix the `/api/subscribe` serverless function 404 issue. The root cause was that the Vercel project root directory was set to `public/coming-soon`, making the repo-root `api/subscribe.js` invisible to that project.

---

## Prompt 1: Move subscribe.js (initial guess — premature)

**CLAUDE CODE PROMPT:**

The coming soon Vercel project uses `coming-soon/` as its root directory. The `api/subscribe.js` serverless function is at the repo root, outside that scope, so the form can't reach it.

Move `api/subscribe.js` into `coming-soon/api/subscribe.js` so it's within the root directory of the coming soon project.

Commit and push to main.

---

## Prompt 2: Investigate first (corrected approach)

**CLAUDE CODE PROMPT:**

Check the current repo structure and tell me exactly where `api/subscribe.js` lives relative to the `coming-soon` folder. Also confirm what the root directory is set to in any Vercel config files if they exist. Don't move anything yet, just report back.

---

## Prompt 3: Copy subscribe.js into coming-soon folder

**CLAUDE CODE PROMPT:**

Copy `api/subscribe.js` into `public/coming-soon/api/subscribe.js` so it sits inside the coming soon folder. Do not delete the original at the repo root. Commit and push to main.

---

## Prompt 4: Fix ESM/CJS conflict

**CLAUDE CODE PROMPT:**

Rename `public/coming-soon/api/subscribe.js` to `public/coming-soon/api/subscribe.cjs` and update the file to use CommonJS syntax (`module.exports` instead of `export default`, `require` instead of `import`). The package.json has `"type": "module"` which is causing the conflict.

Commit and push to main.

---

## Prompt 5: Debug .cjs not being detected

**CLAUDE CODE PROMPT:**

The serverless function at `public/coming-soon/api/subscribe.cjs` is not being picked up by Vercel. Check the following and fix whatever is wrong:

1. Is there a `vercel.json` inside `public/coming-soon/` and if so what does it say
2. Vercel may not recognize `.cjs` as a serverless function — try renaming back to `subscribe.js` but rewrite the file contents to use ES module syntax (`export default` instead of `module.exports`) to match the `"type": "module"` in package.json
3. Confirm the function is reachable at `/api/subscribe` relative to the root directory

Report back before making any changes.

---

## Prompt 6: Create function in correct location with instructions

**CLAUDE CODE PROMPT:**

The `/api/subscribe` endpoint is returning a 404. The Vercel project root directory is set to `public/coming-soon` in the Vercel UI.

The problem is that Vercel only looks for serverless functions in an `api/` folder relative to the root directory it's configured to use. Since the root is `public/coming-soon`, Vercel needs an `api/` folder inside `public/coming-soon/`.

Do the following:
1. Create `public/coming-soon/api/subscribe.js` using ES module syntax (`export default`) to match the `"type": "module"` in package.json
2. Delete `public/coming-soon/api/subscribe.cjs`
3. The file should read the Mailerlite API key from `process.env.MAILERLITE_API_KEY` and group ID from `process.env.MAILERLITE_GROUP_ID`
4. Confirm there is no conflicting `vercel.json` inside `public/coming-soon/` that would interfere

Commit, push, and confirm what was done.

---

## Prompt 7: Full investigation (the right approach — should have been first)

**CLAUDE CODE PROMPT:**

The `/api/subscribe` endpoint is returning a 404. The Vercel project for the coming soon page has its root directory set to `public/coming-soon` in the Vercel dashboard.

Before doing anything, investigate and tell me:

1. What files currently exist in `public/coming-soon/` and any subdirectories
2. What the current state of `api/subscribe.js` is at the repo root and anywhere else it exists
3. What `package.json` says about module type
4. Given that Vercel root is set to `public/coming-soon`, where exactly does a serverless function need to live to be reachable at `/api/subscribe`
5. What is your recommended fix

Don't change anything yet. Just investigate and report back.

---

## Final Fix (what actually worked)

Claude Code's recommended fix (Option A):
1. Create `public/coming-soon/api/subscribe.js` — copy the existing handler there
2. Create `public/coming-soon/package.json` with `{"type": "module"}` so the ESM `export default` works
3. Keep or remove the repo-root `api/subscribe.js` (it's unused by this Vercel project)

**Key lesson:** Always have Claude Code investigate the repo state first before prescribing fixes. The conversation wasted significant time on assumptions about the project structure when a simple diagnostic prompt would have identified the root cause immediately.
