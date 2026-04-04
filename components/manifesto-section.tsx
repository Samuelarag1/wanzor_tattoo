"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const lines = [
  { text: "Tus tattoos no son el problema.", emphasis: false },
  { text: "El problema es el sistema que los rodea.", emphasis: true },
  { text: "No es cuántos seguidores tenés.", emphasis: false },
  { text: "Es cuántos clientes te escriben.", emphasis: true },
  { text: "No es cuánto cobrás.", emphasis: false },
  { text: "Es cuánto valés.", emphasis: true },
  { text: "Hay un sistema detrás de cada resultado.", emphasis: false },
  { text: "Mejorar no es casualidad.", emphasis: true },
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

function ManifestoLine({ text, index }: { text: { text: string; emphasis: boolean }; index: number }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 })

  return (
    <p
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${
        text.emphasis
          ? "font-heading text-2xl font-bold uppercase tracking-tight text-accent md:text-4xl"
          : "text-lg text-muted-foreground md:text-xl"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {text.text}
    </p>
  )
}
