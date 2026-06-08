# MR-Dienstleistungen — Webseite

Statische Multi-Page-Webseite für Manuel Rudorfer / MR-Dienstleistungen.
Kein Build-Prozess, keine Datenbank — einfach HTML, CSS und ein bisschen JavaScript.

## Inhalt

```
index.html          Startseite mit Übersicht der Leistungen
buttons.html        Buttonschmiede
webdesign.html      Webdesign-Service
vermietung.html     Verleih (Dachbox, Buttonmaschine)
anfrage.html        Ausführlicher Anfrage-Bogen (12 Abschnitte)
impressum.html      Impressum
datenschutz.html    DSGVO-Erklärung
agb.html            AGB für Vermietung, Verkauf & Dienstleistungen

styles.css          gemeinsames CSS für alle Seiten
site.js             Form-Versand (AJAX) + Footer-Jahr + Fortschritts-Bar
netlify.toml        Netlify-Konfiguration (Hosting, Caching)

assets/             Logos & Favicon
  MR-Logo.svg
  MR-Logo-Dienstleistungen.svg
  favicon.svg
```

## Auf Netlify deployen — Schritt für Schritt

### Variante A: Drag & Drop (einfachster Weg)

1. Bei [netlify.com](https://www.netlify.com/) anmelden (gratis-Account reicht).
2. Auf der Dashboard-Startseite den Bereich **„Drag and drop your site output folder here"** finden.
3. Den **gesamten Projektordner** (mit allen `.html`-Dateien, `assets/`, `styles.css`, `site.js`, `netlify.toml`) per Drag&Drop dort ablegen.
4. Netlify weist eine zufällige Subdomain zu (z.B. `wonderful-name-12345.netlify.app`).
5. Unter **Site settings → Site information → Change site name** kann man eine schönere Adresse vergeben (z.B. `mr-dienstleistungen.netlify.app`).

### Variante B: über GitHub (für spätere Updates bequemer)

1. Projekt als GitHub-Repository anlegen und alle Dateien hochladen.
2. In Netlify auf **„Add new site → Import an existing project"** klicken.
3. GitHub auswählen und das Repository verknüpfen.
4. Build-Einstellungen: **leer lassen**, Publish directory: `.` (Punkt).
5. **Deploy site** klicken — bei jedem `git push` deployed Netlify automatisch.

## Eigene Domain (optional)

1. Unter **Domain management → Add domain alias** die gewünschte Domain eintragen
   (z.B. `mr-dienstleistungen.de`).
2. Beim Domain-Anbieter (Strato, IONOS etc.) die Nameserver auf Netlify umstellen
   ODER einen CNAME-Eintrag setzen — Netlify zeigt die genauen Werte an.
3. HTTPS wird automatisch eingerichtet (Let's Encrypt).

## Formulare aktivieren

Die beiden Formulare (`contact` und `anfrage`) erkennt Netlify nach dem ersten Deploy automatisch — sie tauchen unter **Forms** im Dashboard auf.

**Damit Nachrichten an `manuel-dienstleistungen@gmx.de` ankommen:**

1. **Site settings → Forms → contact → Form notifications → Add notification**
2. **Email notification** auswählen
3. **Email to notify:** `manuel-dienstleistungen@gmx.de`
4. **Save**
5. Das gleiche nochmal für das Formular **`anfrage`** wiederholen.

Spam-Schutz: Honeypot-Feld `bot-field` ist in den Formularen bereits eingebaut.

## Bilder hochladen — Ordnerstruktur & Namen

Die Bilder sind nach Art in Unterordnern sortiert. Lege jede Datei **mit dem exakt vorgegebenen Namen** im passenden Ordner ab — dann erscheint sie automatisch. Solange eine Datei fehlt, zeigt die Seite einen Platzhalter mit dem erwarteten Dateinamen.

```
assets/manuel.jpg                    Porträt im "Wer dahintersteckt"-Bereich

assets/buttons/galerie-1.jpg         Button-Galerie (Reihenfolge = Anzeige)
assets/buttons/galerie-2.jpg
assets/buttons/galerie-3.jpg

assets/webdesign/keibelhexen.jpg     Projekt-Vorschau Keibelhexen
assets/webdesign/jogi-weiss.jpg      Projekt-Vorschau Jogi Weiß

assets/vermietung/dachbox.jpg        Thule Dachbox XT XL
assets/vermietung/buttonmaschine.jpg Badgematic Buttonmaschine
```

In jedem Ordner liegt eine Datei `_BILDER-HIERHIN.txt` mit denselben Hinweisen.

### Bilder über Netlify hochladen — Schritt für Schritt

Da du alles direkt in Netlify pflegst (ohne GitHub):

1. Bei [app.netlify.com](https://app.netlify.com) einloggen und deine Site öffnen.
2. Oben auf den Tab **Deploys** klicken.
3. Auf dem Rechner den **kompletten Projektordner** öffnen und die Bilder
   mit den exakten Namen in die richtigen Unterordner legen
   (`assets/buttons/`, `assets/webdesign/`, `assets/vermietung/`, `assets/`).
4. Den **gesamten Projektordner** wieder per Drag & Drop in das Feld
   **„Drag and drop your site output folder here"** ziehen.
5. Netlify macht ein neues Deploy — die Bilder sind sofort live.

> Wichtig: Immer den **ganzen Ordner** neu hochladen, nicht nur die Bilder einzeln —
> Netlify ersetzt die Seite komplett mit dem, was du hochlädst.

## Inhalte ändern

Alle Texte stehen direkt in den HTML-Dateien — einfach mit einem Texteditor öffnen
und ändern, dann neu hochladen (oder pushen, wenn über GitHub).

**Häufige Stellen:**
- **Foto Manuel** — in `index.html` den `<div class="portrait" id="portrait-manuel">` durch ein `<img src="assets/manuel.jpg" alt="Manuel Rudorfer" />` ersetzen.
- **Button-Galerie** — in `buttons.html` die `.gallery-grid` mit echten Fotos füllen.
- **Portfolio** — neue Projekte in `webdesign.html` als `<li>` in der `.portfolio-compact` Liste ergänzen.
- **Preise** — Buttonmaschine in `vermietung.html`, Buttons in `buttons.html`.

## Kontakt zum Entwickler

manuel-dienstleistungen@gmx.de
