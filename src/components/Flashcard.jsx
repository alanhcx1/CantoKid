import { useEffect } from 'react'
import { useSpeak } from '../hooks/useSpeak'
import { useRecorder } from '../hooks/useRecorder'

export default function Flashcard({ word }) {
  const { speak, hasVoice, checked } = useSpeak()
  const { status, audioUrl, error, start, stop, reset } = useRecorder()

  useEffect(() => {
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word.id])

  return (
    <div className="flashcard">
      <div className="flashcard-emoji">{word.emoji}</div>
      <div className="flashcard-english">{word.english}</div>
      <div className="flashcard-phonetic">{word.say}</div>
      <div className="flashcard-characters">{word.characters}</div>

      <button className="big-button listen-button" onClick={() => speak(word.characters)}>
        🔊 Listen
      </button>
      {checked && !hasVoice && (
        <p className="hint">
          No Cantonese voice found on this device — try Chrome on Android, or check your browser's
          language/voice settings.
        </p>
      )}

      <div className="practice-row">
        {status === 'idle' || status === 'error' ? (
          <button className="big-button record-button" onClick={start}>
            🎙️ Practice saying it
          </button>
        ) : status === 'recording' ? (
          <button className="big-button record-button recording" onClick={stop}>
            ⏹️ Stop
          </button>
        ) : (
          <div className="playback-row">
            <button className="big-button" onClick={() => speak(word.characters)}>
              🔊 Native
            </button>
            <audio src={audioUrl} controls />
            <button className="small-button" onClick={reset}>
              Try again
            </button>
          </div>
        )}
      </div>
      {error && <p className="hint error">{error}</p>}
    </div>
  )
}
