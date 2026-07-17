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

  var state = {
    finish: '', finishDelta: 0, article: '', mainQty: 1,   /* no colour pre-selected — user must choose (each colour is its own article) */
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

  /* ── Central refresh ── */
  function refresh() {
    var t = euro(total());
    var el = $('bTotal');
    if (el && el.textContent !== t) { el.textContent = t; el.classList.remove('is-bump'); void el.offsetWidth; el.classList.add('is-bump'); }
    var sp = $('bStickyPrice'); if (sp) sp.innerHTML = 'konfiguriert · <b>' + t + '</b>';

    setTxt('pdpFinishName', state.finish || 'Bitte Farbe wählen');
    setTxt('bArticleInline', state.article || '—');
    var sf = $('pdpStickyFinish'); if (sf) sf.textContent = state.finish || 'Farbe wählen';

    /* before a colour is chosen: CTA prompts for the colour, and the price section
       shows only the price block (the Preisdetails/Menge bar stays hidden) */
    var cartBtn = $('bCart'); if (cartBtn) cartBtn.textContent = state.finish ? 'In den Warenkorb' : 'Bitte Farbe wählen';
    var sLabel = $('pdpStickyLabel'); if (sLabel) sLabel.textContent = state.finish ? 'In den Warenkorb' : 'Bitte Farbe wählen';
    var priceBar = $('bAcc'); if (priceBar) priceBar.classList.toggle('is-precolor', !state.finish);

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
    setTxt('bStromQty', state.stromQty);
    var sqw = $('bStromQtyWrap'); if (sqw) sqw.classList.toggle('is-shown', hasStrom());
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
    h += row('<b>Metzler VDM10 2.0</b>', esc(state.finish), roQty(state.mainQty), euro(state.mainQty * (BASE + state.finishDelta)));
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

  /* ── Farbe = VARIANTE ── */
  var sw = $('pdpSwatches');
  if (sw) sw.addEventListener('click', function (e) {
    var b = e.target.closest('.pdp-swatch'); if (!b) return;
    this.querySelectorAll('.pdp-swatch').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    b.setAttribute('aria-pressed', 'true');
    state.finish = b.getAttribute('data-finish'); state.finishDelta = parseFloat(b.getAttribute('data-delta')) || 0;
    state.article = b.getAttribute('data-article') || state.article;
    var img = $('pdpMainImg'); if (img) { img.style.opacity = '0.35'; window.setTimeout(function () { img.style.opacity = '1'; }, 200); }
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
    var restoreName = function () { setTxt('pdpFinishName', state.finish || 'Bitte Farbe wählen'); };
    sw.addEventListener('mouseover', previewName);
    sw.addEventListener('mouseout', restoreName);
    sw.addEventListener('focusin', previewName);
    sw.addEventListener('focusout', restoreName);
  }

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
  function toast(msg) { if (!toastEl) return; toastMsg.textContent = msg; toastEl.classList.add('is-shown'); clearTimeout(toastTimer); toastTimer = window.setTimeout(function () { toastEl.classList.remove('is-shown'); }, 2800); }
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
