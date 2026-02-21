"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const painPoints = [
  {
    question: "Tatuas bien, pero estas donde queres?",
    detail: "El talento solo no alcanza. Sin un sistema, estas dejando dinero y oportunidades en la mesa.",
  },
  {
    question: "Dudas al pasar precios?",
    detail: "Si no sabes cobrar lo que vales, el mercado te va a cobrar a vos con frustracion.",
  },
  {
    question: "Tus tattoos no son el problema",
    detail: "El problema es el sistema que los rodea. Marketing, marca personal, gestion de clientes.",
  },
  {
    question: "Sientes que no avanzas?",
    detail: "No necesitas mas tecnica. Necesitas direccion, estrategia y alguien que ya recorrio el camino.",
  },
]

export function PainPointsSection() {
  return (
    <section id="mentoria" className="relative py-32 overflow-hidden">
      {/* Diagonal accent line */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader />
        <div className="mt-20 grid gap-0 md:grid-cols-2">
          {painPoints.map((point, i) => (
            <PainPointCard key={i} point={point} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHeader() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div ref={ref} className="text-center">
      <p
        className={`text-xs uppercase tracking-[0.4em] text-accent transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Asesoramiento Online
      </p>
      <h2
        className={`mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl lg:text-7xl transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="text-balance">
          {"Te identificas?"}
        </span>
      </h2>
    </div>
  )
}

function PainPointCard({ point, index }: { point: typeof painPoints[number]; index: number }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`group relative border border-border p-8 md:p-12 transition-all duration-700 hover:bg-secondary/50 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <span className="absolute top-4 right-4 font-heading text-6xl font-bold text-foreground/5">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
        {point.question}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {point.detail}
      </p>
      <div className="mt-6 h-px w-12 bg-accent transition-all duration-500 group-hover:w-full" />
    </div>
  )
}
