# VDM10 PDP — Figma swatches, palette & placeholder assets

Collected for the prototype build. Sources:
- Figma prototype `zJ2tuM8R5pMjkqlkuyOypF`, node `5096-5600` (VDM10 Product Page mock) → info panel `5096:5625`.
- Placeholder images: `C:\Users\s.vafakhah\Desktop\metzler-produktionsprozess\Product Image\Sprechanlage`.

---

## 1 · Color-swatch component (from Figma `Farbe wählen` → `Color choose`)

The finish swatches are **photo thumbnails on white tiles**, NOT solid color fills — identical to the live site. Reuse this exact tile spec for the prototype's color selector:

| Property | Value (Figma) |
|---|---|
| Tile size | `62 × 62 px` |
| Tile background | `#ffffff` (Base/White) |
| Tile radius | `4px` (`--m`) — inner image clip `5px` |
| Default border | `1px solid #dadada` (Gray/Border) |
| **Selected** border | `2px solid #015253` (Primary dark green) + `drop-shadow 0 0 5px rgba(0,0,0,0.25)` |
| Gap between tiles | `10px` |
| Inner image | product cut-out, ~45–48% width, centered, `object-fit: contain` |
| Label above row | `Farbe:` (Helvetica Neue **Bold** 16) + value `DB 703 Eisenglimmer` (Regular 16) |

**8 finishes for this product** (names from live site; render each as a photo tile):
Anthrazit RAL 7016 · Verkehrsweiß RAL 9016 · Graualuminium RAL 9007 · Eisenglimmer DB 703 · Tiefschwarz RAL 9005 · Edelstahl gebürstet · Linen Tex Black · Wunschfarbe nach RAL (rainbow icon).

> ⚠️ No solid RAL hex values exist in the Figma (swatches are photos). Do **not** invent RAL hex — use photo tiles per the design-system rule "do not invent values."

### Staged swatch assets (downloaded from the live product page → `assets/swatches/`)
120×120 JPEG finish thumbnails, ready to drop into the 62px tile. Source: `edelstahl-tuerklingel.de/media/image/variation/{id}/xs/…`.

| Finish label (DE) | Variant ID | Local file |
|---|---|---|
| RAL 7016 Anthrazitgrau | 38192 | `assets/swatches/anthrazit-ral7016.jpg` |
| RAL 9016 Verkehrsweiß | 38193 | `assets/swatches/verkehrsweiss-ral9016.jpg` |
| RAL 9007 Graualuminium | 38194 | `assets/swatches/graualuminium-ral9007.jpg` |
| DB 703 Eisenglimmer | 38195 | `assets/swatches/eisenglimmer-db703.jpg` |
| RAL 9005 Tiefschwarz | 38196 | `assets/swatches/tiefschwarz-ral9005.jpg` |
| Edelstahl gebürstet | 38197 | `assets/swatches/edelstahl-gebuerstet.jpg` |
| Linen Tex Black | 38255 | `assets/swatches/linen-tex-black.jpg` |
| Wunschfarbe nach RAL | 38198 | `assets/swatches/wunschfarbe-nach-ral.jpg` |

---

## 2 · Figma color tokens (from `get_variable_defs` on the node)

```
Primary/Default        #005253
Primary dark green      #015253   ← matches FOR-CLAUDE --color-teal
Primary/Hover           #006d75
Primary/Dark            #01292a   (footer / dark band)
Primary/5%              #0152530d
Green/Select            #009951   (availability "Sofort verfügbar")
Other/Links (mint)      #5cdbd3
Link2                   #bcfeff
Other/Blue              #3b9adb   (PayPal / info-note accent)
Other/Gold              #ffc628   (rating stars)
Gray/Border             #dadada   (swatch + input borders)
Gray/Default            #a1a1a1   (secondary text)
Gray/Light              #f5f6fa   (page bg)
Gray border main        #f0f0f0   (hairlines)
Base/Black              #000000
Base/White              #ffffff   (+ White 50% #ffffff80, White 10% #ffffff1a)
```

Type: Helvetica Neue throughout — H1 30/700, H2 24/700, H4 18/700, Price 30/700, Body 16/14/13, uppercase labels.

### ⚠️ Token reconciliation (pick one source of truth before building)
| Role | Figma | FOR-CLAUDE (`metzler-tokens.css`) | PLP chrome (`styles-v2.css`) |
|---|---|---|---|
| Primary teal | `#005253` **and** `#015253` (two!) | `#015253` | `#015253` |
| Teal hover | `#006d75` | `#014A4B` (`teal-600`) | `#006D75` (`teal-hover`) |
| Star/gold | `#ffc628` | `#FFC041` (`--color-star`) | — |

Recommendation: use **`#015253`** as primary teal and **`#006d75`** as hover (Figma + PLP chrome agree) so the new PDP sections match the already-chosen PLP chrome. Flag `#005253` as a likely stray duplicate.

---

## 3 · Placeholder images — CANONICAL, in-project: `PDP METZLER/Product Image/`

Lives inside the project → reference with clean relative paths (e.g. `Product Image/Sprechanlage/video-station.png`). No `../` traversal, works from `index.html`.

**`Product Image/Sprechanlage/` — VDM10 PDP placeholders (9):**
| File | Suggested placeholder use in PDP |
|---|---|
| `video-station.png` | Hero main / gallery lead (Türstation) |
| `audio-station.png` | Gallery / variant |
| `audio-station-namensschild.png` | Gravur / Namensschild feature (§09 Feature Duo) |
| `touch-display-station.png` | Innenstation Home/Pro/Ultra (§08 Feature Detail) |
| `innenstation.png` | Innenstation / App section |
| `mehrfamilien-anlage.png` | Cross-sell / "Ähnliche Artikel" (Mehrfamilien) |
| `briefkasten-paketbox.png` | Cross-sell (Briefkasten/Paketbox combo) |
| `bus-xdm10.png` | Related system / feature detail (SIP/BUS) |
| `zubehoer.png` | Zubehör / accessories |

**`Product Image/Briefkastenanlage/`:** `image 6.png`, `konfigurator-tile.png` (configurator promo tile).
**`Product Image/` root (Briefkasten line — cross-sell rows):** `einfamilien-briefkasten.png`, `standbriefkaesten.webp`, `unterputz-briefkaesten.webp`, `mehrfamilien-briefkaesten.webp`, `paketboxen.webp`, `briefkastenschilder.webp`, `briefkastenstaender.webp`, `briefkasten-ohne-gravur.webp`, `briefkasten-klingel-sprechanlage.webp`, `ersatzteile-zubehoer.webp`.

> Supersedes the earlier external `…/metzler-produktionsprozess/…` copy. Use this in-project folder.

---

## 5 · Color-swatch decision — LOCKED
Swatches = **product-photo tiles, NOT solid color fills.** Use the 8 staged finish JPEGs in `assets/swatches/` inside the 62px tile spec (§1). Confirmed by the user.

---

## 4 · Buy-box layout confirmed in Figma (for the hero panel)
Name → Rate + "Produkt teilen" → 3-col characteristics strip (Hersteller / B×H×T / Art.-Nr.) → Price (`ab` + big price + optional strikethrough) → inkl. USt. + Versandkostenfreie Lieferung → green "Sofort verfügbar" + Lieferdatum → **Farbe** swatch row → primary button "Bitte Farbe wählen" → blue variation notice → PayPal-Raten box → Versanddatum/Lieferung 2-row table → benefit bullet list → payment-logo row.
