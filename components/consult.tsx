import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { ConsultForm } from "@/components/consult-form"

export function Consult() {
  return (
    <section
      id="consult"
      className="relative scroll-mt-20 overflow-hidden border-t border-black bg-black py-24 text-white md:py-32"
    >
      {/* Inverted Background Dot Pattern (Nothing OS Dark Style) */}
      <div 
        className="absolute inset-0 z-0 bg-[radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:18px_18px]" 
        aria-hidden="true" 
      />
      
      {/* Inverted Glyph Accent Pattern */}
      <div 
        className="absolute -bottom-16 -left-16 z-0 h-96 w-96 bg-[radial-gradient(circle,rgba(255,255,255,0.25)_2.5px,transparent_2.5px)] bg-[size:24px_24px] opacity-[0.08] [mask-image:radial-gradient(circle,white_30%,transparent_70%)]" 
        aria-hidden="true" 
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Consult us"
            title="Let's Talk"
            subtitle="Tell us about your business. We'll get back to you with a plan and a quote."
            index="06 / consult"
          />
        </Reveal>

        <Reveal delay={100} className="mt-14 max-w-3xl md:mt-20">
          <ConsultForm />
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-12 text-sm text-white/50">
            Prefer email? Write to us —{" "}
            <a
              href="mailto:hello@infini.io"
              className="font-medium text-white underline underline-offset-4 transition-colors hover:text-white/80"
            >
              hello@infini.io
            </a>{" "}
            and we&apos;ll reply within 24 hours.
          </p>
        </Reveal>
      </div>
    </section>
  )
}