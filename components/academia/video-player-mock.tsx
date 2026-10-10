"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Maximize, Pause, Play, Settings, Volume2 } from "lucide-react"

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.floor(totalSeconds % 60)
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

// Reproductor de demostración: mismo layout y controles que tendrá el
// reproductor real (Bunny Stream, Fase 4), sobre una imagen fija.
export function VideoPlayerMock({
  poster,
  posterPosition,
  durationMinutes,
  label,
}: {
  poster: string
  posterPosition: string
  durationMinutes: number
  label: string
}) {
  const total = Math.max(1, durationMinutes) * 60
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setElapsed((value) => Math.min(total, value + 1)), 1000)
    return () => clearInterval(id)
  }, [playing, total])

  useEffect(() => {
    if (elapsed >= total) setPlaying(false)
  }, [elapsed, total])

  const percent = (elapsed / total) * 100

  return (
    <div className="group relative aspect-video w-full overflow-hidden border border-border bg-black">
      <Image
        src={poster}
        alt=""
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 70vw"
        className={`object-cover transition-all duration-700 ${playing ? "scale-100 opacity-90" : "scale-105 opacity-50"}`}
        style={{ objectPosition: posterPosition }}
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity ${playing ? "opacity-60" : "opacity-100"}`} />

      <p className={`absolute left-6 top-5 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 transition-opacity ${playing ? "opacity-0 group-hover:opacity-100" : ""}`}>
        {label}
      </p>
      {playing && (
        <span className="absolute right-5 top-5 bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur">
          Video de demostración
        </span>
      )}

      {!playing && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Reproducir"
          className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_0_80px_rgba(214,176,76,0.4)] transition-transform hover:scale-110"
        >
          <Play className="ml-1 h-8 w-8" fill="currentColor" />
        </button>
      )}

      <div
        className={`absolute inset-x-0 bottom-0 px-5 pb-4 pt-10 transition-opacity ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        <div
          role="slider"
          aria-label="Progreso del video"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={elapsed}
          tabIndex={0}
          onClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect()
            setElapsed(Math.round(((event.clientX - rect.left) / rect.width) * total))
          }}
          className="group/bar relative h-1 w-full cursor-pointer bg-white/20 transition-all hover:h-1.5"
        >
          <div className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${percent}%` }} />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0 transition-opacity group-hover/bar:opacity-100"
            style={{ left: `${percent}%` }}
          />
        </div>
        <div className="mt-3 flex items-center gap-5 text-white/85">
          <button type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pausar" : "Reproducir"}>
            {playing ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="h-5 w-5" fill="currentColor" />}
          </button>
          <Volume2 className="h-5 w-5" />
          <span className="text-xs tabular-nums">
            {formatTime(elapsed)} / {formatTime(total)}
          </span>
          <span className="flex-1" />
          <span className="text-xs font-semibold">1x</span>
          <Settings className="h-5 w-5" />
          <Maximize className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
