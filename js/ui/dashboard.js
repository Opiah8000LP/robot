/* ==========================================================================
   dashboard.js — the home screen: welcome + search + picture box, an intro
   paragraph area, "This Year In My Life", and recent activity. All of it
   reads from data/sections/home.js.
   ========================================================================== */
(function () {
  'use strict';
  var RDW = window.RDW; var h = RDW.h;
  var KEY = 'home';
  var DEFAULT_WELCOME = 'Welcome.';
  var RECENT = [{ id: 'projects', label: 'Projects' }, { id: 'milestones', label: 'Milestones' }, { id: 'achievements', label: 'Achievements' }];

  function doc() { return RDW.store.get(KEY) || { recent: {}, thisYear: {} }; }
  function has(v) { return String(v === undefined || v === null ? '' : v).trim() !== ''; }

  function widget(id, title, body) {
    return h('section', { class: 'block block--widget', id: 'b-' + id, 'data-block': id, 'aria-labelledby': 'bt-' + id },
      h('div', { class: 'block-head' }, h('h2', { class: 'block-title', id: 'bt-' + id }, title)), h('div', { class: 'block-body' }, body));
  }

  /* ---- the picture box ---------------------------------------------------------------- */
  // Shows images/box.png (or whatever home.js says). Leans toward the pointer, wobbles when poked.
  function picbox(d) {
    var cfg = d.box || {};
    var src = has(cfg.image) ? cfg.image : 'images/box.png';
    var img = h('img', { class: 'picbox-img', src: src, alt: has(cfg.alt) ? cfg.alt : '', draggable: 'false' });
    var miss = h('div', { class: 'picbox-miss', hidden: true }, h('span', null, 'Put a picture here'), h('code', null, src));
    var face = h('div', { class: 'picbox-face' }, img, miss);
    img.addEventListener('error', function () { img.hidden = true; miss.hidden = false; });
    var wrap = h('div', { class: 'picbox' }, h('div', { class: 'picbox-back' }), h('div', { class: 'picbox-back picbox-back--2' }), face);
    var cap = has(cfg.caption) ? h('p', { class: 'picbox-cap muted' }, RDW.rich(cfg.caption)) : null;
    var outer = h('div', { class: 'hero-pic' }, wrap, cap);
    wrap.addEventListener('pointermove', function (e) {
      var r = wrap.getBoundingClientRect();
      wrap.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      wrap.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    wrap.addEventListener('pointerleave', function () { wrap.style.setProperty('--px', 0); wrap.style.setProperty('--py', 0); });
    wrap.addEventListener('click', function () {
      RDW.sfx.play('click'); wrap.classList.remove('is-boing'); void wrap.offsetWidth; wrap.classList.add('is-boing');
    });
    return outer;
  }

  /* ---- hero ----------------------------------------------------------------------- */
  function hero(d) {
    var welcome = has(d.welcome) ? d.welcome : DEFAULT_WELCOME;
    var input = h('input', { type: 'search', id: 'hero-search', placeholder: 'Search everything…', autocomplete: 'off', spellcheck: 'false', role: 'combobox', 'aria-expanded': 'false', 'aria-controls': 'hero-results', 'aria-autocomplete': 'list' });
    var results = h('div', { class: 'results', id: 'hero-results', role: 'listbox', 'aria-label': 'Search results', hidden: true });
    setTimeout(function () { RDW.search.attach({ input: input, results: results }); }, 0);
    var c = picbox(d);
    return h('section', { class: 'block block--widget hero', id: 'b-dash-welcome', 'data-block': 'dash-welcome', 'aria-labelledby': 'bt-dash-welcome' },
      h('div', { class: 'hero-main' },
        h('p', { class: 'hero-date' }, RDW.fmt.date(new Date())),
        h('h2', { class: 'hero-welcome block-title', id: 'bt-dash-welcome' }, RDW.rich(welcome)),
        h('p', { class: 'hero-id' }, h('strong', null, (RDW.site && RDW.site.name) || ''), (RDW.site && RDW.site.alias) ? h('span', { class: 'muted' }, ' · also known as ' + RDW.site.alias) : null),
        h('div', { class: 'hero-search' }, h('label', { for: 'hero-search', class: 'sr-only' }, 'Search every section'), input, results)),
      c);
  }

  /* ---- introduction ------------------------------------------------------------------- */
  function intro(d) {
    var paras = RDW.paragraphs(d.intro).filter(has);
    if (!paras.length) return h('p', { class: 'empty' }, 'Not written yet.');
    return h('div', { class: 'prose' }, paras.map(function (p) { return h('p', null, RDW.rich(p)); }));
  }

  /* ---- this year -------------------------------------------------------------------- */
  function thisYear(d) {
    var now = new Date(), year = String(now.getFullYear());
    var ty = d.thisYear || {};
    var wrap = h('div', { class: 'thisyear' });
    wrap.appendChild(h('div', { class: 'ty-top' }, h('span', { class: 'ty-year' }, year)));
    var any = false;
    if (has(ty.headline)) { any = true; wrap.appendChild(h('p', { class: 'ty-headline' }, RDW.rich(ty.headline))); }
    var hl = RDW.asArray(ty.highlights).filter(has);
    if (hl.length) { any = true; wrap.appendChild(h('ul', { class: 'bullets' }, hl.map(function (x) { return h('li', null, RDW.rich(x)); }))); }
    // pull the preview fields from the matching year page, if there is one
    var years = RDW.store.get('years');
    var page = years && (years.pages || []).filter(function (p) { return String(p.year) === year && !p.hidden; })[0];
    if (page) {
      var prev = (page.blocks || []).filter(function (b) { return b.id === 'year-preview'; })[0];
      var filled = prev && (prev.items || []).filter(function (i) { return has(i.value); });
      if (filled && filled.length) { any = true; wrap.appendChild(h('dl', { class: 'kv' }, filled.map(function (i) { return h('div', { class: 'kv-row' }, h('dt', null, i.label), h('dd', null, RDW.rich(i.value))); }))); }
      wrap.appendChild(h('p', null, h('button', { type: 'button', class: 'btn btn--small', onClick: function () { RDW.router.go('years', { page: page.id }); } }, 'Open the ' + year + ' page')));
    }
    if (!any) wrap.appendChild(h('p', { class: 'empty' }, 'Nothing written about this year yet.'));
    return wrap;
  }

  /* ---- recent ------------------------------------------------------------------------- */
  function recent(d) {
    var r = d.recent || {};
    var box = h('div', { class: 'recent' });
    var list = h('div', { class: 'tabs', role: 'tablist', 'aria-label': 'Recent activity' });
    var body = h('div', { class: 'tabpanel', role: 'tabpanel', tabindex: '0' });
    var cur = RDW.storage.get('recentTab', 'projects');
    if (!RECENT.some(function (t) { return t.id === cur; })) cur = 'projects';
    function show(id, focus) {
      cur = id; RDW.storage.set('recentTab', id);
      RDW.$$('[role=tab]', list).forEach(function (b) { var on = b.dataset.tab === id; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
      RDW.clear(body);
      var label = RECENT.filter(function (x) { return x.id === id; })[0].label;
      var items = (r[id] || []).filter(function (x) { return has(x.title); }).slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); }).slice(0, 8);
      body.setAttribute('aria-label', label);
      if (!items.length) { body.appendChild(h('p', { class: 'empty' }, 'No ' + label.toLowerCase() + ' listed yet.')); return; }
      var ul = h('ul', { class: 'recent-list' });
      items.forEach(function (it) {
        ul.appendChild(h('li', { class: 'recent-item' }, h('div', { class: 'recent-top' }, h('strong', null, RDW.rich(it.title)), has(it.status) ? h('span', { class: 'tag' }, it.status) : null, has(it.date) ? h('span', { class: 'muted' }, RDW.fmt.nice(it.date)) : null),
          has(it.note) ? h('p', { class: 'muted' }, RDW.rich(it.note)) : null));
      });
      body.appendChild(ul);
    }
    RECENT.forEach(function (t, i) {
      list.appendChild(h('button', { type: 'button', role: 'tab', class: 'tab', 'data-tab': t.id, onClick: function () { RDW.sfx.play('click'); show(t.id); },
        onKeydown: function (e) { var n = RECENT.length; if (e.key === 'ArrowRight') show(RECENT[(i + 1) % n].id, true); else if (e.key === 'ArrowLeft') show(RECENT[(i - 1 + n) % n].id, true); else return; e.preventDefault(); } }, t.label));
    });
    box.appendChild(list); box.appendChild(body); show(cur);
    return box;
  }

  /* ---- public ----------------------------------------------------------------------- */
  RDW.dashboard = {
    menuItems: function () {
      return [{ id: 'dash-welcome', title: 'Welcome' }, { id: 'dash-intro', title: 'Introduction' }, { id: 'dash-thisyear', title: 'This Year In My Life' }, { id: 'dash-recent', title: 'Recent activity' }];
    },
    render: function (d) {
      var frag = document.createDocumentFragment();
      frag.appendChild(hero(d));
      frag.appendChild(widget('dash-intro', 'Introduction', intro(d)));
      frag.appendChild(h('div', { class: 'dash-row' },
        widget('dash-thisyear', 'This Year In My Life', thisYear(d)),
        widget('dash-recent', 'Recent activity', recent(d))));
      return frag;
    },
    searchEntries: function () {
      var d = doc(), out = [];
      var sec = RDW.nav.find('home'); var title = sec ? sec.title : 'Home';
      var base = { sectionId: 'home', sectionTitle: title, pageId: null, pageTitle: '', group: '' };
      out.push(Object.assign({}, base, { blockId: 'dash-welcome', title: 'Welcome', raw: RDW.plain(d.welcome || DEFAULT_WELCOME) }));
      out.push(Object.assign({}, base, { blockId: 'dash-intro', title: 'Introduction', raw: RDW.plain(RDW.paragraphs(d.intro).join(' ')) }));
      var ty = d.thisYear || {};
      out.push(Object.assign({}, base, { blockId: 'dash-thisyear', title: 'This Year In My Life', raw: RDW.plain([ty.headline].concat(ty.highlights || []).join(' · ')) }));
      var rr = [];
      RECENT.forEach(function (t) { ((d.recent || {})[t.id] || []).forEach(function (i) { rr.push(RDW.plain([i.title, i.status, i.note].join(' '))); }); });
      out.push(Object.assign({}, base, { blockId: 'dash-recent', title: 'Recent activity', raw: rr.join(' · ') }));
      return out;
    }
  };
  RDW.search.addSource(function () { return RDW.dashboard.searchEntries(); });
})();
