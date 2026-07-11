/* ============================================================
   pdp.js — VDM10 PDP interactions (Section 1: hero)
   Faked front-end behaviour only (no backend/cart).
   ============================================================ */
(function () {
  'use strict';

  /* ── Finish swatches: select → update label + sticky bar + main image swap ── */
  var swatches = document.getElementById('pdpSwatches');
  var finishName = document.getElementById('pdpFinishName');
  var stickyFinish = document.getElementById('pdpStickyFinish');
  var mainImg = document.getElementById('pdpMainImg');
  var thumbs = document.getElementById('pdpThumbs');

  if (swatches) {
    swatches.addEventListener('click', function (e) {
      var btn = e.target.closest('.pdp-swatch');
      if (!btn) return;
      swatches.querySelectorAll('.pdp-swatch').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      var finish = btn.getAttribute('data-finish') || '';
      if (finishName) finishName.textContent = finish;
      if (stickyFinish) stickyFinish.textContent = finish;
      // Prototype: no per-finish hero render available → briefly cross-fade the stage to signal the change.
      if (mainImg) {
        mainImg.style.opacity = '0.35';
        window.setTimeout(function () { mainImg.style.opacity = '1'; }, 220);
      }
    });
  }

  /* ── Gallery thumbnails: swap the main image ── */
  if (thumbs && mainImg) {
    thumbs.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      thumbs.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-current', 'false'); });
      btn.setAttribute('aria-current', 'true');
      var img = btn.querySelector('img');
      if (img) {
        mainImg.style.opacity = '0';
        window.setTimeout(function () {
          mainImg.src = img.getAttribute('src');
          mainImg.alt = img.getAttribute('alt') || mainImg.alt;
          mainImg.style.opacity = '1';
        }, 160);
      }
    });
  }

  /* ── Fotos / 3D view toggle (visual only for now) ── */
  var toggle = document.querySelector('.pdp-media__toggle');
  if (toggle) {
    toggle.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      toggle.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
    });
  }

  /* ── Sticky purchase bar: reveal once the hero CTA scrolls out of view ── */
  var cta = document.getElementById('pdpCta');
  var bar = document.getElementById('pdpStickyBar');
  if (cta && bar && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var show = !entry.isIntersecting && entry.boundingClientRect.top < 0; // scrolled past
        bar.classList.toggle('is-visible', show);
        bar.setAttribute('aria-hidden', show ? 'false' : 'true');
      });
    }, { rootMargin: '-120px 0px 0px 0px', threshold: 0 });
    io.observe(cta);
  }

  /* ── CTA feedback (prototype stub — real flow opens the configurator) ── */
  function ctaFeedback(el) {
    if (!el) return;
    var original = el.getAttribute('data-label') || el.innerHTML;
    el.setAttribute('data-busy', '1');
    el.style.opacity = '0.85';
    window.setTimeout(function () { el.style.opacity = '1'; el.removeAttribute('data-busy'); }, 260);
  }
  if (cta) cta.addEventListener('click', function () { ctaFeedback(cta); });
  var stickyCta = document.getElementById('pdpStickyCta');
  if (stickyCta) stickyCta.addEventListener('click', function () {
    ctaFeedback(stickyCta);
    var hero = document.getElementById('ueberblick');
    if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ── Share (prototype stub) ── */
  var share = document.getElementById('pdpShare');
  if (share) share.addEventListener('click', function () {
    if (navigator.share) { navigator.share({ title: document.title, url: location.href }).catch(function(){}); }
  });
})();

/* ============================================================
   Configurator — immersive guided flow (prototype, no backend)
   ============================================================ */
