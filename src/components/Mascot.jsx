// Original character: a baby lion-dance lion cub, evolving as the kid earns stars.
// mood: 'happy' | 'neutral' | 'sad' | 'excited'
// stage: 0 (no accessory) | 1 (ribbon) | 2 (bell collar) | 3 (mini headdress)
const MOUTHS = {
  happy: 'M 38 62 Q 50 74 62 62',
  excited: 'M 36 60 Q 50 78 64 60 Q 50 70 36 60',
  neutral: 'M 40 64 Q 50 68 60 64',
  sad: 'M 38 68 Q 50 58 62 68',
}

const EYES = {
  happy: 'arc',
  excited: 'round',
  neutral: 'round',
  sad: 'round',
}

export default function Mascot({ mood = 'happy', stage = 0, size = 120 }) {
  const eyeStyle = EYES[mood]

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="mascot">
      {/* mane */}
      <g fill="#e8482c">
        <circle cx="50" cy="50" r="46" opacity="0.15" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <ellipse
            key={deg}
            cx="50"
            cy="12"
            rx="9"
            ry="14"
            transform={`rotate(${deg} 50 50)`}
            fill="#f2a13c"
          />
        ))}
      </g>

      {/* head */}
      <circle cx="50" cy="50" r="32" fill="#ffcf7a" stroke="#e8482c" strokeWidth="2.5" />

      {/* ears */}
      <circle cx="27" cy="30" r="9" fill="#ffcf7a" stroke="#e8482c" strokeWidth="2.5" />
      <circle cx="73" cy="30" r="9" fill="#ffcf7a" stroke="#e8482c" strokeWidth="2.5" />
      <circle cx="27" cy="30" r="4" fill="#e8482c" />
      <circle cx="73" cy="30" r="4" fill="#e8482c" />

      {/* eyes */}
      {eyeStyle === 'round' ? (
        <>
          <circle cx="38" cy="46" r="4.5" fill="#3a2e4d" />
          <circle cx="62" cy="46" r="4.5" fill="#3a2e4d" />
        </>
      ) : (
        <>
          <path d="M 33 46 Q 38 41 43 46" stroke="#3a2e4d" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 57 46 Q 62 41 67 46" stroke="#3a2e4d" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* nose + mouth */}
      <ellipse cx="50" cy="55" rx="5" ry="3.5" fill="#e8482c" />
      <path d={MOUTHS[mood]} stroke="#e8482c" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* cheeks */}
      <circle cx="30" cy="58" r="4" fill="#ff8a5c" opacity="0.6" />
      <circle cx="70" cy="58" r="4" fill="#ff8a5c" opacity="0.6" />

      {/* stage 1: ribbon */}
      {stage >= 1 && (
        <g transform="translate(50 14)">
          <path d="M -8 0 L 0 6 L 8 0 L 0 -4 Z" fill="#d1425c" />
          <circle r="3" fill="#ffb300" />
        </g>
      )}

      {/* stage 2: bell collar */}
      {stage >= 2 && (
        <g>
          <path d="M 24 74 Q 50 88 76 74" stroke="#ffb300" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="50" cy="84" r="5" fill="#ffb300" stroke="#c98600" strokeWidth="1.5" />
        </g>
      )}

      {/* stage 3: mini headdress */}
      {stage >= 3 && (
        <g transform="translate(50 8)">
          <path d="M -14 4 Q 0 -14 14 4 Z" fill="#7e14ff" stroke="#5a0ecf" strokeWidth="1.5" />
          <circle cx="0" cy="-8" r="3.5" fill="#ffb300" />
        </g>
      )}
    </svg>
  )
}
