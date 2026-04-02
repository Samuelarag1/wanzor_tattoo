import type { Metadata, Viewport } from "next"
import { Oswald } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { getAbsoluteUrl, siteConfig } from "@/lib/site"
import "./globals.css"

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
})

const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const facebookDomainVerification =
  process.env.FACEBOOK_DOMAIN_VERIFICATION || process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION

const verification: NonNullable<Metadata["verification"]> = {
  ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
  ...(facebookDomainVerification
    ? {
        other: {
          "facebook-domain-verification": facebookDomainVerification,
        },
      }
    : {}),
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.brandName,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.brandName }],
  creator: siteConfig.brandName,
  publisher: siteConfig.brandName,
  category: "business",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandName,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
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
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [getAbsoluteUrl(siteConfig.heroImage)],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  ...(Object.keys(verification).length > 0 ? { verification } : {}),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={siteConfig.language} className={oswald.variable}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
