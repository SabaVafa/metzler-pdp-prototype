# Metzler Design System — Section Catalog (SECTIONS.md)

> **Companion to `FOR-CLAUDE.md`.** That file defines tokens, primitives (buttons, forms, cards), header/footer and page scaffolding. **This file is the catalog of ready-made page sections.** When building a page: pick sections from here, stack them per the blueprints below, and only design something new when no existing section fits.
>
> **Source of truth:** the rendered **SectionsPage** in `index.html` (open the kit → "Sections"). This file is the static HTML/CSS export of exactly those sections. If this file and the kit ever disagree, the kit's rendered preview wins — then this file must be re-synced (see "Maintenance" at the end).

**Version:** synced with kit SectionsPage, 2026-07-02 (14 sections + 1 variant).

---

## 0 · Global section conventions

Every section below assumes the FOR-CLAUDE.md scaffolding: tokens loaded (`metzler-tokens.css` or inline block), outer `<section>` with **no horizontal padding**, content inside `<div class="container">`, spacing via `.section` / `.section--sm` / `.section--lg`.

Recurring patterns shared by the sections in this catalog:

```css
/* Eyebrow / kicker — the standard section opener (teal on light, mint on dark) */
.eyebrow {
  font-size: 0.75rem; font-weight: 700; line-height: 1.4;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--color-teal); margin: 0 0 0.75rem;
}
.section--dark .eyebrow, .eyebrow--on-dark { color: var(--color-mint); }

/* Display-4 section heading — used by most sections in this catalog */
.section-display {
  font-size: 2.875rem; font-weight: 700; line-height: 1.15;
  letter-spacing: -0.02em; color: var(--color-digital-black); margin: 0;
}

/* Icon badge — 2.5rem square, teal 8% tint */
.icon-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 2.5rem; height: 2.5rem; border-radius: var(--radius-lg);
  background: rgba(1,82,83,0.08); color: var(--color-teal); flex-shrink: 0;
}

/* Carousel / slider arrows — ALWAYS square with var(--radius), never circular */
```

Naming convention: each section owns a short class prefix (`support-`, `nfs-`, `acc-`, `faq-`, `face-`, `qa-`, `ph-`, `fd-`, `fdu-`, `xh-`, `steps3-`, `spec-`, `abt-`, `craft-`). Never mix prefixes across sections.

---

## Page blueprints

Which sections stack in which order. Sections are referenced by their number in this catalog.

### Product detail page (PDP)
```
Header (canonical, header/preview.html)
Breadcrumbs
07  Product Hero                      (white)
    Feature bar — 4 icons             (FOR-CLAUDE.md §20)
02  Neue Features grid                (white)
08  Feature Detail (split, ×N)        (white, alternate image side)
09  Feature Duo                       (white)
03  Türöffnungsmöglichkeiten slider   (dark stage on white)
05  Gesichtserkennung process         (white — only for face-recognition products)
06  Editorial Q&A                     (white — one per key objection)
12  Technische Daten spec-callouts    (white)
    Specs table                       (FOR-CLAUDE.md §20 — full data)
01  Support & Kontakt                 (white)
04  FAQ (light)                       (white)
    CTA band                          (teal-900, FOR-CLAUDE.md)
Footer (canonical)
```

### System / campaign landing page (e.g. XDM10, SDM10X)
```
Header
10  XDM10 Hero (dark)                 (full-width dark gradient, breadcrumb embedded)
11  In drei Schritten                 (white)
08  Feature Detail (split, ×N)
02  Neue Features grid
12  Technische Daten spec-callouts
04b FAQ (dark variant)               (dark gradient stage)
01  Support & Kontakt
Footer
```

### Company / Über-uns page
```
Header
13  About Hero (split)                (digital-black band, breadcrumb embedded)
14  Craft Story (image/text, ×N alternating)
    Awards / Trust section            (home page pattern)
01  Support & Kontakt
Footer
```

Rules of thumb: max **one dark hero** per page; never stack two dark sections directly (separate with a white/paper section); Support & Kontakt (01) sits near the end, before FAQ or footer; FAQ is always the last content section before the CTA band/footer.

---

## Section 01 · Support & Kontakt (`support-`)

**What:** Five-card support grid — the primary card (phone consultation) spans two columns with a dark teal gradient; four standard white cards for Technischer Support, Info-/Hilfecenter, Partnerbetriebe, Frage stellen.
**When:** Product detail pages and the service landing page, near the end of the page.
**Layout:** 3-column grid, primary spans 2 → 2-column below 68.75rem → 1-column below 48rem.

```html
<div class="support-intro-row">
  <div>
    <h2 class="support-heading">Wie können wir Ihnen weiterhelfen?</h2>
    <p class="support-sub">Wählen Sie den für Ihr Anliegen passenden Kanal — unser Team in Deutschland antwortet werktags innerhalb von zwei Stunden.</p>
  </div>
  <div class="support-online-badge">
    <div class="support-online-dot-row"><span class="support-online-dot"></span> Support online</div>
    <div>Mo – Fr · 08:00 – 17:00 Uhr · MEZ</div>
  </div>
</div>

<div class="support-grid">
  <!-- Primary card (spans 2 columns) -->
  <a class="support-card is-primary" href="#">
    <div class="support-card-icon"><!-- SVG icon, 1.375rem, stroke 1.8 --></div>
    <div class="support-card-title">Produktberatung &amp; Bestellung</div>
    <p class="support-card-desc">Individuelle Beratung zur passenden Konfiguration…</p>
    <div class="support-card-foot">
      <span class="support-card-meta">+49 (0) 7181 / 4999 110</span>
      <span class="support-card-arrow"><!-- arrow svg --></span>
    </div>
  </a>
  <!-- Standard card -->
  <a class="support-card" href="#">
    <div class="support-card-icon"><!-- SVG icon --></div>
    <div class="support-card-title">Technischer Support</div>
    <p class="support-card-desc">Installation, Inbetriebnahme, Fehlerdiagnose…</p>
    <div class="support-card-foot">
      <span class="support-card-cta">Support öffnen</span>
      <span class="support-card-arrow"><!-- arrow svg --></span>
    </div>
  </a>
  <!-- Repeat <a class="support-card"> for each additional card (4 standard cards total) -->
</div>
```

```css
.support-intro-row {
  display: grid; grid-template-columns: 1fr auto;
  align-items: end; gap: 1.5rem; margin-bottom: 1.375rem;
}
.support-heading { font-size: 1.375rem; font-weight: 700; line-height: 1.15; letter-spacing: -0.005em; color: var(--color-digital-black); margin: 0 0 0.375rem; }
.support-sub { font-size: 1rem; color: var(--color-graphite-600); line-height: 1.55; max-width: 58ch; margin: 0; }
.support-online-badge { text-align: right; font-size: 1rem; color: var(--color-graphite-600); line-height: 1.5; }
.support-online-dot-row { display: inline-flex; align-items: center; gap: 0.375rem; font-weight: 800; color: var(--color-green); letter-spacing: 0.08em; text-transform: uppercase; }
.support-online-dot {
  width: 0.4375rem; height: 0.4375rem; border-radius: 50%; background: var(--color-green);
  box-shadow: 0 0 0 2px rgba(0,153,81,0.18); display: inline-block;
  animation: sp-pulse 1.8s ease-in-out infinite;
}
@keyframes sp-pulse {
  0%, 100% { box-shadow: 0 0 0 2px rgba(0,153,81,0.18); }
  50%      { box-shadow: 0 0 0 6px rgba(0,153,81,0); }
}

.support-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.875rem;
}
.support-card {
  grid-column: span 1;
  display: flex; flex-direction: column; gap: 0.5rem;
  padding: 1.125rem 1.25rem 1rem;
  background: var(--color-white);
  border: 0.0625rem solid var(--color-graphite-200);
  border-radius: var(--radius-lg);
  text-decoration: none; color: var(--color-digital-black);
  position: relative; overflow: hidden;
  transition: border-color 0.14s;
}
.support-card.is-primary {
  grid-column: span 2;
  background: radial-gradient(ellipse 70% 80% at 15% 30%, #01696A 0%, transparent 55%),
              linear-gradient(135deg, var(--color-teal) 0%, var(--color-teal-700) 60%, var(--color-digital-black) 100%);
  border-color: var(--color-teal-700); color: var(--color-white);
}
.support-card:hover { border-color: var(--color-digital-black); }
.support-card.is-primary:hover { border-color: var(--color-white); }

.support-card-icon {
  width: 2.5rem; height: 2.5rem; border-radius: 0.625rem;
  background: rgba(1,82,83,0.08); color: var(--color-teal);
  display: flex; align-items: center; justify-content: center;
}
.support-card.is-primary .support-card-icon {
  background: rgba(92,219,211,0.12);
  border: 0.0625rem solid rgba(92,219,211,0.24); color: var(--color-mint);
}
.support-card-title { font-size: 1.25rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.005em; color: var(--color-teal); }
.support-card.is-primary .support-card-title { color: var(--color-white); }
.support-card-desc { font-size: 1rem; color: var(--color-digital-black); line-height: 1.5; margin: 0; max-width: 32ch; }
.support-card.is-primary .support-card-desc { color: rgba(255,255,255,0.82); max-width: 42ch; }

.support-card-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 0.25rem; }
.support-card-cta { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-teal); }
.support-card.is-primary .support-card-cta { color: var(--color-mint); }
.support-card-meta { font-size: 1rem; font-weight: 600; letter-spacing: 0.02em; color: var(--color-graphite-600); }
.support-card.is-primary .support-card-meta { color: rgba(255,255,255,0.7); }

/* Arrow — square with var(--radius), NOT circular */
.support-card-arrow {
  width: 2.25rem; height: 2.25rem;
  border-radius: var(--radius);
  background: var(--color-paper); color: var(--color-digital-black);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.14s, color 0.14s; flex-shrink: 0;
}
.support-card.is-primary .support-card-arrow { background: rgba(255,255,255,0.14); color: var(--color-white); }
.support-card:hover .support-card-arrow { background: var(--color-teal); color: var(--color-white); }
.support-card.is-primary:hover .support-card-arrow { background: var(--color-white); color: var(--color-teal); }

@media (max-width: 68.75rem) {
  .support-grid { grid-template-columns: repeat(2, 1fr); }
  .support-card.is-primary { grid-column: span 2; }
}
@media (max-width: 48rem) {
  .support-grid { grid-template-columns: 1fr; }
  .support-card.is-primary { grid-column: span 1; }
  .support-intro-row { grid-template-columns: 1fr; }
  .support-online-badge { display: none; }
}
```

