"use client"

import { useCallback, useEffect, useState } from "react"
import { CinematicIntro } from "@/components/cinematic-intro"

const INTRO_SEEN_KEY = "wanzor-intro-seen"

// La intro dura ~6s: se muestra una vez por sesión para no repetirla cada
// vez que se vuelve a Inicio.
export function HomePageShell({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_SEEN_KEY)) setIntroComplete(true)
    } catch {}
  }, [])

  const handleComplete = useCallback(() => {
    setIntroComplete(true)
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1")
    } catch {}
  }, [])

  return (
    <>
      {!introComplete && <CinematicIntro onComplete={handleComplete} />}
      <main
        className={`relative transition-opacity duration-700 ${
          introComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </main>
    </>
  )
}
