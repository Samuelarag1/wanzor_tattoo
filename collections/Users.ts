import type { CollectionConfig } from "payload"

// Editores de contenido (panel /admin). Separada de Students: esta colección
// nunca representa alumnos y no participa del control de acceso por compra.
export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email agregado por defecto por Payload.
  ],
}
