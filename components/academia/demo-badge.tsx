// Marca discreta para las pantallas que simulan funcionalidad sin backend
// todavía (área privada, checkout, gestión). Reemplaza a los avisos grandes.
export function DemoBadge({ label = "Vista demo" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 border border-accent/30 bg-accent/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {label}
    </span>
  )
}
