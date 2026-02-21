"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PainPointsSection } from "@/components/pain-points-section"
import { ImageRevealSection } from "@/components/image-reveal-section"
import { ServicesSection } from "@/components/services-section"
import { ManifestoSection } from "@/components/manifesto-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <PainPointsSection />
      <ImageRevealSection />
      <ManifestoSection />
      <ServicesSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
