import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { LevelCard } from "@/components/academia/level-card"
import { ComparisonTable } from "@/components/academia/comparison-table"
import { mockLevels, mockProducts, getMockProduct, formatMockPrice } from "@/lib/mock/academia"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Academia",
  description: `Academia digital de ${siteConfig.brandName}: tres niveles de formación para tatuadores, de la base técnica a la construcción de carrera y negocio.`,
}

export default function AcademiaPage() {
  const bundle = getMockProduct("completa")

  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Academia {siteConfig.brandName}</p>
          <h1 className="mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl">
            Un recorrido, tres niveles
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Desde entrar al mundo del tatuaje hasta convertirlo en una carrera sostenible.
          </p>
        </section>

        <section className="mx-auto mt-16 max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {mockLevels.map((level, index) => {
              const product = mockProducts.find((p) => p.type === "level" && p.levelSlugs.includes(level.slug))
              if (!product) return null
              return <LevelCard key={level.slug} level={level} product={product} index={index} />
            })}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Comparación rápida</p>
          <h2 className="mt-4 font-heading text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">
            ¿Cuál nivel es para mí?
          </h2>
          <div className="mt-8">
            <ComparisonTable />
          </div>
        </section>

        {bundle && (
          <section className="mx-auto max-w-4xl px-6 pb-28">
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
                <p className="mt-6 font-heading text-4xl font-bold text-foreground">{formatMockPrice(bundle)}</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  El camino más completo y conveniente. No oculta la posibilidad de comprar cada nivel por separado.
                </p>
                <Link
                  href="/academia/completa"
                  className="mt-8 inline-flex items-center justify-center gap-3 bg-accent px-10 py-4 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-all hover:opacity-90"
                >
                  Acceder / Comprar
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsappButton />
    </>
  )
}
