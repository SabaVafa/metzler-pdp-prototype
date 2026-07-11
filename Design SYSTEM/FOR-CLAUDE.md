# Metzler Design System — Claude Page Brief

Paste this file into Claude when asking it to build any Metzler page, section, or component.
Follow every rule here exactly. Do not invent values, do not skip sections, do not use custom fonts or external libraries.

> **Companion file:** ready-made page sections (heroes, feature grids, sliders, FAQ, spec layouts …) live in **`SECTIONS.md`** — always check there first before designing a new section from scratch. This file covers tokens, primitives (buttons, forms, cards), header/footer, and page scaffolding.

---

## 1 · Brand & Language

- **Company:** Metzler GmbH — outdoor hardware (intercoms, mailboxes, doorbells, house numbers)
- **Language:** German (DE) everywhere — all copy, labels, placeholders, CTAs
- **Font:** system stack, no import needed
  - macOS / Linux → `"Helvetica Neue", Helvetica, Arial, sans-serif`
  - Windows → `Arial, "Helvetica Neue", Helvetica, sans-serif`
  - Use one declaration: `font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;`
- **Base:** 16px = 1rem — all measurements in rem, never px

---

## 2 · Design Tokens

**Preferred:** link the canonical stylesheet — `<link rel="stylesheet" href="metzler-tokens.css">` — then use `var(--color-teal)` etc. The block below is an inline fallback with the **same names and values** as that file; never define competing short names like `--teal` or `--g-800`.

```css
:root {
  --font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  /* ── TEAL — primary brand ── */
  --color-teal-50:    #F2F6F6;   /* icon badge backgrounds */
  --color-teal-75:    #E3F2F0;   /* light tint hover fills */
  --color-teal-100:   #E6EEEE;   /* selected backgrounds */
  --color-teal:       #015253;   /* CTAs, links, active borders, focus rings */
  --color-teal-600:   #014A4B;   /* hover state */
  --color-teal-700:   #01292A;   /* footer background, pressed/active states, dark gradient stops */
  --color-teal-900:   #001D1D;   /* darkest sections, CTA bands (.section--dark) */

  /* ── BRAND ── */
  --color-metzler-rot:        #D42924;   /* Metzler Rot — logo M-square, sale badges ONLY */
  --color-digital-black:      #1A171B;   /* Digital Schwarz — headlines, wordmark */

  /* ── STATUS ── */
  --color-green:      #009951;   /* success, availability dot */
  --color-red-50:     #FFF0EF;   /* error background */
  --color-red:        #D42924;   /* error borders, text */
  --color-red-600:    #B52320;   /* error hover */
  --color-red-900:    #4D0E0D;   /* readable text on red-50 surfaces */

  /* ── ACCENT ── */
  --color-mint:       #5CDBD3;   /* links / icons on dark/teal backgrounds */
  --color-star:       #FFC041;   /* rating stars only */

  /* ── SURFACES ── */
  --color-white:      #FFFFFF;   /* card backgrounds, input backgrounds */
  --color-black:      #000000;   /* reserved — never for text or section backgrounds */
  --color-paper:      #F5F6FA;   /* page background, secondary surfaces */
  --color-graphite-100:      #F0F0F0;   /* row separators, skeleton fills */
  --color-graphite-200:      #E6E6E8;   /* hairline dividers (1px lines) */
  --color-graphite-300:      #DADADA;   /* default borders on inputs, cards */
  --color-graphite-400:      #BFBFC2;   /* focused borders, ghost-button hover border */
  --color-graphite-450:      #CCCCCC;   /* soft borders, dividers, skeleton lines */

  /* ── TEXT ── */
  --color-graphite-500:      #A1A1A1;   /* placeholder, disabled, metadata */
  --color-graphite-600:      #7A7A82;   /* captions, secondary labels */
  --color-graphite-700:      #54545C;   /* secondary body text */
  --color-graphite-800:      #2E2E36;   /* primary body text */
  --color-graphite-850:      #333333;   /* icon fills, dark UI labels, editorial answer text */
  --color-graphite-900:      #1A1A1F;   /* heading text (alternative to --color-digital-black) */

  /* ── BORDER RADIUS ── */
  --radius-sm:   0.125rem;   /*  2px — tags, micro badges */
  --radius:      0.25rem;    /*  4px — buttons, inputs, chips */
  --radius-lg:   0.5rem;     /*  8px — cards, dropdowns, modals */
  --radius-xl:   0.75rem;    /* 12px — large panels */
  --radius-pill: 624.94rem;  /* fully rounded — pill badges */

  /* ── SHADOWS ── */
  --shadow-card:  0 0.125rem 0.5rem rgba(0,0,0,0.08);
  --shadow-hover: 0 0.25rem 1.25rem rgba(0,0,0,0.10);
  --shadow-modal: 0 1.25rem 3.75rem rgba(0,0,0,0.2), 0 0.25rem 1rem rgba(0,0,0,0.1);

  /* ── GRADIENTS ── */
  --gradient-brand:  linear-gradient(90deg, #01292A 0%, #011D1E 50%, #000000 100%);
  --gradient-accent: linear-gradient(135deg, #5CDBD3 0%, #015253 100%);
}
```

---

## 3 · Typography — Rules and CSS

**Font weight vocabulary:** 400 = regular, 500 = medium, 700 = bold, 800 = extrabold

All text uses `font-family: var(--font-family)` — never set a custom font-family.
Letter-spacing is negative on large headings, zero on body.

**Forbidden font sizes** — never use these: `10px, 15px, 17px, 19px, 22px, 28px, 32px, 36px` or any px value not matching an exact class below. Use only the defined scale.

```css
/* ── HEADINGS ── */
h1, .h1 {
  font-size: 1.875rem;        /* 30px */
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--color-digital-black);
  font-family: var(--font-family);
  margin: 0 0 1rem;
}
h2, .h2 {
  font-size: 1.5rem;          /* 24px */
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.015em;
  color: var(--color-digital-black);
  font-family: var(--font-family);
  margin: 0 0 0.875rem;
}
h3, .h3 {
  font-size: 1.25rem;         /* 20px */
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--color-digital-black);
  font-family: var(--font-family);
  margin: 0 0 0.75rem;
}
h4, .h4 {
  font-size: 1.125rem;        /* 18px */
  font-weight: 700;
  line-height: 1.375;
  letter-spacing: -0.005em;
  color: var(--color-digital-black);
  font-family: var(--font-family);
  margin: 0 0 0.625rem;
}

/* ── BODY ── */
p, .body {
  font-size: 1rem;            /* 16px — ALWAYS 1rem, never 17px or 15px */
  font-weight: 400;
  line-height: 1.55;
  color: var(--color-graphite-800);        /* ALWAYS --color-graphite-800 for body; --color-graphite-700 is secondary only */
  font-family: var(--font-family);
  margin: 0 0 1rem;
}
.body-lg {
  font-size: 1.125rem;        /* 18px — lead paragraphs, intros */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-graphite-800);
  font-family: var(--font-family);
}
.body-lg--medium { font-weight: 500; }
.body-lg--bold   { font-weight: 700; line-height: 1.375; }
.body-sm {
  font-size: 0.875rem;        /* 14px */
  line-height: 1.5;
  color: var(--color-graphite-700);        /* secondary / supporting text */
  font-family: var(--font-family);
}
.caption {
  font-size: 0.75rem;         /* 12px */
  line-height: 1.4;
  color: var(--color-graphite-600);        /* captions, metadata, timestamps */
  font-family: var(--font-family);
}

/* ── LABELS / OVERLINES ── */
.overline {
  font-size: 0.75rem;         /* 12px */
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-graphite-600);        /* ALWAYS --color-graphite-600 on white/paper; ALWAYS --color-mint on dark/teal-900 */
  font-family: var(--font-family);
}
/* On dark sections only: */
.section--dark .overline { color: var(--color-mint); }
.label {
  font-size: 0.8125rem;       /* 13px */
  font-weight: 600;
  color: var(--color-graphite-800);
  font-family: var(--font-family);
}

/* ── DISPLAY (hero headlines only) ── */
.display-1 { font-size: clamp(3rem, 9vw, 5rem);   font-weight: 700; line-height: 0.85; letter-spacing: -0.04em; } /* max 80px / min 48px */
.display-2 { font-size: clamp(3rem, 7vw, 3.5rem); font-weight: 700; line-height: 0.92; letter-spacing: -0.04em; } /* max 56px / min 48px */
.display-3 { font-size: 3rem;                      font-weight: 700; line-height: 1.0;  letter-spacing: -0.03em; } /* 48px */
.display-4 { font-size: 2.875rem;                  font-weight: 700; line-height: 1.1;  letter-spacing: -0.02em; } /* 46px */
```

