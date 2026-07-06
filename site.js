// MR-Dienstleistungen — gemeinsame site behaviour
(function () {
  'use strict';

  // ----- Footer-Jahr ---------------------------------------
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ----- Reveal beim ersten Paint (sofort, damit nichts versteckt bleibt)
  document.querySelectorAll('.reveal').forEach(function (el) {
    el.classList.add('is-visible');
  });

  // ----- Bilder: Endung egal -------------------------------
  //  <img data-img="assets/bilder/button1"> probiert automatisch
  //  .jpg / .jpeg / .png / .webp (auch GROSS geschrieben) und nimmt
  //  das erste, das wirklich existiert. data-img darf auch mehrere
  //  Namen (durch Komma getrennt) enthalten — dann werden alle probiert.
  //  Wird gar nichts gefunden: Platzhalter (.ph-note) zeigen bzw. Bild
  //  entfernen, damit der Hinweistext sichtbar bleibt.
  function mrResolveImage(spec, onFound, onFail) {
    var bases = String(spec).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    var exts = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG', 'WEBP'];
    var cands = [];
    bases.forEach(function (b) { exts.forEach(function (e) { cands.push(b + '.' + e); }); });
    var i = 0;
    (function next() {
      if (i >= cands.length) { if (onFail) onFail(); return; }
      var url = cands[i++];
      var probe = new Image();
      probe.onload = function () { onFound(url); };
      probe.onerror = next;
      probe.src = url;
    })();
  }

  document.querySelectorAll('img[data-img]').forEach(function (img) {
    mrResolveImage(
      img.getAttribute('data-img'),
      function (url) { img.src = url; img.classList.add('is-loaded'); },
      function () {
        var note = img.parentNode.querySelector('.ph-note');
        if (note) { img.style.display = 'none'; note.style.display = 'flex'; }
        else { img.remove(); }
      }
    );
  });

  // ----- AJAX-Form-Submit (verhindert mailto / Weiterleitung)
  //       Sendet an Netlify Forms via fetch und zeigt Inline-Danke.
  document.querySelectorAll('form[data-netlify]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('button[type="submit"]');
      var origLabel = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Wird gesendet …';
      }

      var formData = new FormData(form);
      var params = new URLSearchParams();
      formData.forEach(function (value, key) {
        // FormData kann mehrere Werte pro Key haben (Checkboxen)
        params.append(key, value);
      });

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Netzwerk-Fehler ' + response.status);
          // Erfolg: Form ausblenden, Danke-Block zeigen
          var successId = form.getAttribute('data-success');
          var successEl = successId ? document.getElementById(successId) : form.parentNode.querySelector('.form-success');
          form.style.display = 'none';
          if (successEl) {
            successEl.hidden = false;
            successEl.setAttribute('tabindex', '-1');
            successEl.focus({ preventScroll: false });
            successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        })
        .catch(function (err) {
          console.error(err);
          var errorEl = form.querySelector('.form-error');
          if (errorEl) errorEl.hidden = false;
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = origLabel;
          }
        });
    });
  });

  // ----- Zwei-Klick-Kalender (DSGVO) ------------------------
  //  Google-Kalender wird erst geladen, wenn die Besucherin
  //  aktiv klickt. Die Entscheidung wird gemerkt (localStorage).
  var CAL_KEY = 'mr-cal-consent';
  function loadCal(box) {
    if (!box.parentNode) return;
    var frame = document.createElement('iframe');
    frame.className = 'calendar-frame';
    frame.title = box.getAttribute('data-cal-title') || 'Verfügbarkeits-Kalender';
    frame.src = box.getAttribute('data-cal-src');
    frame.loading = 'lazy';
    frame.setAttribute('scrolling', 'no');
    box.parentNode.replaceChild(frame, box);
  }
  var calBoxes = Array.prototype.slice.call(document.querySelectorAll('[data-cal-src]'));
  if (calBoxes.length) {
    var calConsent = false;
    try { calConsent = localStorage.getItem(CAL_KEY) === '1'; } catch (e) {}
    if (calConsent) {
      calBoxes.forEach(loadCal);
    } else {
      calBoxes.forEach(function (box) {
        var btn = box.querySelector('button');
        if (btn) btn.addEventListener('click', function () {
          try { localStorage.setItem(CAL_KEY, '1'); } catch (e) {}
          calBoxes.forEach(loadCal);
        });
      });
    }
  }

  // ----- Anfrage-Seite: Fortschrittsanzeige für Akkordeon
  var progressEl = document.getElementById('anfrage-progress');
  if (progressEl) {
    var details = document.querySelectorAll('.accordion details');
    var total = details.length;

    function update() {
      var touched = 0;
      details.forEach(function (d) {
        // gilt als "berührt", wenn irgendein Feld in diesem Block einen Wert hat
        var inputs = d.querySelectorAll('input, textarea, select');
        var hasValue = false;
        inputs.forEach(function (i) {
          if (i.type === 'checkbox' || i.type === 'radio') {
            if (i.checked) hasValue = true;
          } else if (i.value && i.value.trim()) {
            hasValue = true;
          }
        });
        if (hasValue) touched++;
      });
      progressEl.querySelector('.p-n').textContent = touched + ' / ' + total;
      progressEl.querySelector('.p-bar > span').style.width = ((touched / total) * 100) + '%';
    }

    details.forEach(function (d) {
      d.addEventListener('input', update);
      d.addEventListener('change', update);
    });
    update();
  }
})();
