import type { CollectionConfig } from "payload"

// Copy de venta de cada nivel (Principiante/Intermedio/Profesional). Es
// contenido público: alimenta /academia y /academia/[slug]. El contenido
// que sí requiere permisos (video/PDF/texto de las clases) vive en
// Modules -> Lessons, no acá.
export const Levels: CollectionConfig = {
  slug: "levels",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "order"],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.collection === "users",
    update: ({ req }) => req.user?.collection === "users",
    delete: ({ req }) => req.user?.collection === "users",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
    },
    {
      name: "tagline",
      type: "text",
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "resultado",
      label: "Qué vas a conseguir",
      type: "richText",
    },
    {
      name: "paraQuien",
      label: "Para quién es",
      type: "richText",
    },
    {
      name: "queIncluye",
      label: "Qué incluye",
      type: "richText",
    },
    {
      name: "comoFunciona",
      label: "Cómo funciona",
      type: "richText",
    },
    {
      name: "faq",
      label: "Preguntas frecuentes",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
  ],
}