---

## 4 · Container & Layout

**Every page must use one and only one container definition:**

```css
.container {
  max-width: 100rem;      /* 1600px — never use any other value */
  margin: 0 auto;
  padding: 0 4rem;        /* 64px sides on desktop */
}
@media (max-width: 48rem) {           /* 768px */
  .container { padding: 0 1.5rem; }  /* 24px sides on mobile */
}
```

**Rules:**
- Every section (header, hero, content, footer) gets a `<div class="container">` inside it
- Outer `<section>` / `<header>` / `<footer>` elements have NO horizontal padding of their own
- Full-width backgrounds are on the outer element; text content is always inside `.container`
- All content left-edges align with the logo left-edge — achieved automatically by `.container`

---

## 5 · Breakpoints

| Name | Value | Purpose |
|------|-------|---------|
| sm   | 30rem (480px)   | small phones |
| md   | 48rem (768px)   | **main switch** — header, footer, layout all change here |
| lg   | 64rem (1024px)  | tablet landscape |
| xl   | 80rem (1280px)  | desktop |
| 2xl  | 90rem (1440px)  | wide desktop |
| max  | 100rem (1600px) | max container width |

**Mobile-first always:** write base styles for mobile, override for desktop with `@media (min-width: 48rem)`.

---

## 6 · Page Structure — HTML Template

Every page must follow this exact structure:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seitentitel — Metzler</title>
  <!-- PFLICHT: Metzler-Favicon auf JEDER Seite (rotes M-Quadrat) -->
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <style>
    /* paste design tokens here */
    /* paste component CSS here */
  </style>
</head>
<body>

  <!-- HEADER — full width, no padding, sticky on scroll -->
  <header class="site-header" id="site-header">
    <div class="header-inner container">
      <!-- logo + nav + search -->
    </div>
  </header>

  <main>

    <!-- BREADCRUMBS — left-aligned, below header -->
    <section class="breadcrumb-bar">
      <div class="container">
        <nav class="breadcrumb"><!-- breadcrumb items --></nav>
      </div>
    </section>

    <!-- HERO / PAGE INTRO -->
    <section class="hero-section">
      <div class="container">
        <!-- heading, sub, CTA -->
      </div>
    </section>

    <!-- CONTENT SECTIONS — repeat as needed -->
    <section class="content-section">
      <div class="container">
        <!-- section content -->
      </div>
    </section>

  </main>

  <!-- FOOTER — full width, no padding -->
  <footer class="site-footer">
    <div class="container">
      <!-- footer columns, legal row -->
    </div>
  </footer>

</body>
</html>
```

---

## 7 · Header

> ⚠️ **The block below is a SIMPLIFIED single-row header.** The canonical production header is the full multi-row component in **`header/preview.html`**: green trust-bar (`.hdr-row1`) + logo/search/icons (`.hdr-row2`) + category nav (`.nav` with `.nav-cat`) + sticky compact bar (`.hdr-compact`) + mobile bar (`.hdr-mobile`) + side drawer (`.side-menu`), `position: fixed` with `body { padding-top: 158px }` (78px mobile). **For real pages, copy `header/preview.html` verbatim** — use the simplified template below only for a quick mockup.

### Desktop (≥ 768px) — 4rem (64px) tall

```html
<header class="site-header" id="site-header">
  <div class="container" style="height:4rem; display:flex; align-items:center; gap:1.25rem;">

    <!-- Logo -->
    <a href="/" style="display:flex; align-items:center; gap:0.625rem; text-decoration:none; flex-shrink:0;">
      <svg width="32" height="32" viewBox="0 0 184.3 184.3">
        <rect width="184.3" height="184.3" rx="5.75" fill="#D42924"/>
        <path fill="#fff" d="M70.19,34.81l19.04,32.98-9.58,16.57-28.59-49.55h19.13ZM70.28,108.58h0l-23.45-40.64v85.89h-16.57V34.81h16.57l33.02,57.21L123.92,15.65h19.13l-63.22,109.52-9.58-16.57.02-.02ZM153.14,153.83h-16.57v-85.87l-33,57.14h-19.13l52.11-90.28h16.57v119.02l.02-.02Z"/>
      </svg>
      <span style="font-size:1.0625rem; font-weight:800; letter-spacing:0.14em; color:#1A171B; font-family:var(--font-family);">METZLER</span>
    </a>

    <!-- Alle Kategorien button -->
    <button style="background:var(--color-teal); color:#fff; border:none; border-radius:var(--radius);
                   height:2.5rem; padding:0 1.125rem; font-size:1rem; font-weight:500;
                   font-family:var(--font-family); cursor:pointer; display:flex; align-items:center; gap:0.5rem; flex-shrink:0;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
      Alle Kategorien
    </button>

    <!-- Search bar -->
    <div style="flex:1; height:2.5rem; background:var(--color-paper); border:0.0625rem solid var(--color-graphite-300);
                border-radius:var(--radius); display:flex; align-items:center; padding:0 0.875rem; gap:0.625rem;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A1A1A1" stroke-width="2">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input type="search" placeholder="Suchen — Türklingel, Briefkasten, Hausnummer …"
             style="flex:1; border:none; background:none; font-size:0.9375rem; font-family:var(--font-family);
                    color:var(--color-digital-black); outline:none;"/>
    </div>

    <!-- Account + Cart -->
    <div style="display:flex; gap:0.375rem; margin-left:auto; flex-shrink:0;">
      <a href="#" class="header-icon-btn"><!-- user icon --></a>
      <a href="#" class="header-icon-btn" style="position:relative;"><!-- cart icon + badge --></a>
    </div>
  </div>