---

## Section 02 · Neue Features (`nfs-`)

**What:** Nine-feature grid with pill version badge and centered Display-4 heading (one word in teal). Cards share hairline gaps (grid gap trick on graphite-200 background). Hover: teal-50 fill, icon inverts to teal.
**When:** Product detail pages to highlight new version capabilities.
**Layout:** 3 columns → 2 below 56.25rem (odd last card spans full width) → 1 below 35rem.

```html
<div class="nfs-head">
  <span class="nf-bdg">Version 2.0</span>
  <h2 class="nfs-title">Neue <span class="nfs-accent">Features</span></h2>
</div>

<div class="nfs-grid">
  <div class="nfs-card">
    <span class="nfs-card-num">01</span>
    <span class="nfs-card-icon"><!-- SVG icon, 1.375rem, stroke 1.8 --></span>
    <h3 class="nfs-card-title">Feature title</h3>
    <p class="nfs-card-desc">Short description of the feature, up to 3 lines.</p>
  </div>
  <!-- Repeat <div class="nfs-card"> × 9 -->
</div>
```

```css
.nfs-head {
  display: flex; flex-direction: column; align-items: center;
  gap: 0.625rem; margin-bottom: 1.75rem;
}
.nf-bdg {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.3125rem 0.75rem 0.3125rem 0.625rem;
  background: var(--color-teal-50); color: var(--color-teal);
  border-radius: var(--radius-pill);
  font-size: 0.625rem; font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase; line-height: 1;
}
.nf-bdg::before {
  content: ""; width: 0.375rem; height: 0.375rem;
  border-radius: 50%; background: var(--color-teal); display: inline-block;
}
.nfs-title {
  font-size: 2.875rem; font-weight: 700; letter-spacing: -0.02em;
  line-height: 1.15; color: var(--color-digital-black);
  text-align: center; margin: 0;
}
.nfs-title .nfs-accent { color: var(--color-teal); }

.nfs-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 0.0625rem; background: var(--color-graphite-200);
  border: 0.0625rem solid var(--color-graphite-200);
  border-radius: var(--radius-lg); overflow: hidden;
}
@media (max-width: 56.25rem) {
  .nfs-grid { grid-template-columns: repeat(2, 1fr); }
  .nfs-card:last-child:nth-child(odd) { grid-column: 1 / -1; }
}
@media (max-width: 35rem) { .nfs-grid { grid-template-columns: 1fr; } }

.nfs-card {
  background: var(--color-white); padding: 1.5rem;
  display: flex; flex-direction: column; align-items: flex-start;
  gap: 0.375rem; transition: background 220ms ease;
}
.nfs-card:hover { background: var(--color-teal-50); }

.nfs-card-num {
  font-size: 1rem; font-weight: 600; letter-spacing: 0.04em;
  color: var(--color-graphite-400); font-variant-numeric: tabular-nums;
  margin-bottom: 0.125rem; transition: color 220ms ease;
}
.nfs-card:hover .nfs-card-num { color: var(--color-teal); }

/* Icon badge — 0.625rem radius is the documented exception for this grid */
.nfs-card-icon {
  width: 2.5rem; height: 2.5rem; border-radius: 0.625rem;
  background: rgba(1,82,83,0.08); color: var(--color-teal);
  display: inline-flex; align-items: center; justify-content: center;
  margin-bottom: 0.25rem;
  transition: background 220ms ease, color 220ms ease, transform 220ms ease;
}
.nfs-card-icon svg {
  width: 1.375rem; height: 1.375rem; fill: none;
  stroke: currentColor; stroke-width: 1.8;
  stroke-linecap: round; stroke-linejoin: round;
}
.nfs-card:hover .nfs-card-icon { background: var(--color-teal); color: var(--color-white); transform: translateY(-1px); }

.nfs-card-title {
  font-size: 1rem; font-weight: 700; line-height: 1.3;
  color: var(--color-digital-black); margin: 0 0 0.25rem; transition: color 220ms ease;
}
.nfs-card:hover .nfs-card-title { color: var(--color-teal); }

.nfs-card-desc {
  font-size: 1rem; line-height: 1.4; color: var(--color-graphite-600);
  margin: 0; display: -webkit-box; -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; overflow: hidden;
}
```

---

## Section 03 · Türöffnungsmöglichkeiten slider (`acc-`)

**What:** Dark horizontal scroll gallery (digital-black stage, rounded) with Display-4 title and square outline arrows top-right. Cards: 18.75 × 25 rem portrait visual + bold lead-in text.
**When:** Product detail pages to present access methods (QR, RFID, PIN, App, …).
**Layout:** horizontal overflow scroll; arrows `scrollBy({ left: ±332 })`; snap-scroll on mobile at 78vw card width.

```html
<div class="acc-stage">
  <div class="acc-header">
    <h2 class="acc-title">Türöffnungs&shy;möglichkeiten</h2>
    <div class="acc-nav">
      <button class="acc-arrow" aria-label="Vorherige"><!-- left chevron svg --></button>
      <button class="acc-arrow" aria-label="Nächste"><!-- right chevron svg --></button>
    </div>
  </div>
  <div class="acc-track" id="acc-track">
    <article class="acc-card">
      <div class="acc-visual">
        <img src="photo.jpg" alt="QR-Code" />
        <div class="acc-visual-placeholder" style="display:none">QR-Code</div><!-- shown on img error -->
      </div>
      <p class="acc-card-text">
        <strong>Zugang durch QR-Code.</strong>
        Öffnen Sie Ihre Tür bequem über einen verschlüsselten QR-Code…
      </p>
    </article>
    <!-- Repeat <article class="acc-card"> for each slide -->
  </div>
</div>
<!-- JS: arrow click → document.getElementById('acc-track').scrollBy({ left: ±332, behavior:'smooth' }) -->
```

