# Handoff — VDM10 PDP, Version B (above-the-fold / buy box)

Session handoff so a new session can continue seamlessly. Focus this session: the
**Version B** above-the-fold buy box + inline configurator in `index-b.html`.

## Files & how to run
- Edit: `index-b.html`, `pdp-b.css`, `pdp-b.js` (Version B). Shared tokens/hero base: `pdp.css`.
- **Cache-bust query strings** — bump `?v=N` in BOTH `index-b.html` and `index.html` after editing a shared file, or the browser serves stale CSS/JS. Current: `pdp-b.css?v=63`, `pdp-b.js?v=30`, `pdp.css?v=12`.
- Preview: static server at the Desktop root → `http://localhost:8793/PDP%20METZLER/index-b.html` (launch.json name `pdp-selfcontained`, python http.server).
- Verify via `read_page` / `javascript_tool` — the in-app Browser pane's **screenshots hang**, and its viewport intermittently glitches to 0/267px (a pane bug, not the layout; re-`resize_window` to 1280 to check desktop).

## What was changed this session (Version B buy box)
- **Step ribbon** (`#bSeg`, `.cfgb-dock`): full-bleed chevrons at the card top, no corner radius; each step is `number · label` **horizontal** with a middot `·` divider; states — ahead = grey, done = dark teal `--color-teal` (white text), current = light green `#CDE7E2` (dark text). Last step (Zubehör) flips to **done** once an extra is selected (`lastDone` in `updateDock`). `aria-current="step"` kept.
- **Config flow** (`pdp-b.js`): removed the auto-advance-on-select; wired the in-step "Weiter" (`[data-next]`) buttons. Quantity steppers on Innenstation, **Strom (added `#bStromQtyWrap`)**, and Zubehör — NOT on Anschluss (the "cable") or Gravur. `applyQty`/price already handle `stromQty`.
- **Gravur**: compact radio rows (`.cfg-opts--rows`) instead of image tiles.
- **Option thumbs** (`.cfgb .cfg-opt__thumb`): square, no border, no grey bg, image `object-fit: cover` fills edge-to-edge (all product imgs are 1200×1200 square). Zubehör qty sits **inside** the card (`.cfg-choice` is the card).
- **Colour swatches** (`.bx-swatches`): single row of 8; per-swatch text labels removed (felt overwhelming) — the selected name shows in the "Ausführung — …" header, updated on **tap** (no hover reliance, mobile-safe). All swatches have a `graphite-300` border; selected = same border **recoloured teal at 2px** (no extra ring).
- **Key-facts** (`.pdp-specs`): minimal, icon-less, box-less; labels `graphite-600` (matches "63 Bewertungen"), values 600-weight; **Artikelnummer right-aligned**; responsive `auto-fit` (3 cols desktop → 2 mobile, no clipping). NOTE: base `.pdp-specs dt/dd` still live in `pdp.css` for Version A — the B rules are scoped `.pdp-b .pdp-specs__*` to win.
- **Title**: lives in the buy box (NOT full-width page); greedy `text-wrap: wrap`; loosened to ~19px / line-height 1.35 / normal tracking.
- **Price**: the `.pdp-price` (ab-price + USt + availability) moved to after the "Preisdetails & Menge" bar and merged into one live block — the duplicate `.cfgb-price` was removed and `#bTotal` (live total) relocated onto `.pdp-price__amount` (dropped the "ab"). Bump animation rewired to `.pdp-price__amount.is-bump`.
- **Quantity box** beside the CTA (cart icon removed); − disables at qty 1; buttons `height:100%` (a base `.cfg-opt__qty button{height:1.75rem}` was making them half-height/top-aligned).
- **Share**: "Teilen" is now an interactive popover menu — Link kopieren (clipboard + inline "kopiert!" feedback), E-Mail, WhatsApp. Caret centred under the button, `shareIn` entrance animation, unified with the button (8px radius, graphite-300 borders, teal accent). `.bx-cred` gets `is-sharing` (z-index 60) while open to escape its transform stacking context.
- Dividers/`--ink-60` = `rgba(0,0,0,0.6)` for title `|` seps + "Schritt X von 5" + step-number. Buy-box vertical gap raised to `1.6rem` (was cramped). Payment-logo borders removed. Selected-option grey (`teal-50`) card fill removed.
- Sticky bar product thumbnail removed.

See [[pdp-b-css-gotchas]] for the recurring traps (undefined tokens from pdp.css :root, stranded CSS transitions inside transformed/just-shown containers → snap instead of transition).

## Not done / likely next
- Version A (`index.html`) untouched this session.
- Below-the-fold content sections + mobile pass still pending (per `README.md` "next steps").