</header>
```

```css
.site-header {
  background: var(--color-white);
  border-bottom: 0.0625rem solid var(--color-graphite-200);
  position: relative;
  z-index: 100;
}
/* Sticky activates on scroll — add .is-sticky via JS */
.site-header.is-sticky {
  position: sticky;
  top: 0;
  box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.08);
}
.header-icon-btn {
  width: 2.5rem; height: 2.5rem;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; color: var(--color-digital-black); text-decoration: none;
  transition: background 0.14s;
}
.header-icon-btn:hover { background: var(--color-paper); }
```

```js
// Sticky header — CRITICAL: compact must be hidden at page load
// Only call this ONCE — never set is-sticky / hdr-compact--visible in CSS by default
const siteHeader = document.getElementById('site-header');
const compactHeader = document.getElementById('hdr-compact');  // if two-row design

function onScroll() {
  const scrolled = window.scrollY > 0;
  siteHeader.classList.toggle('is-sticky', scrolled);
  if (compactHeader) compactHeader.classList.toggle('visible', scrolled);
}
window.addEventListener('scroll', onScroll, { passive: true });
// Run once on load to ensure correct initial state (NOT sticky):
onScroll();
```

**IMPORTANT:** The compact/sticky header row must NEVER have `visible`, `active`, or `show` class on page load. It starts hidden. The scroll listener adds visibility. Never use `position: fixed` on the compact header row at load time — it must enter the DOM as `display: none` or `opacity: 0; pointer-events: none`.


### Mobile (< 768px) — 3.125rem (50px) tall

```html
<header class="site-header site-header--mobile">
  <div style="max-width:100%; padding:0 1rem; height:3.125rem;
              display:flex; align-items:center; justify-content:space-between;">
    <div style="display:flex; gap:0.875rem; align-items:center;">
      <button class="mobile-icon-btn" aria-label="Menü"><!-- hamburger icon --></button>
      <button class="mobile-icon-btn" aria-label="Suche"><!-- search icon --></button>
    </div>
    <a href="/" style="position:absolute; left:50%; transform:translateX(-50%);">
      <!-- logo centered -->
    </a>
    <div style="display:flex; gap:0.875rem; align-items:center;">
      <button class="mobile-icon-btn" aria-label="Konto"><!-- user icon --></button>
      <button class="mobile-icon-btn" aria-label="Warenkorb"><!-- cart icon --></button>
    </div>
  </div>
</header>
```

```css
.site-header--mobile { border-bottom: 0.0625rem solid var(--color-graphite-300); }
.mobile-icon-btn {
  width: 2rem; height: 2rem;
  background: none; border: none; cursor: pointer; padding: 0;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-digital-black);
}
```

---

## 8 · Breadcrumbs

Always left-aligned, always below the header, always in the same `.container`. The separator is a **chevron SVG** (not `/` text). Links are `var(--color-teal)` with underline, active/current item is `var(--color-digital-black)`.

```html
<section class="breadcrumb-bar">
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item"><a href="/paketboxen">Paketboxen</a></li>
        <li class="breadcrumb-item active" aria-current="page">Bispo Max 2</li>
      </ol>
    </nav>
  </div>