```css
.acc-stage {
  background: var(--color-digital-black); color: var(--color-white);
  border-radius: var(--radius-lg); overflow: hidden;
  padding: 2.25rem 0 2.5rem;
}
.acc-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 2.25rem; margin-bottom: 1.25rem; gap: 1.5rem;
}
.acc-title {
  font-size: 2.875rem; /* Display 4 */ font-weight: 700; line-height: 1.15;
  letter-spacing: -0.02em; color: var(--color-white); margin: 0;
}
.acc-nav { display: flex; align-items: center; gap: 0.625rem; }
/* Arrow — square var(--radius), NOT circular */
.acc-arrow {
  width: 2.125rem; height: 2.125rem; border-radius: var(--radius);
  border: 0.0625rem solid var(--color-white);
  background: transparent; color: var(--color-white); cursor: pointer; flex-shrink: 0;
  display: inline-flex; align-items: center; justify-content: center;
  transition: background 150ms ease, color 150ms ease;
}
.acc-arrow:hover { background: var(--color-white); color: var(--color-digital-black); }
.acc-arrow svg { width: 0.875rem; height: 0.875rem; pointer-events: none; }

.acc-track {
  display: flex; gap: 2rem;
  padding: 0.25rem 2.25rem 0.5rem;
  overflow-x: auto; scroll-behavior: smooth; scrollbar-width: none;
}
.acc-track::-webkit-scrollbar { display: none; }
.acc-card { flex: 0 0 auto; width: 18.75rem; display: flex; flex-direction: column; }
.acc-visual { width: 18.75rem; height: 25rem; border-radius: var(--radius-lg); background: #141416; overflow: hidden; position: relative; }
.acc-visual img { width: 100%; height: 100%; object-fit: cover; display: block; }
.acc-visual-placeholder {
  position: absolute; inset: 0; display: flex; align-items: center;
  justify-content: center; padding: 1rem; text-align: center;
  font-size: 0.6875rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(255,255,255,0.35); line-height: 1.5;
}
.acc-card-text { margin: 0.75rem 0.125rem 0; font-size: 1rem; line-height: 1.5; color: rgba(255,255,255,0.72); }
.acc-card-text strong { display: block; margin-bottom: 0.375rem; color: var(--color-white); font-weight: 700; }

@media (max-width: 48rem) {
  .acc-title { font-size: 1.5rem; }
  .acc-header { padding: 0 1.25rem; }
  .acc-track { padding: 0.25rem 1.25rem 0.5rem; gap: 1rem; scroll-snap-type: x mandatory; }
  .acc-card { width: 78vw; max-width: 20rem; scroll-snap-align: start; }
  .acc-visual { width: 100%; height: auto; aspect-ratio: 3/4; }
}
```

*Note:* `#141416` is the media-placeholder background inside the dark stage — an intentional non-token value (media surface only, never for UI).

---

## Section 04 · FAQ accordion (`faq-`) — light + 04b dark variant

**What:** Card-based accordion, centered header (eyebrow "FAQ" + Display-4 heading). Chevron icon rotates 180°; open item gets teal border + 0.25rem left accent bar + white→paper gradient. Only one item open at a time.
**When:** Last content section of every product/landing page. Use the **dark variant** on dark campaign pages (e.g. XDM10).
**Key rules:** question 1.125rem/700 (never 1rem/600); answer 1rem graphite-700 (g-700 is correct here); icon is a chevron, never `+`/`×`; `max-width: 54rem` on the list.

```html
<div class="faq-stage">
  <div class="faq-header">
    <p class="faq-label">FAQ</p>
    <h3 class="faq-heading">Alles, was Sie wissen müssen</h3>
  </div>
  <ul class="faq-list">
    <li class="faq-item is-open">
      <button class="faq-btn" aria-expanded="true" onclick="toggleFaq(this)">
        <span class="faq-left">
          <span class="faq-num">01</span><!-- kept in markup, hidden by CSS -->
          <span class="faq-q">Kann ich mein bestehendes System auf XDM10 aufrüsten?</span>
        </span>
        <span class="faq-icon"><!-- chevron svg: M6 9l6 6 6-6 --></span>
      </button>
      <div class="faq-body is-open">
        <div class="faq-body-inner">
          <p class="faq-answer">Answer text here.</p>
        </div>
      </div>
    </li>
    <!-- Repeat <li class="faq-item"> for each question -->
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
.faq-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.5rem; background: none; border: none; cursor: pointer; text-align: left; font-family: inherit; }
.faq-left { display: flex; align-items: center; gap: 1.25rem; min-width: 0; }
.faq-num { display: none; } /* numbers stay in markup but are never shown */
.faq-q { font-size: 1.125rem; font-weight: 700; color: var(--color-digital-black); line-height: 1.3; letter-spacing: -0.01em; margin: 0; transition: color 150ms ease; }
.faq-btn:hover .faq-q { color: var(--color-teal); }
.faq-icon { width: 2rem; height: 2rem; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--color-teal); transition: transform .35s cubic-bezier(.22,1,.36,1); }
.faq-icon svg { width: 1.5rem; height: 1.5rem; }
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

### 04b · Dark variant (`.faq-dark`)

Same markup wrapped in a dark gradient stage; colors invert to mint/white:

```html
<div class="faq-dark-section">
  <div class="faq-stage faq-dark">
    <!-- identical header + list markup as the light version -->
  </div>
</div>
```

```css
.faq-dark-section {
  border-radius: var(--radius-lg);
  padding: 3rem 2.5rem 3.5rem;
  background:
    radial-gradient(ellipse 70% 70% at 18% 16%, #01696A 0%, transparent 55%),
    linear-gradient(135deg, var(--color-teal) 0%, var(--color-teal-700) 60%, var(--color-digital-black) 100%);
}
.faq-stage.faq-dark { border-top: 0.0625rem solid rgba(255,255,255,0.14); }
.faq-dark .faq-label { color: var(--color-mint); }
.faq-dark .faq-heading { color: var(--color-white); }
.faq-dark .faq-item { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.14); }
.faq-dark .faq-item:hover { border-color: var(--color-mint); }
.faq-dark .faq-item.is-open { border-color: var(--color-mint); background: rgba(255,255,255,0.10); }
.faq-dark .faq-item.is-open::before { background: var(--color-mint); }
.faq-dark .faq-q { color: var(--color-white); }
.faq-dark .faq-btn:hover .faq-q { color: var(--color-white); }
.faq-dark .faq-icon { color: var(--color-mint); }
.faq-dark .faq-answer { color: rgba(255,255,255,0.72); }
@media (max-width: 35rem) {
  .faq-dark-section { padding: 2rem 1.25rem 2.5rem; }
}
```

*Note:* `#01696A` is the shared ambient-glow color of all dark gradient stages (also in Section 01 primary card) — intentional non-token accent, only ever inside `radial-gradient` glows.

---

## Section 05 · Gesichtserkennung process (`face-`)

**What:** Left-aligned eyebrow + Display-4 title (with line break) + bold-lead paragraph, then 4 numbered steps: circled teal number + fading rule line + body text.
**When:** Product pages of face-recognition products (SDM10X) to explain the recognition process.
**Layout:** 4 columns → 2 below 56.25rem → 1 below 30rem (rule lines hidden).

```html
<p class="face-eyebrow">Biometric Access · Gesichtserkennung</p>
<h2 class="face-title">Ablauf der<br>Gesichtserkennung.</h2>
<p class="face-lede">
  <strong>Schneller Zutritt, sicher gelöst.</strong>
  Die Dual-Kamera erfasst ein dreidimensionales Gesichtsmodell in unter einer Sekunde…
</p>

<div class="face-steps">
  <div class="face-step">
    <div class="face-step-head">
      <span class="face-step-num">1</span>
      <span class="face-step-rule"></span><!-- hidden on last step via CSS -->
    </div>
    <p class="face-step-body">Zwei Kameras erfassen das Gesicht dreidimensional und wandeln es in digitale Daten um.</p>
  </div>
  <!-- Repeat <div class="face-step"> × 4 total -->
</div>
```

```css
.face-eyebrow { font-size: 0.75rem; font-weight: 700; line-height: 1.4; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-teal); margin: 0 0 0.75rem; }
.face-title { font-size: 2.875rem; font-weight: 700; line-height: 0.94; letter-spacing: -0.01em; color: var(--color-digital-black); margin: 0 0 1.125rem; }
.face-lede { font-size: 1rem; line-height: 1.6; color: var(--color-black); margin: 0 0 2.75rem; max-width: 80ch; }
.face-lede strong { color: var(--color-digital-black); font-weight: 800; }

.face-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
.face-step { display: flex; flex-direction: column; padding-top: 0.125rem; }
.face-step-head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.875rem; }
.face-step-num {
  width: 2.125rem; height: 2.125rem; border-radius: 50%;
  border: 0.125rem solid var(--color-teal);
  background: var(--color-white); color: var(--color-teal);
  font-size: 0.9375rem; font-weight: 800; line-height: 1;
  display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.face-step-rule { flex: 1; height: 0.09375rem; background: var(--color-teal); opacity: 0.35; border-radius: 0.0625rem; }
.face-step:last-child .face-step-rule { display: none; }
.face-step-body { font-size: 1rem; line-height: 1.55; color: var(--color-black); margin: 0; }

@media (max-width: 56.25rem) {
  .face-steps { grid-template-columns: repeat(2, 1fr); }
  .face-title { font-size: 2rem; }
}
@media (max-width: 30rem) {
  .face-steps { grid-template-columns: 1fr; }
  .face-step-rule { display: none; }
  .face-title { font-size: 1.75rem; line-height: 1.05; }
}
```

*Deviation note:* this section (a 1:1 port of the SDM10X landing) sets its running text in `var(--color-black)` instead of the standard `var(--color-graphite-800)` body color. Keep as-is inside this section only — do not copy the pure-black text pattern into new sections.

---

## Section 06 · Editorial Q&A (`qa-`)

