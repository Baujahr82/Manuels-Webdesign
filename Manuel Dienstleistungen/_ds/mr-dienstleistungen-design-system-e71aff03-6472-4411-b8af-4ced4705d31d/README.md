# MR-Dienstleistungen — Design System

> Design System für **MR-Dienstleistungen** (Manuel Rudorfer, Pforzheim) — ein Ein-Mann-Betrieb mit drei Standbeinen: **Ansteck-Buttons**, **Webdesign** und **Vermietung**.

## Über die Marke

Hinter MR-Dienstleistungen steht eine Person, kein Callcenter. Die Marke soll genau das ausstrahlen: persönlich, ordentlich, mit kurzen Wegen. Der Auftritt ist **modern und minimalistisch**, aber bewusst **warm** statt kalt-technisch — warmes Papier-Weiß als Hintergrund, warmes Schwarz für die Schrift, ein klares Türkis-Mint als einzige Akzentfarbe.

**Drei Standbeine, eine Marke:**

| Leistung | Was es ist | Erkennungsmerkmal |
|---|---|---|
| **Buttonschmiede** | Ansteck-Buttons in 25 mm und 59 mm — für Vereine, Feiern, Aktionen | Handwerk, Kleinserie, dein Motiv |
| **Webdesign** | Schlichte, professionelle Webseiten — genau wie die hier | „Webseiten, die einfach funktionieren" |
| **Vermietung** | Dachbox & mehr — leihen statt kaufen, in Pforzheim abzuholen | Unkompliziert, fair, lokal |

**Stadt:** Pforzheim. **Sprache:** Deutsch (Du-Form). **Persönlichkeit:** *richtig gut gemacht* — kein Marketing-Sprech, sondern Handwerker-Haltung.

---

## Quellen

Diese System-Definition basiert auf vom Nutzer mitgelieferten Originaldateien — keine Vermutungen.