</section>
```

```css
.breadcrumb-bar {
  background: var(--color-white);
  border-bottom: 0.0625rem solid var(--color-graphite-200);
  padding: 0.625rem 0;
}
.breadcrumb {
  list-style: none; margin: 0; padding: 0;
  display: flex; align-items: center; flex-wrap: wrap; gap: 0.625rem;
}
.breadcrumb-item a {
  font-size: 0.875rem; font-family: var(--font-family);
  color: var(--color-graphite-600); text-decoration: none; cursor: pointer; transition: color 0.15s;
}
.breadcrumb-item a:hover { color: var(--color-teal); text-decoration: underline; }
.breadcrumb-item.active {
  font-size: 0.875rem; font-family: var(--font-family);
  color: var(--color-digital-black); font-weight: 500;
}
/* Chevron separator — SVG data URI, NOT "/" text */
.breadcrumb-item + .breadcrumb-item {
  display: flex; align-items: center; gap: 0.625rem;
}
.breadcrumb-item + .breadcrumb-item::before {
  content: '';
  display: inline-block;
  width: 0.375rem; height: 0.625rem;
  background: url("data:image/svg+xml,%3Csvg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4-4 4' stroke='%23A1A1A1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center;
}
```

**Never use `content: "/"` as the separator** — always use the chevron data URI above.

---

## 9 · Section Patterns

### Section spacing (apply to every `<section>`)

```css
/* Standard content section */
.section { padding: 4rem 0; }

/* Compact section */
.section--sm { padding: 2.5rem 0; }

/* Large hero-style section */
.section--lg { padding: 6rem 0; }

/* Dark background section */
.section--dark {
  background: var(--color-teal-900);
  color: var(--color-white);
}
/* Tinted background section */
.section--tinted { background: var(--color-paper); }

/* White background section */
.section--color-white { background: var(--color-white); }

@media (max-width: 48rem) {
  .section     { padding: 2.5rem 0; }
  .section--sm { padding: 1.75rem 0; }
  .section--lg { padding: 3.5rem 0; }
}
```

### Section header pattern (intro text for each section)

```html
<div class="section-intro">
  <p class="overline">Abschnitt-Label</p>
  <h2>Abschnittsüberschrift</h2>
  <p class="section-intro__lead">Kurze Beschreibung des Inhalts — maximal zwei Sätze.</p>
</div>
```

```css
.section-intro { margin-bottom: 2.5rem; }
.section-intro .overline { margin-bottom: 0.5rem; }
.section-intro h2 { margin-bottom: 0.625rem; }
.section-intro__lead {
  font-size: 1rem; color: var(--color-graphite-700); max-width: 60ch; line-height: 1.6;
}
/* Centered variant */
.section-intro--center { text-align: center; }
.section-intro--center .section-intro__lead { margin-left: auto; margin-right: auto; }
```

### Dividers / horizontal rules

```css
/* Standard hairline — between sections or inside cards */
.divider {
  width: 100%; height: 0;
  border: none; border-top: 0.0625rem solid var(--color-graphite-200);
  margin: 2rem 0;
}
/* On dark backgrounds */
.divider--dark { border-top-color: rgba(255,255,255,0.12); }
```

---

## 10 · Cards

```css
/* Base card */
.card {
  background: var(--color-white);
  border: 0.0625rem solid var(--color-graphite-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: box-shadow 0.18s, border-color 0.18s;
}
.card:hover {
  box-shadow: var(--shadow-hover);
  border-color: var(--color-graphite-300);
}

/* Card padding variants */
.card__body          { padding: 1.5rem; }
.card__body--compact { padding: 1rem 1.25rem; }
.card__body--loose   { padding: 2rem 2.5rem; }

/* Icon badge inside card (for feature cards) */
.card-icon {
  width: 2.5rem; height: 2.5rem;
  border-radius: var(--radius-lg);   /* 0.5rem = 8px for the generic .card-icon (the feature-grid .nfs-card-icon uses 0.625rem — see Section 19) */
  background: rgba(1,82,83,0.08);    /* teal at 8% opacity — always this value */
  color: var(--color-teal);
  display: inline-flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.card-icon svg { width: 1.375rem; height: 1.375rem; }
```

---

## 11 · Buttons

```css
/* ── BASE — all buttons share this ── */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  height: 2.75rem; padding: 0 1.375rem;
  font-size: 1rem; font-weight: 500; font-family: var(--font-family);
  border: none; border-radius: var(--radius);
  cursor: pointer; text-decoration: none; white-space: nowrap;
  transition: background 0.14s, color 0.14s, border-color 0.14s;
}
.btn--sm { height: 2.25rem; padding: 0 1rem; font-size: 0.875rem; }
.btn--lg { height: 3.25rem; padding: 0 2rem; font-size: 1.0625rem; }

/* Primary */
.btn--primary { background: var(--color-teal); color: #fff; }
.btn--primary:hover  { background: var(--color-teal-600); }
.btn--primary:active { background: var(--color-teal-700); }

/* Secondary (outline) */
.btn--secondary {
  background: transparent; color: var(--color-teal);
  border: 0.125rem solid var(--color-teal);
}
.btn--secondary:hover { background: var(--color-teal-50); }

/* Ghost */
.btn--ghost {
  background: transparent; color: var(--color-graphite-700);
  border: 0.0625rem solid var(--color-graphite-300);
}
.btn--ghost:hover { background: var(--color-paper); border-color: var(--color-graphite-400); }

/* Danger */
.btn--danger { background: var(--color-red); color: #fff; }
.btn--danger:hover { background: var(--color-red-600); }

/* Block button — full width on mobile */
@media (max-width: 48rem) {
  .btn--block-mobile { width: 100%; }
}
```

---

## 12 · Form Inputs — Floating Label Pattern

The Metzler design system uses a **floating label** — the `<label>` sits inside the input and floats above the border on focus or when a value is present. Never use a simple stacked label-above-input pattern.

**HTML structure — copy exactly:**

```html
<!-- Default state -->
<div class="field-wrapper">
  <input type="text" id="name" placeholder=" "/>
  <label for="name">Name</label>
</div>

<!-- With hint text -->
<div class="field-wrapper">
  <input type="password" id="password" placeholder=" "/>
  <label for="password">Passwort</label>
  <span class="field__hint">Passwort muss aus mindestens 8 Zeichen bestehen.</span>
</div>

<!-- Error state -->
<div class="field-wrapper field--error">
  <input type="text" id="name" placeholder=" "/>
  <label for="name">Name</label>
  <span class="field__error">Dieses Feld ausfüllen</span>
</div>
```

Critical: `placeholder=" "` (single space) is **required** — the CSS uses `:not(:placeholder-shown)` to detect when a value is present and float the label.

**CSS — copy exactly:**

```css
/* Base input */
.form-control {
  display: block; width: 100%;
  padding: 0.7rem 0.9375rem;
  font-family: var(--font-family); font-size: 1rem;
  color: var(--color-digital-black); background: var(--color-white);
  border: 0.0625rem solid var(--color-graphite-300);
  border-radius: var(--radius);
  box-sizing: border-box; outline: none;
  transition: border-color 0.15s;
}
.form-control:focus   { border-color: var(--color-teal); }
.form-control.error   { border-color: var(--color-red); }

/* Floating label wrapper */
.field-wrapper { position: relative; }

.field-wrapper label {
  position: absolute; left: 0.9375rem; top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-family); font-size: 1rem;
  color: var(--color-graphite-500);
  pointer-events: none; transition: all 0.15s ease;
  background: transparent; padding: 0;
  line-height: 1.4; white-space: nowrap; z-index: 1;
}

/* Float label on focus or when value is present */
.field-wrapper .form-control:focus + label,
.field-wrapper .form-control:not(:placeholder-shown) + label {
  top: -0.5625rem; left: 0.6875rem;
  transform: none; font-size: 0.75rem;
  color: var(--color-digital-black);
  background: var(--color-white); padding: 0 0.3125rem;
}

/* Error & hint text */
.field__error {
  position: absolute; bottom: -0.4375rem; right: 0.6875rem;
  background: var(--color-white); padding: 0 0.3125rem;
  font-family: var(--font-family); font-size: 0.75rem;
  color: var(--color-red); white-space: nowrap;
}
.field__hint {
  display: block; margin-top: 0.3125rem;
  font-family: var(--font-family); font-size: 0.8125rem;
  color: var(--color-graphite-600); line-height: 1.45;
}
```

**Never use** `<label class="input-label">` stacked above an `<input class="input">` — that is not the Metzler design system pattern.

---

## 13 · Colors — When to Use What

| Context | Token |
|---------|-------|
| Page background | `--color-paper` |
| Card / panel background | `--color-white` |
| Primary CTA, links, active state | `--color-teal` |
| CTA hover | `--color-teal-600` |
| Hairline dividers between sections | `--color-graphite-200` |
| Default card / input borders | `--color-graphite-300` |
| Main headline text | `--color-digital-black` |
| Body text | `--color-graphite-800` |
| Secondary / supporting text | `--color-graphite-700` |
| Captions, metadata | `--color-graphite-600` |
| Placeholder, disabled | `--color-graphite-500` |
| Footer background | `--color-teal-700` |
| Dark CTA band / `.section--dark` | `--color-teal-900` |
| Links / icons on footer / dark bg | `--color-mint` |
| Error state | `--color-red` |
| Success / availability | `--color-green` |
| Metzler logo M-square + sale badge | `--color-metzler-rot` |
| Rating stars only | `--color-star` |

**Icon badge tint** (feature cards, support cards): `background: rgba(1,82,83,0.08)` — do not use `--color-teal-50` for this.

---

## 14 · Footer

> ⚠️ **The block below is a SIMPLIFIED footer (4 columns only).** The canonical production footer is the `FooterSection` component in **`index.html`** + the image assets in **`footer/`**. Its background is **`var(--color-teal-700)` (#01292A)** — both versions below use this token. The real footer also has: a **5th column** ("Follow us" social icons + "Qualität" award badges), a **payment row** (Versandpartner DPD/DHL/GoGreen + "Einfach bezahlen" SEPA/Visa/PayPal/Klarna/Mastercard/Apple Pay/Google Pay/SEPA/Vorkasse) + a **Trusted Shops rating pill**, **10 legal links** (Geprüfte Kundenbewertungen · Metzler Garantieerklärung · Datenschutz · AGB · Sitemap · Impressum · Batterieentsorgungsgesetz · Widerrufsrecht · Hinweise zur Elektroaltgeräteentsorgung · Cookie-Einstellungen), and the copyright line "Alle Preise inkl. gesetzliche MwSt., zzgl. Versand © 2013 - 2026 | Metzler GmbH". **For real pages, reproduce that full component + copy the `footer/` assets** (a working static version is in `../tst/index.html`). The simplified block below is for quick mockups only.

**Contact values are exact (used in both versions). Do not invent columns, headings, or links.**

The simplified footer has 4 columns on desktop, stacks to 1 on mobile:
- **Col 1:** Logo + company tagline
- **Col 2:** Kontakt (exact phone/email — copy these values)
- **Col 3:** Informationen (exact link list)
- **Col 4:** Service (exact link list)

```html
<footer class="site-footer">
  <div class="container">

    <div class="footer-grid">

      <!-- Col 1: Logo + tagline -->
      <div class="footer-col footer-col--brand">
        <!-- Metzler Logo — white version -->
        <a href="/" class="footer-logo" aria-label="Metzler">
          <svg width="120" height="28" viewBox="0 0 184.3 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- M-square icon -->
            <rect width="40" height="40" rx="2" fill="#D42924"/>
            <path fill="#fff" d="M15.2 7.5l4.1 7.2-2.1 3.6L11 7.5h4.2zm0.02 16.1l-5.1-8.8v18.6H6.5V7.5H10l7.2 12.4 10.6-19.3h4.2L18.3 27.2l-2.1-3.6.02-.02zM33.1 33.4h-3.6V14.6l-7.2 12.5h-4.2l11.3-19.6h3.6v25.9z"/>
            <!-- METZLER wordmark -->
            <text x="50" y="30" font-family="'Helvetica Neue',Helvetica,Arial,sans-serif" font-size="22" font-weight="800" letter-spacing="3" fill="#FFFFFF">METZLER</text>
          </svg>
        </a>
        <p class="footer-tagline">
          Edelstahl-Tuerklingel.de ist ein Unternehmen der
          <a href="https://metzlergmbh.de" class="footer-mint-link">Metzler Gruppe</a>
        </p>
        <p class="footer-tagline" style="font-weight:700; color:var(--color-white); margin-top:0.75rem;">
          Der Anbieter für Briefkästen, Sprechanlagen, Türklingeln und Hausnummern.
        </p>
      </div>

      <!-- Col 2: Contact — EXACT values, do not change -->
      <div class="footer-col">
        <p class="footer-col-heading">Kontakt</p>

        <div class="footer-contact-block">
          <p class="footer-contact-label">Allgemeine Hotline:</p>
          <a href="tel:+4971213177310" class="footer-mint-link">+49 (0) 7121 / 317 7310</a>
          <p class="footer-contact-hours">Mo–Fr: 09:00–16:00 Uhr</p>
        </div>

        <div class="footer-contact-block">
          <p class="footer-contact-label">Sprechanlagen Hotline:</p>
          <a href="tel:+4971213177333" class="footer-mint-link">+49 (0) 7121 / 317 7333</a>
          <p class="footer-contact-hours">Mo–Fr: 09:00–16:00 Uhr</p>
        </div>

        <div class="footer-contact-block">
          <p class="footer-contact-label">E-Mail Support:</p>
          <a href="mailto:service@metzlergmbh.de" class="footer-mint-link">service@metzlergmbh.de</a>
        </div>

        <div class="footer-contact-block">
          <p class="footer-contact-label">Kontaktformular:</p>
          <a href="https://edelstahl-tuerklingel.de/Kontakt" class="footer-mint-link">Zum Kontaktformular</a>
        </div>
      </div>

      <!-- Col 3: Informationen — EXACT links, do not change -->
      <div class="footer-col">
        <p class="footer-col-heading">Informationen</p>
        <ul class="footer-links">
          <li><a href="#">Auszeichnungen</a></li>
          <li><a href="#">Fotowettbewerb</a></li>
          <li><a href="#">Kundenbilder</a></li>
          <li><a href="#">Stellenangebote</a></li>
          <li><a href="#">News</a></li>
          <li><a href="#">Zahlung und Versand</a></li>
        </ul>
      </div>

      <!-- Col 4: Service — EXACT links, do not change -->
      <div class="footer-col">
        <p class="footer-col-heading">Service</p>
        <ul class="footer-links">
          <li><a href="#">Begriffserklärung</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Geschäftskunden</a></li>
          <li><a href="#">Newsletter</a></li>
          <li><a href="#">VDM10 FAQ</a></li>
        </ul>
      </div>

    </div><!-- /.footer-grid -->

    <!-- Legal row — EXACT links, do not change -->
    <div class="footer-legal">
      <span>© 2026 Metzler GmbH</span>
      <div class="footer-legal-links">
        <a href="#">Datenschutz</a>
        <a href="#">AGB</a>
        <a href="#">Impressum</a>
        <a href="#">Widerrufsrecht</a>
        <a href="#">Sitemap</a>
        <a href="#">Cookie-Einstellungen</a>
      </div>
    </div>

  </div><!-- /.container -->
</footer>
```

```css
/* ── FOOTER — do not customise, use exactly as written ── */
.site-footer {
  background: var(--color-teal-700);   /* #01292A — same token as the production FooterSection */
  color: var(--color-white);
  padding: 3.5rem 0 2rem;
  margin-top: 5rem;
  font-family: var(--font-family);
}

.footer-logo { display: inline-block; margin-bottom: 1.25rem; }

.footer-tagline {
  font-size: 0.9375rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.55;
  margin: 0 0 0.5rem;
  font-family: var(--font-family);
}

.footer-mint-link {
  color: var(--color-mint);
  text-decoration: none;
  font-family: var(--font-family);
  font-size: 0.9375rem;
  transition: opacity 0.14s;
}
.footer-mint-link:hover { opacity: 0.8; }

.footer-grid {
  display: grid;
  grid-template-columns: 1.8fr 1.4fr 1fr 1fr;
  gap: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 0.0625rem solid rgba(255,255,255,0.1);
  margin-bottom: 1.5rem;
}

.footer-col-heading {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-white);
  margin: 0 0 1.25rem;
  font-family: var(--font-family);
}

.footer-contact-block {
  display: flex;
  flex-direction: column;
  gap: 0.1875rem;
  margin-bottom: 1.25rem;
}
.footer-contact-label {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-white);
  margin: 0;
  font-family: var(--font-family);
}
.footer-contact-hours {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.5);
  margin: 0;
  font-family: var(--font-family);
}

