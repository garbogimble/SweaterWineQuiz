import { ImageResponse } from '@vercel/og'
import { parseScore, shareBlurbs } from './_blurbs'

export const config = { runtime: 'edge' }

export default async function handler(req: Request) {
  const url = new URL(req.url)
  const score = parseScore(url.searchParams.get('score'))
  if (score === null) {
    return new Response('Not found', { status: 404 })
  }

  const portrait = `${url.origin}/portraits/c${score}.png`
  const blurb = shareBlurbs[score]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(180deg, #1a3228 0%, #0c1612 100%)',
          color: '#f2efe6',
          padding: '48px 56px',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            border: '1px solid rgba(201, 168, 76, 0.35)',
            padding: '36px',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <img
            src={portrait}
            width={420}
            height={420}
            alt=""
            style={{
              width: 420,
              height: 420,
              objectFit: 'cover',
              borderRadius: 4,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              gap: 18,
            }}
          >
            <div
              style={{
                fontSize: 22,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#c9a84c',
              }}
            >
              Wine Snob Score
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                lineHeight: 1.05,
                color: '#f2efe6',
              }}
            >
              {score}
              <span style={{ color: '#e0c97a' }}>/10</span>
            </div>
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.35,
                color: '#a8b5ad',
                maxWidth: 520,
              }}
            >
              {blurb}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    },
  )
}
