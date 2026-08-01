import { useState } from 'react'
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

  return <Home progress={progress} onSelectLesson={(lessonId) => setView({ screen: 'lesson', lessonId })} />
}

export default App
