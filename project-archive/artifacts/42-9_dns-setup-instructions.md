<!-- Source: Conversation 42 (No Spend 3 031026), Item 42.9 -->
<!-- Status: REFERENCE -->

# DNS Setup Instructions (nospend.net → Vercel via Siteground)

## Architecture

Two Vercel projects running at the same time:
- **nospend-coming-soon** — just the HTML file, pointed to nospend.net, nobody touches it after it's live
- **no-spend-hub** — the real site, visible only at its Vercel URL until March 15

On March 15 you just flip the DNS from the coming soon project over to the main project and the coming soon page disappears and the real site appears.

## Step-by-Step

### Step 1 — Add the domain in Vercel

In your new coming soon Vercel project, click Settings, then Domains, then add `nospend.net`.

- Type `nospend.net` in the domain field
- Make sure Environment is set to **Production**
- Ignore the redirect options
- Hit Add

### Step 2 — Expected result in Vercel

After adding, you should see:
- `nospend.net` — Invalid Configuration
- `www.nospend.net` — Invalid Configuration
- `no-spend-comingsoon.vercel.app` — Valid Configuration (Production)

This is expected. Vercel is ready, now the DNS registrar needs to be updated.

### Step 3 — Get DNS records from Vercel

Click the **Learn more** link next to nospend.net — it will show you the exact DNS records Vercel wants you to add (A record and CNAME).

### Step 4 — Update DNS in Siteground

Update the A record and CNAME record in Siteground's DNS management to match what Vercel requires.

### Step 5 — Wait for propagation

DNS can take anywhere from a few minutes to a few hours to propagate. Keep an eye on the Vercel dashboard and when both `nospend.net` and `www.nospend.net` flip from Invalid Configuration to Valid Configuration you're live.

## Post-Setup Verification

Go to nospend.net and confirm the coming soon page loads. Then submit a test email to verify the form works and the subscriber lands in Mailerlite.
