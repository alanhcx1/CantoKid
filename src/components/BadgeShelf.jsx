import { badges } from '../content/badges'
import { hasRecorded } from '../content/progress'

export default function BadgeShelf({ progress, onBack }) {
  const recorded = hasRecorded()

  return (
    <div className="screen badges">
      <div className="screen-header">
        <button className="back-button" onClick={onBack}>
          ← Home
        </button>
        <h2>🏅 Badges</h2>
      </div>

      <div className="badge-grid">
        {badges.map((badge) => {
          const earned = badge.earned({ progress, recorded })
          return (
            <div key={badge.id} className={earned ? 'badge-card earned' : 'badge-card'}>
              <span className="badge-emoji">{earned ? badge.emoji : '🔒'}</span>
              <span className="badge-name">{badge.name}</span>
              <span className="badge-description">{badge.description}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