.footer-links {
  list-style: none;
  padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 1rem;
}
.footer-links a {
  font-size: 0.9375rem;
  color: rgba(255,255,255,0.72);
  text-decoration: none;
  font-family: var(--font-family);
  transition: color 0.14s;
}
.footer-links a:hover { color: var(--color-mint); }

.footer-legal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.45);
  font-family: var(--font-family);
}
.footer-legal-links {
  display: flex; gap: 1.5rem; flex-wrap: wrap;
}
.footer-legal a,
.footer-legal-links a {
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  font-size: 0.8125rem;
  font-family: var(--font-family);
  transition: color 0.14s;
}
.footer-legal a:hover,
.footer-legal-links a:hover { color: var(--color-white); }

/* Mobile */
@media (max-width: 64rem) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
}
@media (max-width: 48rem) {
  .site-footer { padding: 2.5rem 0 1.5rem; }
  .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
  .footer-legal { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
  .footer-legal-links { gap: 1rem; }
}
```

---

## 15 · Mobile Rules

Apply these on every page for the `< 768px` breakpoint:

```css
@media (max-width: 48rem) {

  /* Typography — scale down */
  h1, .h1 { font-size: 1.5rem; }
  h2, .h2 { font-size: 1.25rem; }
  h3, .h3 { font-size: 1.125rem; }
  .display-4 { font-size: 2rem; }

  /* Layout — single column */
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  .grid-2--md { grid-template-columns: 1fr 1fr; }  /* 2-col still ok at md */

  /* Sections */
  .section     { padding: 2.5rem 0; }
  .section--lg { padding: 3.5rem 0; }

  /* Cards — full width, no horizontal gap */
  .card-grid  { gap: 0.75rem; }

  /* Buttons — full width in mobile CTAs */
  .btn--block-mobile { width: 100%; }

  /* Hide desktop-only elements */
  .hide-mobile { display: none !important; }
}
@media (min-width: 48rem) {
  .hide-desktop { display: none !important; }
}
```

---

## 16 · Grids

```css
/* 2-column content grid */
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }

