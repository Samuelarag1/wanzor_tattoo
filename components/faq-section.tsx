import { seoFaqs } from "@/lib/site"

export function FaqSection() {
  return (
    <section className="relative border-t border-border bg-card py-24" aria-labelledby="faq-title">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">
            Preguntas frecuentes
          </p>
          <h2
            id="faq-title"
            className="mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl"
          >
            Dudas comunes antes de empezar la mentoria
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Esta seccion queda casi al final para resolver objeciones y reforzar la
            decision antes del ultimo llamado a la accion.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {seoFaqs.map((faq) => (
            <details key={faq.question} className="group border border-border bg-secondary px-6 py-5">
              <summary className="cursor-pointer list-none pr-8 font-heading text-lg font-bold uppercase tracking-tight text-foreground md:text-xl">
                {faq.question}
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
