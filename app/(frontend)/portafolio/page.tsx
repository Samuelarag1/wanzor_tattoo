import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRight, Instagram } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Portafolio",
  description: `Trabajos de ${siteConfig.brandName}.`,
}

const studioShots = [
  { src: "/profile-2.png", position: "50% 35%", caption: "Sesión en estudio" },
  { src: "/tatuas_bien.png", position: "50% 40%", caption: "Proceso" },
  { src: "/hero.png", position: "50% 30%", caption: "Diseño y preparación" },
]

// Galería inicial con el material disponible; se amplía cuando lleguen más
// fotos de trabajos (ver PENDIENTES-ACADEMIA.md).
export default function PortafolioPage() {
  return (
    <>
      <Navbar />
      <main className="pb-28 pt-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-accent">Portafolio</p>
              <h1 className="mt-4 font-heading text-5xl font-bold uppercase leading-[0.9] tracking-tight text-foreground md:text-7xl">
                El trabajo
                <br />
                <span className="text-accent">habla solo</span>
              </h1>
            </div>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 self-start border border-foreground/20 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background md:self-auto"
            >
              <Instagram className="h-4 w-4" /> Ver más en Instagram
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <figure className="group relative aspect-[4/5] overflow-hidden border border-border lg:aspect-auto lg:min-h-[720px]">
              <Image
                src="/tattoo.jpeg"
                alt="Tatuaje realista black and grey de Wanzor Tatt"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                style={{ objectPosition: "50% 40%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <figcaption className="absolute bottom-8 left-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Trabajo destacado</p>
                <p className="mt-2 font-heading text-3xl font-bold uppercase text-foreground">Realismo black &amp; grey</p>
              </figcaption>
            </figure>

            <div className="grid gap-6 lg:grid-rows-3">
              {studioShots.map((shot) => (
                <figure key={shot.src} className="group relative aspect-[16/10] overflow-hidden border border-border lg:aspect-auto">
                  <Image
                    src={shot.src}
                    alt={shot.caption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    style={{ objectPosition: shot.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <figcaption className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </>
  )
}
