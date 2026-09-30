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
  var status  = root.querySelector('[data-pv-status]');
  var reset   = root.querySelector('[data-pv-reset]');
  var imgs    = Array.prototype.slice.call(root.querySelectorAll('img[data-pv-img]'));
  var empties = Array.prototype.slice.call(root.querySelectorAll('.pv-empty'));

  var MAX_MB = 25;
  var state = { x: 0, y: 0, s: 1, has: false };

  function say(t, isErr) {
    if (!status) return;
    status.textContent = t || '';
    status.classList.toggle('is-err', !!isErr);
  }

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

  function show(src) {
    state.x = 0; state.y = 0; state.s = 1; state.has = true;
    if (zoom) zoom.value = 100;
    imgs.forEach(function (img) { img.src = src; img.hidden = false; });
    empties.forEach(function (e) { e.style.display = 'none'; });
    if (zoomRow) zoomRow.hidden = false;
    apply();
  }

  // Bild als data:-URL einlesen — funktioniert in jedem Browser und
  // auch mit strenger Content-Security-Policy.
  function load(f) {
    if (!f) return;
    var isImg = /^image\//.test(f.type) || /\.(jpe?g|png|gif|webp|avif|bmp|svg)$/i.test(f.name || '');
    if (!isImg) { say('Das ist leider kein Bild. Bitte JPG, PNG oder WEBP verwenden.', true); return; }
    if (f.size > MAX_MB * 1024 * 1024) { say('Das Bild ist größer als ' + MAX_MB + ' MB — bitte eine kleinere Version nehmen.', true); return; }
    say('Bild wird geladen …');
    var r = new FileReader();
    r.onload = function () {
      var test = new Image();
      test.onload = function () { show(r.result); say('Fertig — verschieb dein Motiv im großen Kreis.'); };
      test.onerror = function () { say('Dieses Bildformat kann dein Browser nicht anzeigen (z. B. HEIC vom iPhone). Bitte als JPG speichern.', true); };
      test.src = r.result;
    };
    r.onerror = function () { say('Das Bild konnte nicht gelesen werden.', true); };
    r.readAsDataURL(f);
  }

  file.addEventListener('change', function () {
    load(file.files && file.files[0]);
    file.value = '';
  });

  // Drag & Drop — die ganze Vorschau-Fläche ist Ablagezone
  var depth = 0;
  root.addEventListener('dragenter', function (e) { e.preventDefault(); depth++; root.classList.add('is-over'); });
  root.addEventListener('dragover', function (e) { e.preventDefault(); if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'; });
  root.addEventListener('dragleave', function () { depth = Math.max(0, depth - 1); if (!depth) root.classList.remove('is-over'); });
  root.addEventListener('drop', function (e) {
    e.preventDefault(); depth = 0; root.classList.remove('is-over');
    load(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]);
  });
  // Daneben fallen gelassen? Nicht die Seite verlassen, sondern trotzdem laden.
  window.addEventListener('dragover', function (e) { e.preventDefault(); });
  window.addEventListener('drop', function (e) {
    e.preventDefault();
    if (!root.contains(e.target)) load(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]);
  });

  // Bild direkt aus der Zwischenablage (Strg+V)
  document.addEventListener('paste', function (e) {
    var items = (e.clipboardData && e.clipboardData.items) || [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].kind === 'file' && /^image\//.test(items[i].type)) { load(items[i].getAsFile()); return; }
    }
  });

  if (zoom) {
    zoom.addEventListener('input', function () {
      state.s = parseInt(zoom.value, 10) / 100;
      clampPan(); apply();
    });
  }

  if (reset) {
    reset.addEventListener('click', function () {
      state.x = 0; state.y = 0; state.s = 1;
      if (zoom) zoom.value = 100;
      apply();
    });
  }

  // Motiv verschieben: Maus/Finger im großen Kreis
  var drag = null;
  big.addEventListener('pointerdown', function (e) {
    if (!state.has) { file.click(); return; }
    drag = { px: e.clientX, py: e.clientY, x: state.x, y: state.y };
    try { big.setPointerCapture(e.pointerId); } catch (err) {}
  });
  big.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var w = big.clientWidth || 1;
    state.x = drag.x + (e.clientX - drag.px) / w;
    state.y = drag.y + (e.clientY - drag.py) / w;
    clampPan(); apply();
  });
  ['pointerup', 'pointercancel'].forEach(function (ev) {
    big.addEventListener(ev, function () { drag = null; });
  });

  // … und per Tastatur (Pfeiltasten verschieben, +/− zoomt)
  big.addEventListener('keydown', function (e) {
    if (!state.has) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); file.click(); } return; }
    var d = 0.03, used = true;
    if (e.key === 'ArrowLeft') state.x -= d;
    else if (e.key === 'ArrowRight') state.x += d;
    else if (e.key === 'ArrowUp') state.y -= d;
    else if (e.key === 'ArrowDown') state.y += d;
    else if (e.key === '+' || e.key === '=') { state.s = Math.min(3, state.s + 0.1); if (zoom) zoom.value = Math.round(state.s * 100); }
    else if (e.key === '-') { state.s = Math.max(1, state.s - 0.1); if (zoom) zoom.value = Math.round(state.s * 100); }
    else used = false;
    if (used) { e.preventDefault(); clampPan(); apply(); }
  });
})();
