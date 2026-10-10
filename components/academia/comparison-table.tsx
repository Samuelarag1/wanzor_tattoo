import { Check } from "lucide-react"
import { mockLevels } from "@/lib/mock/academia"

// PDF, página madre de Academia: "Comparación rápida".
export function ComparisonTable() {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-card">
            <th className="p-4 font-heading text-xs uppercase tracking-widest text-muted-foreground">Objetivo</th>
            {mockLevels.map((level) => (
              <th
                key={level.slug}
                className="p-4 text-center font-heading text-xs uppercase tracking-widest text-foreground"
              >
                {level.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { label: "Ordenar la base técnica", present: [true, true, true] },
            { label: "Profesionalizar estilo y criterio", present: [false, true, true] },
            { label: "Precios, marca y negocio", present: [false, false, true] },
          ].map((row) => (
            <tr key={row.label} className="border-b border-border last:border-b-0">
              <td className="p-4 text-muted-foreground">{row.label}</td>
              {row.present.map((present, index) => (
                <td key={`${row.label}-${index}`} className="p-4 text-center">
                  {present ? <Check className="mx-auto h-4 w-4 text-accent" strokeWidth={2.5} /> : "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
