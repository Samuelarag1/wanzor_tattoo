import { seoTopics } from "@/lib/site"

export function SeoContentSection() {
  return (
    <section
      id="consultoria-para-tatuadores"
      className="relative border-y border-border bg-card py-24"
      aria-labelledby="seo-content-title"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">
            Mentoría para tatuadores
          </p>
          <h2
            id="seo-content-title"
            className="mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl"
          >
            Vivir del arte es posible
            <span className="block text-accent">
              Te cuento cómo lo logré y te comparto mis métodos
            </span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Esta propuesta está pensada para tatuadores que quieren llevar su trabajo al siguiente
            nivel. No importa si sos principiante, amateur o profesional. Si todavía no estás en el
            punto que querés es porque hay cosas por pulir.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            La mentoría para tatuadores apunta a subir tus precios, a mejorar tu marca
            personal, a captar más y mejores clientes; te ayuda a mantener una mente ganadora
            y positiva, evitando el autosabotaje, a posicionarte mejor como tatuador y
            organizarte con más orden y menos improvisación.
          </p>
          <p className="mt-8 font-heading text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">
            Si sos de los que ama el arte y quiere vivir de esto, necesitás prepararte.
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Si no estás cobrando lo que vale tu trabajo, no tenés un flujo consistente de
            clientes o tu contenido no llega a verse con el nivel que buscás, la consultoría
            te ayuda a resolver exactamente esos puntos, con técnicas, sistemas y métodos
            funcionales.
          </p>
          <p className="mt-6 font-heading text-2xl font-bold uppercase tracking-tight text-accent md:text-3xl">
            Transformar tu talento en un estilo de vida es posible. Llevémoslo al siguiente nivel.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {seoTopics.map((topic) => (
            <article key={topic.title} className="border border-border bg-secondary p-8">
              <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground">
                {topic.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {topic.description}
              </p>
            </article>
          ))}
        </div>

        {/* <div className="mt-16">
          <h3 className="font-heading text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            Lo que vamos a trabajar en tu caso
          </h3>
          <ul className="mt-6 grid gap-4 text-sm leading-relaxed text-muted-foreground md:grid-cols-2 lg:grid-cols-3">
            <li className="border border-border px-5 py-4">Definición de precios y percepción de valor.</li>
            <li className="border border-border px-5 py-4">Marca personal, estética y branding profesional.</li>
            <li className="border border-border px-5 py-4">Sistema de consultas, captación y mejores clientes.</li>
            <li className="border border-border px-5 py-4">Contenido, comunicación y posicionamiento como tatuador.</li>
            <li className="border border-border px-5 py-4">Mindset, enfoque y menos autosabotaje.</li>
            <li className="border border-border px-5 py-4">Organización, agenda, sistemas e inteligencia artificial.</li>
          </ul>
        </div> */}
      </div>
    </section>
  )
}
