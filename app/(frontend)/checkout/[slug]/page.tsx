import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, Lock, ShieldCheck } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DemoBadge } from "@/components/academia/demo-badge"
import { CheckoutSteps } from "@/components/academia/checkout-steps"
import {
  bundleImage,
  demoStudent,
  formatMockPrice,
  getLevelsForProduct,
  getMockProduct,
  mockProducts,
  sumStats,
} from "@/lib/mock/academia"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return mockProducts.map((product) => ({ slug: product.slug }))
}

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
}

// Simulación del paso "Compra" del PDF. En producción este botón crea una
// preferencia de Mercado Pago (Checkout Pro) y redirige al checkout hosteado;
// la cuenta se crea después, desde el webhook, con el email ingresado acá.
export default async function CheckoutPage({ params }: { params: Params }) {
  const { slug } = await params
  const product = getMockProduct(slug)
  if (!product) notFound()

  const levels = getLevelsForProduct(product)
  const stats = sumStats(levels)
  const isBundle = product.type === "bundle"
  const cover = isBundle ? bundleImage : { src: levels[0].image, position: levels[0].imagePosition }

  return (
    <>
      <Navbar />
      <main className="pb-28 pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`/academia/${product.slug}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver a {product.title}
            </Link>
            <DemoBadge label="Checkout de demostración" />
          </div>

          <h1 className="mt-8 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl">
            Finalizar compra
          </h1>

          <CheckoutSteps current={0} />

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_400px]">
            <form action={`/checkout/${product.slug}/aprobado`} method="get" className="space-y-10">
              <fieldset>
                <legend className="font-heading text-xl font-bold uppercase tracking-tight text-foreground">
                  1 · Tus datos
                </legend>
                <p className="mt-2 text-sm text-muted-foreground">
                  Con este email se crea tu cuenta y te llega el acceso a la Academia.
                </p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field label="Nombre" name="nombre" placeholder="Tu nombre" defaultValue={demoStudent.name} />
                  <Field label="Email" name="email" type="email" placeholder="tu@email.com" defaultValue={demoStudent.email} />
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-heading text-xl font-bold uppercase tracking-tight text-foreground">
                  2 · Medio de pago
                </legend>
                <label className="mt-6 flex cursor-pointer items-center justify-between gap-4 border border-accent/60 bg-accent/[0.05] p-5">
                  <span className="flex items-center gap-4">
                    <input type="radio" name="medio" value="mercadopago" defaultChecked className="h-4 w-4 accent-[oklch(0.75_0.08_85)]" />
                    <span>
                      <span className="block text-sm font-semibold text-foreground">Mercado Pago</span>
                      <span className="block text-xs text-muted-foreground">
                        Tarjeta de crédito, débito o dinero en cuenta
                      </span>
                    </span>
                  </span>
                  <ShieldCheck className="h-5 w-5 text-accent" />
                </label>
                <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                  Vas a completar el pago en el sitio seguro de Mercado Pago.
                </p>
              </fieldset>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 bg-accent py-5 text-sm font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90 sm:w-auto sm:px-14"
              >
                Pagar con Mercado Pago
              </button>
            </form>

            <aside className="h-fit border border-border bg-card lg:sticky lg:top-28">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image src={cover.src} alt={product.title} fill sizes="400px" className="object-cover" style={{ objectPosition: cover.position }} />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Tu pedido</p>
                <p className="mt-2 font-heading text-2xl font-bold uppercase tracking-tight text-foreground">{product.title}</p>
                <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
                  {levels.map((level) => (
                    <li key={level.slug} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-accent" strokeWidth={2.5} />
                      Nivel {level.title}
                    </li>
                  ))}
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-accent" strokeWidth={2.5} />
                    {stats.lessons} lecciones · ~{stats.minutes} min de video
                  </li>
                </ul>
                <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Total</span>
                  <span className="font-heading text-3xl font-bold text-foreground">{formatMockPrice(product)}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
}: {
  label: string
  name: string
  type?: string
  placeholder: string
  defaultValue?: string
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required
        className="mt-2 w-full border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
      />
    </label>
  )
}
