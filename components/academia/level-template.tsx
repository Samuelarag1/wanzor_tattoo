import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Clock,
  FileDown,
  FileText,
  KeyRound,
  Layers,
  Lock,
  MonitorPlay,
  PlayCircle,
  ShieldCheck,
  Timer,
  Zap,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  bundleImage,
  formatMockPrice,
  getLevelStats,
  getLevelsForProduct,
  instructor,
  plural,
  sumStats,
  type MockLevel,
  type MockProduct,
} from "@/lib/mock/academia"

const pad = (value: number) => String(value).padStart(2, "0")

// Página de venta reutilizable para cada nivel y para la Academia Completa
// (PDF, sección 03): resultado, para quién, qué incluye, temario, cómo
// funciona, instructor, FAQ y CTA.
export function LevelTemplate({ product }: { product: MockProduct }) {
  const levels = getLevelsForProduct(product)
  const isBundle = product.type === "bundle"
  const primary = levels[0]
  const stats = sumStats(levels)

  const title = isBundle ? "Academia Completa" : primary.title
  const eyebrow = isBundle ? "Principiante + Intermedio + Profesional" : `Nivel ${pad(primary.order)} de 03`
  const tagline = isBundle ? "El recorrido completo, de la base al negocio" : primary.tagline
  const summary = isBundle
    ? "Los tres niveles de la Academia en un solo acceso: técnica, criterio y negocio, con todo el contenido disponible desde tu cuenta."
    : primary.summary
  const hero = isBundle
    ? { src: bundleImage.src, position: bundleImage.position }
    : { src: primary.image, position: primary.imagePosition }
  const resultado = isBundle ? levels.map((level) => level.resultado[0]).concat("Una visión completa del oficio: técnica, criterio y negocio.") : primary.resultado
  const paraQuien = isBundle
    ? ["Tatuadores que quieren recorrer el camino completo, de la base técnica a la construcción de su negocio.", ...levels.map((level) => level.paraQuien[0])]
    : primary.paraQuien
  const queIncluye = isBundle ? levels.flatMap((level) => level.queIncluye.slice(0, 2)) : primary.queIncluye
  const faq = levels.flatMap((level) => level.faq)
  const ctaLabel = isBundle ? "Comprar Academia Completa" : "Comprar este nivel"

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,176,76,0.12),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28">
          <div>
            <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <Link href="/academia" className="transition-colors hover:text-foreground">
                Academia
              </Link>
              <span className="text-accent">/</span>
              <span className="text-foreground">{title}</span>
            </nav>

            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.4em] text-accent">{eyebrow}</p>
            <h1 className="mt-4 font-heading text-6xl font-bold uppercase leading-[0.9] tracking-tight text-foreground md:text-8xl">
              {title}
            </h1>
            <p className="mt-5 font-heading text-xl uppercase tracking-wide text-accent md:text-2xl">{tagline}</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{summary}</p>

            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
              <HeroStat value={pad(stats.modules)} label="Módulos" />
              <HeroStat value={pad(stats.lessons)} label="Lecciones" />
              <HeroStat value={`~${stats.minutes}`} label="Min. de video" />
              <HeroStat value={pad(stats.pdfs)} label="Guías PDF" />
            </dl>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={`/checkout/${product.slug}`}
                className="group inline-flex items-center justify-center gap-3 bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#temario"
                className="inline-flex items-center justify-center gap-3 border border-foreground/20 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Ver temario
              </a>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-accent/40">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                  style={{ objectPosition: instructor.imagePosition }}
                />
              </div>
              <div>
                <p className="text-sm text-foreground">Con {instructor.name}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {instructor.brand} · Tatuando desde {instructor.since}
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-border">
              <Image
                src={hero.src}
                alt={title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                style={{ objectPosition: hero.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
            <CornerAccents />
            <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 border border-border bg-card/95 px-5 py-4 shadow-2xl shadow-black/40 backdrop-blur md:flex">
              <span className="flex h-9 w-9 items-center justify-center bg-accent/15">
                <Zap className="h-4 w-4 text-accent" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground">Acceso inmediato</p>
                <p className="text-[11px] text-muted-foreground">Se habilita al aprobarse el pago</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO + TARJETA DE COMPRA */}
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-24">
          <section>
            <SectionHeading index="01" title="Qué vas a conseguir" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {resultado.map((item, index) => (
                <div key={item} className="border border-border bg-card p-6 transition-colors hover:border-accent/30">
                  <p className="font-heading text-2xl font-bold text-accent/80">{pad(index + 1)}</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading index="02" title="Para quién es" />
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {paraQuien.map((item) => (
                <li key={item} className="flex items-start gap-4 py-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-accent/15">
                    <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                  </span>
                  <span className="text-base leading-relaxed text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="temario" className="scroll-mt-28">
            <SectionHeading index="03" title="Temario" />
            <p className="mt-3 text-sm uppercase tracking-widest text-muted-foreground">
              {stats.modules} módulos · {stats.lessons} lecciones · ~{stats.minutes} min de video
            </p>
            <div className="mt-8 space-y-10">
              {levels.map((level) => (
                <Curriculum key={level.slug} level={level} showLevelHeader={isBundle} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeading index="04" title="Qué incluye" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <FeatureTile icon={MonitorPlay} title={plural(stats.lessons - stats.pdfs, "clase en video", "clases en video")} text="Grabadas en estudio, para ver las veces que necesites." />
              <FeatureTile icon={FileDown} title={plural(stats.pdfs, "guía descargable", "guías descargables")} text="Material en PDF para tener a mano en el estudio." />
              <FeatureTile icon={KeyRound} title="Tu cuenta personal" text="Entrás con email y contraseña; el acceso no se comparte por links." />
              <FeatureTile icon={Timer} title="A tu ritmo" text="Avanzás módulo por módulo y retomás donde lo dejaste." />
            </div>
            <ul className="mt-8 space-y-3">
              {queIncluye.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeading index="05" title="Cómo funciona" />
            <ol className="mt-10 grid gap-8 sm:grid-cols-4">
              {[
                { title: "Comprás", text: "Nivel individual o Academia Completa, con Mercado Pago." },
                { title: "Se crea tu cuenta", text: "Automáticamente, apenas se aprueba el pago." },
                { title: "Recibís el acceso", text: "Te llega un email para entrar a tu panel." },
                { title: "Estudiás", text: "Solo ves lo que compraste, desbloqueado." },
              ].map((step, index) => (
                <li key={step.title} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/50 font-heading text-lg font-bold text-accent">
                      {index + 1}
                    </span>
                    {index < 3 && <span className="hidden h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent sm:block" />}
                  </div>
                  <p className="mt-4 font-heading text-lg font-bold uppercase tracking-tight text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <SectionHeading index="06" title="Tu instructor" />
            <div className="mt-8 grid gap-8 border border-border bg-card p-6 sm:grid-cols-[200px_1fr] sm:p-8">
              <div className="relative aspect-[4/5] w-full overflow-hidden sm:w-[200px]">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  fill
                  sizes="200px"
                  className="object-cover"
                  style={{ objectPosition: instructor.imagePosition }}
                />
              </div>
              <div>
                <p className="font-heading text-3xl font-bold uppercase tracking-tight text-foreground">{instructor.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-accent">{instructor.brand}</p>
                <div className="mt-5 space-y-3">
                  {instructor.bio.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-6 flex gap-8 border-t border-border pt-5">
                  <div>
                    <p className="font-heading text-2xl font-bold text-foreground">{instructor.since}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Tatuando desde</p>
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-bold text-foreground">03</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Niveles de formación</p>
                  </div>
                </div>
                <Link
                  href="/mi-historia"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
                >
                  Conocé mi historia <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading index="07" title="Preguntas frecuentes" />
            <Accordion type="single" collapsible className="mt-8 border-t border-border">
              {faq.map((item) => (
                <AccordionItem key={item.question} value={item.question} className="border-border">
                  <AccordionTrigger className="py-5 font-heading text-base uppercase tracking-tight text-foreground hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        <aside className="order-first lg:order-none">
          <PurchaseCard product={product} title={title} hero={hero} stats={stats} ctaLabel={ctaLabel} isBundle={isBundle} />
        </aside>
      </div>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <Image src={hero.src} alt="" fill sizes="50vw" className="object-cover opacity-40" style={{ objectPosition: hero.position }} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">Empezá hoy</p>
          <h2 className="mt-4 max-w-xl font-heading text-5xl font-bold uppercase leading-[0.95] tracking-tight text-foreground md:text-7xl">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-base text-muted-foreground">{tagline}.</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/checkout/${product.slug}`}
              className="group inline-flex items-center justify-center gap-3 bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={isBundle ? "/academia" : "/academia/completa"}
              className="inline-flex items-center justify-center border border-foreground/20 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              {isBundle ? "Ver niveles por separado" : "Ver Academia Completa"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-background px-5 py-4">
      <dd className="font-heading text-3xl font-bold leading-none text-foreground">{value}</dd>
      <dt className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
    </div>
  )
}

function CornerAccents() {
  const base = "pointer-events-none absolute h-6 w-6 border-accent"
  return (
    <>
      <span className={`${base} -left-2 -top-2 border-l border-t`} />
      <span className={`${base} -right-2 -top-2 border-r border-t`} />
      <span className={`${base} -bottom-2 -left-2 border-b border-l`} />
      <span className={`${base} -bottom-2 -right-2 border-b border-r`} />
    </>
  )
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-heading text-sm font-bold text-accent">{index}</span>
      <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">{title}</h2>
    </div>
  )
}

function FeatureTile({ icon: Icon, title, text }: { icon: typeof Check; title: string; text: string }) {
  return (
    <div className="flex gap-4 border border-border bg-card p-6">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent/30 bg-accent/10">
        <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
      </span>
      <div>
        <p className="font-heading text-lg font-bold uppercase tracking-tight text-foreground">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}

function Curriculum({ level, showLevelHeader }: { level: MockLevel; showLevelHeader: boolean }) {
  return (
    <div>
      {showLevelHeader && (
        <div className="mb-4 flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-border">
            <Image src={level.image} alt="" fill sizes="48px" className="object-cover" style={{ objectPosition: level.imagePosition }} />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Nivel {pad(level.order)}</p>
            <p className="font-heading text-xl font-bold uppercase tracking-tight text-foreground">{level.title}</p>
          </div>
        </div>
      )}
      <Accordion type="multiple" defaultValue={level.modules.map((m) => m.slug)} className="space-y-3">
        {level.modules.map((courseModule, moduleIndex) => {
          const moduleStats = getLevelStats({ modules: [courseModule] })
          return (
            <AccordionItem key={courseModule.slug} value={courseModule.slug} className="border border-border bg-card last:border-b">
              <AccordionTrigger className="items-center px-6 py-5 hover:no-underline">
                <div className="flex flex-1 flex-col gap-1 text-left sm:flex-row sm:items-center sm:justify-between sm:pr-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Módulo {pad(moduleIndex + 1)}</p>
                    <p className="mt-1 font-heading text-lg font-bold uppercase tracking-tight text-foreground">{courseModule.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {moduleStats.lessons} lecciones{moduleStats.minutes > 0 ? ` · ${moduleStats.minutes} min` : ""}
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <ul className="border-t border-border">
                  {courseModule.lessons.map((lesson, lessonIndex) => {
                    const LessonIcon = lesson.kind === "pdf" ? FileText : PlayCircle
                    return (
                      <li
                        key={lesson.slug}
                        className="flex items-center justify-between gap-4 border-b border-border/60 px-6 py-4 last:border-b-0"
                      >
                        <span className="flex min-w-0 items-center gap-4">
                          <span className="w-8 shrink-0 text-xs tabular-nums text-muted-foreground">
                            {moduleIndex + 1}.{lessonIndex + 1}
                          </span>
                          <LessonIcon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                          <span className="truncate text-sm text-foreground/90">{lesson.title}</span>
                          {lesson.kind === "pdf" && (
                            <span className="shrink-0 border border-border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                              PDF
                            </span>
                          )}
                        </span>
                        <span className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                          {lesson.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {lesson.duration}
                            </span>
                          )}
                          <Lock className="h-3.5 w-3.5 text-muted-foreground/50" />
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

function PurchaseCard({
  product,
  title,
  hero,
  stats,
  ctaLabel,
  isBundle,
}: {
  product: MockProduct
  title: string
  hero: { src: string; position: string }
  stats: ReturnType<typeof sumStats>
  ctaLabel: string
  isBundle: boolean
}) {
  return (
    <div className="lg:sticky lg:top-28">
      <div className={`border bg-card ${isBundle ? "border-accent/60" : "border-border"}`}>
        <div className="relative hidden aspect-[16/9] w-full overflow-hidden lg:block">
          <Image src={hero.src} alt={title} fill sizes="380px" className="object-cover" style={{ objectPosition: hero.position }} />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          {isBundle && (
            <span className="absolute left-4 top-4 bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-foreground">
              Oferta principal
            </span>
          )}
        </div>
        <div className="p-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Inversión</p>
          <p className="mt-2 font-heading text-4xl font-bold tracking-tight text-foreground">{formatMockPrice(product)}</p>

          <Link
            href={`/checkout/${product.slug}`}
            className="group mt-6 flex w-full items-center justify-center gap-3 bg-accent py-4 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-3 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            Pago seguro con Mercado Pago
          </p>

          <ul className="mt-7 space-y-3 border-t border-border pt-6 text-sm text-foreground/90">
            <IncludeRow icon={Layers} text={`${stats.modules} módulos · ${stats.lessons} lecciones`} />
            <IncludeRow icon={MonitorPlay} text={`~${stats.minutes} min de video`} />
            <IncludeRow icon={FileDown} text={plural(stats.pdfs, "guía PDF descargable", "guías PDF descargables")} />
            <IncludeRow icon={KeyRound} text="Acceso con tu cuenta personal" />
            <IncludeRow icon={Timer} text="Avanzás a tu ritmo" />
          </ul>
        </div>
      </div>

      {!isBundle && (
        <Link
          href="/academia/completa"
          className="group mt-4 block border border-accent/40 bg-accent/[0.04] p-5 transition-colors hover:bg-accent/[0.08]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">¿Vas por todo?</p>
          <p className="mt-2 font-heading text-lg font-bold uppercase tracking-tight text-foreground">Academia Completa</p>
          <p className="mt-1 text-xs text-muted-foreground">Los tres niveles en un solo acceso.</p>
          <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground group-hover:text-accent">
            Ver oferta <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      )}
    </div>
  )
}

function IncludeRow({ icon: Icon, text }: { icon: typeof Check; text: string }) {
  return (
    <li className="flex items-center gap-3">
      <Icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
      {text}
    </li>
  )
}
