import type { CollectionConfig } from "payload"

import { enrolledLevelAccess } from "./access/enrolledLevelAccess"

// Unidad de contenido real: texto, video (referencia a Bunny Stream) e
// imágenes/PDFs adjuntos. `level` se copia automáticamente del Module para
// que el control de acceso pueda filtrar por un único campo indexado.
export const Lessons: CollectionConfig = {
  slug: "lessons",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "module", "order"],
  },
  access: {
    read: enrolledLevelAccess,
    create: ({ req }) => req.user?.collection === "users",
    update: ({ req }) => req.user?.collection === "users",
    delete: ({ req }) => req.user?.collection === "users",
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data?.module) {
          const moduleDoc = await req.payload.findByID({
            collection: "modules",
            id: data.module,
            depth: 0,
          })
          data.level = moduleDoc?.level
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "module",
      type: "relationship",
      relationTo: "modules",
      required: true,
    },
    {
      name: "level",
      type: "relationship",
      relationTo: "levels",
      index: true,
      admin: {
        readOnly: true,
        description: "Se completa solo a partir del Module seleccionado.",
      },
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
    },
    {
      name: "body",
      type: "richText",
    },
    {
      name: "bunnyVideoId",
      label: "ID de video (Bunny Stream)",
      type: "text",
      admin: {
        description: "Fase 4: referencia al video en Bunny Stream, no se sube el archivo acá.",
      },
    },
    {
      name: "attachments",
      label: "Imágenes / PDFs adjuntos",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
    },
  ],
}
