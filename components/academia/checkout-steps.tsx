const steps = ["Compra", "Pago aprobado", "Cuenta creada", "Acceso por email", "Contenido"]

// Recorrido del PDF (sección 04): compra -> pago -> cuenta -> email -> contenido.
export function CheckoutSteps({ current }: { current: number }) {
  return (
    <ol className="mt-10 grid grid-cols-5 gap-2">
      {steps.map((step, index) => {
        const done = index < current
        const active = index === current
        return (
          <li key={step}>
            <div className={`h-1 w-full ${done || active ? "bg-accent" : "bg-border"}`} />
            <p
              className={`mt-3 hidden text-[10px] font-semibold uppercase tracking-[0.2em] sm:block ${
                active ? "text-foreground" : done ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {step}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
