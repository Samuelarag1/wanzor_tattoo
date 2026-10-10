import path from "path"
import { fileURLToPath } from "url"
import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import sharp from "sharp"

import { Users } from "./collections/Users"
import { Students } from "./collections/Students"
import { Media } from "./collections/Media"
import { Levels } from "./collections/Levels"
import { Modules } from "./collections/Modules"
import { Lessons } from "./collections/Lessons"
import { Products } from "./collections/Products"
import { Orders } from "./collections/Orders"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Students, Media, Levels, Modules, Lessons, Products, Orders],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    // Fase 3/4: @payloadcms/storage-vercel-blob para Media (imágenes/PDFs)
    // en cuanto exista BLOB_READ_WRITE_TOKEN.
  ],
})
