# ka-deshittify

`ka-deshittify` ist ein Tampermonkey-Skript, das Inserate von bekannten Fertighaus- und Bauträgerketten auf [kleinanzeigen.de](https://www.kleinanzeigen.de) anhand des in den Inseraten sichtbaren Anbieternamens ausblendet.

## Installation

1. Installiere [Tampermonkey](https://www.tampermonkey.net/) oder ein kompatibles Userscript-Add-on in deinem Browser.
2. Öffne den Inhalt der Datei [`ka-deshittify.user.js`](./ka-deshittify.user.js) und erstelle damit ein neues Userscript in Tampermonkey.
3. Aktiviere das Skript. Beim Durchsuchen von Immobilienanzeigen sollten betroffene Einträge automatisch verschwinden.

## Funktionsweise

- Das Skript überwacht die Ergebnisliste und blendet komplette `<li class="ad-listitem">`-Einträge aus, sobald der Anzeigen-Text einen der hinterlegten Markennamen enthält.
- Die Blockliste umfasst einige gängige Fake-Neubau-/Fertighaus-Anbieter (z. B. *massa haus*, *Bien-Zenker*, *ImmoLa*, *Town & Country*).
- Jede Anpassung wird dauerhaft im `localStorage` des Browsers gespeichert. Du kannst die Liste jederzeit erweitern oder Einträge wieder zulassen, ohne das Skript zu bearbeiten.

## Steuerung über die Browser-Konsole

Das Skript exportiert ein kleines Hilfsobjekt unter `window.kaDeshittify`. Über die Entwicklerwerkzeuge des Browsers lassen sich damit Einträge zur Blockliste hinzufügen oder entfernen:

```js
// Aktuelle Blockliste ausgeben
window.kaDeshittify.listAll();

// Weitere Anbieter ergänzen
window.kaDeshittify.add('Beispiel GmbH');

// Einen Anbieter wieder zulassen
window.kaDeshittify.remove('Beispiel GmbH');

// Benutzerdefinierte Änderungen zurücksetzen
window.kaDeshittify.reset();
```

Mit `window.kaDeshittify.test('…')` kannst du prüfen, ob ein Text mit einem Blocklisteneintrag kollidiert. Die Methode gibt den Namen aus der Liste oder `null` zurück.

## Hinweis

Die Auswahl der vorkonfigurierten Markennamen ist bewusst konservativ gehalten. Ergänze bei Bedarf weitere Begriffe, die bei deinen Suchanfragen störende Ergebnisse verursachen.
