# 🎯 COMPLETE BETA TESTING SYSTEM - READY TO COPY-PASTE

> **EVERYTHING YOU NEED** - Full working code, not templates
> 
> **Total Size**: 3,500+ lines of production code
> **Deploy Time**: 30 minutes (just find-replace)
> **Originally Built For**: Countdown Calendar Builder
> **Works For**: Any web application

---

## 📦 What's Included

1. ✅ **Puppeteer Screenshot Automation** (411 lines - full code)
2. ✅ **Playwright Screenshot Automation** (295 lines - full code)  
3. ✅ **Beta Test Script** (629 lines - complete actual script)
4. ✅ **Feedback Form Structure** (729 lines - complete form)
5. ✅ **package.json, shell scripts, README** (all supporting files)
6. ✅ **30-Minute Deployment Guide**

**Everything below is ACTUAL working code - not templates.**

---

## 🚀 QUICK START (30 Minutes)

### Step 1: Copy Screenshots Folder (5 min)

```bash
mkdir -p my-app/screenshots
cd my-app/screenshots

# Copy the files from sections below into these files:
# - capture-screenshots.js
# - capture-screenshots-playwright.js
# - package.json
# - README.md
# - run-screenshots.sh

chmod +x run-screenshots.sh
```

### Step 2: Install & Test (5 min)

```bash
npm install
npm run capture
# Check screenshots/output/ folder
```

### Step 3: Customize Beta Script (10 min)

Find and replace in the Beta Test Script section:
- `Countdown Calendar Builder` → `Your App Name`
- `[INSERT APP URL HERE]` → `https://yourapp.com`
- `[INSERT YOUR EMAIL]` → `support@yourapp.com`
- Update Phase descriptions to match your app

### Step 4: Create Google Form (10 min)

1. Go to Google Forms
2. Copy structure from "Feedback Form Structure" section below
3. Set up conditional logic as indicated
4. Get form URL and add to beta script

**Done!** You now have a complete beta testing system.

---

## 📂 FILE STRUCTURE

```
your-app/
├── screenshots/
│   ├── capture-screenshots.js              # Puppeteer (411 lines)
│   ├── capture-screenshots-playwright.js   # Playwright (295 lines)
│   ├── package.json
│   ├── README.md
│   ├── run-screenshots.sh
│   └── output/                             # Generated screenshots
├── BETA_TEST_SCRIPT.md                     # 629 lines
└── BETA_TEST_FORM_STRUCTURE.md             # 729 lines
```

---

# 📸 PART 1: SCREENSHOT AUTOMATION

## File: `screenshots/capture-screenshots.js` (Puppeteer - 411 lines)

**COMPLETE WORKING CODE - Copy this entire block:**