/* 3-column feature grid */
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }

/* 4-column product grid */
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }

/* Auto-responsive grid (min 16rem per column) */
.grid-auto { display: grid; grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr)); gap: 1.25rem; }

@media (max-width: 64rem) {
  .grid-4 { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 48rem) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 30rem) {
  .grid-4 { grid-template-columns: 1fr; }
}
```

---

## 17 · Rules Claude Must Always Follow

1. **All values in rem** — never use px in CSS output (1px = 0.0625rem)
2. **All colors from tokens** — never use bare hex codes; reference `var(--color-teal)`, `var(--color-graphite-200)` etc.
3. **Font always `var(--font-family)`** — never set a custom font-family
4. **Container max-width exactly 100rem** — never 90rem, 1440px, or anything else
5. **No padding on `<header>` / `<footer>` outer tags** — padding lives inside `.container` only
6. **Header two-state:** not sticky at page load; `.is-sticky` class added via JS on first scroll
7. **Breadcrumbs always left-aligned** — never centered
8. **Footer always `var(--color-teal-700)` (#01292A) background** — never a custom dark color. Always copy the exact footer from Section 14 — never invent columns, headings, or links. The footer has 4 columns: logo+tagline | Kontakt (with exact phone numbers) | Informationen | Service. The column headings and link texts are fixed — do not change them.
9. **Cards always `var(--radius-lg)` (0.5rem) radius** — never sharp corners, never pill-radius
10. **Arrows / carousel controls never show step numbers** — navigation arrows are controls only
11. **No external icon libraries** — use inline `<svg>` with `stroke="currentColor"`, `stroke-width: 1.8–2`, `stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`; icon container is 2.5rem × 2.5rem with `border-radius: var(--radius-lg)` (0.5rem = 8px) for the generic `.card-icon`; the feature-grid `.nfs-card-icon` is the one exception at 0.625rem (10px)
12. **Mobile-first** — base styles for mobile, overrides inside `@media (min-width: 48rem)`

---

## 18 · Complete Minimal Page Example

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue Seite — Metzler</title>
  <!-- PFLICHT: Metzler-Favicon auf JEDER Seite (rotes M-Quadrat) -->
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; background: #F5F6FA; }

    :root {
      --font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      --color-teal: #015253; --color-teal-600: #014A4B; --color-teal-900: #001D1D;
      --color-teal-50: #F2F6F6; --color-mint: #5CDBD3;
      --color-digital-black: #1A171B; --color-metzler-rot: #D42924;
      --color-white: #FFFFFF; --color-paper: #F5F6FA;
      --color-graphite-200: #E6E6E8; --color-graphite-300: #DADADA;
      --color-graphite-600: #7A7A82; --color-graphite-700: #54545C; --color-graphite-800: #2E2E36;
      --radius: 0.25rem; --radius-lg: 0.5rem;
    }

    .container { max-width: 100rem; margin: 0 auto; padding: 0 4rem; }
    @media (max-width: 48rem) { .container { padding: 0 1.5rem; } }

    /* header, breadcrumbs, footer, etc. using rules above */
  </style>
</head>
<body>

  <header class="site-header" id="site-header">
    <div class="container" style="height:4rem; display:flex; align-items:center; gap:1.25rem;">
      <!-- logo, nav, search -->
    </div>
  </header>

  <section class="breadcrumb-bar">
    <div class="container">
      <nav><ol class="breadcrumb">
        <li><a href="/">Home</a></li>
        <li aria-current="page">Aktuelle Seite</li>
      </ol></nav>
    </div>
  </section>

  <section class="section section--color-white">
    <div class="container">
      <h1>Seitenüberschrift</h1>
      <p>Beschreibung der Seite.</p>
    </div>
  </section>

  <footer class="site-footer">
    <div class="container">
      <!-- footer content -->
    </div>
  </footer>

  <script>
    const siteHeader = document.getElementById('site-header');
    const compactHeader = document.getElementById('hdr-compact');
    function onScroll() {
      const scrolled = window.scrollY > 0;
      siteHeader.classList.toggle('is-sticky', scrolled);
      if (compactHeader) compactHeader.classList.toggle('visible', scrolled);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // ensure correct state at load — NOT sticky
  </script>
</body>
</html>
```

---

## 19 · Common Mistakes — What Claude Gets Wrong

Read this section carefully. These are real errors observed in generated pages.

### ❌ Body text wrong font-size or color

```css
/* WRONG — never do this */
p { font-size: 17px; }         /* invented value */
p { font-size: 15px; }         /* invented value */
p { color: var(--color-graphite-700); }     /* g-700 is secondary text, not body */

/* CORRECT */
p { font-size: 1rem; }         /* always 16px = 1rem */
p { color: var(--color-graphite-800); }     /* primary body text */
.body-sm { color: var(--color-graphite-700); }  /* secondary/supporting text only */
```

### ❌ Inventing font sizes outside the type scale

**Permitted font sizes only:**

| Class | Size | Use |
|-------|------|-----|
| `.caption` | 0.75rem (12px) | metadata, timestamps |
| `.overline` | 0.75rem (12px) · ls 0.15em | section kickers |
| `.label` / `.body-sm` | 0.8125–0.875rem (13–14px) | labels, captions |
| `p` / `.body` | 1rem (16px) | body text |
| `h4` | 1.125rem (18px) | small headings |
| `h3` | 1.25rem (20px) | sub-headings |
| `h2` | 1.5rem (24px) | section headings |
| `h1` | 1.875rem (30px) | page title |
| `.display-4` | 2.875rem (46px) | hero headings |
| `.display-3` | 3rem (48px) | landing intro |
| `.display-2` | clamp → max 3.5rem (56px) | large hero |
| `.display-1` | clamp → max 5rem (80px) | landing hero |

**NEVER use:** 10px, 15px, 17px, 19px, 22px, 28px, 32px, 36px, 72px — or any px value not listed above.

### ❌ Sticky compact header visible at page load

```css
/* WRONG — never apply a visible/active/show class by default */
.hdr-compact { display: block; opacity: 1; }
.hdr-compact.visible { ... }   /* OK as a rule, but 'visible' must NOT be in HTML on load */

/* CORRECT starting state in HTML */
<div id="hdr-compact" class="hdr-compact">   <!-- no 'visible' class -->

/* JS adds it only on scroll */
function onScroll() {
  document.getElementById('hdr-compact')
    .classList.toggle('visible', window.scrollY > 0);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // ← call immediately to set correct initial state
```

### ❌ Overline/section-kicker wrong color

