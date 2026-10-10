import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, Mail } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DemoBadge } from "@/components/academia/demo-badge"
import { CheckoutSteps } from "@/components/academia/checkout-steps"
import { demoStudent, getLevelsForProduct, getMockProduct } from "@/lib/mock/academia"
import { siteConfig } from "@/lib/site"

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ email?: string; nombre?: string }>

export const metadata: Metadata = {
  title: "Pago aprobado",
  robots: { index: false, follow: false },
}

// Simula la vuelta desde Mercado Pago con el pago aprobado. En producción,
// lo que habilita la cuenta es el webhook (no esta página): acá solo se
// muestra el resultado y el email transaccional que recibe el alumno.
export default async function CheckoutApprovedPage({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = await params
  const { email, nombre } = await searchParams
  const product = getMockProduct(slug)
  if (!product) notFound()

  const levels = getLevelsForProduct(product)
  const studentEmail = email || demoStudent.email
  const studentName = nombre || demoStudent.name

  return (
    <>
      <Navbar />
      <main className="pb-28 pt-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex justify-end">
            <DemoBadge label="Checkout de demostración" />
          </div>

          <CheckoutSteps current={3} />

          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <span className="flex h-16 w-16 items-center justify-center border border-accent/50 bg-accent/10">
                <Check className="h-8 w-8 text-accent" strokeWidth={2.5} />
              </span>
              <h1 className="mt-8 font-heading text-5xl font-bold uppercase leading-[0.95] tracking-tight text-foreground md:text-6xl">
                ¡Pago aprobado!
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Tu cuenta ya está habilitada con acceso a{" "}
                <span className="text-foreground">{levels.map((level) => level.title).join(", ")}</span>. Te enviamos
                un email a <span className="text-foreground">{studentEmail}</span> para crear tu contraseña.
              </p>

              <ul className="mt-8 space-y-3 border-y border-border py-6 text-sm">
                {["Pago confirmado por Mercado Pago", "Cuenta de alumno creada", "Permisos asignados al nivel comprado", "Email de acceso enviado"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 text-foreground/90">
                      <Check className="h-4 w-4 text-accent" strokeWidth={2.5} />
                      {item}
                    </li>
                  ),
                )}
              </ul>

              <Link
                href={`/login?email=${encodeURIComponent(studentEmail)}`}
                className="group mt-10 inline-flex items-center justify-center gap-3 bg-accent px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                Ingresar a Mi Academia
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Vista previa del email transaccional */}
            <div className="border border-border bg-card shadow-2xl shadow-black/40">
              <div className="flex items-center gap-3 border-b border-border px-6 py-4">
                <Mail className="h-4 w-4 text-accent" />
                <div className="min-w-0 text-xs">
                  <p className="truncate text-foreground">Tu acceso a la Academia {siteConfig.brandName}</p>
                  <p className="truncate text-muted-foreground">Para: {studentEmail}</p>
                </div>
              </div>
              <div className="p-8">
                <p className="font-heading text-2xl font-bold uppercase tracking-wider text-foreground">
                  {siteConfig.brandName}
                </p>
                <div className="mt-2 h-px w-12 bg-accent" />
                <p className="mt-8 text-sm text-foreground">Hola {studentName},</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Tu compra de <span className="text-foreground">{product.title}</span> fue aprobada. Ya podés
                  entrar a tu panel y empezar a estudiar.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Para ingresar, creá tu contraseña desde el siguiente botón:
                </p>
                <span className="mt-6 inline-block bg-accent px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-foreground">
                  Crear mi contraseña
                </span>
                <p className="mt-8 border-t border-border pt-5 text-[11px] leading-relaxed text-muted-foreground">
                  Tu usuario es tu email. El acceso es personal: no compartas tus credenciales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
