import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"
import { mockProducts } from "@/lib/mock/academia"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.siteUrl}/academia`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.siteUrl}/mi-historia`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.siteUrl}/portafolio`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.siteUrl}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ]

  const levelRoutes: MetadataRoute.Sitemap = mockProducts.map((product) => ({
    url: `${siteConfig.siteUrl}/academia/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...levelRoutes]
}
