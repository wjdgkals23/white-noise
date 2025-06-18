"use client"
import { useRef, useState, useEffect } from "react"

const sounds = [
  {
    name: "화이트노이즈",
    file: "/sounds/white-noise.mp3",
    emoji: "🌫️",
  },
  {
    name: "빗소리",
    file: "/sounds/rain.mp3",
    emoji: "🌧️",
  },
  {
    name: "바다",
    file: "/sounds/ocean.mp3",
    emoji: "🌊",
  },
  {
    name: "숲",
    file: "/sounds/forest.mp3",
    emoji: "🌲",
  },
]

type SoundType = (typeof sounds)[number]

const Home = () => {
  const [selected, setSelected] = useState<SoundType>(sounds[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume, selected])

  const handleSelect = (sound: SoundType) => {
    setSelected(sound)
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const handlePlayPause = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying((prev) => !prev)
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setVolume(value)
    if (audioRef.current) {
      audioRef.current.volume = value
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-500">
        백색소음 플레이어
      </h1>
      <div className="flex gap-4 mb-8 flex-wrap justify-center">
        {sounds.map((sound) => (
          <button
            key={sound.name}
            className={`px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2 text-lg font-medium shadow-sm bg-white hover:bg-blue-50 ${
              selected.name === sound.name ? "bg-blue-200 border-blue-400" : ""
            }`}
            aria-label={`${sound.name} 선택`}
            aria-pressed={selected.name === sound.name}
            tabIndex={0}
            onClick={() => handleSelect(sound)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSelect(sound)
            }}
          >
            <span aria-hidden>{sound.emoji}</span>
            {sound.name}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <audio
          ref={audioRef}
          src={selected.file}
          loop
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />
        <button
          className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold text-lg shadow hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handlePlayPause}
          aria-label={isPlaying ? "일시정지" : "재생"}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handlePlayPause()
          }}
        >
          {isPlaying ? "⏸️ 일시정지" : "▶️ 재생"}
        </button>
        <label
          className="w-full flex flex-col gap-1 text-sm font-medium text-gray-700"
          htmlFor="volume-slider"
        >
          볼륨
          <input
            id="volume-slider"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="w-full accent-blue-500"
            aria-valuenow={volume}
            aria-valuemin={0}
            aria-valuemax={1}
            tabIndex={0}
          />
        </label>
      </div>
      <footer className="mt-12 text-gray-400 text-xs text-center">
        © {new Date().getFullYear()} 백색소음 플레이어
      </footer>
    </div>
  )
}

export default Home
