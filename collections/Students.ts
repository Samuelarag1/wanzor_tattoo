import type { CollectionConfig } from "payload"

// Cuentas de alumnos de la Academia. El alta se hace desde el webhook de
// Mercado Pago (Fase 3) usando la Local API de Payload con overrideAccess,
// no por auto-registro público: "Pago aprobado -> cuenta habilitada -> email".
export const Students: CollectionConfig = {
  slug: "students",
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "createdAt"],
  },
  access: {
    // Un alumno solo puede ver/editar su propia cuenta. Los admins ven todas.
    read: ({ req }) => {
      if (req.user?.collection === "users") return true
      if (req.user?.collection === "students") {
        return { id: { equals: req.user.id } }
      }
      return false
    },
    update: ({ req }) => {
      if (req.user?.collection === "users") return true
      if (req.user?.collection === "students") {
        return { id: { equals: req.user.id } }
      }
      return false
    },
    // Sin alta manual desde /admin por defecto: se crean vía Local API (webhook de pago).
    create: ({ req }) => req.user?.collection === "users",
    delete: ({ req }) => req.user?.collection === "users",
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
}
