const TWEET_URL = 'https://x.com/chamath/status/2020993554013880639'

const TWEET_TEXT =
  'Everyone I know that smokes pot has or is becoming an idiot, deranged, neurotic, psychotic or all of the above.\n\nNot a single one is normal.\n\nCan’t say the same for alcohol.'

type LandingBottleProps = {
  onStart: () => void
}

export function LandingBottle({ onStart }: LandingBottleProps) {
  return (
    <section className="landing">
      <h1 className="brand">Wine Snob Score</h1>
      <p className="lede">
        Ten questions. Rising difficulty. One sweater that grows with your
        ego.
      </p>

      <div className="bottle-stage">
        <div
          className="bottle"
          role="img"
          aria-label="Wine bottle featuring a Chamath tweet on the label"
        >
          <div className="bottle-foil" aria-hidden="true" />
          <div className="bottle-neck" aria-hidden="true" />
          <div className="bottle-shoulder" aria-hidden="true" />
          <div className="bottle-body">
            <div className="bottle-wine" aria-hidden="true" />
            <a
              className="bottle-label"
              href={TWEET_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="label-brand">Estate Chamath</div>
              <p className="label-tweet">{TWEET_TEXT}</p>
              <div className="label-meta">@chamath · View on X</div>
            </a>
          </div>
        </div>
      </div>

      <button type="button" className="btn btn-primary" onClick={onStart}>
        Start Quiz
      </button>
    </section>
  )
}
