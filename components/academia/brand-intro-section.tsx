"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { instructor, mockLevels, sumStats } from "@/lib/mock/academia"
import { siteConfig } from "@/lib/site"

// PDF, sección 01: "Qué es Wanzor / Qué es la Academia" — breve, sin
// convertir la Home en una autobiografía (eso vive en /mi-historia).
export function BrandIntroSection() {
  const { ref, isVisible } = useScrollReveal()
  const stats = sumStats(mockLevels)

  return (
    <section className="relative overflow-hidden border-y border-border py-28" aria-labelledby="brand-intro-title">
      <div
        ref={ref}
        className={`mx-auto grid max-w-6xl items-center gap-16 px-6 transition-all duration-1000 lg:grid-cols-[0.9fr_1.1fr] ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden border border-border">
            <Image
              src={instructor.image}
              alt={`${instructor.name}, ${siteConfig.brandName}`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              style={{ objectPosition: instructor.imagePosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-heading text-3xl font-bold uppercase text-foreground">{instructor.name}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Fundador · {instructor.brand}</p>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 hidden border border-accent/40 bg-background px-5 py-4 md:block">
            <p className="font-heading text-3xl font-bold leading-none text-foreground">{instructor.since}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Tatuando desde</p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Qué es {siteConfig.brandName}</p>
          <h2
            id="brand-intro-title"
            className="mt-4 font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground md:text-6xl"
          >
            Una academia para tatuadores, <span className="text-accent">no un curso más</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Años de oficio ordenados en un recorrido de tres niveles: técnica, criterio y negocio. Cada nivel se
            estudia a tu ritmo, desde tu propia cuenta, con el contenido que compraste desbloqueado.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden border border-border bg-border">
            {[
              { value: "03", label: "Niveles" },
              { value: String(stats.lessons).padStart(2, "0"), label: "Lecciones" },
              { value: `~${stats.minutes}`, label: "Min. de video" },
            ].map((item) => (
              <div key={item.label} className="bg-background px-5 py-5">
                <dd className="font-heading text-3xl font-bold leading-none text-foreground md:text-4xl">{item.value}</dd>
                <dt className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{item.label}</dt>
              </div>
            ))}
          </dl>

          <Link
            href="/mi-historia"
            className="mt-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
          >
            Conocé mi historia <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