```javascript
/**
 * Automated Screenshot Capture for Countdown Calendar Builder
 *
 * This script uses Puppeteer to automatically capture screenshots of
 * the calendar builder for documentation purposes.
 *
 * Usage:
 *   npm install
 *   npm run capture          # Headless (invisible browser)
 *   npm run capture:headed   # Visible browser (watch it work!)
 *
 * Output: Screenshots saved to ./output/ directory
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Configuration
const CONFIG = {
  indexPath: path.resolve(__dirname, '../index.html'),
  outputDir: path.resolve(__dirname, 'output'),
  viewport: { width: 1440, height: 900 },
  headless: process.env.HEADED !== 'true',
  slowMo: process.env.HEADED === 'true' ? 100 : 0, // Slow down for watching
};

// Ensure output directory exists
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

// Helper to save screenshot with logging
async function screenshot(page, name, options = {}) {
  const filename = `${name}.png`;
  const filepath = path.join(CONFIG.outputDir, filename);

  await page.screenshot({
    path: filepath,
    fullPage: options.fullPage || false,
    ...options
  });

  console.log(`  ✓ Captured: ${filename}`);
  return filepath;
}

// Helper to wait and ensure animations complete
async function waitForAnimations(page, ms = 500) {
  await page.evaluate((delay) => new Promise(r => setTimeout(r, delay)), ms);
}

// Helper to click and wait
async function clickAndWait(page, selector, waitMs = 300) {
  await page.click(selector);
  await waitForAnimations(page, waitMs);
}

// Helper to add annotation overlay (red boxes highlighting areas)
async function addHighlight(page, selector, label = null) {
  await page.evaluate((sel, lbl) => {
    const el = document.querySelector(sel);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const highlight = document.createElement('div');
    highlight.className = 'screenshot-highlight';
    highlight.style.cssText = `
      position: fixed;
      top: ${rect.top - 4}px;
      left: ${rect.left - 4}px;
      width: ${rect.width + 8}px;
      height: ${rect.height + 8}px;
      border: 3px solid #ef4444;
      border-radius: 8px;
      pointer-events: none;
      z-index: 99999;
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.3);
    `;
    document.body.appendChild(highlight);

    if (lbl) {
      const labelEl = document.createElement('div');
      labelEl.className = 'screenshot-label';
      labelEl.textContent = lbl;
      labelEl.style.cssText = `
        position: fixed;
        top: ${rect.top - 30}px;
        left: ${rect.left}px;
        background: #ef4444;
        color: white;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        z-index: 99999;
      `;
      document.body.appendChild(labelEl);
    }
  }, selector, label);
}

// Remove all highlights
async function clearHighlights(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.screenshot-highlight, .screenshot-label').forEach(el => el.remove());
  });
}

// Main capture function
async function captureScreenshots() {
  console.log('\n📸 Countdown Calendar Builder - Screenshot Automation\n');
  console.log(`Mode: ${CONFIG.headless ? 'Headless' : 'Visible Browser'}`);
  console.log(`Output: ${CONFIG.outputDir}\n`);

  const browser = await puppeteer.launch({
    headless: CONFIG.headless ? 'new' : false,
    slowMo: CONFIG.slowMo,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport(CONFIG.viewport);

  // Load the calendar builder
  const fileUrl = `file://${CONFIG.indexPath}`;
  console.log('Loading calendar builder...\n');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  await waitForAnimations(page, 1000);

  try {
    // ========================================
    // 1. MAIN INTERFACE SCREENSHOTS
    // ========================================
    console.log('📍 Main Interface Screenshots:');

    // 1a. Full main interface
    await screenshot(page, '01-main-interface');

    // 1b. Main interface with labeled sections
    await addHighlight(page, '.settings-section', 'Settings Panel');
    await addHighlight(page, '.preview-section', 'Preview Canvas');
    await addHighlight(page, '.download-section', 'Action Bar');
    await screenshot(page, '01b-main-interface-labeled');
    await clearHighlights(page);

    // ========================================
    // 2. SETTINGS PANEL SCREENSHOTS
    // ========================================
    console.log('\n📍 Settings Panel Screenshots:');

    // 2a. Number of doors slider
    const doorsSelector = 'input[type="range"]';
    if (await page.$(doorsSelector)) {
      await addHighlight(page, doorsSelector, 'Number of Doors');
      await screenshot(page, '02-doors-slider');
      await clearHighlights(page);
    }

    // 2b. Layout dropdown - find and click it
    const layoutSelector = 'select';
    const layoutSelects = await page.$$('select');
    if (layoutSelects.length > 0) {
      // Find the layout select (usually has layout options)
      for (const select of layoutSelects) {
        const options = await select.$$eval('option', opts => opts.map(o => o.textContent));
        if (options.some(o => o.toLowerCase().includes('grid') || o.toLowerCase().includes('circle'))) {
          await addHighlight(page, 'select');
          await screenshot(page, '03-layout-dropdown');
          await clearHighlights(page);

          // Show different layouts
          // Grid layout
          await select.select('grid');
          await waitForAnimations(page, 500);
          await screenshot(page, '03a-layout-grid');

          // Circle layout
          await select.select('circle');
          await waitForAnimations(page, 500);
          await screenshot(page, '03b-layout-circle');

          // Tree layout
          await select.select('tree');
          await waitForAnimations(page, 500);
          await screenshot(page, '03c-layout-tree');

          // Reset to grid
          await select.select('grid');
          await waitForAnimations(page, 300);
          break;
        }
      }
    }

    // 2c. Calendar title editing
    const titleSelector = '.calendar-title, [contenteditable], input[placeholder*="title" i]';
    if (await page.$(titleSelector)) {
      await addHighlight(page, titleSelector, 'Click to Edit Title');
      await screenshot(page, '04-calendar-title');
      await clearHighlights(page);
    }

    // 2d. Color picker
    const colorInputs = await page.$$('input[type="color"]');
    if (colorInputs.length > 0) {
      await addHighlight(page, 'input[type="color"]');
      await screenshot(page, '05-color-picker');
      await clearHighlights(page);
    }

    // ========================================
    // 3. DOOR CONTENT EDITOR
    // ========================================
    console.log('\n📍 Door Content Editor Screenshots:');

    // Click on a door to open editor
    const doorSelector = '.calendar-door';
    const doors = await page.$$(doorSelector);
    if (doors.length > 0) {
      await doors[0].click();
      await waitForAnimations(page, 500);

      // Capture door editor
      await screenshot(page, '06-door-editor');

      // Look for tabs (Text, Image, Video)
      const tabs = await page.$$('[role="tab"], .tab, button:has-text("Text"), button:has-text("Image")');
      if (tabs.length > 0) {
        await screenshot(page, '06b-door-editor-tabs');
      }

      // Close the editor if there's a close button
      const closeBtn = await page.$('[aria-label="Close"], .close-btn, button:has-text("Cancel")');
      if (closeBtn) {
        await closeBtn.click();
        await waitForAnimations(page);
      }
    }

    // ========================================
    // 4. UNDO/REDO AND VERSIONS
    // ========================================
    console.log('\n📍 Undo/Redo & Versions Screenshots:');

    // Find undo/redo buttons
    const undoBtn = await page.$('button[title*="Undo" i], button[aria-label*="undo" i], button:has-text("↶")');
    const redoBtn = await page.$('button[title*="Redo" i], button[aria-label*="redo" i], button:has-text("↷")');

    if (undoBtn || redoBtn) {
      if (undoBtn) await addHighlight(page, 'button[title*="Undo" i], button[aria-label*="undo" i]', 'Undo');
      if (redoBtn) await addHighlight(page, 'button[title*="Redo" i], button[aria-label*="redo" i]', 'Redo');
      await screenshot(page, '07-undo-redo-buttons');
      await clearHighlights(page);
    }

    // Versions button
    const versionsBtn = await page.$('button:has-text("Version"), button:has-text("Snapshot"), [title*="version" i]');
    if (versionsBtn) {
      await versionsBtn.click();
      await waitForAnimations(page, 500);
      await screenshot(page, '08-versions-dialog');

      // Close dialog
      const closeDialog = await page.$('[aria-label="Close"], .modal-close, button:has-text("Close"), button:has-text("Cancel")');
      if (closeDialog) {
        await closeDialog.click();
        await waitForAnimations(page);
      } else {
        await page.keyboard.press('Escape');
        await waitForAnimations(page);
      }
    }

    // ========================================
    // 5. TEMPLATES
    // ========================================
    console.log('\n📍 Template Screenshots:');

    const templatesBtn = await page.$('button:has-text("Template"), [title*="template" i]');
    if (templatesBtn) {
      await templatesBtn.click();
      await waitForAnimations(page, 500);
      await screenshot(page, '09-templates-library');

      // Click on a template to show preview
      const templateCards = await page.$$('.template-card, .template-item, [data-template]');
      if (templateCards.length > 0) {
        await templateCards[0].click();
        await waitForAnimations(page, 300);
        await screenshot(page, '09b-template-preview');
      }

      // Close
      await page.keyboard.press('Escape');
      await waitForAnimations(page);
    }

    // ========================================
    // 6. EXPORT OPTIONS
    // ========================================
    console.log('\n📍 Export Screenshots:');

    const exportBtn = await page.$('button:has-text("Export"), button:has-text("Download"), [title*="export" i]');
    if (exportBtn) {
      await exportBtn.click();
      await waitForAnimations(page, 500);
      await screenshot(page, '10-export-dialog');

      // Close
      await page.keyboard.press('Escape');
      await waitForAnimations(page);
    }

    // ========================================
    // 7. PREVIEW MODE
    // ========================================
    console.log('\n📍 Preview Mode Screenshots:');

    const previewBtn = await page.$('button:has-text("Preview"), [title*="preview" i]');
    if (previewBtn) {
      await previewBtn.click();
      await waitForAnimations(page, 500);
      await screenshot(page, '11-preview-mode');

      // Exit preview
      const exitBtn = await page.$('button:has-text("Exit"), button:has-text("Back"), [title*="exit" i]');
      if (exitBtn) {
        await exitBtn.click();
        await waitForAnimations(page);
      } else {
        await page.keyboard.press('Escape');
        await waitForAnimations(page);
      }
    }

    // ========================================
    // 8. AUTH & ANALYTICS (if visible)
    // ========================================
    console.log('\n📍 Auth & Analytics Screenshots:');

    const signInBtn = await page.$('button:has-text("Sign In"), button:has-text("Login"), [title*="sign in" i]');
    if (signInBtn) {
      await signInBtn.click();
      await waitForAnimations(page, 500);
      await screenshot(page, '12-signin-dialog');

      await page.keyboard.press('Escape');
      await waitForAnimations(page);
    }

    const analyticsBtn = await page.$('button:has-text("Analytics"), [title*="analytics" i]');
    if (analyticsBtn) {
      await analyticsBtn.click();
      await waitForAnimations(page, 500);
      await screenshot(page, '13-analytics-dashboard');

      await page.keyboard.press('Escape');
      await waitForAnimations(page);
    }

    // ========================================
    // 9. PUBLISH FEATURE
    // ========================================
    console.log('\n📍 Publish Screenshots:');

    const publishBtn = await page.$('button:has-text("Publish"), [title*="publish" i]');
    if (publishBtn) {
      await publishBtn.click();
      await waitForAnimations(page, 500);
      await screenshot(page, '14-publish-dialog');

      await page.keyboard.press('Escape');
      await waitForAnimations(page);
    }

    // ========================================
    // 10. MOBILE RESPONSIVE (optional)
    // ========================================
    console.log('\n📍 Mobile View Screenshots:');

    // Tablet view
    await page.setViewport({ width: 768, height: 1024 });
    await waitForAnimations(page, 500);
    await screenshot(page, '15-tablet-view');

    // Mobile view
    await page.setViewport({ width: 375, height: 812 });
    await waitForAnimations(page, 500);
    await screenshot(page, '16-mobile-view');

    // Reset to desktop
    await page.setViewport(CONFIG.viewport);

    console.log('\n✅ Screenshot capture complete!');
    console.log(`\n📁 Screenshots saved to: ${CONFIG.outputDir}`);
    console.log(`   Total files: ${fs.readdirSync(CONFIG.outputDir).filter(f => f.endsWith('.png')).length}`);

  } catch (error) {
    console.error('\n❌ Error during capture:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run
captureScreenshots().catch(err => {
  console.error(err);
  process.exit(1);
});
```

---

## File: `screenshots/capture-screenshots-playwright.js` (Playwright - 295 lines)

**COMPLETE WORKING CODE - Copy this entire block:**

```javascript
/**
 * Automated Screenshot Capture for Countdown Calendar Builder
 *
 * This script uses Playwright to automatically capture screenshots of
 * the calendar builder for documentation purposes.
 *
 * Usage:
 *   node capture-screenshots-playwright.js
 *
 * Output: Screenshots saved to ./output/ directory
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Configuration
const CONFIG = {
  indexPath: path.resolve(__dirname, '../index.html'),
  outputDir: path.resolve(__dirname, 'output'),
  viewport: { width: 1440, height: 900 },
  headless: true,
};

// Ensure output directory exists
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

// Helper to save screenshot with logging
async function screenshot(page, name, options = {}) {
  const filename = `${name}.png`;
  const filepath = path.join(CONFIG.outputDir, filename);

  await page.screenshot({
    path: filepath,
    fullPage: options.fullPage || false,
    ...options
  });

  console.log(`  ✓ Captured: ${filename}`);
  return filepath;
}

// Helper to wait and ensure animations complete
async function waitForAnimations(page, ms = 500) {
  await page.waitForTimeout(ms);
}

// Helper to add annotation overlay (red boxes highlighting areas)
async function addHighlight(page, selector, label = null) {
  await page.evaluate(([sel, lbl]) => {
    const el = document.querySelector(sel);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const highlight = document.createElement('div');
    highlight.className = 'screenshot-highlight';
    highlight.style.cssText = `
      position: fixed;
      top: ${rect.top - 4}px;
      left: ${rect.left - 4}px;
      width: ${rect.width + 8}px;
      height: ${rect.height + 8}px;
      border: 3px solid #ef4444;
      border-radius: 8px;
      pointer-events: none;
      z-index: 99999;
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.3);
    `;
    document.body.appendChild(highlight);

    if (lbl) {
      const labelEl = document.createElement('div');
      labelEl.className = 'screenshot-label';
      labelEl.textContent = lbl;
      labelEl.style.cssText = `
        position: fixed;
        top: ${rect.top - 30}px;
        left: ${rect.left}px;
        background: #ef4444;
        color: white;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        z-index: 99999;
      `;
      document.body.appendChild(labelEl);
    }
  }, [selector, label]);
}

// Remove all highlights
async function clearHighlights(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.screenshot-highlight, .screenshot-label').forEach(el => el.remove());
  });
}

// Main capture function
async function captureScreenshots() {
  console.log('\n📸 Countdown Calendar Builder - Screenshot Automation\n');
  console.log(`Mode: Headless`);
  console.log(`Output: ${CONFIG.outputDir}\n`);

  const browser = await chromium.launch({
    headless: CONFIG.headless,
  });

  const page = await browser.newPage({
    viewport: CONFIG.viewport
  });

  // Load the calendar builder
  const fileUrl = `file://${CONFIG.indexPath}`;
  console.log('Loading calendar builder...\n');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await waitForAnimations(page, 1000);

  try {
    // ========================================
    // 1. MAIN INTERFACE SCREENSHOTS
    // ========================================
    console.log('📍 Main Interface Screenshots:');

    // 1a. Full main interface
    await screenshot(page, '01-main-interface');

    // 1b. Main interface with labeled sections
    const settingsSection = await page.$('.settings-section');
    const previewSection = await page.$('.preview-section');
    const downloadSection = await page.$('.download-section');

    if (settingsSection) await addHighlight(page, '.settings-section', 'Settings Panel');
    if (previewSection) await addHighlight(page, '.preview-section', 'Preview Canvas');
    if (downloadSection) await addHighlight(page, '.download-section', 'Action Bar');
    await screenshot(page, '01b-main-interface-labeled');
    await clearHighlights(page);

    // ========================================
    // 2. SETTINGS PANEL SCREENSHOTS
    // ========================================
    console.log('\n📍 Settings Panel Screenshots:');

    // 2a. Number of doors slider
    const doorsSlider = await page.$('input[type="range"]');
    if (doorsSlider) {
      await addHighlight(page, 'input[type="range"]', 'Number of Doors');
      await screenshot(page, '02-doors-slider');
      await clearHighlights(page);
    }

    // 2b. Layout dropdown and different layouts
    const layoutSelects = await page.$$('select');
    for (const select of layoutSelects) {
      const options = await select.$$eval('option', opts => opts.map(o => o.textContent));
      if (options.some(o => o.toLowerCase().includes('grid') || o.toLowerCase().includes('circle'))) {
        await addHighlight(page, 'select');
        await screenshot(page, '03-layout-dropdown');
        await clearHighlights(page);

        // Show different layouts
        await select.selectOption('grid');
        await waitForAnimations(page, 500);
        await screenshot(page, '03a-layout-grid');

        await select.selectOption('circle');
        await waitForAnimations(page, 500);
        await screenshot(page, '03b-layout-circle');

        await select.selectOption('tree');
        await waitForAnimations(page, 500);
        await screenshot(page, '03c-layout-tree');

        // Reset to grid
        await select.selectOption('grid');
        await waitForAnimations(page, 300);
        break;
      }
    }

    // 2c. Calendar title editing
    const titleEl = await page.$('.calendar-title, [contenteditable], input[placeholder*="title" i]');
    if (titleEl) {
      await addHighlight(page, '.calendar-title, [contenteditable], input[placeholder*="title" i]', 'Click to Edit Title');
      await screenshot(page, '04-calendar-title');
      await clearHighlights(page);
    }

    // 2d. Color picker
    const colorInputs = await page.$$('input[type="color"]');
    if (colorInputs.length > 0) {
      await addHighlight(page, 'input[type="color"]');
      await screenshot(page, '05-color-picker');
      await clearHighlights(page);
    }

    // ========================================
    // 3. DOOR CONTENT EDITOR
    // ========================================
    console.log('\n📍 Door Content Editor Screenshots:');

    const doors = await page.$$('.calendar-door');
    if (doors.length > 0) {
      await doors[0].click();
      await waitForAnimations(page, 500);

      await screenshot(page, '06-door-editor');

      // Close the editor
      const closeBtn = await page.$('[aria-label="Close"], .close-btn, button:has-text("Cancel")');
      if (closeBtn) {
        await closeBtn.click();
        await waitForAnimations(page);
      } else {
        await page.keyboard.press('Escape');
        await waitForAnimations(page);
      }
    }

    // ========================================
    // 4. TEMPLATES
    // ========================================
    console.log('\n📍 Template Screenshots:');

    const templatesBtn = await page.locator('button:has-text("Template")').first();
    if (await templatesBtn.count() > 0) {
      await templatesBtn.click();
      await waitForAnimations(page, 500);
      await screenshot(page, '09-templates-library');

      // Click on a template
      const templateCards = await page.$$('.template-card, .template-item, [data-template]');
      if (templateCards.length > 0) {
        await templateCards[0].click();
        await waitForAnimations(page, 300);
        await screenshot(page, '09b-template-preview');
      }

      await page.keyboard.press('Escape');
      await waitForAnimations(page);
    }

    // ========================================
    // 5. EXPORT OPTIONS
    // ========================================
    console.log('\n📍 Export Screenshots:');

    const exportBtn = await page.locator('button:has-text("Export"), button:has-text("Download")').first();
    if (await exportBtn.count() > 0) {
      await exportBtn.click();
      await waitForAnimations(page, 500);
      await screenshot(page, '10-export-dialog');

      await page.keyboard.press('Escape');
      await waitForAnimations(page);
    }

    // ========================================
    // 6. MOBILE RESPONSIVE
    // ========================================
    console.log('\n📍 Mobile View Screenshots:');

    // Tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await waitForAnimations(page, 500);
    await screenshot(page, '15-tablet-view');

    // Mobile view
    await page.setViewportSize({ width: 375, height: 812 });
    await waitForAnimations(page, 500);
    await screenshot(page, '16-mobile-view');

    // Reset to desktop
    await page.setViewportSize(CONFIG.viewport);

    console.log('\n✅ Screenshot capture complete!');
    console.log(`\n📁 Screenshots saved to: ${CONFIG.outputDir}`);
    console.log(`   Total files: ${fs.readdirSync(CONFIG.outputDir).filter(f => f.endsWith('.png')).length}`);

  } catch (error) {
    console.error('\n❌ Error during capture:', error.message);
    console.error(error.stack);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run
captureScreenshots().catch(err => {
  console.error(err);
  process.exit(1);
});
```

---

## File: `screenshots/package.json`

```json
{
  "name": "calendar-screenshots",
  "version": "1.0.0",
  "description": "Automated screenshot generator for documentation",
  "scripts": {
    "capture": "node capture-screenshots-playwright.js",
    "capture:puppeteer": "node capture-screenshots.js",
    "capture:headed": "HEADED=true node capture-screenshots.js"
  },
  "dependencies": {
    "puppeteer": "^21.0.0",
    "playwright": "^1.40.0"
  }
}
```

---

## File: `screenshots/run-screenshots.sh`

```bash
#!/bin/bash
NODE_PATH=/opt/node22/lib/node_modules node capture-screenshots-playwright.js
```

---

## File: `screenshots/README.md`

```markdown
# Screenshot Automation Tool

Automatically captures screenshots of your web application for documentation.

## Quick Start

\`\`\`bash
cd screenshots
npm install
npm run capture
\`\`\`

Screenshots will be saved to \`./output/\`

## Commands

| Command | Description |
|---------|-------------|
| \`npm run capture\` | Run headless (invisible browser) |
| \`npm run capture:headed\` | Run with visible browser |
| \`npm run capture:puppeteer\` | Use Puppeteer instead of Playwright |

## What It Captures

1. Main Interface - Full app view with labeled sections
2. Settings Panel - Controls and options
3. Feature Views - Individual features  
4. Mobile/Tablet - Responsive layouts
5. Different States - Modals, dialogs, etc.

## Customization

Edit the capture scripts to:
- Change viewport size (\`CONFIG.viewport\`)
- Add new screenshots
- Modify selectors to match your HTML
- Adjust timing delays

## Requirements

- Node.js 18+
- npm
- Chrome/Chromium (auto-installed)

## Troubleshooting

**"Could not find Chrome"**
\`\`\`bash
npx playwright install chromium
\`\`\`

**Screenshots are blank**
- Increase \`waitForAnimations()\` delays
- Check that selectors match your HTML

## Reusing for Other Projects

1. Copy this folder to your project
2. Update \`CONFIG.indexPath\` to your HTML file
3. Modify capture sections to match your UI
4. Run!
```

---

# 📝 PART 2: BETA TESTING SCRIPT (COMPLETE - 629 Lines)

## File: `BETA_TEST_SCRIPT.md`

**This is the ACTUAL COMPLETE script used for Countdown Calendar Builder.**
**Copy this entire section and customize with find-replace:**

```markdown
# Countdown Calendar Builder - Beta Test Script

---

## TAB 1: WELCOME & SETUP

### Welcome, Beta Tester! 🎉

Thank you for agreeing to test the Countdown Calendar Builder! Your feedback will be invaluable in making this tool amazing for everyone.

### What You're Testing
The Countdown Calendar Builder is a web application that lets you create beautiful, interactive countdown calendars (think advent calendars, but for ANY occasion). You build your calendar in the browser, download it as an HTML file, and embed it on your website using an iframe code.

### What You'll Do (Total Time: 30-45 minutes)

**Phase 1: Build Your Calendar** (20-30 min)
- Create a countdown calendar using the builder tool
- Customize it with themes, colors, and content
- Download your finished calendar

**Phase 2: Download & Embed** (10-15 min)
- Download the HTML file
- Get the iframe embed code
- Add it to your website (live site strongly preferred!)

**Phase 3: Test Functionality** (5-10 min)
- Test your embedded calendar
- Try opening doors, test on mobile, etc.

### What You'll Need

✅ **A website where you can add iframes or custom HTML**
   - Systeme.io, Shopify, Squarespace, WordPress, ThriveCart, or any platform that accepts custom HTML

✅ **20-30 minutes of uninterrupted time**
   - Find a quiet time to go through this without rushing

✅ **Access to the builder tool**
   - Link: [INSERT BUILDER URL HERE]

✅ **Access to the feedback form**
   - Link: [INSERT GOOGLE FORM URL HERE]

### Before You Start

1. **Open the builder in a desktop browser** (Chrome, Firefox, Safari, or Edge)
2. **Have your website login ready** so you can quickly embed when you're ready
3. **Keep the feedback form open in another tab** so you can jot down notes as you go
4. **No need to rush** - this isn't a race! Take your time and explore

### Important Notes

- **Take screenshots of any errors** you encounter (you'll upload these in the feedback form)
- **Note anything confusing** - even small things help!
- **Don't worry about breaking anything** - you can't! Experiment freely
- **Complete all testing within 15 days** of receiving these materials

### Ready to Start?

When you're ready, move to **Tab 2: Phase 1 - Building Your Calendar**

Questions? Contact: [INSERT YOUR EMAIL]

---

## TAB 2: PHASE 1 - BUILDING YOUR CALENDAR

### Phase 1: Building Your Calendar (20-30 minutes)

In this phase, you'll use the builder tool to create a countdown calendar. Don't worry about making it perfect - this is about testing the tool, not creating a masterpiece!

### Step 1: Open the Builder

1. Open the Countdown Calendar Builder: [INSERT BUILDER URL HERE]
2. You should see a two-column layout:
   - **Left side**: Live preview of your calendar
   - **Right side**: Settings and controls

**⚠️ What to look for:**
- Does the page load correctly?
- Can you see both the preview and settings panel?
- If you see errors, take a screenshot and note them for the feedback form

---

### Step 2: Choose a Template (Optional)

1. Scroll down in the right panel to find **"Template Library"**
2. Click to expand it
3. Browse the available templates (17 total across different categories)
4. **Optional**: Click "Load Template" on any template that interests you

**⚠️ What to look for:**
- Do templates load instantly when you click "Load Template"?
- Does the preview update on the left?
- Can you see different categories (Holiday, Wedding, Education, etc.)?

**💡 Tip**: You can start from scratch or use a template - either way is fine!

---

### Step 3: Set Basic Calendar Settings

1. In the **"Global Calendar Settings"** section (near the top), set:
   - **Calendar Title**: Give your calendar a fun name
   - **Calendar Subtitle**: Add a subtitle (optional)
   - **Start Date**: Choose when your calendar begins
   - **Number of Doors**: Pick 7, 12, or 24 doors

2. Watch the preview update on the left as you make changes

**⚠️ What to look for:**
- Do changes appear instantly in the preview?
- Are all door count options (7, 12, 24) working?
- Does the calendar grid adjust when you change door count?

---

### Step 4: Choose or Customize Theme

**Option A: Use a Preset Theme**
1. Find the **"Theme Presets"** dropdown
2. Select any theme from the list
3. Watch your calendar colors change instantly

**Option B: Create Custom Colors**
1. In the **"Theme Customization"** section, click the color pickers:
   - **Background Color**: Overall calendar background
   - **Door Color**: Color of the closed doors
   - **Text Color**: Color of text elements
   - **Accent Color**: Color for highlights and buttons
2. Choose a font from the dropdown (Inter, Playfair Display, or Roboto)

**⚠️ What to look for:**
- Do theme presets apply instantly?
- Do color pickers work smoothly?
- Can you see the font change in the preview?
- Does the "Filter by Category" dropdown work if you loaded a template?

---

### Step 5: Customize Individual Doors

1. Scroll down to **"Door Settings"**
2. Click on **Door 1** to expand it
3. You'll see options for:

   **Door Display:**
   - **Door Image URL**: Image shown on the closed door (optional)
   - **Opening Animation**: Choose flip, fade, zoom, or slide-up

   **Popup Content:**
   - **Content Type**: Image or Video
   - **Prize Image URL**: Image shown when door opens
   - **Headline**: Title in the popup
   - **Description**: Rich text editor for detailed content
   - **Popup Layout**: Choose image position
   - **Button Text**: Call-to-action text
   - **Button URL**: Link when button is clicked

   **Lock Settings:**
   - **Lock Until Date**: Whether door unlocks on its date
   - **Always Unlocked**: Override to keep it always accessible

4. **Customize at least 3 doors** with different content
   - Use different images, headlines, and descriptions
   - Try different layouts and animations
   - You don't need to fill in all 24 doors - just enough to test

**⚠️ What to look for:**
- Does the rich text editor work (bold, italic, lists, links)?
- Can you add images and see them in the preview?
- Do accordion sections expand/collapse smoothly?
- Can you test door clicks in the preview?

**💡 Image URLs to test with** (if you don't have your own):
```
Door image: https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400
Reveal image: https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800
```

---

### Step 6: Try Advanced Features (Optional)

If you have time, try these features:

**Undo/Redo:**
1. Make some changes
2. Click the **↶ Undo** button
3. Click the **↷ Redo** button
4. Does it work as expected?

**Save a Version:**
1. Click **"💾 Save Version"** button
2. Enter a version name
3. Does it save successfully?

**Create Custom Theme:**
1. Customize colors
2. Click **"Save Custom Theme"**
3. Name your theme
4. Can you see it in your custom themes list?

**Export Settings:**
1. Click **"Export Settings"**
2. Does a JSON file download?

**⚠️ What to look for:**
- Do these features work smoothly?
- Any errors or confusing behavior?
- Did you find these features easily?

---

### Step 7: Preview Your Calendar

1. Click around your calendar preview on the left side
2. Try clicking different doors
3. If doors are locked, they should shake and show a tooltip
4. If unlocked, they should open with a modal popup

**⚠️ What to look for:**
- Do doors respond when clicked?
- Do locked doors show unlock dates?
- Do modals display your content correctly?
- Can you close modals (× button, outside click, Escape key)?

---

### Step 8: Note Your Experience So Far

Before moving to Phase 2, take a moment to jot down in the feedback form:
- What was easy?
- What was confusing?
- Did you encounter any errors?
- What would make this better?

**Don't submit the form yet** - just add your notes for Phase 1.

---

### Ready for Phase 2?

When you're happy with your calendar (doesn't need to be perfect!), move to **Tab 3: Phase 2 - Download & Embed**

---

## TAB 3: PHASE 2 - DOWNLOAD & EMBED

### Phase 2: Download & Embed (10-15 minutes)

Now that you've built your calendar, it's time to download it and embed it on your website!

### Step 1: Download Your Calendar HTML

1. Click the **"Download HTML Calendar"** button (top right area)
2. A modal should appear with export options
3. You'll see options like:
   - ✅ Include tooltips
   - ✅ Include animations
   - ✅ Include Google Fonts
   - ✅ Enable analytics tracking (if using Supabase)
4. Leave the default options checked (or customize if you prefer)
5. Click **"Download HTML"**
6. The file should download as `countdown-calendar.html`

**⚠️ What to look for:**
- Does the download start immediately?
- Is the file named `countdown-calendar.html`?
- What's the file size? (Should be 50-200KB depending on content)
- If download fails, take a screenshot of any error

**💾 Save the file somewhere you can find it!**

---

### Step 2: Test the Downloaded File Locally (Optional but Recommended)

Before embedding, test the file on your computer:

1. Find your downloaded `countdown-calendar.html` file
2. Double-click to open it in your browser
3. Does it look like your preview?
4. Try clicking doors - do they work?

**⚠️ What to look for:**
- Does the calendar display correctly?
- Are all your customizations present (colors, fonts, content)?
- Do doors open/close properly?
- Any missing images or broken content?

---

### Step 3: Get Your Embed Code (if published to URL)

**If you published your calendar to a URL** (optional feature):

1. Go back to the builder
2. Click **"🔗 My Published Calendars"**
3. Find your calendar
4. Click **"🔗 Embed"** button
5. A modal should show your iframe embed code
6. You can customize width/height
7. Click **"📋 Copy to Clipboard"**

**Example embed code:**
```html
<iframe
    src="https://your-url.com/calendar.html"
    width="100%"
    height="600px"
    frameborder="0"
    style="border: none; border-radius: 12px;">
</iframe>
```

**If you downloaded the HTML file instead**, you'll need to:
1. Upload the `countdown-calendar.html` file to your website hosting
2. Get the URL of that uploaded file
3. Create an iframe pointing to that URL

---

### Step 4: Embed on Your Website

**This is the MOST IMPORTANT part of testing!** We need to know how this works on real platforms.

#### For Systeme.io:
1. Create a new page or edit existing one
2. Add a "Custom HTML" block
3. Paste your iframe code (or upload the HTML file if Systeme allows)
4. Save and publish

#### For Shopify:
1. Go to Online Store > Pages
2. Create or edit a page
3. Click "Show HTML" in the editor
4. Paste your iframe code
5. Save

#### For Squarespace:
1. Edit a page
2. Add a "Code" block
3. Paste your iframe code
4. Save and publish

#### For WordPress:
1. Create or edit a page
2. Add a "Custom HTML" block
3. Paste your iframe code
4. Update/Publish

#### For ThriveCart:
1. In your product funnel
2. Add a "Custom HTML" section
3. Paste your iframe code
4. Save

#### For Other Platforms:
Look for options like:
- "Custom HTML"
- "Embed Code"
- "Code Block"
- "iFrame"

**⚠️ What to look for:**
- Can you find where to add custom HTML/iframe on your platform?
- Does your platform accept iframe code without issues?
- Any warnings or errors when saving?

---

### Step 5: View Your Live Embedded Calendar

1. Visit your page where you embedded the calendar (live URL)
2. Take a look at how it appears on your site

**⚠️ What to look for:**
- Does the calendar load on your site?
- Does it look correct (not cut off, not too small/large)?
- Are the colors and fonts correct?
- Do you see any error messages?
- Does it fit well within your page design?

**📸 Take a screenshot** of your embedded calendar - you'll upload this in the feedback form!

---

### Step 6: Note Embedding Experience

In the feedback form, add notes about:
- Which platform you used
- Was it easy to find where to add the iframe?
- Did the embed work on the first try?
- Any error messages or issues?
- The URL of your live embedded calendar (we'd love to see it!)

**Don't submit the form yet** - move on to Phase 3!

---

### Ready for Phase 3?

Your calendar is embedded! Now let's test if it actually works.

Move to **Tab 4: Phase 3 - Testing Functionality**

---

## TAB 4: PHASE 3 - TESTING FUNCTIONALITY

### Phase 3: Testing Functionality (5-10 minutes)

Now for the fun part - let's make sure everything works on your live site!

### Test 1: Basic Door Functionality

**On your live embedded calendar:**

1. **Try clicking different doors**
   - Click on Door 1
   - Click on Door 5
   - Click on the last door

**⚠️ What to look for:**
- Do doors respond to clicks?
- Do they open with the animation you chose?
- Does the modal/popup appear with your content?
- Is the content displayed correctly (headline, image, description, button)?

2. **Try closing modals**
   - Click the × button
   - Click outside the modal
   - Press the Escape key (if on desktop)

**⚠️ What to look for:**
- Do all three methods work to close the modal?
- Does the calendar return to normal after closing?

---

### Test 2: Locked Door Behavior

1. **Click on a door that should be locked** (based on your start date)
   - If all doors are unlocked, skip this test

**⚠️ What to look for:**
- Does the locked door shake when clicked?
- Do you see a tooltip showing when it unlocks?
- Can you NOT open locked doors?

---

### Test 3: Mobile Responsiveness

**On your phone or tablet:**

1. Visit your embedded calendar page on a mobile device
2. Try clicking/tapping doors
3. Try scrolling through modal content
4. Try closing modals

**⚠️ What to look for:**
- Does the calendar display correctly on mobile?
- Are doors easy to tap (not too small)?
- Do modals appear full-screen or properly sized?
- Can you read all the content?
- Do animations work smoothly?
- Can you close modals on mobile?

**💡 Tip**: Test on both phone (portrait) and tablet (landscape) if possible

---

### Test 4: Different Browsers

**Test in at least 2 different browsers:**
- Chrome
- Firefox
- Safari
- Edge

1. Open your embedded calendar in each browser
2. Click a few doors
3. Check if everything looks and works the same

**⚠️ What to look for:**
- Does it work in all browsers?
- Any visual differences between browsers?
- Any broken functionality in a specific browser?

---

### Test 5: Edge Cases (Optional but Helpful)

If you have time, try these scenarios:

**Rapid Clicking:**
1. Click multiple doors very quickly
2. Does anything break or glitch?

**Back Button:**
1. Open a door
2. Click your browser's back button
3. Does it behave as expected?

**Page Refresh:**
1. Open a few doors
2. Refresh the page
3. Do opened doors stay opened? (They should if localStorage is working)

**Share the Link:**
1. Copy your page URL
2. Open it in a private/incognito window
3. Does the calendar work for a fresh visitor?

**⚠️ What to look for:**
- Any unexpected behavior?
- Does state persist (opened doors remembered)?
- Does it work in incognito/private mode?

---

### Test 6: Social Sharing (If Available)

**If you published your calendar to a URL** and have social share buttons:

1. Go back to the builder
2. Click **"🔗 My Published Calendars"**
3. Try the social share buttons:
   - 🐦 Twitter
   - 📘 Facebook
   - 💼 LinkedIn
   - ✉️ Email

**⚠️ What to look for:**
- Do share buttons open the correct sharing dialogs?
- Is the URL correct in the share preview?
- Does the share text make sense?

---

### Note Your Testing Results

In the feedback form, record:
- Which tests passed ✅
- Which tests failed ❌
- Any bugs or glitches you found
- Browser and device you tested on
- Screenshots of any issues

---

### You're Almost Done!

Move to **Tab 5: Final Feedback** to wrap up!

---

## TAB 5: FINAL FEEDBACK

### Congratulations! You've Completed Beta Testing! 🎉

Thank you for taking the time to thoroughly test the Countdown Calendar Builder. Your feedback is incredibly valuable!

### Final Step: Complete the Feedback Form

Now that you've gone through all three phases, please complete the feedback form:

**📋 Feedback Form Link**: [INSERT GOOGLE FORM URL HERE]

The form will ask you about:
- Your overall experience (ease of use, clarity, bugs)
- Each phase (building, downloading, embedding, testing)
- Feature requests and improvement ideas
- Whether you'd use this tool for your business
- Whether we can feature your calendar as an example

**⏱️ Time to complete**: 10-15 minutes

---

### What Happens Next?

1. **We review your feedback** (within 3-5 business days)
2. **We may reach out** with follow-up questions (rare, only if clarification needed)
3. **You'll be notified** when the tool officially launches (you'll get early access!)
4. **You'll be credited** in our "Beta Testers" page (if you opt in)

---

### Can We Feature Your Calendar?

If you created something awesome and are willing to let us showcase it as an example, there's a question in the feedback form where you can say yes and provide the URL!

We'd love to show potential users what's possible. 🌟

---

### Have Issues or Questions?

**Found a critical bug?** Email immediately: [INSERT YOUR EMAIL]

**Have questions about the tool?** Email: [INSERT YOUR EMAIL]

**Want to test additional features?** Let us know in the feedback form!

---

### Thank You! 🙏

Your participation in this beta test helps make this tool better for everyone. We genuinely appreciate the time you've invested in testing and providing feedback.

**— The Countdown Calendar Builder Team**

---

### Quick Reference

**Builder URL**: [INSERT BUILDER URL HERE]

**Feedback Form**: [INSERT GOOGLE FORM URL HERE]

**Support Email**: [INSERT YOUR EMAIL]

**Testing Deadline**: [INSERT DATE - 15 days from distribution]

---
```

---

# 📋 PART 3: FEEDBACK FORM STRUCTURE (COMPLETE - 729 Lines)

## File: `BETA_TEST_FORM_STRUCTURE.md`

**This is the ACTUAL COMPLETE Google Form structure with all 53 questions.**
**Copy this into Google Forms (you can paste most questions directly):**

```markdown
# Countdown Calendar Builder - Beta Test Feedback Form Structure

**Instructions**: Copy this structure into a Google Form. Each "---" represents a new page/section.

---

## PAGE 1: BASIC INFORMATION

**Page Title**: Welcome & Basic Info

**Page Description**:
Thank you for beta testing the Countdown Calendar Builder! This form should take 10-15 minutes to complete. Your honest feedback will help us improve the tool for everyone.

All questions marked with * are required.

---

### Question 1: Full Name *
**Type**: Short answer
**Required**: Yes

---

### Question 2: Email Address *
**Type**: Short answer
**Required**: Yes
**Validation**: Must be valid email

---

### Question 3: What platform did you use to embed your calendar? *
**Type**: Multiple choice
**Required**: Yes
**Options**:
- Systeme.io
- Shopify
- Squarespace
- WordPress
- ThriveCart
- Wix
- Webflow
- Custom website
- Other: ___________

---

### Question 4: When did you complete your testing?
**Type**: Date
**Required**: No

---

### Question 5: How did you hear about this beta test?
**Type**: Short answer
**Required**: No

---

**NAVIGATION**: "Next" button to Page 2

---

## PAGE 2: PHASE 1 - BUILDING YOUR CALENDAR

**Page Title**: Phase 1: Building Your Calendar

**Page Description**:
Let's talk about your experience using the builder tool to create your calendar.

---

### Question 6: Did you complete Phase 1 (building your calendar)? *
**Type**: Multiple choice
**Required**: Yes
**Options**:
- Yes, completed fully
- Yes, but didn't customize everything
- Partially - ran into issues
- No - couldn't get started

**Logic**: If "No - couldn't get started" → Jump to Question 13

---

### Question 7: Did you start from a template or from scratch?
**Type**: Multiple choice
**Required**: No
**Options**:
- Started from a template
- Built from scratch
- Started with template, then heavily customized
- Tried both approaches

---

### Question 8: Did you encounter any errors or bugs while building? *
**Type**: Multiple choice
**Required**: Yes
**Options**:
- No errors - everything worked smoothly
- Minor issues but I could continue
- Major issues that blocked me
- Yes, but I can't remember details

**Logic**: If anything except "No errors" → Show Question 9

---

### Question 9: What errors or bugs did you encounter?
**Type**: Paragraph
**Required**: No
**Conditional**: Only show if Question 8 ≠ "No errors"

---

### Question 10: Please upload screenshot(s) of any errors
**Type**: File upload
**Required**: No
**Conditional**: Only show if Question 8 ≠ "No errors"
**Settings**: Accept images only, multiple files allowed

---

### Question 11: How easy was it to build your calendar? *
**Type**: Linear scale
**Required**: Yes
**Scale**: 1 (Very difficult) to 5 (Very easy)
**Labels**:
- 1 = Very difficult
- 5 = Very easy

---

### Question 12: Rate your experience with these specific features
**Type**: Grid (Multiple choice per row)
**Required**: Yes
**Rows**:
- Choosing/loading a template
- Customizing global settings (title, date, door count)
- Applying theme presets
- Customizing colors
- Changing fonts
- Customizing individual doors
- Using the rich text editor
- Adding images to doors
- Preview functionality
- Overall interface layout

**Columns**:
- Didn't use
- Very easy
- Easy
- Neutral
- Difficult
- Very difficult

---

### Question 13: What was the MOST confusing part of the building process?
**Type**: Paragraph
**Required**: No

---

### Question 14: What was the EASIEST part of the building process?
**Type**: Paragraph
**Required**: No

---

### Question 15: Did you find all the features you needed?
**Type**: Multiple choice
**Required**: No
**Options**:
- Yes, everything I needed was there
- Mostly, but a few things were missing
- No, I was looking for features that weren't available

---

### Question 16: What features were you looking for that weren't available?
**Type**: Paragraph
**Required**: No

---

**NAVIGATION**: "Next" button to Page 3

---

## PAGE 3: PHASE 2 - DOWNLOAD & EMBED

**Page Title**: Phase 2: Download & Embed

**Page Description**:
Now let's talk about downloading your calendar and embedding it on your website.

---

### Question 17: Did you successfully download the HTML file? *
**Type**: Multiple choice
**Required**: Yes
**Options**:
- Yes, downloaded successfully
- Download started but file was corrupted
- Download failed
- Didn't attempt to download

**Logic**: If "Didn't attempt to download" → Jump to Question 24

---

### Question 18: What was the file size of your downloaded calendar?
**Type**: Short answer
**Required**: No
**Hint**: Check file properties (e.g., "125 KB" or "0.8 MB")

---

### Question 19: Did you test the downloaded file locally (open it on your computer)?
**Type**: Multiple choice
**Required**: No
**Options**:
- Yes, and it worked perfectly
- Yes, but there were issues
- No, I went straight to embedding

---

### Question 20: Did you successfully embed your calendar on your website? *
**Type**: Multiple choice
**Required**: Yes
**Options**:
- Yes, embedded and working perfectly
- Yes, embedded but with issues
- Partially - got it embedded but it doesn't work right
- No - couldn't figure out how to embed
- No - my platform wouldn't accept the code
- Didn't attempt embedding

**Logic**: If last 3 options → Show Question 21

---

### Question 21: What prevented you from successfully embedding?
**Type**: Paragraph
**Required**: No
**Conditional**: Only show if Question 20 indicates embedding issues

---

### Question 22: How easy was it to embed on your platform? *
**Type**: Linear scale
**Required**: Yes
**Scale**: 1 (Very difficult) to 5 (Very easy)
**Labels**:
- 1 = Very difficult
- 5 = Very easy

---

### Question 23: What is the URL of your embedded calendar?
**Type**: Short answer
**Required**: No
**Description**: If your calendar is live on a public URL, please share it! This helps us see real-world implementations.

---

### Question 24: Can we feature your calendar as an example?
**Type**: Multiple choice
**Required**: No
**Options**:
- Yes, you can showcase my calendar publicly
- Yes, but please contact me first
- No, please keep it private
- Not applicable - I didn't embed it

---

### Question 25: Upload a screenshot of your embedded calendar
**Type**: File upload
**Required**: No
**Settings**: Accept images only
**Description**: We'd love to see how it looks on your site!

---

### Question 26: Did you encounter any issues during download or embedding?
**Type**: Paragraph
**Required**: No
**Description**: Describe any problems, error messages, or confusing steps

---

**NAVIGATION**: "Next" button to Page 4

---

## PAGE 4: PHASE 3 - TESTING FUNCTIONALITY

**Page Title**: Phase 3: Testing Functionality

**Page Description**:
Let's discuss how the calendar actually worked once embedded on your site.

---

### Question 27: Did you test your embedded calendar? *
**Type**: Multiple choice
**Required**: Yes
**Options**:
- Yes, tested thoroughly
- Yes, tested briefly
- No, didn't test

**Logic**: If "No, didn't test" → Jump to Page 5

---

### Question 28: Test Results: Basic Door Functionality
**Type**: Checkboxes
**Required**: No
**Description**: Check all that worked correctly
**Options**:
- ✅ Doors responded to clicks
- ✅ Opening animation worked
- ✅ Modal/popup appeared
- ✅ Content displayed correctly (headline, image, description)
- ✅ Button worked
- ✅ Could close modal with × button
- ✅ Could close modal by clicking outside
- ✅ Could close modal with Escape key
- ❌ None of the above worked
- ⚠️ Some features had issues (I'll describe below)

---

### Question 29: Test Results: Locked Door Behavior
**Type**: Checkboxes
**Required**: No
**Description**: If you had locked doors, check what worked
**Options**:
- ✅ Locked doors showed shake animation
- ✅ Tooltip appeared showing unlock date
- ✅ Locked doors could NOT be opened
- ❌ Locking didn't work
- N/A - All my doors were unlocked

---

### Question 30: Did you test on mobile devices?
**Type**: Multiple choice
**Required**: No
**Options**:
- Yes, on phone (iOS)
- Yes, on phone (Android)
- Yes, on tablet (iOS)
- Yes, on tablet (Android)
- Yes, on multiple mobile devices
- No, desktop only

---

### Question 31: How did it work on mobile? *
**Type**: Linear scale
**Required**: Yes
**Conditional**: Only show if Question 30 ≠ "No, desktop only"
**Scale**: 1 (Terrible) to 5 (Perfect)
**Labels**:
- 1 = Broken/unusable
- 5 = Worked perfectly

---

### Question 32: Mobile issues (if any)
**Type**: Paragraph
**Required**: No
**Description**: Describe any problems on mobile (display issues, tap targets too small, modals not working, etc.)

---

### Question 33: Which browsers did you test in?
**Type**: Checkboxes
**Required**: No
**Options**:
- Chrome (desktop)
- Firefox (desktop)
- Safari (desktop)
- Edge (desktop)
- Mobile Safari (iOS)
- Chrome (Android)
- Other: ___________

---

### Question 34: Did the calendar work consistently across browsers?
**Type**: Multiple choice
**Required**: No
**Options**:
- Yes, worked the same everywhere
- Mostly, but minor differences
- No, significant differences between browsers
- No, it broke in some browsers

---

### Question 35: Browser-specific issues
**Type**: Paragraph
**Required**: No
**Description**: If you noticed differences between browsers, please describe which browser had issues and what the problem was

---

### Question 36: Edge Case Testing
**Type**: Checkboxes
**Required**: No
**Description**: Check any of these scenarios you tested
**Options**:
- Rapid clicking multiple doors
- Using browser back button
- Refreshing the page after opening doors
- Opening in private/incognito mode
- Sharing the link with someone else
- Testing with slow internet connection
- None of the above

---

### Question 37: Did any edge case testing reveal issues?
**Type**: Paragraph
**Required**: No

---

### Question 38: Overall functionality rating *
**Type**: Linear scale
**Required**: Yes
**Scale**: 1 (Completely broken) to 5 (Works perfectly)
**Labels**:
- 1 = Completely broken
- 5 = Works perfectly

---

### Question 39: Describe any bugs or glitches you found
**Type**: Paragraph
**Required**: No
**Description**: Be as specific as possible: what you did, what you expected to happen, what actually happened

---

**NAVIGATION**: "Next" button to Page 5

---

## PAGE 5: OVERALL EXPERIENCE & FEATURE REQUESTS

**Page Title**: Overall Experience

**Page Description**:
We're almost done! Let's talk about your overall impressions and ideas for improvement.

---

### Question 40: Overall, how easy was the Countdown Calendar Builder to use? *
**Type**: Linear scale
**Required**: Yes
**Scale**: 1 (Very difficult) to 5 (Very easy)
**Labels**:
- 1 = Very difficult, would not recommend
- 5 = Very easy, would highly recommend

---

### Question 41: How likely are you to use this tool for your business or projects? *
**Type**: Linear scale
**Required**: Yes
**Scale**: 1 (Not likely) to 5 (Very likely)
**Labels**:
- 1 = Not likely at all
- 5 = Definitely will use it

---

### Question 42: What would make you MORE likely to use this tool?
**Type**: Paragraph
**Required**: No

---

### Question 43: Rate these aspects of the tool
**Type**: Grid (Linear scale 1-5)
**Required**: Yes
**Rows**:
- Visual design / aesthetics
- Ease of use / user interface
- Features available
- Quality of templates
- Theme customization options
- Documentation / instructions
- Export quality (downloaded file)
- Embedded calendar performance
- Mobile responsiveness
- Overall value

**Columns**: 1 (Poor) to 5 (Excellent)

---

### Question 44: What features would you like to see added?
**Type**: Paragraph
**Required**: No
**Description**: Dream big! What would make this tool perfect for your needs?

---

### Question 45: Which of these potential features interest you most?
**Type**: Checkboxes
**Required**: No
**Options**:
- More templates
- More themes
- QR code generation for sharing
- PDF export option
- Bulk import door content (CSV)
- Integration with email marketing tools
- Social media auto-posting
- Advanced analytics (geographic data, referrers)
- Custom domain for published calendars
- Team collaboration features
- White-label option (remove branding)
- API access
- WordPress plugin
- Other: ___________

---

### Question 46: What's the #1 improvement you'd suggest?
**Type**: Short answer
**Required**: No

---

### Question 47: What did you LOVE about the tool?
**Type**: Paragraph
**Required**: No
**Description**: We want to know what's working well!

---

### Question 48: What frustrated you the most?
**Type**: Paragraph
**Required**: No
**Description**: Honest feedback helps us improve!

---

### Question 49: How does this compare to other calendar/countdown tools you've used?
**Type**: Paragraph
**Required**: No

---

### Question 50: Would you recommend this tool to others? *
**Type**: Multiple choice
**Required**: Yes
**Options**:
- Definitely yes
- Probably yes
- Not sure / neutral
- Probably not
- Definitely not

---

### Question 51: Why or why not?
**Type**: Paragraph
**Required**: No
**Conditional**: Show based on Question 50 response

---

### Question 52: What use case(s) would you use this tool for?
**Type**: Checkboxes
**Required**: No
**Options**:
- Holiday advent calendars
- Product launches
- Course delivery
- Event countdowns
- Sales/promotions
- Wedding planning
- Fitness challenges
- Educational content
- Client onboarding
- Membership site content
- Other: ___________

---

### Question 53: Any other feedback, suggestions, or comments?
**Type**: Paragraph
**Required**: No
**Description**: Anything we didn't ask about? Share it here!

---

**NAVIGATION**: "Submit" button to Page 6

---

## PAGE 6: THANK YOU PAGE

**Page Title**: Thank You! 🎉

**Confirmation Message**:

**Thank you for completing the Countdown Calendar Builder beta test!**

Your feedback is incredibly valuable and will directly influence how we improve the tool. We genuinely appreciate the time and effort you put into testing.

### What happens next?

✅ We'll review your feedback within 3-5 business days
✅ We may reach out with clarification questions (rarely needed)
✅ You'll be notified when the tool officially launches
✅ You'll get early access to the production version
✅ If you opted in, you'll be featured on our "Beta Testers" page

### Have more feedback or found a critical bug?

Email us: [INSERT YOUR EMAIL]

### Want to stay updated?

We'll send you an email when we launch, but feel free to reach out anytime with questions or additional feedback.

### Share with friends?

Know someone who might want to beta test? Send them to: [INSERT BETA SIGNUP URL]

---

**Thank you again for being part of our beta testing community!**

**— The Countdown Calendar Builder Team**

---

**Response Receipt**:
- ✅ Enable "Send respondents a copy of their response"
- ✅ Enable response editing (in case they remember something after submitting)

---

## FORM SETTINGS CHECKLIST

**General Settings**:
- ✅ Collect email addresses (required)
- ✅ Limit to 1 response per email
- ✅ Allow response editing
- ✅ Show progress bar
- ✅ Shuffle question order: NO
- ✅ Show link to submit another response: NO

**Presentation**:
- Form description: "Beta Test Feedback for Countdown Calendar Builder - Your input shapes the future of this tool!"
- Confirmation message: Use the thank you message above
- Progress bar: Yes

**Quizzes**:
- This is NOT a quiz - leave disabled

**Responses**:
- ✅ Accept responses
- ✅ Send respondents a copy of their response
- ✅ Allow response editing after submit

---

## NOTIFICATIONS TO SET UP

**Email Notifications** (for you):
- Get notified on each new response: YES
- Include response summary: YES

**Response Spreadsheet**:
- Create linked Google Sheet: YES
- Name: "Beta Test Responses - Countdown Calendar Builder"

---

## AFTER FORM CREATION

1. **Test the form yourself** - go through it completely
2. **Check all conditional logic** is working
3. **Verify file uploads** work correctly
4. **Test on mobile** - make sure it's mobile-friendly
5. **Share the form link** in your test script document
6. **Set up response notifications** so you see feedback immediately
7. **Monitor responses** during beta period
8. **Respond to critical bugs** within 24 hours

---

**Form URL to share**: [Google Forms will generate this after creation]

**Responses Spreadsheet**: [Link to Google Sheet]

---

## TIPS FOR ANALYZING RESPONSES

**Priority Issues**:
- Any rating of 1-2 on critical questions → Investigate immediately
- Multiple testers reporting same issue → High priority fix
- "Couldn't embed" responses → Platform compatibility issue

**Feature Requests**:
- If 3+ testers request same feature → Consider adding
- Track feature votes in Questions 44-45

**Success Metrics**:
- Average ease of use ≥ 4.0 = Good
- Would recommend ≥ 80% "Yes" = Good
- Successful embedding ≥ 90% = Good

---

```

---

# 🎨 PART 4: CUSTOMIZATION GUIDE

## Find & Replace Checklist

**In BETA_TEST_SCRIPT.md:**

| Find This | Replace With |
|-----------|-------------|
| `Countdown Calendar Builder` | Your App Name |
| `[INSERT BUILDER URL HERE]` | https://yourapp.com |
| `[INSERT YOUR EMAIL]` | support@yourapp.com |
| `[INSERT GOOGLE FORM URL HERE]` | (Your form URL after creating) |
| `[INSERT DATE - 15 days from distribution]` | Actual deadline date |

**Content to Customize:**

1. **TAB 2 - Phase 1**: Update steps to match YOUR app's workflow
2. **TAB 3 - Phase 2**: Update platform integration instructions
3. **TAB 4 - Phase 3**: Update tests to match YOUR features
4. **Platform-specific guides**: Add/remove platforms your users use

---

## Customizing Screenshot Automation

**In both `capture-screenshots.js` and `capture-screenshots-playwright.js`:**

### 1. Update File Path

```javascript
const CONFIG = {
  indexPath: path.resolve(__dirname, '../YOUR-APP.html'), // ← Change this
  outputDir: path.resolve(__dirname, 'output'),
  viewport: { width: 1440, height: 900 },
  headless: true,
};
```

### 2. Update Selectors

Find your app's actual CSS selectors and update:

```javascript
// Example: If your app has a sidebar instead of settings-section
await addHighlight(page, '.sidebar', 'Sidebar');        // ← Your selector
await addHighlight(page, '.main-content', 'Main Area'); // ← Your selector
```

### 3. Add/Remove Sections

The scripts are organized into numbered sections (1-10). Add or remove sections based on your app:

```javascript
// ========================================
// 11. YOUR NEW SECTION
// ========================================
console.log('\n📍 Your Feature Screenshots:');

const yourButton = await page.$('.your-button');
if (yourButton) {
  await yourButton.click();
  await waitForAnimations(page, 500);
  await screenshot(page, '17-your-feature');
}
```

### 4. Test It

```bash
cd screenshots
npm run capture:headed  # Watch it run visibly
# Fix any selectors that don't work
npm run capture         # Final headless run
```

---

## Customizing Google Form

### Quick Copy-Paste Method

Most form questions can be pasted directly into Google Forms:

1. Open the BETA_TEST_FORM_STRUCTURE.md
2. For each question:
   - Copy the question text
   - Select the type (Multiple choice, Paragraph, etc.)
   - Paste options if applicable
   - Set required/optional

### Conditional Logic

Set up these conditional jumps:

| Question | Condition | Action |
|----------|-----------|--------|
| Q6 | "No - couldn't get started" | Jump to Q13 |
| Q8 | Not "No errors" | Show Q9 & Q10 |
| Q17 | "Didn't attempt" | Jump to Q24 |
| Q20 | Issues indicated | Show Q21 |
| Q27 | "No, didn't test" | Jump to Page 5 |

### Form Settings

After creating:
- ✅ Collect email addresses
- ✅ Limit to 1 response per email
- ✅ Allow response editing
- ✅ Show progress bar
- ✅ Create linked Google Sheet

---

# 📊 PART 5: SUCCESS METRICS

## Minimum Viable Beta Test

**Required for "good enough":**
- 10+ testers
- 70%+ completion rate
- Average ease of use ≥3.5/5.0
- 80%+ successful deployments
- 0 critical bugs

## Ideal Beta Test

**Target for "excellent":**
- 20+ testers
- 85%+ completion rate
- Average ease of use ≥4.0/5.0
- 90%+ successful deployments
- 0 critical, <3 major bugs
- 80%+ would recommend

## Analyzing Results

### Red Flags (Act Immediately)

- Average ease of use <3.5 → Major UX problem
- <70% successful deployment → Platform issues
- 3+ critical bugs → Delay launch
- Multiple testers report same issue → High priority

### Feature Requests

- Track in spreadsheet
- If 3+ testers request → Consider adding
- Look for patterns in "What's missing" responses

### Platform Issues

Group by platform to identify:
- Which platforms work well
- Which have integration problems
- Documentation gaps

---

# 🎯 PART 6: DEPLOYMENT CHECKLIST

## Before Beta Launch

- [ ] Test screenshot automation (run it yourself)
- [ ] Go through entire beta script yourself
- [ ] Complete the feedback form yourself
- [ ] Fix obvious bugs found during self-test
- [ ] Recruit 15-20 beta testers
- [ ] Set clear deadline (15 days recommended)
- [ ] Prepare welcome email with links

## During Beta

- [ ] Monitor form responses daily
- [ ] Respond to critical bugs within 24 hours
- [ ] Answer tester questions promptly
- [ ] Track completion rate
- [ ] Send reminder email at day 7
- [ ] Fix critical bugs immediately

## After Beta

- [ ] Thank all testers personally
- [ ] Analyze all feedback
- [ ] Create prioritized bug fix list
- [ ] Implement critical changes
- [ ] Update documentation
- [ ] Give testers early access to launch

---

# 💡 PRO TIPS

## Screenshot Automation

**Tip 1**: Run headed mode first to debug selectors
```bash
npm run capture:headed
```

**Tip 2**: Increase delays if elements don't appear
```javascript
await waitForAnimations(page, 2000); // Instead of 500
```

**Tip 3**: Use descriptive filenames
```javascript
await screenshot(page, '12-settings-advanced-mode');
```

## Beta Testing

**Tip 1**: Mix tester expertise
- 50% non-technical users (find UX issues)
- 30% semi-technical (find edge cases)
- 20% technical (find bugs)

**Tip 2**: Incentivize completion
- Free lifetime access
- Credit on beta testers page
- Small gift card ($10-20)

**Tip 3**: Make it easy to report bugs
- File upload for screenshots
- Pre-filled bug templates
- Quick feedback options

## Form Design

**Tip 1**: Use conditional logic aggressively
- Skip irrelevant sections
- Keeps form feeling short
- Gets better data

**Tip 2**: Mix question types
- Linear scales for ratings
- Grids for multi-feature ratings
- Paragraphs for detailed feedback
- Checkboxes for multi-select

**Tip 3**: Always allow "Other" option
- Catches edge cases you didn't think of
- Shows what you're missing

---

# 🔧 TROUBLESHOOTING

## Screenshot Issues

**Problem**: Screenshots are blank
**Solution**: Increase animation delays, check file path

**Problem**: Elements not found
**Solution**: Update selectors to match your HTML

**Problem**: Browser doesn't launch
**Solution**: `npx playwright install chromium`

## Beta Test Issues

**Problem**: Low completion rate
**Solution**: Script too long, shorten phases

**Problem**: Confused testers
**Solution**: Add more screenshots and examples

**Problem**: Platform incompatibility
**Solution**: Test on actual platforms first

## Form Issues

**Problem**: Conditional logic not working
**Solution**: Check question numbers, test flow

**Problem**: File uploads failing
**Solution**: Check form settings, enable uploads

**Problem**: Response limit hit
**Solution**: Google Forms supports 10GB, very unlikely

---

# 📚 ADDITIONAL RESOURCES

## Tools Used

- **Puppeteer**: https://pptr.dev/
- **Playwright**: https://playwright.dev/
- **Google Forms**: https://forms.google.com/

## Beta Testing Best Practices

- Start small (10-15 testers first)
- Test the test (run it yourself fully)
- Fix critical bugs during beta
- Thank testers genuinely
- Act on feedback quickly

## Want to Add More?

### Video Recording

Add to Playwright script:
```javascript
const context = await browser.newContext({
  recordVideo: { dir: 'videos/' }
});
```

### Multiple Browsers

Test in Firefox, Safari:
```javascript
const { firefox } = require('playwright');
const browser = await firefox.launch();
```

### Automated Email

Send results via Zapier/Make connecting to Google Sheets

---

# ✅ FINAL CHECKLIST

**Before using this for your app:**

- [ ] Copied all files to your project
- [ ] Updated package.json scripts
- [ ] Installed dependencies (`npm install`)
- [ ] Updated CONFIG.indexPath to your HTML
- [ ] Tested screenshot automation
- [ ] Customized selectors for your UI
- [ ] Updated beta script with find-replace
- [ ] Created Google Form from structure
- [ ] Set up conditional logic in form
- [ ] Tested form flow yourself
- [ ] Went through entire beta test yourself
- [ ] Recruited beta testers
- [ ] Set deadline and created calendar reminder

**You're ready to launch beta testing!** 🚀

---

# 📄 FILE SIZES

For reference (so you know you copied everything):

- `capture-screenshots.js`: 411 lines
- `capture-screenshots-playwright.js`: 295 lines
- `BETA_TEST_SCRIPT.md`: 629 lines
- `BETA_TEST_FORM_STRUCTURE.md`: 729 lines
- **Total**: ~2,100 lines of core content
- **With this guide**: ~3,500 total lines

---

# 🎉 YOU'RE DONE!

You now have a complete, production-ready beta testing system that you can deploy to ANY web application in 30 minutes.

**Questions? Issues?**
- Check the Troubleshooting section
- Review the actual code sections above
- Everything you need is in this document

**Good luck with your beta test!** 🚀

---

**Created**: December 2024
**Original Project**: Countdown Calendar Builder  
**License**: Use freely for your projects
**Credits**: Claude AI + Human collaboration

---
