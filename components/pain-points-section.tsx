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
    solution:
      "El dinero es una idea, para poder haber más es necesario cambiar la manera de pensar. La mejor manera de aumentar tus ganancias es asegurándote de que das un buen servicio.",
    backTitle: "Venderlo mejor",
    symptom: "Te ayudo a mejorar tu servicio y venderlo mejor.",
    resultLabel: "",
    result: "",
  },
  {
    icon: Users,
    kicker: "Clientes",
    problem: "Falta de clientes",
    solution:
      "No todos los clientes son para vos, y eso está bien. Pero hay muchísimos clientes que pueden ser tuyos si sabés enfocarte en lo importante.",
    backTitle: "Encontrar tu nicho",
    symptom: "Encontrar tu nicho actual y sacarle el máximo provecho.",
    resultLabel: "",
    result: "",
  },
  {
    icon: Sparkles,
    kicker: "Marca",
    problem: "Marca débil",
    symptom: "De nada sirve saber algo si no lo sabes comunicar.",
    backTitle: "Subirla de nivel",
    solution: "Te ayudo a encontrar tu estética, subirla de nivel y crear un branding profesional para tu marca.",
    resultLabel: "",
    result: "",
  },
  {
    icon: Target,
    kicker: "Enfoque",
    problem: "Trabajar menos y mejor",
    solution:
      "Sentirse estancado o frustrado es parte del proceso. Es la parte en donde tenemos que empezar a hacer las cosas diferentes.",
    backTitle: "Optimizar tu tiempo",
    symptom: "Podes optimizar tu tiempo y rendir mejor.",
    resultLabel: "",
    result: "",
  },
  {
    icon: Shield,
    kicker: "Seguridad",
    problem: "Miedo",
    symptom: "Cuando empezás a trabajar con sistemas y estructuras, el miedo y la ansiedad desaparecen.",
    backTitle: "Operar con más seguridad",
    solution: "Operar con más seguridad y tranquilidad es clave para la abundancia y prosperidad de tu negocio.",
    resultLabel: "",
    result: "",
  },
  {
    icon: Brain,
    kicker: "Mentalidad",
    problem: "Desorden mental",
    symptom: "No todo es ganar, a veces es saber cómo no equivocarte tanto.",
    backTitle: "Ordenar tu mente",
    solution:
      "Una mente positiva y ordenada es fundamental para evitar el autosabotaje y lograr una carrera profesional en subida.",
    resultLabel: "",
    result: "",
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
            ¿Qué resuelvo?
          </p>
          <h2
            className={`mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl lg:text-7xl transition-all duration-1000 delay-150 ${
              headerVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            El problema no es el precio
            <span className="block text-accent text-4xl">Es el sistema que lo rodea</span>
          </h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground transition-all duration-700 delay-300 md:text-lg ${
              headerVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Acá están seis bloqueos comunes. Cada card te muestra de frente lo que suele frenar el crecimiento
            y, del otro lado, cómo lo trabajamos en la mentoría.
          </p>
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.34em] text-muted-foreground md:hidden">
          Tocá una card para girarla
        </p>
        <p className="mt-6 hidden text-center text-[10px] uppercase tracking-[0.34em] text-muted-foreground md:block">
          Hover o clic para ver más
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
        aria-label={`Ver más información sobre ${item.problem}`}
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

            {item.resultLabel && item.result ? (
              <div className="mt-auto border-t border-white/10 pt-5">
                <p className="text-[10px] uppercase tracking-[0.34em] text-accent">{item.resultLabel}</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                  {item.result}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </button>
    </div>
  )
}
