# VDM10 PDP — Prototype Playbook

The organized idea bank for building the new VDM10 2.0 (Colson) product page.
Consolidates: live-site teardown, the two user frictions, competitor research
(DoorBird · Keilbach · Apple · Tesla · Porsche), the Figma swatches/assets,
the design system, and the content briefing.

**Priority key:** `P0` = solves a named friction (must-have) · `P1` = high-value creative differentiator · `P2` = nice-to-have.
Each idea: *what → why/source → how on VDM10 → maps to*.

---

## ★ North-star concept

> **"Arrive already configuring, never lose the anchor."**
> The page opens with the product *already in a configurable buy state* (Tesla), framed as a premium made-to-measure service (DoorBird "nach Maß"), and holds **two persistent rails** the whole way down: a **sticky section nav** on top (where the info is) and a **sticky purchase bar** on the bottom (how to buy — live total + delivery + In den Warenkorb). Everything between is scannable stacked sections, not hidden tabs.

This single concept resolves both frictions at once.

---

## A · CTA & Configurator — Friction 1 (buried / shape-shifting buy button)

| # | Idea | Why / source | How on VDM10 | Pri |
|---|------|-------------|--------------|-----|
| A1 | **Permanent sticky purchase bar** (name · live total · delivery · `In den Warenkorb`) | Tesla, Apple, Keilbach — anchor never leaves | Slim bar reveals on scroll past hero; reuse `body.is-scrolled` pattern | **P0** |
| A2 | **Destination-named entry**, kill "Jetzt anpassen" | "Jetzt anpassen" hides the cart → users hunt | Entry button names the cart: `Konfigurieren & in den Warenkorb`; word "Warenkorb" present the whole journey | **P0** |
| A3 | **Land already-configuring**, no dead-end gate | Tesla lands pre-configured with defaults | Buy box shows configurator inline from arrival; color is step 1, framed as progress not blocker | **P0** |
| A4 | **Gating reads as progress**, not error | "Bitte Farbe wählen" reads like a wall | Disabled state + inline hint (`aria-live`) + on-click smooth-scroll & pulse the color row | **P0** |
| A5 | **Step meter** ("Schritt X von N") | mandatory configurator must feel like guided checkout | Label required vs optional steps; mark optional add-ons **skippable** ("Überspringen") + auto-advance | **P0** |
| A6 | **Live running total + delivery date** in the summary | DoorBird, Tesla — removes cost/time anxiety | We already compute the total; surface it in the sticky bar + a summary rail | **P1** |
| A7 | **Transparent price deltas** on options | Tesla ("+1.350 €" / "Inklusive") | Add-ons already priced (+49,99 etc.) — show delta + "inklusive" inline per option | **P1** |
| A8 | **Engraving shown in the summary** | live-site omits entered text (teardown F2) | Summary line renders the actual Name/Straße/Nr., not just "Schriftart X" | **P1** |
| A9 | **Save / share configuration** | Porsche, DoorBird — €699 buy spans sessions | "Konfiguration speichern" link near CTA (stub for prototype) | **P2** |
| A10 | **"ab … €/Monat" surfaced early** | Tesla frames financing up front; Metzler buries "monatliche Raten" | Show monthly figure next to price in buy box | **P2** |

---

## B · Content architecture & navigation — Friction 2 (technical info missed)

| # | Idea | Why / source | How on VDM10 | Pri |
|---|------|-------------|--------------|-----|
| B1 | **Kill tabs → stacked, always-rendered sections** | tabs hide 4/5 of the content | Beschreibung/Technik/Downloads/Bewertungen/FAQ become on-page sections | **P0** |
| B2 | **Sticky section sub-nav with scroll-spy** | Apple, Porsche — persistent map | Überblick · Funktionen · Technische Daten · Downloads · Bewertungen · FAQ; sticky under header; `scroll-margin-top` offsets | **P0** |
| B3 | **Compact key-stat row under hero** | Tesla/Porsche stat rows | 2 MP FullHD · IP65/IK09 · 146° · IR 10 m (design-system Feature bar §20) | **P1** |
| B4 | **Spec-forward callout cards + full table** | Porsche spec cards; scannable > buried | design-system §12 spec-callouts, then §20 specs table below | **P1** |
| B5 | Mobile sub-nav = horizontal scroll-snap chips | keeps map on small screens | still sticky; chips scroll | **P1** |

