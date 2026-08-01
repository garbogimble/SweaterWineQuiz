import type { VercelRequest, VercelResponse } from '@vercel/node'
import shareMeta from '../share-meta.json'

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const score = Number(req.query.score)
  if (!Number.isInteger(score) || score < 1 || score > 10) {
    res.status(404).send('Not found')
    return
  }

  const host = req.headers['x-forwarded-host'] ?? req.headers.host ?? 'localhost'
  const proto = req.headers['x-forwarded-proto'] ?? 'https'
  const base = `${proto}://${host}`
  const title = `Wine Snob Score: ${score}/10`
  const description =
    shareMeta.blurbs[String(score) as keyof typeof shareMeta.blurbs] ??
    'Take the Wine Snob Quiz and discover your score.'
  const image = `${base}/portraits/c${score}.png`
  const shareUrl = `${base}/share/${score}`
  const appUrl = `${base}/?score=${score}`

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${shareUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Wine Snob Score" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${shareUrl}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:width" content="640" />
  <meta property="og:image:height" content="640" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${image}" />
  <meta http-equiv="refresh" content="0;url=${appUrl}" />
</head>
<body>
  <p><a href="${appUrl}">View Wine Snob Score ${score}/10</a></p>
  <script>window.location.replace(${JSON.stringify(appUrl)})</script>
</body>
</html>`

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600')
  res.status(200).send(html)
}
