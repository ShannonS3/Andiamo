# Andiamo!

A pocket Italian companion for a trip to Italy: flashcards, culture tips, and travel guides in one small web app that works completely offline.

Andiamo! is a single self-contained web page. It runs in any modern browser, installs to a phone's home screen, and keeps working with no signal once it has loaded. There is no server, no account, and no sign-in. It was built for a Florence-based summer trip, so the train routes and day trips follow that itinerary, but the phrases and cultural tips are useful to anyone traveling in Italy.

## What's inside

The app has four tabs along the bottom.

### Cards

177 travel phrases you will actually use, grouped into Greetings, Getting Around, Eat & Shop, and Time & Numbers, plus a Custom category for your own. Tap a card to flip between Italian and English, tap the speaker to hear it, and mark "Lo so!" once you know it. Shuffle runs through the whole deck before any card comes back around, so nothing repeats until you have seen the rest.

### Culture

46 short, practical tips for blending in and avoiding tourist traps, sorted into Etiquette, Hassle-avoidance, Insider knowledge, and Practical. Each tip leads with the advice and pairs it with a relevant Italian phrase you can tap to hear. A search box finds a tip by keyword when you remember the gist but not the title.

### Trains

A tap-through guide to the trip's train days: arriving into Italy, the run to Florence, day trips to Bologna, Viareggio, and Venice, then the overnight move to Milan and the flight home. Each route opens to travel times, platforms, connection notes, seat tips, and a plain-language reference for buying and validating tickets.

### Cities

An illustrated day-trip guide to nine cities within reach of Florence: Florence, Bologna, Prato, Viareggio, Venice, Milan, Verona, Rome, and San Gimignano. Each city covers food and drink, music, art, nightlife, offbeat sights, honest downsides, and insider tips, in the same order every time so you learn where to look. Cities with a covered train route link straight to it, and every route page links back to its city guide.

### Your own cards

Tap the + button on the Cards tab to add your own flashcards with the Italian, the English, and a pronunciation guide. They save on your device and drop straight into the deck.

## Highlights

- **Fully offline.** Everything is baked into one file. After the first load, it needs no connection.
- **Real navigation.** Every screen has its own history entry, so your phone's back gesture moves between screens instead of closing the app, and routes like `#trains/bologna` can be shared as links.
- **Installable.** Add it to your home screen and it opens full-screen like a native app.
- **Real pronunciation.** Audio comes from your device's built-in Italian voice, so it works offline too.
- **Dark mode**, synced across every tab.
- **Progress that sticks.** The cards you know, your custom cards, and your settings are saved in your browser.
- **Private by design.** Nothing is tracked and nothing leaves your device.

## Built with

Plain HTML, CSS, and JavaScript in a single file. A small service worker caches the app so it loads with no network, and a web manifest lets it install to a home screen.

## Development

`tests/note-layout-check.mjs` is a dev-only regression check — it is not part of the deployed app and nothing in the app references it. It renders every flashcard's cultural note on both answer faces (the Italian face, with phrase + pronunciation + note, is the tallest case) across several viewport sizes and fails if any note is clipped. Run it after any card-layout change: `node tests/note-layout-check.mjs` (requires Node 18+ and Playwright with Chromium; set `CHROMIUM_PATH` to point at an existing Chromium build).
