import { useState } from 'react'
import BadgeShelf from './components/BadgeShelf'
import Home from './components/Home'
import Lesson from './components/Lesson'
import Quiz from './components/Quiz'
import { loadProgress } from './content/progress'
import './App.css'

function App() {
  const [view, setView] = useState({ screen: 'home' })
  const [progress, setProgress] = useState(loadProgress)

  function goHome() {
    setProgress(loadProgress())
    setView({ screen: 'home' })
  }

  if (view.screen === 'lesson') {
    return (
      <Lesson
        lessonId={view.lessonId}
        onBack={goHome}
        onStartQuiz={(lessonId) => setView({ screen: 'quiz', lessonId })}
      />
    )
  }

  if (view.screen === 'quiz') {
    return <Quiz lessonId={view.lessonId} onFinish={goHome} />
  }

  if (view.screen === 'badges') {
    return <BadgeShelf progress={progress} onBack={goHome} />
  }

  return (
    <Home
      progress={progress}
      onSelectLesson={(lessonId) => setView({ screen: 'lesson', lessonId })}
      onShowBadges={() => setView({ screen: 'badges' })}
    />
  )
}

export default App
