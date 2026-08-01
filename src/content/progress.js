const STORAGE_KEY = 'cantokid_progress'

export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export function saveLessonResult(lessonId, stars) {
  const progress = loadProgress()
  const prevStars = progress[lessonId]?.stars || 0
  progress[lessonId] = { stars: Math.max(prevStars, stars), completed: true }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  return progress
}
