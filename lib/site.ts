const defaultSiteUrl = "https://www.wanzortatt.com"

export const siteConfig = {
  brandName: "Wanzor Tatt",
  businessName: "Wanzor Tatt",
  defaultTitle: "Wanzor Tatt | Mentoría para tatuadores",
  titleTemplate: "%s | Wanzor Tatt",
  description:
    "Wanzor Tatt ofrece mentorías 1 a 1 para tatuadores que quieren mejorar precios, ordenar su marca personal y atraer clientes más alineados con su nivel.",
  language: "es",
  locale: "es_AR",
  keywords: [
    "wanzor tatt",
    "wanzortatt",
    "mentoría para tatuadores",
    "consultoría para tatuadores",
    "asesoría para tatuadores",
    "marca personal para tatuadores",
    "precios para tatuadores",
    "clientes para tatuadores",
    "negocio para tatuadores",
    "mentoría 1 a 1 para tatuadores",
  ],
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl).replace(/\/$/, ""),
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/wanzor.tatt/',
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL,
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/5492804354465",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "Asesorías.wanzortatt@gmail.com",
  heroImage: "/images/hero-mejorar.jpeg",
  secondaryImage: "/images/hero-tatuas.jpeg",
} as const

export const seoFaqs = [
  {
    question: "¿Para quién es esta mentoría para tatuadores?",
    answer:
      "Esta mentoría está pensada para tatuadores que ya saben tatuar, tienen base técnica y quieren mejorar precios, marca personal, captación de clientes y dirección profesional.",
  },
  {
    question: "¿Qué se trabaja en una consultoría para tatuadores?",
    answer:
      "Se trabaja posicionamiento de marca, estrategia de contenidos, propuesta de valor, sistema de consultas, experiencia del cliente, precios y toma de decisiones para crecer con más criterio.",
  },
  {
    question: "¿La mentoría ayuda a cobrar mejor por mis tatuajes?",
    answer:
      "Sí. Uno de los focos principales es elevar tus presupuestos y empezar a sostener precios alineados con tu nivel, tu estilo y el tipo de cliente que querés atraer.",
  },
  {
    question: "¿Es una mentoría grupal o personalizada?",
    answer:
      "La propuesta está orientada a mentorías individuales con estrategias personalizadas para mejorar tu carrera como profesional y lograr tus objetivos como tatuador.",
  },
  {
    question: "¿Me sirve si ya tengo experiencia tatuando?",
    answer:
      "Sí. Justamente esta página apunta a tatuadores que ya saben tatuar y necesitan mejorar el negocio que rodea a su trabajo: marca, ventas, mensajes, posicionamiento y enfoque.",
  },
] as const

export const seoTopics = [
  {
    title: "Mentoría 1 a 1 para tatuadores",
    description:
      "Un acompañamiento personalizado para revisar tu situación actual, detectar cuellos de botella y definir un plan accionable según tu etapa profesional.",
  },
  {
    title: "Consultoría de marca personal",
    description:
      "Trabajo sobre identidad, comunicación, percepción de valor y contenido para que tu perfil atraiga al cliente correcto y no solo consultas sueltas.",
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
