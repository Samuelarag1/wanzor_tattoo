import { getAbsoluteUrl, seoFaqs, siteConfig } from "@/lib/site"

export function StructuredData() {
  const contactTarget = siteConfig.bookingUrl || siteConfig.whatsappUrl

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.siteUrl}#business`,
        name: siteConfig.businessName,
        brand: {
          "@type": "Brand",
          name: siteConfig.brandName,
        },
        url: siteConfig.siteUrl,
        image: getAbsoluteUrl(siteConfig.heroImage),
        description: siteConfig.description,
        areaServed: {
          "@type": "Country",
          name: "Argentina",
        },
        knowsAbout: [
          "Mentoría para tatuadores",
          "Consultoría para tatuadores",
          "Marca personal para tatuadores",
          "Precios para tatuadores",
          "Captación de clientes para tatuadores",
        ],
        sameAs: siteConfig.instagramUrl ? [siteConfig.instagramUrl] : undefined,
      },
      {
        "@type": "Service",
        "@id": `${siteConfig.siteUrl}#service`,
        name: "Mentoría 1 a 1 para tatuadores",
        serviceType: "Mentoría para tatuadores",
        provider: {
          "@id": `${siteConfig.siteUrl}#business`,
        },
        areaServed: {
          "@type": "Country",
          name: "Argentina",
        },
        audience: {
          "@type": "Audience",
          audienceType: "Tatuadores que ya saben tatuar",
        },
        description: siteConfig.description,
        availableChannel: contactTarget
          ? {
              "@type": "ServiceChannel",
              serviceUrl: contactTarget,
            }
          : undefined,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}#website`,
        url: siteConfig.siteUrl,
        name: siteConfig.brandName,
        inLanguage: siteConfig.language,
        description: siteConfig.description,
        potentialAction: contactTarget
          ? {
              "@type": "ContactAction",
              target: contactTarget,
            }
          : undefined,
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.siteUrl}#webpage`,
        url: siteConfig.siteUrl,
        name: "Mentoría para tatuadores | Wanzor Tatt",
        isPartOf: {
          "@id": `${siteConfig.siteUrl}#website`,
        },
        about: {
          "@id": `${siteConfig.siteUrl}#service`,
        },
        inLanguage: siteConfig.language,
        description: siteConfig.description,
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.siteUrl}#faq`,
        mainEntity: seoFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
