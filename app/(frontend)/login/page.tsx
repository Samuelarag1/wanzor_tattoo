import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { LoginForm } from "@/components/academia/login-form"
import { DemoBadge } from "@/components/academia/demo-badge"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Ingresar",
  robots: { index: false, follow: false },
}

type SearchParams = Promise<{ email?: string }>

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const { email } = await searchParams

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <Image src="/profile-2.png" alt="" fill priority sizes="50vw" className="object-cover" style={{ objectPosition: "50% 35%" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <div className="absolute bottom-16 left-14 right-14">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Academia {siteConfig.brandName}</p>
          <p className="mt-4 font-heading text-5xl font-bold uppercase leading-[0.95] tracking-tight text-foreground">
            Mejorar no es
            <br />
            <span className="text-accent">casualidad</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-16 sm:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-heading text-2xl font-bold uppercase tracking-wider text-foreground">
              {siteConfig.brandName}
            </Link>
            <DemoBadge />
          </div>

          <h1 className="mt-16 font-heading text-4xl font-bold uppercase tracking-tight text-foreground">Ingresar</h1>
          <p className="mt-3 text-sm text-muted-foreground">Entrá a tu panel para continuar tus cursos.</p>

          <div className="mt-10">
            <LoginForm defaultEmail={email} />
          </div>

          <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
            ¿Todavía no sos alumno?{" "}
            <Link href="/academia" className="text-foreground underline decoration-accent/50 underline-offset-4 hover:text-accent">
              Conocé la Academia
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
