/* ============================================================
   pdp-b.js — VERSION B
   • Farbe = VARIANT (changes article number), outside config
   • Gravur / Innenstation / Zubehör = REQUIRED (each must be
     answered before checkout) — progressive-disclosure accordion
   • "In den Warenkorb" = always VISIBLE; locked (Ghost & Guide)
     until the required steps are answered
   ============================================================ */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var BASE = 699;
  var FONTS = { Serif: "Georgia,'Times New Roman',serif", Grotesk: "Arial,Helvetica,sans-serif", Mono: "'Courier New',monospace" };
  var STEP_NAMES = ['Gravur', 'Innenstation', 'Zubehör'];
  var state = { finish: 'Anthrazit RAL 7016', finishDelta: 0, article: '31101',
    gravurOn: false, gravurText: '', font: 'Serif',
    innen: null, innenDelta: 0, innenQty: 1, extras: {} };
  var answered = { gravur: false, innen: false, extras: false };

  function euro(n) { return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'; }
  function total() { var t = BASE + state.finishDelta + state.innenDelta * state.innenQty; for (var k in state.extras) t += state.extras[k]; return t; }
  function setTxt(id, txt) { var el = $(id); if (el) el.textContent = txt; }

  var items = [].slice.call(document.querySelectorAll('#cfgbSteps .stepr__item'));

  /* ── Central refresh: outputs + done markers + lock state ── */
  function refresh() {
    var t = euro(total());
    var el = $('bTotal');
    if (el && el.textContent !== t) { el.textContent = t; el.classList.remove('is-bump'); void el.offsetWidth; el.classList.add('is-bump'); }
    var sp = $('bStickyPrice'); if (sp) sp.innerHTML = 'konfiguriert · <b>' + t + '</b>';
    // variant
    setTxt('pdpFinishName', state.finish);
    setTxt('bArticle', state.article);
    setTxt('bArticleInline', state.article);
    var sf = $('pdpStickyFinish'); if (sf) sf.textContent = state.finish;
    // step summaries
    setTxt('bPickGravur', !answered.gravur ? 'Bitte wählen' : (state.gravurOn ? (state.gravurText ? '„' + state.gravurText + '" · ' + state.font : 'Mit Gravur') : 'Ohne Gravur'));
    setTxt('bPickInnen', !answered.innen ? 'Bitte wählen' : (state.innen === 'Nur App' ? 'Nur App · kostenlos' : state.innen + (state.innenQty > 1 ? ' ×' + state.innenQty : '') + ' · +' + euro(state.innenDelta * state.innenQty)));
    var nx = Object.keys(state.extras).length;
    setTxt('bPickExtras', !answered.extras ? 'Bitte wählen' : (nx ? nx + ' ausgewählt · +' + euro(Object.keys(state.extras).reduce(function (a, k) { return a + state.extras[k]; }, 0)) : 'Kein Zubehör'));
    // engraving preview
    var eng = $('bEngrave'); if (eng) { eng.textContent = (state.gravurOn && state.gravurText) ? state.gravurText : ''; eng.style.fontFamily = FONTS[state.font] || ''; }
    markDone();
    updateLock();
  }

  function markDone() {
    var d = [answered.gravur, answered.innen, answered.extras];
    items.forEach(function (it, i) { if (!it.classList.contains('is-active')) it.classList.toggle('is-done', !!d[i]); });
  }

  function remaining() {
    var r = []; if (!answered.gravur) r.push(STEP_NAMES[0]); if (!answered.innen) r.push(STEP_NAMES[1]); if (!answered.extras) r.push(STEP_NAMES[2]); return r;
  }
  function updateLock() {
    var rem = remaining(), ready = rem.length === 0;
    [$('bCart'), $('pdpStickyCta')].forEach(function (b) { if (b) { b.classList.toggle('is-locked', !ready); b.setAttribute('aria-disabled', ready ? 'false' : 'true'); } });
    var g = $('bGuide'), gt = $('bGuideText');
    if (g) g.classList.toggle('is-ready', ready);
    if (gt) gt.textContent = ready ? 'Konfiguration vollständig — bereit für den Warenkorb.' : 'Bitte Konfiguration abschließen — noch: ' + rem.join(', ');
    if (g) { var svg = g.querySelector('svg'); if (svg) svg.innerHTML = ready ? '<path d="M20 6L9 17l-5-5"/>' : '<path d="M12 8v4m0 4h.01M12 3l9 16H3z"/>'; }
  }

  /* ── Accordion (one open at a time) + guided auto-advance ── */
  function openStep(i) {
    items.forEach(function (it, ix) {
      var active = ix === i;
      it.classList.toggle('is-active', active);
      it.querySelector('.stepr__head').setAttribute('aria-expanded', active ? 'true' : 'false');
    });
    markDone();
    if (i > -1 && items[i]) window.setTimeout(function () { items[i].querySelector('.stepr__head').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 120);
  }
  function firstUnanswered() { var d = [answered.gravur, answered.innen, answered.extras]; for (var i = 0; i < d.length; i++) if (!d[i]) return i; return -1; }
  function advance() { window.setTimeout(function () { openStep(firstUnanswered()); }, 420); }

  items.forEach(function (it, ix) {
    it.querySelector('.stepr__head').addEventListener('click', function () { openStep(it.classList.contains('is-active') ? -1 : ix); });
  });

  /* ── Farbe = VARIANT (changes article number) ── */
  var sw = $('pdpSwatches');
  if (sw) sw.addEventListener('click', function (e) {
    var b = e.target.closest('.pdp-swatch'); if (!b) return;
    this.querySelectorAll('.pdp-swatch').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    b.setAttribute('aria-pressed', 'true');
    state.finish = b.getAttribute('data-finish'); state.finishDelta = parseFloat(b.getAttribute('data-delta')) || 0;
    state.article = b.getAttribute('data-article') || state.article;
    var img = $('pdpMainImg'); if (img) { img.style.opacity = '0.35'; window.setTimeout(function () { img.style.opacity = '1'; }, 200); }
    refresh();
  });

  /* ── Hero: thumbnails + toggle ── */
  var thumbs = $('pdpThumbs'), mainImg = $('pdpMainImg');
  if (thumbs && mainImg) thumbs.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-current', 'false'); });
    b.setAttribute('aria-current', 'true');
    var im = b.querySelector('img'); if (im) { mainImg.style.opacity = '0'; window.setTimeout(function () { mainImg.src = im.getAttribute('src'); mainImg.alt = im.getAttribute('alt') || mainImg.alt; mainImg.style.opacity = '1'; }, 160); }
  });
  var mtoggle = document.querySelector('.pdp-media__toggle');
  if (mtoggle) mtoggle.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    b.setAttribute('aria-pressed', 'true');
  });

  /* ── Gravur (required) ── */
  var seg = $('bGravurSeg');
  if (seg) seg.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    b.setAttribute('aria-pressed', 'true');
    state.gravurOn = b.getAttribute('data-gravur') === 'on';
    $('bGravurField').classList.toggle('is-shown', state.gravurOn);
    if (state.gravurOn) { answered.gravur = state.gravurText.length > 0; refresh(); if (answered.gravur) advance(); else $('bGravurText').focus(); }
    else { answered.gravur = true; refresh(); advance(); }
  });
  var gt = $('bGravurText'); if (gt) gt.addEventListener('input', function () { state.gravurText = this.value; answered.gravur = state.gravurOn ? this.value.length > 0 : answered.gravur; refresh(); });
  var fonts = $('bFonts');
  if (fonts) fonts.addEventListener('click', function (e) {
    var b = e.target.closest('.cfg-font'); if (!b) return;
    this.querySelectorAll('.cfg-font').forEach(function (x) { x.classList.remove('is-selected'); });
    b.classList.add('is-selected'); state.font = b.getAttribute('data-font'); if (gt) gt.style.fontFamily = FONTS[state.font] || ''; refresh();
  });

  /* ── Innenstation (required) ── */
  var innen = $('bInnen');
  if (innen) innen.addEventListener('click', function (e) {
    var b = e.target.closest('.cfg-opt'); if (!b) return;
    this.querySelectorAll('.cfg-opt').forEach(function (x) { x.classList.remove('is-selected'); });
    b.classList.add('is-selected');
    state.innen = b.getAttribute('data-innen'); state.innenDelta = parseFloat(b.getAttribute('data-delta')) || 0;
    $('bInnenQtyWrap').classList.toggle('is-shown', state.innen !== 'Nur App');
    answered.innen = true; refresh(); advance();
  });
  var qw = $('bInnenQtyWrap');
  if (qw) qw.addEventListener('click', function (e) {
    var q = e.target.closest('[data-q]'); if (!q) return;
    state.innenQty = Math.max(1, Math.min(6, state.innenQty + parseInt(q.getAttribute('data-q'), 10)));
    $('bInnenQty').textContent = state.innenQty; refresh();
  });

  /* ── Zubehör (required — either pick add-ons or confirm "kein Zubehör") ── */
  var noExtras = $('bNoExtras');
  document.querySelectorAll('.cfgb .cfg-opt--check').forEach(function (b) {
    b.addEventListener('click', function () {
      var name = b.getAttribute('data-extra'), d = parseFloat(b.getAttribute('data-delta')) || 0;
      if (b.classList.toggle('is-selected')) state.extras[name] = d; else delete state.extras[name];
      if (noExtras) noExtras.classList.remove('is-selected');
      answered.extras = true; refresh();
    });
  });
  if (noExtras) noExtras.addEventListener('click', function () {
    state.extras = {};
    document.querySelectorAll('.cfgb .cfg-opt--check.is-selected').forEach(function (x) { x.classList.remove('is-selected'); });
    noExtras.classList.add('is-selected');
    answered.extras = true; refresh(); advance();
  });

  /* ── Toast + add to cart (guarded by lock) ── */
  var toastEl = $('cfgToast'), toastMsg = $('cfgToastMsg'), toastTimer;
  function toast(msg) { if (!toastEl) return; toastMsg.textContent = msg; toastEl.classList.add('is-shown'); clearTimeout(toastTimer); toastTimer = window.setTimeout(function () { toastEl.classList.remove('is-shown'); }, 2800); }
  function tryCart() {
    if (remaining().length) { // Ghost & Guide: locked → guide to the next open item
      openStep(firstUnanswered());
      var g = $('bGuide'); if (g) { g.style.transition = 'none'; g.style.opacity = '0.4'; void g.offsetWidth; g.style.transition = 'opacity .3s'; g.style.opacity = '1'; }
      return;
    }
    toast('In den Warenkorb gelegt · ' + euro(total()));
    var badge = document.querySelector('.header .badge'); if (badge) badge.textContent = (parseInt(badge.textContent, 10) || 0) + 1;
  }
  var cart = $('bCart'); if (cart) cart.addEventListener('click', tryCart);
  var stickyCta = $('pdpStickyCta'); if (stickyCta) stickyCta.addEventListener('click', tryCart);
  var share = $('pdpShare'); if (share) share.addEventListener('click', function () { if (navigator.share) navigator.share({ title: document.title, url: location.href }).catch(function () {}); });

  /* ── Sticky bar: visible whenever the in-flow CTA is off-screen ── */
  var bar = $('pdpStickyBar');
  if (cart && bar && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { var show = !en.isIntersecting; bar.classList.toggle('is-visible', show); bar.setAttribute('aria-hidden', show ? 'false' : 'true'); });
    }, { threshold: 0 });
    io.observe(cart);
  }

  refresh();
})();
