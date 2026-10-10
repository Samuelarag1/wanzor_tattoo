import type { CollectionConfig } from "payload"

// SKU vendible, desacoplado del contenido: "principiante", "intermedio",
// "profesional" y "completa" (bundle). Evita duplicar Levels para representar
// el combo — Academia Completa es un Product que referencia los 3 Levels.
export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "price"],
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
      name: "type",
      type: "select",
      required: true,
      defaultValue: "level",
      options: [
        { label: "Nivel individual", value: "level" },
        { label: "Academia Completa (bundle)", value: "bundle" },
      ],
    },
    {
      name: "levels",
      label: "Niveles que otorga",
      type: "relationship",
      relationTo: "levels",
      hasMany: true,
      required: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "currency",
      type: "select",
      required: true,
      defaultValue: "ARS",
      options: [
        { label: "ARS", value: "ARS" },
        { label: "USD", value: "USD" },
      ],
    },
    {
      name: "featured",
      label: "Destacar (Academia Completa)",
      type: "checkbox",
      defaultValue: false,
    },
  ],
}
