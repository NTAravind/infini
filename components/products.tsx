import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { Badge } from "@/components/ui/badge"
import { WaitlistForm } from "@/components/waitlist-form"

const PRODUCTS = [
  {
    index: "01",
    name: "WhatsApp AI Agent",
    tag: "Coming Soon",
    description:
      "A multi-tenant WhatsApp AI agent platform for businesses — automated customer support, sales, and bookings, right inside WhatsApp. Currently in development.",
  },
]

export function Products() {
  return (
    <section
      id="products"
      className="scroll-mt-20 border-t border-black bg-black py-24 text-white md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Our products"
            title="Our Products"
            subtitle="Built by infini.io, for businesses like yours."
            index="04 / products"
          />
        </Reveal>

        <div className="mt-14 grid gap-px border border-white/15 bg-white/15 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <Reveal key={product.index} delay={100}>
              <article className="flex h-full flex-col bg-black p-8 md:p-10">
                <div className="flex items-start justify-between">
                  <p className="text-sm text-white/40 tabular-nums">
                    {product.index}
                  </p>
                  <Badge
                    variant="outline"
                    className="rounded-none border-white/40 text-[11px] font-medium uppercase tracking-[0.2em] text-white/60"
                  >
                    {product.tag}
                  </Badge>
                </div>

                <h3 className="mt-12 text-2xl font-semibold tracking-tight md:text-3xl">
                  {product.name}
                </h3>

                <p className="mt-5 max-w-sm text-base leading-relaxed text-white/60">
                  {product.description}
                </p>

                <div className="mt-auto pt-12">
                  <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
                    Notify me when it launches
                  </p>
                  <WaitlistForm product={product.name} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-xs text-white/30">
          More infini.io products are in development — check back soon.
        </p>
      </div>
    </section>
  )
}