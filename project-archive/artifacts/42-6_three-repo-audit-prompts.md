<!-- Source: Conversation 42 (No Spend 3 031026), Item 42.6 -->
<!-- Status: REFERENCE -->

# Three Repo Audit Prompts

## Prompt 1: Initial Serverless Function Prompt

**CLAUDE CODE PROMPT:**

Add a Vercel serverless function to no-spend-hub that handles the Mailerlite email signup from the coming soon page.

Create `api/subscribe.js` that:
- Accepts a POST request with an email address
- Calls the Mailerlite API to add the subscriber to a group
- Returns success or error JSON
- Reads the API key and group ID from environment variables `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID`

Then update the coming soon `index.html` so the form submits to `/api/subscribe` instead of calling Mailerlite directly.

---

## Prompt 2: Full Serverless Function Prompt (Expanded)

**CLAUDE CODE PROMPT:**

Add a Vercel serverless function to no-spend-hub that handles the Mailerlite email signup from the coming soon page.

Create `api/subscribe.js` with this logic:
- Accepts a POST request containing an email address
- Calls the Mailerlite API v2 to add the subscriber to a group
- Reads the API key from environment variable `MAILERLITE_API_KEY` and group ID from `MAILERLITE_GROUP_ID`
- Returns a JSON success response on success and a JSON error response on failure
- Includes CORS headers so the HTML page can call it

Then update `coming-soon.html` so the form submits to `/api/subscribe` instead of the Mailerlite API directly. Remove the TODO placeholder code and replace it with a fetch call to `/api/subscribe`.

---

## Prompt 3: Diagnostic/Investigation Prompt

**CLAUDE CODE PROMPT:**

Check the current repo structure and tell me exactly where `api/subscribe.js` lives relative to the `coming-soon` folder. Also confirm what the root directory is set to in any Vercel config files if they exist. Don't move anything yet, just report back.
