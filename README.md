# Wine Snob Score

Interactive wine quiz with 10 multiple-choice questions. Your score (0–10) maps to a Wine Snob portrait and shareable result card.

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Use the default settings:
   - **Framework:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`

No environment variables are required.

## Share links

Shareable result links use `/share/:score` (e.g. `/share/7`). Static HTML pages include Open Graph / Twitter Card meta tags pointing at prebuilt card images in `/og/score-N.png`, so X, iMessage, and other previews can show a thumbnail. Humans are redirected into the app result view.

Generate/update those assets with:

```bash
npm run generate:share
```
