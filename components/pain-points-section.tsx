"use client"

import { useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import {
  ArrowUpRight,
  Brain,
  DollarSign,
  Shield,
  Sparkles,
  Target,
  Users,
} from "lucide-react"

const problems = [
  {
    icon: DollarSign,
    kicker: "Valor",
    problem: "Precios bajos",
    symptom: "Tatuas con nivel, pero seguis cobrando desde la duda o desde lo que hace otro.",
    backTitle: "Reordenamos como cobras",
    solution: "Trabajamos precio, propuesta y forma de comunicar valor para que dejes de negociar desde la inseguridad.",
    resultLabel: "Resultado",
    result: "Mas criterio, menos regateo y un precio que acompana tu nivel real.",
  },
  {
    icon: Users,
    kicker: "Clientes",
    problem: "Falta de clientes",
    symptom: "Hay semanas con silencio, consultas flojas o gente que nunca termina cerrando.",
    backTitle: "Armamos un sistema de atraccion",
    solution: "Ajustamos mensaje, filtro y seguimiento para que las consultas lleguen mejor calificadas.",
    resultLabel: "Resultado",
    result: "Menos desgaste en mensajes y mas conversaciones con chances reales de cerrar.",
  },
  {
    icon: Sparkles,
    kicker: "Marca",
    problem: "Marca debil",
    symptom: "Tu trabajo puede ser bueno, pero tu perfil no transmite una percepcion de valor clara.",
    backTitle: "Le damos forma a tu posicionamiento",
    solution: "Ordenamos identidad, contenido y tono para que la marca diga algo concreto y memorable.",
    resultLabel: "Resultado",
    result: "Un perfil mas solido, mas reconocible y mejor alineado con el cliente que queres.",
  },
  {
    icon: Target,
    kicker: "Direccion",
    problem: "Trabajar menos y mejor",
    symptom: "Estas produciendo mucho, pero no necesariamente te acerca al tipo de trabajo que queres hacer.",
    backTitle: "Elegimos mejor en que enfocarte",
    solution: "Definimos prioridades, tipo de cliente y oferta para sacar ruido y ganar direccion.",
    resultLabel: "Resultado",
    result: "Menos dispersion y mas energia puesta en decisiones que empujan de verdad.",
  },
  {
    icon: Brain,
    kicker: "Criterio",
    problem: "Tecnica sin criterio",
    symptom: "Sabes tatuar, pero todavia hay decisiones de negocio y posicionamiento que te frenan.",
    backTitle: "Convertimos intuicion en sistema",
    solution: "Bajamos dudas concretas a un metodo que puedas repetir cuando haya que decidir rapido.",
    resultLabel: "Resultado",
    result: "Mas claridad mental y una forma propia de resolver sin improvisar cada semana.",
  },
  {
    icon: Shield,
    kicker: "Confianza",
    problem: "Miedo a exponerte",
    symptom: "Te cuesta sostener precios, mostrarte mas o tomar decisiones por miedo a equivocarte.",
    backTitle: "Creamos una base mas segura",
    solution: "Te llevas procesos practicos para comunicarte, vender y mostrarte sin sentir que improvisas.",
    resultLabel: "Resultado",
    result: "Mas confianza operativa para avanzar con orden, incluso cuando hay incertidumbre.",
  },
] as const

export function PainPointsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <section id="mentoria" className="relative overflow-hidden border-y border-border/80 bg-card/40 py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(214,176,76,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-accent/60 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="text-center">
          <p
            className={`text-xs uppercase tracking-[0.4em] text-accent transition-all duration-700 ${
              headerVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Que resuelvo
          </p>
          <h2
            className={`mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl lg:text-7xl transition-all duration-1000 delay-150 ${
              headerVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Tatuas bien.
            <span className="block text-accent">El negocio acompana?</span>
          </h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground transition-all duration-700 delay-300 md:text-lg ${
              headerVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Aca estan seis bloqueos comunes. Cada card te muestra de frente lo que suele frenar el crecimiento
            y, del otro lado, como lo trabajamos en la mentoria.
          </p>
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.34em] text-muted-foreground md:hidden">
          Toca una card para girarla
        </p>
        <p className="mt-6 hidden text-center text-[10px] uppercase tracking-[0.34em] text-muted-foreground md:block">
          Hover o click para ver mas
        </p>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {problems.map((item, index) => (
            <ProblemCard
              key={item.problem}
              index={index}
              item={item}
              isActive={activeCard === index}
              onToggle={() => setActiveCard((current) => (current === index ? null : index))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProblemCard({
  item,
  index,
  isActive,
  onToggle,
}: {
  item: (typeof problems)[number]
  index: number
  isActive: boolean
  onToggle: () => void
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 })
  const Icon = item.icon

  return (
    <div
      ref={ref}
      className={`[perspective:1400px] transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isActive}
        aria-label={`Ver mas informacion sobre ${item.problem}`}
        className="group block h-full w-full touch-manipulation text-left focus-visible:outline-none"
      >
        <div
          className={`relative min-h-[320px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] ${
            isActive ? "[transform:rotateY(180deg)]" : ""
          } md:group-hover:[transform:rotateY(180deg)]`}
        >
          <div className="absolute inset-0 flex h-full flex-col overflow-hidden border border-border bg-background/85 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm [backface-visibility:hidden]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center border border-accent/30 bg-accent/10">
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.7} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                {item.kicker}
              </span>
            </div>

            <h3 className="mt-10 font-heading text-3xl font-bold uppercase leading-none tracking-tight text-foreground">
              {item.problem}
            </h3>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              {item.symptom}
            </p>

            <div className="mt-auto border-t border-border/80 pt-5">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-accent">
                <span>Ver enfoque</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex h-full flex-col overflow-hidden border border-accent/35 bg-[linear-gradient(180deg,rgba(214,176,76,0.16),rgba(8,8,8,0.96))] p-8 text-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="flex items-start justify-between gap-4">
              <span className="text-[10px] uppercase tracking-[0.34em] text-accent">
                Lo que hacemos
              </span>
              <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/5">
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.7} />
              </div>
            </div>

            <h3 className="mt-10 font-heading text-3xl font-bold uppercase leading-none tracking-tight text-foreground">
              {item.backTitle}
            </h3>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/80 md:text-[15px]">
              {item.solution}
            </p>

            <div className="mt-auto border-t border-white/10 pt-5">
              <p className="text-[10px] uppercase tracking-[0.34em] text-accent">{item.resultLabel}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                {item.result}
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}
