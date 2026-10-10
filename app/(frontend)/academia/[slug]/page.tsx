import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { LevelTemplate } from "@/components/academia/level-template"
import { mockProducts, getMockProduct } from "@/lib/mock/academia"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return mockProducts.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const product = getMockProduct(slug)
  if (!product) return {}
  return {
    title: product.title,
    description: `${product.title} — Academia Wanzor Tatt.`,
  }
}

export default async function AcademiaLevelPage({ params }: { params: Params }) {
  const { slug } = await params
  const product = getMockProduct(slug)
  if (!product) notFound()

  return (
    <>
      <Navbar />
      <main>
        <LevelTemplate product={product} />
      </main>
      <Footer />
      <WhatsappButton />
    </>
  )
}
