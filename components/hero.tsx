import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"

function ImageSlot({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div className={className}>
      {/* REPLACE WITH REAL PORTFOLIO/BRAND IMAGE — this is only the placeholder */}
      <div className="flex aspect-[4/3] w-full items-center justify-center border border-black">
        <p className="px-6 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[85svh] flex-col justify-between overflow-hidden bg-white">
      {/* Background Dot Pattern */}
      <div 
        className="absolute inset-0 z-0 bg-[radial-gradient(circle,#cccccc_1.5px,transparent_1.5px)] bg-[size:18px_18px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%)]" 
        aria-hidden="true" 
      />
      
      {/* Glyph Accent Pattern */}
      <div 
        className="absolute -bottom-16 -right-16 z-0 h-96 w-96 bg-[radial-gradient(circle,#000_3px,transparent_3px)] bg-[size:24px_24px] opacity-[0.12] [mask-image:radial-gradient(circle,black_30%,transparent_70%)]" 
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24">
        <Reveal>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Web &amp; AI Development Agency
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 max-w-5xl text-[44px] font-bold leading-[0.95] tracking-tight md:mt-10 md:text-7xl lg:text-[104px]">
            We build ecommerce and AI-powered businesses.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:mt-12 md:text-lg">
            infini.io is a web &amp; AI development agency. We design and build
            online stores, apps, websites, and AI agents that give your
            business an affordable online presence — and grow its value.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row md:mt-14">
            <Button asChild className="h-12 rounded-sm px-8 text-base font-medium">
              <Link href="#consult">Start a Project</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-sm px-8 text-base font-medium bg-white"
            >
              <Link href="#work">See Our Work</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-24 grid gap-px border border-black bg-black md:mt-32 md:grid-cols-2">
            <div className="bg-background p-3">
              {/* HERO ECOMMERCE IMAGE */}
              <ImageSlot label="Ecommerce" />
              <p className="flex items-baseline justify-between border-t border-black pt-4 text-sm">
                <span className="font-semibold tracking-tight">Ecommerce</span>
                <span className="text-muted-foreground tabular-nums">01</span>
              </p>
            </div>
            <div className="bg-background p-3">
              {/* HERO AI IMAGE */}
              <ImageSlot label="AI Agents" />
              <p className="flex items-baseline justify-between border-t border-black pt-4 text-sm">
                <span className="font-semibold tracking-tight">AI Agents</span>
                <span className="text-muted-foreground tabular-nums">02</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <p className="relative z-10 px-5 pb-12 text-sm text-muted-foreground tabular-nums md:px-8 md:pb-16">
        01 / infini.io
      </p>
    </section>
  )
}