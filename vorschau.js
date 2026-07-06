// ============================================================
// MR-Dienstleistungen — Button-Vorschau (Buttonschmiede)
// Besucher zieht ein Bild in die Vorschau und sieht seinen
// Button — groß und in echter Größe (59 mm / 25 mm).
// Alles läuft lokal im Browser, nichts wird hochgeladen.
// ============================================================
(function () {
  'use strict';

  var root = document.getElementById('button-preview');
  if (!root) return;

  var file    = document.getElementById('pv-file');
  var drop    = root.querySelector('[data-pv-drop]');
  var zoomRow = root.querySelector('[data-pv-zoomrow]');
  var zoom    = document.getElementById('pv-zoom');
  var big     = root.querySelector('[data-pv-big]');
  var imgs    = Array.prototype.slice.call(root.querySelectorAll('img[data-pv-img]'));
  var empties = Array.prototype.slice.call(root.querySelectorAll('.pv-empty'));

  // Zustand: Verschiebung (Anteil der Kreisbreite) + Zoomfaktor
  var state = { x: 0, y: 0, s: 1, url: null };

  function apply() {
    imgs.forEach(function (img) {
      img.style.width  = (state.s * 100) + '%';
      img.style.height = (state.s * 100) + '%';
      img.style.left   = (50 + state.x * 100) + '%';
      img.style.top    = (50 + state.y * 100) + '%';
      img.style.transform = 'translate(-50%, -50%)';
    });
  }

  function clampPan() {
    var lim = Math.max(0, (state.s - 1) / 2) + 0.15;
    state.x = Math.max(-lim, Math.min(lim, state.x));
    state.y = Math.max(-lim, Math.min(lim, state.y));
  }

  function load(f) {
    if (!f || !/^image\//.test(f.type)) return;
    if (state.url) { try { URL.revokeObjectURL(state.url); } catch (e) {} }
    state.url = URL.createObjectURL(f);
    state.x = 0; state.y = 0; state.s = 1;
    if (zoom) zoom.value = 100;
    imgs.forEach(function (img) { img.src = state.url; img.hidden = false; });
    empties.forEach(function (e) { e.style.display = 'none'; });
    if (zoomRow) zoomRow.hidden = false;
    apply();
  }

  // Datei-Auswahl per Klick
  file.addEventListener('change', function () { load(file.files[0]); });

  // Drag & Drop — auf das Feld UND auf den großen Kreis
  [drop, big].forEach(function (zone) {
    if (!zone) return;
    ['dragenter', 'dragover'].forEach(function (ev) {
      zone.addEventListener(ev, function (e) {
        e.preventDefault();
        if (drop) drop.classList.add('is-over');
      });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      zone.addEventListener(ev, function (e) {
        e.preventDefault();
        if (drop) drop.classList.remove('is-over');
      });
    });
    zone.addEventListener('drop', function (e) {
      var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      load(f);
    });
  });

  // Zoom
  if (zoom) {
    zoom.addEventListener('input', function () {
      state.s = parseInt(zoom.value, 10) / 100;
      clampPan();
      apply();
    });
  }

  // Motiv im großen Kreis verschieben (Maus + Touch via Pointer Events)
  var drag = null;
  big.addEventListener('pointerdown', function (e) {
    if (!state.url) return;
    drag = { px: e.clientX, py: e.clientY, x: state.x, y: state.y };
    try { big.setPointerCapture(e.pointerId); } catch (err) {}
  });
  big.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var w = big.clientWidth || 1;
    state.x = drag.x + (e.clientX - drag.px) / w;
    state.y = drag.y + (e.clientY - drag.py) / w;
    clampPan();
    apply();
  });
  ['pointerup', 'pointercancel'].forEach(function (ev) {
    big.addEventListener(ev, function () { drag = null; });
  });
})();
