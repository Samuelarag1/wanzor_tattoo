"use client";

import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-heading text-xl font-bold uppercase tracking-wider text-foreground">
              Wanzor Tatt
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
              Tatuajes Profesionales
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-accent"
              aria-label="Instagram"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            {"Wanzor Tatt. Todos los derechos reservados."}
          </p>
        </div>
      </div>
    </footer>
  );
}
