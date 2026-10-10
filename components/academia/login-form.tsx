"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { demoStudent } from "@/lib/mock/academia"

// Demo: cualquier email/contraseña entra al panel del alumno de ejemplo.
// En producción esto llama al login de la colección `students` de Payload.
export function LoginForm({ defaultEmail }: { defaultEmail?: string }) {
  const router = useRouter()
  const [email, setEmail] = useState(defaultEmail ?? demoStudent.email)
  const [password, setPassword] = useState("demo1234")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setTimeout(() => router.push("/mi-academia"), 600)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <label className="block">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-2 w-full border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
        />
      </label>

      <label className="block">
        <span className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Contraseña</span>
          <Link href="/recuperar-contrasena" className="text-[11px] text-muted-foreground transition-colors hover:text-accent">
            ¿Olvidaste tu contraseña?
          </Link>
        </span>
        <span className="relative mt-2 block">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-border bg-background px-4 py-3.5 pr-12 text-sm text-foreground outline-none transition-colors focus:border-accent"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="group flex w-full items-center justify-center gap-3 bg-accent py-4 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-70"
      >
        {loading ? "Ingresando…" : "Ingresar"}
        {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
      </button>
    </form>
  )
}