(function () {
  'use strict';
  var overlay = document.getElementById('pdpConfigurator');
  if (!overlay) return;

  var BASE = 699;
  var steps = [].slice.call(overlay.querySelectorAll('.cfg-step'));
  var railBtns = [].slice.call(overlay.querySelectorAll('.cfg-rail__step'));
  var idx = 1; // opens at "Gravur" — finish is already chosen in the hero

  var state = {
    finish: 'Anthrazit RAL 7016', finishDelta: 0,
    gravurOn: false, gravurText: '', font: 'Serif',
    innen: 'Nur App', innenDelta: 0, innenQty: 1,
    led: 'Weiß', extras: {}
  };
  var lastIdx = idx, openerEl = null;
  var FONTS = { Serif: "Georgia,'Times New Roman',serif", Grotesk: "Arial,Helvetica,sans-serif", Mono: "'Courier New',monospace" };
  function applyFont() {
    var f = FONTS[state.font] || '';
    var eng = document.getElementById('cfgEngrave'); if (eng) eng.style.fontFamily = f;
    var inp = document.getElementById('cfgGravurText'); if (inp) inp.style.fontFamily = f;
  }

  function euro(n) { return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'; }
  function finishDeltaFor(name) { return /Wunschfarbe/i.test(name) ? 49 : 0; }
  function total() {
    var t = BASE + state.finishDelta + state.innenDelta * state.innenQty;
    for (var k in state.extras) t += state.extras[k];
    return t;
  }

  var $ = function (id) { return document.getElementById(id); };

  /* ── Sync helpers between hero and configurator ── */
  function syncHero() {
    var hn = $('pdpFinishName'); if (hn) hn.textContent = state.finish;
    var sf = $('pdpStickyFinish'); if (sf) sf.textContent = state.finish;
    var hs = $('pdpSwatches');
    if (hs) hs.querySelectorAll('.pdp-swatch').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-finish') === state.finish ? 'true' : 'false');
    });
  }
  function syncFromHero() {
    var hn = $('pdpFinishName'); if (hn) state.finish = hn.textContent.trim();
    state.finishDelta = finishDeltaFor(state.finish);
    overlay.querySelectorAll('#cfgSwatches .cfg-swatch').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-finish') === state.finish ? 'true' : 'false');
    });
  }

  /* ── Open / close ── */
  function open() { syncFromHero(); idx = 1; lastIdx = 1; render(); overlay.classList.add('is-open'); overlay.setAttribute('aria-hidden', 'false'); document.body.classList.add('cfg-lock'); overlay.focus({ preventScroll: true }); }
  function close() { overlay.classList.remove('is-open'); overlay.setAttribute('aria-hidden', 'true'); document.body.classList.remove('cfg-lock'); if (openerEl) openerEl.focus(); }

  /* ── Render current step ── */
  function railValue(i) {
    switch (i) {
      case 0: return state.finish;
      case 1: return state.gravurOn ? (state.gravurText || 'mit Gravur') : 'ohne';
      case 2: return state.innen === 'Nur App' ? 'App' : state.innen.replace('Innenstation ', '') + (state.innenQty > 1 ? ' ×' + state.innenQty : '');
      case 3: return state.led;
      case 4: var n = Object.keys(state.extras).length; return n ? n + ' Artikel' : 'ohne';
      default: return '';
    }
  }
  function render() {
    var wrap = overlay.querySelector('.cfg-steps');
    if (wrap) wrap.setAttribute('data-dir', idx >= lastIdx ? 'fwd' : 'back');
    lastIdx = idx;
    steps.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
    railBtns.forEach(function (b, i) {
      b.classList.toggle('is-active', i === idx);
      b.classList.toggle('is-done', i < idx);
      var n = b.querySelector('b');
      if (n) { if (!b.hasAttribute('data-n')) b.setAttribute('data-n', n.textContent); n.textContent = i < idx ? '✓' : b.getAttribute('data-n'); }
      var val = i < idx ? railValue(i) : '';
      var vs = b.querySelector('.val');
      if (val) { if (!vs) { vs = document.createElement('span'); vs.className = 'val'; b.appendChild(vs); } vs.textContent = '· ' + val; }
      else if (vs) vs.remove();
    });
    var last = idx === steps.length - 1;
    var prev = $('cfgPrev'); prev.style.visibility = idx === 0 ? 'hidden' : 'visible';
    $('cfgNext').hidden = last;
    $('cfgCart').hidden = !last;
    var ind = $('cfgRailInd'), act = railBtns[idx];
    if (ind && act) { ind.style.left = act.offsetLeft + 'px'; ind.style.width = act.offsetWidth + 'px'; act.scrollIntoView({ block: 'nearest', inline: 'center' }); }
    var sn = $('cfgStepNo'); if (sn) sn.textContent = 'Schritt ' + (idx + 1) + ' von ' + steps.length;
    updateTotal();
    updatePreview();
    if (last) renderSummary();
    var body = overlay.querySelector('.cfg-body'); if (body) body.scrollTop = 0;
  }
  function updateTotal() {
    var el = $('cfgTotal'), txt = euro(total());
    if (el.textContent !== txt) { el.textContent = txt; el.classList.remove('is-bump'); void el.offsetWidth; el.classList.add('is-bump'); }
    buildChips();
  }
  function buildChips() {
    var c = $('cfgChips'); if (!c) return;
    var chips = [state.finish];
    if (state.gravurOn) chips.push('Gravur' + (state.gravurText ? ' „' + state.gravurText + '"' : ''));
    if (state.innen !== 'Nur App') chips.push(state.innen + (state.innenQty > 1 ? ' ×' + state.innenQty : ''));
    if (state.led !== 'Weiß') chips.push('LED ' + state.led);
    var ex = Object.keys(state.extras).length; if (ex) chips.push(ex + '× Zubehör');
    c.innerHTML = chips.map(function (t) { return '<span class="cfg-bar__chip">' + t + '</span>'; }).join('');
  }

  function updatePreview() {
    var img = $('cfgPreviewImg');
    var src = idx === 2 ? 'Product Image/Sprechanlage/innenstation.png' : 'Product Image/Sprechanlage/video-station.png';
    if (img && img.getAttribute('src') !== src) { img.style.opacity = '0'; window.setTimeout(function () { img.src = src; img.style.opacity = '1'; }, 150); }
    $('cfgPrevFinish').textContent = state.finish;
    var eng = $('cfgEngrave'); if (eng) eng.textContent = (idx !== 2 && state.gravurOn && state.gravurText) ? state.gravurText : ''; /* nameplate lives on the door station, not the Innenstation */
    var pi = $('cfgPrevInnen');
    if (pi) {
      if (state.innen !== 'Nur App') { pi.hidden = false; pi.querySelector('b').textContent = state.innen.replace('Innenstation ', '') + (state.innenQty > 1 ? ' ×' + state.innenQty : ''); }
      else { pi.hidden = true; }
    }
    applyFont();
    buildChips();
  }

  function renderSummary() {
    var rows = [];
    rows.push(['Metzler VDM10 2.0 | Colson', euro(BASE), false]);
    rows.push(['Farbe: ' + state.finish, state.finishDelta ? '+' + euro(state.finishDelta) : 'inklusive', state.finishDelta === 0]);
    rows.push(['Gravur', state.gravurOn ? ((state.gravurText ? '„' + state.gravurText + '" · ' + state.font : 'Mit Gravur') + ' · inklusive') : 'Ohne Gravur', true]);
    rows.push(['Innenstation', state.innen === 'Nur App' ? 'Nur App · kostenlos' : (state.innen + ' ×' + state.innenQty + ' · +' + euro(state.innenDelta * state.innenQty)), state.innen === 'Nur App']);
    rows.push(['Klingeltaster-LED: ' + state.led, 'inklusive', true]);
    for (var k in state.extras) rows.push([k, '+' + euro(state.extras[k]), false]);
    var html = rows.map(function (r) {
      var val = r[2] ? '<span class="incl">' + r[1] + '</span>' : '<b>' + r[1] + '</b>';
      return '<div class="cfg-summary__row"><span>' + r[0] + '</span>' + val + '</div>';
    }).join('');
    html += '<div class="cfg-summary__row cfg-summary__total"><span>Gesamt</span><b>' + euro(total()) + '</b></div>';
    $('cfgSummary').innerHTML = html;
  }

  /* ── Option wiring ── */
  var cfgSwatches = $('cfgSwatches');
  if (cfgSwatches) cfgSwatches.addEventListener('click', function (e) {
    var b = e.target.closest('.cfg-swatch'); if (!b) return;
    this.querySelectorAll('.cfg-swatch').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    b.setAttribute('aria-pressed', 'true');
    state.finish = b.getAttribute('data-finish');
    state.finishDelta = parseFloat(b.getAttribute('data-delta')) || 0;
    syncHero(); updateTotal(); updatePreview();
  });

  overlay.querySelectorAll('[data-gravur]').forEach(function (b) {
    b.addEventListener('click', function () {
      overlay.querySelectorAll('[data-gravur]').forEach(function (x) { x.classList.remove('is-selected'); });
      b.classList.add('is-selected');
      state.gravurOn = b.getAttribute('data-gravur') === 'on';
      $('cfgGravurField').classList.toggle('is-shown', state.gravurOn);
      updatePreview();
    });
  });
  var gt = $('cfgGravurText'); if (gt) gt.addEventListener('input', function () { state.gravurText = this.value; updatePreview(); });
  var fonts = $('cfgFonts');
  if (fonts) fonts.addEventListener('click', function (e) {
    var b = e.target.closest('.cfg-font'); if (!b) return;
    this.querySelectorAll('.cfg-font').forEach(function (x) { x.classList.remove('is-selected'); });
    b.classList.add('is-selected'); state.font = b.getAttribute('data-font'); applyFont();
  });

  var innen = $('cfgInnen');
  if (innen) innen.addEventListener('click', function (e) {
    var b = e.target.closest('.cfg-opt'); if (!b) return;
    this.querySelectorAll('.cfg-opt').forEach(function (x) { x.classList.remove('is-selected'); });
    b.classList.add('is-selected');
    state.innen = b.getAttribute('data-innen');
    state.innenDelta = parseFloat(b.getAttribute('data-delta')) || 0;
    $('cfgInnenQtyWrap').classList.toggle('is-shown', state.innen !== 'Nur App');
    updateTotal(); updatePreview();
  });
  var qtyWrap = $('cfgInnenQtyWrap');
  if (qtyWrap) qtyWrap.addEventListener('click', function (e) {
    var q = e.target.closest('[data-q]'); if (!q) return;
    state.innenQty = Math.max(1, Math.min(6, state.innenQty + parseInt(q.getAttribute('data-q'), 10)));
    $('cfgInnenQty').textContent = state.innenQty;
    updateTotal(); updatePreview();
  });

  var led = $('cfgLed');
  if (led) led.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    this.querySelectorAll('button').forEach(function (x) { x.classList.remove('is-selected'); });
    b.classList.add('is-selected'); state.led = b.getAttribute('data-led'); updateTotal();
  });

  overlay.querySelectorAll('.cfg-opt--check').forEach(function (b) {
    b.addEventListener('click', function () {
      var name = b.getAttribute('data-extra');
      var d = parseFloat(b.getAttribute('data-delta')) || 0;
      if (b.classList.toggle('is-selected')) state.extras[name] = d; else delete state.extras[name];
      updateTotal();
    });
  });

  /* ── Navigation ── */
  $('cfgNext').addEventListener('click', function () { if (idx < steps.length - 1) { idx++; render(); } });
  $('cfgPrev').addEventListener('click', function () { if (idx > 0) { idx--; render(); } });
  railBtns.forEach(function (b) { b.addEventListener('click', function () { idx = parseInt(b.getAttribute('data-goto'), 10) || 0; render(); }); });
  overlay.querySelectorAll('[data-skip]').forEach(function (s) { s.addEventListener('click', function () { if (idx < steps.length - 1) { idx++; render(); } }); });

  /* ── Toast ── */
  var toastEl = $('cfgToast'), toastMsg = $('cfgToastMsg'), toastTimer;
  function toast(msg) { if (!toastEl) return; toastMsg.textContent = msg; toastEl.classList.add('is-shown'); clearTimeout(toastTimer); toastTimer = window.setTimeout(function () { toastEl.classList.remove('is-shown'); }, 2800); }

  /* ── Close / save / add-to-cart ── */
  $('cfgClose').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('is-open')) close(); });
  $('cfgSave').addEventListener('click', function () { toast('Konfiguration gespeichert'); });
  $('cfgCart').addEventListener('click', function () {
    var sum = total(); close(); toast('In den Warenkorb gelegt · ' + euro(sum));
    var badge = document.querySelector('.header .badge');
    if (badge) badge.textContent = (parseInt(badge.textContent, 10) || 0) + 1;
  });

  /* ── Open triggers: hero CTA + sticky CTA (remember opener for focus return) ── */
  var heroCta = $('pdpCta'); if (heroCta) heroCta.addEventListener('click', function () { openerEl = heroCta; open(); });
  var stickyCta = $('pdpStickyCta'); if (stickyCta) stickyCta.addEventListener('click', function () { openerEl = stickyCta; open(); });
})();
