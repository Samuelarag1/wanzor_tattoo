import type { CollectionConfig } from "payload"

// Imágenes y PDFs de la Academia (portadas de nivel, recursos descargables).
// Fase 3/4: sumar el adaptador @payloadcms/storage-vercel-blob cuando exista
// BLOB_READ_WRITE_TOKEN; hasta entonces los archivos quedan en disco local.
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
  upload: {
    mimeTypes: ["image/*", "application/pdf"],
  },
}
