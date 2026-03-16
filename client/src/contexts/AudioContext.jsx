import { createContext, useContext, useState } from 'react'

const AudioContext = createContext(null)

export function AudioProvider({ children }) {
  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [blocked, setBlocked] = useState(false)
  return (
    <AudioContext.Provider value={{ muted, setMuted, playing, setPlaying, blocked, setBlocked }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error('useAudio must be used within AudioProvider')
  return ctx
}
