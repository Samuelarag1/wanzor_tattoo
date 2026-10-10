import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ArrowLeft, ArrowRight, ChevronRight, Clock, FileText } from "lucide-react"
import { StudentHeader } from "@/components/academia/student-header"
import { CourseOutline } from "@/components/academia/course-outline"
import { VideoPlayerMock } from "@/components/academia/video-player-mock"
import { CompleteLessonButton, PdfLessonMock } from "@/components/academia/lesson-interactions"
import {
  demoUnlockedLevelSlugs,
  findMockLesson,
  getLevelProgress,
  getMockLevel,
  isLessonCompleted,
  isMockLevelUnlocked,
} from "@/lib/mock/academia"

type Params = Promise<{ levelSlug: string; lessonSlug: string }>

// Solo se pre-generan las lecciones de niveles "comprados"; el resto se
// resuelve en el request y redirige a la vista bloqueada del nivel.
export function generateStaticParams() {
  return demoUnlockedLevelSlugs.flatMap((levelSlug) => {
    const level = getMockLevel(levelSlug)
    return (level?.modules ?? []).flatMap((courseModule) =>
      courseModule.lessons.map((lesson) => ({ levelSlug, lessonSlug: lesson.slug })),
    )
  })
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

const pad = (value: number) => String(value).padStart(2, "0")

export default async function LessonPage({ params }: { params: Params }) {
  const { levelSlug, lessonSlug } = await params
  const found = findMockLesson(levelSlug, lessonSlug)
  if (!found) notFound()
  if (!isMockLevelUnlocked(levelSlug)) redirect(`/mi-academia/${levelSlug}`)

  const { level, courseModule, lesson, moduleIndex, previous, next } = found
  const lessonIndex = courseModule.lessons.indexOf(lesson)
  const progress = getLevelProgress(level)
  const minutes = Number(lesson.duration?.match(/(\d+)/)?.[1] ?? 0)
  const moduleResources = courseModule.lessons.filter((item) => item.kind === "pdf" && item.slug !== lesson.slug)

  return (
    <div className="min-h-screen">
      <StudentHeader active="cursos" />

      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[1fr_400px]">
        <main className="min-w-0 px-6 py-8 lg:px-10">
          <nav className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <Link href="/mi-academia" className="hover:text-foreground">
              Mis cursos
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/mi-academia/${level.slug}`} className="hover:text-foreground">
              {level.title}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Módulo {pad(moduleIndex + 1)}</span>
          </nav>

          <div className="mt-6">
            {lesson.kind === "pdf" ? (
              <PdfLessonMock title={lesson.title} />
            ) : (
              <VideoPlayerMock
                poster={level.image}
                posterPosition={level.imagePosition}
                durationMinutes={minutes}
                label={`Lección ${moduleIndex + 1}.${lessonIndex + 1}`}
              />
            )}
          </div>

          <div className="mt-8 flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
                Módulo {pad(moduleIndex + 1)} · {courseModule.title}
              </p>
              <h1 className="mt-2 font-heading text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
                {lesson.title}
              </h1>
              <p className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                <span>
                  Lección {moduleIndex + 1}.{lessonIndex + 1}
                </span>
                {lesson.duration && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {lesson.duration}
                  </span>
                )}
                <span className="uppercase tracking-widest">{lesson.kind === "pdf" ? "Guía PDF" : "Video"}</span>
              </p>
            </div>
            <CompleteLessonButton initiallyCompleted={isLessonCompleted(level.slug, lesson.slug)} />
          </div>

          <div className="mt-8 grid gap-10 xl:grid-cols-[1fr_320px]">
            <section>
              <h2 className="font-heading text-lg font-bold uppercase tracking-tight text-foreground">Sobre esta lección</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {lesson.kind === "pdf"
                  ? `Guía de consulta del módulo "${courseModule.title}". Resume los puntos clave para aplicarlos en el estudio.`
                  : `En esta clase de "${courseModule.title}" trabajamos ${lesson.title.toLowerCase()} paso a paso, con ejemplos aplicados al trabajo diario en el estudio.`}
              </p>
            </section>
            {moduleResources.length > 0 && (
              <section>
                <h2 className="font-heading text-lg font-bold uppercase tracking-tight text-foreground">Recursos del módulo</h2>
                <ul className="mt-3 space-y-2">
                  {moduleResources.map((resource) => (
                    <li key={resource.slug}>
                      <Link
                        href={`/mi-academia/${level.slug}/${resource.slug}`}
                        className="flex items-center gap-3 border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors hover:border-accent/40"
                      >
                        <FileText className="h-4 w-4 shrink-0 text-accent" />
                        <span className="truncate">{resource.title}</span>
                        <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-muted-foreground">PDF</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {previous ? (
              <Link
                href={`/mi-academia/${level.slug}/${previous.lesson.slug}`}
                className="group border border-border p-5 transition-colors hover:border-accent/40"
              >
                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" /> Anterior
                </span>
                <span className="mt-2 block truncate text-sm text-foreground">{previous.lesson.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/mi-academia/${level.slug}/${next.lesson.slug}`}
                className="group border border-accent/40 bg-accent/[0.04] p-5 text-right transition-colors hover:bg-accent/[0.08]"
              >
                <span className="flex items-center justify-end gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                  Siguiente <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-2 block truncate text-sm text-foreground">{next.lesson.title}</span>
              </Link>
            )}
          </div>
        </main>

        <aside className="border-t border-border bg-card/40 lg:border-l lg:border-t-0">
          <div className="lg:sticky lg:top-[65px] lg:max-h-[calc(100vh-65px)] lg:overflow-y-auto">
            <div className="border-b border-border p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Nivel {pad(level.order)}</p>
              <p className="mt-1 font-heading text-2xl font-bold uppercase tracking-tight text-foreground">{level.title}</p>
              <div className="mt-4 h-1.5 w-full bg-border">
                <div className="h-full bg-accent" style={{ width: `${progress.percent}%` }} />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {progress.completed} de {progress.total} lecciones · {progress.percent}%
              </p>
            </div>
            <div className="p-3">
              <CourseOutline level={level} currentLessonSlug={lesson.slug} variant="compact" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
