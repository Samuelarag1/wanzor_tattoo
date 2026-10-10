// Datos de ejemplo (mock) de la Academia. La forma de estos tipos espeja las
// colecciones reales de Payload (Levels/Modules/Lessons/Products) para que
// reemplazarlos por datos vivos sea un cambio de fuente de datos, no de UI.
// El copy y los precios son de relleno: ver PENDIENTES-ACADEMIA.md.
//
// `icon` es una clave (no el componente) a propósito: este módulo lo
// importan Server Components, y un componente de ícono (función) no se
// puede pasar como prop a un Client Component.
export type MockLevelIcon = "sparkles" | "flame" | "crown"

export type MockLesson = {
  slug: string
  title: string
  kind: "video" | "texto" | "pdf"
  duration?: string
}

export type MockModule = {
  slug: string
  title: string
  lessons: MockLesson[]
}

export type MockLevel = {
  slug: string
  title: string
  order: number
  tagline: string
  icon: MockLevelIcon
  image: string
  imagePosition: string
  summary: string
  resultado: string[]
  paraQuien: string[]
  queIncluye: string[]
  comoFunciona: string[]
  faq: { question: string; answer: string }[]
  modules: MockModule[]
}

export type MockProduct = {
  slug: string
  title: string
  type: "level" | "bundle"
  levelSlugs: string[]
  price: number | null
  currency: "ARS" | "USD"
  featured: boolean
}

export const instructor = {
  name: "Juan Manuel",
  brand: "Wanzor Tatt",
  since: 2015,
  image: "/profile2.png",
  imagePosition: "50% 25%",
  bio: [
    "Me dedico al tatuaje desde el 2015. A lo largo del tiempo desarrollé técnicas, estilos y una manera de ver la profesión que hoy ordeno en esta academia.",
    "No alcanza con tatuar bien: ventas, comunicación, organización y criterio son tan importantes como una línea prolija o un relleno sólido.",
  ],
}

export const bundleImage = { src: "/hero.png", position: "50% 30%" }

