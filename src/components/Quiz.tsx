import { useState } from 'react'
import { questions } from '../data/questions'
import { fireWineBottleConfetti } from '../lib/confetti'

type QuizProps = {
  onComplete: (score: number) => void
}

function scoreFromAnswers(answers: Array<number | null>) {
  return answers.reduce<number>((total, answer, i) => {
    if (answer === null) return total
    return answer === questions[i].correctIndex ? total + 1 : total
  }, 0)
}

export function Quiz({ onComplete }: QuizProps) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Array<number | null>>(() =>
    Array.from({ length: questions.length }, () => null),
  )

  const question = questions[index]
  const total = questions.length
  const selected = answers[index]
  const answered = selected !== null
  const isCorrect = answered && selected === question.correctIndex
  const score = scoreFromAnswers(answers)

  function handleChoice(choiceIndex: number) {
    if (answered) return

    const nextAnswers = answers.map((answer, i) =>
      i === index ? choiceIndex : answer,
    )
    setAnswers(nextAnswers)

    if (choiceIndex === question.correctIndex) {
      fireWineBottleConfetti()
    }
  }

  function handleNext() {
    if (index + 1 >= total) {
      onComplete(scoreFromAnswers(answers))
      return
    }
    setIndex((i) => i + 1)
  }

  return (
    <section className="quiz">
      <div className="quiz-progress">
        <span>
          Question <strong>{index + 1}</strong> of {total}
        </span>
        <span>Score {score}</span>
      </div>
      <div className="progress-track" aria-hidden="true">
        <div
          className="progress-fill"
          style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <h2 className="quiz-prompt">{question.prompt}</h2>

      <ul className="choices">
        {question.choices.map((choice, i) => {
          let className = 'choice'
          if (answered) {
            if (i === question.correctIndex) {
              className += selected === i ? ' correct' : ' reveal-correct'
            } else if (i === selected) {
              className += ' wrong'
            }
          }
          return (
            <li key={`${question.id}-${i}`}>
              <button
                type="button"
                className={className}
                disabled={answered}
                onClick={() => handleChoice(i)}
              >
                {choice}
              </button>
            </li>
          )
        })}
      </ul>

      {answered && (
        <>
          <p className={`feedback ${isCorrect ? 'ok' : 'no'}`}>
            {isCorrect
              ? 'Correct — pour one out for the uninitiated.'
              : `Not quite. The answer is “${question.choices[question.correctIndex]}”.`}
          </p>
          <button type="button" className="btn btn-primary" onClick={handleNext}>
            {index + 1 >= total ? 'See your Wine Snob Score' : 'Next question'}
          </button>
        </>
      )}
    </section>
  )
}