```css
/* WRONG */
.overline { color: var(--color-teal); }   /* teal is for CTAs, not kicker labels */

/* CORRECT — always gray on light backgrounds */
.overline { color: var(--color-graphite-600); }

/* CORRECT — only on dark (teal-900) backgrounds */
.section--dark .overline { color: var(--color-mint); }
```

### ❌ Icon badge border-radius not using token

```css
/* WRONG — generic card icon must use the token, not a raw value */
.card-icon { border-radius: 0.625rem; }

/* CORRECT — generic icon badge */
.card-icon { border-radius: var(--radius-lg); }  /* 0.5rem = 8px */

/* EXCEPTION — the feature-grid icon is intentionally 0.625rem (10px). This is the
   one place 0.625rem is correct; it matches the rendered .nfs-card-icon component. */
.nfs-card-icon { border-radius: 0.625rem; background: rgba(1,82,83,0.08); color: var(--color-teal); }
```

### ❌ Dark CTA/banner using pure black instead of brand dark

```css
/* WRONG */
.cta-section { background: #000; }
.cta-section { background: #111; }

/* CORRECT — always use the brand dark token */
.cta-section { background: var(--color-teal-900); }   /* #001D1D */
/* OR the brand gradient */
.cta-section { background: var(--gradient-brand); }
```

### ❌ Section padding not using defined classes

```css
/* WRONG — arbitrary one-off values */
section { padding: 32px 0 48px; }
section { padding: 10px 0; }

/* CORRECT — always one of these three */
.section     { padding: 4rem 0; }   /* standard — use for most sections */
.section--sm { padding: 2.5rem 0; } /* compact — for tight rows */
.section--lg { padding: 6rem 0; }   /* spacious — hero sections */

@media (max-width: 48rem) {
  .section     { padding: 2.5rem 0; }
  .section--sm { padding: 1.75rem 0; }
  .section--lg { padding: 3.5rem 0; }
}
```

### ❌ Custom footer with wrong columns or invented links

```html
<!-- WRONG — Claude invented "Paketboxen", "Briefkästen", "Sprechanlagen" as columns -->
<footer>
  <div>
    <h3>Produkte</h3>
    <ul><li>Paketboxen</li><li>Briefkästen</li></ul>
  </div>
  <div>
    <h3>Kontakt</h3>
    <p>Mo – Fr · 08:00 – 17:00 Uhr</p>
    <p>+49 (0) 7181 / 4999 110</p>  <!-- WRONG phone number -->
  </div>
</footer>

<!-- CORRECT — copy Section 14 verbatim with these exact 4 columns and content:
     Col 1: logo + company tagline (fixed text)
     Col 2: Kontakt — exact phones: +49 (0) 7121 / 317 7310 and +49 (0) 7121 / 317 7333, email: service@metzlergmbh.de
     Col 3: Informationen — exact links: Auszeichnungen, Fotowettbewerb, Kundenbilder, Stellenangebote, News, Zahlung und Versand
     Col 4: Service — exact links: Begriffserklärung, FAQ, Geschäftskunden, Newsletter, VDM10 FAQ
     Legal: Datenschutz | AGB | Impressum | Widerrufsrecht | Sitemap | Cookie-Einstellungen
-->
```

### ❌ Section with padding but no container inside

```html
<!-- WRONG — section has its own padding, content bleeds edge to edge -->
<section style="padding: 64px 30px;">
  <h2>Heading</h2>
</section>

<!-- CORRECT — section has no padding; container provides alignment -->
<section class="section section--tinted">
  <div class="container">
    <h2>Heading</h2>
  </div>
</section>
```

### ❌ Mixing text color tokens incorrectly

| Token | Correct use |
|-------|------------|
| `--color-digital-black` / `--color-graphite-900` | H1, H2, H3, H4 headings |
| `--color-graphite-800` | Primary body paragraphs |
| `--color-graphite-700` | Secondary body, section intro lead text |
| `--color-graphite-600` | Captions, breadcrumb links, overlines, metadata |
| `--color-graphite-500` | Placeholders, disabled text |
| `--color-teal` | Links, icon colors, interactive elements |
| `--color-white` | Text on dark/teal backgrounds |
| `--color-mint` | Links and icons on dark/teal-900 backgrounds |

**Never use `--color-graphite-700` for primary body paragraphs. Never use `--color-graphite-600` for body text.**

### ❌ Breadcrumb with "/" text separator and wrong link color

```css
/* WRONG */
.breadcrumb li:not(:last-child)::after { content: "/"; }  /* ❌ text separator */
.breadcrumb a { color: var(--color-graphite-600); }                    /* ❌ wrong color */

/* CORRECT */
/* Separator is a chevron SVG via ::before on li + li (see Section 8) */
.breadcrumb-item a { color: var(--color-graphite-600); text-decoration: none; }
.breadcrumb-item a:hover { color: var(--color-teal); text-decoration: underline; }
.breadcrumb-item.active { color: var(--color-digital-black); font-weight: 500; }
```

### ❌ Section overline/heading without section-intro wrapper (bad spacing)

```html
<!-- WRONG — overline and heading floated directly in section, no spacing control -->
<section>
  <div class="container">
    <span class="overline">AUSGEZEICHNETE QUALITÄT</span>
    <h2>Geprüft, empfohlen & tausendfach bewährt</h2>
  </div>
</section>

<!-- CORRECT — always wrap in .section-intro for consistent spacing -->
<section class="section section--color-white">
  <div class="container">
    <div class="section-intro section-intro--center">
      <p class="overline">Ausgezeichnete Qualität</p>
      <h2>Geprüft, empfohlen &amp; tausendfach bewährt</h2>
      <p class="section-intro__lead">Supporting lead text here.</p>
    </div>
    <!-- section content below -->
  </div>
</section>
```
`.section-intro .overline` has `margin-bottom: 0.5rem` and `.section-intro h2` has `margin-bottom: 0.625rem` — these spacings only work inside `.section-intro`.

### ❌ Stacked label+input instead of floating label pattern

```html
<!-- WRONG — stacked label above input, wrong classes -->
<label class="input-label">Name</label>
<input class="input" type="text" placeholder="z. B. Familie Breitenbach"/>

<!-- CORRECT — floating label inside field-wrapper, placeholder must be a single space -->
<div class="field-wrapper">
  <input type="text" id="name" placeholder=" "/>
  <label for="name">Name</label>
</div>
```

### ❌ FAQ built from scratch instead of using the design system component

```html
<!-- WRONG — invented classes, wrong icon, wrong sizes -->
<div class="faq">
  <div class="faq-item">
    <div class="faq-q">Frage?</div>
    <div class="faq-a-inner" style="font-size:0.9375rem; color:var(--color-graphite-700);">...</div>
    <!-- ❌ uses + icon, wrong classes, no hover/open states, no left accent bar -->
  </div>
</div>

<!-- CORRECT — copy the verbatim template from Section 20 -->
<!-- Key class names: faq-stage, faq-list (ul), faq-item (li), faq-btn, faq-q, faq-icon, faq-body, faq-answer -->
<!-- Question: font-size: 1.125rem; font-weight: 700 -->
<!-- Answer: font-size: 1rem; color: var(--color-graphite-700) — g-700 IS CORRECT for faq-answer -->
<!-- Icon: chevron SVG that rotates 180deg (not + / ×) -->
<!-- Open state: teal border + left accent bar (.faq-item.is-open::before) -->
```