**What:** Two-column typographic split — large Display-4 question left, answer paragraphs right; opening word of a decisive answer is bold + underlined (`.qa-emph`). No cards, no shadows — hierarchy through type only.
**When:** One per key customer objection (security concerns, compatibility …) on product pages.
**Layout:** 1fr 1fr → single column below 40rem.

```html
<div class="qa-stage">
  <div class="qa-split">
    <h2 class="qa-question">
      Kann man mit einem Foto oder Video des Gesichts Zutritt zum Haus erlangen?
    </h2>
    <div class="qa-body">
      <p class="qa-answer">
        <span class="qa-emph">Nein.</span> Die SDM10X verhindert dies mit ihrer
        dualen Kameratechnologie und Anti-Spoofing-Funktion…
      </p>
      <p class="qa-answer">Das Anti-Spoofing identifiziert Fälschungen…</p>
    </div>
  </div>
</div>
```

```css
.qa-stage { padding: 2.5rem 0 3rem; }
.qa-split {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 3.5rem; align-items: flex-start;
}
.qa-question {
  font-size: 2.875rem; /* Display 4 */
  font-weight: 700; line-height: 1.06;
  letter-spacing: -0.01em; color: var(--color-digital-black); margin: 0;
}
.qa-answer {
  font-size: 1rem; line-height: 1.7;
  color: var(--color-graphite-850); margin: 0 0 1rem;
}
.qa-answer:last-child { margin-bottom: 0; }
.qa-emph {
  color: var(--color-digital-black); font-weight: 700;
  text-decoration: underline;
  text-decoration-thickness: 0.0625rem;
  text-underline-offset: 0.1875rem;
}
@media (max-width: 68.75rem) {
  .qa-question { font-size: 1.875rem; line-height: 1.1; }
  .qa-split { gap: 2rem; }
}
@media (max-width: 40rem) {
  .qa-split { grid-template-columns: 1fr; gap: 1.5rem; }
  .qa-question { font-size: 1.5rem; line-height: 1.15; }
}
```

---

## Section 07 · Product Hero (`ph-`)

**What:** Full-page product introduction — dark visual left, info column right: eyebrow, Display-4 title, badges (primary teal + neutral, incl. DE flag strip), bold-lead paragraph, feature pill row, italic quote with teal left border, compatibility line above hairline.
**When:** First content section of a product detail page, directly below breadcrumbs.
**Layout:** 1fr 1fr → single column below 56.25rem (visual on top).

```html
<div class="ph-stage">
  <div class="ph-visual">
    <img src="sdm10x.webp" alt="Metzler SDM10X" />
  </div>
  <div class="ph-info">
    <p class="ph-eyebrow">Video-Türsprechanlage</p>
    <h2 class="ph-title">Metzler Video Türsprechanlage mit Gesichtserkennung SDM10X</h2>
    <div class="ph-badges">
      <span class="ph-badge ph-badge--primary">Neue Hard- &amp; Softwareversion 2.0</span>
      <span class="ph-badge ph-badge--neutral">Powered by Hikvision</span>
      <span class="ph-badge ph-badge--neutral">
        Designed in Germany
        <span class="ph-flag-strip" aria-hidden="true"><i style="background:#000000"></i><i style="background:#DD0000"></i><i style="background:#FFCE00"></i></span>
      </span>
    </div>
    <p class="ph-lede"><strong>Intercom, neu definiert.</strong> Unsere beste Sprechanlage…</p>
    <div class="ph-features">
      <span class="ph-feature"><!-- icon svg -->Gesichtserkennung</span>
      <!-- repeat pill per feature -->
    </div>
    <p class="ph-quote">Hergestellt aus massivem Edelstahl…</p>
    <div class="ph-compat">
      <span class="ph-compat-icon"><!-- house svg --></span>
      <span class="ph-compat-label">Kombinierbar mit Innenstationen</span>
      <span class="ph-compat-models"><span>VDM10</span><span>ADM10</span></span>
    </div>
  </div>
</div>
```

```css
.ph-stage {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 3.5rem; align-items: stretch; margin: 1.5rem 0 2.5rem;
}
.ph-visual {
  background: var(--color-graphite-900); border-radius: var(--radius-lg);
  overflow: hidden; min-height: 22.5rem; position: relative;
}
.ph-visual img { width: 100%; height: 100%; object-fit: cover; display: block; }
.ph-info { display: flex; flex-direction: column; justify-content: center; }
.ph-eyebrow {
  font-size: 0.75rem; font-weight: 700; line-height: 1.4; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--color-teal); margin: 0 0 0.875rem;
}
.ph-title {
  font-size: 2.875rem; font-weight: 700; line-height: 1.0;
  letter-spacing: -0.03em; color: var(--color-digital-black); margin: 0 0 1.125rem; max-width: 18ch;
}
.ph-badges { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
.ph-badge {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.375rem;
  font-size: 0.75rem; font-weight: 500; letter-spacing: 0.08em;
  text-transform: uppercase; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm);
}
.ph-badge--primary { background: var(--color-teal); color: var(--color-white); }
.ph-badge--neutral { background: var(--color-paper); color: var(--color-digital-black); border: 0.0625rem solid var(--color-graphite-200); }
.ph-flag-strip {
  display: inline-flex; width: 0.875rem; height: 0.5625rem;
  border: 0.0625rem solid rgba(0,0,0,0.12); border-radius: 0.0625rem;
  overflow: hidden; margin-left: 0.125rem;
}
.ph-flag-strip i { flex: 1; display: block; }
.ph-lede { font-size: 1rem; line-height: 1.6; color: var(--color-graphite-850); margin: 0 0 1.125rem; }
.ph-lede strong { color: var(--color-digital-black); font-weight: 800; }
.ph-features { display: flex; flex-wrap: wrap; gap: 0.375rem 0.5rem; margin-bottom: 1.375rem; }
.ph-feature {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.875rem; font-weight: 600; color: var(--color-digital-black);
  background: var(--color-white); border: 0.0625rem solid var(--color-graphite-200);
  padding: 0.4375rem 0.875rem; border-radius: var(--radius-sm);
}
.ph-feature svg { width: 1rem; height: 1rem; color: var(--color-teal); flex-shrink: 0; }
.ph-quote {
  font-style: italic; font-size: 1rem; line-height: 1.55; color: var(--color-graphite-700);
  margin: 0 0 1.125rem; padding-left: 0.875rem;
  border-left: 0.125rem solid var(--color-teal);
}
.ph-compat {
  display: flex; align-items: center; flex-wrap: wrap; gap: 0.625rem;
  font-size: 0.875rem; color: var(--color-graphite-600);
  padding-top: 0.875rem; border-top: 0.0625rem solid var(--color-graphite-200);
}
.ph-compat-icon { display: inline-flex; width: 1.25rem; height: 1.25rem; color: var(--color-teal); flex-shrink: 0; }
.ph-compat-label {
  font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--color-graphite-600);
}
.ph-compat-models span { color: var(--color-digital-black); font-weight: 700; font-size: 0.875rem; }
.ph-compat-models span + span::before { content: "·"; margin: 0 0.375rem; color: var(--color-graphite-400); font-weight: 400; }
@media (max-width: 56.25rem) {
  .ph-stage { grid-template-columns: 1fr; gap: 1.5rem; }
  .ph-title { font-size: 2.25rem; }
  .ph-visual { min-height: 18rem; }
}
@media (max-width: 40rem) {
  .ph-title { font-size: 1.875rem; }
}
```

---

## Section 08 · Feature Detail (`fd-`)

**What:** Split feature block — label/Display-4 title/body left plus optional swatch list (LED colors, RAL variants), large dark visual (image **or** autoplay-muted-loop video) right.
**When:** Product pages, one per major feature; alternate visual side across consecutive instances.
**Layout:** 1fr 1fr → single column below 56.25rem.

```html
<div class="fd-stage">
  <div class="fd-info">
    <p class="fd-label">Produktmerkmal</p>
    <h3 class="fd-title">Drucktaster mit einstellbarer LED-Farbe</h3>
    <p class="fd-body">Damit die Beleuchtung Ihrer Video-Türsprechanlage ideal zu Ihnen und Ihrem Eingangsbereich passt, lässt sich die LED-Farbe jederzeit einstellen.</p>
    <p class="fd-sub">Folgende Farben sind einstellbar:</p>
    <ul class="fd-swatches">
      <li class="fd-swatch"><span class="fd-swatch-dot" style="background:#FFFFFF;"></span>Weiß</li>
      <li class="fd-swatch"><span class="fd-swatch-dot" style="background:#EF4444;"></span>Rot</li>
      <!-- repeat per colour; swatch dots are product colors, not UI tokens -->
    </ul>
  </div>
  <div class="fd-visual">
    <video src="media/rgb-taster-4zu3.mp4" autoplay muted loop playsinline></video>
  </div>
</div>
```

