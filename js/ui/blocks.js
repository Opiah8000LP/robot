/* ==========================================================================
   blocks.js — the building blocks every section is made of.

   paragraph · fields · list · tags · cards · gallery · audio · timeline ·
   journal · faq · stats · palette · quiz   (+ letter, in letter.js)

   Each type is just a function that turns a block from a data file into
   elements. data/HOW-TO-EDIT.md shows what each type's data looks like.
   ========================================================================== */
(function () {
  'use strict';
  var RDW = window.RDW; var h = RDW.h;
  var types = {};

  var EMPTY_LINES = ['Nothing here yet.', 'Not written yet.', 'Still empty.', 'This one is blank for now.'];
  function emptyLine(id) { return EMPTY_LINES[(parseInt(RDW.hash(String(id)), 10) || 0) % EMPTY_LINES.length]; }

  function register(type, def) { types[type] = def; }
  function nonEmpty(arr) { return RDW.asArray(arr).filter(function (x) { return String(x).trim() !== ''; }); }
  function hasText(v) { return String(v === undefined || v === null ? '' : v).trim() !== ''; }

  /* ---- paragraph ---------------------------------------------------------------- */
  register('paragraph', {
    isEmpty: function (b) { return !RDW.paragraphs(b.text).length && !RDW.paragraphs(b.more).length; },
    render: function (b) {
      var wrap = h('div', { class: 'prose' }, RDW.paragraphs(b.text));
      var more = RDW.paragraphs(b.more);
      if (more.length) {
        var id = RDW.uid('more');
        var body = h('div', { class: 'more-body', id: id, hidden: true }, more);
        var btn = h('button', { type: 'button', class: 'btn btn--small more-toggle', 'aria-expanded': 'false', 'aria-controls': id,
          onClick: function () { var open = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!open)); body.hidden = open; } },
          h('span', { class: 't-closed' }, 'Read the full version'), h('span', { class: 't-open' }, 'Show less'));
        wrap.appendChild(btn); wrap.appendChild(body);
      }
      return wrap;
    }
  });

  /* ---- fields (label + value) ------------------------------------------------------- */
  register('fields', {
    isEmpty: function (b) { return !(b.items || []).some(function (i) { return hasText(i.value); }); },
    render: function (b) {
      var dl = h('dl', { class: 'kv' });
      (b.items || []).forEach(function (i) {
        if (!hasText(i.value)) return;
        dl.appendChild(h('div', { class: 'kv-row' }, h('dt', null, i.label || ''), h('dd', { style: { whiteSpace: 'pre-wrap' } }, RDW.rich(i.value))));
      });
      return dl;
    }
  });

  /* ---- list ------------------------------------------------------------------------------ */
  register('list', {
    isEmpty: function (b) { return !nonEmpty(b.items).length; },
    render: function (b) {
      var ul = h(b.ordered ? 'ol' : 'ul', { class: 'bullets' });
      nonEmpty(b.items).forEach(function (t) { ul.appendChild(h('li', null, RDW.rich(t))); });
      return ul;
    }
  });

  /* ---- tags ----------------------------------------------------------------------------- */
  register('tags', {
    isEmpty: function (b) { return !nonEmpty(b.items).length; },
    render: function (b) {
      var ul = h('ul', { class: 'tags' });
      nonEmpty(b.items).forEach(function (t) { ul.appendChild(h('li', { class: 'tag' }, RDW.rich(t))); });
      return ul;
    }
  });

  /* ---- cards ------------------------------------------------------------------------------- */
  register('cards', {
    isEmpty: function (b) { return !(b.items || []).length; },
    render: function (b, ctx) {
      var grid = h('div', { class: 'cards' });
      (b.items || []).forEach(function (c) {
        var card = h('article', { class: 'card' });
        if (hasText(c.image)) {
          var src = RDW.resolveAsset(c.image, ctx.imgFolder);
          card.appendChild(h('button', { type: 'button', class: 'card-img', 'aria-label': 'View picture: ' + (c.title || c.image),
            onClick: function () { RDW.lightbox.open([{ src: src, caption: c.title, description: c.subtitle }], 0); } },
            h('img', { src: src, alt: '', loading: 'lazy', onError: function (ev) { var p = ev.target.parentNode; if (p) p.remove(); } })));
        }
        var body = h('div', { class: 'card-body' });
        if (hasText(c.date)) body.appendChild(h('p', { class: 'card-meta' }, RDW.fmt.nice(c.date)));
        body.appendChild(h('h3', { class: 'card-title' }, RDW.rich(c.title || '')));
        if (hasText(c.subtitle)) body.appendChild(h('p', { class: 'card-sub' }, RDW.rich(c.subtitle)));
        RDW.paragraphs(c.text).forEach(function (p) { body.appendChild(p); });
        if (nonEmpty(c.tags).length) body.appendChild(h('ul', { class: 'tags tags--small' }, nonEmpty(c.tags).map(function (t) { return h('li', { class: 'tag' }, t); })));
        if (hasText(c.link) && /^https?:\/\//i.test(c.link)) body.appendChild(h('p', { class: 'card-link' }, h('a', { href: c.link, target: '_blank', rel: 'noopener noreferrer' }, 'Open link ↗')));
        card.appendChild(body); grid.appendChild(card);
      });
      return grid;
    }
  });

  /* ---- gallery ----------------------------------------------------------------------------- */
  register('gallery', {
    isEmpty: function (b) { return !(b.items || []).length; },
    render: function (b, ctx) {
      var items = (b.items || []).filter(function (i) { return hasText(i.src); }).map(function (i) { return Object.assign({}, i, { src: RDW.resolveAsset(i.src, ctx.imgFolder), file: i.src }); });
      var grid = h('div', { class: 'gallery' + (items.length === 1 ? ' gallery--single' : '') });
      items.forEach(function (it, idx) {
        var thumb = h('button', { type: 'button', class: 'shot', 'aria-label': 'Open full size: ' + (it.caption || it.file), onClick: function (ev) { RDW.lightbox.open(items, idx, ev.currentTarget); } });
        var img = h('img', { src: it.src, alt: it.caption || '', loading: 'lazy' });
        img.addEventListener('error', function () {
          thumb.classList.add('is-missing'); img.remove();
          thumb.appendChild(h('span', { class: 'shot-missing' }, h('strong', null, 'Image not found'), h('span', null, it.file)));
        });
        thumb.appendChild(img);
        var fig = h('figure', { class: 'shot-fig' }, thumb);
        if (it.caption || it.date) fig.appendChild(h('figcaption', { class: 'shot-cap' },
          it.caption ? h('strong', null, RDW.rich(it.caption)) : null, it.date ? h('span', { class: 'muted' }, RDW.fmt.nice(it.date)) : null));
        grid.appendChild(fig);
      });
      return grid;
    }
  });

  /* ---- audio ------------------------------------------------------------------------------- */
  register('audio', {
    isEmpty: function (b) { return !(b.items || []).length; },
    render: function (b) {
      var list = h('ul', { class: 'clips' });
      (b.items || []).forEach(function (c) {
        var li = h('li', { class: 'clip' }, h('h3', { class: 'clip-title' }, RDW.rich(c.title || c.src || '')));
        if (hasText(c.description)) li.appendChild(h('p', { class: 'muted' }, RDW.rich(c.description)));
        if (hasText(c.src)) {
          var src = RDW.resolveAsset(c.src, 'music/');
          var a = h('audio', { controls: true, preload: 'none', src: src, 'aria-label': c.title || c.src });
          a.addEventListener('play', function () { if (RDW.player) RDW.player.pause(true); });
          a.addEventListener('error', function () { a.replaceWith(h('p', { class: 'clip-missing' }, 'Audio file not found: ' + src)); });
          li.appendChild(a);
        }
        list.appendChild(li);
      });
      return list;
    }
  });

  /* ---- timeline ----------------------------------------------------------------------------- */
  register('timeline', {
    isEmpty: function (b) { return !(b.items || []).length; },
    render: function (b) {
      var items = (b.items || []).slice();
      if (b.order === 'oldest') items.sort(function (a, c) { return String(a.date).localeCompare(String(c.date)); });
      if (b.order === 'newest') items.sort(function (a, c) { return String(c.date).localeCompare(String(a.date)); });
      var ol = h('ol', { class: 'timeline' });
      items.forEach(function (i) {
        ol.appendChild(h('li', { class: 'tl-item' },
          h('span', { class: 'tl-date' }, hasText(i.date) ? RDW.fmt.nice(i.date) : ''),
          h('div', { class: 'tl-body' }, h('h3', { class: 'tl-title' }, RDW.rich(i.title || '')), RDW.paragraphs(i.text))));
      });
      return ol;
    }
  });

  /* ---- journal (one entry per month) ------------------------------------------------------- */
  register('journal', {
    isEmpty: function (b) { return !(b.items || []).length; },
    render: function (b) {
      var items = (b.items || []).slice().sort(function (a, c) { return String(c.month).localeCompare(String(a.month)); });
      var host = h('div', { class: 'journal' });
      items.forEach(function (i) {
        host.appendChild(h('article', { class: 'entry' },
          h('header', { class: 'entry-head' }, h('h3', { class: 'entry-month' }, RDW.fmt.nice(i.month) || 'Undated'),
            hasText(i.mood) ? h('span', { class: 'tag' }, i.mood) : null),
          hasText(i.title) ? h('p', { class: 'entry-title' }, RDW.rich(i.title)) : null,
          RDW.paragraphs(i.text)));
      });
      return host;
    }
  });

  /* ---- faq ------------------------------------------------------------------------------------- */
  register('faq', {
    isEmpty: function (b) { return !(b.items || []).length; },
    render: function (b) {
      var host = h('div', { class: 'faq' });
      (b.items || []).forEach(function (i) {
        host.appendChild(h('details', { class: 'faq-item' }, h('summary', null, RDW.rich(i.q || '')), h('div', { class: 'faq-a prose' }, RDW.paragraphs(i.a))));
      });
      return host;
    }
  });

  /* ---- stats ----------------------------------------------------------------------------------- */
  register('stats', {
    isEmpty: function (b) { return !(b.items || []).length; },
    render: function (b) {
      var g = h('div', { class: 'stats-grid' });
      (b.items || []).forEach(function (i) {
        g.appendChild(h('div', { class: 'stat' }, h('span', { class: 'stat-value' }, RDW.rich(hasText(i.value) ? i.value : '–')), h('span', { class: 'stat-label' }, RDW.rich(i.label || '')),
          hasText(i.note) ? h('span', { class: 'stat-note muted' }, RDW.rich(i.note)) : null));
      });
      return g;
    }
  });

  /* ---- palette ---------------------------------------------------------------------------------- */
  function lum(hex) { var n = parseInt(String(hex).replace('#', ''), 16) || 0; var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255; return (0.299 * r + 0.587 * g + 0.114 * b) / 255; }
  register('palette', {
    isEmpty: function (b) { return !(b.items || []).length; },
    render: function (b) {
      var g = h('div', { class: 'palette' });
      (b.items || []).forEach(function (i) {
        var hex = /^#[0-9a-f]{6}$/i.test(i.hex) ? i.hex.toUpperCase() : '#000000';
        g.appendChild(h('button', { type: 'button', class: 'swatch', style: { background: hex, color: lum(hex) > 0.55 ? '#000' : '#fff' }, 'aria-label': (i.name || 'Colour') + ' ' + hex + '. Click to copy.',
          onClick: function () { (navigator.clipboard ? navigator.clipboard.writeText(hex) : Promise.reject()).then(function () { RDW.toast('Copied ' + hex); }, function () { RDW.toast(hex); }); } },
          h('span', { class: 'swatch-name' }, i.name || ''), h('span', { class: 'swatch-hex' }, hex), hasText(i.note) ? h('span', { class: 'swatch-note' }, i.note) : null));
      });
      return g;
    }
  });

  /* ---- quiz -------------------------------------------------------------------------------------- */
  register('quiz', {
    isEmpty: function (b) { return !(b.questions || []).length; },
    render: function (b) {
      var qs = (b.questions || []).filter(function (q) { return hasText(q.q) && nonEmpty(q.options).length >= 2; });
      var host = h('div', { class: 'quiz' });
      var state = { i: 0, picks: [] };

      function start() {
        RDW.clear(host); state = { i: 0, picks: [] };
        host.appendChild(h('div', { class: 'quiz-start' },
          hasText(b.intro) ? h('p', null, RDW.rich(b.intro)) : null,
          h('p', { class: 'muted' }, qs.length + ' question' + (qs.length === 1 ? '' : 's') + '.'),
          h('button', { type: 'button', class: 'btn btn--primary', onClick: function () { ask(); } }, 'Start')));
      }
      function ask() {
        RDW.clear(host);
        var q = qs[state.i], name = RDW.uid('q'), answered = false;
        var opts = nonEmpty(q.options);
        var fb = h('div', { class: 'quiz-fb', 'aria-live': 'polite' });
        var next = h('button', { type: 'button', class: 'btn btn--primary', hidden: true, onClick: function () { state.i++; if (state.i < qs.length) ask(); else finish(); } }, state.i + 1 < qs.length ? 'Next' : 'See my score');
        var legend = h('legend', { class: 'quiz-q', tabindex: '-1' }, RDW.rich(q.q));
        var fs = h('fieldset', { class: 'quiz-fs' }, legend);
        opts.forEach(function (o, idx) {
          var id = name + '-' + idx;
          var input = h('input', { type: 'radio', name: name, id: id, value: String(idx + 1) });
          input.addEventListener('change', function () {
            if (answered) return; answered = true;
            state.picks[state.i] = idx + 1;
            var ok = (idx + 1) === Number(q.answer);
            RDW.$$('input', fs).forEach(function (r) { r.disabled = true; });
            RDW.$$('.quiz-opt', fs).forEach(function (lab, k) { if ((k + 1) === Number(q.answer)) lab.classList.add('is-right'); else if (k === idx) lab.classList.add('is-wrong'); });
            fb.appendChild(h('p', { class: 'quiz-verdict' }, ok ? 'Correct.' : 'Not quite. It was: ' + (opts[Number(q.answer) - 1] ? RDW.plain(opts[Number(q.answer) - 1]) : '?')));
            if (hasText(q.explain)) fb.appendChild(h('p', { class: 'muted' }, RDW.rich(q.explain)));
            next.hidden = false; next.focus();
          });
          fs.appendChild(h('label', { class: 'quiz-opt', for: id }, input, h('span', null, RDW.rich(o))));
        });
        host.appendChild(h('p', { class: 'quiz-progress muted' }, 'Question ' + (state.i + 1) + ' of ' + qs.length));
        host.appendChild(fs); host.appendChild(fb); host.appendChild(next);
        legend.focus({ preventScroll: true });
      }
      function finish() {
        RDW.clear(host);
        var score = 0; qs.forEach(function (q, i) { if (state.picks[i] === Number(q.answer)) score++; });
        var pct = Math.round(score / qs.length * 100);
        var tiers = (b.results || []).slice().sort(function (a, c) { return Number(c.min) - Number(a.min); });
        var tier = tiers.filter(function (t) { return pct >= Number(t.min || 0); })[0];
        var res = h('div', { class: 'quiz-result', tabindex: '-1' },
          h('p', { class: 'quiz-score' }, score + ' / ' + qs.length), h('p', { class: 'muted' }, pct + '% correct'),
          tier && hasText(tier.title) ? h('h3', null, RDW.rich(tier.title)) : null, tier ? RDW.paragraphs(tier.text) : null,
          h('button', { type: 'button', class: 'btn', onClick: start }, 'Try again'));
        host.appendChild(res); res.focus({ preventScroll: true });
        RDW.announce('Quiz finished. You scored ' + score + ' out of ' + qs.length);
      }
      if (!qs.length) host.appendChild(h('p', { class: 'muted' }, 'The quiz needs at least one question with two options.'));
      else start();
      return host;
    }
  });

  /* ---- drawing a block ------------------------------------------------------------------------- */
  function renderBlock(b, ctx) {
    var def = types[b.type];
    var sec = h('section', { class: 'block block--' + b.type, id: 'b-' + b.id, 'data-block': b.id, 'aria-labelledby': 'bt-' + b.id });
    sec.appendChild(h('div', { class: 'block-head' }, h('h2', { class: 'block-title', id: 'bt-' + b.id }, b.title || '')));
    var body = h('div', { class: 'block-body' });
    if (!def) { body.appendChild(h('p', { class: 'muted' }, 'Unknown block type "' + b.type + '".')); sec.appendChild(body); return sec; }
    var empty = def.isEmpty(b);
    try { body.appendChild(empty ? h('p', { class: 'empty' }, emptyLine(b.id)) : def.render(b, ctx)); }
    catch (err) { console.error(err); body.appendChild(h('p', { class: 'muted' }, 'This block could not be drawn (' + err.message + '). Check its data.')); }
    sec.classList.toggle('is-empty', empty);
    sec.appendChild(body);
    return sec;
  }

  RDW.blocks = {
    types: types, register: register, renderBlock: renderBlock,
    isEmpty: function (b) { return types[b.type] ? types[b.type].isEmpty(b) : false; }
  };
})();
