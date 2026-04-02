"use client"

import { Instagram } from "lucide-react"
import { siteConfig } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-heading text-xl font-bold uppercase tracking-wider text-foreground">
              {siteConfig.brandName}
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
              Mentoria para Tatuadores
            </p>
          </div>

          {siteConfig.instagramUrl ? (
            <div className="flex items-center gap-6">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-accent"
                aria-label="Instagram"
              >
                <Instagram size={20} strokeWidth={1.5} />
              </a>
            </div>
          ) : (
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Marca, precios y clientes
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            {`${siteConfig.brandName}. Todos los derechos reservados.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
