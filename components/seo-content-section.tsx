import { seoFaqs, seoTopics } from "@/lib/site"

export function SeoContentSection() {
  return (
    <section
      id="consultoria-para-tatuadores"
      className="relative border-y border-border bg-card py-24"
      aria-labelledby="seo-content-title"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">
            Mentoria para tatuadores
          </p>
          <h2
            id="seo-content-title"
            className="mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl"
          >
            Mentoria para tatuadores que quieren crecer con estrategia
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Esta propuesta esta pensada para tatuadores que ya dominan la tecnica, pero
            necesitan ordenar el negocio alrededor de su trabajo. La mentoria para
            tatuadores apunta a mejorar precios, comunicacion, marca personal, captacion
            de clientes y posicionamiento para que tu carrera dependa menos de la
            improvisacion y mas de un sistema claro.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Si sentis que tatuas bien pero no estas cobrando lo que vales, no tenes un
            flujo consistente de clientes o tu contenido no refleja el nivel de tu
            trabajo, la consultoria busca resolver exactamente ese punto: transformar tu
            talento en una propuesta profesional mas solida, rentable y sostenible.
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

        <div className="mt-16">
          <h3 className="font-heading text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            Que podes trabajar en una asesoria para tatuadores
          </h3>
          <ul className="mt-6 grid gap-4 text-sm leading-relaxed text-muted-foreground md:grid-cols-2 lg:grid-cols-3">
            <li className="border border-border px-5 py-4">Definicion de precios y percepcion de valor.</li>
            <li className="border border-border px-5 py-4">Marca personal y posicionamiento como tatuador.</li>
            <li className="border border-border px-5 py-4">Sistema de consultas, filtros y cierres.</li>
            <li className="border border-border px-5 py-4">Contenido con estrategia para atraer mejores clientes.</li>
            <li className="border border-border px-5 py-4">Diagnostico de bloqueos comerciales y mentales.</li>
            <li className="border border-border px-5 py-4">Direccion para crecer sin perder identidad ni criterio.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