export const mockLevels: MockLevel[] = [
  {
    slug: "principiante",
    title: "Principiante",
    order: 1,
    tagline: "Empezar con una base clara",
    icon: "sparkles",
    image: "/profile-2.png",
    imagePosition: "50% 35%",
    summary: "Para tatuadores que están arrancando y necesitan ordenar las bases técnicas y de criterio.",
    resultado: [
      "Una base técnica ordenada: higiene, materiales, configuración de máquina y primeros trazos con criterio profesional.",
      "Un método de trabajo repetible para dejar de improvisar en cada sesión.",
      "Seguridad para trabajar en piel sabiendo por qué hacés cada cosa.",
      "Hábitos de estudio correctos antes de que los vicios se vuelvan costumbre.",
    ],
    paraQuien: [
      "Tatuadores que recién arrancan o llevan poco tiempo tatuando.",
      "Personas que aprendieron de forma autodidacta y quieren corregir vicios.",
      "Quienes quieren entrar al oficio con criterio profesional desde el día uno.",
    ],
    queIncluye: [
      "Clases en video sobre higiene, materiales y configuración de equipo.",
      "Guías descargables en PDF para consulta rápida en el estudio.",
      "Ejercicios prácticos progresivos.",
    ],
    comoFunciona: [
      "Accedés con tu cuenta apenas se aprueba el pago.",
      "Avanzás a tu ritmo, módulo por módulo, desde el panel privado.",
    ],
    faq: [
      {
        question: "¿Necesito experiencia previa para este nivel?",
        answer: "No, este nivel está pensado justamente para quienes están dando sus primeros pasos.",
      },
      {
        question: "¿Cuánto tiempo tengo de acceso?",
        answer: "Contenido de ejemplo — la política de acceso/vigencia todavía se va a definir.",
      },
    ],
    modules: [
      {
        slug: "higiene-y-materiales",
        title: "Higiene y materiales",
        lessons: [
          { slug: "bioseguridad", title: "Bioseguridad en el estudio", kind: "video", duration: "12 min" },
          { slug: "eleccion-de-materiales", title: "Elección de materiales", kind: "video", duration: "9 min" },
          { slug: "checklist-higiene", title: "Checklist de higiene", kind: "pdf" },
        ],
      },
      {
        slug: "primeros-trazos",
        title: "Primeros trazos",
        lessons: [
          { slug: "configuracion-de-maquina", title: "Configuración de máquina", kind: "video", duration: "15 min" },
          { slug: "practica-en-piel-sintetica", title: "Práctica en piel sintética", kind: "video", duration: "20 min" },
        ],
      },
    ],
  },
  {
    slug: "intermedio",
    title: "Intermedio",
    order: 2,
    tagline: "Profesionalizar técnica y criterio",
    icon: "flame",
    image: "/tattoo.jpeg",
    imagePosition: "50% 40%",
    summary: "Para quienes ya tatúan y quieren subir de nivel su técnica, su estilo y su criterio profesional.",
    resultado: [
      "Técnica profesionalizada para resolver piezas más exigentes.",
      "Criterio propio de composición: cómo una pieza se adapta al cuerpo.",
      "Dominio del sombreado y del color aplicado a casos reales.",
      "Un estilo reconocible y sostenible en tu trabajo.",
    ],
    paraQuien: [
      "Tatuadores con base técnica que ya tatúan de forma regular.",
      "Quienes quieren dar el salto de \"tatuar bien\" a \"tatuar con criterio propio\".",
      "Artistas que sienten que su trabajo se estancó.",
    ],
    queIncluye: [
      "Clases avanzadas de composición, sombreado y color.",
      "Revisión de criterio aplicado a casos reales.",
      "Guías de referencia por estilo en PDF.",
    ],
    comoFunciona: [
      "Se suma automáticamente a tu cuenta si ya tenías otro nivel.",
      "Mismo panel privado, nuevos módulos desbloqueados.",
    ],
    faq: [
      {
        question: "¿Puedo comprar Intermedio sin haber hecho Principiante?",
        answer: "Contenido de ejemplo — falta definir si los niveles son correlativos o independientes.",
      },
    ],
    modules: [
      {
        slug: "composicion-y-sombreado",
        title: "Composición y sombreado",
        lessons: [
          { slug: "composicion-aplicada-al-cuerpo", title: "Composición aplicada al cuerpo", kind: "video", duration: "18 min" },
          { slug: "tecnicas-de-sombreado", title: "Técnicas de sombreado", kind: "video", duration: "22 min" },
        ],
      },
      {
        slug: "color-y-estilo",
        title: "Color y estilo propio",
        lessons: [
          { slug: "teoria-del-color-aplicada", title: "Teoría del color aplicada", kind: "video", duration: "14 min" },
          { slug: "guia-de-referencias", title: "Guía de referencias por estilo", kind: "pdf" },
        ],
      },
    ],
  },
  {
    slug: "profesional",
    title: "Profesional",
    order: 3,
    tagline: "Construir carrera, negocio y rentabilidad",
    icon: "crown",
    image: "/tatuas_bien.png",
    imagePosition: "50% 35%",
    summary: "Para tatuadores con nivel técnico sólido que quieren ordenar su marca, sus precios y su negocio.",
    resultado: [
      "Precios alineados a tu nivel y la seguridad para sostenerlos.",
      "Una marca personal ordenada que atrae al cliente correcto.",
      "Un sistema de captación y consultas que no depende de la suerte.",
      "Una carrera sostenible, no solo mejorar tatuando.",
    ],
    paraQuien: [
      "Tatuadores con nivel técnico ya consolidado.",
      "Quienes quieren vivir profesionalmente del tatuaje con una marca ordenada.",
      "Artistas que tienen agenda pero no rentabilidad.",
    ],
    queIncluye: [
      "Estrategia de precios y posicionamiento.",
      "Marca personal, comunicación y captación de clientes.",
      "Plantillas de mensajes y presupuestos en PDF.",
    ],
    comoFunciona: [
      "Acceso desde tu panel privado apenas se aprueba el pago.",
    ],
    faq: [
      {
        question: "¿Este nivel incluye seguimiento personalizado?",
        answer: "Contenido de ejemplo — a definir si el nivel Profesional suma algún tipo de acompañamiento.",
      },
    ],
    modules: [
      {
        slug: "precios-y-posicionamiento",
        title: "Precios y posicionamiento",
        lessons: [
          { slug: "como-armar-tu-presupuesto", title: "Cómo armar tu presupuesto", kind: "video", duration: "16 min" },
          { slug: "posicionamiento-de-marca", title: "Posicionamiento de marca personal", kind: "video", duration: "19 min" },
        ],
      },
      {
        slug: "captacion-de-clientes",
        title: "Captación de clientes",
        lessons: [
          { slug: "contenido-que-vende", title: "Contenido que atrae al cliente correcto", kind: "video", duration: "17 min" },
          { slug: "plantillas-de-mensajes", title: "Plantillas de mensajes y presupuestos", kind: "pdf" },
        ],
      },
    ],
  },
]

