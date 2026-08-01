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

export function totalStars(progress) {
  return Object.values(progress).reduce((sum, lesson) => sum + (lesson.stars || 0), 0)
}

// 3 lessons x 3 stars max = 9. Thresholds pick the mascot's accessory stage.
export function mascotStage(stars) {
  if (stars >= 7) return 3
  if (stars >= 4) return 2
  if (stars >= 1) return 1
  return 0
}
