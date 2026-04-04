"use client"

import { useState, useEffect, useCallback } from "react"
import { siteConfig } from "@/lib/site"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Qué resuelvo", href: "#mentoria" },
  { label: "Servicios", href: "#servicios" },
  { label: "Contacto", href: "#contacto" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isMobileOpen])

  const closeMobile = useCallback(() => setIsMobileOpen(false), [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#inicio" className="font-heading text-2xl font-bold tracking-wider text-foreground uppercase">
            {siteConfig.brandName}
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <a
              href={siteConfig.bookingUrl || "#contacto"}
              target={siteConfig.bookingUrl ? "_blank" : undefined}
              rel={siteConfig.bookingUrl ? "noopener noreferrer" : undefined}
              className="bg-accent text-accent-foreground px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all hover:opacity-90"
            >
              Agendar
            </a>
          </div>

          {/* Mobile Toggle - Custom animated hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span
              className={`block h-[1.5px] w-6 bg-foreground transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
                isMobileOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-foreground transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isMobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-foreground transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
                isMobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-background/98 backdrop-blur-2xl transition-opacity duration-700 ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Decorative lines */}
        <div
          className={`absolute top-1/4 left-8 h-px bg-gradient-to-r from-accent/30 to-transparent transition-all duration-1000 delay-300 ${
            isMobileOpen ? "w-24 opacity-100" : "w-0 opacity-0"
          }`}
        />
        <div
          className={`absolute bottom-1/3 right-8 h-px bg-gradient-to-l from-accent/30 to-transparent transition-all duration-1000 delay-500 ${
            isMobileOpen ? "w-32 opacity-100" : "w-0 opacity-0"
          }`}
        />

        {/* Menu content */}
        <div className="relative z-10 flex h-full flex-col justify-center px-10">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className={`group flex items-center gap-4 py-4 transition-all ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  isMobileOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{
                  transitionDuration: "600ms",
                  transitionDelay: isMobileOpen ? `${200 + i * 80}ms` : "0ms",
                }}
              >
                <span className="text-xs tabular-nums text-accent/60 font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-3xl font-bold uppercase tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {link.label}
                </span>
                <span className="h-px flex-1 bg-border/40 transition-all duration-500 group-hover:bg-accent/40" />
              </a>
            ))}
          </nav>

          {/* CTA button */}
          <div
            className={`mt-12 transition-all ease-[cubic-bezier(0.76,0,0.24,1)] ${
              isMobileOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{
              transitionDuration: "600ms",
              transitionDelay: isMobileOpen ? "600ms" : "0ms",
            }}
          >
            <a
              href={siteConfig.bookingUrl || "#contacto"}
              onClick={closeMobile}
              target={siteConfig.bookingUrl ? "_blank" : undefined}
              rel={siteConfig.bookingUrl ? "noopener noreferrer" : undefined}
              className="inline-flex w-full items-center justify-center gap-3 bg-accent text-accent-foreground py-4 text-sm font-bold uppercase tracking-[0.2em] transition-all hover:opacity-90"
            >
              Agendar llamada
              <span className="text-lg">{"→"}</span>
            </a>
          </div>

          {/* Brand footer in mobile menu */}
          <div
            className={`absolute bottom-10 left-10 right-10 flex items-center justify-between transition-all ease-[cubic-bezier(0.76,0,0.24,1)] ${
              isMobileOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDuration: "600ms",
              transitionDelay: isMobileOpen ? "700ms" : "0ms",
            }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {siteConfig.brandName}
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Tatuajes profesionales
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
