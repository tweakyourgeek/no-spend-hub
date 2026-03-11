# Vercel Serverless Function Prompt (api/subscribe.js + Mailerlite)
# Source: Conversation 42 (No Spend #3 031026)
# URL: https://claude.ai/chat/46827ba3-40b1-4cd8-a990-476a130ed304
# Status: CURRENT
# Notes: Prompt for Claude Code to add Mailerlite email signup via serverless function. Keeps API key out of HTML.

---

## CLAUDE CODE PROMPT:

Add a Vercel serverless function to no-spend-hub that handles the Mailerlite email signup from the coming soon page.

Create `api/subscribe.js` with this logic:
- Accepts a POST request containing an email address
- Calls the Mailerlite API v2 to add the subscriber to a group
- Reads the API key from environment variable `MAILERLITE_API_KEY` and group ID from `MAILERLITE_GROUP_ID`
- Returns a JSON success response on success and a JSON error response on failure
- Includes CORS headers so the HTML page can call it

Then update `coming-soon.html` so the form submits to `/api/subscribe` instead of the Mailerlite API directly. Remove the TODO placeholder code and replace it with a fetch call to `/api/subscribe`.

Test that the function file is in the right place for Vercel to recognize it automatically.

---

## STEP BY STEP FOR VERCEL (after Claude Code does its part):

1. Go to vercel.com and open the no-spend-hub project
2. Click Settings at the top
3. Click Environment Variables in the left sidebar
4. Add the first variable: name it `MAILERLITE_API_KEY`, value is your API key from Mailerlite (find it in Mailerlite under Integrations then API)
5. Add the second variable: name it `MAILERLITE_GROUP_ID`, value is the ID of the group you want subscribers added to (in Mailerlite go to Subscribers, then Groups, click your group, the ID is in the URL)
6. Save both
7. Redeploy the site so Vercel picks up the new variables

That's it. The form will work, your API key is invisible, and subscribers land in Mailerlite automatically.
