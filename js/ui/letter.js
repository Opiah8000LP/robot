/* ==========================================================================
   letter.js — shows the sealed letter to your future self.

   The letter is encrypted with timelock encryption (drand / tlock) using the
   page tools/seal-letter.html. The key doesn't exist until the unlock time,
   so before then nobody, including the author, can read it. Only scrambled
   text lives in data/letter.sealed.js; the words never appear in the site.
   ========================================================================== */
(function () {
  'use strict';
  var RDW = window.RDW; var h = RDW.h;

  function sealed() { var d = RDW.store.get('_letter'); return d && d.cipher && d.unlockMs ? d : null; }
  function countdown(ms) {
    var s = Math.max(0, Math.floor((ms - Date.now()) / 1000));
    var d = Math.floor(s / 86400), hh = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
    return (d ? d + 'd ' : '') + String(hh).padStart(2, '0') + 'h ' + String(m).padStart(2, '0') + 'm ' + String(sec).padStart(2, '0') + 's';
  }

  RDW.blocks.register('letter', {
    isEmpty: function () { return !sealed(); },
    render: function () {
      var d = sealed();
      var host = h('div', { class: 'letter' });
      var cd = h('p', { class: 'letter-count' });
      var status = h('p', { class: 'muted', role: 'status' });
      var paper = h('div', { class: 'letter-paper', hidden: true, tabindex: '-1' });
      var openBtn = h('button', { type: 'button', class: 'btn btn--primary', hidden: true, onClick: unlock }, 'Open the letter');
      host.appendChild(h('p', { class: 'letter-lock' }, 'Sealed until ', h('strong', null, new Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'short' }).format(new Date(d.unlockMs)))));
      host.appendChild(cd); host.appendChild(openBtn); host.appendChild(status); host.appendChild(paper);
      host.appendChild(h('p', { class: 'muted small' }, 'The letter is encrypted. It cannot be read by anyone, including me, until that moment.'));

      function tick() {
        if (!host.isConnected) { clearInterval(iv); return; }
        var open = Date.now() >= d.unlockMs;
        cd.textContent = open ? 'It is time.' : 'Unlocks in ' + countdown(d.unlockMs);
        openBtn.hidden = !open || !paper.hidden;
      }
      var iv = setInterval(tick, 1000); tick();

      function unlock() {
        if (!window.RDTimeLock) { status.textContent = 'The unlock library did not load (vendor/tlock.bundle.js).'; return; }
        openBtn.disabled = true; status.textContent = 'Fetching the key…';
        RDTimeLock.open(d.cipher).then(function (text) {
          status.textContent = ''; RDW.clear(paper); paper.hidden = false; openBtn.hidden = true;
          RDW.paragraphs(text).forEach(function (p) { paper.appendChild(p); }); paper.focus();
        }).catch(function (e) { openBtn.disabled = false; status.textContent = 'Could not open it yet (' + (e && e.message ? e.message : 'network trouble') + '). Check your connection and try again.'; });
      }
      return host;
    }
  });
})();