---

## C · Buy-box / hero anatomy (confirmed order from Figma)

Name → Rate + Produkt teilen → 3-col spec strip (Hersteller · B×H×T · Art.-Nr.) → Price (`ab` + big + optional strikethrough) → inkl. USt. + Versandkostenfrei → green "Sofort verfügbar" + Lieferdatum → **Farbe swatch row** → primary CTA → variation notice → PayPal-Raten → Versanddatum/Lieferung table → benefit bullets → payment-logo row.

- **Photo-dot color swatches**, 62×62 tile, `#dadada` border, selected = `2px #015253` + drop-shadow (Figma spec). `P0`
- Big product render on neutral ground; context-aware (see F3). `P1`

---

## D · Trust & social proof (premium tone)

| Idea | Source | VDM10 application | Pri |
|------|--------|-------------------|-----|
| Persistent trust cluster near buy box | Keilbach floating badge; all | Trusted Shops · **10 Jahre Garantie (always linked)** · Designed in Germany | **P1** |
| Heritage / scale proof | content briefing | "seit 2013 · über 1,8 Mio. Hauseigentümer · 165 Mitarbeitende · Ø 4,72 aus 33.500+ Bewertungen" | **P1** |
| Rating summary + real reviews | live site (4,5 · 63) | rating breakdown + curated reviews section (design-system) | P1 |
| Award / press strip | Keilbach award; DoorBird | "Powered by Hikvision" + any award badges | P2 |
| Payment/shipping logo row | live site, Figma | reuse existing logo row | P2 |

---

## E · Media & visual language

- **Restrained-luxe treatment** (Tesla/Porsche/Apple): big imagery on neutral ground, generous whitespace, ONE teal accent, confident black/teal full-width CTAs — matches premium Sie-form briefing. `P1`
- **AR / "an Ihrer Tür sehen"** lifestyle overlay — differentiator for outdoor door hardware (DoorBird). `P2`
- Fix lazy-load-looks-broken: `aspect-ratio` boxes + `loading="lazy"`, no layout shift (teardown F3). `P0`
- Gallery ~23 assets incl. a video; placeholder set staged in `…/metzler-produktionsprozess/Product Image/Sprechanlage` (9 imgs). `P0`

---

## F · Content sections — build order (real VDM10 content → design-system sections)

Follows the SECTIONS.md PDP blueprint, filled with the copy we collected:

1. **07 Product Hero** — name, badges (V2.0 · Powered by Hikvision · Designed in Germany), lede, feature pills, buy box. `P0`
2. **Feature bar (§20)** — key-stat row (B3). `P1`
3. **02 Neue Features grid** — fits the **9 V2.0 features** exactly (SIP/FRITZ!, Easy UI 2.0, kabellose Innenstationen, PC/Mac, Türöffner-Strom, Privacy by Design, 146°×82° Kamera, SOC-Prozessor, flacher Kameradom). `P0`
4. **08 Feature Detail (×N, alternating)** — Kamera (2 MP, WDR 120 dB, DNR, BLC, IR 10 m) · LED-Taster 7 Farben · Montagekasten Auf-/Unterputz · App. `P1`
5. **09 Feature Duo** — Gravur/Personalisierung + Farbvarianten. `P1`
6. **03 Türöffnungs-slider (dark)** — Innenstation · App · SIP/FRITZ! · Sicherheitsmodul. `P1`
7. **06 Editorial Q&A (×N)** — one per review objection (see H). `P0`
8. **12 Technische Daten spec-callouts** + specs table (B4). `P1`
9. **01 Support & Kontakt** — hotlines, Info-/Hilfecenter, Beratungstermin, Fachhandelspartner. `P1`
10. **04 FAQ accordion** — from live-site FAQ. `P0`
11. **CTA band (teal-900)** — price + In den Warenkorb. `P1`
12. Cross-sell rows (Briefkästen · Hausnummern · Paket-/Mülltonnenboxen · Ähnliche VDM10). `P2`

