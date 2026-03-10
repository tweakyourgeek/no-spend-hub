# Tweak Your Geek Design System

> Shareable design tokens, patterns, and guidelines for consistent branding across all repositories.

---

## Quick Reference

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#3B3B58` | Headings, body text, primary actions |
| Accent | `#B375A0` | Buttons, links, borders, highlights |
| Secondary | `#A59880` | Subtle backgrounds, secondary accents |
| Background | `#F8F1F2` | Page background |
| Sage | `#7A9B7A` | Success states, positive messaging |
| Heading Font | Avenir, Inter, system-ui | Titles, h1-h6 |
| Body Font | Open Sans, system-ui | Paragraphs, UI text |
| Accent Font | Caveat, cursive | Decorative, emphasis |

---

## 1. Color Palette

### Primary Colors

```css
:root {
  /* Core Brand Colors */
  --color-primary: #3B3B58;        /* Navy-Purple - main brand color */
  --color-accent: #B375A0;         /* Mauve/Dusty Rose - buttons, links */
  --color-secondary: #A59880;      /* Tan/Taupe - secondary accents */
  --color-background: #F8F1F2;     /* Off-White - page background */
  --color-sage: #7A9B7A;           /* Sage Green - success, positivity */
  --color-sage-light: #E8F0E8;     /* Light Sage - subtle backgrounds */

  /* Text Colors */
  --color-text-primary: #3B3B58;   /* Main text (same as primary) */
  --color-text-light: #5D5D7A;     /* Secondary/dimmed text */
  --color-text-inverse: #FFFFFF;   /* Text on dark backgrounds */
}
```

### Dark Mode Colors

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1a1a2e;   /* Deep navy */
    --color-text-primary: #E8E5F2; /* Light lavender */
    --color-accent: #D4A5C5;       /* Light mauve */
    --color-sage: #A8C9A8;         /* Light sage */
  }
}
```

### Color Usage Guidelines

| Color | Use For | Avoid |
|-------|---------|-------|
| Primary `#3B3B58` | Headings, body text, primary buttons | Small decorative elements |
| Accent `#B375A0` | CTAs, links, borders, icons | Body text (contrast ratio 3.8:1) |
| Secondary `#A59880` | Dividers, subtle backgrounds | Primary actions |
| Sage `#7A9B7A` | Success messages, completion states | Error states |
| Background `#F8F1F2` | Page/section backgrounds | Text color |

### Accessibility Contrast Ratios

| Combination | Ratio | WCAG Level |
|-------------|-------|------------|
| Primary on Background | 10.2:1 | AAA |
| Accent on Background | 3.8:1 | AA (large text only, 18pt+) |
| Text Light on Background | 6.1:1 | AA |
| Sage on Light Sage | 4.6:1 | AA |
| All dark mode combinations | 7:1+ | AAA |

---

## 2. Typography

### Font Stack

```css
:root {
  --font-heading: 'Avenir', 'Inter', system-ui, sans-serif;
  --font-body: 'Open Sans', system-ui, sans-serif;
  --font-accent: 'Caveat', cursive;
}
```

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

```css
:root {
  --text-xs: 0.75rem;    /* 12px - fine print */
  --text-sm: 0.875rem;   /* 14px - captions, metadata */
  --text-base: 1rem;     /* 16px - body text */
  --text-lg: 1.125rem;   /* 18px - emphasized body */
  --text-xl: 1.25rem;    /* 20px - subheadings */
  --text-2xl: 1.5rem;    /* 24px - section titles */
  --text-3xl: 2rem;      /* 32px - page headings */
  --text-4xl: 2.5rem;    /* 40px - hero headings */
  --text-5xl: 3rem;      /* 48px - display text */
}
```

### Font Weights

```css
:root {
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}
```

### Line Heights

