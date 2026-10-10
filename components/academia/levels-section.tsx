"use client"

import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { mockLevels, mockProducts } from "@/lib/mock/academia"
import { LevelCard } from "@/components/academia/level-card"

// PDF, sección 02: "Los tres niveles" dentro del scroll de la Home.
export function LevelsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()

  return (
    <section id="academia" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="text-center">
          <p
            className={`text-xs uppercase tracking-[0.4em] text-accent transition-all duration-700 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            La academia
          </p>
          <h2
            className={`mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl transition-all duration-1000 delay-200 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Tres niveles
          </h2>
          <p
            className={`mt-6 mx-auto max-w-lg text-base text-muted-foreground transition-all duration-700 delay-400 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Empezar con una base clara, profesionalizar técnica y criterio, o construir carrera y negocio.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {mockLevels.map((level, index) => {
            const product = mockProducts.find((p) => p.type === "level" && p.levelSlugs.includes(level.slug))
            if (!product) return null
            return <LevelCard key={level.slug} level={level} product={product} index={index} />
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/academia"
            className="inline-flex items-center justify-center border border-foreground/20 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-all hover:bg-foreground hover:text-background"
          >
            Ver toda la Academia
          </Link>
        </div>
      </div>
    </section>
  )
}
