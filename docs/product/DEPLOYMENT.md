# Deployment Documentation

## GitHub Pages Hosting

### Live URL
**https://tweakyourgeek.github.io/nospend-bus-roadmap/**

### Deployment Branch
- **Source:** `main` branch
- **Path:** Root directory (`/`)
- **File:** `index.html` is the main roadmap page

### How Updates Are Deployed

1. **Merge to Main:** Changes must be merged to the `main` branch
2. **Automatic Deployment:** GitHub Pages automatically rebuilds from `main`
3. **Live in ~1-2 minutes:** Changes appear within a couple minutes of merging

### Current Branch Status

- **Production (live):** `main` branch
- **Development:** Feature branches (e.g., `claude/savings-calculator-app-UEhZP`)
- **To deploy updates:** Merge PR to `main`

---

## Repository Structure

```
nospend-bus-roadmap/
├── index.html                              # Main roadmap (LIVE on GitHub Pages)
├── HANDOFF.md                             # Handoff doc for nospend-apps
├── MANIFEST.md                            # Documentation manifest
├── No_Spend_Challenge_Product_Manual.md   # Product manual
├── No_Spend_Integration_Roadmap.md        # Integration roadmap
├── extraction_docs/                       # Framework documentation (17 files)
├── conversations/                         # Conversation transcripts
│   ├── chatgpt/                          # ChatGPT conversations (18 files)
│   └── claude/                           # Claude conversations (19 files)
├── tyg-logo.png                          # Branding assets
├── favicon.svg
└── README.md

Total: ~60 files
```

---

## What's Deployed vs. What's Documented

### Deployed to GitHub Pages:
- ✅ **index.html** - Interactive 30-Day No Spend Challenge Roadmap
- ✅ **tyg-logo.png** - Tweak Your Geek logo
- ✅ **favicon.svg** - Site favicon

### Not Deployed (Documentation Only):
- All `.md` files (product manual, roadmaps, extraction docs, conversations)
- These are reference materials for development, not public-facing

---

## Making Changes to the Live Roadmap

### Step 1: Create Feature Branch
```bash
git checkout -b claude/your-feature-name
```

### Step 2: Make Changes
- Edit `index.html` for roadmap updates
- Test locally by opening `index.html` in a browser

### Step 3: Commit & Push
```bash
git add index.html
git commit -m "Description of changes"
git push -u origin claude/your-feature-name
```

### Step 4: Create Pull Request
- Visit: https://github.com/tweakyourgeek/nospend-bus-roadmap/pulls
- Create PR from your branch → `main`
- Review changes

### Step 5: Merge to Deploy
- Merge PR to `main`
- Changes go live automatically within 1-2 minutes
- Verify at: https://tweakyourgeek.github.io/nospend-bus-roadmap/

---

## Related Repositories

### nospend-apps
- **Purpose:** Actual web applications (savings calculator, subscription analyzer, challenge tracker)
- **Repo:** https://github.com/tweakyourgeek/nospend-apps
- **Status:** In development

### Relationship:
- **nospend-bus-roadmap:** Documentation hub + deployed roadmap
- **nospend-apps:** Actual applications (will link to/from roadmap when built)

---

## Troubleshooting

### Changes not showing on GitHub Pages?
1. Check that PR was merged to `main` (not just created)
2. Wait 2-3 minutes for rebuild
3. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Check GitHub Actions for build errors

### Where to check deployment status?
- GitHub repo → Settings → Pages
- Shows current deployment status and URL

---

## Important Notes

### Placeholder Links
The roadmap currently has placeholder download links:
```html
<a href="#" class="download-btn">Download Workbook</a>
<a href="#" class="download-btn">Download Journal</a>
<a href="#" class="download-btn">Download Spreadsheets</a>
```

**Two versions needed:**
1. **Public version** (GitHub Pages) - No download links or links to landing pages
2. **Product owner version** - With actual download links to products

### Design Updates
**Current:** Modern glassmorphism design (as of Dec 2024)
- Frosted glass effects
- Gradient backgrounds
- Layered shadows
- Smooth animations

---

**Last Updated:** December 2024
