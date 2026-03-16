import { useAudio } from '../contexts/AudioContext'

export default function AudioMuteButton() {
  const { muted, setMuted, playing } = useAudio()

  if (!playing) return null

  return (
    <button
      type="button"
      onClick={() => setMuted((m) => !m)}
      className="p-2 rounded-lg text-gray-600 hover:text-nature hover:bg-gray-50 transition-colors"
      aria-label={muted ? 'Unmute music' : 'Mute music'}
      title={muted ? 'Unmute' : 'Mute'}
    >
      {muted ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 8.003 12 8.449 12 9.414v5.172c0 .965-1.077 1.411-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 8.003 12 8.449 12 9.414v5.172c0 .965-1.077 1.411-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  )
}
