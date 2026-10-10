"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Sparkles, Flame, Crown, PlayCircle, Layers } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import type { MockLevel, MockLevelIcon, MockProduct } from "@/lib/mock/academia"
import { formatMockPrice, getLevelStats } from "@/lib/mock/academia"

const iconMap: Record<MockLevelIcon, typeof Sparkles> = {
  sparkles: Sparkles,
  flame: Flame,
  crown: Crown,
}

export function LevelCard({
  level,
  product,
  index = 0,
  featured = false,
}: {
  level: MockLevel
  product: MockProduct
  index?: number
  featured?: boolean
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 })
  const Icon = iconMap[level.icon]
  const stats = getLevelStats(level)

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {featured && (
        <div className="absolute -inset-px bg-gradient-to-b from-accent/40 via-accent/10 to-transparent pointer-events-none" />
      )}

      <div
        className={`relative flex flex-1 flex-col border ${
          featured ? "border-accent/50 bg-accent/[0.03]" : "border-border bg-card"
        }`}
      >
        {/* Cover */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={level.image}
            alt={`${level.title} — Academia Wanzor Tatt`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ objectPosition: level.imagePosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
          <div className="absolute inset-0 bg-background/10" />

          <div
            className={`absolute left-4 top-4 flex h-12 w-12 items-center justify-center border backdrop-blur-sm ${
              featured ? "border-accent/50 bg-accent/15" : "border-white/15 bg-background/50"
            }`}
          >
            <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
          </div>

          <span className="absolute right-4 top-4 font-heading text-5xl font-bold text-white/10">
            {String(level.order).padStart(2, "0")}
          </span>

          <div className="absolute bottom-4 left-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Layers className="h-3 w-3 text-accent" />
              {stats.modules} módulos
            </span>
            <span className="flex items-center gap-1.5">
              <PlayCircle className="h-3 w-3 text-accent" />
              {stats.lessons} lecciones
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-8">
          <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">
            {level.title}
          </h3>
          <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-accent">{level.tagline}</p>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{level.summary}</p>

          <div className="mt-7 border-t border-border/80 pt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">Inversión</p>
            <p className="mt-3 font-heading text-3xl font-bold leading-none tracking-tight text-foreground">
              {formatMockPrice(product)}
            </p>
          </div>

          <div className="my-6 h-px bg-border" />

          <ul className="flex flex-1 flex-col gap-3.5">
            {level.queIncluye.slice(0, 3).map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href={`/academia/${level.slug}`}
            className={`mt-10 inline-flex items-center justify-center gap-3 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
              featured
                ? "bg-accent text-accent-foreground hover:opacity-90"
                : "border border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
            }`}
          >
            Ver más información
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
