import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Products } from "@/components/products"
import { Work } from "@/components/work"
import { Why } from "@/components/why"
import { Consult } from "@/components/consult"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Work />
        <Services />
        <Products />
        <Why />
        <Consult />
      </main>
      <SiteFooter />
    </>
  )
}