export const mockProducts: MockProduct[] = [
  { slug: "principiante", title: "Nivel Principiante", type: "level", levelSlugs: ["principiante"], price: null, currency: "ARS", featured: false },
  { slug: "intermedio", title: "Nivel Intermedio", type: "level", levelSlugs: ["intermedio"], price: null, currency: "ARS", featured: false },
  { slug: "profesional", title: "Nivel Profesional", type: "level", levelSlugs: ["profesional"], price: null, currency: "ARS", featured: false },
  {
    slug: "completa",
    title: "Academia Completa",
    type: "bundle",
    levelSlugs: ["principiante", "intermedio", "profesional"],
    price: null,
    currency: "ARS",
    featured: true,
  },
]

export function getMockLevel(slug: string) {
  return mockLevels.find((level) => level.slug === slug)
}

export function getMockProduct(slug: string) {
  return mockProducts.find((product) => product.slug === slug)
}

export function getLevelsForProduct(product: MockProduct) {
  return mockLevels.filter((level) => product.levelSlugs.includes(level.slug))
}

export function formatMockPrice(product: Pick<MockProduct, "price" | "currency">) {
  if (product.price == null) return "Próximamente"
  return `${product.currency} ${product.price.toLocaleString("es-AR")}`
}

export function plural(count: number, singular: string, pluralForm: string) {
  return `${count} ${count === 1 ? singular : pluralForm}`
}

export function getLevelStats(level: Pick<MockLevel, "modules">) {
  const lessons = level.modules.flatMap((courseModule) => courseModule.lessons)
  const minutes = lessons.reduce((total, lesson) => {
    const match = lesson.duration?.match(/(\d+)/)
    return total + (match ? Number(match[1]) : 0)
  }, 0)
  const pdfs = lessons.filter((lesson) => lesson.kind === "pdf").length
  return { modules: level.modules.length, lessons: lessons.length, minutes, pdfs }
}

export function sumStats(levels: Pick<MockLevel, "modules">[]) {
  return levels.reduce(
    (acc, level) => {
      const stats = getLevelStats(level)
      return {
        modules: acc.modules + stats.modules,
        lessons: acc.lessons + stats.lessons,
        minutes: acc.minutes + stats.minutes,
        pdfs: acc.pdfs + stats.pdfs,
      }
    },
    { modules: 0, lessons: 0, minutes: 0, pdfs: 0 },
  )
}

export function getOrderedLessons(level: MockLevel) {
  return level.modules.flatMap((courseModule) =>
    courseModule.lessons.map((lesson) => ({ lesson, courseModule })),
  )
}

// --- Alumno de ejemplo (demo sin login real) ---------------------------------
// Simula a un alumno que compró Principiante y completó las dos primeras
// lecciones. En producción esto sale de Orders (permisos) y del progreso real.
export const demoStudent = { name: "Lucía Paz", email: "lucia@ejemplo.com" }

export const demoUnlockedLevelSlugs = ["principiante"]

const demoCompletedLessons: Record<string, string[]> = {
  principiante: ["bioseguridad", "eleccion-de-materiales"],
}

export function isMockLevelUnlocked(slug: string) {
  return demoUnlockedLevelSlugs.includes(slug)
}

export function isLessonCompleted(levelSlug: string, lessonSlug: string) {
  return demoCompletedLessons[levelSlug]?.includes(lessonSlug) ?? false
}

export function getLevelProgress(level: MockLevel) {
  const ordered = getOrderedLessons(level)
  const completed = ordered.filter(({ lesson }) => isLessonCompleted(level.slug, lesson.slug)).length
  const next = ordered.find(({ lesson }) => !isLessonCompleted(level.slug, lesson.slug))
  return {
    completed,
    total: ordered.length,
    percent: ordered.length > 0 ? Math.round((completed / ordered.length) * 100) : 0,
    next,
  }
}

export function findMockLesson(levelSlug: string, lessonSlug: string) {
  const level = getMockLevel(levelSlug)
  if (!level) return undefined
  const ordered = getOrderedLessons(level)
  const index = ordered.findIndex(({ lesson }) => lesson.slug === lessonSlug)
  if (index === -1) return undefined
  return {
    level,
    courseModule: ordered[index].courseModule,
    lesson: ordered[index].lesson,
    moduleIndex: level.modules.indexOf(ordered[index].courseModule),
    previous: ordered[index - 1],
    next: ordered[index + 1],
  }
}
