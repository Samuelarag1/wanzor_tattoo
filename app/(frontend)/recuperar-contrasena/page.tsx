"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, MailCheck } from "lucide-react"
import { DemoBadge } from "@/components/academia/demo-badge"
import { siteConfig } from "@/lib/site"

// Demo del flujo "recuperar contraseña" (PDF, sección 04). En producción usa
// el forgot-password de Payload para la colección `students` + email Resend.
export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-heading text-2xl font-bold uppercase tracking-wider text-foreground">
            {siteConfig.brandName}
          </Link>
          <DemoBadge />
        </div>

        {sent ? (
          <div className="mt-16">
            <span className="flex h-14 w-14 items-center justify-center border border-accent/50 bg-accent/10">
              <MailCheck className="h-6 w-6 text-accent" />
            </span>
            <h1 className="mt-8 font-heading text-4xl font-bold uppercase tracking-tight text-foreground">Revisá tu email</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Si <span className="text-foreground">{email}</span> tiene una cuenta, te enviamos un link para crear una
              contraseña nueva.
            </p>
          </div>
        ) : (
          <div className="mt-16">
            <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-foreground">Recuperar contraseña</h1>
            <p className="mt-3 text-sm text-muted-foreground">Ingresá el email con el que compraste.</p>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setSent(true)
              }}
              className="mt-10 space-y-6"
            >
              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tu@email.com"
                  className="mt-2 w-full border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                />
              </label>
              <button
                type="submit"
                className="flex w-full items-center justify-center bg-accent py-4 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                Enviar link
              </button>
            </form>
          </div>
        )}

        <Link
          href="/login"
          className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver a ingresar
        </Link>
      </div>
    </main>
  )
}
