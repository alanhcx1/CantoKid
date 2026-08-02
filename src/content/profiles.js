const PROFILES_KEY = 'cantokid_profiles'
const ACTIVE_PROFILE_KEY = 'cantokid_active_profile'

export const AVATAR_CHOICES = ['🐶', '🐱', '🐰', '🐼', '🦊', '🐯', '🦁', '🐨', '🐸', '🐵', '🦄', '🐧']

export function loadProfiles() {
  try {
    return JSON.parse(localStorage.getItem(PROFILES_KEY)) || []
  } catch {
    return []
  }
}

function saveProfiles(profiles) {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))
}

export function createProfile(name, avatar) {
  const profiles = loadProfiles()
  const profile = { id: `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`, name, avatar }
  saveProfiles([...profiles, profile])
  return profile
}

export function deleteProfile(id) {
  saveProfiles(loadProfiles().filter((p) => p.id !== id))
  localStorage.removeItem(`cantokid_progress_${id}`)
  localStorage.removeItem(`cantokid_has_recorded_${id}`)
  if (getActiveProfileId() === id) clearActiveProfile()
}

export function getActiveProfileId() {
  return localStorage.getItem(ACTIVE_PROFILE_KEY)
}

export function setActiveProfile(id) {
  localStorage.setItem(ACTIVE_PROFILE_KEY, id)
}

export function clearActiveProfile() {
  localStorage.removeItem(ACTIVE_PROFILE_KEY)
}
