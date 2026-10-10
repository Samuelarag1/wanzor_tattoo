"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const pillars = ["Claridad", "Criterio", "Método", "Motivación", "Profesionalización"]

const steps = [
  { label: "Compra", detail: "Nivel individual o Academia Completa" },
  { label: "Cuenta", detail: "Se crea/habilita automáticamente" },
  { label: "Email", detail: "Recibís el acceso por mail" },
  { label: "Login", detail: "Entrás con tu email y contraseña" },
  { label: "Contenido", detail: "Solo lo que compraste, desbloqueado" },
]

// PDF, sección 03: "Transformación + cómo funciona".
export function HowItWorksSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="relative border-y border-border bg-card py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
          {pillars.map((pillar, index) => (
            <span key={pillar} className="flex items-center gap-3">
              <span className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-foreground md:text-base">
                {pillar}
              </span>
              {index < pillars.length - 1 && <span className="text-accent">|</span>}
            </span>
          ))}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step.label} className="relative flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-heading text-lg font-bold text-accent">
                {index + 1}
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-foreground">{step.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
