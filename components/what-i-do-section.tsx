"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { siteConfig } from "@/lib/site"

export function WhatIDoSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <section className="relative py-32 overflow-hidden bg-secondary">
      {/* Top accent */}
      <div className="absolute top-0 left-1/2 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-accent/40" />

      <div className="mx-auto max-w-4xl px-6 text-center">
        <div ref={headerRef}>
          <p
            className={`text-xs uppercase tracking-[0.4em] text-accent transition-all duration-700 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {siteConfig.brandName}
          </p>
          <h2
            className={`mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl lg:text-7xl transition-all duration-1000 delay-200 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {"¿Qué hago?"}
          </h2>
        </div>

        <div
          ref={contentRef}
          className={`mt-12 transition-all duration-1000 delay-300 ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl leading-relaxed text-muted-foreground md:text-2xl">
            Te ayudo a{" "}
            <span className="font-heading font-bold uppercase text-accent">
              cobrar lo que valés
            </span>{" "}
            y{" "}
            <span className="font-heading font-bold uppercase text-accent">
              potenciar tu marca
            </span>
            .
          </p>

          <div className="mt-12 flex flex-col gap-6 md:flex-row md:justify-center md:gap-12">
            <StatBlock
              number="1 a 1"
              label="Asesorías personalizadas"
              delay={400}
              visible={contentVisible}
            />
            <div className="hidden md:block w-px bg-border" />
            <StatBlock
              number="100%"
              label="Métodos prácticos y reales"
              delay={600}
              visible={contentVisible}
            />
            <div className="hidden md:block w-px bg-border" />
            <StatBlock
              number="360"
              label="Estrategia integral"
              delay={800}
              visible={contentVisible}
            />
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-1/2 h-24 w-px -translate-x-1/2 bg-gradient-to-t from-transparent to-accent/40" />
    </section>
  )
}

function StatBlock({
  number,
  label,
  delay,
  visible,
}: {
  number: string
  label: string
  delay: number
  visible: boolean
}) {
  return (
    <div
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="font-heading text-4xl font-bold text-accent md:text-5xl">{number}</p>
      <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  )
}
