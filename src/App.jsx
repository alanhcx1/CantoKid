import { useEffect, useState } from 'react'
import BadgeShelf from './components/BadgeShelf'
import Home from './components/Home'
import Lesson from './components/Lesson'
import ProfileSwitcher from './components/ProfileSwitcher'
import Quiz from './components/Quiz'
import { clearActiveProfile, getActiveProfileId, loadProfiles } from './content/profiles'
import { loadProgress } from './content/progress'
import './App.css'

function App() {
  const [profileId, setProfileId] = useState(getActiveProfileId)
  const [view, setView] = useState({ screen: 'home' })
  const [progress, setProgress] = useState(loadProgress)

  // Re-sync when switching to a different kid's profile, since useState's
  // initializer only runs once and won't pick up the new profile's data.
  useEffect(() => {
    if (profileId) {
      setProgress(loadProgress())
      setView({ screen: 'home' })
    }
  }, [profileId])

  if (!profileId) {
    return <ProfileSwitcher onPick={setProfileId} />
  }

  function goHome() {
    setProgress(loadProgress())
    setView({ screen: 'home' })
  }

  function switchProfile() {
    clearActiveProfile()
    setProfileId(null)
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

  const activeProfile = loadProfiles().find((p) => p.id === profileId)

  return (
    <Home
      profile={activeProfile}
      progress={progress}
      onSelectLesson={(lessonId) => setView({ screen: 'lesson', lessonId })}
      onShowBadges={() => setView({ screen: 'badges' })}
      onSwitchProfile={switchProfile}
    />
  )
}

export default App
