/* ==========================================================================
   nav.js — the section list, read straight from data/site.js.
   ========================================================================== */
(function () {
  'use strict';
  var RDW = window.RDW;

  function all() {
    return ((RDW.site && RDW.site.sections) || []).map(function (s) {
      var o = Object.assign({ layout: 'blocks' }, s);
      o.hidden = s.hidden === true && s.id !== 'home';
      if (!o.icon) o.icon = 'icons/' + o.id + '.svg';
      if (!o.glyph) o.glyph = o.title.slice(0, 2).toUpperCase();
      return o;
    });
  }

  RDW.nav = {
    list: function (includeHidden) { return all().filter(function (s) { return includeHidden || !s.hidden; }); },
    find: function (id) { return all().filter(function (s) { return s.id === id; })[0] || null; }
  };
})();
