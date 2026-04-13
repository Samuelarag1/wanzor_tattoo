"use client"

import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function ImageRevealSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const imageSrc = "/tatuas_bien.png"

  return (
    <section className="relative py-0 overflow-hidden">
      <div ref={ref} className="relative h-[80vh] md:h-screen">
        {/* Cinema reveal image */}
        <div
          className="absolute inset-0 transition-all duration-[1500ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            clipPath: isVisible ? "inset(0 0 0 0)" : "inset(50% 0 50% 0)",
          }}
        >
          <Image
            src={imageSrc}
            alt="Tatuador profesional trabajando mientras desarrolla su marca y su negocio"
            fill
            sizes="100vw"
            className={`h-full w-full object-cover transition-transform duration-[2000ms] ${
              isVisible ? "scale-100" : "scale-110"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/60" />
        </div>

        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10">
        <h2
  className={`font-heading text-5xl font-bold uppercase leading-none tracking-tight text-foreground md:text-7xl lg:text-8xl transition-all duration-1000 delay-500 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`}
>
  <span className="block text-6xl md:text-8xl lg:text-9xl leading-[0.9]">
    Tatuás bien
  </span>

  <span className="mt-1 md:mt-2 block text-base md:text-xl lg:text-2xl font-sans font-normal normal-case tracking-wide text-muted-foreground">
    <span className="font-akkurat-strong text-foreground text-lg md:text-2xl text-gray-300">
      PERO NO ESTÁS DONDE DEBERÍAS
    </span>
  </span>
</h2>
        </div>
      </div>
    </section>
  )
}
