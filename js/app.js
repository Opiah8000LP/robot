/* ==========================================================================
   app.js — glue. boot() builds everything behind the gate; enter() opens it.
   ========================================================================== */
(function () {
  'use strict';
  var RDW = window.RDW;

  RDW.app = {
    boot: function () {
      RDW.stage.init();
      RDW.player.init();
      RDW.shortcuts.init();
    },
    enter: function () {
      RDW.sfx.arm();
      document.getElementById('app').hidden = false;
      RDW.stage.enter();
      RDW.router.start();
      RDW.player.startFromGate();
      RDW.sfx.play('enter');
      var boot = document.getElementById('boot');
      boot.classList.add('is-leaving');
      setTimeout(function () { boot.remove(); }, 700);
    }
  };
})();
