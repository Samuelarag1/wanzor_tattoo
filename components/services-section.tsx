"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Zap, Flame, Crown, Check, ArrowRight } from "lucide-react"
import { siteConfig } from "@/lib/site"

const levels = [
  {
    icon: Zap,
    name: "Kickstart",
    duration: "45 min",
    tagline: "Empezar",
    description: "Para tatuadores que necesitan ordenar las bases y dar el primer paso con dirección.",
    launchPrice: 49,
    features: [
      "Diagnóstico de tu situación actual.",
      "Ordenamiento de marca.",
      "Plan de acción inicial.",
    ],
    tier: 1,
  },
  {
    icon: Flame,
    name: "Momentum",
    duration: "1 h",
    tagline: "Acelerar",
    description: "Para quienes ya tatúan a un buen nivel pero quieren profesionalizar su marca y escalar su negocio.",
    launchPrice: 99,
    features: [
      "Todo lo del Kickstart.",
      "Plan de acción personalizado.",
      "Sistema de captación de clientes.",
      "Estrategia de precios.",
      "Rendimiento y optimización del tiempo.",
    ],
    tier: 2,
  },
  {
    icon: Crown,
    name: "Mastery",
    duration: "1 h 30 min",
    tagline: "Llegar a nivel experto",
    description: "El camino para vivir del tatuaje y convertirte en un tatuador de referencia en tu zona.",
    launchPrice: 130,
    features: [
      "Todo lo del Kickstart y Momentum.",
      "Seguimiento",
      "Estrategia de marca avanzada.",
      "Posicionamiento como profesional.",
      "Uso de inteligencia artificial.",
      "Mindset y enfoque.",
      "Desarrollo de marketing y ventas.",
      "Grupo de WhatsApp para miembros del pack Mastery.",
    ],
    tier: 3,
  },
]

export function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()

  return (
    <section id="servicios" className="relative py-32 overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="text-center">
          <p
            className={`text-xs uppercase tracking-[0.4em] text-accent transition-all duration-700 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Elegí tu pack
          </p>
          <h2
            className={`mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl lg:text-7xl transition-all duration-1000 delay-200 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Packs
          </h2>
          <p
            className={`mt-6 mx-auto max-w-lg text-base text-muted-foreground transition-all duration-700 delay-400 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Tres caminos para empezar, acelerar o llevar tu carrera a un nivel experto.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {levels.map((level, i) => (
            <LevelCard key={i} level={level} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LevelCard({
  level,
  index,
}: {
  level: (typeof levels)[number]
  index: number
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 })
  const Icon = level.icon
  const isFeatured = level.tier === 2
  const originalPrice = Math.round(level.launchPrice / 0.7)

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Glow effect for featured card */}
      {isFeatured && (
        <div className="absolute -inset-px bg-gradient-to-b from-accent/40 via-accent/10 to-transparent pointer-events-none" />
      )}

      <div className={`relative flex flex-1 flex-col border ${
        isFeatured
          ? "border-accent/50 bg-accent/[0.03]"
          : "border-border bg-card"
      }`}>
        {/* Tier label */}
        {isFeatured && (
          <div className="bg-accent text-accent-foreground px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.3em]">
            Más popular
          </div>
        )}

        <div className="flex flex-1 flex-col p-8 md:p-10">
          {/* Icon + tier number */}
          <div className="flex items-center justify-between">
            <div className={`flex h-14 w-14 items-center justify-center border transition-colors ${
              isFeatured ? "border-accent/40 bg-accent/10" : "border-border group-hover:border-accent/30"
            }`}>
              <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
            </div>
            <span className="font-heading text-5xl font-bold text-foreground/[0.06]">
              {String(level.tier).padStart(2, "0")}
            </span>
          </div>

          {/* Name + tagline */}
          <h3 className="mt-8 font-heading text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">
            {level.name}
            <span className="ml-3 align-middle whitespace-nowrap text-base font-sans font-semibold normal-case tracking-normal text-accent md:text-lg">
              {level.duration}
            </span>
          </h3>
          <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-accent">
            {level.tagline}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {level.description}
          </p>

          <div className="mt-7 border-t border-border/80 pt-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                  Lanzamiento
                </p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="pb-2 text-xs uppercase tracking-[0.28em] text-accent">
                    USD
                  </span>
                  <p className="font-heading text-6xl font-bold leading-none tracking-tight text-foreground">
                    {level.launchPrice}
                  </p>
                </div>
              </div>

              <div className="pt-1 text-right">
                <p className="text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                  Antes
                </p>
                <p className="mt-2 text-base text-muted-foreground/75 line-through decoration-accent/50 decoration-2">
                  USD {originalPrice}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-border" />

          {/* Features */}
          <ul className="flex flex-1 flex-col gap-3.5">
            {level.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2.5} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={siteConfig.bookingUrl || "#contacto"}
            target={siteConfig.bookingUrl ? "_blank" : undefined}
            rel={siteConfig.bookingUrl ? "noopener noreferrer" : undefined}
            className={`mt-10 inline-flex items-center justify-center gap-3 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
              isFeatured
                ? "bg-accent text-accent-foreground hover:opacity-90"
                : "border border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
            }`}
          >
            Elegir {level.name}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  )
}
