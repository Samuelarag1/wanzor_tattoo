import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Layers, Lock, PlayCircle, Clock } from "lucide-react"
import { StudentHeader } from "@/components/academia/student-header"
import { CourseOutline } from "@/components/academia/course-outline"
import { getLevelProgress, getLevelStats, getMockLevel, isMockLevelUnlocked, mockLevels } from "@/lib/mock/academia"

type Params = Promise<{ levelSlug: string }>

export function generateStaticParams() {
  return mockLevels.map((level) => ({ levelSlug: level.slug }))
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

const pad = (value: number) => String(value).padStart(2, "0")

// Vista del curso para el alumno. Si el nivel no está comprado se muestra
// bloqueado aunque se entre por URL directa — en producción lo valida el
// servidor con el control de acceso de Payload, no solo la interfaz.
export default async function MiAcademiaLevelPage({ params }: { params: Params }) {
  const { levelSlug } = await params
  const level = getMockLevel(levelSlug)
  if (!level) notFound()

  const unlocked = isMockLevelUnlocked(levelSlug)
  const stats = getLevelStats(level)
  const progress = getLevelProgress(level)

  return (
    <div className="min-h-screen">
      <StudentHeader active="cursos" />

      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={level.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`object-cover ${unlocked ? "opacity-40" : "opacity-20 grayscale"}`}
            style={{ objectPosition: level.imagePosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <Link
            href="/mi-academia"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Mis cursos
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.4em] text-accent">Nivel {pad(level.order)}</p>
          <h1 className="mt-3 font-heading text-5xl font-bold uppercase tracking-tight text-foreground md:text-7xl">{level.title}</h1>
          <p className="mt-3 font-heading text-lg uppercase tracking-wide text-muted-foreground">{level.tagline}</p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-accent" /> {stats.modules} módulos
            </span>
            <span className="flex items-center gap-1.5">
              <PlayCircle className="h-3.5 w-3.5 text-accent" /> {stats.lessons} lecciones
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-accent" /> ~{stats.minutes} min
            </span>
          </p>

          {unlocked && (
            <div className="mt-10 flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex-1">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  <span>Tu progreso</span>
                  <span className="text-foreground">
                    {progress.completed}/{progress.total} · {progress.percent}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full bg-border">
                  <div className="h-full bg-accent" style={{ width: `${progress.percent}%` }} />
                </div>
              </div>
              {progress.next && (
                <Link
                  href={`/mi-academia/${level.slug}/${progress.next.lesson.slug}`}
                  className="group inline-flex shrink-0 items-center justify-center gap-3 bg-accent px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-14">
        {unlocked ? (
          <div className="max-w-4xl">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground">Contenido del curso</h2>
            <div className="mt-6">
              <CourseOutline level={level} />
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-2xl flex-col items-center border border-border bg-card px-8 py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background">
              <Lock className="h-6 w-6 text-muted-foreground" />
            </span>
            <p className="mt-6 font-heading text-3xl font-bold uppercase tracking-tight text-foreground">
              Este nivel está bloqueado
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Todavía no tenés acceso a {level.title}. Cuando lo compres, se desbloquea automáticamente en tu cuenta.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/academia/${level.slug}`}
                className="inline-flex items-center justify-center gap-2 bg-accent px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                Desbloquear {level.title}
              </Link>
              <Link
                href="/academia/completa"
                className="inline-flex items-center justify-center border border-foreground/20 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Ver Academia Completa
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
