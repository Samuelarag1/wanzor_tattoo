"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { getMockProduct, formatMockPrice } from "@/lib/mock/academia"

// PDF, sección final del scroll de Home: CTA principal a Academia Completa,
// con la compra individual visible debajo pero sin competir en jerarquía.
export function AcademiaCompletaCta() {
  const { ref, isVisible } = useScrollReveal()
  const product = getMockProduct("completa")
  if (!product) return null

  return (
    <section className="relative py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative overflow-hidden border border-accent/50 bg-accent/[0.04] p-10 text-center md:p-16">
          <div className="absolute -inset-px bg-gradient-to-b from-accent/30 via-accent/5 to-transparent pointer-events-none" />
          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Oferta principal</p>
            <h2 className="mt-4 font-heading text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
              Academia Completa
            </h2>
            <p className="mt-4 text-sm uppercase tracking-widest text-muted-foreground">
              Principiante + Intermedio + Profesional
            </p>
            <p className="mt-6 font-heading text-4xl font-bold text-foreground">{formatMockPrice(product)}</p>

            <Link
              href="/academia/completa"
              className="mt-10 inline-flex items-center justify-center gap-3 bg-accent px-10 py-4 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-all hover:opacity-90"
            >
              Acceder a la Academia Completa
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-6 text-sm text-muted-foreground">
              También podés empezar por{" "}
              <Link href="/academia" className="font-medium text-foreground underline decoration-accent/50 underline-offset-4 hover:text-accent">
                un nivel individual
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
