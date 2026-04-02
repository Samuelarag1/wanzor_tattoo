"use client"

import { useState } from "react"
import { CinematicIntro } from "@/components/cinematic-intro"

export function HomePageShell({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      {!introComplete && <CinematicIntro onComplete={() => setIntroComplete(true)} />}
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
