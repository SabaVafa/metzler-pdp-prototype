# PDP Chrome — grabbed components

Shared page chrome for the new PDP, extracted from the existing PLP
(`../PLP/briefkasten.html`) and the Metzler design system (`../Home/`).
Verified rendering end-to-end (topbar, header, nav strip, mega-menu,
mobile nav, footer) — see notes below.

## What was grabbed

| Component            | Source                                   | Lands in            |
| -------------------- | ---------------------------------------- | ------------------- |
| SVG icon sprite      | `PLP/briefkasten.html` (13–33)           | `index.html`        |
| Topbar (trust strip) | `PLP/briefkasten.html` (35–50)           | `index.html`        |
| Header + search      | `PLP/briefkasten.html` (52–76)           | `index.html`        |
| Nav strip + 2 mega panels | `PLP/briefkasten.html` (77–223)     | `index.html`        |
| Mobile slide-in nav  | `PLP/briefkasten.html` (225–247)         | `index.html`        |
| Footer               | `PLP/briefkasten.html` (450–560)         | `index.html`        |
| Chrome behaviour (5 IIFEs) | `PLP/briefkasten.html` inline `<script>` | `chrome.js`   |
| Mega-menu styles     | `PLP/plp.css` (884–1090)                 | `chrome.css`        |

## Styling model

- **Design system reused as-is** via `<link href="../Home/styles-v2.css">`.
  It already carries topbar / header / `header__nav` / mobile-nav / footer
  and all their mobile/tablet/desktop responsive rules — single source of truth.
- **`chrome.css`** carries only the mega-menu dropdown, which was the one chrome
  piece defined outside the design system (it lived in `plp.css`).
- **`chrome.js`** carries: mobile/tablet nav toggle · scroll-shrink
  (`body.is-scrolled`) · tablet nav-fit · rich mega-menu (intent hover / click /
  keyboard / ARIA) · 3-tier responsive search placeholder.

## Path / serving requirement

The markup references sibling folders: `../Home/...` (design system, logos,
icons, footer badges, payment logos) and `../PLP/...` (mega-tile product images
+ posters). **Serve from the `Desktop/` parent** (the common root of `Home`,
`PLP`, `PDP METZLER`) or open via `file://` — a server rooted inside
`PDP METZLER/` will 404 the `../` assets (path traversal above web root).

Local preview used: `python -m http.server 8124 --directory ..` → open
`http://localhost:8124/PDP%20METZLER/index.html`.

## Next step

Build the PDP detail layout inside the `<main>` placeholder in `index.html`.
Carry the friction fixes from the layout teardown (progressive-disclosure
configurator, sticky add-to-cart, engraving text shown in the order summary).
