import type { CollectionConfig } from "payload"

import { enrolledLevelAccess } from "./access/enrolledLevelAccess"

// Agrupador de Lessons dentro de un Level. Contenido protegido: solo lo ve
// un admin o un alumno con una Order aprobada que otorgue ese nivel.
export const Modules: CollectionConfig = {
  slug: "modules",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "level", "order"],
  },
  access: {
    read: enrolledLevelAccess,
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
      name: "level",
      type: "relationship",
      relationTo: "levels",
      required: true,
      index: true,
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
    },
  ],
}
