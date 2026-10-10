import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Mi historia",
  description: `La historia detrás de ${siteConfig.brandName} y la Academia.`,
}

export default function MiHistoriaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <AboutSection />
      </main>
      <Footer />
      <WhatsappButton />
    </>
  )
}
