import Link from "next/link"
import { LogOut } from "lucide-react"
import { DemoBadge } from "@/components/academia/demo-badge"
import { demoStudent } from "@/lib/mock/academia"
import { siteConfig } from "@/lib/site"

// Barra superior del área privada: distinta de la navbar pública para que
// quede claro que el alumno está dentro de la plataforma.
export function StudentHeader({ active = "cursos" }: { active?: "cursos" | "catalogo" }) {
  const initials = demoStudent.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const linkClass = (isActive: boolean) =>
    `relative py-5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
      isActive ? "text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-accent" : "text-muted-foreground hover:text-foreground"
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 py-4">
            <span className="font-heading text-xl font-bold uppercase tracking-wider text-foreground">{siteConfig.brandName}</span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-accent sm:block">Academia</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/mi-academia" className={linkClass(active === "cursos")}>
              Mis cursos
            </Link>
            <Link href="/academia" className={linkClass(active === "catalogo")}>
              Catálogo
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden lg:block">
            <DemoBadge label="Alumno de ejemplo" />
          </span>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-xs font-bold text-accent">
              {initials}
            </span>
            <span className="hidden text-sm text-foreground sm:block">{demoStudent.name}</span>
          </div>
          <Link
            href="/"
            aria-label="Cerrar sesión"
            className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
