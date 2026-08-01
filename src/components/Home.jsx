import { lessons } from '../content/lessons'
import { mascotStage, totalStars } from '../content/progress'
import Mascot from './Mascot'
import Stars from './Stars'

const GREETINGS = [
  "Hi, I'm Hou Hou! Let's learn some Cantonese together!",
  "You're doing great! Keep going!",
  'Wow, look at you go!',
  "You're a Cantonese champion!",
]

export default function Home({ progress, onSelectLesson, onShowBadges }) {
  const stage = mascotStage(totalStars(progress))

  return (
    <div className="screen home">
      <div className="home-header">
        <h1 className="app-title">🀄 CantoKid</h1>
        <button className="badges-button" onClick={onShowBadges}>
          🏅 Badges
        </button>
      </div>

      <div className="mascot-intro">
        <Mascot mood={stage === 3 ? 'excited' : 'happy'} stage={stage} size={110} />
        <div className="speech-bubble">{GREETINGS[stage]}</div>
      </div>

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
