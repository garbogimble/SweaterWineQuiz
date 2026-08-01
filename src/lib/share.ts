export function parseSharedScore(pathname: string, search: string): number | null {
  const fromQuery = new URLSearchParams(search).get('score')
  if (fromQuery !== null) {
    const n = Number(fromQuery)
    if (Number.isInteger(n) && n >= 0 && n <= 10) return n
  }

  const match = pathname.match(/^\/share\/(\d+)\/?$/)
  if (match) {
    const n = Number(match[1])
    if (Number.isInteger(n) && n >= 1 && n <= 10) return n
  }

  return null
}

export function sharePathForScore(score: number) {
  return `/share/${score}`
}

export function shareUrlForScore(score: number) {
  return new URL(sharePathForScore(score), window.location.origin).toString()
}
