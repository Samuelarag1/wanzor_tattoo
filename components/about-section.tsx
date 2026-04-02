"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { siteConfig } from "@/lib/site"

const aboutImages = [
  {
    src: '/me.png',
    alt: "Wanzor Tatt trabajando en su consultoria para tatuadores",
    caption: "Mentoria enfocada en posicionamiento, criterio y crecimiento real.",
  },
  {
    src: '/profile-2.png',
    alt: "Wanzor Tatt tatuando y desarrollando su marca personal",
    caption: "Experiencia real dentro del oficio, no teoria vacia.",
  },
  {
    src: '/tattoo.jpeg',
    alt: "Wanzor Tatt tatuando y desarrollando su marca personal",
    caption: "Experiencia real dentro del oficio, no teoria vacia.",
  },
]

const pillars = [
  "Mentoria desde la experiencia de quien conoce el mundo del tatuaje por dentro.",
  "Vision de marca, precios y clientes para tatuadores que ya tienen nivel tecnico.",
  "Acompanamiento directo para tomar mejores decisiones y crecer con mas claridad.",
]

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 })
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % aboutImages.length)
    }, 3200)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section id="sobre-wanzor-tatt" className="relative overflow-hidden py-28" aria-labelledby="about-title">
      <div ref={ref} className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <p className="text-xs uppercase tracking-[0.4em] text-accent">
            Sobre {siteConfig.brandName}
          </p>
          <h2
            id="about-title"
            className="mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl"
          >
            Un tatuador guiando a otros tatuadores a crecer mejor
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {siteConfig.brandName} acompana a tatuadores que ya saben tatuar pero necesitan ordenar la
            parte que no siempre se ensena: marca personal, precios, comunicacion,
            posicionamiento y direccion profesional.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            La idea de esta seccion es presentar autoridad de forma cercana, mostrar
            rostro, recorrido y criterio. La imagen esta preparada para ir cambiando
            fotos dentro del mismo marco y despues se puede reemplazar por retratos o
            fotos reales de branding personal.
          </p>

          <div className="mt-8 space-y-4">
            {pillars.map((pillar, index) => (
              <div
                key={pillar}
                className={`border-l-2 border-accent/60 pl-5 text-sm leading-relaxed text-muted-foreground transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {pillar}
              </div>
            ))}
          </div>
        </div>

        <div className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="relative overflow-hidden border border-border bg-card p-4 shadow-2xl shadow-black/20">
            <div className="relative aspect-[4/5] overflow-hidden">
              {aboutImages.map((image, index) => (
                <div
                  key={image.src}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    activeImage === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/10" />
                </div>
              ))}

              <div className="absolute left-5 top-5 border border-accent/30 bg-background/75 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-accent backdrop-blur">
                Perfil {siteConfig.brandName}
              </div>

              <div className="absolute bottom-5 left-5 right-5 border border-border/70 bg-background/80 p-4 backdrop-blur">
                <p className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground">
                  {siteConfig.brandName}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.26em] text-accent">
                  Mentor para tatuadores
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {aboutImages[activeImage]?.caption}
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              {aboutImages.map((image, index) => (
                <button
                  key={`${image.src}-thumb`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`relative h-20 flex-1 overflow-hidden border transition-all ${
                    activeImage === index ? "border-accent" : "border-border"
                  }`}
                  aria-label={`Ver foto ${index + 1} de ${siteConfig.brandName}`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 transition-colors ${
                    activeImage === index ? "bg-transparent" : "bg-background/45"
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
