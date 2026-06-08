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
