"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  FileType,
  GraduationCap,
  LayoutDashboard,
  PlayCircle,
  Plus,
  Receipt,
  Search,
  Trash2,
  Users,
  XCircle,
} from "lucide-react"
import { DemoBadge } from "@/components/academia/demo-badge"
import { mockLevels as initialLevels, getLevelStats, sumStats, type MockLevel, type MockLesson } from "@/lib/mock/academia"
import { siteConfig } from "@/lib/site"

// Vista de ejemplo del panel de gestión. Las secciones espejan las
// colecciones reales de Payload (Levels/Modules/Lessons, Students, Orders):
// en producción este panel es el /admin de Payload conectado a Postgres.
// Todo acá es estado local del navegador; no persiste.

type View = "resumen" | "contenido" | "alumnos" | "ventas"
type OrderStatus = "approved" | "pending" | "rejected"

const levelTitle: Record<string, string> = Object.fromEntries(initialLevels.map((l) => [l.slug, l.title]))

const sampleStudents = [
  { name: "Martina Gómez", email: "martina@ejemplo.com", levels: ["principiante", "intermedio", "profesional"], joined: "12 sep 2026" },
  { name: "Lucas Fernández", email: "lucas@ejemplo.com", levels: ["principiante"], joined: "14 sep 2026" },
  { name: "Sofía Herrera", email: "sofia@ejemplo.com", levels: ["intermedio"], joined: "18 sep 2026" },
  { name: "Tomás Ruiz", email: "tomas@ejemplo.com", levels: ["principiante", "intermedio", "profesional"], joined: "21 sep 2026" },
  { name: "Valentina Díaz", email: "valentina@ejemplo.com", levels: ["profesional"], joined: "25 sep 2026" },
  { name: "Lucía Paz", email: "lucia@ejemplo.com", levels: ["principiante"], joined: "28 sep 2026" },
]

const sampleOrders: { id: string; date: string; name: string; email: string; product: string; status: OrderStatus }[] = [
  { id: "MP-2026092810", date: "28 sep 2026", name: "Lucía Paz", email: "lucia@ejemplo.com", product: "Nivel Principiante", status: "approved" },
  { id: "MP-2026092741", date: "27 sep 2026", name: "Camila Torres", email: "camila@ejemplo.com", product: "Academia Completa", status: "rejected" },
  { id: "MP-2026092633", date: "26 sep 2026", name: "Nicolás Pérez", email: "nicolas@ejemplo.com", product: "Nivel Intermedio", status: "pending" },
  { id: "MP-2026092519", date: "25 sep 2026", name: "Valentina Díaz", email: "valentina@ejemplo.com", product: "Nivel Profesional", status: "approved" },
  { id: "MP-2026092107", date: "21 sep 2026", name: "Tomás Ruiz", email: "tomas@ejemplo.com", product: "Academia Completa", status: "approved" },
  { id: "MP-2026091822", date: "18 sep 2026", name: "Sofía Herrera", email: "sofia@ejemplo.com", product: "Nivel Intermedio", status: "approved" },
  { id: "MP-2026091415", date: "14 sep 2026", name: "Lucas Fernández", email: "lucas@ejemplo.com", product: "Nivel Principiante", status: "approved" },
  { id: "MP-2026091203", date: "12 sep 2026", name: "Martina Gómez", email: "martina@ejemplo.com", product: "Academia Completa", status: "approved" },
]

const statusMeta: Record<OrderStatus, { label: string; className: string; icon: typeof CheckCircle2; activity: string }> = {
  approved: {
    label: "Aprobado",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    icon: CheckCircle2,
    activity: "Pago aprobado · cuenta habilitada · email de acceso enviado",
  },
  pending: {
    label: "Pendiente",
    className: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    icon: Clock,
    activity: "Pago pendiente · la cuenta se habilita al aprobarse",
  },
  rejected: {
    label: "Rechazado",
    className: "border-red-500/30 bg-red-500/10 text-red-300",
    icon: XCircle,
    activity: "Pago rechazado · no se otorgó acceso",
  },
}