```css
.fd-stage {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 3.5rem; align-items: stretch; margin: 1.5rem 0 2.5rem;
}
.fd-info { display: flex; flex-direction: column; justify-content: center; }
.fd-label {
  font-size: 0.75rem; font-weight: 700; line-height: 1.4; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--color-teal); margin: 0 0 1rem;
}
.fd-title {
  font-size: 2.875rem; /* Display 4 */ font-weight: 700; line-height: 1.08;
  letter-spacing: -0.01em; color: var(--color-digital-black); margin: 0 0 1.5rem;
}
.fd-body { font-size: 1rem; line-height: 1.65; color: var(--color-graphite-700); margin: 0 0 1.75rem; }
.fd-sub {
  font-size: 0.875rem; font-weight: 700; color: var(--color-digital-black);
  margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.04em;
}
.fd-swatches {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 0 1.5rem; list-style: none; padding: 0; margin: 0;
}
.fd-swatch {
  display: flex; align-items: center; gap: 0.625rem;
  font-size: 0.875rem; color: var(--color-graphite-850); font-weight: 500;
  padding: 0.75rem 0; border-bottom: 0.0625rem solid var(--color-graphite-200);
}
.fd-swatch-dot {
  width: 0.875rem; height: 0.875rem; border-radius: 50%;
  flex-shrink: 0; border: 0.0625rem solid rgba(0,0,0,0.1);
}
.fd-visual {
  background: var(--color-graphite-900); border-radius: var(--radius-lg);
  overflow: hidden; min-height: 22.5rem; position: relative;
}
.fd-visual img, .fd-visual video { width: 100%; height: 100%; object-fit: cover; display: block; }
@media (max-width: 56.25rem) {
  .fd-stage { grid-template-columns: 1fr; gap: 1.5rem; }
  .fd-visual { min-height: 16rem; }
  .fd-title { font-size: 1.875rem; }
}
@media (max-width: 40rem) {
  .fd-title { font-size: 1.5rem; }
}
```

---

## Section 09 · Feature Duo (`fdu-`)

**What:** Two side-by-side feature cards — natural-height photo on top (rounded, dark fallback), then label, H2-size title, body text, optional teal-dot bullet list.
**When:** Product pages for feature pairs (e.g. Gravur + Farbvarianten).
**Layout:** 1fr 1fr, 3.5rem gap → single column below 48rem.

```html
<div class="fdu-grid">
  <article class="fdu-card">
    <div class="fdu-photo"><img src="media/gravur.webp" alt="Individuelle Gravur" /></div>
    <div class="fdu-body">
      <p class="fdu-label">Personalisierung</p>
      <h3 class="fdu-title">Individuelle Gravur</h3>
      <p class="fdu-text">Durch die vollkommen individualisierbare Lasergravur…</p>
      <ul class="fdu-list">
        <li><strong>Verschiedene Schriftarten</strong> stehen zur Auswahl</li>
        <li>Beschriftung via <strong>Lasergravur</strong> — kein Verblassen</li>
      </ul>
    </div>
  </article>
  <article class="fdu-card">
    <div class="fdu-photo"><img src="media/farben.png" alt="Verschiedene Farben" /></div>
    <div class="fdu-body">
      <p class="fdu-label">Farbvarianten</p>
      <h3 class="fdu-title">Verschiedene Farben</h3>
      <p class="fdu-text">RAL 7016 Anthrazit, RAL 9005 Tiefschwarz…</p>
    </div>
  </article>
</div>
```

```css
.fdu-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 3.5rem; margin: 1.5rem 0 2.5rem;
}
.fdu-card { display: flex; flex-direction: column; }
.fdu-photo {
  width: 100%; overflow: hidden; flex-shrink: 0;
  background: var(--color-graphite-900); border-radius: var(--radius-lg);
}
.fdu-photo img { width: 100%; height: auto; display: block; }
.fdu-body { padding: 1.25rem 0 0; display: flex; flex-direction: column; gap: 0.75rem; }
.fdu-label {
  font-size: 0.75rem; font-weight: 700; line-height: 1.4; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--color-teal); margin: 0;
}
.fdu-title {
  font-size: 1.5rem; font-weight: 700; line-height: 1.18;
  letter-spacing: -0.01em; color: var(--color-digital-black); margin: 0;
}
.fdu-text { font-size: 1rem; line-height: 1.65; color: var(--color-graphite-700); margin: 0; }
.fdu-list {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 0.5rem;
}
.fdu-list li {
  display: flex; align-items: flex-start; gap: 0.625rem;
  font-size: 1rem; line-height: 1.5; color: var(--color-graphite-700);
}
.fdu-list li::before {
  content: ''; display: block; width: 0.375rem; height: 0.375rem;
  border-radius: 50%; background: var(--color-teal);
  flex-shrink: 0; margin-top: 0.5rem;
}
.fdu-list strong { color: var(--color-digital-black); font-weight: 700; }
@media (max-width: 48rem) {
  .fdu-grid { grid-template-columns: 1fr; }
  .fdu-title { font-size: 1.25rem; }
}
```

---

## Section 10 · XDM10 Hero — dark (`xh-`)

**What:** Full-width dark gradient hero (1:1 port of the 2-Draht-BUS landing): ambient mint glow, embedded light breadcrumb, mint eyebrow, Display-3 headline with italic thin dash, outline badges, lead, primary CTA; product image absolutely positioned right. `min-height: 48rem` on desktop.
**When:** Top of dark campaign/system landing pages. Max one per page; the standard breadcrumb bar is omitted (breadcrumb is embedded).

```html
<section class="xh-hero" aria-label="XDM10 — Hero">
  <div class="xh-ambient1" aria-hidden="true"></div>
  <div class="xh-ambient2" aria-hidden="true"></div>
  <nav class="xh-breadcrumbs" aria-label="Breadcrumb">
    <div class="xh-breadcrumbs-inner">
      <a href="#">Startseite</a>
      <span class="sep" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg></span>
      <a href="#">Sprechanlagen</a>
      <span class="sep" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg></span>
      <span class="current">2-Draht-BUS System</span>
    </div>
  </nav>
  <div class="xh-grid">
    <div class="xh-center">
      <span class="xh-eyebrow">2-Draht-BUS System</span>
      <div class="xh-h1">XDM10 <span class="dash">–</span> Smartes Upgrade für Ihre vorhandene Verkabelung</div>
      <div class="xh-badges">
        <span class="xh-badge">Powered by <strong>HIKVISION</strong></span>
        <span class="xh-badge">Designed in Germany 🇩🇪</span>
      </div>
      <p class="xh-desc">Die XDM10 nutzt die vorhandene Verkabelung, um alte Klingel- oder Sprechanlagen ohne neue Kabel in ein modernes System mit App-Anbindung zu verwandeln…</p>
      <div class="xh-actions">
        <a href="#" class="xh-btn xh-btn-primary xh-btn-lg">Zur Produktauswahl <!-- arrow svg --></a>
      </div>
    </div>
    <div class="xh-product">
      <img src="xdm10-hero.webp" alt="Metzler XDM10 Video-Türsprechanlage"/>
    </div>
  </div>
</section>
```

