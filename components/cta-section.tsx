"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { siteConfig } from "@/lib/site"

export function CtaSection() {
  const { ref, isVisible } = useScrollReveal()
  const contactEmailHref = `mailto:${encodeURIComponent(siteConfig.contactEmail)}`

  return (
    <section id="contacto" className="relative py-32 overflow-hidden">
      <div ref={ref} className="mx-auto max-w-4xl px-6 text-center">
        <p
          className={`text-xs uppercase tracking-[0.4em] text-accent transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Da el primer paso
        </p>

        <h2
          className={`mt-6 font-heading text-4xl font-bold uppercase leading-none tracking-tight text-foreground md:text-6xl lg:text-8xl transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block">¿Estás listo</span>
          <span className="block text-accent">{"para crecer?"}</span>
        </h2>

        <p
          className={`mt-8 mx-auto max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Reserva tu llamada sin compromiso. Hablemos de dónde estás, dónde querés llegar y cómo puedo ayudarte a cobrar lo que valés.
        </p>

        <div
          className={`mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href={siteConfig.bookingUrl || siteConfig.whatsappUrl}
            target={siteConfig.bookingUrl ? undefined : "_blank"}
            rel={siteConfig.bookingUrl ? undefined : "noopener noreferrer"}
            className="group relative overflow-hidden bg-accent text-accent-foreground px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:opacity-90"
          >
            <span className="relative z-10">Agendar llamada</span>
          </a>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-foreground/20 px-10 py-4 text-sm font-semibold uppercase tracking-widest text-foreground transition-all hover:bg-foreground hover:text-background"
          >
            Escribirme por WhatsApp
          </a>
        </div>

        <p
          className={`mt-6 text-sm text-muted-foreground transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Mail para asesorías:{" "}
          <a
            href={contactEmailHref}
            className="font-medium text-foreground transition-colors hover:text-accent"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
      </div>
    </section>
  )
}
