import { useCallback, useRef, useState } from 'react'

export function useRecorder() {
  const [status, setStatus] = useState('idle') // idle | recording | recorded | error
  const [audioUrl, setAudioUrl] = useState(null)
  const [error, setError] = useState(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const streamRef = useRef(null)

  const start = useCallback(async () => {
    setError(null)
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Microphone not supported on this device/browser.')
      setStatus('error')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      chunksRef.current = []
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev)
          return URL.createObjectURL(blob)
        })
        setStatus('recorded')
        streamRef.current?.getTracks().forEach((t) => t.stop())
      }
      recorder.start()
      setStatus('recording')
    } catch {
      setError('Microphone permission was denied.')
      setStatus('error')
    }
  }, [])

  const stop = useCallback(() => {
    mediaRecorderRef.current?.stop()
  }, [])

  const reset = useCallback(() => {
    setAudioUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setStatus('idle')
    setError(null)
  }, [])

  return { status, audioUrl, error, start, stop, reset }
}
