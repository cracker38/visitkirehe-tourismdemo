import { useEffect, useRef } from 'react'
import { useAudio } from '../contexts/AudioContext'

const VIDEO_SRC = '/temberakirehe_2.mp4'
const DEFAULT_VOLUME = 0.4

export default function BackgroundMusic() {
  const { muted, setPlaying, setBlocked } = useAudio()
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let cancelled = false
    const tryPlay = () => {
      if (cancelled) return
      video.muted = false
      video.volume = DEFAULT_VOLUME
      const promise = video.play()
      if (promise && typeof promise.then === 'function') {
        promise
          .then(() => {
            if (!cancelled) {
              setPlaying(true)
              setBlocked(false)
            }
          })
          .catch(() => {
            if (!cancelled) setBlocked(true)
          })
      }
    }

    const onCanPlay = () => tryPlay()
    const onError = () => {
      if (!cancelled) setBlocked(true)
    }

    video.addEventListener('canplaythrough', onCanPlay, { once: true })
    video.addEventListener('error', onError, { once: true })

    if (video.readyState >= 3) tryPlay()

    return () => {
      cancelled = true
      video.removeEventListener('canplaythrough', onCanPlay)
      video.removeEventListener('error', onError)
      video.pause()
    }
  }, [setPlaying, setBlocked])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = muted
    video.volume = muted ? 0 : DEFAULT_VOLUME
  }, [muted])

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      loop
      playsInline
      preload="auto"
      muted={false}
      className="hidden"
      aria-label="Background video"
    />
  )
}
