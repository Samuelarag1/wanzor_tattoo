import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PainPointsSection } from "@/components/pain-points-section"
import { ImageRevealSection } from "@/components/image-reveal-section"
import { WhatIDoSection } from "@/components/what-i-do-section"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AboutSection } from "@/components/about-section"
import { FaqSection } from "@/components/faq-section"
import { ManifestoSection } from "@/components/manifesto-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { HomePageShell } from "@/components/home-page-shell"
import { SeoContentSection } from "@/components/seo-content-section"
import { StructuredData } from "@/components/structured-data"
import { getAbsoluteUrl, siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Mentoria para tatuadores que ya saben tatuar",
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Wanzor Tatt | Mentoria para tatuadores",
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandName,
    images: [
      {
        url: getAbsoluteUrl(siteConfig.heroImage),
        width: 1200,
        height: 630,
        alt: "Wanzor Tatt, mentoria para tatuadores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wanzor Tatt | Mentoria para tatuadores",
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
        <ImageRevealSection />
        <WhatIDoSection />
        <PainPointsSection />
        <SeoContentSection />
        <ManifestoSection />
        <ServicesSection />
        <TestimonialsSection />
        <AboutSection />
        <FaqSection />
        <CtaSection />
        <Footer />
        <WhatsappButton />
      </HomePageShell>
    </>
  )
}
