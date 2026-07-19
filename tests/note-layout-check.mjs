/**
 * Andiamo! — cultural-note layout regression check
 *
 * Renders EVERY card that carries a cultural note on BOTH answer faces
 * (English face: term + note; Italian face: term + phonetic + note — the
 * tallest stack, and what English-first users see after flipping), at a
 * range of viewport sizes including short windows like preview panes.
 *
 * A note fails if it is internally truncated (clamped text hidden) or if
 * it overflows into the card's footer area. Exit code 1 on any failure.
 *
 * Run:  node tests/note-layout-check.mjs [path-to-index.html]
 * Requires: node 18+, playwright or playwright-core with a Chromium build.
 */
import { pathToFileURL } from 'url';
import { resolve } from 'path';

let chromium;
try { ({ chromium } = await import('playwright-core')); }
catch { ({ chromium } = await import('playwright')); }

const indexPath = resolve(process.argv[2] || 'index.html');
const VIEWPORTS = [[390, 844], [320, 568], [900, 560], [768, 1024]];
const launchOpts = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};

const browser = await chromium.launch(launchOpts);
let failures = 0;

for (const [w, h] of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(pathToFileURL(indexPath).href);
  const result = await page.evaluate(() => {
    const bad = [];
    const noted = DATA.SEED_CARDS.filter((c) => c.note);
    const faces = [
      ['english', (c) => faceEnglish(c, true)],
      ['italian', (c) => faceItalian(c, true)], // english-first mode: Italian is the answer side
    ];
    for (const card of noted) {
      for (const [name, make] of faces) {
        const face = make(card);
        const host = document.createElement('div');
        host.style.cssText = 'position:fixed;top:0;left:0;right:0;padding:0 20px;';
        const fc = document.createElement('div');
        fc.className = 'flip-card';
        fc.style.position = 'relative';
        face.style.position = 'relative';
        fc.appendChild(face);
        host.appendChild(fc);
        document.body.appendChild(host);
        const n = face.querySelector('.note');
        const truncated = n.scrollHeight > n.clientHeight + 1;
        const faceR = face.getBoundingClientRect();
        const noteR = n.getBoundingClientRect();
        const overflows = noteR.bottom > faceR.bottom - 14;
        if (truncated || overflows) bad.push({ card: card.italian, face: name, truncated, overflows });
        document.body.removeChild(host);
      }
    }
    return { checked: noted.length * 2, bad };
  });
  console.log(`${w}x${h}: ${result.checked} face renders checked — failures: ${result.bad.length}`);
  result.bad.forEach((b) => console.log('   FAIL', JSON.stringify(b)));
  failures += result.bad.length;
  await page.close();
}

await browser.close();
if (failures) { console.error(`\n${failures} note layout failure(s).`); process.exit(1); }
console.log('\nAll notes render fully on both faces at every viewport.');
