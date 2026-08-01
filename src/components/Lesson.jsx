import { useState } from 'react'
import { getLesson } from '../content/lessons'
import Flashcard from './Flashcard'

export default function Lesson({ lessonId, onBack, onStartQuiz }) {
  const lesson = getLesson(lessonId)
  const [index, setIndex] = useState(0)
  const word = lesson.words[index]
  const isLast = index === lesson.words.length - 1

  return (
    <div className="screen lesson" style={{ '--lesson-color': lesson.color }}>
      <div className="screen-header">
        <button className="back-button" onClick={onBack}>
          ← Home
        </button>
        <h2>
          {lesson.emoji} {lesson.title}
        </h2>
      </div>

      <p className="progress-label">
        Card {index + 1} of {lesson.words.length}
      </p>

      <Flashcard word={word} />

      <div className="nav-row">
        <button className="small-button" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
          ← Prev
        </button>
        {isLast ? (
          <button className="big-button quiz-button" onClick={() => onStartQuiz(lessonId)}>
            Take the quiz 🎉
          </button>
        ) : (
          <button className="small-button" onClick={() => setIndex((i) => i + 1)}>
            Next →
          </button>
        )}
      </div>
    </div>
  )
}
