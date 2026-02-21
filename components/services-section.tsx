"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { MessageSquare, Users, Layers } from "lucide-react"

const services = [
  {
    icon: MessageSquare,
    title: "Mentoria 1 a 1",
    description:
      "Sesiones personalizadas donde trabajamos tu marca, tus precios, tu estrategia de contenido y tu sistema de captacion de clientes.",
    tag: "Individual",
  },
  {
    icon: Users,
    title: "Grupo de Mentorias",
    description:
      "Acceso a un grupo exclusivo donde compartes experiencias, aprendes de otros tatuadores y creces en comunidad.",
    tag: "Grupal",
  },
  {
    icon: Layers,
    title: "Asesoramiento Online",
    description:
      "Una consulta puntual para resolver esa duda que te frena. Precios, marca, redes, estrategia. Sin compromiso a largo plazo.",
    tag: "Puntual",
  },
]

export function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()

  return (
    <section id="servicios" className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="text-center">
          <p
            className={`text-xs uppercase tracking-[0.4em] text-accent transition-all duration-700 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Te ofrezco 3 maneras diferentes de ayudarte
          </p>
          <h2
            className={`mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl lg:text-7xl transition-all duration-1000 delay-200 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Servicios
          </h2>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number]
  index: number
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const Icon = service.icon

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col border border-border bg-card p-8 transition-all duration-700 hover:border-accent/40 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Tag */}
      <span className="mb-6 inline-block self-start bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
        {service.tag}
      </span>

      <div className="mb-6 flex h-12 w-12 items-center justify-center border border-border transition-colors group-hover:border-accent/40">
        <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
      </div>

      <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-foreground">
        {service.title}
      </h3>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      <a
        href="#contacto"
        className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:text-accent"
      >
        Saber mas
        <span className="transition-transform group-hover:translate-x-1">{"→"}</span>
      </a>
    </div>
  )
}
