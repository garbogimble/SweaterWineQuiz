import { useEffect, useState } from 'react'
import { LandingBottle } from './components/LandingBottle'
import { Quiz } from './components/Quiz'
import { ResultsCard } from './components/ResultsCard'
import { parseSharedScore, sharePathForScore } from './lib/share'

type Screen = 'landing' | 'quiz' | 'results'

function clearShareFromUrl() {
  window.history.replaceState({}, '', '/')
}

export default function App() {
  const shared = parseSharedScore(window.location.pathname, window.location.search)
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
    clearShareFromUrl()
    setFromShareLink(false)
    setScore(0)
    setScreen('quiz')
  }

  function finishQuiz(finalScore: number) {
    setScore(finalScore)
    setFromShareLink(false)
    setScreen('results')
    if (finalScore > 0) {
      window.history.replaceState({}, '', sharePathForScore(finalScore))
    } else {
      clearShareFromUrl()
    }
  }

  function retake() {
    clearShareFromUrl()
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
