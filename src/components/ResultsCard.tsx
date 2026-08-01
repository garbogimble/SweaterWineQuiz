import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { blurbs, portraitForScore } from '../data/questions'

type ResultsCardProps = {
  score: number
  fromShareLink?: boolean
  onRetake: () => void
}

export function ResultsCard({
  score,
  fromShareLink = false,
  onRetake,
}: ResultsCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [toast, setToast] = useState('')
  const portrait = portraitForScore(score)
  const blurb = blurbs[score] ?? blurbs[0]

  if (score === 0) {
    return (
      <section className="results results-zero">
        <h1 className="brand">Not quite</h1>
        <p className="lede">
          Zero correct — the cellar stays locked. Try again and earn a Wine Snob
          Score.
        </p>
        <div className="btn-row results-actions">
          <button type="button" className="btn btn-primary" onClick={onRetake}>
            Try again
          </button>
        </div>
      </section>
    )
  }

  async function copyShareLink() {
    const url = new URL(window.location.href)
    url.search = ''
    url.searchParams.set('score', String(score))
    try {
      await navigator.clipboard.writeText(url.toString())
      setToast('Share link copied — invite a friend to take the quiz.')
    } catch {
      setToast(url.toString())
    }
  }

  async function downloadCard() {
    if (!cardRef.current) return
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#0c1612',
      })
      const link = document.createElement('a')
      link.download = `wine-snob-score-${score}.png`
      link.href = dataUrl
      link.click()
      setToast('Card downloaded.')
    } catch {
      setToast('Could not download the card. Try a screenshot instead.')
    }
  }

  return (
    <section className="results">
      <div className="share-card" ref={cardRef}>
        <p className="share-card-brand">Wine Snob Score</p>
        <div className="share-card-image-wrap">
          {portrait ? (
            <img
              src={portrait}
              alt={`Wine snob level ${score} portrait`}
              width={640}
              height={640}
            />
          ) : null}
        </div>
        <h2 className="share-card-score">
          Wine Snob Score: <span>{score}/10</span>
        </h2>
        <p className="share-card-blurb">{blurb}</p>
      </div>

      <div className="btn-row results-actions">
        <button type="button" className="btn btn-primary" onClick={copyShareLink}>
          Copy share link
        </button>
        <button type="button" className="btn btn-secondary" onClick={downloadCard}>
          Download card
        </button>
        <button type="button" className="btn btn-secondary" onClick={onRetake}>
          {fromShareLink ? 'Take the quiz' : 'Take again'}
        </button>
      </div>
      <p className="share-toast" role="status">
        {toast}
      </p>
    </section>
  )
}
