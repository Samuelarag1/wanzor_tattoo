"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { siteConfig } from "@/lib/site"

const aboutImages = [
  {
    src: '/me.png',
    alt: "Wanzor Tatt trabajando en su consultoría para tatuadores",
    caption: "Mentoría enfocada en posicionamiento, criterio y crecimiento real.",
  },
  {
    src: '/profile-2.png',
    alt: "Wanzor Tatt tatuando y desarrollando su marca personal",
    caption: "Experiencia real dentro del oficio, no teoría vacía.",
  },
  {
    src: '/tattoo.jpeg',
    alt: "Wanzor Tatt tatuando y desarrollando su marca personal",
    caption: "Experiencia real dentro del oficio, no teoría vacía.",
  },
]

const aboutParagraphs = [
  "Mi nombre es Wanzor. Me dedico al tatuaje desde el 2015.",
  "A lo largo del tiempo he desarrollado diferentes técnicas, estilos y maneras de ver la profesión, que creo que pueden ser de mucha utilidad para quienes estén interesados en formarse como artistas profesionales del tatuaje y para quienes quieran vivir de esto.",
  "Después de una larga carrera apostando todos los días a esta profesión, me di cuenta de que no solo se trata del aspecto artístico. Una mente nutrida y un cuerpo sano es tan importante como una línea prolija o un relleno sólido.",
  "No alcanza con tatuar bien. Para poder llevar tu trabajo al siguiente nivel necesitás conocimientos que parecen secundarios, pero no lo son. Ventas, marketing, comunicación, psicología, inteligencia artificial, mindfulness, agenda, organización... Estos son algunos de los temas que estudio y aplico cada día en mi marca personal, y con los que vamos a estar trabajando en la asesoría con tu caso.",
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
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Sobre mí</p>
          <h2
            id="about-title"
            className="mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl"
          >
            No presumo premios porque no los tengo...
          </h2>
          <blockquote className="mt-6 border-l-2 border-accent/60 pl-5">
            <p className="text-base leading-relaxed text-foreground md:text-lg">
              Muestro lo que hago todos los días, que es vivir del arte y para el arte.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
              Por eso lo enseño.
            </p>
          </blockquote>

          <div className="mt-8 space-y-4">
            {aboutParagraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`text-sm leading-relaxed text-muted-foreground transition-all duration-700 md:text-base ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {paragraph}
              </p>
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
