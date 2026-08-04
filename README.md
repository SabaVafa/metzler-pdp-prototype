# Metzler VDM10 — PDP Redesign Prototype

Front-end prototype for the redesigned **Metzler VDM10 2.0 Video-Türsprechanlage (Colson)** product detail page. It reworks two friction points found on the live site:

1. **CTA confusion** — on the live site the buy button morphs through "Bitte Farbe wählen" → "Jetzt anpassen" → "In den Warenkorb". Here the primary CTA stays visible and is *locked* until the required steps are answered.
2. **Buried configuration / technical info** — the buy box uses an inline, progressive-disclosure configurator instead of an overlay wizard.

Static **HTML/CSS/JS — no build step, no dependencies, no backend.** All interactions (configurator, colour/variant selection, price, add-to-cart) are faked client-side.

---

## Run it

Any static file server from the repo root, e.g.:

```bash
python -m http.server 8125
# → http://localhost:8125/index.html
```

(or `npx serve`, or just open `index.html` in a browser). The repo is **self-contained** — the design-system chrome and all imagery are vendored in.

---

## Structure

```
index.html                   the PDP page
chrome.css / chrome.js        shared header · nav · mega-menu · footer
pdp.css                       shared hero / layout base
pdp-b.css / pdp-b.js          PDP sections + inline configurator + modals
Home/                         vendored design-system CSS, icons, logos, payment + trust badges
Poster/  Product Image/  Description/  Technik/  Reviews/  ICONS/  assets/   imagery
Design SYSTEM/                tokens, section catalog, rules (metzler-tokens.css, SECTIONS.md)
vdm10-configurator-data.md    real configurator data (options, prices, article numbers)
metzler-content-briefing.md   copy / content facts (DE)
figma-swatches-and-assets.md  swatch spec + asset map
CHROME-COMPONENTS.md          how the shared chrome was extracted
```

CSS/JS are cache-busted via `?v=N` query strings in `index.html` — bump the number when editing so browsers/Pages pick up changes.

---

## Conventions

- **German (DE)** copy throughout; **Sie**-form, premium tone.
- **Design-system tokens only** (Metzler UI Kit): teal `var(--color-teal)` `#015253`, Helvetica-Neue system stack, **rem** units, container **100rem** (1600px), cards `--radius-lg`, modals `--radius-xl`.
- Content rules: *Designed in Germany* (never "Made in"), Garantie always linked, "Powered by Hikvision".
- Placeholder prices/dates are clearly marked (`TT.MM.` etc.).

---

## Notes for the developer

- The configurator, cart, and price are **client-side mockups** — wire them to real product/variant/pricing data when integrating (see `vdm10-configurator-data.md` for the data model).
- Colour is a **variant** (own Artikelnummer); it appears in the product title only once selected.
- The content sections (Beschreibung, Bewertungen, Downloads, Technische Details, Frage zum Artikel) are bespoke — they reuse DS *tokens/chrome*, not the DS section blueprint. See the audit notes in the commit history for DS-compliance status.
- Responsive: mobile-first; the question modal is a keyboard-aware bottom sheet on mobile.
