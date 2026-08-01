const BOT =
  /bot|crawler|spider|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|telegrambot|whatsapp/i

export default function middleware(request: Request) {
  const url = new URL(request.url)
  if (url.pathname !== '/') return

  const score = url.searchParams.get('score')
  if (!score) return

  const ua = request.headers.get('user-agent') ?? ''
  if (!BOT.test(ua)) return

  const n = Number(score)
  if (!Number.isInteger(n) || n < 1 || n > 10) return

  return Response.redirect(new URL(`/share/${n}`, request.url), 302)
}

export const config = {
  matcher: '/',
}
