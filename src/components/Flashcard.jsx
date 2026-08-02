import { useEffect, useRef } from 'react'
import { useSpeak } from '../hooks/useSpeak'
import { useRecorder } from '../hooks/useRecorder'

export default function Flashcard({ word }) {
  const { speak, unsupported } = useSpeak()
  const { status, audioUrl, error, start, stop, reset } = useRecorder()
  const playbackRef = useRef(null)

  useEffect(() => {
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word.id])

  useEffect(() => {
    if (audioUrl) playbackRef.current?.play()
  }, [audioUrl])

  return (
    <div className="flashcard">
      <div className="flashcard-emoji">{word.emoji}</div>
      <div className="flashcard-english">{word.english}</div>
      <div className="flashcard-phonetic">{word.say}</div>
      <div className="flashcard-characters">{word.characters}</div>

      <button className="big-button listen-button" onClick={() => speak(word.characters)}>
        🔊 Listen
      </button>
      {unsupported && (
        <p className="hint">
          Couldn't play Cantonese audio on this device/browser — try Chrome on Android, or check
          your browser's language/voice settings.
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
            <p className="playback-label">Your recording:</p>
            <audio ref={playbackRef} src={audioUrl} controls />
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