const navItems: { id: View; label: string; icon: typeof Users }[] = [
  { id: "resumen", label: "Resumen", icon: LayoutDashboard },
  { id: "contenido", label: "Contenido", icon: BookOpen },
  { id: "alumnos", label: "Alumnos", icon: Users },
  { id: "ventas", label: "Ventas", icon: Receipt },
]

const viewTitles: Record<View, { title: string; subtitle: string }> = {
  resumen: { title: "Resumen", subtitle: "Estado general de la Academia" },
  contenido: { title: "Contenido", subtitle: "Niveles, módulos y lecciones" },
  alumnos: { title: "Alumnos", subtitle: "Cuentas creadas automáticamente al aprobarse el pago" },
  ventas: { title: "Ventas", subtitle: "Pagos recibidos por Mercado Pago" },
}

export default function GestionPage() {
  const [view, setView] = useState<View>("resumen")
  const [levels, setLevels] = useState<MockLevel[]>(initialLevels)

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card/60 lg:flex">
        <div className="border-b border-border px-6 py-6">
          <Link href="/" className="font-heading text-xl font-bold uppercase tracking-wider text-foreground">
            {siteConfig.brandName}
          </Link>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Panel de gestión</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = view === item.id
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                  active ? "bg-accent/10 text-foreground shadow-[inset_2px_0_0_var(--accent)]" : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-accent" : ""}`} />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="space-y-4 border-t border-border p-5">
          <DemoBadge />
          <Link href="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
            <ExternalLink className="h-3.5 w-3.5" /> Ver sitio
          </Link>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-xs font-bold text-accent">
              JM
            </span>
            <div>
              <p className="text-sm text-foreground">Juan Manuel</p>
              <p className="text-[11px] text-muted-foreground">Administrador</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="border-b border-border px-6 py-6 lg:px-10">
          <div className="flex items-center justify-between gap-4 lg:hidden">
            <span className="font-heading text-lg font-bold uppercase tracking-wider text-foreground">{siteConfig.brandName}</span>
            <DemoBadge />
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`shrink-0 px-4 py-2 text-xs font-semibold uppercase tracking-widest ${
                  view === item.id ? "bg-accent text-accent-foreground" : "border border-border text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold uppercase tracking-tight text-foreground lg:mt-0">
            {viewTitles[view].title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{viewTitles[view].subtitle}</p>
        </header>

        <main className="px-6 py-8 lg:px-10">
          {view === "resumen" && <ResumenView levels={levels} onNavigate={setView} />}
          {view === "contenido" && <ContenidoView levels={levels} setLevels={setLevels} />}
          {view === "alumnos" && <AlumnosView />}
          {view === "ventas" && <VentasView />}
        </main>
      </div>
    </div>
  )
}

/* ---------------------------------- Resumen --------------------------------- */

function ResumenView({ levels, onNavigate }: { levels: MockLevel[]; onNavigate: (view: View) => void }) {
  const totals = sumStats(levels)
  const approved = sampleOrders.filter((order) => order.status === "approved").length
  const bundleSales = sampleOrders.filter((order) => order.status === "approved" && order.product === "Academia Completa").length
  const studentsPerLevel = levels.map((level) => ({
    slug: level.slug,
    title: level.title,
    count: sampleStudents.filter((student) => student.levels.includes(level.slug)).length,
  }))
  const maxCount = Math.max(...studentsPerLevel.map((item) => item.count), 1)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatTile icon={Users} label="Alumnos activos" value={sampleStudents.length} />
        <StatTile icon={Receipt} label="Ventas aprobadas" value={approved} />
        <StatTile icon={PlayCircle} label="Lecciones publicadas" value={totals.lessons} />
        <StatTile icon={Clock} label="Minutos de contenido" value={totals.minutes} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.3fr]">
        <section className="border border-border bg-card p-6">
          <h2 className="text-sm font-semibold text-foreground">Alumnos con acceso por nivel</h2>
          <p className="mt-1 text-xs text-muted-foreground">Incluye a quienes compraron la Academia Completa</p>
          <ul className="mt-6 space-y-5">
            {studentsPerLevel.map((item) => (
              <li key={item.slug} title={`${item.title}: ${item.count} alumnos`}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/90">{item.title}</span>
                  <span className="font-semibold text-foreground">{item.count}</span>
                </div>
                <div className="mt-2 h-3 w-full">
                  <div className="h-full rounded-r bg-accent" style={{ width: `${(item.count / maxCount) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid grid-cols-2 gap-px border border-border bg-border">
            <div className="bg-card p-4">
              <p className="text-xs text-muted-foreground">Compras de nivel individual</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{approved - bundleSales}</p>
            </div>
            <div className="bg-card p-4">
              <p className="text-xs text-muted-foreground">Compras de Academia Completa</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{bundleSales}</p>
            </div>
          </div>
        </section>

        <section className="border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-sm font-semibold text-foreground">Actividad reciente</h2>
            <button onClick={() => onNavigate("ventas")} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent">
              Ver ventas <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <ul>
            {sampleOrders.slice(0, 5).map((order) => {
              const meta = statusMeta[order.status]
              const Icon = meta.icon
              return (
                <li key={order.id} className="flex items-start gap-4 border-b border-border/60 px-6 py-4 last:border-b-0">
                  <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${meta.className.split(" ").find((c) => c.startsWith("text-"))}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground">
                      {order.name} · <span className="text-muted-foreground">{order.product}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{meta.activity}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{order.date}</span>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </div>
  )
}

function StatTile({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: number | string }) {
  return (
    <div className="border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
      </div>
      <p className="mt-3 text-3xl font-semibold text-foreground">{value}</p>
    </div>
  )
}

/* --------------------------------- Contenido -------------------------------- */

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

const lessonKindLabels: Record<MockLesson["kind"], string> = { video: "Video", texto: "Texto", pdf: "PDF" }
const lessonKindIcons: Record<MockLesson["kind"], typeof PlayCircle> = { video: PlayCircle, texto: FileType, pdf: FileText }

function ContenidoView({ levels, setLevels }: { levels: MockLevel[]; setLevels: React.Dispatch<React.SetStateAction<MockLevel[]>> }) {
  const [selectedLevelSlug, setSelectedLevelSlug] = useState(levels[0].slug)
  const [selectedModuleSlug, setSelectedModuleSlug] = useState(levels[0].modules[0]?.slug ?? "")
  const [newLessonTitle, setNewLessonTitle] = useState("")
  const [newLessonKind, setNewLessonKind] = useState<MockLesson["kind"]>("video")
  const [newModuleTitle, setNewModuleTitle] = useState("")

  const selectedLevel = levels.find((level) => level.slug === selectedLevelSlug) ?? levels[0]
  const selectedModule = selectedLevel.modules.find((m) => m.slug === selectedModuleSlug)

  function updateSelectedLevel(update: (level: MockLevel) => MockLevel) {
    setLevels((prev) => prev.map((level) => (level.slug === selectedLevelSlug ? update(level) : level)))
  }

  function handleSelectLevel(slug: string) {
    setSelectedLevelSlug(slug)
    setSelectedModuleSlug(levels.find((l) => l.slug === slug)?.modules[0]?.slug ?? "")
  }

  function handleAddModule(event: React.FormEvent) {
    event.preventDefault()
    if (!newModuleTitle.trim()) return
    const slug = slugify(newModuleTitle) || `modulo-${Date.now()}`
    updateSelectedLevel((level) => ({ ...level, modules: [...level.modules, { slug, title: newModuleTitle, lessons: [] }] }))
    setSelectedModuleSlug(slug)
    setNewModuleTitle("")
  }

  function handleAddLesson(event: React.FormEvent) {
    event.preventDefault()
    if (!newLessonTitle.trim() || !selectedModuleSlug) return
    const slug = slugify(newLessonTitle) || `leccion-${Date.now()}`
    updateSelectedLevel((level) => ({
      ...level,
      modules: level.modules.map((m) =>
        m.slug === selectedModuleSlug ? { ...m, lessons: [...m.lessons, { slug, title: newLessonTitle, kind: newLessonKind }] } : m,
      ),
    }))
    setNewLessonTitle("")
  }

  function handleRemoveLesson(moduleSlug: string, lessonSlug: string) {
    updateSelectedLevel((level) => ({
      ...level,
      modules: level.modules.map((m) => (m.slug === moduleSlug ? { ...m, lessons: m.lessons.filter((l) => l.slug !== lessonSlug) } : m)),
    }))
  }

  return (
    <div className="grid gap-8 2xl:grid-cols-[260px_1fr_320px] xl:grid-cols-[240px_1fr]">
      <div className="flex gap-3 overflow-x-auto xl:flex-col xl:overflow-visible">
        {levels.map((level) => {
          const isSelected = level.slug === selectedLevelSlug
          const stats = getLevelStats(level)
          return (
            <button
              key={level.slug}
              onClick={() => handleSelectLevel(level.slug)}
              className={`flex min-w-[220px] items-center gap-4 border p-3 text-left transition-colors xl:min-w-0 ${
                isSelected ? "border-accent bg-accent/[0.06]" : "border-border bg-card hover:border-accent/30"
              }`}
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden">
                <Image src={level.image} alt="" fill sizes="56px" className="object-cover" style={{ objectPosition: level.imagePosition }} />
              </div>
              <div className="min-w-0">
                <p className={`truncate font-heading text-sm font-bold uppercase tracking-wide ${isSelected ? "text-accent" : "text-foreground"}`}>
                  {level.title}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {stats.modules} módulos · {stats.lessons} lecciones
                </p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="min-w-0 space-y-4">
        {selectedLevel.modules.map((courseModule, moduleIndex) => {
          const isModuleSelected = courseModule.slug === selectedModuleSlug
          return (
            <div key={courseModule.slug} className={`border transition-colors ${isModuleSelected ? "border-accent/50" : "border-border"}`}>
              <div className={`flex items-center justify-between gap-4 px-5 py-4 ${isModuleSelected ? "bg-accent/[0.06]" : "bg-card"}`}>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Módulo {String(moduleIndex + 1).padStart(2, "0")}</p>
                  <p className="mt-0.5 truncate text-sm font-semibold uppercase tracking-wide text-foreground">{courseModule.title}</p>
                </div>
                <button
                  onClick={() => setSelectedModuleSlug(courseModule.slug)}
                  className={`shrink-0 border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                    isModuleSelected ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isModuleSelected ? "Editando" : "Editar"}
                </button>
              </div>
              <ul>
                {courseModule.lessons.map((lesson) => {
                  const LessonIcon = lessonKindIcons[lesson.kind]
                  return (
                    <li key={lesson.slug} className="flex items-center justify-between gap-3 border-t border-border/60 px-5 py-3.5 text-sm">
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-background">
                          <LessonIcon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                        </span>
                        <span className="truncate text-foreground">{lesson.title}</span>
                        <span className="shrink-0 border border-border/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                          {lessonKindLabels[lesson.kind]}
                        </span>
                        {lesson.duration && <span className="shrink-0 text-xs text-muted-foreground">{lesson.duration}</span>}
                      </span>
                      <span className="flex shrink-0 items-center gap-3">
                        <span className="hidden text-[10px] uppercase tracking-widest text-emerald-300/80 sm:inline">Publicada</span>
                        <button
                          onClick={() => handleRemoveLesson(courseModule.slug, lesson.slug)}
                          aria-label={`Quitar ${lesson.title}`}
                          className="p-1.5 text-muted-foreground/60 transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    </li>
                  )
                })}
                {courseModule.lessons.length === 0 && (
                  <li className="border-t border-border/60 px-5 py-4 text-xs text-muted-foreground">Sin lecciones todavía.</li>
                )}
              </ul>
            </div>
          )
        })}

        <form onSubmit={handleAddModule} className="flex gap-3 border border-dashed border-border p-4">
          <input
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            placeholder="Nombre del nuevo módulo"
            className="min-w-0 flex-1 border border-border bg-transparent px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent"
          />
          <button type="submit" className="inline-flex shrink-0 items-center gap-2 bg-foreground px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-background hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> Módulo
          </button>
        </form>
      </div>

      <div className="h-fit border border-accent/40 bg-accent/[0.03] p-6 xl:col-span-2 2xl:col-span-1">
        <p className="text-xs font-bold uppercase tracking-widest text-accent">Nueva lección</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          En <span className="text-foreground">{selectedLevel.title}</span> · {selectedModule?.title ?? "elegí un módulo"}
        </p>
        <form onSubmit={handleAddLesson} className="mt-6 flex flex-col gap-5">
          <label className="block">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Título</span>
            <input
              value={newLessonTitle}
              onChange={(e) => setNewLessonTitle(e.target.value)}
              placeholder="Ej: Cómo elegir tinta"
              className="mt-1.5 w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent"
            />
          </label>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Tipo de contenido</span>
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {(["video", "texto", "pdf"] as const).map((kind) => {
                const KindIcon = lessonKindIcons[kind]
                const active = newLessonKind === kind
                return (
                  <button
                    type="button"
                    key={kind}
                    onClick={() => setNewLessonKind(kind)}
                    className={`flex flex-col items-center gap-1.5 border py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      active ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-accent/30"
                    }`}
                  >
                    <KindIcon className="h-4 w-4" strokeWidth={1.75} />
                    {lessonKindLabels[kind]}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="border border-dashed border-border px-4 py-5 text-center text-xs text-muted-foreground">
            {newLessonKind === "video" ? "Video: se vincula desde Bunny Stream" : newLessonKind === "pdf" ? "Arrastrá el PDF acá" : "Texto con editor enriquecido"}
          </div>
          <button
            type="submit"
            disabled={!selectedModuleSlug}
            className="inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" /> Publicar lección
          </button>
        </form>
      </div>
    </div>
  )
}

/* ---------------------------------- Alumnos --------------------------------- */

function AlumnosView() {
  const [query, setQuery] = useState("")
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sampleStudents
    return sampleStudents.filter((s) => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="border border-border bg-card">
      <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o email"
            className="w-full border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground outline-none focus:border-accent"
          />
        </label>
        <p className="text-xs text-muted-foreground">{filtered.length} alumnos</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="px-5 py-3 font-medium">Alumno</th>
              <th className="px-5 py-3 font-medium">Niveles habilitados</th>
              <th className="px-5 py-3 font-medium">Alta</th>
              <th className="px-5 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student) => (
              <tr key={student.email} className="border-b border-border/60 last:border-b-0 hover:bg-foreground/[0.02]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                      {student.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                    </span>
                    <div>
                      <p className="text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {student.levels.length === 3 ? (
                      <span className="border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                        Academia Completa
                      </span>
                    ) : (
                      student.levels.map((slug) => (
                        <span key={slug} className="border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/80">
                          {levelTitle[slug]}
                        </span>
                      ))
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{student.joined}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Activo
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ---------------------------------- Ventas ---------------------------------- */

function VentasView() {
  const [filter, setFilter] = useState<OrderStatus | "all">("all")
  const filtered = filter === "all" ? sampleOrders : sampleOrders.filter((order) => order.status === filter)
  const counts = {
    all: sampleOrders.length,
    approved: sampleOrders.filter((o) => o.status === "approved").length,
    pending: sampleOrders.filter((o) => o.status === "pending").length,
    rejected: sampleOrders.filter((o) => o.status === "rejected").length,
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["all", "approved", "pending", "rejected"] as const).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
              filter === key ? "bg-accent text-accent-foreground" : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {key === "all" ? "Todas" : statusMeta[key].label} · {counts[key]}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="px-5 py-3 font-medium">Fecha</th>
              <th className="px-5 py-3 font-medium">Comprador</th>
              <th className="px-5 py-3 font-medium">Producto</th>
              <th className="px-5 py-3 font-medium">ID Mercado Pago</th>
              <th className="px-5 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const meta = statusMeta[order.status]
              const Icon = meta.icon
              return (
                <tr key={order.id} className="border-b border-border/60 last:border-b-0 hover:bg-foreground/[0.02]">
                  <td className="px-5 py-4 text-muted-foreground">{order.date}</td>
                  <td className="px-5 py-4">
                    <p className="text-foreground">{order.name}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </td>
                  <td className="px-5 py-4 text-foreground/90">{order.product}</td>
                  <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{order.id}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[11px] font-semibold ${meta.className}`}>
                      <Icon className="h-3.5 w-3.5" /> {meta.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <GraduationCap className="h-3.5 w-3.5 text-accent" />
        Solo los pagos aprobados crean la cuenta y habilitan el nivel comprado.
      </p>
    </div>
  )
}
