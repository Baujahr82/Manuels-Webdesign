# Website-Bauauftrag — MR-Dienstleistungen

Dieses Dokument beschreibt, **was** gebaut werden soll. Das **Wie** (Farben,
Schrift, Logo, Bausteine) liegt bereits im Projektwissen (`MR-Corporate-Design.md`
und `styles.css`). Claude soll beides zusammen nutzen.

---

## 1. Gesamtkonzept

- **Dachmarke:** MR-Dienstleistungen. Eine Marke, ein Look, drei Bereiche.
- **Aufbau:** EINE Webseite mit einer Startseite und drei Unterseiten — nicht
  mehrere getrennte Seiten.
  - `index.html` — Startseite (Überblick / Einstieg)
  - `buttons.html` — Buttonschmiede
  - `webdesign.html` — Webseiten
  - `vermietung.html` — Vermietung
- **Verbindung:** Alle Seiten teilen sich Kopfzeile, Fußzeile und `styles.css`.
  Eine Unterseite ist fokussiert auf ihr Thema; die anderen Bereiche stehen nur
  dezent in Kopf- und Fußzeile.
- **Online:** Später kostenlos über Netlify, Zugang per Link und QR-Code.

---

## 2. Regeln für jede Seite

1. Jede Seite ist eine **eigenständige, vollständige HTML-Datei**, die im `<head>`
   die Schrift (Google Fonts) und `styles.css` einbindet.
2. **Keine** eigenen Farben, Schriften oder Abstände erfinden — nur die aus dem
   Corporate Design / `styles.css`.
3. **Kopf- und Fußzeile** unverändert aus `Claude-Projektanweisung.md` übernehmen.
   In der Kopfzeile den Link des aktuellen Bereichs als aktiv kennzeichnen.
4. Vorhandene Bausteine nutzen: `.hero`, `.grid-3`, `.card`, `.band`, `.btn`,
   `.eyebrow`, `.section`, `.container`.
5. **Sprache Deutsch**, Tonfall menschlich, klar, direkt — keine Werbesprache.
6. Echte Inhalte (Preise, Beispiele) sind Platzhalter, klar als solche markieren.
   Nichts erfinden, was Manuel noch festlegen muss.

---

## 3. Die Seiten im Detail

### Startseite (`index.html`) — existiert bereits
Einstieg mit kurzer Vorstellung, drei Service-Kacheln (Buttonschmiede, Webdesign,
Vermietung), kurzer „Wer dahintersteckt"-Abschnitt, Fußzeile mit Kontakt. Diese
Seite ist schon gebaut und dient als Vorlage für den Look.

### Buttonschmiede (`buttons.html`)
- **Zweck:** Ansteck-Buttons anbieten und zur Anfrage/Bestellung führen.
- **Abschnitte:**
  - Hero: „Buttonschmiede" + ein Satz, worum es geht.
  - Größen: **59 mm** und **25 mm** — kurz erklärt, wofür sich welche eignet.
  - Anlässe: Vereine, Feiern, Hochzeiten, Aktionen, Wahlkampf, einfach so.
  - So läuft's: 1) Motiv schicken 2) Menge/Größe wählen 3) abholen/erhalten.
  - Preisbeispiele: **als Platzhalter** (Staffelpreise später eintragen).
  - Galerie/Muster: Platzhalter für Fotos.
  - Abschluss-Aufruf: zur Kontaktaufnahme.
- **Hinweis:** Die Buttonschmiede darf später eine eigene Akzentfarbe bekommen
  (eigene Note), Logo und Aufbau bleiben gleich.

### Webseiten (`webdesign.html`)
- **Zweck:** zeigen, dass Manuel saubere Webseiten baut, und zur Anfrage führen.
- **Abschnitte:**
  - Hero: z. B. „Webseiten, schlicht und professionell — so eine wie diese."
  - Was du bekommst: einfache, schnelle, auf Handy & PC gut aussehende Seiten.
  - Ablauf: Gespräch → Entwurf → Umsetzung → online.
  - Beispiele: Platzhalter (auch diese Seite selbst als Beispiel nennen).
  - Preise/Anfrage: Platzhalter bzw. „auf Anfrage".
  - Abschluss-Aufruf: Kontakt.

### Vermietung (`vermietung.html`)
- **Zweck:** Verleih-Angebot (Dachbox u. a.) zeigen und zur Reservierung führen.
- **Abschnitte:**
  - Hero: „Leihen statt kaufen."
  - Angebot: Dachbox (und weitere Gegenstände — Platzhalterliste).
  - So funktioniert's: Anfragen → Termin → Abholung in Pforzheim → zurückbringen.
  - Konditionen/Preise: Platzhalter (Tages-/Wochenpreis, Kaution).
  - Abschluss-Aufruf: Kontakt.

---

## 4. So baust du es mit Claude (Schritt für Schritt)

Arbeite **eine Seite nach der anderen** in deinem Projekt. Für jede Seite einen
eigenen Chat. Aufträge zum Kopieren:

**Buttonschmiede:**
> Bau die Seite `buttons.html` auf Basis unseres Corporate Designs und der
> styles.css. Inhalt laut Website-Bauauftrag, Abschnitt „Buttonschmiede":
> 59-mm- und 25-mm-Buttons, Anlässe, Ablauf, Preisbeispiele als Platzhalter,
> Galerie-Platzhalter, Kontakt-Aufruf. Kopf- und Fußzeile unverändert, der Link
> „Buttons" in der Kopfzeile aktiv. Gib mir die fertige HTML-Datei.

**Webseiten:**
> Bau die Seite `webdesign.html` auf Basis unseres Corporate Designs und der
> styles.css. Inhalt laut Bauauftrag, Abschnitt „Webseiten". Kopf- und Fußzeile
> unverändert, Link „Webdesign" aktiv. Gib mir die fertige HTML-Datei.

**Vermietung:**
> Bau die Seite `vermietung.html` auf Basis unseres Corporate Designs und der
> styles.css. Inhalt laut Bauauftrag, Abschnitt „Vermietung". Kopf- und Fußzeile
> unverändert, Link „Vermietung" aktiv. Gib mir die fertige HTML-Datei.

**Danach:** alle Dateien (`index.html`, `buttons.html`, `webdesign.html`,
`vermietung.html`, `styles.css`, `favicon.svg`, Logos) in **einen Ordner** legen
und bei Netlify hochladen.

---

## 5. Vor dem Veröffentlichen

- Platzhalter (Preise, Beispiele, Fotos) durch echte Inhalte ersetzen.
- Vollständiges **Impressum** ergänzen — welche Angaben für dein Gewerbe Pflicht
  sind, bitte separat absichern.
