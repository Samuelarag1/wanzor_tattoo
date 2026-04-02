"use client"

import Image from "next/image"
import { Quote, Star } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { siteConfig } from "@/lib/site"

const testimonials = [
  {
    name: "Lucia M.",
    role: "Fine line tattoo artist",
    result: "Empece a cobrar mejor sin sentir culpa y ahora filtro mejor a mis clientes.",
    quote:
      "Sentia que tatuaba bien pero mi negocio iba atrasado. Con la mentoria ordene mensajes, precios y contenido.",
    image: siteConfig.heroImage,
  },
  {
    name: "Tomas R.",
    role: "Blackwork tattoo artist",
    result: "Pase de improvisar a tener un sistema claro para responder, vender y cerrar sesiones.",
    quote:
      "Lo mas valioso fue entender por que no estaba posicionando mi trabajo como correspondia. Ahora todo se siente mas profesional.",
    image: siteConfig.secondaryImage,
  },
  {
    name: "Camila S.",
    role: "Tattoo studio owner",
    result: "Mi perfil se ve mas premium y las consultas llegan mucho mas alineadas con mi estilo.",
    quote:
      "La diferencia no fue solo en precios. Tambien gane direccion, foco y una marca mucho mas coherente.",
    image: siteConfig.heroImage,
  },
]

const cases = [
  "Reposicionamiento de marca para tatuadores con nivel tecnico alto pero baja percepcion de valor.",
  "Mejora del sistema de consultas, seguimiento y cierre para reducir desgaste en mensajes.",
  "Ajuste de precios y propuesta comercial para atraer clientes con mayor presupuesto y mejor encaje.",
]

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.12 })

  return (
    <section className="relative overflow-hidden bg-secondary py-28" aria-labelledby="testimonios-title">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
        backgroundSize: "54px 54px",
      }} />

      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <div className={`max-w-3xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <p className="text-xs uppercase tracking-[0.4em] text-accent">
            Testimonios y casos de exito
          </p>
          <h2
            id="testimonios-title"
            className="mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl"
          >
            Resultados que convierten tecnica en carrera
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Mockeado por ahora, pero pensado para mostrar prueba social, cambio de
            posicionamiento y avances concretos en precios, marca y clientes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className={`group overflow-hidden border border-border bg-card transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 140}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={`Caso de exito mockeado de ${testimonial.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-1 border border-accent/30 bg-background/70 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-accent backdrop-blur">
                  <Star className="h-3 w-3 fill-current" />
                  Caso mockeado
                </div>
              </div>

              <div className="p-7">
                <Quote className="h-7 w-7 text-accent" strokeWidth={1.5} />
                <p className="mt-4 text-base leading-relaxed text-foreground">
                  {testimonial.quote}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {testimonial.result}
                </p>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="font-heading text-xl font-bold uppercase tracking-tight text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.26em] text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {cases.map((item, index) => (
            <div
              key={item}
              className={`border border-border bg-background/70 p-5 text-sm leading-relaxed text-muted-foreground transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${360 + index * 120}ms` }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
