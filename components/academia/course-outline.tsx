import Link from "next/link"
import { CheckCircle2, Circle, FileText, PlayCircle } from "lucide-react"
import { getLevelProgress, getLevelStats, isLessonCompleted, type MockLevel } from "@/lib/mock/academia"

const pad = (value: number) => String(value).padStart(2, "0")

// Temario del alumno con el estado de cada lección. `full` para la vista del
// curso, `compact` para la barra lateral del reproductor.
export function CourseOutline({
  level,
  currentLessonSlug,
  variant = "full",
}: {
  level: MockLevel
  currentLessonSlug?: string
  variant?: "full" | "compact"
}) {
  const nextSlug = getLevelProgress(level).next?.lesson.slug
  const compact = variant === "compact"

  return (
    <div className={compact ? "space-y-6" : "space-y-5"}>
      {level.modules.map((courseModule, moduleIndex) => {
        const moduleStats = getLevelStats({ modules: [courseModule] })
        const moduleDone = courseModule.lessons.filter((lesson) => isLessonCompleted(level.slug, lesson.slug)).length
        return (
          <div key={courseModule.slug} className={compact ? "" : "border border-border bg-card"}>
            <div className={compact ? "mb-2 px-1" : "flex items-center justify-between border-b border-border px-6 py-5"}>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Módulo {pad(moduleIndex + 1)}</p>
                <p
                  className={`mt-1 font-heading font-bold uppercase tracking-tight text-foreground ${compact ? "text-sm" : "text-lg"}`}
                >
                  {courseModule.title}
                </p>
              </div>
              {!compact && (
                <p className="text-xs text-muted-foreground">
                  {moduleDone}/{moduleStats.lessons} · {moduleStats.minutes > 0 ? `${moduleStats.minutes} min` : "lectura"}
                </p>
              )}
            </div>
            <ul>
              {courseModule.lessons.map((lesson, lessonIndex) => {
                const done = isLessonCompleted(level.slug, lesson.slug)
                const isCurrent = lesson.slug === currentLessonSlug
                const isNext = !currentLessonSlug && lesson.slug === nextSlug
                const KindIcon = lesson.kind === "pdf" ? FileText : PlayCircle
                return (
                  <li key={lesson.slug}>
                    <Link
                      href={`/mi-academia/${level.slug}/${lesson.slug}`}
                      className={`flex items-center gap-4 transition-colors ${
                        compact ? "px-3 py-3" : "border-b border-border/60 px-6 py-4 last:border-b-0"
                      } ${
                        isCurrent
                          ? "border-l-2 border-l-accent bg-accent/[0.08]"
                          : isNext
                            ? "bg-accent/[0.04] hover:bg-accent/[0.08]"
                            : "hover:bg-foreground/[0.03]"
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                      ) : isCurrent ? (
                        <KindIcon className="h-4 w-4 shrink-0 text-accent" />
                      ) : (
                        <Circle className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate text-sm ${isCurrent ? "text-foreground" : done ? "text-muted-foreground" : "text-foreground/90"}`}>
                          {!compact && (
                            <span className="mr-3 text-xs tabular-nums text-muted-foreground">
                              {moduleIndex + 1}.{lessonIndex + 1}
                            </span>
                          )}
                          {lesson.title}
                        </span>
                      </span>
                      {isNext && (
                        <span className="shrink-0 bg-accent px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-accent-foreground">
                          Siguiente
                        </span>
                      )}
                      <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-muted-foreground">
                        {lesson.kind === "pdf" ? <KindIcon className="h-3.5 w-3.5" /> : lesson.duration}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
