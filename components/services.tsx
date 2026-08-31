import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

type ServiceItem = {
  index: string
  title: string
  description: string
}

const WEB_SERVICES: ServiceItem[] = [
  {
    index: "01",
    title: "Online Store",
    description:
      "Your products selling online, around the clock. We build the store, connect payments, and make checkout effortless.",
  },
  {
    index: "02",
    title: "Business Website",
    description:
      "A fast, professional website that makes your business look serious and turns visitors into enquiries.",
  },
  {
    index: "03",
    title: "Customer App",
    description:
      "A simple app for bookings, orders, or memberships — built around how your customers actually work.",
  },
]

const AI_SERVICES: ServiceItem[] = [
  {
    index: "04",
    title: "AI Receptionist",
    description:
      "An AI that answers calls and enquiries 24/7, books appointments, and never lets a lead slip.",
  },
  {
    index: "05",
    title: "AI Assistant",
    description:
      "AI that handles the repetitive work — quotes, follow-ups, updates — so your team can focus on selling.",
  },
]

function ServiceRow({ item }: { item: ServiceItem }) {
  return (
    <li className="grid grid-cols-12 items-start gap-x-6 gap-y-4 border-b border-black py-8 md:gap-x-10 md:py-10">
      <div className="col-span-12 font-mono text-sm text-muted-foreground tabular-nums md:col-span-2">
        {item.index}
      </div>
      <h3 className="col-span-12 text-2xl font-semibold tracking-tight md:col-span-4 md:text-3xl">
        {item.title}
      </h3>
      <p className="col-span-12 max-w-xl text-base leading-relaxed text-muted-foreground md:col-span-6">
        {item.description}
      </p>
    </li>
  )
}

function ServiceGroup({
  id,
  label,
  items,
}: {
  id: string
  label: string
  items: ServiceItem[]
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="flex items-center gap-4 pb-5 md:pb-6">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </p>
        <span className="h-px flex-1 bg-black/10" />
      </div>
      <ul className="border-t border-black">
        {items.map((item) => (
          <ServiceRow key={item.index} item={item} />
        ))}
      </ul>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-black py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="What We Build"
            index="03 / services"
          />
        </Reveal>

        <Reveal delay={100} className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          <ServiceGroup id="web-services" label="Websites & Stores" items={WEB_SERVICES} />
          <ServiceGroup id="ai-services" label="Artificial Intelligence" items={AI_SERVICES} />
        </Reveal>
      </div>
    </section>
  )
}