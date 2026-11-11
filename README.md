# 🐮 Fill in the Blank

Offline-first fill-in-the-blank practice for **Myanmar ESL students (Grade 5, ages 10-12)**.
Teachers write exercises in Excel or Google Sheets, students tap or drag answer blocks into numbered blanks.
It is the first activity of a family of practice apps (Flash Card, Multiple Choice, Writing, Sentence Builder).

- Single page app, installable **PWA**, hosted on **GitHub Pages**
- **Vanilla HTML/CSS/JS**: no framework, no build step, no CDN, zero external requests
- Works from **file://** too (without the Service Worker)
- **EN / မြန်မာ** interface, bundled Noto Sans Myanmar font, Zawgyi warning
- Import **.csv, .xlsx (every sheet = one set), .zip** · validation report per row
- Tap-to-fill, drag & drop (mouse, touch, pen), Undo, Shuffle, Hint, Teacher PIN, Read Aloud
- "Check at the end" or "Instant" feedback · stars · Try Again / Restart · results export (.csv)

## Quick start

1. Download the repository (or the release zip) and open `index.html` in Chrome, Edge, Firefox or Safari.
2. Two built-in sets load on first launch: **My Daily Routine** (30-blank test fixture) and **School Life (Grade 5)**.
3. Tap **Guide** for the file format, templates and samples.

## Folder structure

```
index.html               App (inline CSS + JS)
sw.js                    Service Worker (VERSION = 'fib-v1.0.0')
manifest.webmanifest     PWA manifest
.nojekyll                Tell GitHub Pages to serve files as-is
icons/                   icon.svg + PNG icons (192, 512, maskable, apple-touch, favicon)
fonts/                   Noto Sans Myanmar subset (woff2, OFL)
vendor/                  Third-party libraries (download, see below)
samples/sample.csv       Example exercises
tools/icon-maker.html    Re-render PNG icons from an SVG in the browser
docs/FILE_FORMAT.md      Full file format reference (English)
docs/FILE_FORMAT.my.md   File format guide (Myanmar)
docs/SETUP.my.md         Setup and deploy guide (Myanmar)
```

## Vendor libraries (download once)

The app never loads code from the internet. Put these files in `/vendor`:

| Target path | Library | Version | Download |
|---|---|---|---|
| `vendor/xlsx.full.min.js` | SheetJS CE | 0.20.3 | https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js |
| `vendor/jszip.min.js` | JSZip | 3.10.1 | https://github.com/Stuk/jszip/releases/tag/v3.10.1 (`dist/jszip.min.js`) |
| `vendor/katex/katex.min.js`, `katex.min.css`, `fonts/` | KaTeX | 0.16.11 | https://github.com/KaTeX/KaTeX/releases/tag/v0.16.11 (`katex.tar.gz`) |

Without them the app still runs: CSV import works, .xlsx/.zip show a notice, math shows as plain TeX.

## Deploy to GitHub Pages

1. Create a public repository, e.g. `fill-in-the-blank`, and upload all files (keep the folders).
2. **Settings > Pages > Build and deployment > Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Open `https://<user>.github.io/fill-in-the-blank/`. All paths are relative, so sub-paths work.
4. Wait for "Ready to work offline", then the app works in airplane mode.

**Releasing an update:** change files, then bump `const VERSION` in `sw.js` (e.g. `fib-v1.0.1`).
Students see "Update available - Reload".

## File format (short)

```csv
id,title,instruction,paragraph,answers,distractors,hint,explanation
ex1,My Morning,Choose the correct words.,"I ___(1)___ at 6.00. I ___(2)___ my teeth.",get up~wake up|brush,sleep|swim,Think about your morning.,We use the **present simple**.
```

- Blanks: `___(1)___`, `(2)`, `(3)___`, `(4)***`, `__(5)__`, `{{6}}`, `______` (auto-numbered). `\(7)` is literal text.
- Answers: ordered `a|b|c`, numbered `2=b|1=a`, or columns `answer1, answer2, ...`. Alternatives with `~`.
- Rich text: `**bold**`, `*italic*`, `++underline++`, `<b> <i> <u>`, `\n`, pipe tables, `$math$`.

Full reference: [docs/FILE_FORMAT.md](docs/FILE_FORMAT.md).

## Architecture

One file, clearly separated modules: `util · i18n · store · settings · csv · zawgyi · answers · blankParser · richText · math · registry · importer · sound · speech · activity:fill_blank · ui · guide · pwa · boot`.

Activities register themselves:

```js
registerActivity({
  type: 'fill_blank', label: 'Fill in the Blank',
  parseRow(row, rowNum) { /* -> { exercise, errors:[{k,p}], warnings:[...] } */ },
  render(ctx)           { /* ctx: mount, exercise, state, save, announce, gate, onResult -> controller */ },
  check(exercise, state) { /* -> number correct */ },
  reset(exercise)        { /* -> fresh state */ }
});
```

Extension points: rows with `type` = `flashcard`, `mcq`, `writing`, `sentence_builder`, `typing` are routed to the
matching activity once registered (unknown types are reported and skipped). `typing` can reuse `answers[n]`
alternatives. `image`, `audio`, `model3d` columns are parsed and stored; zip media files are kept in IndexedDB
(`assets` store, by `assetGroup`) for future players.

Storage: IndexedDB (`sets`, `progress`, `assets`) → localStorage → memory (with a "progress won't be saved" notice).
Uploaded text is never inserted as HTML; the renderer builds DOM with `createElement` / `textContent`.

## Privacy

Everything stays on the device. No analytics, no accounts, no network requests.
The Teacher PIN is a classroom convenience lock, not a security feature.

## License

MIT (see `LICENSE`). Fonts: SIL OFL 1.1. Vendor libraries keep their own licenses.

---

## မြန်မာ အတိုချုပ်

**Fill in the Blank** သည် Grade 5 ကျောင်းသားများအတွက် အင်တာနက်မလိုဘဲ သုံးနိုင်သော ကွက်လပ်ဖြည့် လေ့ကျင့်ခန်း app ဖြစ်ပါသည်။

- ဆရာ/ဆရာမများက Excel သို့မဟုတ် Google Sheets တွင် လေ့ကျင့်ခန်း ရေးပြီး **.csv / .xlsx / .zip** အဖြစ် ထည့်နိုင်သည်။
- ကျောင်းသားများက အဖြေတုံးကို နှိပ်၍ သို့မဟုတ် ဆွဲ၍ ကွက်လပ်ထဲ ထည့်ရသည်။
- ဖုန်း၊ tablet၊ ကွန်ပျူတာ၊ projector အားလုံးတွင် သုံးနိုင်ပြီး ဖုန်းတွင် app အဖြစ် install လုပ်နိုင်သည်။
- အသေးစိတ် - [docs/SETUP.my.md](docs/SETUP.my.md) (တင်နည်း) နှင့် [docs/FILE_FORMAT.my.md](docs/FILE_FORMAT.my.md) (ဖိုင်ပုံစံ)။