| Datei | Inhalt | liegt unter |
|---|---|---|
| `MR-Logo.svg` / `.png` | Haupt-Wortmarke „MR" + Mint-Diamant | `assets/` |
| `MR-Logo-Dienstleistungen.svg` / `.png` | Erweitertes Logo mit Wort „Dienstleistungen" | `assets/` |
| `favicon.svg` | Favicon (Mint-Quadrat mit weißem „MR") | `assets/` |
| `index.html` (Entwurf) | Vom Nutzer gestaltete Landingpage — Quelle der Wahrheit für Voice, Layout, Tokens | `uploads/index.html` |
| `styles.css` (Entwurf) | Vom Nutzer gestaltete CSS-Variablen | `uploads/styles.css` |

---

## Index

```
README.md                  ← du bist hier
SKILL.md                   Agent-Skill-Eintrag (Claude Code kompatibel)
colors_and_type.css        Design-Tokens als CSS-Variablen
assets/                    Logos, Favicon, Icons (Lucide-Set)
  MR-Logo.svg              Hauptlogo (MR + Diamant)
  MR-Logo.png              dito als PNG
  MR-Logo-Dienstleistungen.svg   Logo mit Wort „Dienstleistungen"
  MR-Logo-Dienstleistungen.png   dito als PNG
  favicon.svg
  icons/                   strichbasierte Icons (Lucide-Auswahl)
preview/                   Design-System-Vorschau-Karten
ui_kits/
  website/                 vollständiges UI-Kit der Marketing-Seite
    index.html             interaktive Demo (Landingpage + 3 Service-Seiten)
    *.jsx                  modulare Komponenten
```

---

## Content Fundamentals — wie Texte geschrieben werden

### Stimme

- **Sprache:** Deutsch, **Du-Form** (nicht Sie). Persönlich, weil's einer ist.
- **Pronomen:** *Ich* (Manuel) und *Du* (Kund:in). **Niemals „wir"** — es gibt kein „wir", es gibt Manuel.
- **Haltung:** Handwerker, nicht Marketer. Sätze wie *„Ich mache die Dinge gern selbst und ordentlich."* — direkt, leicht trocken, freundlich.
- **Was die Marke NICHT sagt:** „synergie", „state-of-the-art", „passionate", „crafted with love", „we are a team". Auch keine Lobeshymnen über sich selbst.

### Casing

- **Überschriften:** Satzanfang groß, Rest klein — *„Drei Dinge, ein Anspruch: richtig gut gemacht."* Keine Title-Case-Wörter.
- **Buttons:** Satzanfang groß — *„Leistungen ansehen"*, *„Schreib mir"*. Nie ALL CAPS.
- **Eyebrow-Labels:** UPPERCASE mit Sperrung (`letter-spacing: 0.12em`), klein (14 px), Mint-dunkel — *„WAS ICH ANBIETE"*, *„WER DAHINTERSTECKT"*.

### Länge & Rhythmus

- Hero-Headline: ≤ 12 Wörter, ein Gedanke. Optional ein farbig hervorgehobenes Wort.
- Lead-Text unter Hero: 1–2 Sätze, max ~40 Zeichen pro Zeile (also `max-width: 40ch`).
- Service-Beschreibungen: 2–3 kurze Sätze. Niemals ein Absatz.
- CTAs: 2–4 Wörter, immer aktiv (*„Buttons entdecken →"*).

### Emoji & Sonderzeichen

- **Emoji:** keine. Der Mint-Diamant `✦` aus dem Logo darf als Inline-Zeichen vorkommen (am Ende einer Headline, sparsam).
- **Pfeile:** `→` in Inline-Links (*„Buttons entdecken →"*), `←/→` für Navigation. Sonst aus dem Lucide-Icon-Set.
- **Anführungszeichen:** Im Fließtext deutsche `„…"`, nicht englische `"…"`.
- **Geschützte Leerzeichen:** zwischen Wert und Einheit (`59 mm`, `25 mm`) und in Zahl-Wort-Paaren (`seit Tag eins`). Im HTML als `&nbsp;`.

### Beispiel-Copy (übernommen aus dem Entwurf)

| Kontext | Beispiel |
|---|---|
| Eyebrow | *„Pforzheim · seit Tag eins persönlich"* |
| Hero | *„Drei Dinge, ein Anspruch: richtig gut gemacht.✦"* |
| Lead | *„Hinter MR-Dienstleistungen steckt eine Person, kein Callcenter. Ob Ansteck-Buttons, eine saubere Webseite oder etwas zum Leihen — du hast immer denselben Ansprechpartner."* |
| Service-Tag | *„01 Buttonschmiede"* (Nummer immer in Mint, zweistellig nicht nötig) |
| Service-Lead | *„Ansteck-Buttons in 59 mm und 25 mm — für Vereine, Feiern, Aktionen oder einfach so. Dein Motiv, sauber gepresst."* |
| Button primär | *„Leistungen ansehen"* |
| Button sekundär | *„Schreib mir"* |
| Über-Section | *„Manuel Rudorfer. Ich mache die Dinge gern selbst und ordentlich…"* |

---

## Visual Foundations

### Farbphilosophie

**Warm statt kalt.** Hintergrund ist `#fbfaf7` — ein Hauch ins Cremige. Schrift ist `#1a1a17` — warmes Schwarz, kein hartes `#000`. Die einzige Akzentfarbe ist **Mint/Türkis** (`#14b8a6`) — sie kommt aus dem Logo-Diamant und taucht überall sparsam wieder auf:
- als gefüllte Fläche bei primären Buttons,
- als Text-Akzent (das dunklere `#0d8576` für Lesbarkeit auf Hell),
- als weicher Hintergrund (`#e7f6f3`) für *eine* hervorgehobene Karte pro Bildschirm,
- als kleiner Diamant `✦` als Verbinder zum Logo.

**Regel:** Mint ist Akzent, nicht Hintergrund. Nie ganze Sections in Mint. Maximal eine Mint-Fläche pro Bildschirmhöhe.

Volle Palette in `colors_and_type.css`.

### Typografie

Zwei geometrische Sans-Serifs, eng aufeinander abgestimmt:

- **Display: Bricolage Grotesque** (600, 700) — variable Schrift mit leichtem Charakter (etwas Knubbel an den Terminals), trotzdem geometrisch und ruhig. Für Überschriften, Nummerierungen, Logo-Wortmarke.
- **Body: Hanken Grotesk** (400, 500, 600) — sehr neutral, hervorragend lesbar, geometrisch. Für Fließtext, Buttons, Navigation.

Beide stammen aus Google Fonts und sind in `colors_and_type.css` via CDN eingebunden. **Keine Substitution nötig** — der Nutzer hat sie selbst gewählt.

**Hierarchie:**

| Rolle | Größe | Font | Gewicht | Tracking |
|---|---|---|---|---|
| H1 | clamp(2.4rem → 4rem) | Bricolage | 700 | −0.01em |
| H2 | clamp(1.8rem → 2.6rem) | Bricolage | 700 | −0.01em |
| H3 | 1.3rem (21 px) | Bricolage | 700 | −0.01em |
| Lead | 1.2rem (~20 px) | Hanken | 400 | 0 |
| Body | 17 px | Hanken | 400 | 0 |
| Eyebrow | 14 px | Hanken | 600 | +0.12em, UPPERCASE |

Standard-Body-Größe ist **17 px** (nicht 16) — der Lesbarkeit zuliebe. Zeilenhöhe für Body 1.65.

### Spacing

8-Punkt-Grid. Sections atmen.

- **Container-max:** 1080 px (etwas knapper als „typisches Marketing" — das passt zu einem Ein-Mann-Betrieb).
- **Section-Padding vertikal:** 88 px Desktop, 60 px Mobile.
- **Card-Padding:** 30 px außen / 28 px innen (30 × 28).
- **Großzügiger Weißraum** ist das wichtigste Visual-Element. Im Zweifel mehr Luft, nicht weniger.

### Hintergründe

- **Default:** flacher Paper-Ton `#fbfaf7`. Kein Verlauf, kein Muster.
- **Karten:** weiß `#ffffff` auf Paper.
- **Hervorgehobene Karte (max. eine pro Section):** Mint-soft `#e7f6f3`, ohne Border.
- **Dunkles Band („Über"):** Ink `#1a1a17` als großzügige Card mit `radius-lg` (22 px) — nicht full-bleed.
- **Keine Verläufe.** Kein Mesh, kein Glow-Hintergrund, keine Texturen. Das einzige geometrische Element ist der 4-zackige Mint-Diamant aus dem Logo.

### Borders, Radii, Shadows

- **Borders:** 1 px Haarlinien `rgba(26,26,23,.10)`. Hover dunkelt zur Akzentfarbe (Mint).
- **Radii:** `6 / 14 / 22 / 100 px` — Pill für Buttons, 22 px für große Karten, 14 px für kleine, 6 px für Inputs/Tags.
- **Shadows:** dezent, immer mit warmem Ink-Ton, nie schwarz. `shadow-md` = `0 1px 2px rgba(26,26,23,.04), 0 12px 30px rgba(26,26,23,.06)` — der gleiche Schatten den auch die User-Vorlage benutzt. Keine harten Drop-Shadows, keine farbigen Glows (außer beim Focus-Ring).

### Animation

**Subtil und schnell. Nie verspielt.**

- **Easing:** durchgängig `cubic-bezier(0.22, 1, 0.36, 1)` (fast-out, soft-settle).
- **Hover/Press:** 150–200 ms.
- **Entrance:** Fade + 16 px hoch, 700 ms. Stagger über `:nth-child(2)`/`:nth-child(3)` mit 80 ms Versatz. Nur einmal beim Laden.
- **Hover-Knopf:** 2 px nach oben (`translateY(-2px)`) + Farbwechsel. Kein Scale.
- **Hover-Karte:** 4 px nach oben + Border färbt sich Mint.
- **`prefers-reduced-motion: reduce`** wird respektiert — alle `.reveal` werden sofort sichtbar.

### Hover- & Press-States

| Element | Hover | Active/Press |
|---|---|---|
| Primärer Button (Mint) | Background → Mint-dark `#0d8576`, `translateY(-2px)` | `translateY(0)` |
| Ghost-Button | Border → Ink | — |
| Nav-Link | Opacity 0.8 → 1.0, Text → Mint-dark | — |
| Service-Karte | `translateY(-4px)`, Border → Mint | — |
| Inline-Link | Text → Ink (von Mint-dark) | — |

### Transparenz & Blur

- **Sticky-Header:** `background: rgba(251, 250, 247, 0.85)` + `backdrop-filter: blur(10px)`. Nur dort. Sonst keine durchscheinenden Flächen.
- **Modale Overlays (wenn nötig):** `rgba(26, 26, 23, 0.6)` als Scrim.

### Layout-Regeln

- **Fixiert:** nur der obere Header (sticky), nie der Footer.
- **Ausrichtung:** stark linksbündig. Mittig nur die Hero-Headline auf großen Bildschirmen, optional.
- **Grid:** 3 Spalten Desktop, 1 Spalte ab `820px` und kleiner. Keine 2-Spalten-Zwischenstufe — wirkt unruhig.
- **Mobile-Nav:** Links verschwinden, nur Logo + Kontakt-Button bleiben sichtbar.

### Karten

Eine „Karte" in diesem System ist:
- Weißer Hintergrund (`#fff`) auf Paper, 1 px warme Border, `radius-lg` (22 px), `shadow-md`, 30 × 28 px Padding.
- Optional: Nummer in Mint („01"), H3-Titel in Ink, Lead-Paragraph muted, ein „mehr →"-Link am Ende in Mint-dark.
- Sonderform `.feature`: Mint-soft-Hintergrund, keine Border. Maximal eine pro Section.

---

## Iconography

**Ansatz:** strichbasierte Linien-Icons, Stroke 1.5 px, 24 × 24 Viewbox. Schwarz-warm (`currentColor`). Keine gefüllten, keine bunten Icons.

**Icon-Set:** [Lucide](https://lucide.dev) — sechs Icons (`arrow-right`, `arrow-up-right`, `external-link`, `github`, `mail`, `menu`, `x`) liegen lokal unter `assets/icons/` als SVG, für alles Weitere via CDN: `https://unpkg.com/lucide-static@latest/icons/<name>.svg`.

> ⚠ **Substitutions-Flag:** Der Nutzer hat kein eigenes Icon-Set mitgeliefert. Lucide ist meine Empfehlung, weil sein 1.5-px-Strich gut zu Bricolage/Hanken passt. Falls du ein anderes Set bevorzugst (Phosphor, Iconoir, Heroicons), gib Bescheid — Substitution ist trivial.

**Verwendung:**
- In Buttons: 16 × 16, `currentColor`, 8 px Abstand zum Label.
- Standalone (z. B. in Karten): 22 × 22, Ink-Farbe.
- In der Navigation: gar nicht — die Marke setzt auf Text-Links.

**Emoji:** nein. **Unicode-Glyphen als Schmuck:** nein — *außer* dem Mint-Diamant `✦` aus dem Logo. Der darf hinter Headlines oder als Trenner stehen.

**Logo-Verwendung:**
- `MR-Logo.svg` ist die Basis: warmes-Schwarzes „MR" + Mint-Diamant. Default-Höhe 40 px im Header.
- `MR-Logo-Dienstleistungen.svg` ist die Lang-Form mit Wort „Dienstleistungen" — für Footer, About-Sektionen, Geschäftspapier.
- `favicon.svg` für Browser-Tabs, Social-Cards.
- Mindestabstand zu anderen Elementen: 1× Höhe des „M".
- Auf hellem Hintergrund: Standard. Auf Ink-Hintergrund: aktuell noch keine Inverse-Variante — kann auf Wunsch angelegt werden.

---

## Quick Reference

| Token | Wert |
|---|---|
| Paper (BG) | `#fbfaf7` |
| Ink (FG) | `#1a1a17` |
| Mint (Akzent) | `#14b8a6` |
| Mint dark (Text) | `#0d8576` |
| Mint soft (BG) | `#e7f6f3` |
| Muted | `#5c5c54` |
| Line | `rgba(26,26,23,.10)` |
| Display | Bricolage Grotesque, 700 |
| Body | Hanken Grotesk, 400 |
| Radius default | 14 px (klein), 22 px (Karte), 100 px (Button) |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Hover-Duration | 200 ms |

---

## Caveats (wichtig zum Lesen)

1. **Voice & Tokens kommen aus deinem Entwurf** — der Entwurf ist Quelle der Wahrheit. Wenn du etwas änderst, am besten in `colors_and_type.css` zentral.
2. **Icons** sind Lucide als Default. Falls du ein anderes Set willst, sag Bescheid.
3. **Inverse-Logo:** noch nicht angelegt. Falls du das Logo regelmäßig auf dunklem Hintergrund einsetzt, sollten wir eine Variante mit weißem „MR" anlegen.
4. **Imagery / Fotos:** noch keine echten Bilder im System. Wenn du Vereinsbilder, Buttons-Fotos oder Dachbox-Aufnahmen hast — gerne her damit, dann bauen wir sie ein.
5. **Impressum-/Datenschutz-Texte** im UI-Kit-Footer sind Platzhalter — bitte vor jeder Live-Schaltung ergänzen.
