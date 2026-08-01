import { parseScore, shareBlurbs } from './_blurbs'

export const config = { runtime: 'edge' }

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export default function handler(req: Request) {
  const url = new URL(req.url)
  const score = parseScore(url.searchParams.get('score'))
  if (score === null) {
    return new Response('Not found', { status: 404 })
  }

  const base = url.origin
  const title = `Wine Snob Score: ${score}/10`
  const description = shareBlurbs[score]
  const image = `${base}/api/og?score=${score}`
  const shareUrl = `${base}/share/${score}`
  const appUrl = `${base}/?score=${score}`

  const html = `<!doctype html>
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
</html>`

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
