/* ============================================================
   Metzler SET configuration flow – embedded in the duplicated PDP (set.html).
   Türklingel „Stella" + Briefkasten „Siebert". One shared finish instantiates
   both; each carries its own options; one combined summary with a set discount.
   Finish rail shows the INTERSECTION as freely pairable; finishes for only one
   product are marked „bricht das Set" and route through a divergence path.
   Data from the live PDPs. Option deltas are REPRESENTATIVE (flagged in UI).
   ============================================================ */
(function () {
  'use strict';
  if (!document.getElementById('setfin')) return;   // only on the set page

  var SET_DISCOUNT = 0.10;   // 10% – MVP default

  var FINISHES = [
    { id: 'ral7016', name: 'Anthrazitgrau',      code: 'RAL 7016', img: 'assets/swatches/anthrazit-ral7016.jpg',   a: true, b: true },
    { id: 'ral9016', name: 'Verkehrsweiß',       code: 'RAL 9016', img: 'assets/swatches/verkehrsweiss-ral9016.jpg', a: true, b: true },
    { id: 'ral9007', name: 'Graualuminium',      code: 'RAL 9007', img: 'assets/swatches/graualuminium-ral9007.jpg', a: true, b: true },
    { id: 'db703',   name: 'Eisenglimmer',       code: 'DB 703',   img: 'assets/swatches/eisenglimmer-db703.jpg',   a: true, b: true },
    { id: 'ral9005', name: 'Tiefschwarz',        code: 'RAL 9005', img: 'assets/swatches/tiefschwarz-ral9005.jpg',  a: true, b: true },
    { id: 'edelstahl', name: 'Edelstahl gebürstet', code: '',      img: 'assets/swatches/edelstahl-gebuerstet.jpg', a: true, b: true },
    { id: 'ral7012', name: 'Basaltgrau',         code: 'RAL 7012', chip: '#4c5155', a: false, b: true },
    { id: 'wunsch',  name: 'Wunschfarbe nach RAL', code: '',       img: 'assets/swatches/wunschfarbe-nach-ral.jpg', a: false, b: true }
  ];
  var byId = function (id) { for (var i = 0; i < FINISHES.length; i++) if (FINISHES[i].id === id) return FINISHES[i]; return null; };
  var SHARED = FINISHES.filter(function (f) { return f.a && f.b; });

  var PRODUCTS = {
    a: { key: 'a', name: 'Türklingel „Stella"', sub: 'mit Gravur + LED-Taster · Art. 35875', base: 24.99,
      img: 'Bundled Product/Image/Türklingeln/metzler-tuerklingel-mit-gravur-led-taster-optional-stella.webp',
      options: [
        { id: 'size', label: 'Größe', type: 'radio', def: '8', choices: [
          { v: '6', label: '6 × 6 cm', d: 0 }, { v: '8', label: '8 × 8 cm', d: 6 }, { v: '10', label: '10 × 10 cm', d: 12 }, { v: '11', label: '11 × 11 cm', d: 18 } ] },
        { id: 'led', label: 'LED-Taster', type: 'radio', def: 'no', choices: [
          { v: 'no', label: 'Ohne Beleuchtung', d: 0 }, { v: 'white', label: 'LED Weiß', d: 14 }, { v: 'blue', label: 'LED Blau', d: 14 } ] },
        { id: 'gravur', label: 'Gravur (Name)', type: 'text', placeholder: 'z. B. Familie Voßberg', hint: 'inklusive', d: 0 } ] },
    b: { key: 'b', name: 'Briefkasten „Siebert"', sub: 'hochwertiger Stahl · 37 × 37 × 10,5 cm · Art. 36621', base: 76.49,
      img: 'Bundled Product/Image/Breifkasten/metzler-briefkasten-aus-hochwertigem-stahl-siebert.webp',
      options: [
        { id: 'mount', label: 'Montage', type: 'radio', def: 'wall', choices: [
          { v: 'wall', label: 'Wandmontage', d: 0 }, { v: 'stand', label: 'Standbriefkasten mit Pfosten', d: 59 } ] },
        { id: 'gravur', label: 'Namensgravur', type: 'text', placeholder: 'z. B. Voßberg', hint: 'inklusive', d: 0 } ] }
  };

  var state = { finishA: null, finishB: null, diverged: false, a: {}, b: {} };
  ['a', 'b'].forEach(function (k) { PRODUCTS[k].options.forEach(function (o) { state[k][o.id] = o.type === 'radio' ? o.def : ''; }); });

  var eur = function (n) { return n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); };
  var swatchStyle = function (f) { return f.img ? "background-image:url('" + f.img + "')" : 'background:' + (f.chip || '#ccc'); };
  function optDelta(k, o) { if (o.type === 'radio') { var c = o.choices.filter(function (x) { return x.v === state[k][o.id]; })[0]; return c ? c.d : 0; } return o.d || 0; }
  function productTotal(k) { var t = PRODUCTS[k].base; PRODUCTS[k].options.forEach(function (o) { t += optDelta(k, o); }); return t; }
  function finishFor(k) { return byId(k === 'a' ? state.finishA : state.finishB); }
  function bothChosen() { return !!state.finishA && !!state.finishB; }

  /* ---- finish rail ---- */
  function renderRail() {
    var el = document.getElementById('setfin');
    var shared = SHARED.map(function (f) {
      return '<button type="button" class="setfin__sw" data-fin="' + f.id + '" aria-pressed="false" title="' + esc(f.name) + '">' +
        '<span class="setfin__chip" style="' + swatchStyle(f) + '"></span><span class="setfin__nm">' + esc(f.name) + (f.code ? ' <em>' + f.code + '</em>' : '') + '</span></button>';
    }).join('');
    var only = FINISHES.filter(function (f) { return !(f.a && f.b); }).map(function (f) {
      return '<button type="button" class="setfin__sw setfin__sw--solo" data-fin="' + f.id + '" aria-pressed="false" title="Nur für den Briefkasten">' +
        '<span class="setfin__chip" style="' + swatchStyle(f) + '"></span><span class="setfin__nm">' + esc(f.name) + (f.code ? ' <em>' + f.code + '</em>' : '') + '</span>' +
        '<span class="setfin__break">bricht das Set</span></button>';
    }).join('');
    el.innerHTML =
      '<div class="setfin__head"><span class="setfin__cap">Schritt 1 · Set-Farbe</span>' +
      '<h2 class="setfin__title">Ein Farbton für beide Produkte</h2>' +
      '<p class="setfin__sub">Diese <b>' + SHARED.length + ' Töne</b> sind für Türklingel und Briefkasten abgestimmt.</p></div>' +
      '<div class="setfin__grid">' + shared + '</div>' +
      '<div class="setfin__solohead">Nur für den Briefkasten verfügbar</div>' +
      '<div class="setfin__grid setfin__grid--solo">' + only + '</div>' +
      '<div class="setfin__nudge" id="setNudge" hidden></div>';
    el.addEventListener('click', onRailClick);
  }
  function onRailClick(e) {
    var b = e.target.closest('.setfin__sw'); if (!b) return;
    var f = byId(b.getAttribute('data-fin'));
    if (f.a && f.b) { state.finishA = state.finishB = f.id; state.diverged = false; hideNudge(); refresh(); }
    else { openNudge(f); }
  }
  function openNudge(f) {
    var n = document.getElementById('setNudge'); n.hidden = false;
    n.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01"/><circle cx="12" cy="12" r="9"/></svg>' +
      '<div class="setfin__nudgetext"><b>„' + esc(f.name) + '" ist nur für den Briefkasten verfügbar.</b> Dieses Set ist auf einen einheitlichen Farbton abgestimmt – Sie können die Farben aber getrennt wählen.</div>' +
      '<div class="setfin__nudgeact"><button type="button" class="setfin__nudgebtn" data-diverge="' + f.id + '">Farben trennen</button>' +
      '<button type="button" class="setfin__nudgecancel">Abgestimmt lassen</button></div>';
    n.querySelector('[data-diverge]').addEventListener('click', function () {
      state.diverged = true; state.finishB = f.id; hideNudge(); refresh();
      var sep = document.getElementById('sepA'); if (sep) sep.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    n.querySelector('.setfin__nudgecancel').addEventListener('click', hideNudge);
  }
  function hideNudge() { var n = document.getElementById('setNudge'); if (n) { n.hidden = true; n.innerHTML = ''; } }
  function refreshRail() {
    document.querySelectorAll('#setfin .setfin__sw').forEach(function (b) {
      var id = b.getAttribute('data-fin');
      var on = (id === state.finishA && id === state.finishB) || (state.diverged && id === state.finishB);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  /* ---- product panels ---- */
  function renderPanel(k) {
    var p = PRODUCTS[k], el = document.getElementById('prod' + k.toUpperCase());
    var opts = p.options.map(function (o) {
      if (o.type === 'radio') {
        var chips = o.choices.map(function (c) {
          return '<label class="setopt__chip"><input type="radio" name="' + k + '-' + o.id + '" value="' + c.v + '"' + (state[k][o.id] === c.v ? ' checked' : '') + '><span>' + esc(c.label) + (c.d ? ' <em>+' + eur(c.d) + '</em>' : '') + '</span></label>';
        }).join('');
        return '<div class="setopt"><span class="setopt__label">' + esc(o.label) + '</span><div class="setopt__chips">' + chips + '</div></div>';
      }
      return '<div class="setopt"><span class="setopt__label">' + esc(o.label) + ' <em class="setopt__hint">' + esc(o.hint || '') + '</em></span><input type="text" class="setopt__text" name="' + k + '-' + o.id + '" placeholder="' + esc(o.placeholder || '') + '" value="' + esc(state[k][o.id]) + '"></div>';
    }).join('');
    var sep = k === 'a' ?
      '<div class="setprod__sep" id="sepA" hidden><span class="setprod__seplbl">Türklingel-Farbe separat wählen</span><div class="setprod__sepgrid">' +
        SHARED.map(function (f) { return '<button type="button" class="setfin__sw setfin__sw--sm" data-fina="' + f.id + '" aria-pressed="false" title="' + esc(f.name) + '"><span class="setfin__chip" style="' + swatchStyle(f) + '"></span></button>'; }).join('') +
      '</div><button type="button" class="setprod__relink" id="relinkA">Set wieder abstimmen</button></div>' : '';
    el.innerHTML =
      '<div class="setprod__lock"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg><span>Erst die Set-Farbe wählen</span></div>' +
      '<div class="setprod__inner"><div class="setprod__head"><img class="setprod__img" src="' + p.img + '" alt="' + esc(p.name) + '">' +
      '<div class="setprod__id"><span class="setprod__cap">' + (k === 'a' ? 'Produkt 1' : 'Produkt 2') + '</span>' +
      '<h3 class="setprod__name">' + esc(p.name) + '</h3><p class="setprod__sub">' + esc(p.sub) + '</p>' +
      '<div class="setprod__finish" id="fin' + k + '"></div></div>' +
      '<div class="setprod__price" id="price' + k + '"></div></div>' + sep +
      '<div class="setprod__opts">' + opts + '</div></div>';
    el.addEventListener('change', function (e) { var t = e.target; if (!t.name || t.name.indexOf(k + '-') !== 0) return; state[k][t.name.slice(2)] = t.value; refresh(); });
    el.addEventListener('input', function (e) { var t = e.target; if (t.type !== 'text' || !t.name || t.name.indexOf(k + '-') !== 0) return; state[k][t.name.slice(2)] = t.value; refreshSummary(); });
    if (k === 'a') el.addEventListener('click', function (e) {
      var s = e.target.closest('[data-fina]'); if (s) { state.finishA = s.getAttribute('data-fina'); refresh(); return; }
      if (e.target.id === 'relinkA') { state.diverged = false; state.finishA = state.finishB = (byId(state.finishB) && byId(state.finishB).a ? state.finishB : SHARED[0].id); refresh(); }
    });
  }
  function refreshPanel(k) {
    var el = document.getElementById('prod' + k.toUpperCase()), f = finishFor(k);
    el.classList.toggle('is-unlocked', !!f);
    var fin = document.getElementById('fin' + k);
    if (fin) fin.innerHTML = f ? '<span class="setprod__fchip" style="' + swatchStyle(f) + '"></span><span>' + esc(f.name) + (f.code ? ' · ' + f.code : '') + '</span>' : '';
    var pr = document.getElementById('price' + k); if (pr) pr.innerHTML = '<b>' + eur(productTotal(k)) + '</b>';
    if (k === 'a') { var sep = document.getElementById('sepA'); if (sep) sep.hidden = !state.diverged;
      el.querySelectorAll('[data-fina]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-fina') === state.finishA ? 'true' : 'false'); }); }
  }

  /* ---- combined summary ---- */
  function lineItems() {
    var rows = [];
    ['a', 'b'].forEach(function (k) {
      var p = PRODUCTS[k], f = finishFor(k);
      rows.push('<div class="setsum__item"><div class="setsum__iname">' + esc(p.name) + '</div>' +
        '<div class="setsum__imeta">' + (f ? esc(f.name) + (f.code ? ' · ' + f.code : '') : '<span class="setsum__todo">Farbe offen</span>') + '</div>' +
        '<div class="setsum__iprice">' + eur(productTotal(k)) + '</div></div>');
      p.options.forEach(function (o) { var d = optDelta(k, o); if (o.type === 'radio' && d > 0) { var c = o.choices.filter(function (x) { return x.v === state[k][o.id]; })[0];
        rows.push('<div class="setsum__sub"><span>' + esc(o.label) + ': ' + esc(c.label) + '</span><span>+' + eur(d) + '</span></div>'); } });
    });
    return rows.join('');
  }
  function refreshSummary() {
    var el = document.getElementById('setsum');
    var sub = productTotal('a') + productTotal('b'), ready = bothChosen(), disc = ready ? sub * SET_DISCOUNT : 0, total = sub - disc;
    el.innerHTML = '<div class="setsum__card"><h2 class="setsum__title">Ihr Set</h2>' +
      '<div class="setsum__items">' + lineItems() + '</div>' +
      '<div class="setsum__rows"><div class="setsum__row"><span>Zwischensumme</span><span>' + eur(sub) + '</span></div>' +
      '<div class="setsum__row setsum__row--disc' + (ready ? '' : ' is-off') + '"><span>Set-Rabatt <em>−10&nbsp;%</em></span><span>' + (ready ? '−' + eur(disc) : '–') + '</span></div></div>' +
      '<div class="setsum__total"><span>Gesamt</span><b id="setTotal">' + eur(total) + '</b></div>' +
      '<p class="setsum__ship"><span class="setsum__dot"></span>Sofort verfügbar · <b>Versandkostenfrei</b> im Set</p>' +
      '<button type="button" class="setsum__cta"' + (ready ? '' : ' aria-disabled="true"') + '>' + (ready ? 'Set in den Warenkorb' : 'Bitte Set-Farbe wählen') + '</button>' +
      '<p class="setsum__note">Optionspreise sind repräsentative Platzhalter (Prototyp).</p></div>';
  }

  function refresh() { refreshRail(); refreshPanel('a'); refreshPanel('b'); refreshSummary(); }
  renderRail(); renderPanel('a'); renderPanel('b'); refresh();
})();
