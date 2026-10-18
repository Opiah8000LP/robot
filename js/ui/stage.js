/* ==========================================================================
   stage.js — the floating interface: orbs, side menu, main panel, top bar,
   pointer parallax, swipe gestures, search highlight on arrival.
   ========================================================================== */
(function () {
  'use strict';
  var RDW = window.RDW; var h = RDW.h;

  var els = {};
  var route = { section: 'home', page: null, block: null, q: '' };
  var lastSection = null;
  var renderToken = 0;
  var spyBlocks = [];

  /* ---- helpers ---------------------------------------------------------------- */
  function sectionCtx(sec, pageId) {
    return { sectionId: sec.id, pageId: pageId || null, imgFolder: pageId ? 'images/' + sec.id + '/' + pageId + '/' : 'images/' + sec.id + '/' };
  }
  function visibleBlocks(blocks) { return (blocks || []).filter(function (b) { return !b.hidden; }); }
  function scrollBehavior(instant) { return instant || !RDW.motionOK() ? 'auto' : 'smooth'; }
  /** Scrolls ONLY the panel (scrollIntoView can nudge the whole app, which leaves docks floating mid-screen). */
  function scrollPanelTo(el, where, instant) {
    var p = els.panel, pr = p.getBoundingClientRect(), er = el.getBoundingClientRect();
    var pad = where === 'center' ? Math.max(0, p.clientHeight / 2 - Math.min(er.height, p.clientHeight / 2) / 2) : (parseFloat(getComputedStyle(p).scrollPaddingTop) || 0);
    p.scrollTo({ top: Math.max(0, p.scrollTop + (er.top - pr.top) - pad), behavior: scrollBehavior(instant) });
  }

  /* ---- orbs ------------------------------------------------------------------- */
  function buildNav() {
    var list = els.orbsList; RDW.clear(list);
    RDW.nav.list(false).forEach(function (s, i) {
      var iconOk = RDW.iconOk && RDW.iconOk[s.id];
      var face = (s.icon && iconOk !== false)
        ? h('img', { src: s.icon, alt: '', onError: function (ev) { ev.target.replaceWith(h('span', { 'aria-hidden': 'true' }, s.glyph)); } })
        : h('span', { 'aria-hidden': 'true' }, s.glyph);
      var b = h('button', { type: 'button', class: 'orb', 'data-id': s.id, style: { '--i': i }, 'aria-label': s.title, tabindex: s.id === route.section ? '0' : '-1',
        onClick: function () { RDW.sfx.play('click'); RDW.router.go(s.id); },
        onMouseenter: function () { RDW.sfx.play('hover'); },
        onKeydown: function (e) {
          var btns = RDW.$$('.orb', list), k = btns.indexOf(e.currentTarget), n = btns.length, to = null;
          if (e.key === 'ArrowDown' || e.key === 'ArrowRight') to = (k + 1) % n; else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') to = (k - 1 + n) % n;
          else if (e.key === 'Home') to = 0; else if (e.key === 'End') to = n - 1;
          if (to !== null) { e.preventDefault(); btns[to].focus(); }
        } }, face, h('span', { class: 'orb-tip' }, s.title));
      list.appendChild(h('li', null, b));
    });
    markOrbs();
  }
  function markOrbs() {
    RDW.$$('.orb', els.orbsList).forEach(function (b) {
      var on = b.dataset.id === route.section;
      if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
      b.tabIndex = on ? 0 : -1;
      if (on && RDW.isMobile()) { var o = els.orbsList.parentNode; o.scrollLeft = b.offsetLeft - (o.clientWidth - b.offsetWidth) / 2; }
    });
  }

  /* ---- menu --------------------------------------------------------------------- */
  function buildMenu(title, items) {
    els.menuTitle.textContent = title;
    var ul = RDW.clear(els.menuList);
    if (!items.length) { ul.appendChild(h('li', { class: 'menu-empty' }, 'Nothing here yet.')); return; }
    var lastGroup = '';
    items.forEach(function (it, i) {
      if ((it.group || '') !== lastGroup && it.group) ul.appendChild(h('li', { class: 'menu-group', role: 'presentation' }, it.group));
      lastGroup = it.group || '';
      ul.appendChild(h('li', { class: 'menu-item', style: { '--i': Math.min(i, 24) } },
        h('button', { type: 'button', class: 'menu-btn' + (it.empty ? ' is-empty' : ''), 'data-id': it.id, onClick: function () { RDW.sfx.play('click'); jump(it.id); closeSheet(); },
          onMouseenter: function () { RDW.sfx.play('hover'); } }, it.title || '')));
    });
  }
  function jump(id, instant) {
    var el = document.getElementById('b-' + id); if (!el) return;
    scrollPanelTo(el, 'start', instant);
    var head = el.querySelector('.block-title'); if (head) { head.setAttribute('tabindex', '-1'); head.focus({ preventScroll: true }); }
    var hash = RDW.router.href({ section: route.section, page: route.page, block: id });
    try { history.replaceState(null, '', hash); } catch (e) { /* file:// quirks */ }
    route.block = id; markMenu(id);
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
  }
  function markMenu(id) {
    RDW.$$('.menu-btn', els.menuList).forEach(function (b) { if (b.dataset.id === id) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    var cur = RDW.$('.menu-btn[aria-current="true"]', els.menuList);
    if (cur && els.menuList.scrollHeight > els.menuList.clientHeight) {
      var r = cur.getBoundingClientRect(), p = els.menuList.getBoundingClientRect();
      if (r.top < p.top || r.bottom > p.bottom) els.menuList.scrollTop += (r.top - p.top) - (p.height - r.height) / 2;
    }
  }
  function spy() {
    if (!spyBlocks.length) return;
    var top = els.panel.getBoundingClientRect().top + 130, current = spyBlocks[0];
    for (var i = 0; i < spyBlocks.length; i++) { if (spyBlocks[i].getBoundingClientRect().top <= top) current = spyBlocks[i]; }
    var id = current.dataset.block;
    if (id !== route.block || !RDW.$('.menu-btn[aria-current="true"]', els.menuList)) { route.block = id; markMenu(id); }
  }
  var spySoon = (function () { var t = false; return function () { if (t) return; t = true; requestAnimationFrame(function () { t = false; spy(); }); }; })();

  function openSheet() { els.menu.classList.add('is-open'); var f = RDW.$('.menu-btn', els.menu); if (f) f.focus(); }
  function closeSheet() { els.menu.classList.remove('is-open'); }

  /* ---- panel rendering ------------------------------------------------------------- */
  function panelHead(title, sub) {
    return h('header', { class: 'panel-head' },
      h('div', null, sub ? h('p', { class: 'panel-sub' }, sub) : null, h('h1', { class: 'panel-title', tabindex: '-1', id: 'panel-title' }, title)),
      h('div', { class: 'panel-actions' }, h('button', { type: 'button', class: 'btn btn--small panel-contents-btn', onClick: openSheet, 'aria-haspopup': 'true' }, 'Contents')));
  }

  function blockItems(blocks, ctx) { return blocks.map(function (b) { return { id: b.id, title: b.title, group: b.group, empty: RDW.blocks.isEmpty(b, ctx) }; }); }

  function notFound(inner) {
    inner.appendChild(panelHead('Page not found'));
    inner.appendChild(h('div', { class: 'block' }, h('p', null, 'That page doesn’t exist.'), h('button', { type: 'button', class: 'btn', onClick: function () { RDW.router.go('home'); } }, 'Back to the start')));
    buildMenu('Lost', []);
    spyBlocks = [];
  }

  function renderPanel() {
    var inner = els.inner; RDW.clear(inner);
    var sec = RDW.nav.find(route.section);
    if (!sec || sec.hidden) { notFound(inner); document.title = 'Not found · ' + RDW.site.name; return; }
    var doc = RDW.store.get(sec.id) || { id: sec.id, blocks: [] };
    document.title = sec.title + ' · ' + RDW.site.name;
    var ctx, items;

    if (sec.layout === 'years') {
      var pages = (doc.pages || []).slice().sort(function (a, b) { return Number(b.year) - Number(a.year); }).filter(function (p) { return !p.hidden; });
      var page = pages.filter(function (p) { return p.id === route.page; })[0] || pages[0] || null;
      ctx = sectionCtx(sec, page ? page.id : null);
      route.page = page ? page.id : null;
      inner.appendChild(panelHead(sec.title + (page ? ' · ' + page.title : ''), 'Year by year'));
      var rail = h('nav', { class: 'year-rail', 'aria-label': 'Years' });
      pages.forEach(function (p) {
        rail.appendChild(h('button', { type: 'button', class: 'year-btn', 'aria-current': page && p.id === page.id ? 'page' : null, onClick: function () { RDW.sfx.play('click'); RDW.router.go(sec.id, { page: p.id }); } }, p.title));
      });
      if (pages.length) inner.appendChild(rail);
      if (!page) { inner.appendChild(h('p', { class: 'empty' }, 'No years added yet.')); items = []; }
      else {
        var vis = visibleBlocks(page.blocks);
        vis.forEach(function (b) { inner.appendChild(RDW.blocks.renderBlock(b, ctx)); });
        items = blockItems(vis, ctx);
      }
      buildMenu(page ? page.title : sec.title, items);
    } else if (sec.layout === 'dashboard') {
      ctx = sectionCtx(sec);
      inner.appendChild(panelHead(sec.title));
      inner.appendChild(RDW.dashboard.render(doc));
      var extra = visibleBlocks(doc.blocks);
      extra.forEach(function (b) { inner.appendChild(RDW.blocks.renderBlock(b, ctx)); });
      buildMenu(sec.title, RDW.dashboard.menuItems().concat(blockItems(extra, ctx)));
    } else {
      ctx = sectionCtx(sec);
      inner.appendChild(panelHead(sec.title));
      var blocks = visibleBlocks(doc.blocks);
      blocks.forEach(function (b) { inner.appendChild(RDW.blocks.renderBlock(b, ctx)); });
      if (!blocks.length) inner.appendChild(h('p', { class: 'empty' }, 'This section has nothing in it yet.'));
      buildMenu(sec.title, blockItems(blocks, ctx));
    }
    spyBlocks = RDW.$$('.block[data-block]', inner);
    markOrbs();
  }

  /* ---- showing a route -------------------------------------------------------------- */
  function afterRender(opts, sameSection) {
    var q = route.q, target = route.block;
    RDW.search.clearHighlight(els.inner);
    var marks = [];
    if (q) marks = RDW.search.highlight(els.inner, q);
    if (target && document.getElementById('b-' + target)) {
      var el = document.getElementById('b-' + target);
      el.classList.add('flash', 'is-hit-block');
      if (marks.length) scrollPanelTo(marks.filter(function (m) { return el.contains(m); })[0] || marks[0], 'center', !sameSection);
      else scrollPanelTo(el, 'start', !sameSection);
      markMenu(target);
    } else if (marks.length) {
      scrollPanelTo(marks[0], 'center', true);
    } else { els.panel.scrollTop = 0; spy(); }
    if (!opts.initial) { var t = document.getElementById('panel-title'); if (t && !target) t.focus({ preventScroll: true }); }
    if (q && !marks.length) RDW.toast('Found the right spot, but no exact text match on the page.');
    var title = RDW.$('.panel-title', els.inner); if (title) RDW.announce(title.textContent);
  }

  function show(r, opts) {
    opts = opts || {};
    route = Object.assign({ section: 'home', page: null, block: null, q: '' }, r);
    var sameSection = lastSection === route.section && !opts.initial;
    var token = ++renderToken;
    var animate = !opts.initial && !sameSection && RDW.motionOK() && els.inner.animate;
    var doIt = function () {
      if (token !== renderToken) return;
      renderPanel(); afterRender(opts, sameSection);
      if (animate) els.inner.animate([{ opacity: 0, transform: 'perspective(1000px) translateX(40px) rotateY(-16deg)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.2,.8,.2,1)' });
    };
    lastSection = route.section;
    closeSheet();
    if (animate) {
      var out = els.inner.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'perspective(1000px) translateX(-30px) rotateY(12deg)' }], { duration: 150, easing: 'ease-in', fill: 'forwards' });
      out.onfinish = function () { out.cancel(); doIt(); };
    } else doIt();
  }

  function step(dir) {
    var secs = RDW.nav.list(false); var i = secs.map(function (s) { return s.id; }).indexOf(route.section);
    var n = secs[(i + dir + secs.length) % secs.length]; RDW.sfx.play('click'); RDW.router.go(n.id);
  }
  function stepBlock(dir) {
    var btns = RDW.$$('.menu-btn', els.menuList); if (!btns.length) return;
    var cur = btns.map(function (b) { return b.getAttribute('aria-current') === 'true'; }).indexOf(true);
    var next = RDW.clamp((cur < 0 ? (dir > 0 ? 0 : btns.length - 1) : cur + dir), 0, btns.length - 1);
    jump(btns[next].dataset.id);
  }

  /* ---- pointer parallax: the whole scene leans toward the cursor -------------------- */
  function parallax() {
    var app = els.app, raf = false, mx = 0, my = 0;
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch' || !RDW.motionOK() || RDW.settings.get('tilt') === 'off') return;
      // hold still over the content, otherwise buttons slide out from under the cursor mid-click
      if (e.target && e.target.closest && e.target.closest('.panel, .menu, .orbs, .player')) return;
      mx = (e.clientX / window.innerWidth - 0.5) * 2; my = (e.clientY / window.innerHeight - 0.5) * 2;
      if (raf) return; raf = true;
      requestAnimationFrame(function () { raf = false; app.style.setProperty('--mx', mx.toFixed(3)); app.style.setProperty('--my', my.toFixed(3)); });
    }, { passive: true });
  }

  /* ---- swipe between sections on touch ----------------------------------------------- */
  function swipe() {
    var sx = 0, sy = 0, ok = false, t0 = 0;
    els.panel.addEventListener('touchstart', function (e) {
      var t = e.target; ok = e.touches.length === 1 && !(t.closest && t.closest('input, textarea, select, audio, .gallery, .plot, .chart-svg, .picbox, .table-wrap, [data-noswipe]'));
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; t0 = Date.now();
    }, { passive: true });
    els.panel.addEventListener('touchend', function (e) {
      if (!ok) return; var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 90 && Math.abs(dy) < 50 && Date.now() - t0 < 700 && !document.querySelector('dialog[open], .lb')) step(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  function clock() {
    var d = document.getElementById('clock-date'), t = document.getElementById('clock-time');
    function tick() { var n = new Date(); d.textContent = RDW.fmt.shortDate(n); t.textContent = RDW.fmt.time(n); }
    tick(); setInterval(tick, 15000);
  }

  /* ---- init -------------------------------------------------------------------------------------- */
  function init() {
    els.app = document.getElementById('app'); els.orbsList = document.getElementById('orbs-list');
    els.menu = document.getElementById('menu'); els.menuTitle = document.getElementById('menu-title'); els.menuList = document.getElementById('menu-list');
    els.panel = document.getElementById('panel'); els.inner = document.getElementById('panel-inner');
    var site = RDW.site;
    document.getElementById('brand-name').textContent = site.name;
    document.getElementById('brand').addEventListener('click', function () { RDW.sfx.play('click'); RDW.router.go('home'); });
    document.getElementById('btn-settings').addEventListener('click', RDW.ui.settingsDialog);
    document.getElementById('btn-help').addEventListener('click', RDW.ui.helpDialog);
    document.getElementById('btn-hl-clear').addEventListener('click', function () { RDW.search.clearHighlight(); });
    RDW.search.attach({ input: document.getElementById('global-search'), results: document.getElementById('global-results') });
    document.addEventListener('pointerdown', function (e) { if (els.menu.classList.contains('is-open') && !els.menu.contains(e.target) && !e.target.closest('.panel-contents-btn')) closeSheet(); });
    els.panel.addEventListener('scroll', spySoon, { passive: true });
    // overflow:hidden boxes can still be scrolled by focus() and friends; put the frame back if that happens
    els.app.addEventListener('scroll', function () { els.app.scrollTop = 0; els.app.scrollLeft = 0; });

    // an optional background photo, shown in greyscale so the site stays black & white
    var bg = site.backgrounds || {};
    function setBg() { var src = document.documentElement.getAttribute('data-theme') === 'dark' ? bg.dark || bg.light : bg.light || bg.dark; var el = document.getElementById('bg-image'); if (src && RDW.bgOk !== false) { el.style.backgroundImage = 'url("' + src + '")'; el.classList.add('has-image'); } else el.classList.remove('has-image'); }
    setBg();

    RDW.router.onRoute(function (r, opts) { show(r, opts); });
    RDW.settings.onChange(function (k) {
      if (k === 'theme' || k === 'system' || k === '*') setBg();
      if (k === 'chartPatterns' || k === 'textScale' || k === 'system' || k === '*') RDW.debounce(function () { renderToken++; var top = els.panel.scrollTop; renderPanel(); els.panel.scrollTop = top; }, 120)();
    });
    window.addEventListener('resize', RDW.debounce(markOrbs, 150));
    buildNav(); parallax(); swipe(); clock();
  }

  RDW.stage = {
    init: init, step: step, stepBlock: stepBlock, jump: jump, closeSheet: closeSheet, route: function () { return Object.assign({}, route); },
    /** the load-in: the whole scene flies in from depth (CSS does the work, see .is-entering) */
    enter: function () { els.app.classList.add('is-entering'); setTimeout(function () { els.app.classList.remove('is-entering'); }, 2600); }
  };
})();
