const defaultSiteUrl = "https://www.wanzortatt.com"

export const siteConfig = {
  brandName: "Wanzor Tatt",
  businessName: "Wanzor Tatt",
  defaultTitle: "Wanzor Tatt | Mentoria para tatuadores",
  titleTemplate: "%s | Wanzor Tatt",
  description:
    "Wanzor Tatt ofrece mentorias 1 a 1 para tatuadores que quieren mejorar precios, ordenar su marca personal y atraer clientes mas alineados con su nivel.",
  language: "es",
  locale: "es_AR",
  keywords: [
    "wanzor tatt",
    "wanzortatt",
    "mentoria para tatuadores",
    "consultoria para tatuadores",
    "asesoria para tatuadores",
    "marca personal para tatuadores",
    "precios para tatuadores",
    "clientes para tatuadores",
    "negocio para tatuadores",
    "mentoria 1 a 1 para tatuadores",
  ],
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl).replace(/\/$/, ""),
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL,
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/5491100000000",
  heroImage: "/images/hero-mejorar.jpeg",
  secondaryImage: "/images/hero-tatuas.jpeg",
} as const

export const seoFaqs = [
  {
    question: "Para quien es esta mentoria para tatuadores?",
    answer:
      "Esta mentoria esta pensada para tatuadores que ya saben tatuar, tienen base tecnica y quieren mejorar precios, marca personal, captacion de clientes y direccion profesional.",
  },
  {
    question: "Que se trabaja en una consultoria para tatuadores?",
    answer:
      "Se trabaja posicionamiento de marca, estrategia de contenidos, propuesta de valor, sistema de consultas, experiencia del cliente, precios y toma de decisiones para crecer con mas criterio.",
  },
  {
    question: "La mentoria ayuda a cobrar mejor por mis tatuajes?",
    answer:
      "Si. Uno de los focos es dejar de cobrar por inseguridad o desorden y empezar a sostener precios alineados con tu nivel, tu estilo y el tipo de cliente que queres atraer.",
  },
  {
    question: "Es una mentoria grupal o personalizada?",
    answer:
      "La propuesta esta orientada a mentorias personalizadas para bajar la estrategia a tu realidad, tu momento profesional y tus objetivos como tatuador.",
  },
  {
    question: "Sirve si ya tatuo bien pero no logro crecer?",
    answer:
      "Si. Justamente esta pagina apunta a tatuadores que ya saben tatuar y necesitan mejorar el negocio que rodea a su trabajo: marca, ventas, mensajes, posicionamiento y enfoque.",
  },
] as const

export const seoTopics = [
  {
    title: "Mentoria 1 a 1 para tatuadores",
    description:
      "Un acompanamiento personalizado para revisar tu situacion actual, detectar cuellos de botella y definir un plan accionable segun tu etapa profesional.",
  },
  {
    title: "Consultoria de marca personal",
    description:
      "Trabajo sobre identidad, comunicacion, percepcion de valor y contenido para que tu perfil atraiga al cliente correcto y no solo consultas sueltas.",
  },
  {
    title: "Precios, clientes y sistema comercial",
    description:
      "Ordenamos presupuestos, filtros, mensajes y procesos para que dejes de improvisar y puedas vender mejor sin bajar el nivel de tu trabajo.",
  },
] as const

export function getAbsoluteUrl(path = "") {
  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`
}
