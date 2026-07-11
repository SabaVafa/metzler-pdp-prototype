# Competitor & configurator research — for the VDM10 PDP redesign

Observational UX notes (patterns, not copied content) from direct competitors,
customizable-product shops, and premium-auto online configurators. Collected to
inform the two frictions: (1) buried/shape-shifting buy CTA, (2) hidden technical content.

---

## Sites reviewed

### 1. DoorBird — direct competitor (video intercoms), rich end
- Configurator is a **top-level nav destination**, framed as a benefit: "Türsprechanlagen nach Maß."
- **Live 3D preview updates price AND delivery time** at every configuration step.
- **AR**: visualize the station at your own door (uploaded photo or live camera).
- **Save & resume** a configuration (with technical drawing); order directly from the tool.
- 50+ RAL colors + modules (keypad, fingerprint, display) positioned as made-to-measure value.
- Takeaway: configuration sold as a premium *service*, not a chore. Live price+delivery kills anxiety.

### 2. Keilbach — direct analog (designer mailboxes), simple end
- **"Add to cart" always present** — black, full-width, beside a quantity stepper, from first paint. Never changes identity.
- Configuration = one **inline dropdown** spanning box + accessories + lettering, driving a visible price range (€29–€649).
- Personalization (lettering) deferred to a post-order email + PDF proof loop.
- Persistent trust: floating Trusted-Shops 4,92 badge, "since 2000" heritage, design award.
- Takeaway: proves a customizable product can keep ONE stable, always-visible buy button.

### 3. Apple — best-in-class mainstream
- Big tappable **model cards with color-dot swatches** to reduce choice paralysis before configuring.
- Sticky section sub-nav + persistent "Kaufen" + guided buy flow with running summary (the two-rail model).
- Takeaway: validates sticky buy + sticky section nav; big visual variant cards.

### 4. Tesla — premium auto, canonical online configurator ⭐ most transferable
- **No "start configuring" gate — you land already in the configured product** with sensible defaults.
- Split layout: **large sticky, context-aware visual left** that *swaps to match the current step* (exterior paint → wheels → interior cabin); scrolling option panel right.
- **Permanently pinned bottom purchase bar**: live price (monthly + cash) + "Jetzt bestellen" — present through the entire flow.
- Options = inline rows with **explicit price deltas** ("Anhängerkupplung 1.350 €") and "Inklusive" labels; **photo-dot color swatches** with names.
- Compact **3-stat key-spec row** at top (Reichweite / Geschwindigkeit / 0–100); financing framed up front.

### 5. Porsche — premium auto, luxury configurator
- Progressive **model → trim → options** steps, each a clean card grid.
- **Save/resume config is a first-class persistent CTA** ("Gespeicherte Konfiguration laden" + bookmark icon) — high-consideration buys span sessions.
- **Spec-rich trim cards**: power, 0–100, top speed, "Ab [price]", body/seats/gearbox stat row, fuel + model-year tags.
- **Faceted filter rail** (search + body style) to narrow many variants.
- Restrained-luxe visual language: generous whitespace, big renders on neutral ground, single accent, black full-width CTAs.

---

## Cross-cutting patterns worth adopting

| Pattern | Seen at | Fixes |
|---|---|---|
| **Land already-configured with defaults — no dead-end gate** | Tesla | Friction 1 (root cause) |
| **Persistent/sticky price + primary CTA through whole flow** | Tesla, Apple, Keilbach | Friction 1 |
| **Context-aware hero visual reacting to each choice** | Tesla | Friction 1 + engagement |
| **Option rows show transparent price deltas + "inklusive"** | Tesla | configurator clarity |
| **Live configured price + delivery date in the summary** | DoorBird, Tesla | Friction 1 (anxiety) |
| **Save / resume / share configuration** | Porsche, DoorBird | high-consideration €699 buy |
| **Financing / "ab X €/Monat" surfaced early** | Tesla | Metzler buries "monatliche Raten" today |
| **Spec-forward scannable cards + compact key-stat row** | Porsche | Friction 2 (specs hidden in tabs) |
| **Sticky section sub-nav (scroll-spy)** | Apple | Friction 2 |
| **Config framed as "nach Maß" premium service** | DoorBird | premium tone (content briefing) |
| **Photo-dot / tile color swatches with names** | Tesla, Apple | matches our 62px Figma swatch tile |
| **Persistent trust badges near buy** | Keilbach, all | Trusted Shops, 10-J-Garantie, heritage |

---

## Mapped to the VDM10 PDP (with our mandatory-configurator constraint)

**Friction 1 — CTA/configurator.** The decisive move (Tesla): **arrive already configuring.**
- Land with the buy box showing the configurator inline + a **permanent bottom purchase bar** (product · live total · "In den Warenkorb"). Since our configurator is mandatory, this fits perfectly — the user is "already buying" from arrival, the anchor never moves.
- Make the **3D preview context-aware** (react to color/LED/engraving per step) — we already have the live 3D asset; drive it like Tesla's cabin swap.
- Show **running total + delivery date** in the sticky bar (DoorBird + Tesla); surface add-on price deltas inline (we already compute them).
- Add **save/share configuration** (Porsche/DoorBird) for this €699 considered buy.
- Surface **"ab … €/Monat"** near the price (Tesla), not buried.
- Frame the flow as **"Ihre VDM10 nach Maß"** (DoorBird) — a benefit, not a hurdle.

**Friction 2 — content visibility.** Kill tabs → stacked, spec-forward sections + sticky section sub-nav (Apple/Porsche):
- Compact **key-stat row** under the hero (2 MP FullHD · IP65/IK09 · 146° · IR 10 m).
- **Technische Daten as spec-callout cards** (design-system §12), full table below — scannable, never hidden.

**Visual tone.** Adopt the restrained-luxe treatment common to Tesla/Porsche/Apple — big imagery on neutral ground, generous whitespace, one teal accent, confident black/teal full-width CTAs — matching the content-briefing's premium, Sie-form positioning.
