import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/20 bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="inline-block bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-black">
              infini.io
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Affordable online presence for businesses. Increasing value.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3 text-sm text-white/70">
            <Link href="#services" className="transition-colors hover:text-white">
              Websites
            </Link>
            <Link href="#ai-services" className="transition-colors hover:text-white">
              AI Services
            </Link>
            <Link href="#consult" className="transition-colors hover:text-white">
              Contact Us
            </Link>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 infini.io. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.3em]">Web &amp; AI Development Agency</p>
        </div>
      </div>
    </footer>
  )
}