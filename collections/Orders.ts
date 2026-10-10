import type { CollectionConfig } from "payload"

// Fuente de verdad de qué alumno tiene acceso a qué nivel. La crea/actualiza
// el webhook de Mercado Pago (Fase 3) vía Local API con overrideAccess: true,
// nunca el alumno directamente — de ahí el access control cerrado a admins.
export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "mpPaymentId",
    defaultColumns: ["student", "product", "status", "createdAt"],
  },
  access: {
    read: ({ req }) => req.user?.collection === "users",
    create: ({ req }) => req.user?.collection === "users",
    update: ({ req }) => req.user?.collection === "users",
    delete: ({ req }) => req.user?.collection === "users",
  },
  fields: [
    {
      name: "student",
      type: "relationship",
      relationTo: "students",
      required: true,
      index: true,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
    },
    {
      name: "levels",
      label: "Niveles otorgados",
      type: "relationship",
      relationTo: "levels",
      hasMany: true,
      required: true,
    },
    {
      name: "mpPaymentId",
      label: "Payment ID de Mercado Pago",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      options: [
        { label: "Pendiente", value: "pending" },
        { label: "Aprobada", value: "approved" },
        { label: "Rechazada", value: "rejected" },
      ],
    },
    {
      name: "amount",
      type: "number",
    },
    {
      name: "currency",
      type: "text",
    },
  ],
}
