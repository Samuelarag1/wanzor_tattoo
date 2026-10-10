import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { BrandIntroSection } from "@/components/academia/brand-intro-section"
import { LevelsSection } from "@/components/academia/levels-section"
import { HowItWorksSection } from "@/components/academia/how-it-works-section"
import { PlatformPreviewSection } from "@/components/academia/platform-preview-section"
import { AcademiaCompletaCta } from "@/components/academia/academia-completa-cta"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { HomePageShell } from "@/components/home-page-shell"
import { StructuredData } from "@/components/structured-data"
import { getAbsoluteUrl, siteConfig } from "@/lib/site"

// Home reordenada según el scroll del PDF: hero + CTA Academia, presentación
// de marca, tres niveles, cómo funciona, CTA Academia Completa.
//
// NOTA: título/OG actualizados a la Academia, pero siteConfig.description,
// seoFaqs y seoTopics (lib/site.ts) y StructuredData siguen redactados en
// clave de mentoría/consultoría — pendiente de reescritura (ver
// PENDIENTES-ACADEMIA.md, sección 5). Las secciones de mentoría que no
// entran en este nuevo orden (pain-points, seo-content, manifiesto,
// testimonios, FAQ, CTA de agenda) no se borraron, solo se sacaron del
// render de la Home hasta esa decisión de contenido.
export const metadata: Metadata = {
  title: "Academia digital para tatuadores",
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Wanzor Tatt | Academia digital para tatuadores",
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandName,
    images: [
      {
        url: getAbsoluteUrl(siteConfig.heroImage),
        width: 1200,
        height: 630,
        alt: "Wanzor Tatt, Academia digital para tatuadores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wanzor Tatt | Academia digital para tatuadores",
    description: siteConfig.description,
    images: [getAbsoluteUrl(siteConfig.heroImage)],
  },
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <HomePageShell>
        <Navbar />
        <HeroSection />
        <BrandIntroSection />
        <LevelsSection />
        <PlatformPreviewSection />
        <HowItWorksSection />
        <AcademiaCompletaCta />
        <Footer />
        <WhatsappButton />
      </HomePageShell>
    </>
  )
}
