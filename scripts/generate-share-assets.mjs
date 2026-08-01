import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const siteUrl = process.env.SITE_URL || 'https://winesnob-quiz.vercel.app'

const blurbs = {
  1: 'You once held a glass correctly. The sweater has begun.',
  2: 'You can tell red from white. Dangerous knowledge.',
  3: 'You order by the glass with mild confidence. Respectable.',
  4: 'You know a region or two. Friends have started nodding along.',
  5: 'Halfway to unbearable. The turtleneck is rising.',
  6: 'You correct pronunciations gently. They notice.',
  7: 'You swirl before you sip. The room adjusts.',
  8: 'You speak in appellations. Ordinary wine lists fear you.',
  9: 'Nearly peak snob. Only one wrong answer stands between you and the collar.',
  10: 'Ultimate wine snob. The sweater has achieved liftoff. Bow before you.',
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function wrapText(text, maxChars) {
  const words = text.split(' ')
  const lines = []
  let current = ''
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars) {
      if (current) lines.push(current)
      current = word
    } else {
      current = next
    }
  }
  if (current) lines.push(current)
  return lines.slice(0, 4)
}

async function makeOgImage(score) {
  const portraitPath = path.join(root, 'public', 'portraits', `c${score}.png`)
  const portrait = await sharp(portraitPath)
    .resize(420, 420, { fit: 'cover' })
    .png()
    .toBuffer()

  const lines = wrapText(blurbs[score], 34)
  const blurbSvg = lines
    .map(
      (line, i) =>
        `<text x="520" y="${330 + i * 36}" fill="#a8b5ad" font-size="26" font-family="Georgia, serif">${escapeHtml(line)}</text>`,
    )
    .join('')

  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a3228"/>
          <stop offset="100%" stop-color="#0c1612"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect x="40" y="40" width="1120" height="550" fill="none" stroke="rgba(201,168,76,0.35)" stroke-width="2"/>
      <text x="520" y="170" fill="#c9a84c" font-size="22" letter-spacing="6" font-family="Georgia, serif">WINE SNOB SCORE</text>
      <text x="520" y="270" fill="#f2efe6" font-size="84" font-weight="700" font-family="Georgia, serif">${score}<tspan fill="#e0c97a">/10</tspan></text>
      ${blurbSvg}
    </svg>
  `

  const outPath = path.join(root, 'public', 'og', `score-${score}.png`)
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: '#0c1612',
    },
  })
    .composite([
      { input: Buffer.from(svg), top: 0, left: 0 },
      { input: portrait, top: 105, left: 80 },
    ])
    .png()
    .toFile(outPath)
}

function shareHtml(score) {
  const title = `Wine Snob Score: ${score}/10`
  const description = blurbs[score]
  const shareUrl = `${siteUrl}/share/${score}`
  const image = `${siteUrl}/og/score-${score}.png`
  const appUrl = `${siteUrl}/?score=${score}`

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(shareUrl)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Wine Snob Score" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(shareUrl)}" />
  <meta property="og:image" content="${escapeHtml(image)}" />
  <meta property="og:image:secure_url" content="${escapeHtml(image)}" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${escapeHtml(title)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(image)}" />
</head>
<body style="margin:0;font-family:system-ui,sans-serif;background:#0c1612;color:#f2efe6;min-height:100vh;display:grid;place-items:center;">
  <main style="text-align:center;padding:2rem;">
    <p style="letter-spacing:.18em;text-transform:uppercase;color:#c9a84c;">Wine Snob Score</p>
    <h1 style="font-size:2rem;margin:.5rem 0;">${score}/10</h1>
    <p style="color:#a8b5ad;max-width:28rem;">${escapeHtml(description)}</p>
    <p><a href="${escapeHtml(appUrl)}" style="color:#e0c97a;">Open result</a></p>
  </main>
  <script>window.location.replace(${JSON.stringify(appUrl)})</script>
</body>
</html>
`
}

await mkdir(path.join(root, 'public', 'og'), { recursive: true })
await mkdir(path.join(root, 'public', 'share'), { recursive: true })

for (let score = 1; score <= 10; score += 1) {
  await makeOgImage(score)
  await writeFile(
    path.join(root, 'public', 'share', `${score}.html`),
    shareHtml(score),
    'utf8',
  )
  console.log(`generated share assets for score ${score}`)
}