---

## G · Objection-handling (review-driven Editorial Q&A) — `P0`

Turn the recurring review pain points into pre-emptive on-page answers:

| Objection from reviews | Answer to surface |
|---|---|
| Keine Unterputz-Montage / schwierig im Stahlpfosten | Universal-Montagekasten Auf-/Unterputz (V2A, WDVS) — show mounting options clearly |
| LAN-Buchse zu klein für große Stecker | note connector spec / what's included; link Anschlussübersicht |
| Glasabdeckung der Innenstation brach beim Einrasten | montage hint "nur von oben andrücken" + link Montageanleitung |
| Verkabelung mit Sicherheitsmodul zu komplex (EFH) | EFH wiring scenario / diagram; "vom Elektriker in Minuten installiert" |

---

## H · Micro-interactions & motion

- Context-aware 3D preview reacts to color/LED/engraving per step (Tesla cabin-swap). `P1`
- Smooth-scroll + pulse to color row when disabled CTA is clicked (respect `prefers-reduced-motion`). `P0`
- Scroll-spy active-state on sticky section nav. `P0`
- FAQ accordion (design-system component, chevron rotate). `P0`
- Sticky bar reveal transition on scroll. `P1`

---

## I · Guardrails (do-not-break)

**Layout fidelity — FOLLOW THE LIVE SITE (hard rule):** the new PDP must sit coherently inside the live edelstahl-tuerklingel.de layout. Keep the live shell: header (M-logo · centered search · account/cart) + full-width 9-item category nav fixed on scroll · two-column hero (media left / buy box right) · stacked content · full-bleed footer. **Container width follows the live `mw-container` (~1320px) → use the chrome's `.container` (~1380px), NOT the design-system 100rem/1600px.** This resolves the container reconciliation in favor of live/chrome. The friction fixes (sticky rails, arrive-configuring, stacked sections vs tabs) are refinements *inside* this live shell — not a new page structure.

**Chrome:** reuse extracted PLP chrome (`index.html` + `chrome.css`/`chrome.js`, `styles-v2.css`) — it is a faithful redesign of the live header/nav/footer. Build the PDP inside `<main>`.
**Tokens:** teal `#015253`, hover `#006d75` (Figma + PLP agree; treat `#005253` as stray dupe). Helvetica-Neue stack, rem-only, mobile-first @48rem. Reconcile `styles-v2.css` vs `metzler-tokens.css` names when sections meet chrome.
**Content rules:** Designed in Germany (never "Made in"); no "Face ID" → "Gesichtserkennung"; no "billig/günstig"; **Garantie always linked**; Sie-form premium; Sprechanlage = "Powered by Hikvision"; social-proof figures as above; kostenloser Versand ab 99 €, no concrete delivery times ("sehr schnell").
**Design-system rules:** no invented font sizes/hex; container 100rem; breadcrumb chevron SVG; FAQ = the DS component verbatim; carousel arrows square, no step numbers.

---

## J · Prioritized backlog (at a glance)

- **P0 (frictions + foundation):** A1–A5, B1–B2, C swatches, E lazy-load/assets, F1/F3/F7/F10, G, H (pulse/scroll-spy/FAQ).
- **P1 (creative differentiators):** A6–A8, B3–B5, D trust cluster + heritage, E luxe treatment, F2/F4–F9/F11, H (3D react, sticky reveal).
- **P2 (nice-to-have):** A9–A10 save/monthly, D awards/logos, E AR, F12 cross-sell.

Build P0 first as a working skeleton, layer P1 for the premium feel, treat P2 as stretch.
