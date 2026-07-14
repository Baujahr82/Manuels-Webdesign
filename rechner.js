// ============================================================
// MR-Dienstleistungen — Preis-Rechner (Vermietung)
// Preise laut Mietvertrag. Eine Stelle ändern -> überall aktiv.
// ============================================================
(function () {
  'use strict';

  // ----- Preis-Tabellen ------------------------------------
  // Maschine: Gesamtpreis je nach Mietdauer (NICHT pro Tag addieren).
  var MASCHINE_TAGE = { 1: 15, 2: 15, 3: 20, 4: 20, 5: 25, 6: 25, 7: 30, 8: 30 };
  var STANZE        = 10;    // Papierstanze: einmalig für die gesamte Miete
  var MASCHINE_KAUTION = 100;

  var BUTTON_BASIS  = 0.25;  // Stückpreis ohne Rabatt
  // Staffelrabatt auf die gesamte Menge
  function buttonRabatt(menge) {
    if (menge >= 900) return 0.24;
    if (menge >= 600) return 0.20;
    if (menge >= 300) return 0.10;
    return 0;
  }

  var DACHBOX_TAG     = 5;
  var TRAEGER_TAG     = 2;
  var DACHBOX_KAUTION = 150;

  // Faltpavillon: Tagespreis-Staffel — je länger, desto günstiger der Tag.
  var ZELT_TAGE = { 1: 35, 2: 50, 3: 60, 4: 70, 5: 80, 6: 90, 7: 100 };
  function zeltPreis(tage) {
    if (tage <= 7) return ZELT_TAGE[tage] || 35;
    return ZELT_TAGE[7] + (tage - 7) * 10; // jeder weitere Tag +10 €
  }
  var ZELT_WAND    = 4;    // pro Seitenwand, einmalig für die ganze Miete (unter gewerblichem Niveau)
  var ZELT_KAUTION = 150;

  // Buttons-Bestellung (Buttonschmiede): Staffelpreis nach Gesamtmenge.
  // Staffel: an den Bruchpunkten der recherchierten Konkurrenz orientiert,
  // pro Stufe minimal günstiger als der jeweils günstigste Vergleichspreis,
  // nie unter 0,50 € pro Stück (Floor erst ab 500 Stück erreicht).
  var BESTELL_STAFFEL = [
    { bis: 29,        preis: 1.00 },
    { bis: 49,        preis: 0.85 },
    { bis: 99,        preis: 0.68 },
    { bis: 199,       preis: 0.60 },
    { bis: 499,       preis: 0.55 },
    { bis: Infinity,  preis: 0.50 }
  ];
  function preisFuerMenge(menge) {
    for (var i = 0; i < BESTELL_STAFFEL.length; i++) {
      if (menge <= BESTELL_STAFFEL[i].bis) return BESTELL_STAFFEL[i].preis;
    }
    return BESTELL_STAFFEL[BESTELL_STAFFEL.length - 1].preis;
  }
  var BESTELL_VERSAND = 8.50; // Pauschale Porto, Verpackung & Versicherung (DHL-Paket)
  var BESTELL_MIN   = 20;           // Mindestmenge gesamt

  // ----- Helfer --------------------------------------------
  function euro(n) {
    return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  }
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // ----- Stepper-Verdrahtung -------------------------------
  function wireStepper(root, onChange) {
    var input = $('input', root);
    var min = parseInt(input.getAttribute('min'), 10);
    var max = parseInt(input.getAttribute('max'), 10);
    var step = parseInt(input.getAttribute('step'), 10) || 1;
    var btns = $all('button', root);

    function set(v) {
      v = clamp(isNaN(v) ? min : v, min, max);
      input.value = v;
      btns[0].disabled = v <= min;
      btns[1].disabled = v >= max;
      onChange(v);
    }
    btns[0].addEventListener('click', function () { set(parseInt(input.value, 10) - step); });
    btns[1].addEventListener('click', function () { set(parseInt(input.value, 10) + step); });
    input.addEventListener('input', function () { set(parseInt(input.value, 10)); });
    set(parseInt(input.value, 10));
    return { set: set };
  }

  // ----- Segmentierter Schalter (Ja/Nein) ------------------
  function wireSegmented(root, onChange) {
    var btns = $all('button', root);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.classList.remove('is-on'); });
        b.classList.add('is-on');
        onChange(b.getAttribute('data-val') === '1');
      });
    });
  }

  // ----- „Diese Kalkulation anfragen“ ------------------------
  //  Übernimmt die aktuelle Kalkulation ins Kontaktformular
  //  und scrollt sanft dorthin.
  function wireSend(el, makeText) {
    var btn = $('[data-calc-send]', el);
    if (!btn) return;
    btn.addEventListener('click', function () {
      var t = makeText();
      var subj = document.getElementById('c-subject');
      var msg  = document.getElementById('c-message');
      if (subj) subj.value = t.subject;
      if (msg) msg.value = t.message;
      var ziel = document.getElementById('kontakt');
      if (ziel) {
        var y = ziel.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  }

  function tage(n) { return n + (n === 1 ? ' Tag' : ' Tage'); }

  // ====================================================================
  //  DACHBOX-RECHNER
  // ====================================================================
  function initDachbox() {
    var el = $('#calc-dachbox');
    if (!el) return;

    var state = { tage: 7, traeger: false };

    var sTage    = $('[data-out="tage"]', el);
    var sBox     = $('[data-out="box"]', el);
    var sTraeger = $('[data-out="traeger"]', el);
    var traegerLine = $('[data-line="traeger"]', el);
    var sTotal   = $('[data-out="total"]', el);

    function render() {
      var boxCost = state.tage * DACHBOX_TAG;
      var traegerCost = state.traeger ? state.tage * TRAEGER_TAG : 0;
      var total = boxCost + traegerCost;

      sTage.textContent = state.tage + (state.tage === 1 ? ' Tag' : ' Tage');
      sBox.textContent = euro(boxCost);
      sTraeger.textContent = state.traeger ? euro(traegerCost) : '—';
      traegerLine.classList.toggle('is-off', !state.traeger);
      sTotal.textContent = euro(total);
    }

    wireStepper($('[data-step="tage"]', el), function (v) { state.tage = v; render(); });
    wireSegmented($('[data-seg="traeger"]', el), function (v) { state.traeger = v; render(); });
    wireSend(el, function () {
      return {
        subject: 'Dachbox, ' + tage(state.tage) + (state.traeger ? ' + Dachträger' : ''),
        message: 'Hallo Manuel,\n\nich möchte die Dachbox anfragen:\n· Mietdauer: ' + tage(state.tage) +
          '\n· Dachträger: ' + (state.traeger ? 'ja' : 'nein') +
          '\n· Richtpreis laut Rechner: ' + sTotal.textContent + ' (zzgl. 150 € Kaution)\n\nWunschzeitraum: '
      };
    });
    render();
  }

  // ====================================================================
  //  BUTTONMASCHINEN-RECHNER
  // ====================================================================
  function initButton() {
    var el = $('#calc-button');
    if (!el) return;

    var state = { tage: 3, stanze: false, menge: 100 };

    var sTageLab  = $('[data-out="tage-lab"]', el);
    var sMaschine = $('[data-out="maschine"]', el);
    var sStanze   = $('[data-out="stanze"]', el);
    var stanzeLine = $('[data-line="stanze"]', el);
    var sMengeLab = $('[data-out="menge-lab"]', el);
    var sButtons  = $('[data-out="buttons"]', el);
    var sTotal    = $('[data-out="total"]', el);
    var rabattNote = $('[data-out="rabatt-note"]', el);

    var mengeInput = $('[data-menge-input]', el);
    var mengeSlider = $('[data-menge-slider]', el);
    var quickBtns = $all('[data-menge-quick] button', el);

    function render() {
      // Maschine
      var maschineCost = MASCHINE_TAGE[state.tage] || 0;
      sTageLab.textContent = state.tage + (state.tage === 1 ? ' Tag' : ' Tage');
      sMaschine.textContent = euro(maschineCost);

      // Stanze
      var stanzeCost = state.stanze ? STANZE : 0;
      sStanze.textContent = state.stanze ? euro(stanzeCost) : '—';
      stanzeLine.classList.toggle('is-off', !state.stanze);

      // Buttons
      var rab = buttonRabatt(state.menge);
      var stueck = BUTTON_BASIS * (1 - rab);
      var buttonsCost = state.menge * stueck;
      sMengeLab.innerHTML = state.menge.toLocaleString('de-DE') + ' × ' + euro(stueck) +
        (rab > 0 ? ' <small>(−' + Math.round(rab * 100) + ' %)</small>' : '');
      sButtons.textContent = euro(buttonsCost);

      // Rabatt-Hinweis
      if (rab > 0) {
        rabattNote.hidden = false;
        rabattNote.textContent = '✓ Staffelrabatt aktiv: −' + Math.round(rab * 100) +
          ' % auf alle ' + state.menge.toLocaleString('de-DE') + ' Buttons.';
      } else {
        var next = state.menge < 300 ? 300 : null;
        rabattNote.hidden = next === null;
        if (next) rabattNote.textContent = 'Tipp: Ab 300 Buttons gibt es 10 % Rabatt (ab 600 → 20 %, ab 900 → 24 %).';
      }

      // Summe
      sTotal.textContent = euro(maschineCost + stanzeCost + buttonsCost);

      // Quick-Buttons-Status
      quickBtns.forEach(function (b) {
        b.classList.toggle('is-on', parseInt(b.getAttribute('data-val'), 10) === state.menge);
      });
    }

    wireStepper($('[data-step="tage"]', el), function (v) { state.tage = v; render(); });
    wireSegmented($('[data-seg="stanze"]', el), function (v) { state.stanze = v; render(); });

    function setMenge(v) {
      // nur volle 100er, ab 100 Stück
      v = clamp(isNaN(v) ? 100 : Math.round(v / 100) * 100, 100, 3000);
      state.menge = v;
      mengeInput.value = v;
      mengeSlider.value = v;
      render();
    }
    mengeInput.addEventListener('input', function () { setMenge(parseInt(mengeInput.value, 10)); });
    mengeSlider.addEventListener('input', function () { setMenge(parseInt(mengeSlider.value, 10)); });
    quickBtns.forEach(function (b) {
      b.addEventListener('click', function () { setMenge(parseInt(b.getAttribute('data-val'), 10)); });
    });

    wireSend(el, function () {
      return {
        subject: 'Buttonmaschine, ' + tage(state.tage) + ', ' + state.menge.toLocaleString('de-DE') + ' Buttons',
        message: 'Hallo Manuel,\n\nich möchte die Buttonmaschine anfragen:\n· Mietdauer: ' + tage(state.tage) +
          '\n· Papierstanze: ' + (state.stanze ? 'ja' : 'nein') +
          '\n· Button-Rohlinge: ' + state.menge.toLocaleString('de-DE') + ' Stück' +
          '\n· Richtpreis laut Rechner: ' + sTotal.textContent + ' (zzgl. 100 € Kaution)\n\nWunschzeitraum: '
      };
    });

    setMenge(state.menge);
  }

  // ====================================================================
  //  FALTPAVILLON-RECHNER (Tagespreis-Staffel + Seitenwände)
  // ====================================================================
  function initZelt() {
    var el = $('#calc-zelt');
    if (!el) return;

    var state = { tage: 2, waende: 0 };

    var sTage    = $('[data-out="tage"]', el);
    var sRate    = $('[data-out="tag-rate"]', el);
    var sZelt    = $('[data-out="zelt"]', el);
    var sWaende  = $('[data-out="waende"]', el);
    var waendeLine = $('[data-line="waende"]', el);
    var sWaendeLab = $('[data-out="waende-lab"]', el);
    var sTotal   = $('[data-out="total"]', el);

    function render() {
      var zeltCost = zeltPreis(state.tage);
      var waendeCost = state.waende * ZELT_WAND;
      var total = zeltCost + waendeCost;

      sTage.textContent = state.tage + (state.tage === 1 ? ' Tag' : ' Tage');
      sRate.textContent = euro(zeltCost / state.tage) + ' / Tag';
      sZelt.textContent = euro(zeltCost);
      waendeLine.classList.toggle('is-off', state.waende === 0);
      sWaendeLab.textContent = state.waende > 0
        ? state.waende + '× je ' + euro(ZELT_WAND) : '';
      sWaende.textContent = state.waende > 0 ? euro(waendeCost) : '—';
      sTotal.textContent = euro(total);
    }

    wireStepper($('[data-step="tage"]', el), function (v) { state.tage = v; render(); });
    wireStepper($('[data-step="waende"]', el), function (v) { state.waende = v; render(); });
    wireSend(el, function () {
      return {
        subject: 'Faltpavillon, ' + tage(state.tage) + (state.waende > 0 ? ', ' + state.waende + ' Seitenwände' : ''),
        message: 'Hallo Manuel,\n\nich möchte den Faltpavillon anfragen:\n· Mietdauer: ' + tage(state.tage) +
          '\n· Seitenwände: ' + (state.waende > 0 ? state.waende : 'keine') +
          '\n· Richtpreis laut Rechner: ' + sTotal.textContent + ' (zzgl. 150 € Kaution)\n\nWunschzeitraum: '
      };
    });
    render();
  }

  // ====================================================================
  //  BUTTONS-BESTELL-RECHNER (Buttonschmiede)
  // ====================================================================
  function initBestellung() {
    var el = $('#calc-bestellung');
    if (!el) return;

    var state = { q25: 0, q59: 20, versand: 0 };

    var sQ25     = $('[data-out="q25"]', el);
    var sQ59     = $('[data-out="q59"]', el);
    var q25Line  = $('[data-line="q25"]', el);
    var q59Line  = $('[data-line="q59"]', el);
    var versLine = $('[data-line="versand"]', el);
    var sQ25Lab  = $('[data-out="q25-lab"]', el);
    var sQ59Lab  = $('[data-out="q59-lab"]', el);
    var sVersand = $('[data-out="versand"]', el);
    var sTotal   = $('[data-out="total"]', el);
    var minNote  = $('[data-out="min-note"]', el);
    var stueckLab = $('[data-out="stueck-lab"]', el);

    function render() {
      var total = state.q25 + state.q59;
      var preis = preisFuerMenge(total);
      var c25 = state.q25 * preis;
      var c59 = state.q59 * preis;
      var versandKosten = state.versand ? BESTELL_VERSAND : 0;

      q25Line.classList.toggle('is-off', state.q25 === 0);
      q59Line.classList.toggle('is-off', state.q59 === 0);
      versLine.classList.toggle('is-off', !state.versand);
      sQ25Lab.textContent = state.q25 > 0 ? state.q25 + ' × ' + euro(preis) : '';
      sQ59Lab.textContent = state.q59 > 0 ? state.q59 + ' × ' + euro(preis) : '';
      sQ25.textContent = state.q25 > 0 ? euro(c25) : '—';
      sQ59.textContent = state.q59 > 0 ? euro(c59) : '—';
      sVersand.textContent = state.versand ? euro(versandKosten) : '—';
      sTotal.textContent = euro(c25 + c59 + versandKosten);
      stueckLab.textContent = total + ' Stück · ' + euro(preis) + '/Stück';

      if (total > 0 && total < BESTELL_MIN) {
        minNote.hidden = false;
        minNote.textContent = 'Mindestmenge ' + BESTELL_MIN + ' Stück — es fehlen noch ' +
          (BESTELL_MIN - total) + '. Du brauchst weniger? Frag trotzdem an.';
      } else {
        minNote.hidden = true;
      }
    }

    wireStepper($('[data-step="q25"]', el), function (v) { state.q25 = v; render(); });
    wireStepper($('[data-step="q59"]', el), function (v) { state.q59 = v; render(); });
    wireSegmented($('[data-seg="versand"]', el), function (v) { state.versand = v; render(); });
    wireSend(el, function () {
      var teile = [];
      if (state.q25 > 0) teile.push(state.q25 + '× 25 mm');
      if (state.q59 > 0) teile.push(state.q59 + '× 59 mm');
      return {
        subject: 'Buttons: ' + (teile.join(', ') || 'Menge offen'),
        message: 'Hallo Manuel,\n\nich möchte Buttons anfragen:\n· ' + (teile.join('\n· ') || 'Menge noch offen') +
          '\n· Staffelpreis: ' + euro(preisFuerMenge(state.q25 + state.q59)) + '/Stück' +
          '\n· ' + (state.versand ? 'Versand als DHL-Paket (8,50 €)' : 'Abholung in Pforzheim (kostenlos)') +
          '\n· Richtpreis laut Rechner: ' + sTotal.textContent +
          '\n\nMotiv / Anlass: '
      };
    });
    render();
  }

  // ----- Start ---------------------------------------------
  function start() { initDachbox(); initButton(); initZelt(); initBestellung(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
