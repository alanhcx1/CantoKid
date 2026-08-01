import { lessons } from '../content/lessons'
import Stars from './Stars'

export default function Home({ progress, onSelectLesson }) {
  return (
    <div className="screen home">
      <h1 className="app-title">🀄 CantoKid</h1>
      <p className="app-subtitle">Learn to speak Cantonese!</p>
      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            className="lesson-card"
            style={{ '--lesson-color': lesson.color }}
            onClick={() => onSelectLesson(lesson.id)}
          >
            <span className="lesson-emoji">{lesson.emoji}</span>
            <span className="lesson-title">{lesson.title}</span>
            <Stars count={progress[lesson.id]?.stars || 0} />
          </button>
        ))}
      </div>
    </div>
  )
}
