import { useCallback, useEffect, useState } from 'react'

const CANTONESE_LANG = 'zh-HK'

function pickVoice(voices) {
  return (
    voices.find((v) => v.lang === CANTONESE_LANG) ||
    voices.find((v) => v.lang?.toLowerCase().startsWith('zh-hk')) ||
    voices.find((v) => /cantonese/i.test(v.name)) ||
    null
  )
}

export function useSpeak() {
  const [voice, setVoice] = useState(null)
  const [unsupported, setUnsupported] = useState(false)

  useEffect(() => {
    if (!('speechSynthesis' in window)) return
    const load = () => setVoice(pickVoice(window.speechSynthesis.getVoices()))
    load()
    window.speechSynthesis.addEventListener('voiceschanged', load)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load)
  }, [])

  const speak = useCallback(
    (text) => {
      if (!('speechSynthesis' in window)) {
        setUnsupported(true)
        return
      }
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = CANTONESE_LANG
      utterance.rate = 0.85
      if (voice) utterance.voice = voice
      // Some browsers (notably iOS Safari) don't list a zh-HK voice via
      // getVoices() yet still synthesize it fine, so only warn on an actual
      // failure rather than pre-emptively guessing from the voice list.
      utterance.onerror = () => setUnsupported(true)
      utterance.onstart = () => setUnsupported(false)
      window.speechSynthesis.speak(utterance)
    },
    [voice],
  )

  return { speak, unsupported }
}
