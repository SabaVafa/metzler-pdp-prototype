# Handoff — Metzler VDM10 PDP · Version B

Continuation notes for a new session. Read this first, then `git log --oneline -20`.

## Project
Prototype redesign of the Metzler VDM10 2.0 Colson product page.
- **Version B** = `index-b.html` + `pdp-b.css` + `pdp-b.js` (the one we work on). Shares the `pdp.css` base.
- **Version A** = `index-a.html` (reference only).
- Repo: `SabaVafa/metzler-pdp-prototype`. Working branch: **`version-b-buybox-redesign`**.
- **HEAD (branch = main) = `6abe79d`.** Current assets: **`pdp-b.css?v=254`**, **`pdp-b.js?v=73`**.

## ⚠️ GitHub Pages is UNPUBLISHED (site intentionally hidden)
The user asked to take the live link offline. Pages was disabled via
`gh api -X DELETE repos/SabaVafa/metzler-pdp-prototype/pages`.
- The live URL `https://sabavafa.github.io/metzler-pdp-prototype/` currently **404s** — this is intended.
- We still commit to the branch AND fast-forward `main` each save, but **nothing deploys** while Pages is off.
- **To bring it back live:** re-enable in Settings → Pages (source: `main` / root), or via API. Then it serves the latest `main`.
- Repo is still **public** (code visible on github.com; only the rendered site is off).

## Save/deploy flow (every change)
1. Bump `?v=` on **both** `pdp-b.css` and `pdp-b.js` in `index-b.html` when you edit them (browser caches assets hard; the HTML itself has no version — force-fetch in the pane with `?r=<n>`).
2. `git add index-b.html pdp-b.css pdp-b.js && git commit`
3. `git push origin version-b-buybox-redesign`
4. `git checkout main && git merge --ff-only version-b-buybox-redesign && git push origin main && git checkout version-b-buybox-redesign`
   (Harmless while Pages is off; keeps main in sync for when it's re-enabled.)
- User's cadence: they say **"push and commit"** to save; do the full flow above.

## Local preview / pane limitations (IMPORTANT)
- Static server: `python -m http.server 8000` in the project dir; preview `http://localhost:8000/index-b.html`.
- The in-app **Browser pane is unreliable all session**: screenshots time out / render blank or zoomed; it **does not advance CSS transitions, scroll, `scrollTo`, anchor jumps, or reliably fire IntersectionObserver/rAF**, and its viewport sometimes resets to a tiny width (vw 0/279).
- **Verify via `javascript_tool` DOM/computed-style reads**, not screenshots. To test transition-based CSS, temporarily set `transition:none` and read computed values. Resize the pane to a real width (e.g. 1440) before measuring layout.

## What's on the page now (top → bottom)
1. **Hero** — media gallery (left, sticky; strip of 30 thumbnails, "Alle 30 Bilder ansehen" → full-screen lightbox) + buy box (colour-gated config, price block, "Preisdetails & Menge" accordion, delivery table, feature card with the two white trust-badge chips).
2. **Reviews** (`#bewertungen`, `.rv`) — **standalone, right after the hero, NOT a tab.** One merged panel: tinted summary zone (4,5 score, "N Sterne" distribution bars, "Alle 63 Bewertungen ansehen" ghost CTA) + featured testimonial (customer photo + pull-quote) with a photo-thumbnail nav row (prev/next square arrows + "WEITERE BEWERTUNGEN MIT FOTO" label).
3. **Product-info sticky scroll-spy nav** (`.psx-nav`, `#psxNav`) — pins at `top:64px` (under the 65px site header), **4 tabs**: Beschreibung · Downloads (7) · Technische Details · Frage zum Artikel. Highlights the active section on scroll; scrolls as a chip bar on mobile. Tab gap `clamp(1.75rem,4vw,3.75rem)`.
4. **Beschreibung** (`#sx-beschreibung`, `.psx-story`) — **pinned scrollytelling prototype**: sticky image (left, `position:sticky`) that cross-fades through 3 images as 3 text "scenes" (01/02/03) scroll past on the right; then a benefits grid. No scroll-jacking (sticky only), so the scroll-spy nav is unaffected. *User is evaluating this vs the simpler two-image/text-row layout it replaced.*
5. **Downloads** (`#sx-downloads`) — 7 PDF download cards.
6. **Technische Details** (`#sx-technik`) — 4 grouped spec tables (values are placeholder-ish; not yet locked to real datasheet).
7. **Frage zum Artikel** (`#sx-frage`, `.faq`) — ported from the produktionsprozess page: sticky `.faq__support` aside (heading + "Zum Kundensupport" btn + hotline phone block) LEFT + native `<details>` list RIGHT (hairline dividers, left teal accent bar + tint on open, flip chevron).

## Motion (tasteful, `prefers-reduced-motion`-gated)
- **Scroll-reveal** (`.psx-anim` added by JS, IntersectionObserver → `.is-in`): section blocks fade+rise on entry. Functional sections stay calm.
- **Parallax:** dead code now (targeted `.psx-descrow__media img`, which the Beschreibung story replaced) — harmless no-op; the story has its own image treatment. Consider removing.
- Reduced-motion / no-JS → everything static and readable (content never hidden).

## Design-system source-of-truth files (match these when asked for consistency)
- **Buttons** (`.btn--secondary` = 2px teal border / 4px radius, etc.): `C:\Users\s.vafakhah\Desktop\Design SYSTEM\FOR-CLAUDE.md`. Radius tokens: `--radius` 4px, `--radius-lg` 8px, `--radius-xl` 12px, `--radius-pill`.
- **Chevron / carousel arrows** (square 40×40, 4px radius, #DADADA border, 24px chevron @ stroke 1.5): `C:\Users\s.vafakhah\Desktop\PLP\chevron-spec.md`.
- **Section headings** (eyebrow 12px/700/0.15em `#6A6A6A`; title `--text-display` 46px/700/-0.01em; sub 18px): About-us `C:\Users\s.vafakhah\Desktop\About us\styles-v2.css`.
- **FAQ component**: `C:\Users\s.vafakhah\Desktop\metzler-produktionsprozess\prod.css` (`.faq*`).
- Key PDP tokens: `--color-teal #015253`, `--color-star #FFC041`, `--color-digital-black #1A171B`, `--color-graphite-300 #DADADA`, `--color-paper #F5F6FA`.

## Likely next steps (open)
- Decide: keep the pinned Beschreibung story or roll back to the two-row layout.
- Lock **Technische Details** to real datasheet values.
- Elaborate **Downloads** / **Beschreibung** visuals if desired.
- Remove the now-dead parallax JS block in `pdp-b.js`.
- Re-enable Pages when the user wants the site live again.
