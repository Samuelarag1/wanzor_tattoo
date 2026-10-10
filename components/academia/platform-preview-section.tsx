"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Circle, KeyRound, LineChart, Lock, Play, PlayCircle } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { getLevelProgress, getOrderedLessons, isLessonCompleted, mockLevels } from "@/lib/mock/academia"

// Vista previa del área privada (PDF, sección 04) dentro de un marco de
// navegador, armada con los mismos datos que usa /mi-academia.
export function PlatformPreviewSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })
  const level = mockLevels[0]
  const progress = getLevelProgress(level)
  const lessons = getOrderedLessons(level)
  const current =
    lessons.find(({ lesson }) => lesson.kind === "video" && !isLessonCompleted(level.slug, lesson.slug)) ??
    progress.next ??
    lessons[0]

  return (
    <section className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(214,176,76,0.10),transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">La plataforma</p>
          <h2 className="mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl">
            Así se ve por dentro
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Cada alumno tiene su cuenta. Entra con email y contraseña, retoma donde lo dejó y ve solo los niveles que
            compró.
          </p>
        </div>

        <div
          ref={ref}
          className={`mt-16 border border-border bg-card shadow-[0_40px_120px_rgba(0,0,0,0.6)] transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <div className="flex items-center gap-4 border-b border-border px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
            </div>
            <div className="flex flex-1 items-center gap-2 bg-background px-3 py-1.5 text-[11px] text-muted-foreground">
              <Lock className="h-3 w-3" />
              wanzortatt.com/mi-academia
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_300px]">
            <div className="p-4 md:p-6">
              <div className="relative aspect-video overflow-hidden bg-black">
                <Image
                  src={level.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover opacity-60"
                  style={{ objectPosition: level.imagePosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_0_60px_rgba(214,176,76,0.4)]">
                  <Play className="ml-1 h-6 w-6" fill="currentColor" />
                </span>
                <div className="absolute inset-x-4 bottom-4">
                  <div className="h-1 w-full bg-white/20">
                    <div className="h-full w-[35%] bg-accent" />
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] tabular-nums text-white/70">
                    <span>04:12</span>
                    <span>{current.lesson.duration ? `${current.lesson.duration.replace(" min", "")}:00` : ""}</span>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
                {level.title} · {current.courseModule.title}
              </p>
              <p className="mt-1 font-heading text-2xl font-bold uppercase tracking-tight text-foreground">
                {current.lesson.title}
              </p>
            </div>

            <div className="border-t border-border bg-background/40 p-5 md:border-l md:border-t-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Tu progreso</p>
              <div className="mt-3 h-1.5 w-full bg-border">
                <div className="h-full bg-accent" style={{ width: `${progress.percent}%` }} />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {progress.completed} de {progress.total} lecciones
              </p>
              <ul className="mt-5 space-y-1">
                {lessons.map(({ lesson }) => {
                  const done = isLessonCompleted(level.slug, lesson.slug)
                  const isCurrent = lesson.slug === current.lesson.slug
                  return (
                    <li
                      key={lesson.slug}
                      className={`flex items-center gap-3 px-3 py-2.5 text-xs ${isCurrent ? "border-l-2 border-accent bg-accent/10 text-foreground" : "text-muted-foreground"}`}
                    >
                      {done ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" />
                      ) : isCurrent ? (
                        <PlayCircle className="h-3.5 w-3.5 shrink-0 text-accent" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 shrink-0 opacity-50" />
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-5 flex items-center gap-2 border border-dashed border-border px-3 py-2.5 text-[11px] text-muted-foreground">
                <Lock className="h-3.5 w-3.5" /> Intermedio · bloqueado
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { icon: KeyRound, title: "Tu cuenta personal", text: "Acceso con email y contraseña, sin links para compartir." },
            { icon: LineChart, title: "Progreso guardado", text: "Retomás exactamente donde lo dejaste." },
            { icon: Lock, title: "Solo lo que compraste", text: "Los demás niveles se ven bloqueados hasta que los sumes." },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent/10">
                  <Icon className="h-4 w-4 text-accent" />
                </span>
                <div>
                  <p className="font-heading text-lg font-bold uppercase tracking-tight text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/login"
            className="group inline-flex items-center gap-3 border border-foreground/20 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Ingresar a la plataforma
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