```css
.xh-hero{position:relative;overflow:hidden;background:var(--color-black);background-image:linear-gradient(90deg,var(--color-teal-700) 0%,#011a1b 35%,#050505 70%,var(--color-black) 100%);display:flex;flex-direction:column;min-height:0;color:var(--color-white);font-family:var(--font-family);}
@media(min-width:48rem){.xh-hero{min-height:48rem}}
.xh-ambient1{position:absolute;inset:0;background:radial-gradient(ellipse at 80% 50%, rgba(92,219,211,0.07) 0%, transparent 55%);pointer-events:none;}
.xh-ambient2{position:absolute;inset:0;background:radial-gradient(ellipse at 100% 100%, var(--color-black) 0%, transparent 70%);pointer-events:none;}
.xh-grid{position:relative;z-index:10;flex:1;display:grid;grid-template-columns:repeat(12,1fr);gap:1rem;align-content:center;padding:2.5rem 1.5rem;max-width:100rem;width:100%;margin:0 auto;box-sizing:border-box;}
@media(min-width:48.0625rem){.xh-grid{padding:3rem 3rem}}
.xh-center{grid-column:span 12;position:relative;z-index:20;max-width:44%;}
@media(max-width:48rem){.xh-center{max-width:100%}}
@media(min-width:48.0625rem) and (max-width:80rem){.xh-center{max-width:54%}.xh-product{width:44%}.xh-grid{padding-top:5rem}}
.xh-breadcrumbs{position:absolute;top:1.75rem;left:0;right:0;z-index:25;font-size:0.875rem;line-height:1;}
.xh-breadcrumbs-inner{max-width:100rem;margin:0 auto;padding:0 3rem;display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;color:rgba(255,255,255,0.65);}
@media(max-width:48rem){.xh-breadcrumbs{position:static;padding-top:1.5rem}.xh-breadcrumbs-inner{padding:0 1.5rem}}
.xh-breadcrumbs a{color:rgba(255,255,255,0.65);text-decoration:none;transition:color 0.2s ease}
.xh-breadcrumbs a:hover{color:var(--color-white)}
.xh-breadcrumbs .sep{display:inline-flex;align-items:center;color:rgba(255,255,255,0.45)}
.xh-breadcrumbs .sep svg{width:0.875rem;height:0.875rem}
.xh-breadcrumbs .current{color:var(--color-white);font-weight:500}
.xh-eyebrow{display:block;font-size:0.75rem;font-weight:700;line-height:1.4;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-mint);margin-bottom:1rem;}
.xh-h1{font-weight:700;font-size:3rem;/* Display 3 */line-height:1.0;letter-spacing:-0.03em;margin:0;color:var(--color-white);}
.xh-h1 .dash{font-style:italic;font-weight:300}
.xh-badges{display:flex;flex-wrap:wrap;gap:0.625rem;margin-top:1.5rem}
.xh-badge{display:inline-flex;align-items:center;gap:0.375rem;padding:0.375rem 0.75rem;border-radius:var(--radius);border:0.0625rem solid rgba(255,255,255,0.2);font-size:0.75rem;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,0.7);}
.xh-badge strong{font-weight:700;color:var(--color-white);letter-spacing:0.08em}
.xh-desc{margin-top:1.5rem;max-width:34rem;font-size:1rem;color:rgba(255,255,255,0.78);line-height:1.6;}
.xh-actions{margin-top:2rem;display:flex;gap:1rem}
.xh-actions .xh-btn{flex:1;text-align:center}
.xh-product{grid-column:span 12;}
@media(min-width:48rem){.xh-product{position:absolute;right:3rem;top:3rem;bottom:3rem;width:48%;max-width:38rem;z-index:0;display:flex;align-items:center;justify-content:flex-end;}.xh-product img{max-width:72%;max-height:72%;width:auto;height:auto;object-fit:contain;object-position:right center;display:block;}}
@media(min-width:64rem){.xh-product{width:50%;max-width:45rem}}
@media(min-width:90rem){.xh-product{width:50%;max-width:50rem}}
.xh-product img{position:relative;width:100%;height:auto;}
.xh-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;height:2.625rem;padding:0.7rem 1.2rem;border-radius:var(--radius);font-family:var(--font-family);font-size:1rem;font-weight:500;white-space:nowrap;line-height:1.2;cursor:pointer;transition:background 0.15s ease;text-decoration:none;border:none;}
.xh-btn-lg{height:3.125rem;font-size:1.1rem;font-weight:600;padding:0.7rem 1.75rem}
.xh-btn-primary{background:var(--color-teal);color:var(--color-white)}
.xh-btn-primary:hover{background:var(--color-teal-600)}
```

*Dark breadcrumb rule:* on dark heroes the breadcrumb uses the same chevron separator as the standard breadcrumb bar, in white opacities — links `rgba(255,255,255,0.65)`, chevron `rgba(255,255,255,0.45)`, current item white/500. Identical spec in Section 13 (`abt-crumb`). Never a text `/` separator.

*Port exceptions (intentional, keep inside this section only):* "Designed in Germany" uses the 🇩🇪 emoji (Product Hero uses the `.ph-flag-strip` instead); button heights 2.625/3.125rem differ from the `.btn` system (2.75/3.25rem); gradient mid-stops `#011a1b`/`#050505` are non-token deep-dark blends.

---

## Section 11 · In drei Schritten (`steps3-`)

**What:** Centered intro (eyebrow, Display-4 heading, lead) + 3 numbered process columns: giant teal number, icon badge, H4 title, short divider, body — columns separated by vertical hairlines.
**When:** Landing pages to explain installation/setup in three steps.
**Layout:** 3 columns with left hairlines → single column (no hairlines, 2.5rem gaps) below 48rem.

```html
<section class="section section--color-white">
  <div class="container">
    <div class="steps3-intro">
      <p class="steps3-eyebrow">So einfach geht's</p>
      <h2 class="steps3-title">In drei Schritten zur XDM10</h2>
      <p class="steps3-lead">Alte Anlage raus, neue rein — ohne Stemmen, ohne Neuverkabelung. Die XDM10 nutzt Ihre bestehende 2-Draht-Leitung.</p>
    </div>
    <div class="steps3-grid">
      <div class="steps3-step">
        <div class="steps3-num">01</div>
        <span class="steps3-icon"><!-- SVG icon, 1.25rem, stroke 1.8 --></span>
        <h3 class="steps3-heading">Alte Anlage demontieren</h3>
        <div class="steps3-rule"></div>
        <p class="steps3-text">Alte Türstation und Innenstationen abschrauben. Die vorhandenen 2-Draht-Leitungen bleiben in der Wand — genau so, wie sie sind.</p>
      </div>
      <!-- Repeat <div class="steps3-step"> × 3 -->
    </div>
  </div>
</section>
```

```css
.steps3-intro { max-width: 48rem; margin: 0 auto 2.5rem; text-align: center; }
.steps3-eyebrow {
  font-size: 0.75rem; font-weight: 700; line-height: 1.4; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--color-teal); margin: 0 0 0.75rem;
}
.steps3-title {
  font-size: 2.875rem; /* Display 4 */ font-weight: 700; letter-spacing: -0.02em;
  line-height: 1.15; color: var(--color-digital-black); margin: 0 0 0.75rem;
}
.steps3-lead { font-size: 1rem; color: var(--color-graphite-700); line-height: 1.6; margin: 0; }

.steps3-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
.steps3-step { padding: 0 2rem; }
.steps3-step + .steps3-step { border-left: 0.0625rem solid var(--color-graphite-200); }
.steps3-num {
  font-size: 2.75rem; font-weight: 700; color: var(--color-teal);
  line-height: 1; letter-spacing: -0.02em; margin-bottom: 1.25rem;
}
.steps3-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 2.5rem; height: 2.5rem; border-radius: var(--radius-lg);
  background: rgba(1,82,83,0.08); color: var(--color-teal);
}
.steps3-icon svg { width: 1.25rem; height: 1.25rem; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.steps3-heading { font-size: 1.125rem; font-weight: 700; color: var(--color-digital-black); margin: 0.875rem 0 0; }
.steps3-rule { width: 2rem; height: 0.0625rem; background: var(--color-graphite-300); margin: 0.875rem 0; }
.steps3-text { font-size: 0.875rem; color: var(--color-graphite-700); line-height: 1.6; margin: 0; }

@media (max-width: 48rem) {
  .steps3-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .steps3-step { padding: 0; }
  .steps3-step + .steps3-step { border-left: none; }
  .steps3-title { font-size: 1.75rem; }
}
```

*Note:* `.steps3-num` at 2.75rem is a display size specific to this section (between h1 and Display-4) — keep it, don't reuse elsewhere.

---

## Section 12 · Technische Daten — Spec-Callouts (`spec-`)

**What:** Centered Display-4 heading, then a central product image flanked by spec callouts left and right (icon badge + overline label + bold value + description). Left column right-aligns toward the image on desktop.
**When:** Product/landing pages as the visual spec summary; the full specs **table** (FOR-CLAUDE.md §20) still follows for complete data.
**Layout:** `1fr auto 1fr` → single column below 48rem (all items left-aligned, image between).

```html
<section class="section section--color-white">
  <div class="container">
    <h2 class="spec-title">Technische Daten</h2>
    <div class="spec-layout">
      <div>
        <div class="spec-item spec-item--left">
          <span class="spec-icon"><!-- SVG icon, 1.25rem, stroke 1.7 --></span>
          <div>
            <div class="spec-label">Kamera</div>
            <h4 class="spec-value">3 MP Kamera mit WDR</h4>
            <p class="spec-desc">Sichtfeld 133° × 82° · Videokompression H.264 · IR-Zusatzlicht.</p>
          </div>
        </div>
        <!-- Repeat .spec-item--left × 4 -->
      </div>
      <figure class="spec-figure">
        <img src="xdm10-detail.webp" alt="Metzler XDM10 Detail"/>
      </figure>
      <div>
        <div class="spec-item">
          <span class="spec-icon"><!-- SVG icon --></span>
          <div>
            <div class="spec-label">Stromversorgung</div>
            <h4 class="spec-value">48 V über XDM10-VT4 · alternativ 12 V DC</h4>
            <p class="spec-desc">Stromverbrauch ≤ 6 W · Türsteuerung Relaisausgang 30 V DC / 1 A.</p>
          </div>
        </div>
        <!-- Repeat .spec-item × 4 -->
      </div>
    </div>
  </div>
</section>
```

