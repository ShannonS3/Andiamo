# Andiamo! — Project Requirements

Version 1.0. This document specifies the requirements for **Andiamo!**, an offline Italian travel companion. It describes what the app is, what it must do, and the qualities it must have. It reflects the app as built and is meant to guide future changes.

---

## 1. Overview

### 1.1 Purpose

Andiamo! helps a traveler prepare for and get around Italy. It combines a phrase flashcard trainer, a set of practical cultural tips, and two trip guides (trains and day trips) in a single app that works with no internet connection.

### 1.2 Goals

- Give the user a fast, low-friction way to learn and recall useful travel Italian.
- Provide cultural guidance that helps the user avoid common tourist mistakes.
- Put trip logistics (train routes, day-trip options) in the same place as the language material.
- Work anywhere, including on a plane or in a foreign country with no data plan.
- Require nothing to run: no server, no account, no install beyond adding a bookmark.

### 1.3 Non-goals

- Not a full language course or grammar tutor.
- Not a live translator, dictionary lookup, or AI chat.
- Not a multi-user or cloud-synced product. Progress lives on one device.
- Not a booking tool. Train and trip content is reference only.

---

## 2. Users and Context

- **Primary user:** an English-speaking traveler visiting Italy, using the app on a phone.
- **Usage context:** often offline (in transit, abroad), one-handed, in short sessions, sometimes in bright sun or a dark train car.
- **Technical assumption:** the user can open a web link once on wifi and add it to their home screen.

---

## 3. Scope

**In scope:** flashcards, cultural tips, a train guide, a day-trip guide, a custom-card creator, offline operation, and home-screen installation.

**Out of scope:** server-side features, accounts, analytics, notifications, in-app purchases, and any content that requires a network call at runtime.

---

## 4. Functional Requirements

### 4.1 Application shell and navigation

- **FR-1.1** The app must present four sections reachable from a fixed bottom navigation bar: **Cards, Culture, Trains, Cities**. The custom-card creator must be reachable from a + control on the Cards section and must offer a way back to the cards.
- **FR-1.2** Selecting a section must show that section and hide the others without a page reload.
- **FR-1.3** A header must show the app name (**Andiamo!**) and a dark-mode toggle on every section.
- **FR-1.4** The dark-mode toggle must switch the whole app between light and dark themes, and the choice must persist across sessions.
- **FR-1.5** The interface must be laid out for a phone-width screen and remain usable up to a centered maximum width on larger screens.
- **FR-1.6** Every screen (tab, train route detail, city) must map to a URL hash route so the browser's history drives navigation: the device back gesture or back button must move backward through screens instead of exiting the app, and hash links (e.g. `#trains/bologna`) must deep-link. Tapping the Trains tab while a route detail is open must return to the route list.

### 4.2 Flashcards (Cards tab)

- **FR-2.1** The app must ship with a fixed set of travel phrase cards (currently 177) across the categories **Greetings, Getting Around, Eat & Shop, Time & Numbers**, plus a **Custom** category for user-created cards.
- **FR-2.2** Each card must show an Italian phrase, its English meaning, and a pronunciation guide.
- **FR-2.3** A card must flip between its Italian and English sides on tap, and via the space or enter key when focused.
- **FR-2.4** The user must be able to filter the deck by category using a row of category pills, plus an "All" option.
- **FR-2.5** The app must play the Italian pronunciation on demand from a speaker control, and optionally auto-play it when the Italian side is shown. Audio must use the device's built-in Italian speech voice.
- **FR-2.6** A settings panel must offer: **English side first**, **Auto-play audio**, **Show cultural notes**, and a **speed** control (0.5x to 1.5x). All settings must persist.
- **FR-2.7** A card may carry a cultural note. When notes are enabled, the note must appear only on the answer side (the side revealed after flipping), so it never gives away the card being tested.
- **FR-2.8** A "Lo so!" (I know it) control must mark the current card as known and remove it from the active deck. Known status must persist.
- **FR-2.9** A progress indicator must show how many cards are known out of the total.
- **FR-2.10** Shuffle must present every card in the current deck once before any card repeats (a round). Mastering a card mid-round must not reshuffle the remaining cards. Each new round must be reshuffled, and the same card must never appear twice in a row unless it is the only card left.
- **FR-2.11** A reset control must clear known-status for the current category, or for the whole deck when "All" is selected, and must ask for confirmation first.
- **FR-2.12** When every card in the current filter is known, the app must show a completion state with per-category progress and reset options.

### 4.3 Culture tab

- **FR-3.1** The app must ship with a fixed set of cultural tips (currently 46), each assigned to one of four topics: **Etiquette, Hassle-avoidance, Insider knowledge, Practical**.
- **FR-3.2** Each tip must lead with its advice, and most must include a relevant Italian phrase with a pronunciation guide and a speaker control.
- **FR-3.3** The user must be able to filter tips by topic using pills, plus an "All" option.
- **FR-3.4** A keyword search must filter tips live across their title, body, and phrase, show a result count, and show a clear "no matches" message when nothing is found. Typing must not lose keyboard focus.
- **FR-3.5** A "Got it" control on each tip must dismiss it from the list, and dismissed status must persist.
- **FR-3.6** A reset control must restore dismissed tips for the current topic (or all), consistent in look with the Cards reset.

### 4.4 Trains tab

