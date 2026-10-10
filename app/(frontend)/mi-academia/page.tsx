import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock, FileText, GraduationCap, Layers, Lock, Play, PlayCircle, TrendingUp } from "lucide-react"
import { StudentHeader } from "@/components/academia/student-header"
import {
  demoStudent,
  getLevelProgress,
  getLevelStats,
  isLessonCompleted,
  isMockLevelUnlocked,
  mockLevels,
} from "@/lib/mock/academia"

export const metadata: Metadata = {
  title: "Mi Academia",
  robots: { index: false, follow: false },
}

const pad = (value: number) => String(value).padStart(2, "0")

// Panel privado del alumno (PDF, sección 04). Demo sin login real: el
// alumno de ejemplo y su progreso salen de lib/mock/academia.ts.
export default function MiAcademiaPage() {
  const unlockedLevels = mockLevels.filter((level) => isMockLevelUnlocked(level.slug))
  const current = unlockedLevels[0]
  const progress = current ? getLevelProgress(current) : undefined
  const next = progress?.next
  const nextModuleIndex = current && next ? current.modules.indexOf(next.courseModule) : 0

  const completedLessons = unlockedLevels.reduce((total, level) => total + getLevelProgress(level).completed, 0)
  const minutesWatched = unlockedLevels.reduce(
    (total, level) =>
      total +
      level.modules
        .flatMap((m) => m.lessons)
        .filter((lesson) => isLessonCompleted(level.slug, lesson.slug))
        .reduce((sum, lesson) => sum + Number(lesson.duration?.match(/(\d+)/)?.[1] ?? 0), 0),
    0,
  )
  const lockedCount = mockLevels.length - unlockedLevels.length

  return (
    <div className="min-h-screen">
      <StudentHeader active="cursos" />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-12">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">Mi Academia</p>
        <h1 className="mt-3 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
          Hola, {demoStudent.name.split(" ")[0]}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tenés {unlockedLevels.length} de {mockLevels.length} niveles activos. Seguí donde lo dejaste.
        </p>

        {/* Continuar */}
        {current && next && progress && (
          <Link
            href={`/mi-academia/${current.slug}/${next.lesson.slug}`}
            className="group mt-10 grid overflow-hidden border border-accent/40 bg-card transition-colors hover:border-accent md:grid-cols-[1.1fr_1fr]"
          >
            <div className="relative aspect-video md:aspect-auto md:min-h-[300px]">
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: current.imagePosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80" />
              <div className="absolute inset-0 bg-background/30" />
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_0_60px_rgba(214,176,76,0.35)] transition-transform group-hover:scale-110">
                {next.lesson.kind === "pdf" ? <FileText className="h-6 w-6" /> : <Play className="ml-1 h-6 w-6" fill="currentColor" />}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
                Continuá donde lo dejaste
              </p>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
                {current.title} · Módulo {pad(nextModuleIndex + 1)} · {next.courseModule.title}
              </p>
              <p className="mt-2 font-heading text-3xl font-bold uppercase leading-tight tracking-tight text-foreground">
                {next.lesson.title}
              </p>
              <div className="mt-8">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  <span>Progreso del nivel</span>
                  <span className="text-foreground">{progress.percent}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full bg-border">
                  <div className="h-full bg-accent" style={{ width: `${progress.percent}%` }} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {progress.completed} de {progress.total} lecciones completadas
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-3 self-start bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground">
                Continuar lección
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}

        {/* Métricas */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Metric icon={GraduationCap} value={`${unlockedLevels.length}/${mockLevels.length}`} label="Niveles activos" />
          <Metric icon={CheckCircle2} value={pad(completedLessons)} label="Lecciones completadas" />
          <Metric icon={Clock} value={`${minutesWatched} min`} label="Contenido visto" />
          <Metric icon={TrendingUp} value={`${progress?.percent ?? 0}%`} label="Avance actual" />
        </div>

        {/* Niveles */}
        <div className="mt-16 flex items-end justify-between">
          <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">Mis niveles</h2>
          <Link href="/academia" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-accent">
            Ver catálogo
          </Link>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {mockLevels.map((level) => {
            const unlocked = isMockLevelUnlocked(level.slug)
            const stats = getLevelStats(level)
            const levelProgress = getLevelProgress(level)
            return (
              <div
                key={level.slug}
                className={`group flex flex-col overflow-hidden border ${unlocked ? "border-accent/50 bg-card" : "border-border bg-card/60"}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={level.image}
                    alt={level.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${unlocked ? "" : "grayscale opacity-60"}`}
                    style={{ objectPosition: level.imagePosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  <span
                    className={`absolute left-4 top-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
                      unlocked ? "bg-accent text-accent-foreground" : "border border-white/15 bg-background/70 text-muted-foreground backdrop-blur"
                    }`}
                  >
                    {unlocked ? "Activo" : "Bloqueado"}
                  </span>
                  {!unlocked && (
                    <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-background/70 backdrop-blur">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Nivel {pad(level.order)}</p>
                  <p className="mt-1 font-heading text-2xl font-bold uppercase tracking-tight text-foreground">{level.title}</p>
                  <p className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-accent" />
                      {stats.modules} módulos
                    </span>
                    <span className="flex items-center gap-1.5">
                      <PlayCircle className="h-3.5 w-3.5 text-accent" />
                      {stats.lessons} lecciones
                    </span>
                  </p>

                  <div className="mt-auto pt-6">
                    {unlocked ? (
                      <>
                        <div className="h-1 w-full bg-border">
                          <div className="h-full bg-accent" style={{ width: `${levelProgress.percent}%` }} />
                        </div>
                        <p className="mt-2 text-[11px] text-muted-foreground">{levelProgress.percent}% completado</p>
                        <Link
                          href={`/mi-academia/${level.slug}`}
                          className="mt-5 flex items-center justify-center gap-2 whitespace-nowrap bg-accent py-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
                        >
                          Ir al curso <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={`/academia/${level.slug}`}
                        className="flex items-center justify-center gap-2 whitespace-nowrap border border-foreground/20 py-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
                      >
                        <Lock className="h-3.5 w-3.5" /> Desbloquear nivel
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {lockedCount > 0 && (
          <Link
            href="/academia/completa"
            className="group mt-8 flex flex-col items-start justify-between gap-6 border border-accent/40 bg-accent/[0.04] p-8 transition-colors hover:bg-accent/[0.08] md:flex-row md:items-center"
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Academia Completa</p>
              <p className="mt-2 font-heading text-2xl font-bold uppercase tracking-tight text-foreground">
                Desbloqueá los {mockLevels.length} niveles en un solo acceso
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-3 bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground">
              Ver oferta <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        )}
      </main>
    </div>
  )
}

function Metric({ icon: Icon, value, label }: { icon: typeof Clock; value: string; label: string }) {
  return (
    <div className="flex items-center gap-4 border border-border bg-card p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent/30 bg-accent/10">
        <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
      </span>
      <div>
        <p className="font-heading text-2xl font-bold leading-none text-foreground">{value}</p>
        <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}
