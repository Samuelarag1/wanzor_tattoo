"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { DollarSign, Users, Sparkles, Target, Brain, Shield, Focus } from "lucide-react"

const problems = [
  {
    icon: DollarSign,
    problem: "Precios bajos",
    solution: "Te ayudo a cobrar lo que vales.",
  },
  {
    icon: Users,
    problem: "Falta de clientes",
    solution: "Te ayudo a dejar de regalar tu trabajo.",
  },
  {
    icon: Sparkles,
    problem: "Marca debil",
    solution: "Te ayudo a ordenar tu marca.",
  },
  {
    icon: Target,
    problem: "Trabajar menos y mejor",
    solution: "Te ayudo a atraer el cliente correcto.",
  },
  {
    icon: Brain,
    problem: "Tecnica sin criterio",
    solution: "Te ayudo a resolver tus dudas.",
  },
  {
    icon: Shield,
    problem: "Miedo",
    solution: "Propongo sistemas efectivos, con metodos practicos y reales.",
  },
  {
    icon: Focus,
    problem: "Desorden mental",
    solution: "Te ayudo a mantener una mentalidad enfocada y positiva.",
  },
]

export function PainPointsSection() {
  return (
    <section id="mentoria" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader />
        <div className="mt-20 grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
          {problems.slice(0, 6).map((item, i) => (
            <ProblemCard key={i} item={item} index={i} />
          ))}
        </div>
        {/* Last card centered */}
        <div className="mt-0 grid sm:grid-cols-2 lg:grid-cols-3">
          <div className="hidden lg:block" />
          <ProblemCard item={problems[6]} index={6} />
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}

function SectionHeader() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div ref={ref} className="text-center">
      <p
        className={`text-xs uppercase tracking-[0.4em] text-accent transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Que resuelvo
      </p>
      <h2
        className={`mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl lg:text-7xl transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="text-balance">
          {"Te identificas?"}
        </span>
      </h2>
    </div>
  )
}

function ProblemCard({ item, index }: { item: typeof problems[number]; index: number }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const Icon = item.icon

  return (
    <div
      ref={ref}
      className={`group relative border border-border p-8 md:p-10 transition-all duration-700 hover:bg-secondary/50 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-5 flex h-10 w-10 items-center justify-center border border-accent/30 transition-colors group-hover:border-accent group-hover:bg-accent/10">
        <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
      </div>
      <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-foreground">
        {item.problem}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {item.solution}
      </p>
      <div className="mt-5 h-px w-8 bg-accent/40 transition-all duration-500 group-hover:w-full group-hover:bg-accent" />
    </div>
  )
}
