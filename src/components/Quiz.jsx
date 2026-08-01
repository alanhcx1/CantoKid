import { useMemo, useState } from 'react'
import { getLesson } from '../content/lessons'
import { saveLessonResult } from '../content/progress'
import { useSpeak } from '../hooks/useSpeak'
import Mascot from './Mascot'

function moodForScore(correct, total) {
  const ratio = correct / total
  if (ratio >= 1) return 'excited'
  if (ratio >= 0.5) return 'happy'
  return 'sad'
}

function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function buildQuestions(lesson) {
  return shuffle(lesson.words).map((answer) => {
    const distractors = shuffle(lesson.words.filter((w) => w.id !== answer.id)).slice(0, 3)
    return { answer, options: shuffle([answer, ...distractors]) }
  })
}

export default function Quiz({ lessonId, onFinish }) {
  const lesson = getLesson(lessonId)
  const questions = useMemo(() => buildQuestions(lesson), [lesson])
  const { speak } = useSpeak()
  const [step, setStep] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [selected, setSelected] = useState(null)
  const [done, setDone] = useState(false)

  const question = questions[step]

  function handlePick(option) {
    if (selected) return
    setSelected(option.id)
    if (option.id === question.answer.id) setCorrectCount((c) => c + 1)
  }

  function handleNext() {
    if (step + 1 < questions.length) {
      setStep((s) => s + 1)
      setSelected(null)
    } else {
      const stars = Math.round((correctCount / questions.length) * 3)
      saveLessonResult(lessonId, stars)
      setDone(true)
    }
  }

  if (done) {
    const stars = Math.round((correctCount / questions.length) * 3)
    return (
      <div className="screen quiz" style={{ '--lesson-color': lesson.color }}>
        <Mascot mood={moodForScore(correctCount, questions.length)} size={110} />
        <h2>{stars > 0 ? 'Great job!' : 'Nice try!'}</h2>
        <p className="results-score">
          {correctCount} / {questions.length} correct
        </p>
        <p className="results-stars">{'★'.repeat(stars)}{'☆'.repeat(3 - stars)}</p>
        <button className="big-button" onClick={() => onFinish(lessonId)}>
          Back to lessons
        </button>
      </div>
    )
  }

  return (
    <div className="screen quiz" style={{ '--lesson-color': lesson.color }}>
      <p className="progress-label">
        Question {step + 1} of {questions.length}
      </p>
      <h2>What did you hear?</h2>
      <button className="big-button listen-button" onClick={() => speak(question.answer.characters)}>
        🔊 Play again
      </button>

      <div className="quiz-options">
        {question.options.map((option) => {
          const isSelected = selected === option.id
          const isAnswer = option.id === question.answer.id
          const showResult = Boolean(selected)
          const className = [
            'quiz-option',
            showResult && isAnswer && 'correct',
            showResult && isSelected && !isAnswer && 'incorrect',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <button key={option.id} className={className} onClick={() => handlePick(option)} disabled={showResult}>
              <span className="option-emoji">{option.emoji}</span>
              <span>{option.english}</span>
            </button>
          )
        })}
      </div>

      {selected && (
        <button className="big-button" onClick={handleNext}>
          {step + 1 < questions.length ? 'Next →' : 'See results 🎉'}
        </button>
      )}
    </div>
  )
}