---

## 20 · Product Page (PDP) — Specific Rules

For product detail pages, follow this structure in addition to all general rules:

```
Trust bar (dark, full-width)
Header (two-state)
Breadcrumbs (left-aligned)
Product hero (image gallery left, info panel right — 55% / 45% split)
Feature bar (4 icons in a row, white bg)
Why-this-product section (section-intro centered + 3-col feature cards)
Split sections (alternating image left/right with text)
Personalization / configurator section (--color-paper bg)
Gallery / lifestyle images
Specs / dimensions table
Awards / trust section
FAQ accordion
CTA bar (--color-teal-900 bg, price + button)
Footer
```

**Product hero panel rules:**
- Price: `font-size: 2rem; font-weight: 700; color: var(--color-digital-black);`
- Original price (strikethrough): `font-size: 1.25rem; color: var(--color-graphite-500); text-decoration: line-through;`
- Availability badge: green dot + `color: var(--color-green); font-size: 0.875rem;`
- Add-to-cart button: `.btn.btn--primary.btn--lg` — always full width in the panel
- Star rating color: `color: var(--color-star);` (#FFC041)

**Feature bar (4 icons below hero):**
- Each icon: `.card-icon` (2.5rem × 2.5rem, `var(--radius-lg)`, teal 8% bg)
- Label below icon: `font-size: 0.8125rem; font-weight: 600; color: var(--color-digital-black);`
- Sub-label: `font-size: 0.75rem; color: var(--color-graphite-600);`
- Layout: 4-col on desktop, 2-col on mobile (never 1-col)

**Specs / dimensions table — use this exact structure:**

```html
<div class="specs-table-wrapper">
  <table class="specs-table">
    <tbody>
      <tr>
        <td class="specs-label">Breite</td>
        <td class="specs-value">72 cm</td>
      </tr>
      <tr>
        <td class="specs-label">Höhe</td>
        <td class="specs-value">145 cm</td>
      </tr>
      <!-- repeat for each spec row -->
    </tbody>
  </table>
</div>
```

```css
.specs-table-wrapper {
  border: 0.0625rem solid var(--color-graphite-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.specs-table {
  width: 100%; border-collapse: collapse; font-family: var(--font-family);
}
.specs-table tr { border-bottom: 0.0625rem solid var(--color-graphite-100); }
.specs-table tr:last-child { border-bottom: none; }
.specs-table tr:hover { background: var(--color-paper); }
.specs-label {
  padding: 0.75rem 1rem; width: 40%;
  font-size: 0.875rem; color: var(--color-graphite-600); font-weight: 400;
}
.specs-value {
  padding: 0.75rem 1rem;
  font-size: 0.9375rem; color: var(--color-digital-black); font-weight: 600;
}
```

**FAQ accordion — ALWAYS use the exact design system component. Copy this HTML and CSS verbatim:**

```html
<div class="faq-stage">
  <div class="faq-header">
    <p class="faq-label">HÄUFIGE FRAGEN</p>
    <h2 class="faq-heading">Gut zu wissen</h2>
  </div>
  <ul class="faq-list">
    <li class="faq-item">
      <button class="faq-btn" aria-expanded="false" onclick="toggleFaq(this)">
        <span class="faq-left">
          <span class="faq-q">Question text here?</span>
        </span>
        <span class="faq-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </button>
      <div class="faq-body">
        <div class="faq-body-inner">
          <p class="faq-answer">Answer text here.</p>
        </div>
      </div>
    </li>
    <!-- repeat <li class="faq-item"> for each question -->
  </ul>
</div>

<script>
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const body = item.querySelector('.faq-body');
  const isOpen = item.classList.contains('is-open');
  document.querySelectorAll('.faq-item.is-open').forEach(el => {
    el.classList.remove('is-open');
    el.querySelector('.faq-body').classList.remove('is-open');
    el.querySelector('.faq-btn').setAttribute('aria-expanded','false');
  });
  if (!isOpen) {
    item.classList.add('is-open');
    body.classList.add('is-open');
    btn.setAttribute('aria-expanded','true');
  }
}
</script>
```

```css
.faq-stage { border-top: 0.0625rem solid var(--color-graphite-200); padding: 2.5rem 0 3rem; display: flex; flex-direction: column; align-items: center; }
.faq-header { text-align: center; margin-bottom: 2.5rem; }
.faq-label { font-size: 0.75rem; font-weight: 700; line-height: 1.4; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-teal); margin: 0 0 1.25rem; }
.faq-heading { font-size: 2.875rem; font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; color: var(--color-digital-black); margin: 0; }
.faq-list { list-style: none; margin: 0; padding: 0; width: 100%; max-width: 54rem; display: flex; flex-direction: column; gap: 0.75rem; }
.faq-item { position: relative; background: var(--color-white); border: 0.0625rem solid var(--color-graphite-200); border-radius: 0.5rem; overflow: hidden; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
.faq-item:hover { border-color: var(--color-teal); }
.faq-item.is-open { border-color: var(--color-teal); background: linear-gradient(180deg, var(--color-white) 0%, var(--color-paper) 100%); }
.faq-item.is-open::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 0.25rem; background: var(--color-teal); }
.faq-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.5rem; background: none; border: none; cursor: pointer; text-align: left; }
.faq-left { display: flex; align-items: center; gap: 1.25rem; min-width: 0; }
.faq-q { font-size: 1.125rem; font-weight: 700; color: var(--color-digital-black); line-height: 1.3; letter-spacing: -0.01em; margin: 0; }
.faq-btn:hover .faq-q { color: var(--color-teal); }
.faq-icon { width: 2rem; height: 2rem; display: inline-flex; align-items: center; justify-content: center; color: var(--color-teal); transition: transform 0.35s cubic-bezier(.22,1,.36,1); flex-shrink: 0; }
.faq-item.is-open .faq-icon { transform: rotate(180deg); }
.faq-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 400ms cubic-bezier(.22,1,.36,1); }
.faq-body.is-open { grid-template-rows: 1fr; }
.faq-body-inner { overflow: hidden; min-height: 0; }
.faq-answer { font-size: 1rem; line-height: 1.7; color: var(--color-graphite-700); padding: 0 1.5rem 1.75rem; margin: 0; max-width: 42rem; }
@media (max-width: 62.5rem) { .faq-heading { font-size: 1.875rem; } }
@media (max-width: 35rem) {
  .faq-heading { font-size: 1.5rem; }
  .faq-btn { padding: 1.25rem 1.125rem; }
  .faq-left { gap: 0.875rem; }
  .faq-answer { padding: 0 1.125rem 1.5rem; }
}
```

Key rules:
- Icon is a **chevron** (not `+`/`×`) that **rotates 180deg** when open
- Open item gets a **left accent bar** via `::before` (0.25rem teal) and **teal border**
- `max-width: 54rem` on `.faq-list` is correct per design system — do not change it
- Question: `font-size: 1.125rem; font-weight: 700` — NEVER 1rem/600
- Answer: `font-size: 1rem; color: var(--color-graphite-700)` — 1rem is correct, g-700 is correct here
