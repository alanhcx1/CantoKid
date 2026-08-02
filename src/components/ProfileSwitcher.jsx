import { useState } from 'react'
import { AVATAR_CHOICES, createProfile, deleteProfile, loadProfiles, setActiveProfile } from '../content/profiles'

export default function ProfileSwitcher({ onPick }) {
  const [profiles, setProfiles] = useState(loadProfiles)
  const [adding, setAdding] = useState(profiles.length === 0)
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState(AVATAR_CHOICES[0])

  function pick(profile) {
    setActiveProfile(profile.id)
    onPick(profile.id)
  }

  function handleAdd(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    const profile = createProfile(trimmed, avatar)
    setProfiles((prev) => [...prev, profile])
    setName('')
    setAdding(false)
    pick(profile)
  }

  function handleRemove(id) {
    deleteProfile(id)
    setProfiles((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="screen profiles">
      <h1 className="app-title">🀄 CantoKid</h1>
      <h2>Who's playing?</h2>

      <div className="profile-grid">
        {profiles.map((profile) => (
          <div key={profile.id} className="profile-card-wrap">
            <button className="profile-card" onClick={() => pick(profile)}>
              <span className="profile-avatar">{profile.avatar}</span>
              <span className="profile-name">{profile.name}</span>
            </button>
            <button
              className="profile-remove"
              aria-label={`Remove ${profile.name}`}
              onClick={() => handleRemove(profile.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {adding ? (
        <form className="profile-form" onSubmit={handleAdd}>
          <input
            className="profile-name-input"
            placeholder="Kid's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            autoFocus
          />
          <div className="avatar-grid">
            {AVATAR_CHOICES.map((choice) => (
              <button
                type="button"
                key={choice}
                className={choice === avatar ? 'avatar-option selected' : 'avatar-option'}
                onClick={() => setAvatar(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
          <button type="submit" className="big-button">
            Add kid
          </button>
          {profiles.length > 0 && (
            <button type="button" className="small-button" onClick={() => setAdding(false)}>
              Cancel
            </button>
          )}
        </form>
      ) : (
        <button className="big-button" onClick={() => setAdding(true)}>
          ➕ Add a kid
        </button>
      )}
    </div>
  )
}
