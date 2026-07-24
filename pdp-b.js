/* ============================================================
   pdp-b.js — VERSION B · inline 5-step configurator
   • Farbe = VARIANTE (eigene Art.-Nr.), outside the flow.
   • Steps: 1 Anschluss (required · drives 3+4) · 2 Gravurdaten ·
            3 Innenstationen · 4 Stromversorgung · 5 Zubehör
   • Smart navigation: selecting an option AUTO-ADVANCES to the
     next step (no "Weiter" button). Steps stay reachable via the
     stepper nodes and the accordion headers.
   • Price details: an itemized summary with a quantity stepper on
     the product and on every added item.
   • "In den Warenkorb" always live; validates (never locks).
   ============================================================ */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var BASE = 699;
  var FONTS = {
    Klassisch: "'Cinzel',Georgia,serif",
    Elegant: "'Playfair Display',Georgia,serif",
    Fein: "'Cormorant Garamond',Georgia,serif",
    Modern: "'Montserrat',Arial,sans-serif",
    Schmal: "'Oswald','Arial Narrow',sans-serif",
    Schreibschrift: "'Dancing Script',cursive",
    Kalligrafie: "'Great Vibes',cursive",
    Handschrift: "'Caveat',cursive",
    Fraktur: "'UnifrakturMaguntia',serif",
    Technisch: "'Roboto Mono','Courier New',monospace"
  };
  var STEPS = [
    { key: 'anschluss', name: 'Anschluss', req: true },
    { key: 'gravur', name: 'Gravurdaten' },
    { key: 'innen', name: 'Innenstationen' },
    { key: 'strom', name: 'Stromversorgung' },
    { key: 'zubehoer', name: 'Erweiterungen & Zubehör' }
  ];
  var LIGHT_FINISHES = { 'Verkehrsweiß RAL 9016': 1, 'Edelstahl gebürstet': 1 };
  var CONN = { 'LAN / PoE': 'lan', '2-Draht IP': '2draht' };

  /* ── RAL Classic palette (Wunschfarbe picker) — code | German name | hex ── */
  var WUNSCHFARBE = 'Wunschfarbe nach RAL';
  var RAL_FAMS = [['all', 'Alle'], ['1', 'Gelb'], ['2', 'Orange'], ['3', 'Rot'], ['4', 'Violett'], ['5', 'Blau'], ['6', 'Grün'], ['7', 'Grau'], ['8', 'Braun'], ['9', 'Weiß/Schwarz']];
  var RAL = ('1000|Grünbeige|CDBA88 1001|Beige|D0B084 1002|Sandgelb|D2AA6D 1003|Signalgelb|F9A800 1004|Goldgelb|E49E00 ' +
    '1005|Honiggelb|CB8E00 1006|Maisgelb|E29000 1007|Narzissengelb|E88C00 1011|Braunbeige|AF804F 1012|Zitronengelb|DDAF27 ' +
    '1013|Perlweiß|E3D9C6 1014|Elfenbein|DDC49A 1015|Hellelfenbein|E6D2B5 1016|Schwefelgelb|F1DD38 1017|Safrangelb|F6A950 ' +
    '1018|Zinkgelb|FACA30 1019|Graubeige|A5998B 1020|Olivgelb|9E9764 1021|Rapsgelb|F5D033 1023|Verkehrsgelb|F0CA00 ' +
    '1024|Ockergelb|B89C50 1026|Leuchtgelb|F5FF00 1027|Curry|9D9101 1028|Melonengelb|F3A505 1032|Ginstergelb|E2A300 ' +
    '1033|Dahliengelb|F4A900 1034|Pastellgelb|EFA94A 1035|Perlbeige|908370 1036|Perlgold|80643F 1037|Sonnengelb|F09200 ' +
    '2000|Gelborange|ED760E 2001|Rotorange|C93C20 2002|Blutorange|CB2821 2003|Pastellorange|FF7514 2004|Reinorange|F44611 ' +
    '2005|Leuchtorange|FF2301 2007|Leuchthellorange|FFA420 2008|Hellrotorange|F75E25 2009|Verkehrsorange|F54021 2010|Signalorange|D84B20 ' +
    '2011|Tieforange|EC7C26 2012|Lachsorange|E55137 2013|Perlorange|C35831 ' +
    '3000|Feuerrot|AF2B1E 3001|Signalrot|A52019 3002|Karminrot|A2231D 3003|Rubinrot|9B111E 3004|Purpurrot|75151E ' +
    '3005|Weinrot|5E2129 3007|Schwarzrot|412227 3009|Oxidrot|642424 3011|Braunrot|781F19 3012|Beigerot|C1876B ' +
    '3013|Tomatenrot|A12312 3014|Altrosa|D36E70 3015|Hellrosa|EA899A 3016|Korallenrot|B32821 3017|Rosé|E63244 ' +
    '3018|Erdbeerrot|D53032 3020|Verkehrsrot|CC0605 3022|Lachsrot|D95030 3024|Leuchtrot|F80000 3026|Leuchthellrot|FE0000 ' +
    '3027|Himbeerrot|C51D34 3028|Reinrot|CB3234 3031|Orientrot|B32428 3032|Perlrubinrot|721422 3033|Perlrosa|B44C43 ' +
    '4001|Rotlila|6D3F5B 4002|Rotviolett|922B3E 4003|Erikaviolett|DE4C8A 4004|Bordeauxviolett|641C34 4005|Blaulila|6C4675 ' +
    '4006|Verkehrspurpur|A03472 4007|Purpurviolett|4A192C 4008|Signalviolett|924E7D 4009|Pastellviolett|A18594 4010|Telemagenta|CF3476 ' +
    '4011|Perlviolett|8673A1 4012|Perlbrombeer|6C6874 ' +
    '5000|Violettblau|354D73 5001|Grünblau|1F3438 5002|Ultramarinblau|20214F 5003|Saphirblau|1D1E33 5004|Schwarzblau|18171C ' +
    '5005|Signalblau|1E2460 5007|Brillantblau|3E5F8A 5008|Graublau|26252D 5009|Azurblau|025669 5010|Enzianblau|0E294B ' +
    '5011|Stahlblau|231A24 5012|Lichtblau|3B83BD 5013|Kobaltblau|1E213D 5014|Taubenblau|606E8C 5015|Himmelblau|2271B3 ' +
    '5017|Verkehrsblau|063971 5018|Türkisblau|3F888F 5019|Capriblau|1B5583 5020|Ozeanblau|1F3A3D 5021|Wasserblau|256D7B ' +
    '5022|Nachtblau|252850 5023|Fernblau|49678D 5024|Pastellblau|5D9B9B 5025|Perlenzian|2A6478 5026|Perlnachtblau|102C54 ' +
    '6000|Patinagrün|327662 6001|Smaragdgrün|28713E 6002|Laubgrün|276235 6003|Olivgrün|4B573E 6004|Blaugrün|0E4243 ' +
    '6005|Moosgrün|0F4336 6006|Grauoliv|3E3B32 6007|Flaschengrün|283424 6008|Braungrün|35382E 6009|Tannengrün|26392F ' +
    '6010|Grasgrün|3D642D 6011|Resedagrün|6C7156 6012|Schwarzgrün|303D3A 6013|Schilfgrün|7E7B52 6014|Gelboliv|474135 ' +
    '6015|Schwarzoliv|3B3C36 6016|Türkisgrün|026A52 6017|Maigrün|468641 6018|Gelbgrün|48A43F 6019|Weißgrün|BDECB6 ' +
    '6020|Chromoxidgrün|2E3A23 6021|Blassgrün|89AC76 6022|Braunoliv|3B3327 6024|Verkehrsgrün|308446 6025|Farngrün|587246 ' +
    '6026|Opalgrün|005D52 6027|Lichtgrün|7FB5B5 6028|Kieferngrün|2C5545 6029|Minzgrün|20603D 6032|Signalgrün|317F43 ' +
    '6033|Minttürkis|497E76 6034|Pastelltürkis|7FB0B2 6035|Perlgrün|1C542D 6036|Perlopalgrün|193F32 6037|Reingrün|008F39 6038|Leuchtgrün|00BB2D ' +
    '7000|Fehgrau|78858B 7001|Silbergrau|8A9597 7002|Olivgrau|817863 7003|Moosgrau|7A7B6D 7004|Signalgrau|9EA0A1 ' +
    '7005|Mausgrau|6B716F 7006|Beigegrau|756857 7008|Khakigrau|6D6552 7009|Grüngrau|4F5951 7010|Zeltgrau|4C514A ' +
    '7011|Eisengrau|434B4D 7012|Basaltgrau|4E5452 7013|Braungrau|464531 7015|Schiefergrau|434750 7016|Anthrazitgrau|293133 ' +
    '7021|Schwarzgrau|23282B 7022|Umbragrau|403A3A 7023|Betongrau|808076 7024|Graphitgrau|474A50 7026|Granitgrau|2F353B ' +
    '7030|Steingrau|8B8C7A 7031|Blaugrau|474B4E 7032|Kieselgrau|B8B799 7033|Zementgrau|7D8471 7034|Gelbgrau|8F8B66 ' +
    '7035|Lichtgrau|D7D7D7 7036|Platingrau|7F7679 7037|Staubgrau|7D7F7D 7038|Achatgrau|B5B8B1 7039|Quarzgrau|6C6960 ' +
    '7040|Fenstergrau|9DA1AA 7042|Verkehrsgrau A|8D948D 7043|Verkehrsgrau B|4E5754 7044|Seidengrau|CAC4B0 7045|Telegrau 1|909090 ' +
    '7046|Telegrau 2|82898F 7047|Telegrau 4|D0D0D0 7048|Perlmausgrau|898176 ' +
    '8000|Grünbraun|826C34 8001|Ockerbraun|955F20 8002|Signalbraun|6C3B2A 8003|Lehmbraun|734222 8004|Kupferbraun|8E402A ' +
    '8007|Rehbraun|59351F 8008|Olivbraun|6F4F28 8011|Nussbraun|5B3A29 8012|Rotbraun|592321 8014|Sepiabraun|382C1E ' +
    '8015|Kastanienbraun|633A34 8016|Mahagonibraun|4C2F27 8017|Schokoladenbraun|45322E 8019|Graubraun|403A3A 8022|Schwarzbraun|212121 ' +
    '8023|Orangebraun|A65E2E 8024|Beigebraun|79553D 8025|Blassbraun|755C48 8028|Terrabraun|4E3B31 8029|Perlkupfer|763C28 ' +
    '9001|Cremeweiß|FDF4E3 9002|Grauweiß|E7EBDA 9003|Signalweiß|F4F4F4 9004|Signalschwarz|282828 9005|Tiefschwarz|0A0A0A ' +
    '9006|Weißaluminium|A5A5A5 9007|Graualuminium|8F8F8F 9010|Reinweiß|FFFFFF 9011|Graphitschwarz|1C1C1C 9016|Verkehrsweiß|F6F6F6 ' +
    '9017|Verkehrsschwarz|1E1E1E 9018|Papyrusweiß|CFD3CD 9022|Perlhellgrau|9C9C9C 9023|Perldunkelgrau|828282')
    .split(/\s+(?=\d{4}\|)/).map(function (s) { var p = s.split('|'); return { code: p[0], name: p[1], hex: '#' + p[2], fam: p[0].charAt(0) }; });

  var ralUI = null;   /* set by setupRalPicker() — { open, close, flash, sync } */
  var state = {
    finish: '', finishDelta: 0, article: '', mainQty: 1,   /* no colour pre-selected — user must choose (each colour is its own article) */
    ral: null,   /* Wunschfarbe: { code, name, hex } once a RAL is picked */
    anschluss: null, conn: null,
    gravurOn: false, gravurText: '', font: 'Klassisch',
    innenSel: {},   /* name -> { price, qty, label } — multi-select, own qty each */
    strom: 'Standard', stromDelta: 0, stromQty: 1,
    extras: {}   /* name -> { price, qty, label } */
  };

  var items = [].slice.call(document.querySelectorAll('#cfgbSteps .stepr__item'));
  var reached = 0;

  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
  function euro(n) { return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function hasInnen() { return Object.keys(state.innenSel).length > 0; }
  function innenSum() { var s = 0; for (var k in state.innenSel) s += state.innenSel[k].price * state.innenSel[k].qty; return s; }
  function innenLabel() {
    var parts = [];
    for (var k in state.innenSel) { var s = state.innenSel[k]; parts.push((s.qty > 1 ? s.qty + '× ' : '') + (s.label || k)); }
    return parts.join(', ') + ' · +' + euro(innenSum());
  }
  function hasStrom() { return state.strom && state.strom !== 'Standard'; }
  function extrasCount() { return Object.keys(state.extras).length; }
  function extrasSum() { var s = 0; for (var k in state.extras) s += state.extras[k].price * state.extras[k].qty; return s; }
  function total() {
    var t = state.mainQty * (BASE + state.finishDelta);
    t += innenSum();
    if (hasStrom()) t += state.stromDelta * state.stromQty;
    return t + extrasSum();
  }
  function setTxt(id, t) { var el = $(id); if (el) el.textContent = t; }
  function curIndex() { for (var i = 0; i < items.length; i++) if (items[i].classList.contains('is-active')) return i; return -1; }

  /* ── Wunschfarbe helpers ── */
  /* the finish as displayed everywhere: a chosen RAL expands the generic "Wunschfarbe nach RAL" */
  function finishText() {
    if (state.finish === WUNSCHFARBE && state.ral) return 'Wunschfarbe · RAL ' + state.ral.code + ' ' + state.ral.name;
    return state.finish;
  }
  /* Wunschfarbe picked but no RAL chosen yet → the colour choice is incomplete */
  function needsRal() { return state.finish === WUNSCHFARBE && !state.ral; }
  /* legible ink (dark/light) for a swatch background, by perceived luminance */
  function ralInk(hex) {
    var r = parseInt(hex.substr(1, 2), 16), g = parseInt(hex.substr(3, 2), 16), b = parseInt(hex.substr(5, 2), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6 ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.96)';
  }

  /* ── Central refresh ── */
  var priceOpenedOnce = false;   /* auto-expand Preisdetails once, on the first paid add-on */
  function refresh() {
    var t = euro(total());
    var el = $('bTotal');
    if (el && el.textContent !== t) { el.textContent = t; el.classList.remove('is-bump'); void el.offsetWidth; el.classList.add('is-bump'); }
    var sp = $('bStickyPrice'); if (sp) sp.innerHTML = (state.finish ? 'konfiguriert · ' : 'ab ') + '<b>' + t + '</b>';

    setTxt('pdpFinishName', finishText() || 'Bitte Farbe wählen');
    setTxt('bArticleInline', state.article || '—');
    var sf = $('pdpStickyFinish'); if (sf) sf.textContent = finishText() || 'Farbe wählen';

    /* colour-preview dot in the label — shows the exact RAL hex once picked */
    var dot = $('pdpFinishDot');
    if (dot) { if (state.ral) { dot.hidden = false; dot.style.background = state.ral.hex; } else { dot.hidden = true; } }
    if (ralUI) ralUI.sync();

    /* "Preis wie konfiguriert" wording appears only after a colour is chosen;
       before that, the price reads "ab 699,00 €" (starting-at) */
    document.querySelectorAll('.cfgb-price__label, .sheet__pricelabel').forEach(function (el) { el.hidden = !state.finish; });
    document.querySelectorAll('#bTotalFrom, #bSheetFrom').forEach(function (el) { el.hidden = !!state.finish; });

    /* CTA prompts for what's missing: a colour first, then (for Wunschfarbe) a RAL tone */
    var ctaTxt = !state.finish ? 'Bitte Farbe wählen' : (needsRal() ? 'Bitte RAL-Farbe wählen' : 'In den Warenkorb');
    var cartBtn = $('bCart'); if (cartBtn) cartBtn.textContent = ctaTxt;
    var sLabel = $('pdpStickyLabel'); if (sLabel) sLabel.textContent = ctaTxt;
    var checkout = $('bCheckout'); if (checkout) checkout.classList.toggle('is-precolor', !state.finish);

    /* Preisdetails stays hidden until the config carries a surcharge; the first paid
       item reveals it, already expanded (reveal persists; expand fires once so we
       respect the user if they later collapse it) */
    var paidExtra = innenSum() + extrasSum()
      + (hasStrom() ? state.stromDelta * state.stromQty : 0)
      + (state.finishDelta > 0 ? state.finishDelta * state.mainQty : 0);
    if (paidExtra > 0 && checkout) {
      checkout.classList.add('is-priced');
      if (!priceOpenedOnce) {
        var accEl = $('bAcc'), accBtn = $('bDetailsBtn');
        if (accEl) { accEl.classList.add('is-open'); if (accBtn) accBtn.setAttribute('aria-expanded', 'true'); }
        priceOpenedOnce = true;
      }
    }

    setTxt('bPickAnschluss', state.anschluss || 'Bitte wählen');
    setTxt('bPickGravur', state.gravurOn ? (state.gravurText ? '„' + state.gravurText + '" · ' + state.font : 'Mit Gravur') : 'Ohne Gravur');
    setTxt('bPickInnen', hasInnen() ? innenLabel() : 'Ohne Innenstation');
    setTxt('bPickStrom', hasStrom() ? state.strom + ' · +' + euro(state.stromDelta * state.stromQty) : 'Standard · inklusive');
    setTxt('bPickExtras', extrasCount() ? extrasCount() + ' ausgewählt · +' + euro(extrasSum()) : 'Kein Zubehör');

    var eng = $('bEngrave');
    if (eng) {
      eng.textContent = (state.gravurOn && state.gravurText) ? state.gravurText : '';
      eng.style.fontFamily = FONTS[state.font] || '';
      eng.style.setProperty('--engrave-ink', LIGHT_FINISHES[state.finish] ? 'rgba(20,22,25,0.7)' : 'rgba(255,255,255,0.92)');
    }
    // inline per-product qty displays
    setTxt('bMainQtyVal', state.mainQty);
    var mainMinus = document.querySelector('.cfgb-buyrow__qty button[data-qd="-1"][data-target="main"]');
    if (mainMinus) mainMinus.disabled = state.mainQty <= 1;
    document.querySelectorAll('[data-stromqty]').forEach(function (s) { s.textContent = state.stromQty; });
    document.querySelectorAll('[data-qtyfor]').forEach(function (s) { var n = s.getAttribute('data-qtyfor'); s.textContent = state.extras[n] ? state.extras[n].qty : 1; });
    document.querySelectorAll('[data-innenqtyfor]').forEach(function (s) { var n = s.getAttribute('data-innenqtyfor'); s.textContent = state.innenSel[n] ? state.innenSel[n].qty : 1; });
    document.querySelectorAll('.cfg-choice').forEach(function (c) { var o = c.querySelector('.cfg-opt'); c.classList.toggle('is-open', !!(o && o.classList.contains('is-selected'))); });
    markDone();
    updateDock();
    renderSummary();
  }

  function markDone() {
    items.forEach(function (it, i) {
      var done = i < reached && !it.classList.contains('is-active');
      if (STEPS[i].key === 'anschluss') done = !!state.anschluss && !it.classList.contains('is-active');
      it.classList.toggle('is-done', done);
    });
  }

  function updateDock() {
    var cur = curIndex(); if (cur < 0) cur = 0;
    var track = $('bSeg'); if (track) track.style.setProperty('--prog', ((cur + 0.5) / STEPS.length * 100).toFixed(1) + '%');
    /* last (optional) step: once an option is chosen there, show it as done
       (dark teal) instead of current — the config reads as fully complete */
    var lastDone = cur === STEPS.length - 1 && extrasCount() > 0;
    document.querySelectorAll('#bSeg .cfgb-bar__step').forEach(function (s, i) {
      s.classList.toggle('is-filled', i <= reached);
      s.classList.toggle('is-current', i === cur && !lastDone);
      s.setAttribute('aria-selected', i === cur ? 'true' : 'false');
      if (i === cur) { s.setAttribute('aria-current', 'step'); } else { s.removeAttribute('aria-current'); }
    });
    setTxt('bStepN', 'Schritt ' + (cur + 1) + ' von 5');
    setTxt('bStepName', STEPS[cur].name);
    var flag = $('bStepFlag');
    if (flag) { var req = STEPS[cur].req === true; flag.textContent = req ? 'erforderlich' : 'optional'; flag.classList.toggle('is-opt', !req); flag.hidden = false; }
    var back = $('bBack'), fwd = $('bFwd');
    if (back) back.hidden = cur === 0;
    if (fwd) fwd.hidden = cur === STEPS.length - 1;
  }

  /* ── Price-details summary (itemized cart) ── */
  function qtyCtrl(target, q) {
    return '<span class="sum-qty">'
      + '<button type="button" data-qd="-1" data-target="' + target + '" aria-label="weniger">−</button>'
      + '<span>' + q + '</span>'
      + '<button type="button" data-qd="1" data-target="' + target + '" aria-label="mehr">+</button>'
      + '</span>';
  }
  function roQty(q) { return '<span class="sum-qty-ro">×&nbsp;' + q + '</span>'; }
  function row(name, sub, qtyHtml, price, cls) {
    return '<div class="sum-row ' + (cls || '') + '">'
      + '<span class="sum-row__name">' + name + (sub ? '<span class="sum-sub">' + sub + '</span>' : '') + '</span>'
      + (qtyHtml || '<span></span>')
      + '<span class="sum-row__price' + (price === 'inklusive' ? ' is-incl' : '') + '">' + price + '</span>'
      + '</div>';
  }
  function renderSummary() {
    var el = $('bSummary'); if (!el) return;
    var h = '';
    h += row('<b>Metzler VDM10 2.0</b>', esc(finishText()), roQty(state.mainQty), euro(state.mainQty * (BASE + state.finishDelta)));
    if (state.anschluss) h += row('Anschluss', esc(state.anschluss), null, 'inklusive');
    if (state.gravurOn) h += row('Gravur', state.gravurText ? '„' + esc(state.gravurText) + '" · ' + state.font : 'Mit Namensgravur', null, 'inklusive');
    for (var ik in state.innenSel) { var iv = state.innenSel[ik]; h += row(esc(iv.label || ik), null, roQty(iv.qty), euro(iv.price * iv.qty)); }
    if (hasStrom()) h += row(esc(state.strom), null, null, euro(state.stromDelta * state.stromQty));
    for (var k in state.extras) { var x = state.extras[k]; h += row(esc(x.label || k), null, roQty(x.qty), euro(x.price * x.qty)); }
    document.querySelectorAll('.cfgb-summary').forEach(function (x) { x.innerHTML = h; });
    var n = el.querySelectorAll('.sum-row').length;
    setTxt('bSheetTotal', euro(total()));
    var dn = $('bDetailsN'); if (dn) dn.textContent = n + (n === 1 ? ' Position' : ' Positionen');
  }
  function applyQty(target, d) {
    if (target === 'main') state.mainQty = clamp(state.mainQty + d, 1, 20);
    else if (target === 'strom') state.stromQty = clamp(state.stromQty + d, 1, 10);
    else if (target.indexOf('innen:') === 0) { var ni = target.slice(6); if (state.innenSel[ni]) state.innenSel[ni].qty = clamp(state.innenSel[ni].qty + d, 1, 11); }
    else if (target.indexOf('extra:') === 0) { var n = target.slice(6); if (state.extras[n]) state.extras[n].qty = clamp(state.extras[n].qty + d, 1, 20); }
    refresh();
  }
  /* qty steppers work in BOTH the inline accordion and the sheet */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-qd]'); if (!b) return;
    e.stopPropagation();
    applyQty(b.getAttribute('data-target'), parseInt(b.getAttribute('data-qd'), 10));
  });

  /* ── Availability (universal) — one treatment for options that are OUT OF STOCK
     or INCOMPATIBLE with an earlier choice. Instead of hiding them (or slapping on
     a rotated watermark), the tile stays visible but goes inert: dimmed + a single
     flat status chip that names the reason, so the user learns why. ── */
  function connLabel(c) { return c === 'lan' ? 'Nur mit LAN / PoE' : c === '2draht' ? 'Nur mit 2-Draht IP' : 'Nicht kompatibel'; }
  var BADGE_ICON = {
    oos: '',
    incompat: ''
  };
  function setUnavailable(o, kind, text) {
    o.classList.add('is-unavailable');
    o.setAttribute('aria-disabled', 'true');
    var badge = o.querySelector('.cfg-opt__badge');
    if (!badge) { badge = document.createElement('span'); o.appendChild(badge); }
    badge.className = 'cfg-opt__badge ' + (kind === 'oos' ? 'is-oos' : 'is-incompat');
    badge.innerHTML = BADGE_ICON[kind] + '<span>' + text + '</span>';
  }
  function setAvailable(o) {
    o.classList.remove('is-unavailable');
    o.removeAttribute('aria-disabled');
    var badge = o.querySelector('.cfg-opt__badge'); if (badge) badge.parentNode.removeChild(badge);
  }
  function isOOS(o) { return o.getAttribute('data-stock') === 'out'; }

  function applyConn() {
    /* Innenstationen — multi-select: mark each option available/inert, and if a
       CHECKED one becomes incompatible or out of stock, uncheck it and drop it
       from the selection (no forced fallback — "none selected" is a valid state). */
    var innenBox = $('bInnen');
    if (innenBox) {
      [].slice.call(innenBox.querySelectorAll('.cfg-opt')).forEach(function (o) {
        var c = o.getAttribute('data-conn');
        var compat = !state.conn || c === 'both' || c === state.conn;
        if (isOOS(o)) setUnavailable(o, 'oos', 'Ausverkauft');
        else if (!compat) setUnavailable(o, 'incompat', connLabel(c));
        else setAvailable(o);
        if (o.classList.contains('is-unavailable') && o.classList.contains('is-selected')) {
          o.classList.remove('is-selected');
          delete state.innenSel[o.getAttribute('data-innen')];
        }
      });
    }
    /* Stromversorgung — single-select: on block, fall back to the first available. */
    var stromBox = $('bStrom');
    if (stromBox) {
      var opts = [].slice.call(stromBox.querySelectorAll('.cfg-opt'));
      var selBlocked = false;
      opts.forEach(function (o) {
        var c = o.getAttribute('data-conn');
        var compat = !state.conn || c === 'both' || c === state.conn;
        if (isOOS(o)) setUnavailable(o, 'oos', 'Ausverkauft');
        else if (!compat) setUnavailable(o, 'incompat', connLabel(c));
        else setAvailable(o);
        if (o.classList.contains('is-unavailable') && o.classList.contains('is-selected')) {
          o.classList.remove('is-selected'); selBlocked = true;
        }
      });
      if (selBlocked) { state.strom = 'Standard'; state.stromDelta = 0; }   /* revert to Standard, never auto-pick a paid switch */
    }
  }
  /* out-of-stock in groups without a connection dependency (Anschluss, Zubehör) */
  function applyStock() {
    [].slice.call(document.querySelectorAll('#cfgbSteps .cfg-opt[data-stock="out"]')).forEach(function (o) {
      if (!o.closest('#bInnen') && !o.closest('#bStrom')) setUnavailable(o, 'oos', 'Ausverkauft');
    });
  }
  function syncGroupState(id, btn) {
    if (id === 'bStrom') { state.strom = btn.getAttribute('data-strom'); state.stromDelta = parseFloat(btn.getAttribute('data-delta')) || 0; }
  }

  /* ── Single-step navigation (step-dock + Weiter/Zurück) ── */
  function openStep(i, skipScroll) {
    if (i < 0) i = 0; if (i > STEPS.length - 1) i = STEPS.length - 1;
    items.forEach(function (it, ix) { it.classList.toggle('is-active', ix === i); });
    if (i > reached) reached = i;
    refresh();
    if (skipScroll) return;
    var dock = document.querySelector('.cfgb-dock');
    if (dock) window.setTimeout(function () { dock.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 60);
  }
  function idxByKey(k) { for (var i = 0; i < STEPS.length; i++) if (STEPS[i].key === k) return i; return -1; }
  function autoAdvance(fromKey) {
    var i = idxByKey(fromKey);
    if (i > -1 && i < STEPS.length - 1) window.setTimeout(function () { openStep(i + 1); }, 340);
  }
  function flashStep(i) { var it = items[i]; if (!it) return; var p = it.querySelector('.stepr__pad') || it; p.classList.remove('is-flash'); void p.offsetWidth; p.classList.add('is-flash'); }
  var invalidTimers = {};
  function flashInvalid(el) {
    if (!el) return;
    el.classList.remove('is-invalid'); void el.offsetWidth; el.classList.add('is-invalid');
    var id = el.id || 'anon';
    if (invalidTimers[id]) window.clearTimeout(invalidTimers[id]);
    invalidTimers[id] = window.setTimeout(function () { el.classList.remove('is-invalid'); }, 1600);
  }
  /* Scroll so the step-dock sits just below the site header — un-stuck, so the
     progress bar AND the requirement label are both visible (the label hides
     while the dock is stuck to the header). Target the NON-sticky panel, not the
     dock: a stuck dock reports top === header height, which would scroll nowhere. */
  function scrollToProgress() {
    var panel = document.querySelector('#cfgbPanel') || document.querySelector('.cfgb'); if (!panel) return;
    var hdr = document.querySelector('.header') || document.querySelector('header');
    var pin = hdr ? Math.round(hdr.getBoundingClientRect().height) : 104;
    var y = window.pageYOffset + panel.getBoundingClientRect().top - pin - 12;
    window.scrollTo({ top: y < 0 ? 0 : y, behavior: 'smooth' });
  }
  function flashRequired() { var f = $('bStepFlag'); if (!f || f.classList.contains('is-opt')) return; f.classList.remove('is-pulse'); void f.offsetWidth; f.classList.add('is-pulse'); window.setTimeout(function () { f.classList.remove('is-pulse'); }, 1200); }
  function fwdStep() {
    var cur = curIndex();
    if (cur === 0 && !state.anschluss) { scrollToProgress(); flashStep(0); flashInvalid($('bAnschluss')); flashRequired(); return; }
    if (cur === 1 && state.gravurOn && !state.gravurText) { scrollToProgress(); flashStep(1); flashInvalid($('bGravurText')); return; }
    if (cur < STEPS.length - 1) openStep(cur + 1);
  }
  function backStep() { var cur = curIndex(); if (cur > 0) openStep(cur - 1); }
  var fwdB = $('bFwd'); if (fwdB) fwdB.addEventListener('click', fwdStep);
  var backB = $('bBack'); if (backB) backB.addEventListener('click', backStep);
  /* in-step "Weiter" buttons advance (auto-advance was removed) */
  document.querySelectorAll('#cfgbSteps [data-next]').forEach(function (b) { b.addEventListener('click', fwdStep); });
  document.querySelectorAll('#bSeg .cfgb-bar__step').forEach(function (b) {
    b.addEventListener('click', function () { openStep(parseInt(b.getAttribute('data-goto'), 10)); });
  });
  /* Option A accordion (mobile): a step header opens its step in place. Headers are
     display:none on desktop, so this is a no-op there. */
  document.querySelectorAll('#cfgbSteps .stepr__head').forEach(function (h) {
    h.addEventListener('click', function () {
      var it = h.closest('.stepr__item'); if (!it) return;
      var i = parseInt(it.getAttribute('data-step'), 10);
      if (!isNaN(i)) openStep(i, true);
    });
  });

  /* ── Farbe = VARIANTE ── */
  var sw = $('pdpSwatches');
  if (sw) sw.addEventListener('click', function (e) {
    var b = e.target.closest('.pdp-swatch'); if (!b) return;
    this.querySelectorAll('.pdp-swatch').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    b.setAttribute('aria-pressed', 'true');
    state.finish = b.getAttribute('data-finish'); state.finishDelta = parseFloat(b.getAttribute('data-delta')) || 0;
    state.article = b.getAttribute('data-article') || state.article;
    var img = $('pdpMainImg'); if (img) { img.style.opacity = '0.35'; window.setTimeout(function () { img.style.opacity = '1'; }, 200); }
    /* Wunschfarbe → reveal the inline RAL picker; any standard colour → close it and drop the RAL */
    if (ralUI) { if (state.finish === WUNSCHFARBE) ralUI.open(); else { ralUI.close(); state.ral = null; } }
    /* colour chosen → unlock the configurator (colour drives the available options) */
    this.classList.remove('is-invalid');
    var panel = $('cfgbPanel');
    if (panel && panel.classList.contains('is-locked')) {
      panel.classList.remove('is-locked');
      window.dispatchEvent(new Event('resize'));   /* re-run dock geometry now the panel has height */
    }
    refresh();
  });
  /* preview any colour's full name in the prominent label on hover/focus (no click needed) */
  if (sw) {
    var previewName = function (e) { var b = e.target.closest('.pdp-swatch'); if (b) setTxt('pdpFinishName', b.getAttribute('data-finish')); };
    var restoreName = function () { setTxt('pdpFinishName', finishText() || 'Bitte Farbe wählen'); };
    sw.addEventListener('mouseover', previewName);
    sw.addEventListener('mouseout', restoreName);
    sw.addEventListener('focusin', previewName);
    sw.addEventListener('focusout', restoreName);
  }

  /* ── Wunschfarbe: inline RAL picker — search field + palette, shown when
     Wunschfarbe is chosen (search by code or name); live preview ── */
  function setupRalPicker() {
    var panel = $('ralPick'), grid = $('ralGrid'), search = $('ralSearch'), clearBtn = $('ralClear'), empty = $('ralEmpty');
    if (!panel || !grid) return;
    var curQ = '';

    grid.innerHTML = RAL.map(function (c) {
      return '<button type="button" class="ral-chip" role="option" aria-selected="false" data-code="' + c.code + '" data-fam="' + c.fam + '"'
        + ' style="background:' + c.hex + ';color:' + ralInk(c.hex) + '" title="RAL ' + c.code + ' ' + esc(c.name) + '">'
        + '<span class="ral-chip__code">RAL ' + c.code + '</span><span class="ral-chip__name">' + esc(c.name) + '</span></button>';
    }).join('');
    var chips = [].slice.call(grid.querySelectorAll('.ral-chip'));
    var byCode = {}; RAL.forEach(function (c) { byCode[c.code] = c; });

    function applyFilter() {
      var q = curQ.trim().toLowerCase(), shown = 0;
      chips.forEach(function (ch) {
        var code = ch.getAttribute('data-code');
        var name = byCode[code] ? byCode[code].name.toLowerCase() : '';
        var vis = !q || code.indexOf(q) > -1 || name.indexOf(q) > -1 || ('ral ' + code).indexOf(q) > -1;
        ch.style.display = vis ? '' : 'none'; if (vis) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    }
    /* highlight the chosen RAL in the grid (the selection is also mirrored in the
       "Farbe — …" label + price above) */
    function sync() {
      chips.forEach(function (ch) {
        var on = !!(state.ral && ch.getAttribute('data-code') === state.ral.code);
        ch.classList.toggle('is-selected', on); ch.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }

    if (search) search.addEventListener('input', function () { curQ = this.value; if (clearBtn) clearBtn.hidden = !this.value; applyFilter(); });
    if (clearBtn) clearBtn.addEventListener('click', function () { search.value = ''; curQ = ''; this.hidden = true; applyFilter(); search.focus(); });

    grid.addEventListener('click', function (e) {
      var b = e.target.closest('.ral-chip'); if (!b) return;
      var c = byCode[b.getAttribute('data-code')]; if (!c) return;
      state.ral = { code: c.code, name: c.name, hex: c.hex };
      panel.classList.remove('is-invalid');
      /* mirror the chosen code into the search field */
      if (search) { search.value = 'RAL ' + c.code; curQ = search.value; if (clearBtn) clearBtn.hidden = false; applyFilter(); }
      refresh();
    });

    ralUI = {
      open: function () { panel.classList.add('is-shown'); applyFilter(); sync(); },
      close: function () { panel.classList.remove('is-shown'); },
      flash: function () { panel.classList.remove('is-invalid'); void panel.offsetWidth; panel.classList.add('is-invalid'); },
      sync: sync
    };
  }
  setupRalPicker();

  /* ── Swatch labelling on touch (hover is a capability, not a screen size) ──
     Pointer devices keep the compact hover-preview grid. Touch devices (no hover) get
     a snap-scroller whose caption (the "Ausführung — …" header) follows the centred
     swatch, since there is no hover to reveal the colour names.
     ?touch=1 forces the touch treatment on a pointer device so it can be previewed. */
  (function () {
    var params = new URLSearchParams(location.search);
    var isTouch = params.get('touch') === '1' || (window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    document.body.classList.toggle('swtouch', !!isTouch);
    if (isTouch && sw) {
      var caption = function () {
        var mid = sw.getBoundingClientRect().left + sw.clientWidth / 2, near = null, best = Infinity;
        sw.querySelectorAll('.pdp-swatch').forEach(function (b) {
          var r = b.getBoundingClientRect(), d = Math.abs((r.left + r.width / 2) - mid);
          if (d < best) { best = d; near = b; }
        });
        if (near) setTxt('pdpFinishName', near.getAttribute('data-finish'));
      };
      sw.addEventListener('scroll', caption, { passive: true });
      caption();
    }
  })();

  /* ── Hero: thumbnails + view toggle ── */
  var thumbs = $('pdpThumbs'), mainImg = $('pdpMainImg');
  if (thumbs && mainImg) thumbs.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-current', 'false'); });
    b.setAttribute('aria-current', 'true');
    if (b.parentElement && b.parentElement.scrollIntoView) b.parentElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    var im = b.querySelector('img');
    if (im) { mainImg.style.opacity = '0'; window.setTimeout(function () { mainImg.src = im.getAttribute('src'); mainImg.alt = im.getAttribute('alt') || mainImg.alt; mainImg.style.opacity = '1'; }, 160); }
  });

  /* ── Thumbnails beyond the inline limit → "Alle Bilder" lightbox.
     A modal (page scroll locked behind it) avoids any nested-scroll conflict. ── */
  (function () {
    var lb = $('pdpLightbox'), lbGrid = $('pdpLightboxGrid'), allBtn = $('pdpThumbsAll');
    if (!thumbs || !lb || !lbGrid) return;
    var items = [].slice.call(thumbs.querySelectorAll('li img'));
    var LIMIT = 10;   /* must match the CSS `:nth-child(n+11)` inline limit */

    if (allBtn && items.length > LIMIT) {
      var cnt = $('pdpThumbsCount'); if (cnt) cnt.textContent = items.length;
      allBtn.hidden = false;
    }

    var lastFocus = null;
    function closeLb() {
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function openLb() {
      lastFocus = document.activeElement;
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';   /* lock the page so the modal owns the scroll */
      var c = lb.querySelector('.pdp-lightbox__close'); if (c) c.focus();
    }

    items.forEach(function (im) {
      var b = document.createElement('button'); b.type = 'button';
      var g = document.createElement('img');
      g.src = im.getAttribute('src'); g.alt = im.getAttribute('alt') || ''; g.loading = 'lazy';
      b.appendChild(g);
      b.addEventListener('click', function () {
        if (mainImg) { mainImg.style.opacity = '0'; window.setTimeout(function () { mainImg.src = g.src; mainImg.alt = g.alt || mainImg.alt; mainImg.style.opacity = '1'; }, 160); }
        thumbs.querySelectorAll('button').forEach(function (x) {
          var xi = x.querySelector('img');
          x.setAttribute('aria-current', xi && xi.getAttribute('src') === g.src ? 'true' : 'false');
        });
        closeLb();
      });
      lbGrid.appendChild(b);
    });

    if (allBtn) allBtn.addEventListener('click', openLb);
    lb.addEventListener('click', function (e) { if (e.target.closest('[data-lb-close]')) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.getAttribute('aria-hidden') === 'false') closeLb(); });
  })();

  /* ── Reviews: featured happy testimonial + customer-photo thumbnail nav.
     Reads the (hidden) review cards as its data source, then renders one large
     featured review with a crossfade; the customer photos double as the switcher. ── */
  (function () {
    var src = $('rvTrack'); if (!src) return;
    var cards = [].slice.call(src.querySelectorAll('.rv__card')); if (!cards.length) return;
    var data = cards.map(function (c) {
      var im = c.querySelector('.rv__card-img img');
      var starsEl = c.querySelector('.rv__card-stars');
      return {
        img: im ? im.getAttribute('src') : '',
        alt: im ? (im.getAttribute('alt') || '') : '',
        stars: starsEl ? starsEl.querySelectorAll('svg[fill="currentColor"]').length : 5,
        title: (c.querySelector('.rv__card-title') || {}).textContent || '',
        text: (c.querySelector('.rv__card-text') || {}).textContent || '',
        author: (c.querySelector('.rv__card-author') || {}).textContent || '',
        date: (c.querySelector('.rv__card-date') || {}).textContent || ''
      };
    });
    var card = $('rvFeatureCard'), fImg = $('rvFeatureImg'), fStars = $('rvFeatureStars'),
        fTitle = $('rvFeatureTitle'), fText = $('rvFeatureText'), fAuthor = $('rvFeatureAuthor'),
        fDate = $('rvFeatureDate'), fAvatar = $('rvFeatureAvatar'), nav = $('rvThumbsNav'),
        prev = document.querySelector('.rv__feature-arrow--prev'), next = document.querySelector('.rv__feature-arrow--next');
    if (!card || !nav) return;
    var STAR = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
    var STAR_O = '<svg viewBox="0 0 24 24" fill="#d8dbe0"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
    function initials(n) { return n.trim().split(/\s+/).map(function (w) { return w.charAt(0); }).join('').slice(0, 2).toUpperCase(); }
    var idx = -1;
    var thumbBtns = data.map(function (d, i) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'rv__thumbnav-btn';
      b.setAttribute('aria-label', 'Bewertung von ' + d.author);
      var im = document.createElement('img'); im.src = d.img; im.alt = d.alt; im.loading = 'lazy';
      b.appendChild(im);
      b.addEventListener('click', function () { show(i); });
      nav.appendChild(b); return b;
    });
    function apply(d) {
      fImg.src = d.img; fImg.alt = d.alt;
      fStars.innerHTML = STAR.repeat(d.stars) + STAR_O.repeat(Math.max(0, 5 - d.stars));
      fStars.setAttribute('aria-label', d.stars + ' von 5');
      fTitle.textContent = d.title; fText.textContent = d.text;
      fAuthor.textContent = d.author; fDate.textContent = d.date;
      if (fAvatar) fAvatar.textContent = initials(d.author);
    }
    function show(i) {
      if (i === idx) return;
      var first = idx === -1; idx = i; var d = data[i];
      thumbBtns.forEach(function (b, k) { b.setAttribute('aria-current', k === i ? 'true' : 'false'); });
      if (first) { apply(d); return; }
      card.classList.add('is-swapping');
      window.setTimeout(function () { apply(d); card.classList.remove('is-swapping'); }, 200);
    }
    if (prev) prev.addEventListener('click', function () { show((idx - 1 + data.length) % data.length); });
    if (next) next.addEventListener('click', function () { show((idx + 1) % data.length); });
    show(0);
  })();

  /* ── Product-info sticky nav: scroll-spy (highlight the section in view) ── */
  (function () {
    var nav = $('psxNav'); if (!nav) return;
    var links = [].slice.call(nav.querySelectorAll('.psx-nav__link'));
    var map = {}, secs = [];
    links.forEach(function (l) {
      var id = (l.getAttribute('href') || '').slice(1);
      var sec = document.getElementById(id);
      if (sec) { map[id] = l; secs.push(sec); }
    });
    if (!secs.length || !('IntersectionObserver' in window)) return;
    function setActive(l) { links.forEach(function (x) { x.classList.toggle('is-active', x === l); }); }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting && map[e.target.id]) setActive(map[e.target.id]); });
    }, { rootMargin: '-118px 0px -66% 0px', threshold: 0 });
    secs.forEach(function (s) { io.observe(s); });
  })();

  /* ── Bewertungen: happy-review carousel arrows (scroll by ~card width) ── */
  (function () {
    var track = document.getElementById('rvwCarousel'); if (!track) return;
    var wrap = track.closest('.rvw-happy'); if (!wrap) return;
    var prev = wrap.querySelector('.rvw-arrow[data-dir="prev"]');
    var next = wrap.querySelector('.rvw-arrow[data-dir="next"]');
    if (!prev || !next) return;
    function step() {
      var card = track.querySelector('.rvw-happy-card');
      var gap = parseFloat(getComputedStyle(track).columnGap) || 16;
      return card ? card.getBoundingClientRect().width + gap : 320;
    }
    function update() {
      var max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
    }
    prev.addEventListener('click', function () { track.scrollBy({ left: -step() * 1.5, behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step() * 1.5, behavior: 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  /* ── Tasteful motion: scroll-reveal + subtle Beschreibung image parallax.
     Both fully skipped under prefers-reduced-motion (and without IntersectionObserver). ── */
  (function () {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    /* reveal: fade + rise each block as it enters the viewport (one-shot) */
    var targets = [].slice.call(document.querySelectorAll(
      '.psx-sec .psx-eyebrow, .psx-sec .psx-title, .psx-sec .psx-lead, .psx-descrow, .psx-benefits, .psx-dl__item, .psx-spec__group, .faq__support, .faq__list'));
    if (targets.length) {
      targets.forEach(function (t) { t.classList.add('psx-anim'); });
      var rio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); rio.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
      targets.forEach(function (t) { rio.observe(t); });
    }

    /* parallax: Beschreibung photos drift a little slower than the page */
    var imgs = [].slice.call(document.querySelectorAll('.psx-descrow__media img'));
    if (imgs.length) {
      imgs.forEach(function (im) { im.classList.add('psx-parallax'); });
      var ticking = false;
      function paint() {
        var vh = window.innerHeight || document.documentElement.clientHeight;
        imgs.forEach(function (im) {
          var box = im.parentElement.getBoundingClientRect();
          if (box.bottom < -100 || box.top > vh + 100) return;   /* skip off-screen */
          var progress = (box.top + box.height / 2 - vh / 2) / vh;   /* ~ -0.5 … 0.5 */
          var shift = Math.max(-22, Math.min(22, -progress * 44));
          im.style.transform = 'translateY(' + shift.toFixed(1) + 'px) scale(1.14)';
        });
        ticking = false;
      }
      function onScroll() { if (!ticking) { ticking = true; window.requestAnimationFrame(paint); } }
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      paint();
    }
  })();

  /* ── Beschreibung scrollytelling: swap the pinned image as each scene hits center ── */
  (function () {
    var scenes = [].slice.call(document.querySelectorAll('.psx-story__scene'));
    var imgs = [].slice.call(document.querySelectorAll('.psx-story__img'));
    if (!scenes.length || !imgs.length || !('IntersectionObserver' in window)) return;
    function activate(n) {
      imgs.forEach(function (im) { im.classList.toggle('is-active', im.getAttribute('data-scene') === n); });
      scenes.forEach(function (s) { s.classList.toggle('is-current', s.getAttribute('data-scene') === n); });
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) activate(e.target.getAttribute('data-scene')); });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    scenes.forEach(function (s) { io.observe(s); });
  })();

  var mtoggle = document.querySelector('.pdp-media__toggle');
  if (mtoggle) mtoggle.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    b.setAttribute('aria-pressed', 'true');
  });

  /* ── 1 · Anschluss (required) → auto-advance ── */
  var ansch = $('bAnschluss');
  if (ansch) ansch.addEventListener('click', function (e) {
    var b = e.target.closest('.cfg-opt'); if (!b || b.classList.contains('is-unavailable')) return;
    this.querySelectorAll('.cfg-opt').forEach(function (x) { x.classList.remove('is-selected'); });
    b.classList.add('is-selected');
    this.classList.remove('is-invalid');   /* clear any lingering validation highlight */
    state.anschluss = b.getAttribute('data-anschluss'); state.conn = CONN[state.anschluss] || null;
    applyConn(); refresh();   /* no auto-advance — user continues via "Weiter" */
  });

  /* ── 2 · Gravur ── */
  var seg = $('bGravurSeg');
  if (seg) seg.addEventListener('click', function (e) {
    var b = e.target.closest('.cfg-opt'); if (!b) return;
    state.gravurOn = b.classList.toggle('is-selected');   /* toggle add-on; unselected = ohne Gravur */
    $('bGravurField').classList.toggle('is-shown', state.gravurOn);
    if (!state.gravurOn) { state.gravurText = ''; var gc = $('bGravurText'); if (gc) gc.value = ''; }
    refresh();
    if (state.gravurOn) { var gtf = $('bGravurText'); if (gtf) gtf.focus(); }
  });
  var gt = $('bGravurText'); if (gt) gt.addEventListener('input', function () { this.classList.remove('is-invalid'); state.gravurText = this.value; refresh(); });
  var fonts = $('bFonts');
  if (fonts) fonts.addEventListener('click', function (e) {
    var b = e.target.closest('.cfg-font'); if (!b) return;
    this.querySelectorAll('.cfg-font').forEach(function (x) { x.classList.remove('is-selected'); });
    b.classList.add('is-selected'); state.font = b.getAttribute('data-font');
    if (gt) gt.style.fontFamily = FONTS[state.font] || ''; refresh();
  });

  /* ── 3 · Innenstationen → multi-select, each with its own qty (no auto-advance,
     since users may combine several models) ── */
  var innen = $('bInnen');
  if (innen) innen.addEventListener('click', function (e) {
    var b = e.target.closest('.cfg-opt'); if (!b || b.classList.contains('is-unavailable')) return;
    var name = b.getAttribute('data-innen'), d = parseFloat(b.getAttribute('data-delta')) || 0;
    var label = (b.querySelector('.cfg-opt__name') || {}).textContent || name;
    if (b.classList.toggle('is-selected')) state.innenSel[name] = { price: d, qty: 1, label: label.trim() };
    else delete state.innenSel[name];
    refresh();
  });

  /* ── 4 · Stromversorgung → auto-advance ── */
  var strom = $('bStrom');
  if (strom) strom.addEventListener('click', function (e) {
    var b = e.target.closest('.cfg-opt'); if (!b || b.classList.contains('is-unavailable')) return;
    var wasSel = b.classList.contains('is-selected');
    this.querySelectorAll('.cfg-opt').forEach(function (x) { x.classList.remove('is-selected'); });
    if (wasSel) { state.strom = 'Standard'; state.stromDelta = 0; }   /* deselect → back to Standard (inklusive) */
    else { b.classList.add('is-selected'); syncGroupState('bStrom', b); }
    if (!hasStrom()) state.stromQty = 1;
    refresh();
  });

  /* ── 2 & 5 · optional add-ons (checkboxes, own qty) — Innenstationen share the
     .cfg-opt--check styling but have their own handler above, so skip them here ── */
  document.querySelectorAll('#cfgbSteps .cfg-opt--check').forEach(function (b) {
    if (!b.hasAttribute('data-extra')) return;   /* Innen / Gravur reuse the checkbox look but have their own handlers */
    b.addEventListener('click', function () {
      if (b.classList.contains('is-unavailable')) return;
      var name = b.getAttribute('data-extra'), d = parseFloat(b.getAttribute('data-delta')) || 0;
      var label = (b.querySelector('.cfg-opt__name') || {}).textContent || name;
      if (b.classList.toggle('is-selected')) state.extras[name] = { price: d, qty: 1, label: label.trim() };
      else delete state.extras[name];
      refresh();
    });
  });

  /* ── Toast + validate-on-cart (never lock) ── */
  var toastEl = $('cfgToast'), toastMsg = $('cfgToastMsg'), toastTimer;
  function toast(msg) { /* toast messages removed per request — visual cues (swatch/step signals, cart badge) convey state instead */ }
  function firstInvalid() { if (!state.anschluss) return 0; if (state.gravurOn && !state.gravurText) return 1; return -1; }
  function addToCart() {
    /* colour is the first gate — surface the requirement at the swatches, not on the CTA */
    if (!state.finish) {
      var swEl = $('pdpSwatches');
      if (swEl) {
        /* re-trigger the ripple/halo on every attempt (removing → reflow → re-adding
           restarts the CSS animations even if .is-invalid was already set) */
        swEl.classList.remove('is-invalid'); void swEl.offsetWidth; swEl.classList.add('is-invalid');
        swEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      toast('Bitte wählen Sie zuerst eine Farbe');
      return;
    }
    /* Wunschfarbe chosen but no RAL tone yet → open + flash the picker, don't proceed */
    if (needsRal()) {
      if (ralUI) { ralUI.open(); ralUI.flash(); }
      var rp = $('ralPick'); if (rp) rp.scrollIntoView({ behavior: 'smooth', block: 'center' });
      var rs = $('ralSearch'); if (rs) window.setTimeout(function () { rs.focus(); }, 400);
      return;
    }
    var iv = firstInvalid();
    if (iv > -1) {
      openStep(iv, true);
      scrollToProgress();
      flashStep(iv);
      if (iv === 0) { flashInvalid($('bAnschluss')); flashRequired(); }
      else { flashInvalid($('bGravurText')); }
      return;
    }
    toast('In den Warenkorb gelegt · ' + euro(total()));
    var badge = document.querySelector('.header .badge'); if (badge) badge.textContent = (parseInt(badge.textContent, 10) || 0) + 1;
  }
  var cart = $('bCart'); if (cart) cart.addEventListener('click', addToCart);
  var stickyCta = $('pdpStickyCta'); if (stickyCta) { var sl = $('pdpStickyLabel'); if (sl) sl.textContent = 'In den Warenkorb'; stickyCta.addEventListener('click', addToCart); }
  /* ── Share: popover with options (copy · e-mail · WhatsApp · Facebook · X) ── */
  (function () {
    var wrap = document.querySelector('.bx-share-wrap'), btn = $('pdpShare'), menu = $('pdpShareMenu');
    if (!wrap || !btn || !menu) return;
    var cred = wrap.closest('.bx-cred');
    function buildLinks() {
      var u = encodeURIComponent(location.href), t = encodeURIComponent(document.title);
      var map = {
        email: 'mailto:?subject=' + t + '&body=' + u,
        whatsapp: 'https://wa.me/?text=' + t + '%20' + u,
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + u,
        x: 'https://twitter.com/intent/tweet?url=' + u + '&text=' + t
      };
      menu.querySelectorAll('a[data-share]').forEach(function (a) { var k = a.getAttribute('data-share'); if (map[k]) a.href = map[k]; });
    }
    function onDoc(e) { if (!wrap.contains(e.target)) close(); }
    function onKey(e) { if (e.key === 'Escape') { close(); btn.focus(); } }
    function open() { buildLinks(); menu.hidden = false; btn.setAttribute('aria-expanded', 'true'); if (cred) cred.classList.add('is-sharing'); document.addEventListener('click', onDoc); document.addEventListener('keydown', onKey); }
    function close() { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); if (cred) cred.classList.remove('is-sharing'); document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey); }
    btn.addEventListener('click', function (e) { e.stopPropagation(); if (menu.hidden) open(); else close(); });
    var copyBtn = menu.querySelector('[data-share="copy"]');
    if (copyBtn) copyBtn.addEventListener('click', function () {
      var lbl = copyBtn.querySelector('span'), orig = lbl.textContent;
      var done = function () { copyBtn.classList.add('is-copied'); lbl.textContent = 'Link kopiert!';
        window.setTimeout(function () { lbl.textContent = orig; copyBtn.classList.remove('is-copied'); close(); }, 1200); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(location.href).then(done, done); else done();
    });
    menu.querySelectorAll('a[data-share]').forEach(function (a) { a.addEventListener('click', function () { close(); }); });
  })();

  /* ── Sticky bar visibility — show whenever the main CTA is off-screen.
     Geometry check (not IntersectionObserver): the CTA's position shifts on load,
     on colour-unlock relayout, and on image load without a scroll, and IO's initial
     callback can latch a stale "visible" before layout settles. This stays correct. ── */
  var bar = $('pdpStickyBar');
  if (cart && bar) {
    var syncStickyBar = function () {
      var r = cart.getBoundingClientRect();
      var show = r.bottom <= 0 || r.top >= window.innerHeight;   /* CTA fully out of view */
      bar.classList.toggle('is-visible', show);
      bar.setAttribute('aria-hidden', show ? 'false' : 'true');
    };
    window.addEventListener('scroll', syncStickyBar, { passive: true });
    window.addEventListener('resize', syncStickyBar, { passive: true });
    window.addEventListener('load', syncStickyBar);
    syncStickyBar();
  }

  /* ── Bottom-up price sheet (accessible page-wide) ── */
  var sheet = $('bSheet');
  function openSheet() { if (!sheet) return; renderSummary(); sheet.classList.add('is-open'); sheet.setAttribute('aria-hidden', 'false'); document.body.classList.add('cfg-sheet-open'); }
  function closeSheet() { if (!sheet) return; sheet.classList.remove('is-open'); sheet.setAttribute('aria-hidden', 'true'); document.body.classList.remove('cfg-sheet-open'); }
  /* buy-block trigger → inline accordion (expand in place) */
  var acc = $('bAcc'), dBtn = $('bDetailsBtn');
  if (dBtn && acc) dBtn.addEventListener('click', function () {
    var open = acc.classList.toggle('is-open'); dBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  /* sticky-bar Details → bottom-up window */
  var sDet = $('bStickyDetails'); if (sDet) sDet.addEventListener('click', openSheet);
  if (sheet) sheet.addEventListener('click', function (e) { if (e.target.closest('[data-sheet-close]')) closeSheet(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheet(); });
  var sheetCart = $('bSheetCart'); if (sheetCart) sheetCart.addEventListener('click', function () { closeSheet(); addToCart(); });

  /* ── Kontakt & Service modal (opened by "Beratungstermin vereinbaren") ── */
  (function () {
    var cm = document.getElementById('contactModal');
    if (!cm) return;
    var lastFocus = null;
    function openCM(e) { if (e) e.preventDefault(); lastFocus = document.activeElement;
      cm.classList.add('is-open'); cm.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
      var f = cm.querySelector('a[href],button:not([disabled])'); if (f) f.focus(); }
    function closeCM() { cm.classList.remove('is-open'); cm.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus(); }
    document.querySelectorAll('[data-cm-open]').forEach(function (el) { el.addEventListener('click', openCM); });
    cm.addEventListener('click', function (e) { if (e.target === cm || e.target.closest('[data-cm-close]')) closeCM(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && cm.classList.contains('is-open')) closeCM(); });
  })();

  /* ── Sticky step-dock: pin it flush against the site header's real bottom
     (header height varies by viewport, so measure it — a hardcoded offset
     leaves a gap the scrolling config shows through), and flag "stuck" so it
     compacts. Geometry check on scroll (IntersectionObserver is unreliable
     when its sentinel can be display:none). ── */
  var dockEl = document.querySelector('.cfgb-dock');
  var headerEl = document.querySelector('.header') || document.querySelector('header');
  var sentinelEl = document.querySelector('.cfgb-sentinel');
  if (dockEl) {
    var mqMobile = window.matchMedia('(max-width: 640px)');
    var dockStuck = function () {
      var pin = headerEl ? Math.round(headerEl.getBoundingClientRect().height) : 104;
      if (dockEl.style.top !== pin + 'px') dockEl.style.top = pin + 'px';
      if (mqMobile.matches && sentinelEl) {
        /* Mobile: detach the ribbon as a full-width bar fixed below the header so
           it persists across the WHOLE page (sticky is bounded by .cfgb). The
           in-flow sentinel is the scroll reference; grow it to the dock's height
           so the content below doesn't jump when the dock leaves the flow. */
        var stuck = sentinelEl.getBoundingClientRect().top <= pin + 1;
        dockEl.classList.toggle('is-stuck', stuck);
        dockEl.classList.toggle('is-fixed', stuck);
        sentinelEl.style.height = stuck ? dockEl.offsetHeight + 'px' : '';
      } else {
        dockEl.classList.remove('is-fixed');
        if (sentinelEl) sentinelEl.style.height = '';
        dockEl.classList.toggle('is-stuck', dockEl.getBoundingClientRect().top <= pin + 1);
      }
    };
    window.addEventListener('scroll', dockStuck, { passive: true });
    window.addEventListener('resize', dockStuck, { passive: true });
    if (mqMobile.addEventListener) mqMobile.addEventListener('change', dockStuck);
    dockStuck();
  }

  applyConn(); applyStock();   /* seed availability (out-of-stock + any pre-set incompatibility) */
  refresh();
})();

/* ============================================================
   Review photo lightbox — customer-uploaded images (max 3/review).
   Thumbnails (.rvw-shot) open a full-size overlay with prev/next
   scoped to the clicked review's photo group. No dependencies.
   ============================================================ */
(function () {
  'use strict';
  var shots = [].slice.call(document.querySelectorAll('.rvw-shot'));
  if (!shots.length) return;

  var lb = document.createElement('div');
  lb.className = 'rvw-lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Kundenfoto zur Bewertung');
  lb.innerHTML =
    '<button type="button" class="rvw-lightbox__close" aria-label="Schließen">×</button>' +
    '<button type="button" class="rvw-lightbox__nav" data-dir="prev" aria-label="Vorheriges Foto">‹</button>' +
    '<img alt="Kundenfoto zur Bewertung">' +
    '<button type="button" class="rvw-lightbox__nav" data-dir="next" aria-label="Nächstes Foto">›</button>';
  document.body.appendChild(lb);

  var img = lb.querySelector('img');
  var navs = [].slice.call(lb.querySelectorAll('.rvw-lightbox__nav'));
  var closeBtn = lb.querySelector('.rvw-lightbox__close');
  var group = [], idx = 0, lastFocus = null;

  function show(i) {
    idx = (i + group.length) % group.length;
    img.src = group[idx].getAttribute('data-full');
    img.alt = (group[idx].querySelector('img') || {}).alt || 'Kundenfoto zur Bewertung';
    var multi = group.length > 1;
    navs.forEach(function (b) { b.style.display = multi ? '' : 'none'; });
  }
  function open(shot) {
    var media = shot.closest('.rvw-review__media');
    group = media ? [].slice.call(media.querySelectorAll('.rvw-shot')) : [shot];
    lastFocus = shot;
    show(group.indexOf(shot));
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    lb.classList.remove('is-open');
    img.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  shots.forEach(function (s) { s.addEventListener('click', function () { open(s); }); });
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target === closeBtn) { close(); return; }
    var nav = e.target.closest('.rvw-lightbox__nav');
    if (nav) show(idx + (nav.getAttribute('data-dir') === 'next' ? 1 : -1));
  });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'ArrowLeft') show(idx - 1);
  });
})();