```css
:root {
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

---

## 3. Spacing

### Spacing Scale

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

### Semantic Spacing

```css
:root {
  --spacing-xs: 0.5rem;   /* 8px - tight spacing */
  --spacing-sm: 1rem;     /* 16px - compact spacing */
  --spacing-md: 1.5rem;   /* 24px - default spacing */
  --spacing-lg: 2.5rem;   /* 40px - section spacing */
  --spacing-xl: 4rem;     /* 64px - major sections */
}
```

---

## 4. Border Radius

```css
:root {
  --radius-sm: 0.5rem;    /* 8px - subtle rounding */
  --radius-md: 0.75rem;   /* 12px - buttons, inputs */
  --radius-lg: 1rem;      /* 16px - cards */
  --radius-xl: 1.5rem;    /* 24px - large cards */
  --radius-2xl: 2rem;     /* 32px - prominent elements */
  --radius-full: 9999px;  /* Pills, avatars */
}
```

**Philosophy**: Soft, modern corners (not sharp 0px edges). Use 12-32px for most elements.

---

## 5. Shadows

### Shadow Scale

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(59, 59, 88, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(59, 59, 88, 0.08),
               0 2px 4px -2px rgba(59, 59, 88, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(59, 59, 88, 0.08),
               0 4px 6px -4px rgba(59, 59, 88, 0.06);
  --shadow-xl: 0 20px 25px -5px rgba(59, 59, 88, 0.08),
               0 8px 10px -6px rgba(59, 59, 88, 0.06);
  --shadow-glass: 0 8px 32px 0 rgba(59, 59, 88, 0.08);
}
```

---

## 6. Visual Effects

### Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: var(--shadow-glass);
}
```

### Gradients

```css
:root {
  --gradient-primary: linear-gradient(135deg, #3B3B58 0%, #4a4a6a 100%);
  --gradient-accent: linear-gradient(135deg, #B375A0 0%, #c48bb0 100%);
  --gradient-sage: linear-gradient(135deg, #7A9B7A 0%, #8aab8a 100%);

  /* Background mesh texture */
  --gradient-mesh:
    radial-gradient(at 40% 20%, rgba(179, 117, 160, 0.1) 0px, transparent 50%),
    radial-gradient(at 80% 0%, rgba(122, 155, 122, 0.1) 0px, transparent 50%),
    radial-gradient(at 0% 50%, rgba(165, 152, 128, 0.08) 0px, transparent 50%);
}
```

---

## 7. Transitions & Animation

```css
:root {
  /* Timing Functions */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Durations */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;

  /* Presets */
  --transition-fast: 150ms var(--ease-default);
  --transition-normal: 200ms var(--ease-default);
  --transition-smooth: 300ms var(--ease-default);
  --transition-bounce: 500ms var(--ease-bounce);
}
```

---

## 8. Responsive Breakpoints

```css
/* Mobile-first breakpoints */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Media Query Usage

```css
/* Mobile-first approach */
.element { /* Mobile styles */ }

@media (min-width: 768px) {
  .element { /* Tablet+ styles */ }
}

@media (min-width: 1024px) {
  .element { /* Desktop+ styles */ }
}
```

---

## 9. Component Patterns

### Buttons

```css
.btn {
  font-family: var(--font-body);
  font-weight: var(--font-semibold);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  transition: var(--transition-normal);
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

.btn-accent {
  background: var(--color-accent);
  color: var(--color-text-inverse);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--color-accent);
  color: var(--color-accent);
}
```

### Cards

```css
.card {
  background: var(--color-background);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-md);
}

.card-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-xl);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-glass);
}
```

### Form Inputs

```css
.input {
  font-family: var(--font-body);
  font-size: var(--text-base);
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--color-secondary);
  border-radius: var(--radius-md);
  background: white;
  transition: var(--transition-fast);
}

.input:focus {
  border-color: var(--color-accent);
  outline: none;
  box-shadow: 0 0 0 3px rgba(179, 117, 160, 0.2);
}
```

---

## 10. Brand Voice & Tone

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Non-judgmental** | "You can't do this wrong" - shame-free approach |
| **Pattern-focused** | Data-gathering over restriction |
| **Collaborative** | Teaching WITH, not AT |
| **Anti-perfectionist** | Participation over perfection |

### Key Phrases

- "Spending during the challenge doesn't mean failure—it means data"
- "A slip is a data point, not a verdict"
- "This is an experiment, not a contract"
- "You are building guardrails, not a cage"

### Tone Guidelines

| Context | Tone |
|---------|------|
| Instructions | Warm, clear, encouraging |
| Errors | Compassionate, solution-focused |
| Success | Celebratory but not over-the-top |
| Difficult topics | Honest, supportive, non-preachy |

---

## 11. Logo & Brand Assets

### Logo Files

| Asset | File Path | Size | Usage |
|-------|-----------|------|-------|
| **Primary Logo** | [`/assets/images/00 Tweak Your Geek Logo New.png`](assets/images/00%20Tweak%20Your%20Geek%20Logo%20New.png) | 1.3 MB | Marketing, hero sections |
| **Web Logo** | [`/assets/images/tyg-logo.png`](assets/images/tyg-logo.png) | 232 KB | Headers, smaller displays |
| **Favicon** | [`/app/favicon.svg`](app/favicon.svg) | SVG | Browser tab icon |

### Favicon Code

```svg
<!-- TYG Logo - Navy-purple background with white text and mauve dot -->
<svg viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#3B3B58"/>
  <text x="16" y="21" font-family="Avenir, Inter, sans-serif"
        font-size="12" font-weight="700" fill="white"
        text-anchor="middle">TYG</text>
  <circle cx="26" cy="8" r="3" fill="#B375A0"/>
</svg>
```

### Logo Colors

- Background: `#3B3B58` (Navy-Purple)
- Text: `#FFFFFF` (White)
- Accent dot: `#B375A0` (Mauve)

### Logo Usage Guidelines

- Maintain clear space around the logo (minimum 1x the height of "TYG")
- Never stretch, rotate, or alter logo colors
- Use the PNG versions on light backgrounds
- Minimum display size: 32px height for favicon, 120px for web logo

---

## 12. Complete CSS Variables Template

Copy this into your project's root CSS file:

```css
:root {
  /* Colors */
  --color-primary: #3B3B58;
  --color-accent: #B375A0;
  --color-secondary: #A59880;
  --color-background: #F8F1F2;
  --color-sage: #7A9B7A;
  --color-sage-light: #E8F0E8;
  --color-text-primary: #3B3B58;
  --color-text-light: #5D5D7A;
  --color-text-inverse: #FFFFFF;

  /* Typography */
  --font-heading: 'Avenir', 'Inter', system-ui, sans-serif;
  --font-body: 'Open Sans', system-ui, sans-serif;
  --font-accent: 'Caveat', cursive;

  /* Type Scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
  --text-4xl: 2.5rem;
  --text-5xl: 3rem;

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Border Radius */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-2xl: 2rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(59, 59, 88, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(59, 59, 88, 0.08), 0 2px 4px -2px rgba(59, 59, 88, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(59, 59, 88, 0.08), 0 4px 6px -4px rgba(59, 59, 88, 0.06);
  --shadow-xl: 0 20px 25px -5px rgba(59, 59, 88, 0.08), 0 8px 10px -6px rgba(59, 59, 88, 0.06);

  /* Transitions */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fast: 150ms var(--ease-default);
  --transition-normal: 200ms var(--ease-default);
  --transition-smooth: 300ms var(--ease-default);

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #3B3B58 0%, #4a4a6a 100%);
  --gradient-accent: linear-gradient(135deg, #B375A0 0%, #c48bb0 100%);
  --gradient-sage: linear-gradient(135deg, #7A9B7A 0%, #8aab8a 100%);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1a1a2e;
    --color-text-primary: #E8E5F2;
    --color-accent: #D4A5C5;
    --color-sage: #A8C9A8;
  }
}
```

---

## 13. Tailwind CSS Config (Optional)

If using Tailwind, add to `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B3B58',
        accent: '#B375A0',
        secondary: '#A59880',
        background: '#F8F1F2',
        sage: {
          DEFAULT: '#7A9B7A',
          light: '#E8F0E8',
        },
        text: {
          primary: '#3B3B58',
          light: '#5D5D7A',
        },
      },
      fontFamily: {
        heading: ['Avenir', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'system-ui', 'sans-serif'],
        accent: ['Caveat', 'cursive'],
      },
      borderRadius: {
        'sm': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
      },
    },
  },
}
```

---

## 14. Design Tokens JSON

For tools, Figma plugins, or build systems:

```json
{
  "color": {
    "primary": { "value": "#3B3B58" },
    "accent": { "value": "#B375A0" },
    "secondary": { "value": "#A59880" },
    "background": { "value": "#F8F1F2" },
    "sage": { "value": "#7A9B7A" },
    "sage-light": { "value": "#E8F0E8" },
    "text-primary": { "value": "#3B3B58" },
    "text-light": { "value": "#5D5D7A" }
  },
  "font": {
    "heading": { "value": "Avenir, Inter, system-ui, sans-serif" },
    "body": { "value": "Open Sans, system-ui, sans-serif" },
    "accent": { "value": "Caveat, cursive" }
  },
  "radius": {
    "sm": { "value": "0.5rem" },
    "md": { "value": "0.75rem" },
    "lg": { "value": "1rem" },
    "xl": { "value": "1.5rem" }
  }
}
```

---

## Usage

1. **Copy this file** to each repository as `DESIGN_SYSTEM.md`
2. **Copy the CSS variables** (Section 12) to your project's base CSS
3. **Reference brand voice** (Section 10) for copy and messaging
4. **Use component patterns** (Section 9) as starting points

---

*Last updated: January 2025*
*Brand: Tweak Your Geek*
