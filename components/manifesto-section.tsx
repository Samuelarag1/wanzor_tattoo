"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const lines = [
  "Tus tattoos no son el problema.",
  "El problema es el sistema que los rodea.",
  "No es cuantos seguidores tenes.",
  "Es cuantos clientes te escriben.",
  "No es cuanto cobras.",
  "Es cuanto vales.",
]

export function ManifestoSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-secondary">
      {/* Accent line */}
      <div className="absolute top-0 left-1/2 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-accent/30" />

      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {lines.map((line, i) => (
            <ManifestoLine key={i} text={line} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-1/2 h-24 w-px -translate-x-1/2 bg-gradient-to-t from-transparent to-accent/30" />
    </section>
  )
}

function ManifestoLine({ text, index }: { text: string; index: number }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 })
  const isEmphasized = index % 2 !== 0

  return (
    <p
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${
        isEmphasized
          ? "font-heading text-2xl font-bold uppercase tracking-tight text-accent md:text-4xl"
          : "text-lg text-muted-foreground md:text-xl"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {text}
    </p>
  )
}
