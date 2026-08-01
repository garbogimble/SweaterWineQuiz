import { useEffect, useState } from 'react'
import { LandingBottle } from './components/LandingBottle'
import { Quiz } from './components/Quiz'
import { ResultsCard } from './components/ResultsCard'

type Screen = 'landing' | 'quiz' | 'results'

function parseScoreParam(): number | null {
  const raw = new URLSearchParams(window.location.search).get('score')
  if (raw === null) return null
  const n = Number(raw)
  if (!Number.isInteger(n) || n < 0 || n > 10) return null
  return n
}

function clearScoreParam() {
  const url = new URL(window.location.href)
  url.searchParams.delete('score')
  window.history.replaceState({}, '', url.pathname)
}

export default function App() {
  const shared = parseScoreParam()
  const [screen, setScreen] = useState<Screen>(
    shared !== null ? 'results' : 'landing',
  )
  const [score, setScore] = useState(shared ?? 0)
  const [fromShareLink, setFromShareLink] = useState(shared !== null)

  useEffect(() => {
    document.title =
      screen === 'results'
        ? `Wine Snob Score: ${score}/10`
        : 'Wine Snob Score'
  }, [screen, score])

  function startQuiz() {
    clearScoreParam()
    setFromShareLink(false)
    setScore(0)
    setScreen('quiz')
  }

  function finishQuiz(finalScore: number) {
    setScore(finalScore)
    setFromShareLink(false)
    setScreen('results')
    if (finalScore > 0) {
      const url = new URL(window.location.href)
      url.searchParams.set('score', String(finalScore))
      window.history.replaceState({}, '', `${url.pathname}?score=${finalScore}`)
    } else {
      clearScoreParam()
    }
  }

  function retake() {
    clearScoreParam()
    setFromShareLink(false)
    setScore(0)
    setScreen('landing')
  }

  return (
    <div className="app-shell">
      {screen === 'landing' && <LandingBottle onStart={startQuiz} />}
      {screen === 'quiz' && <Quiz onComplete={finishQuiz} />}
      {screen === 'results' && (
        <ResultsCard
          score={score}
          fromShareLink={fromShareLink}
          onRetake={retake}
        />
      )}
    </div>
  )
}
