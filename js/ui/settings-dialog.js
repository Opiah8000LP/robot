/* ==========================================================================
   settings-dialog.js — Settings and the shortcuts cheat sheet.
   ========================================================================== */
(function () {
  'use strict';
  var RDW = window.RDW; var h = RDW.h;
  RDW.ui = RDW.ui || {};

  function segmented(name, label, options, key) {
    var cur = String(RDW.settings.get(key));
    var group = h('div', { class: 'segmented', role: 'radiogroup', 'aria-label': label }, options.map(function (o) {
      var id = RDW.uid(name);
      var input = h('input', { type: 'radio', name: name, id: id, value: String(o.value), checked: String(o.value) === cur,
        onChange: function () { RDW.settings.set(key, o.value); RDW.sfx.play('click'); } });
      return h('label', { for: id }, input, h('span', null, o.label));
    }));
    return h('div', { class: 'field' }, h('span', { class: 'label' }, label), group);
  }
  function range(label, key, min, max, step, fmt, onInput) {
    var id = RDW.uid('rg');
    var out = h('output', { for: id, class: 'range-out' }, fmt(RDW.settings.get(key)));
    var input = h('input', { type: 'range', id: id, min: min, max: max, step: step, value: RDW.settings.get(key),
      onInput: function () { var v = Number(input.value); out.textContent = fmt(v); RDW.settings.set(key, v); if (onInput) onInput(v); } });
    return h('div', { class: 'field' }, h('label', { for: id }, label, ' ', out), input);
  }
  function check(label, key, help) {
    var id = RDW.uid('ck'); var i = h('input', { type: 'checkbox', id: id, onChange: function () { RDW.settings.set(key, i.checked); RDW.sfx.play('click'); } });
    i.checked = !!RDW.settings.get(key);
    return h('div', { class: 'field field--check' }, i, h('label', { for: id }, label), help ? h('p', { class: 'help' }, help) : null);
  }

  function settingsDialog() {
    var pct = function (v) { return Math.round(v * 100) + '%'; };
    var body = h('div', { class: 'settings' },
      h('fieldset', null, h('legend', { class: 'label' }, 'Look'),
        segmented('theme', 'Theme', [{ value: 'auto', label: 'Auto' }, { value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }], 'theme'),
        range('Text size', 'textScale', 0.85, 1.6, 0.05, pct),
        segmented('lh', 'Line spacing', [{ value: 1, label: 'Normal' }, { value: 1.2, label: 'Roomy' }, { value: 1.4, label: 'Airy' }], 'lineSpacing'),
        check('Easy-to-read font', 'readableFont', 'Swaps to a plainer, wider-spaced font.')),
      h('fieldset', null, h('legend', { class: 'label' }, 'Motion & contrast'),
        segmented('motion', 'Animations', [{ value: 'auto', label: 'Match my device' }, { value: 'reduce', label: 'Reduced' }, { value: 'full', label: 'Full' }], 'motion'),
        segmented('tilt', '3D tilt following the pointer', [{ value: 'full', label: 'Full' }, { value: 'low', label: 'Gentle' }, { value: 'off', label: 'Off' }], 'tilt'),
        segmented('contrast', 'Contrast', [{ value: 'auto', label: 'Match my device' }, { value: 'normal', label: 'Normal' }, { value: 'high', label: 'High' }], 'contrast')),
      h('fieldset', null, h('legend', { class: 'label' }, 'Sound'),
        range('Music volume', 'musicVolume', 0, 1, 0.01, pct, function (v) { RDW.player.setVolumeFromSettings(v); }),
        range('Interface sound volume', 'sfxVolume', 0, 1, 0.01, pct),
        check('Start music when I tap to enter', 'autoplay')),
      h('fieldset', null, h('legend', { class: 'label' }, 'Search'),
        check('Jump to the best match while I type', 'autoJump', 'Otherwise press Enter or click a result.')),
      h('p', null, h('button', { type: 'button', class: 'btn btn--small', onClick: function () { RDW.settings.reset(); RDW.player.setVolumeFromSettings(RDW.settings.get('musicVolume')); RDW.toast('Settings reset.'); RDW.ui.settingsDialog._dlg.close(); settingsDialog(); } }, 'Reset all settings')));
    RDW.ui.settingsDialog._dlg = RDW.dialog.open({ title: 'Settings', size: 'wide', id: 'settings', body: body, actions: [{ label: 'Done', primary: true }] });
  }
  RDW.ui.settingsDialog = settingsDialog;

  /* ---- shortcuts ------------------------------------------------------------------ */
  function helpDialog() {
    var rows = [
      ['/  or  Ctrl+K', 'Focus the search bar'], ['[  and  ]', 'Previous / next section'], ['Alt + ↑ / ↓', 'Previous / next subsection'],
      ['S', 'Open settings'], ['M', 'Mute / unmute music'], ['P', 'Play / pause music'],
      ['Shift + ← / →', 'Previous / next track'], ['Shift + ↑ / ↓', 'Music volume'], ['T', 'Cycle theme'], ['?', 'This cheat sheet'], ['Esc', 'Close dialogs, clear search highlight']
    ];
    var t = h('table', { class: 'data-table keys' }, h('caption', { class: 'sr-only' }, 'Keyboard shortcuts'), h('tbody', null, rows.map(function (r) {
      return h('tr', null, h('th', { scope: 'row' }, r[0].split('  ').map(function (k, i) { return k === 'or' || k === 'and' ? ' ' + k + ' ' : h('span', { class: 'kbd' }, k); })), h('td', null, r[1]));
    })));
    RDW.dialog.open({ title: 'Keyboard shortcuts', id: 'help', body: h('div', null, t,
      h('p', { class: 'muted' }, 'On a phone: swipe left/right on the page to change section. Tap the contents button for subsections. Shortcuts pause while you are typing in a box.')),
      actions: [{ label: 'Got it', primary: true }] });
  }
  RDW.ui.helpDialog = helpDialog;
})();
