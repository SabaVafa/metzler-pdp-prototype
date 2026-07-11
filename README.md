# Metzler VDM10 — PDP Redesign Prototype

Front-end prototype for the redesigned **Metzler VDM10 2.0 Video-Türsprechanlage (Colson)** product detail page. Two switchable versions explore different solutions to two friction points found on the live site:

1. **CTA confusion** — users can't find *In den Warenkorb*; today it morphs through "Bitte Farbe wählen" → "Jetzt anpassen" → "In den Warenkorb".
2. **Buried configuration / technical info** — the highly customizable product overwhelms the buy box.

Static HTML/CSS/JS — **no build step, no dependencies, no backend.** Interactions (configurator, add-to-cart, price) are faked client-side.

---

## Run it

Any static server from the repo root:

```bash
python -m http.server 8125
# → http://localhost:8125/index-b.html   (Version B, current focus)
# → http://localhost:8125/index.html      (Version A)
```

Or just open `index.html` / `index-b.html` in a browser. A floating **A / B switcher** (bottom-left) toggles between the two.

The repo is **self-contained** — the used design-system chrome and imagery are vendored in (`Home/`, `Poster/`, `Product Image/`, `assets/swatches/`).

---

## The two versions

| | **A — `index.html`** | **B — `index-b.html`** *(focus)* |
|---|---|---|
| Configurator | Immersive **overlay** wizard (6 steps, tab-stepper, context-aware preview) | Inline **progressive-disclosure** stepper-accordion in the buy box |
| Colour | in-flow variant | **variant** — sits outside config, changes the Artikelnummer |
| Configuration | guided, mandatory | **required** (Gravur · Innenstation · Zubehör), each must be answered |
| Buy CTA | destination-named, sticky | **always visible**, *locked (Ghost & Guide)* until the required steps are answered; sticky bottom bar whenever the in-flow CTA is off-screen |

Both share the live-faithful chrome (header/nav/footer), ~1380px container, design-system tokens, and photo-tile finish swatches.

---

## Structure

```
index.html / index-b.html   Version A / B pages
chrome.css / chrome.js       shared header · nav · mega-menu · footer
pdp.css / pdp.js             shared hero + Version A configurator
pdp-b.css / pdp-b.js         Version B configurator
Home/                        vendored design-system CSS, icons, logos, payment + trust badges
Poster/  Product Image/  assets/swatches/   imagery
Design SYSTEM/               tokens, section catalog, rules (metzler-tokens.css, FOR-CLAUDE.md, SECTIONS.md)
metzler-content-briefing.md  copy / content rules
prototype-playbook.md        prioritized idea bank
competitor-research.md       DoorBird · Keilbach · Apple · Tesla · Porsche notes
figma-swatches-and-assets.md swatch spec + asset map
CHROME-COMPONENTS.md         how the chrome was extracted
```

---

## Conventions

- **German (DE)** copy throughout; **Sie**-form, premium tone.
- Design-system tokens only — teal `#015253`, hover `#006d75`, Helvetica-Neue stack, rem units.
- Content rules: *Designed in Germany* (never "Made in"), Garantie always linked, "Powered by Hikvision".
- Placeholder prices/dates are clearly marked (`*Ratenwert Platzhalter`, `TT.MM.`).

---

## Status & next steps

**Done:** chrome, above-the-fold hero, and the Version B configurator (variant colour, required progressive-disclosure config, Ghost & Guide locked CTA, persistent add-to-cart).

**Next:** stacked content sections below the hero (feature bar → 9-feature grid → feature details → door-opening slider → objection Q&As → spec callouts → support → FAQ → CTA band), a sticky in-page section-nav, and a mobile pass.