```css
.spec-title {
  font-size: 2.875rem; /* Display 4 */ font-weight: 700; letter-spacing: -0.02em;
  line-height: 1.15; color: var(--color-digital-black);
  text-align: center; margin: 0 0 2.5rem;
}
.spec-layout {
  display: grid; grid-template-columns: 1fr auto 1fr;
  gap: 2.5rem; align-items: center;
}
.spec-item {
  display: flex; gap: 0.875rem; align-items: flex-start;
  margin-bottom: 1.75rem;
}
.spec-item--left { flex-direction: row-reverse; text-align: right; }
.spec-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 2.5rem; height: 2.5rem; flex-shrink: 0;
  border-radius: var(--radius-lg);
  background: rgba(1,82,83,0.08); color: var(--color-teal);
}
.spec-icon svg { width: 1.25rem; height: 1.25rem; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.spec-label {
  font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--color-graphite-600); margin-bottom: 0.25rem;
}
.spec-value { font-size: 1rem; font-weight: 700; color: var(--color-digital-black); margin: 0 0 0.25rem; line-height: 1.3; }
.spec-desc { font-size: 0.875rem; color: var(--color-graphite-600); line-height: 1.55; margin: 0; }
.spec-figure { margin: 0; display: flex; justify-content: center; }
.spec-figure img { width: 100%; max-width: 16rem; height: auto; display: block; }

@media (max-width: 48rem) {
  .spec-layout { grid-template-columns: 1fr; gap: 1.5rem; }
  .spec-item--left { flex-direction: row; text-align: left; }
  .spec-figure img { max-width: 14rem; }
  .spec-title { font-size: 1.75rem; }
}
```

---

## Section 13 · About Hero — Split (`abt-`)

**What:** Über-uns hero (1:1 port): digital-black band, 2-column split — copy left (mint kicker, Display-3 two-line H1, white uppercase chips, sub, two CTAs) with embedded white breadcrumb (chevron SVG), building photo right with slow hover zoom.
**When:** Top of the company/Über-uns page. Breadcrumb is embedded — omit the standard breadcrumb bar.
**Layout:** copy `min(44%+1rem, 41.25rem)` | photo, fixed 37.5rem height → stacks below 1280px (photo on top, edge-to-edge) → 3:2 photo below 768px.

```html
<section class="abt-hero" aria-label="Metzler Hauptsitz in Reutlingen">
  <nav class="abt-crumb" aria-label="Breadcrumb">
    <div class="abt-container">
      <ol>
        <li><a href="#">Home</a></li>
        <li aria-hidden="true"><!-- chevron svg 9 6 → 15 12 → 9 18 --></li>
        <li><span aria-current="page">Über uns</span></li>
      </ol>
    </div>
  </nav>
  <div class="abt-hero__primary abt-container">
    <div class="abt-hero__copy-col">
      <div class="abt-hero__copy">
        <p class="abt-hero__kicker">Manufaktur seit 2013 · Reutlingen</p>
        <h1><span>Der Ausstatter für den</span><span>modernen Eingangsbereich</span></h1>
        <div class="abt-chips">
          <span class="abt-chip">VERSANDKOSTENFREI AB 99 €</span>
          <span class="abt-chip">KAUF AUF RECHNUNG</span>
        </div>
        <p class="abt-hero__sub">Spezialisiert auf Türklingeln, Sprechanlagen, Briefkästen<br>und Hausnummern – entwickelt und geprüft von eigenen Ingenieuren.</p>
        <div class="abt-hero__ctas">
          <a href="#" class="abt-btn abt-btn-primary abt-cta">Sortiment entdecken</a>
          <a href="#" class="abt-btn abt-cta abt-cta--secondary">Beratung kontaktieren</a>
        </div>
      </div>
    </div>
    <div class="abt-hero__photo-col">
      <img class="abt-hero__photo" src="office.png" alt="Metzler Hauptsitz in Reutlingen"/>
    </div>
  </div>
</section>
```

```css
.abt-container{max-width:86.25rem;margin:0 auto;padding-inline:clamp(1.5rem,4vw,3.5rem);box-sizing:border-box;}
.abt-hero{padding:0;background:var(--color-digital-black);position:relative;overflow:hidden;font-family:var(--font-family);}
.abt-crumb{position:absolute;top:0;left:0;right:0;z-index:4;background:transparent;padding-block:1rem;pointer-events:none;}
.abt-crumb ol{display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:rgba(255,255,255,0.65);margin:0;padding:0;list-style:none;width:max-content;pointer-events:auto;text-shadow:0 1px 2px rgba(0,0,0,0.35);}
.abt-crumb a{color:rgba(255,255,255,0.65);text-decoration:none;}
.abt-crumb a:hover{color:var(--color-white);}
.abt-crumb li{display:inline-flex;align-items:center;}
.abt-crumb li svg{width:0.875rem;height:0.875rem;color:rgba(255,255,255,0.45);}
.abt-crumb [aria-current]{color:var(--color-white);font-weight:500;}
.abt-hero__primary{position:relative;width:100%;display:grid;grid-template-columns:min(calc(44% + 1rem),41.25rem) 1fr;gap:clamp(1.5rem,3vw,3.5rem);height:37.5rem;align-items:stretch;overflow:visible;}
.abt-hero__copy-col{padding:0;position:relative;z-index:2;align-self:stretch;min-height:0;min-width:0;}
.abt-hero__photo-col{position:relative;padding:0;min-height:0;min-width:0;overflow:hidden;}
.abt-hero__photo{width:100%;height:100%;object-fit:cover;object-position:center;display:block;transition:transform 700ms cubic-bezier(.2,.7,.2,1);}
.abt-hero__photo-col:hover .abt-hero__photo{transform:scale(1.05);}
.abt-hero__copy{position:absolute;top:50%;left:0;transform:translateY(-50%);color:var(--color-white);display:flex;flex-direction:column;gap:0.25rem;max-width:33.75rem;}
.abt-hero__copy > *{margin:0;}
.abt-hero__kicker{margin:0 0 1.25rem;font-size:0.75rem;font-weight:700;line-height:1.4;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-mint);}
.abt-hero__copy h1{color:var(--color-white);font-size:3rem;/* Display 3 */line-height:1.0;font-weight:700;letter-spacing:-0.03em;margin:0 0 2rem;}
.abt-hero__copy h1 span{display:block;}
.abt-chips{display:flex;flex-wrap:wrap;gap:1rem;margin:0 0 1.1875rem;}
.abt-chip{display:inline-flex;align-items:center;gap:0.5rem;height:1.75rem;padding:0 0.75rem;background:var(--color-white);color:var(--color-digital-black);border-radius:var(--radius-sm);font-size:0.6875rem;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;}
.abt-hero__sub{margin:0 0 2rem;font-size:1rem;line-height:1.75;color:rgba(255,255,255,0.85);}
.abt-hero__ctas{margin-top:0;display:flex;gap:1rem;flex-wrap:wrap;}
.abt-hero__ctas .abt-btn{box-sizing:border-box;flex:1 1 0;min-width:0;}
.abt-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;height:2.625rem;padding:0.7rem 1.2rem;border-radius:var(--radius);font-family:var(--font-family);font-size:1rem;font-weight:500;line-height:1.2;white-space:nowrap;cursor:pointer;text-decoration:none;transition:background .15s,border-color .15s,color .15s;border:none;}
.abt-cta{justify-content:center;font-size:1rem;padding-inline:2rem;}
.abt-btn-primary{background:var(--color-teal);color:var(--color-white);}
.abt-btn-primary:hover{background:var(--color-teal-600);}
.abt-cta--secondary{color:var(--color-white);background:rgba(0,0,0,0.35);backdrop-filter:blur(2px);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,0.78);transition:box-shadow .18s,background .18s;}
.abt-cta--secondary:hover{background:rgba(255,255,255,0.10);box-shadow:inset 0 0 0 1.5px var(--color-white);}
@media(max-width:79.9375rem){ /* <1280px */
  .abt-hero__primary{grid-template-columns:1fr;grid-template-rows:auto auto;height:auto;row-gap:0;}
  .abt-hero__copy{position:static;transform:none;padding-inline:0;padding-block:clamp(3rem,8vw,4rem);max-width:none;}
  .abt-hero__copy h1{font-size:clamp(1.75rem,4.4vw,2.5rem);max-width:none;}
  .abt-hero__photo-col{aspect-ratio:16/9;min-height:clamp(12.5rem,52vw,22.5rem);order:-1;margin-inline:calc(-1 * clamp(1.5rem,4vw,3.5rem));}
  .abt-hero__photo{object-position:center 40%;}
}
@media(max-width:47.9375rem){ /* <768px */
  .abt-hero__photo-col{aspect-ratio:3/2;}
  .abt-hero__copy{padding-block:2.5rem;}
  .abt-hero__photo{object-position:center 35%;}
  .abt-hero__copy h1{font-size:clamp(2rem,8vw,2.75rem);}
  .abt-hero__sub br{display:none;}
  .abt-hero__ctas{flex-direction:column;margin-top:2rem;}
  .abt-hero__ctas .abt-btn{flex:1 1 auto;width:100%;}
}
```

