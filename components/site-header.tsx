"use client"

import { useState } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const NAV_LINKS = [
  { label: "Websites", href: "#services" },
  { label: "AI Services", href: "#ai-services" },
  { label: "Products", href: "#products" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed top-4 z-40 w-full px-4 md:px-8">
        <header className="mx-auto flex h-14 md:h-[60px] w-full max-w-6xl items-center bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          {/* Logo Block */}
          <Link 
            href="#top" 
            className="flex h-full items-center bg-black px-6 md:px-8 text-white transition-colors hover:bg-black/90" 
            onClick={() => setOpen(false)}
          >
            <span className="text-sm md:text-base font-bold tracking-widest">INFINI.IO</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden flex-1 items-center justify-center gap-6 md:flex lg:gap-10" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-gray-500 transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Spacer for flex-1 on mobile so logo stays left */}
          <div className="flex-1 md:hidden" />

          {/* Desktop CTA */}
          <div className="hidden h-full items-center px-4 md:flex lg:px-6">
            <Button 
              asChild 
              variant="outline" 
              className="h-9 rounded-none border-black/20 bg-transparent text-[11px] font-bold uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white hover:border-black"
            >
              <Link href="#consult">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-full w-14 items-center justify-center border-l border-gray-100 md:hidden"
          >
            <span className={cn("relative block h-4 w-5", open && "hidden")}>
              <span className="absolute left-0 top-0 h-[2px] w-full bg-black" />
              <span className="absolute left-0 top-1.5 h-[2px] w-full bg-black" />
              <span className="absolute left-0 top-3 h-[2px] w-full bg-black" />
            </span>
            <span className={cn("hidden text-3xl font-light leading-none", open && "block")}>
              ×
            </span>
          </button>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 flex flex-col bg-white px-6 py-6 pt-28 transition-all duration-300 md:hidden",
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-4"
        )}
        aria-hidden={!open}
      >
        <nav className="flex flex-1 flex-col justify-center gap-2" aria-label="Mobile">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group flex items-center border-b border-gray-100 py-6 text-2xl font-bold uppercase tracking-widest text-black transition-colors"
            >
              <span className="mr-6 text-sm font-medium text-gray-300">
                0{i + 1}
              </span>
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="mt-8 h-14 rounded-none bg-black text-sm font-bold uppercase tracking-widest text-white hover:bg-black/90"
            onClick={() => setOpen(false)}
          >
            <Link href="#consult">Contact Us</Link>
          </Button>
        </nav>

        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 text-center pb-4">
          INFINI.IO // 2026
        </p>
      </div>
    </>
  )
}