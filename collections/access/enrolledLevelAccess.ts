import type { Access } from "payload"

/**
 * Acceso de lectura para contenido protegido (Modules, Lessons).
 * Admins (colección `users`) ven todo. Un alumno solo ve documentos cuyo
 * campo `level` está entre los niveles otorgados por sus Orders aprobadas.
 *
 * NOTA: sin una Postgres real conectada todavía (Fase 0 sin DB), esta lógica
 * no se pudo ejercitar contra datos reales — falta validarla en cuanto haya
 * conexión (ver checklist de verificación del plan).
 */
export const enrolledLevelAccess: Access = async ({ req }) => {
  if (req.user?.collection === "users") return true
  if (req.user?.collection !== "students") return false

  const orders = await req.payload.find({
    collection: "orders",
    where: {
      and: [{ student: { equals: req.user.id } }, { status: { equals: "approved" } }],
    },
    depth: 0,
    limit: 0,
  })

  const grantedLevelIds = Array.from(
    new Set(orders.docs.flatMap((order) => (order.levels as (string | number)[]) ?? [])),
  )

  if (grantedLevelIds.length === 0) return false

  return { level: { in: grantedLevelIds } }
}
