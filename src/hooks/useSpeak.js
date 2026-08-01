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
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setChecked(true)
      return
    }
    const load = () => {
      const found = pickVoice(window.speechSynthesis.getVoices())
      setVoice(found)
      setChecked(true)
    }
    load()
    window.speechSynthesis.addEventListener('voiceschanged', load)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load)
  }, [])

  const speak = useCallback(
    (text) => {
      if (!('speechSynthesis' in window)) return
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = CANTONESE_LANG
      utterance.rate = 0.85
      if (voice) utterance.voice = voice
      window.speechSynthesis.speak(utterance)
    },
    [voice],
  )

  return { speak, hasVoice: Boolean(voice), checked }
}