*Port exceptions:* own container (86.25rem / 1380px) instead of the global 100rem `.container`; button height 2.625rem (vs `.btn` 2.75rem); background is digital-black (vs teal-900 of `.section--dark`). Keep inside this section only.

---

## Section 14 · Craft Story — Image / Text alternating (`craft-`)

**What:** Editorial chapters — square image with corner badge and layered shadow on one side, copy column (eyebrow, two-line Display-4 headline, 1.125rem body, hairline footer with underlined text link) on the other. Chapters alternate sides via `--flip`; hairline between chapters.
**When:** Über-uns / storytelling pages, 2–4 chapters.
**Layout:** 1.1fr/0.9fr split → single column below 1024px (image on top, headline lines join with " – ").

```html
<div class="craft-wrap">
  <article class="craft-chapter">
    <div class="craft-chapter__inner">
      <div class="craft-media">
        <div class="craft-media__frame">
          <img src="paketbox.webp" alt="Metzler Paketbox mit personalisierter Gravur"/>
        </div>
        <span class="craft-media__tag">Maßanfertigung</span>
      </div>
      <div class="craft-copy">
        <p class="craft-eyebrow">Maßanfertigung · Reutlingen</p>
        <h2 class="craft-headline"><span>Ein Eingang ist nicht irgendeiner</span><span>Er ist Ihrer</span></h2>
        <p class="craft-body">Wir fertigen jedes Produkt nach Ihren Vorgaben – Abmessungen, Beschriftung, Schriftart…</p>
        <footer class="craft-footer">
          <a href="#" class="craft-link">Paketbox Bispo 2 entdecken</a>
        </footer>
      </div>
    </div>
  </article>
  <article class="craft-chapter craft-chapter--flip">
    <!-- same structure; --flip mirrors the columns (text left, image right) -->
  </article>
</div>
```

```css
.craft-wrap{padding-inline:3rem;box-sizing:border-box;font-family:var(--font-family);}
@media (max-width:48rem){.craft-wrap{padding-inline:1.5rem;}}
.craft-chapter{padding-block:clamp(3rem,6vw,5rem);}
.craft-chapter + .craft-chapter{border-top:0.0625rem solid var(--color-graphite-200);}
.craft-chapter__inner{display:grid;grid-template-columns:1.1fr 0.9fr;gap:clamp(2.5rem,5vw,5rem);align-items:center;}
.craft-chapter--flip .craft-chapter__inner{grid-template-columns:0.9fr 1.1fr;}
.craft-chapter--flip .craft-media{order:2;}
.craft-chapter--flip .craft-copy{order:1;}
.craft-media{position:relative;}
.craft-media__frame{position:relative;width:100%;aspect-ratio:1/1;overflow:hidden;border-radius:var(--radius-lg);background:var(--color-graphite-100);box-shadow:0 2px 4px rgba(0,0,0,0.06),0 16px 32px rgba(0,0,0,0.08),0 40px 80px rgba(0,0,0,0.10);}
.craft-media__frame::after{content:"";position:absolute;inset:0;border-radius:inherit;border:0.0625rem solid rgba(255,255,255,0.18);pointer-events:none;}
.craft-media__frame img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
.craft-media__tag{position:absolute;top:clamp(1.25rem,2vw,1.75rem);left:clamp(1.25rem,2vw,1.75rem);z-index:2;padding:0.5rem 0.75rem;font-size:0.6875rem;font-weight:700;line-height:1.4;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-digital-black);background:rgba(255,255,255,0.96);backdrop-filter:blur(8px);border-radius:var(--radius-sm);box-shadow:0 4px 16px rgba(0,0,0,0.08);}
.craft-copy{max-width:30rem;align-self:center;padding-block:clamp(1.25rem,3vw,3rem);}
.craft-eyebrow{margin:0 0 clamp(1.25rem,2vw,1.75rem);font-size:0.75rem;font-weight:700;line-height:1.4;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-teal);}
.craft-headline{margin:0 0 clamp(1.25rem,2vw,1.75rem);font-size:2.875rem;/* Display 4 */line-height:1.15;letter-spacing:-0.02em;font-weight:700;color:var(--color-digital-black);}
.craft-headline span{display:block;}
.craft-body{margin:0;max-width:46ch;font-size:1.125rem;line-height:1.6;color:var(--color-graphite-700);}
.craft-footer{margin-top:clamp(1.75rem,3vw,2.5rem);padding-top:clamp(1.25rem,2vw,1.75rem);border-top:0.0625rem solid var(--color-graphite-200);}
.craft-link{display:inline-block;font-size:0.875rem;font-weight:700;color:var(--color-teal);text-decoration:none;border-bottom:0.0625rem solid currentColor;padding-bottom:0.125rem;transition:opacity 220ms ease;}
.craft-link:hover{opacity:0.75;}
@media (max-width:63.9375rem){ /* <1024px */
  .craft-chapter__inner,.craft-chapter--flip .craft-chapter__inner{grid-template-columns:1fr;gap:clamp(1.75rem,6vw,2.75rem);}
  .craft-chapter--flip .craft-media{order:1;}
  .craft-chapter--flip .craft-copy{order:2;}
  .craft-copy{max-width:none;}
  .craft-body{max-width:none;}
  .craft-headline span{display:inline;}
  .craft-headline span:first-child::after{content:" – ";}
}
```

*Note:* the layered image shadow is this section's editorial signature — an intentional exception to `--shadow-card`. Keep inside this section only.

---

## Maintenance — how to add or change a section

Follow this protocol **every time** a section is added or revised. It keeps the kit, the code samples, and this file from drifting apart (that has happened before — see the old `nf-*` vs `nfs-*` mismatch).

### Step 1 — Build it in the kit first (`index.html` → `SectionsPage`)

The rendered SectionsPage is the single source of truth. A section that exists only in a page file or only in an md file does not count.

1. Add a nav entry in `sectionsNav` (use an existing `group` or add a new one).
2. Copy the standard section wrapper: `<div id="sec-…">` with the `Section NN` overline, `h2` title, and a **one-sentence description ending with "Used on …"** — that sentence becomes the "When" line in this file.
3. Build the live preview. Rules:
   - Colors only via `T.*` constants — **never a new raw hex**. If a genuinely new value is unavoidable: first add it to `metzler-tokens.css`, then to `T`, then to `cssVarMap` in `index.html`, then to the token block in `FOR-CLAUDE.md`. Four places, always all four.
   - All dimensions in rem (1px hairlines as 0.0625rem). Type sizes only from the FOR-CLAUDE.md scale.
   - Eyebrow pattern: 0.75rem / 700 / 0.15em / uppercase / teal (mint on dark).
   - Icons: inline SVG, stroke 1.8 (1.7 ok for dense spec icons), round caps/joins; icon badge 2.5rem with `var(--radius-lg)` (0.625rem only in the `nfs-` grid).
   - Carousel/slider arrows: square with `var(--radius)`, never circular.
   - Pick a unique class prefix; never reuse another section's prefix.
   - Mobile first in behavior: every section must collapse cleanly at 48rem (and 35/30rem if dense).
4. Add `CodeBlock` HTML + CSS samples **that match the live preview exactly** — same class names, same values, but written with canonical `var(--color-*)` names (never `--teal`, `--g-800`, `--color-dblack`).

### Step 2 — Update the CHANGELOG in `index.html`

Bump `CHANGELOG.version` and add an entry describing the new/changed section.

### Step 3 — Sync this file (`SECTIONS.md`)

Tell Claude: **"Sync SECTIONS.md with the kit's SectionsPage"** — or do it by hand:

1. Add/replace the section's chapter here using the same template: What / When / Layout, HTML block, CSS block, deviation notes.
2. The CSS here must equal the kit's rendered CSS (tokenized). If the section is a 1:1 port with intentional rule deviations, list them under a *Port exceptions* note instead of silently normalizing them.
3. Update the **Page blueprints** if the section changes what a page type looks like.
4. Update the version line at the top of this file.

### Step 4 — Consistency checklist (run mentally before committing)

- [ ] No new hex values outside `metzler-tokens.css` (glows/media-placeholders documented as exceptions).
- [ ] No px except inside comments; rem everywhere.
- [ ] No font sizes outside the FOR-CLAUDE.md scale (document a deviation note if a port needs one).
- [ ] Code samples byte-for-byte consistent with the live preview values.
- [ ] Canonical token names everywhere (`--color-graphite-200`, not `--color-g200`).
- [ ] Section has a "Used on …" description sentence.
- [ ] Dark sections use mint for eyebrows/links, never teal-on-dark.
- [ ] FOR-CLAUDE.md untouched unless a *global* rule changed — section-level detail lives here.
