"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Download, FileText } from "lucide-react"

export function CompleteLessonButton({ initiallyCompleted }: { initiallyCompleted: boolean }) {
  const [completed, setCompleted] = useState(initiallyCompleted)
  return (
    <button
      type="button"
      onClick={() => setCompleted((value) => !value)}
      className={`inline-flex shrink-0 items-center gap-2.5 border px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
        completed
          ? "border-accent bg-accent/10 text-accent"
          : "border-foreground/20 text-foreground hover:border-accent/50"
      }`}
    >
      {completed ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
      {completed ? "Completada" : "Marcar como completada"}
    </button>
  )
}

export function DownloadResourceButton({ fileName }: { fileName: string }) {
  const [clicked, setClicked] = useState(false)
  return (
    <div>
      <button
        type="button"
        onClick={() => setClicked(true)}
        className="inline-flex items-center gap-2.5 bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
      >
        <Download className="h-4 w-4" />
        Descargar PDF
      </button>
      {clicked && (
        <p className="mt-3 text-xs text-muted-foreground">
          Demo: el archivo real ({fileName}) se sube desde el panel de gestión.
        </p>
      )}
    </div>
  )
}

export function PdfLessonMock({ title }: { title: string }) {
  const fileName = `${title.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-")}.pdf`
  return (
    <div className="grid w-full gap-8 border border-border bg-card p-8 sm:grid-cols-[220px_1fr] sm:items-center md:p-12">
      <div className="relative mx-auto aspect-[3/4] w-[180px] border border-border bg-background p-5 shadow-2xl shadow-black/50 sm:w-full">
        <p className="font-heading text-xs font-bold uppercase tracking-wider text-foreground">Wanzor Tatt</p>
        <div className="mt-1 h-px w-8 bg-accent" />
        <p className="mt-4 font-heading text-sm font-bold uppercase leading-tight text-foreground">{title}</p>
        <div className="mt-5 space-y-2">
          {[100, 92, 97, 70, 88, 95, 60].map((width, index) => (
            <div key={index} className="h-1.5 bg-foreground/10" style={{ width: `${width}%` }} />
          ))}
        </div>
        <div className="mt-5 space-y-2">
          {[4, 3, 4].map((count, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="h-2 w-2 border border-accent/60" />
              <span className="h-1.5 flex-1 bg-foreground/10" style={{ width: `${count * 20}%` }} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <span className="flex h-12 w-12 items-center justify-center border border-accent/30 bg-accent/10">
          <FileText className="h-6 w-6 text-accent" />
        </span>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Guía descargable</p>
        <p className="mt-2 font-heading text-3xl font-bold uppercase tracking-tight text-foreground">{title}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Material de consulta rápida para tener a mano en el estudio. Descargalo e imprimilo.
        </p>
        <div className="mt-6">
          <DownloadResourceButton fileName={fileName} />
        </div>
      </div>
    </div>
  )
}
