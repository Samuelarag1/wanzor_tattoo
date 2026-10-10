import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contactate con ${siteConfig.brandName}.`,
}

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <CtaSection />
      </main>
      <Footer />
      <WhatsappButton />
    </>
  )
}
