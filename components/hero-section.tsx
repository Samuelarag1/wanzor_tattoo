"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

const heroImageSrc = "/hero.PNG"

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="inicio" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          animation: "grain 10s steps(8) infinite",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(214,176,76,0.22),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_42%)]" />

      <div className="absolute inset-0 z-0">
        <Image
          src={heroImageSrc}
          alt="Wanzor Tatt trabajando en su posicionamiento profesional para tatuadores"
          fill
          priority
          sizes="100vw"
          className={`h-full w-full object-cover object-top md:object-center transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            loaded ? "scale-100 opacity-[0.58] blur-0" : "scale-[1.08] opacity-0 blur-xl"
          }`}
        />
        <div
          className={`absolute inset-3 rounded-[28px] border border-white/10 bg-background/70 backdrop-blur-xl transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:inset-6 ${
            loaded ? "scale-105 opacity-0" : "scale-100 opacity-100"
          }`}
        />
        <div
          className={`absolute inset-0 bg-background transition-opacity duration-[1000ms] ease-out ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.14)_42%,rgba(10,10,10,0.76)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left_center,rgba(10,10,10,0.9)_0%,rgba(10,10,10,0.64)_26%,rgba(10,10,10,0.22)_48%,transparent_66%),radial-gradient(ellipse_at_right_center,rgba(10,10,10,0.82)_0%,rgba(10,10,10,0.54)_24%,rgba(10,10,10,0.16)_46%,transparent_64%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <p
          className={`mb-6 text-xs uppercase tracking-[0.4em] text-accent transition-all duration-700 delay-200 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Mentorías para tatuadores
        </p>

        <h1
          className={`font-heading text-5xl font-bold uppercase leading-[0.9] tracking-tight text-foreground md:text-8xl lg:text-9xl transition-all duration-1000 delay-300 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="block">Mejorar</span>
          <span className="block">no es</span>
          <span className="block text-accent">casualidad</span>
        </h1>

        <p
          className={`mt-8 max-w-2xl text-base text-muted-foreground italic md:text-lg transition-all duration-700 delay-[450ms] ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          LLamadas 1 a 1 para tatuadores que quieran organizar su marca, aumentar sus ganancias y subir su nivel.
        </p>

        <a
          href="#mentoria"
          className={`mt-12 inline-flex items-center justify-center border border-accent/40 bg-accent/90 px-8 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent-foreground shadow-[0_18px_50px_rgba(214,176,76,0.18)] transition-all duration-700 delay-[600ms] hover:bg-accent ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Descubrir más
        </a>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-all duration-700 delay-[850ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <ChevronDown className="h-5 w-5 text-muted-foreground animate-bounce" />
      </div>
    </section>
  )
}
