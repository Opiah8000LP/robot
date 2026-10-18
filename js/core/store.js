/* ==========================================================================
   store.js — holds the content. Each file in /data calls one of the
   RDW.define… functions below and that's the whole database.
   The site never writes anything back: to change content, edit the files.
   ========================================================================== */
(function () {
  'use strict';
  var RDW = window.RDW;
  var docs = {};
  var kinds = {};

  function define(kind, key, obj) { kinds[key] = kind; docs[key] = obj; }

  RDW.defineSection = function (obj) { define('section', obj.id, obj); };
  RDW.defineLetter = function (obj) { define('letter', '_letter', obj); };
  RDW.definePlaylist = function (obj) { define('playlist', '_playlist', obj); };

  RDW.store = {
    get: function (key) { return docs[key]; },
    has: function (key) { return docs[key] !== undefined; },
    keys: function () { return Object.keys(docs); }
  };

  // Older versions of this site kept browser drafts. They do nothing now, so tidy them away.
  ['draft:', 'backup:'].forEach(function (p) { RDW.storage.keys(p).forEach(function (k) { RDW.storage.remove(k); }); });
})();
