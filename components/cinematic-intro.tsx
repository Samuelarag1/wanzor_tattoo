"use client"

import { useEffect, useState } from "react"
import { siteConfig } from "@/lib/site"

interface CinematicIntroProps {
  onComplete: () => void
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = useState<
    "black" | "line" | "question" | "answer" | "glow" | "exit"
  >("black")

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("line"), 600),
      setTimeout(() => setPhase("question"), 1400),
      setTimeout(() => setPhase("answer"), 3000),
      setTimeout(() => setPhase("glow"), 4400),
      setTimeout(() => setPhase("exit"), 5200),
      setTimeout(() => onComplete(), 6200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-1000 ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          animation: "grain 8s steps(10) infinite",
        }}
      />

      {/* Decorative line */}
      <div
        className={`mb-12 h-px bg-accent transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          phase === "black" ? "w-0 opacity-0" : "w-24 md:w-40 opacity-100"
        }`}
      />

      {/* Main text block */}
      <div className="relative px-6 text-center">
        {/* Small label */}
        <p
          className={`mb-6 text-[10px] uppercase tracking-[0.5em] text-muted-foreground transition-all duration-700 ${
            phase === "black" || phase === "line"
              ? "opacity-0 translate-y-3"
              : "opacity-100 translate-y-0"
          }`}
        >
          {siteConfig.brandName}
        </p>

        {/* Question */}
        <h1 className="overflow-hidden">
          <span
            className={`block font-heading text-4xl font-bold uppercase leading-none tracking-tight md:text-7xl lg:text-8xl transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              phase === "black" || phase === "line"
                ? "translate-y-[110%] opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <span className="text-foreground">{"¿Estás listo"}</span>
          </span>
        </h1>

        <h1 className="mt-2 overflow-hidden">
          <span
            className={`block font-heading text-4xl font-bold uppercase leading-none tracking-tight md:text-7xl lg:text-8xl transition-all duration-1000 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              phase === "black" || phase === "line"
                ? "translate-y-[110%] opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <span className="text-accent">{"para crecer?"}</span>
          </span>
        </h1>

        {/* Answer line */}
        <p
          className={`mt-10 text-sm italic tracking-wide text-muted-foreground md:text-base transition-all duration-700 ${
            phase === "answer" || phase === "glow" || phase === "exit"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          Mejorar no es casualidad.
        </p>
      </div>

      {/* Bottom decorative line */}
      <div
        className={`mt-12 h-px bg-accent transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          phase === "black" ? "w-0 opacity-0" : "w-24 md:w-40 opacity-100"
        }`}
      />

      {/* Radial glow on "glow" phase */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
          phase === "glow" || phase === "exit" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.75 0.08 85 / 0.06) 0%, transparent 60%)",
        }}
      />
    </div>
  )
}
