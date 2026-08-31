import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

const REASONS = [
  {
    index: "01",
    title: "Affordable",
    description:
      "Agency-quality work without agency pricing. Built lean, priced fairly.",
  },
  {
    index: "02",
    title: "Fast",
    description:
      "Modern stacks (Next.js, Supabase) mean faster builds and faster launches.",
  },
  {
    index: "03",
    title: "Built to grow value",
    description:
      "We don't just ship a site. We build systems — ecommerce, AI agents, automations — that compound your business's value over time.",
  },
]

export function Why() {
  return (
    <section id="why" className="scroll-mt-20 border-t border-black py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Why us"
            title="Why infini.io"
            index="05 / why"
          />
        </Reveal>

        <div className="mt-16 grid gap-px border border-black bg-black md:mt-20 md:grid-cols-3">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.index} delay={i * 80} className="h-full">
              <div className="flex h-full flex-col bg-background p-8 md:p-10">
                <p className="text-sm text-muted-foreground tabular-nums">
                  {reason.index}
                </p>
                <h3 className="mt-10 text-2xl font-semibold tracking-tight">
                  {reason.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}