"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Film grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          animation: "grain 8s steps(10) infinite",
        }}
      />

      {/* Cinema bars */}
      <div
        className={`absolute top-0 left-0 right-0 bg-background z-30 transition-all duration-[2000ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          loaded ? "h-0" : "h-[50vh]"
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 bg-background z-30 transition-all duration-[2000ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          loaded ? "h-0" : "h-[50vh]"
        }`}
      />

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-mejorar.jpeg"
          alt="Wanzo Tatt trabajando"
          className={`h-full w-full object-cover object-top transition-all duration-[2000ms] ${
            loaded ? "scale-100 opacity-40" : "scale-110 opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p
          className={`mb-6 text-xs uppercase tracking-[0.4em] text-accent transition-all duration-700 delay-[1800ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Tatuajes Profesionales
        </p>

        <h1
          className={`font-heading text-5xl font-bold uppercase leading-none tracking-tight text-foreground md:text-8xl lg:text-9xl transition-all duration-1000 delay-[2000ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block">Mejorar</span>
          <span className="block">no es</span>
          <span className="block text-accent">casualidad</span>
        </h1>

        <p
          className={`mt-8 max-w-lg text-base text-muted-foreground italic md:text-lg transition-all duration-700 delay-[2400ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Hay un patron detras de cada resultado
        </p>

        <a
          href="#mentoria"
          className={`mt-12 border border-foreground/20 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-foreground transition-all duration-700 delay-[2800ms] hover:bg-foreground hover:text-background ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Descubrir mas
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-all duration-700 delay-[3200ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <ChevronDown className="h-5 w-5 text-muted-foreground animate-bounce" />
      </div>
    </section>
  )
}