- **FR-4.1** The Trains section must present a list of the trip's train legs (arrival, the run to Florence, day trips, the overnight move to Milan, and the flight home).
- **FR-4.2** Selecting a route must open a detail view with its travel times, platforms or connections, seat tips, and any service alerts, and must offer a way back to the list. The route header bar (back control + route name) must stay pinned below the app header while the detail scrolls. Each route that ends in a city covered by the Cities guide must include a City guide link card that jumps to that city's section.
- **FR-4.3** The section must include a general rail reference (buying, validating, and the difference between high-speed and regional tickets).
- **FR-4.4** All train content must be static reference material and must not require a network call.

### 4.5 Cities tab

- **FR-5.1** The Cities section must present a day-trip guide covering nine cities within reach of Florence.
- **FR-5.2** Each city must cover its highlights as a series of category cards. The canonical category order is: **Known For, Food & Drink, Music, Nightlife, Art, Gay Culture, Performance, Offbeat Attractions, Historical Sites, Downsides, Insider Tips**. A city may omit categories it has nothing for, and may insert a city-specific feature or warning card, but the categories it does include must appear in this order so readers learn where to find things.
- **FR-5.3** A jump navigation must let the user move quickly to any city.
- **FR-5.5** City sections whose route is covered by the Trains guide (Bologna, Viareggio, Venice, Milan) must link their train badge to that route's detail page, and the back gesture from that route must return the user to their place in the Cities page.
- **FR-5.6** Tappable train badges must be visually distinct from static travel-time notes: linked badges are solid pills with a "route →" suffix; static badges are quiet outline text. Train badges must not display ticket prices, which change too often to be reliable reference material.
- **FR-5.7** A back-to-top control must appear on the Cities page after roughly 1.5 screens of scrolling and smooth-scroll the user back to the top. It must not appear on other tabs.
- **FR-5.4** All trip content must be static reference material and must not require a network call.

### 4.6 Custom card creator (via Cards)

- **FR-6.1** The user must be able to add a card by entering an Italian phrase, an English meaning, an optional pronunciation guide, and a category.
- **FR-6.2** Custom cards must persist on the device and must appear in the flashcard deck under their category.
- **FR-6.3** The user must be able to delete a custom card, which must also clear any known-status for it.

---

## 5. Non-Functional Requirements

### 5.1 Offline and installability

- **NFR-1.1** After its first load, the app must run fully offline, including all sections and audio.
- **NFR-1.2** The app must be installable to a phone home screen and open full-screen, via a web app manifest.
- **NFR-1.3** A service worker must cache the app on first load and serve it from cache thereafter.
- **NFR-1.4** The app must make no network requests at runtime and must reference no external scripts, styles, fonts, or images.
- **NFR-1.5** The cache must be versioned so that redeploying updated files refreshes an already-installed copy.

### 5.2 Privacy and data handling

- **NFR-2.1** The app must not track the user or send any data off the device.
- **NFR-2.2** All user state (known cards, custom cards, dismissed tips, settings, theme) must be stored only in the browser's local storage.

### 5.3 Performance

- **NFR-3.1** The app must load and become interactive quickly from cache, with no build step or runtime dependencies.
- **NFR-3.2** Navigation between sections and cards must feel immediate.

### 5.4 Compatibility

- **NFR-4.1** The app must work in current versions of major mobile and desktop browsers, with a primary target of iOS Safari.
- **NFR-4.2** Audio must degrade gracefully: if the device has no Italian speech voice, the app must still work without it.

### 5.5 Accessibility

- **NFR-5.1** Interactive controls must have accessible labels, and the flashcard must be operable by keyboard.
- **NFR-5.2** Tap targets must be large enough for comfortable one-handed use, and text must remain readable in light and dark themes.

### 5.6 Maintainability and deployment

- **NFR-6.1** The app must be a single self-contained HTML file plus a manifest, a service worker, and icons, deployable as static files.
- **NFR-6.2** Asset paths must be relative so the app works when served from a subfolder (for example, a GitHub Pages project site).
- **NFR-6.3** The content (cards and tips) must be held as structured data within the app so it can be edited without touching layout or logic.

---

## 6. Data Requirements

### 6.1 Flashcard

Each card has: a unique id, the Italian phrase, the English meaning, a pronunciation guide, a category, and an optional per-card cultural note. User-created cards are flagged as custom.

### 6.2 Culture tip

Each tip has: a unique id, a title, an emoji, a topic, the advice body, and (for most) an Italian phrase with its pronunciation and English meaning.

### 6.3 Local storage

The app persists, per device: known cards, dismissed tips, custom cards, selected category, and settings (English-first, auto-play, show notes, speech rate, dark mode).

---

## 7. Constraints and Assumptions

- The app is delivered as static files and cannot run server code.
- Offline audio depends on the device having an Italian text-to-speech voice, which iOS and most desktops provide by default.
- Progress does not sync between devices. The user picks one device for the trip.
- The train and day-trip content is tailored to a specific Florence-based itinerary and is not a general routing engine.

---

## 8. Acceptance Criteria

The app is considered complete when:

- All sections load and work with the device in airplane mode after a first online load.
- A full round of shuffled cards shows every card once before any repeat, and mastering cards mid-round does not cause early repeats.
- Known cards, custom cards, dismissed tips, and settings survive closing and reopening the app.
- Cultural notes never appear on the prompt side of a card.
- Cultural notes render fully — no clipping or truncation — on **both** answer faces (the Italian face stacks phrase + pronunciation + note and is the tallest case, shown to users with "English side first" enabled), at viewports down to 320×568 and in short windows (~560px tall). `tests/note-layout-check.mjs` verifies this automatically and must pass after any card-layout change.
- The app makes zero network requests at runtime, confirmed by inspection.
- The app installs to a phone home screen and opens full-screen.