/* ============================================================
   Kameratechnologie showcase — reveal the 146° FOV demo and
   count the headline numbers up when the module scrolls in.
   ============================================================ */
(function () {
  'use strict';
  var mod = document.getElementById('camtech');
  if (!mod) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stats = [].slice.call(mod.querySelectorAll('.camtech__stat'));

  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = target + suffix; return; }
    var dur = 1200, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);          /* easeOutCubic */
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function run() {
    mod.classList.add('is-in');
    stats.forEach(countUp);
  }

  if (!('IntersectionObserver' in window)) { run(); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { run(); io.disconnect(); }
    });
  }, { threshold: 0, rootMargin: '0px 0px -15% 0px' });   /* fires once the top scrolls into view — robust for tall modules */
  io.observe(mod);
})();

/* ============================================================
   Sticky-bar handoff — the green quickbar pins under the site
   header while scrolling, then the product-section nav (.psx-nav)
   rises and takes its place. We keep --pdp-header-h synced to the
   live (compacting) header height, and slide the quickbar up behind
   the header exactly as the section nav reaches it (desktop only;
   mobile keeps the quickbar accordion). All work is rAF-throttled.
   ============================================================ */
(function () {
  'use strict';
  var header = document.querySelector('.header');
  if (!header) return;
  var qb = document.getElementById('quickbar');
  var nav = document.querySelector('.psx-nav');
  var root = document.documentElement;
  var desktop = window.matchMedia('(min-width: 768px)');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var ticking = false;

  function frame() {
    ticking = false;
    /* keep the shared offset in sync with the live header height */
    var h = Math.round(header.getBoundingClientRect().height);
    root.style.setProperty('--pdp-header-h', h + 'px');

    if (!qb) return;
    if (nav && desktop.matches && !reduce.matches) {
      /* how far the section nav has pushed into the quickbar's pinned slot */
      var qbH = qb.offsetHeight;
      var navTop = nav.getBoundingClientRect().top;
      var delta = Math.min(qbH, Math.max(0, (h + qbH) - navTop));
      qb.style.transform = delta ? 'translate3d(0,' + (-delta) + 'px,0)' : '';
    } else {
      qb.style.transform = '';
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  if (desktop.addEventListener) desktop.addEventListener('change', onScroll);
  frame();
})();

/* ============================================================
   Anschluss-diagram lightbox — the technical connection schematics
   (.techdia__shot) open full-size with a caption and prev/next within
   their gallery group. Keyboard + backdrop close. No dependencies.
   ============================================================ */
(function () {
  'use strict';
  var shots = [].slice.call(document.querySelectorAll('.techdia__shot'));
  if (!shots.length) return;

  var lb = document.createElement('div');
  lb.className = 'tdiag-lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Anschlussschema');
  lb.innerHTML =
    '<button type="button" class="tdiag-lightbox__close" aria-label="Schließen">×</button>' +
    '<button type="button" class="tdiag-lightbox__nav" data-dir="prev" aria-label="Vorheriges Schema">‹</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button type="button" class="tdiag-lightbox__nav" data-dir="next" aria-label="Nächstes Schema">›</button>';
  document.body.appendChild(lb);

  var img = lb.querySelector('img');
  var cap = lb.querySelector('figcaption');
  var navs = [].slice.call(lb.querySelectorAll('.tdiag-lightbox__nav'));
  var closeBtn = lb.querySelector('.tdiag-lightbox__close');
  var group = [], idx = 0, lastFocus = null;

  function captionFor(shot) {
    var item = shot.closest('.techdia__item');
    var c = item && item.querySelector('.techdia__caption');
    return c ? c.textContent : '';
  }
  function show(i) {
    idx = (i + group.length) % group.length;
    var shot = group[idx];
    img.src = shot.getAttribute('data-full');
    cap.textContent = captionFor(shot);
    var multi = group.length > 1;
    navs.forEach(function (b) { b.style.display = multi ? '' : 'none'; });
  }
  function open(shot) {
    var grid = shot.closest('.techdia__grid');
    group = grid ? [].slice.call(grid.querySelectorAll('.techdia__shot')) : [shot];
    lastFocus = shot;
    show(group.indexOf(shot));
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    lb.classList.remove('is-open');
    img.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  shots.forEach(function (s) { s.addEventListener('click', function () { open(s); }); });
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target === closeBtn) { close(); return; }
    var nav = e.target.closest('.tdiag-lightbox__nav');
    if (nav) show(idx + (nav.getAttribute('data-dir') === 'next' ? 1 : -1));
  });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'ArrowLeft') show(idx - 1);
  });
})();

/* ============================================================
   Technische Übersichten — left-rail master–detail (ARIA tabs).
   Clicking / arrow-keying a category in the rail reveals its panel
   and hides the others. Vertical tablist, full keyboard support.
   ============================================================ */
(function () {
  'use strict';
  [].slice.call(document.querySelectorAll('.techms__rail')).forEach(function (rail) {
    var tabs = [].slice.call(rail.querySelectorAll('.techms__tab'));
    if (!tabs.length) return;

    function activate(tab) {
      tabs.forEach(function (t) {
        var sel = t === tab;
        t.classList.toggle('is-active', sel);
        t.setAttribute('aria-selected', sel ? 'true' : 'false');
        t.tabIndex = sel ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !sel;
      });
    }
    rail.addEventListener('click', function (e) {
      var t = e.target.closest('.techms__tab');
      if (t) { activate(t); t.focus(); }
    });
    rail.addEventListener('keydown', function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var n = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = tabs.length - 1;
      else return;
      e.preventDefault();
      activate(tabs[n]);
      tabs[n].focus();
    });
  });
})();
